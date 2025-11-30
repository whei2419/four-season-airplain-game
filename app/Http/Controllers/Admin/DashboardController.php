<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GameScore;
use App\Models\Setting;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $topPlayer = GameScore::orderBy('score', 'desc')
            ->orderBy('created_at', 'asc')
            ->first();
        
        $stats = [
            'total_players' => GameScore::count(),
            'top_player_name' => $topPlayer ? $topPlayer->player_name : 'N/A',
            'top_player_score' => $topPlayer ? $topPlayer->score : 0,
            'total_scanned' => GameScore::where('scanned', true)->count(),
            'avg_score' => GameScore::where('score', '>', 0)->avg('score') ?? 0,
        ];
        
        $recent_players = GameScore::orderBy('created_at', 'desc')
            ->limit(6)
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
        
        $players = $query->paginate(10);
        
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

    public function settings()
    {
        $settings = [
            'game_time_limit' => Setting::get('game_time_limit', 60),
            'show_camera_feed' => Setting::get('show_camera_feed', 1),
        ];
        
        return view('admin.settings', compact('settings'));
    }

    public function updateSettings(Request $request)
    {
        $request->validate([
            'game_time_limit' => 'required|integer|min:10|max:300',
            'show_camera_feed' => 'required|boolean',
        ]);

        Setting::set('game_time_limit', $request->game_time_limit);
        Setting::set('show_camera_feed', $request->show_camera_feed);

        return redirect()->route('admin.settings')->with('success', 'Settings updated successfully!');
    }

    public function clearAllPlayers(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        // Verify the admin password
        if (!\Illuminate\Support\Facades\Hash::check($request->password, auth()->user()->password)) {
            return redirect()->route('admin.settings')->with('error', 'Invalid password. Players were not deleted.');
        }

        // Delete all game scores (players)
        $count = \App\Models\GameScore::count();
        \App\Models\GameScore::truncate();

        return redirect()->route('admin.settings')->with('success', "Successfully deleted {$count} player records.");
    }
}
