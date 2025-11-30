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
    
    public function savePlayer(Request $request)
    {
        $validated = $request->validate([
            'player_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'contact' => 'required|string|max:50',
        ]);
        
        // Create player record with initial score of 0
        $gameScore = GameScore::create([
            'player_name' => $validated['player_name'],
            'email' => $validated['email'],
            'contact' => $validated['contact'],
            'flight_number' => 'FLIGHT IF' . str_pad(rand(100, 999), 3, '0', STR_PAD_LEFT),
            'score' => 0,
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Player registered successfully',
            'data' => $gameScore,
        ]);
    }
    
    public function saveScore(Request $request)
    {
        $validated = $request->validate([
            'player_id' => 'required|integer|exists:game_scores,id',
            'score' => 'required|integer|min:0',
        ]);
        
        $gameScore = GameScore::findOrFail($validated['player_id']);
        $gameScore->update(['score' => $validated['score']]);
        
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
