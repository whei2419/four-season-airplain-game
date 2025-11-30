<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create or update admin user
        \App\Models\User::updateOrCreate(
            ['email' => 'admin@innisfree.com'],
            [
                'name' => 'Admin',
                'password' => \Illuminate\Support\Facades\Hash::make('innisfree2025'),
                'email_verified_at' => now(),
            ]
        );
    }
}
