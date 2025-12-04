<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * This migration adds 8 hours to all existing timestamps to convert them
     * from UTC to Malaysia time (Asia/Kuala_Lumpur, UTC+8).
     * Only run this once to fix historical data that was saved before
     * the timezone configuration was added.
     */
    public function up(): void
    {
        // Update game_scores table timestamps
        DB::statement("
            UPDATE game_scores 
            SET 
                created_at = DATE_ADD(created_at, INTERVAL 8 HOUR),
                updated_at = DATE_ADD(updated_at, INTERVAL 8 HOUR),
                scanned_at = CASE 
                    WHEN scanned_at IS NOT NULL 
                    THEN DATE_ADD(scanned_at, INTERVAL 8 HOUR)
                    ELSE NULL
                END
        ");

        // Update users table timestamps (if any exist)
        DB::statement("
            UPDATE users 
            SET 
                created_at = DATE_ADD(created_at, INTERVAL 8 HOUR),
                updated_at = DATE_ADD(updated_at, INTERVAL 8 HOUR),
                email_verified_at = CASE 
                    WHEN email_verified_at IS NOT NULL 
                    THEN DATE_ADD(email_verified_at, INTERVAL 8 HOUR)
                    ELSE NULL
                END
        ");

        // Update settings table timestamps (if any exist)
        DB::statement("
            UPDATE settings 
            SET 
                created_at = DATE_ADD(created_at, INTERVAL 8 HOUR),
                updated_at = DATE_ADD(updated_at, INTERVAL 8 HOUR)
            WHERE created_at IS NOT NULL
        ");
    }

    /**
     * Reverse the migrations.
     * 
     * This will subtract 8 hours to revert back to UTC if needed.
     */
    public function down(): void
    {
        // Revert game_scores table timestamps
        DB::statement("
            UPDATE game_scores 
            SET 
                created_at = DATE_SUB(created_at, INTERVAL 8 HOUR),
                updated_at = DATE_SUB(updated_at, INTERVAL 8 HOUR),
                scanned_at = CASE 
                    WHEN scanned_at IS NOT NULL 
                    THEN DATE_SUB(scanned_at, INTERVAL 8 HOUR)
                    ELSE NULL
                END
        ");

        // Revert users table timestamps
        DB::statement("
            UPDATE users 
            SET 
                created_at = DATE_SUB(created_at, INTERVAL 8 HOUR),
                updated_at = DATE_SUB(updated_at, INTERVAL 8 HOUR),
                email_verified_at = CASE 
                    WHEN email_verified_at IS NOT NULL 
                    THEN DATE_SUB(email_verified_at, INTERVAL 8 HOUR)
                    ELSE NULL
                END
        ");

        // Revert settings table timestamps
        DB::statement("
            UPDATE settings 
            SET 
                created_at = DATE_SUB(created_at, INTERVAL 8 HOUR),
                updated_at = DATE_SUB(updated_at, INTERVAL 8 HOUR)
            WHERE created_at IS NOT NULL
        ");
    }
};
