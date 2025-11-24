@extends('layouts.game')

@section('title', 'Play')

@section('content')
    <!-- Game UI Overlay -->
    <div class="game-ui">
        <div class="game-ui__score">
            Score: <span id="score">0</span>
        </div>
        <div class="game-ui__lives">
            Lives: <span id="lives">3</span>
        </div>
    </div>
    
    <!-- Game Container -->
    <div id="game-container"></div>
    
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
