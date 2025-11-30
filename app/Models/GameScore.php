<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'player_name',
        'flight_number',
        'score',
    ];

    protected $casts = [
        'score' => 'integer',
    ];
}
