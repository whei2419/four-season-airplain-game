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
                        <input type="text" id="name" name="name" placeholder="Your Name" class="registration-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="example@email.com" class="registration-input" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="contact">Contact No.</label>
                        <input type="text" id="contact" name="contact" placeholder="0123456789" class="registration-input" required>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="game-button submit-btn">SUBMIT</button>
                    </div>
                </form>
            </div>
            
            <button type="button" id="back-btn" class="back-btn">BACK</button>
        </div>
    </div>

    <!-- Instruction Screen (Hidden by default) -->
    <div id="instruction-screen" class="registration-overlay" style="display: none; background-image: url('{{ asset('assets/images/instruction_BG.webp') }}'); background-size: cover; background-position: center; background-color: transparent;">
        <div class="registration-content">
            <img src="{{ asset('assets/images/airline logo.webp') }}" alt="Innisfree Airline" class="instruction-logo">
            
            <div class="registration-card instruction-card">
                <h2 class="instruction-title">How to Play</h2>
                <p class="instruction-desc">
                    Play to earn as many points as you can. The top scorer of the month will win a full-sized Green Tea Ceramide Milk 160ml!
                    <br><span class="small-text">*The top scorer will be contacted by 15 January via WhatsApp.</span>
                </p>

                <div class="instruction-items">
                    <div class="item">
                        <img src="{{ asset('assets/images/bottle_15pts.webp') }}" alt="Bottle" class="item-icon">
                        <span class="item-points">+15 Points</span>
                    </div>
                    <div class="item">
                        <img src="{{ asset('assets/images/present_10pts.webp') }}" alt="Gift" class="item-icon">
                        <span class="item-points">+10 Points</span>
                    </div>
                    <div class="item">
                        <img src="{{ asset('assets/images/bad cloud_-5pts.webp') }}" alt="Cloud" class="item-icon">
                        <span class="item-points">-5 Points</span>
                    </div>
                </div>

                <div class="form-actions">
                    <button id="instruction-next-btn" class="game-button">NEXT</button>
                </div>
            </div>
            
            <button type="button" id="instruction-back-btn" class="back-btn">BACK</button>
        </div>
    </div>
    
    <!-- Snow Effect Container -->
    <div id="snow-container"></div>
    
    <!-- Background Animation or Image could go here -->
    <div id="welcome-background" style="background-image: url('{{ asset('assets/images/welcome_BG.webp') }}');"></div>
@endsection
