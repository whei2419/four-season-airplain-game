@extends('layouts.game')

@section('title', 'Welcome')

@section('content')
    <div class="welcome-logo-container">
        <x-game-logo class="game-logo" />
    </div>

    <div class="welcome-actions" id="start-screen">
        <button id="start-btn" class="game-button">
            Start
        </button>
    </div>

    <!-- Registration Form Container (Hidden by default) -->
    <div id="registration-screen" class="registration-overlay" style="display: none;">
        <div class="registration-content">
            <h1 class="registration-title">Welcome Aboard!</h1>
            <p class="registration-subtitle">Check in below to start your holiday with INNISFREE!</p>
            
            <div class="registration-card">
                <h2 class="form-title">Registration</h2>
                
                <form action="{{ route('game.index') }}" method="GET">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your Name" class="registration-input">
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="example@email.com" class="registration-input">
                    </div>
                    
                    <div class="form-group">
                        <label for="contact">Contact No.</label>
                        <input type="text" id="contact" name="contact" placeholder="0123456789" class="registration-input">
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="game-button submit-btn">SUBMIT</button>
                    </div>
                </form>
            </div>
            
            <button type="button" id="back-btn" class="back-btn">BACK</button>
        </div>
    </div>
    
    <!-- Snow Effect Container -->
    <div id="snow-container"></div>
    
    <!-- Background Animation or Image could go here -->
    <div id="welcome-background" style="background-image: url('{{ asset('assets/images/welcome_BG.webp') }}');"></div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const startBtn = document.getElementById('start-btn');
            const backBtn = document.getElementById('back-btn');
            const startScreen = document.getElementById('start-screen');
            const registrationScreen = document.getElementById('registration-screen');

            if (startBtn && startScreen && registrationScreen) {
                startBtn.addEventListener('click', function() {
                    startScreen.style.display = 'none';
                    registrationScreen.style.display = 'flex';
                });
            }

            if (backBtn && startScreen && registrationScreen) {
                backBtn.addEventListener('click', function() {
                    registrationScreen.style.display = 'none';
                    startScreen.style.display = 'block';
                });
            }
        });
    </script>
@endsection
