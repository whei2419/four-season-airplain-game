<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>{{ config('app.name', 'Laravel') }} - @yield('title', 'Game')</title>
    
    <!-- Game Styles -->
    @vite(['resources/sass/game/app.scss', 'resources/js/game/app.js'])
    @stack('styles')
</head>
<body class="game-layout">
    @yield('content')
    
    @stack('scripts')
</body>
</html>
