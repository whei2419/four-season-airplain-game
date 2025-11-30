<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GameScore;

class GameController extends Controller
{
    public function welcome()
    {
        return view('welcome');
    }
    
    public function index()
    {
        return view('game');
    }
    
    public function saveScore(Request $request)
    {
        $validated = $request->validate([
            'player_name' => 'required|string|max:255',
            'flight_number' => 'nullable|string|max:50',
            'score' => 'required|integer|min:0',
        ]);
        
        $gameScore = GameScore::create($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Score saved successfully',
            'data' => $gameScore,
        ]);
    }
    
    public function getLeaderboard(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $page = $request->input('page', 1);
        
        $scores = GameScore::orderBy('score', 'desc')
            ->orderBy('created_at', 'asc')
            ->paginate($perPage);
        
        // Add ranking to each score
        $startRank = ($page - 1) * $perPage + 1;
        $scores->getCollection()->transform(function ($score, $index) use ($startRank) {
            $score->rank = $startRank + $index;
            return $score;
        });
        
        return response()->json([
            'success' => true,
            'data' => $scores->items(),
            'pagination' => [
                'current_page' => $scores->currentPage(),
                'last_page' => $scores->lastPage(),
                'per_page' => $scores->perPage(),
                'total' => $scores->total(),
            ],
        ]);
    }
}
