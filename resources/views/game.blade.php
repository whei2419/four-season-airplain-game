@extends('layouts.game')

@section('title', 'Play')

@section('content')
    <!-- Game UI Overlay -->
    <div class="game-ui" id="game-ui">
        <div class="game-ui__score">
            <span id="score">0</span>
        </div>
        <div class="game-ui__timer">
            <span id="timer">00:60</span>
        </div>
        
        <!-- Control Mode Toggle -->
        <div class="game-ui__controls">
            <button id="control-mode-btn" class="control-btn">
                <span id="control-mode-text">Keyboard</span>
            </button>
            <button id="calibrate-btn" class="control-btn" style="display: none;">Calibrate Tilt</button>
        </div>
    </div>
    
    <!-- Camera Feed for Gesture Control -->
    <div id="camera-container" style="display: none;">
        <video id="gesture-video" autoplay playsinline style="display: none;"></video>
        <canvas id="gesture-canvas"></canvas>
    </div>
    
    <!-- Game Container -->
    <div id="game-container"></div>
    
    <!-- Pass asset URLs to JavaScript -->
    <script>
        window.gameAssets = {
            player: "{{ asset('assets/images/game/plain.webp') }}",
            background: "{{ asset('assets/images/game/main-bg.webp') }}",
            header: "{{ asset('assets/images/game/header.webp') }}",
            cloud: "{{ asset('assets/images/game/cloud.webp') }}",
            bottle: "{{ asset('assets/images/game/game-object/bottle_15pts.webp') }}",
            present: "{{ asset('assets/images/game/game-object/present_10pts.webp') }}",
            badcloud: "{{ asset('assets/images/game/game-object/bad cloud_-5pts.webp') }}"
        };
    </script>
    
    <!-- Game Menu (Initially Hidden) -->
    <div class="game-menu" style="display: none;" id="game-menu">
        <x-game-logo class="game-logo" style="max-width: 200px; margin-bottom: 20px;" />
        <h2>Four Season Airplane Game</h2>
        <p>Use arrow keys to control your airplane</p>
        <button onclick="startGame()">Start Game</button>
        @auth
            <br>
            <a href="{{ route('admin.dashboard') }}" class="btn">Back to Dashboard</a>
        @else
            <br>
            <a href="{{ route('login') }}" style="color: white; text-decoration: underline;">Login</a>
        @endauth
    </div>

    <script>
        function startGame() {
            document.getElementById('game-menu').style.display = 'none';
            // Game will auto-start via Phaser
        }
        
        // Show menu initially
        window.addEventListener('load', function() {
            setTimeout(() => {
                // document.getElementById('game-menu').style.display = 'block';
            }, 1000);
        });
    </script>
@endsection
