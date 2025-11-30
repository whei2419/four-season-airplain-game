<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'player_name',
        'email',
        'contact',
        'flight_number',
        'score',
        'reward_token',
        'scanned',
        'scanned_at',
    ];

    protected $casts = [
        'score' => 'integer',
        'scanned' => 'boolean',
        'scanned_at' => 'datetime',
    ];
}
