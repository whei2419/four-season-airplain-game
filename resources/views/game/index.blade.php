<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>{{ config('app.name', 'Laravel') }} - Game</title>
    
    <!-- Game Styles -->
    @vite(['resources/sass/game/app.scss', 'resources/js/game/app.js'])
</head>
<body class="game-layout">
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
</body>
</html>
