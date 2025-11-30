<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GameScore;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_players' => GameScore::count(),
            'total_played' => GameScore::where('score', '>', 0)->count(),
            'total_scanned' => GameScore::where('scanned', true)->count(),
            'avg_score' => GameScore::where('score', '>', 0)->avg('score'),
            'highest_score' => GameScore::max('score'),
        ];
        
        $recent_players = GameScore::orderBy('created_at', 'desc')
            ->limit(10)
            ->get();
        
        return view('admin.dashboard', compact('stats', 'recent_players'));
    }
    
    public function players(Request $request)
    {
        $query = GameScore::query();
        
        // Search filter
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('player_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('flight_number', 'like', "%{$search}%");
            });
        }
        
        // Status filter
        if ($request->has('status')) {
            switch($request->status) {
                case 'played':
                    $query->where('score', '>', 0);
                    break;
                case 'not_played':
                    $query->where('score', 0);
                    break;
                case 'scanned':
                    $query->where('scanned', true);
                    break;
                case 'not_scanned':
                    $query->where('scanned', false);
                    break;
            }
        }
        
        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);
        
        $players = $query->paginate(20);
        
        return view('admin.players', compact('players'));
    }
    
    public function exportPlayers(Request $request)
    {
        $query = GameScore::query();
        
        // Apply same filters as players list
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('player_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('flight_number', 'like', "%{$search}%");
            });
        }
        
        if ($request->has('status')) {
            switch($request->status) {
                case 'played':
                    $query->where('score', '>', 0);
                    break;
                case 'not_played':
                    $query->where('score', 0);
                    break;
                case 'scanned':
                    $query->where('scanned', true);
                    break;
                case 'not_scanned':
                    $query->where('scanned', false);
                    break;
            }
        }
        
        $players = $query->orderBy('created_at', 'desc')->get();
        
        $filename = 'players_export_' . date('Y-m-d_H-i-s') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];
        
        $callback = function() use ($players) {
            $file = fopen('php://output', 'w');
            
            // CSV Headers
            fputcsv($file, [
                'ID',
                'Player Name',
                'Email',
                'Contact',
                'Flight Number',
                'Score',
                'Reward Token',
                'Scanned',
                'Scanned At',
                'Registered At',
            ]);
            
            // CSV Data
            foreach ($players as $player) {
                fputcsv($file, [
                    $player->id,
                    $player->player_name,
                    $player->email,
                    $player->contact,
                    $player->flight_number,
                    $player->score,
                    $player->reward_token,
                    $player->scanned ? 'Yes' : 'No',
                    $player->scanned_at ? $player->scanned_at->format('Y-m-d H:i:s') : '',
                    $player->created_at->format('Y-m-d H:i:s'),
                ]);
            }
            
            fclose($file);
        };
        
        return response()->stream($callback, 200, $headers);
    }
}
