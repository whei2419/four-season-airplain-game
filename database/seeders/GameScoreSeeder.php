<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GameScore;

class GameScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $scores = [
            ['player_name' => 'ANGEL', 'flight_number' => 'FLIGHT IF101', 'score' => 150],
            ['player_name' => 'WALLY', 'flight_number' => 'FLIGHT IF102', 'score' => 135],
            ['player_name' => 'SITI', 'flight_number' => 'FLIGHT IF103', 'score' => 120],
            ['player_name' => 'ALAN', 'flight_number' => 'FLIGHT IF104', 'score' => 105],
            ['player_name' => 'WONG LI ONG', 'flight_number' => 'FLIGHT IF105', 'score' => 95],
            ['player_name' => 'SARAH', 'flight_number' => 'FLIGHT IF106', 'score' => 88],
            ['player_name' => 'MICHAEL', 'flight_number' => 'FLIGHT IF107', 'score' => 75],
            ['player_name' => 'JESSICA', 'flight_number' => 'FLIGHT IF108', 'score' => 68],
            ['player_name' => 'DAVID', 'flight_number' => 'FLIGHT IF109', 'score' => 52],
            ['player_name' => 'EMILY', 'flight_number' => 'FLIGHT IF110', 'score' => 45],
            ['player_name' => 'CHRIS', 'flight_number' => 'FLIGHT IF111', 'score' => 38],
            ['player_name' => 'LISA', 'flight_number' => 'FLIGHT IF112', 'score' => 30],
        ];

        foreach ($scores as $score) {
            GameScore::create($score);
        }
    }
}
