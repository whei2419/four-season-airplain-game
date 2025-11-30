<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>{{ config('app.name', 'Laravel') }} - @yield('title', 'Game')</title>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    
    <!-- Custom Fonts -->
    <style>
        @font-face {
            font-family: 'InnisfreeGothic';
            src: url('{{ asset('assets/font/InnisfreeGothicR.otf') }}') format('opentype');
            font-weight: normal;
            font-style: normal;
        }
        @font-face {
            font-family: 'InnisfreeGothic';
            src: url('{{ asset('assets/font/InnisfreeGothicB.otf') }}') format('opentype');
            font-weight: bold;
            font-style: normal;
        }
        @font-face {
            font-family: 'Gordita';
            src: url('{{ asset('assets/font/Type Atelier - Gordita.otf') }}') format('opentype');
            font-weight: normal;
            font-style: normal;
        }
        @font-face {
            font-family: 'Gordita';
            src: url('{{ asset('assets/font/Type Atelier - Gordita Bold.otf') }}') format('opentype');
            font-weight: bold;
            font-style: normal;
        }
    </style>
    
    <!-- Game Styles -->
    @vite(['resources/sass/game/app.scss', 'resources/js/game/app.js'])
    @stack('styles')
</head>
<body class="game-layout">
    @yield('content')
    
    @stack('scripts')
</body>
</html>
