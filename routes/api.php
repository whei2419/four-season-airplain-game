<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Game API Routes
Route::post('/game/save-player', [GameController::class, 'savePlayer'])->name('api.game.savePlayer');
Route::post('/game/save-score', [GameController::class, 'saveScore'])->name('api.game.saveScore');
Route::get('/game/leaderboard', [GameController::class, 'getLeaderboard'])->name('api.game.leaderboard');
