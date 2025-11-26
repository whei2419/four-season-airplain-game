@extends('layouts.game')

@section('title', 'Get Ready')

@section('content')
    <!-- Airplane Animation -->
    <div class="game-intro-airplane-container">
        <img src="{{ asset('assets/images/game-intro-plane.webp') }}" alt="Airplane" class="game-intro-airplane">
    </div>

    <div class="game-intro-logo-container">
        <img src="{{ asset('assets/images/airline logo.webp') }}" alt="Innisfree Airline" class="game-intro-logo">
    </div>

    <!-- Game Intro Message -->
    <div class="game-intro-message" id="intro-message">
        <h1 class="intro-title">Get Ready!</h1>
        <p class="intro-subtitle">Your adventure begins in</p>
        <div class="countdown-number" id="countdown">3</div>
    </div>
    
    <!-- Snow Effect Container -->
    <div id="snow-container"></div>
    
    <!-- Background -->
    <div id="game-intro-background" style="background-image: url('{{ asset('assets/images/game_intro_BG.webp') }}');"></div>
@endsection

@push('scripts')
<script>
    // Countdown and redirect to game
    let countdown = 3;
    const countdownElement = document.getElementById('countdown');
    
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownElement.textContent = countdown;
        } else {
            clearInterval(countdownInterval);
            countdownElement.textContent = 'GO!';
            setTimeout(() => {
                window.location.href = '{{ route('game.play') }}';
            }, 500);
        }
    }, 1000);
</script>
@endpush
