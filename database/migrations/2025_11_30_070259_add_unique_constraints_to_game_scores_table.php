<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Remove duplicate emails - keep only the first occurrence
        DB::statement('
            DELETE t1 FROM game_scores t1
            INNER JOIN game_scores t2 
            WHERE t1.id > t2.id AND t1.email = t2.email
        ');
        
        // Remove duplicate contacts - keep only the first occurrence
        DB::statement('
            DELETE t1 FROM game_scores t1
            INNER JOIN game_scores t2 
            WHERE t1.id > t2.id AND t1.contact = t2.contact
        ');
        
        Schema::table('game_scores', function (Blueprint $table) {
            $table->unique('email');
            $table->unique('contact');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('game_scores', function (Blueprint $table) {
            $table->dropUnique(['email']);
            $table->dropUnique(['contact']);
        });
    }
};
