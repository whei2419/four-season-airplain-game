<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GameScore;
use App\Models\Setting;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Str;

class GameController extends Controller
{
    public function welcome()
    {
        $settings = [
            'game_time_limit' => Setting::get('game_time_limit', 60),
            'show_camera_feed' => Setting::get('show_camera_feed', 1),
        ];
        
        return view('welcome', compact('settings'));
    }
    
    public function index()
    {
        return view('game');
    }
    
    private function getRewardTier($score)
    {
        if ($score >= 0 && $score <= 15) {
            return [
                'tier' => 1,
                'title' => 'You\'ve Won: 2-pcs Sachets 1ml',
                'description' => 'Redeem your reward at the counter after the event and enjoy RM10 OFF (min. spend RM30)',
                'discount' => 'RM10 OFF (min. spend RM30)',
                'image' => 'assets/images/boarding-pass/2.webp'
            ];
        } elseif ($score >= 16 && $score <= 25) {
            return [
                'tier' => 2,
                'title' => 'You\'ve Won: 4-pcs Sachets 1ml',
                'description' => 'Redeem your reward at the counter after the event and enjoy RM10 OFF (min. spend RM30)',
                'discount' => 'RM10 OFF (min. spend RM30)',
                'image' => 'assets/images/boarding-pass/3.webp'
            ];
        } else {
            return [
                'tier' => 3,
                'title' => 'You\'ve Won: 1 Trial Kit',
                'description' => 'Redeem your reward at the counter after the event and enjoy RM10 OFF (no min. spend)',
                'discount' => 'RM10 OFF (no min. spend)',
                'image' => 'assets/images/boarding-pass/1.webp'
            ];
        }
    }
    
    public function showReward($token)
    {
        $player = GameScore::where('reward_token', $token)->firstOrFail();
        
        // Mark as scanned if not already scanned
        if (!$player->scanned) {
            $player->update([
                'scanned' => true,
                'scanned_at' => now(),
            ]);
        }
        
        $reward = $this->getRewardTier($player->score);
        
        return view('reward', compact('player', 'reward'));
    }
    
    public function savePlayer(Request $request)
    {
        $validated = $request->validate([
            'player_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'contact' => 'required|string|max:50',
        ]);
        
        // Generate unique reward token
        $rewardToken = Str::random(32);
        
        // Create player record with initial score of 0
        $gameScore = GameScore::create([
            'player_name' => $validated['player_name'],
            'email' => $validated['email'],
            'contact' => $validated['contact'],
            'flight_number' => 'FLIGHT IF' . str_pad(rand(100, 999), 3, '0', STR_PAD_LEFT),
            'score' => 0,
            'reward_token' => $rewardToken,
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
        
        // Generate reward URL
        $rewardUrl = route('game.reward', ['token' => $gameScore->reward_token]);
        
        // Generate QR code and save to public directory
        $qrCodePath = 'qrcodes/' . $gameScore->reward_token . '.svg';
        $qrCodeFullPath = public_path($qrCodePath);
        
        // Create directory if it doesn't exist
        if (!file_exists(dirname($qrCodeFullPath))) {
            mkdir(dirname($qrCodeFullPath), 0777, true);
        }
        
        // Generate QR code
        QrCode::size(300)
            ->format('svg')
            ->generate($rewardUrl, $qrCodeFullPath);
        
        $gameScore->qr_code_url = asset($qrCodePath);
        
        // Calculate actual ranking
        $ranking = GameScore::where('score', '>', $gameScore->score)
            ->orWhere(function($query) use ($gameScore) {
                $query->where('score', '=', $gameScore->score)
                      ->where('created_at', '<', $gameScore->created_at);
            })
            ->count() + 1;
        
        return response()->json([
            'success' => true,
            'message' => 'Score saved successfully',
            'data' => $gameScore,
            'qr_code_url' => asset($qrCodePath),
            'reward_url' => $rewardUrl,
            'ranking' => $ranking,
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
