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
        Schema::table('game_scores', function (Blueprint $table) {
            $table->string('reward_token')->unique()->nullable()->after('score');
            $table->boolean('scanned')->default(false)->after('reward_token');
            $table->timestamp('scanned_at')->nullable()->after('scanned');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('game_scores', function (Blueprint $table) {
            $table->dropColumn(['reward_token', 'scanned', 'scanned_at']);
        });
    }
};
