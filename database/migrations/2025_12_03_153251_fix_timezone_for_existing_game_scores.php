<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Subtract 8 hours from all existing timestamps to convert from Malaysian time (incorrectly stored as UTC) to actual UTC
        DB::table('game_scores')->update([
            'created_at' => DB::raw('DATE_SUB(created_at, INTERVAL 8 HOUR)'),
            'updated_at' => DB::raw('DATE_SUB(updated_at, INTERVAL 8 HOUR)'),
        ]);
        
        // Fix scanned_at for records that have been scanned
        DB::table('game_scores')
            ->whereNotNull('scanned_at')
            ->update([
                'scanned_at' => DB::raw('DATE_SUB(scanned_at, INTERVAL 8 HOUR)'),
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Add 8 hours back to revert the change
        DB::table('game_scores')->update([
            'created_at' => DB::raw('DATE_ADD(created_at, INTERVAL 8 HOUR)'),
            'updated_at' => DB::raw('DATE_ADD(updated_at, INTERVAL 8 HOUR)'),
        ]);
        
        // Revert scanned_at for records that have been scanned
        DB::table('game_scores')
            ->whereNotNull('scanned_at')
            ->update([
                'scanned_at' => DB::raw('DATE_ADD(scanned_at, INTERVAL 8 HOUR)'),
            ]);
    }
};
