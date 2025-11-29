@extends('layouts.game')

@section('title', 'Welcome')

@section('content')
    <!-- Welcome Page Wrapper (will be hidden when game starts) -->
    <div id="welcome-page-wrapper">
        <!-- Airplane Animation -->
        <div class="airplane-container">
            <img src="{{ asset('assets/images/land-plain.webp') }}" alt="Airplane" class="airplane-animation">
        </div>

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
        <button type="button" id="back-btn" class="back-btn-top">← BACK</button>
        
        <div class="registration-content">
            <h1 class="registration-title">Welcome Aboard!</h1>
            <p class="registration-subtitle">Check in below to start your holiday with INNISFREE!</p>
            
            <div class="registration-card">
                <h2 class="form-title">Registration</h2>
                
                <form action="{{ route('game.play') }}" method="GET">
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
                        <div class="contact-input-group">
                            <button type="button" id="country-trigger" class="country-trigger">
                                <span id="selected-flag" class="iti__flag iti__my"></span>
                                <span id="selected-code" class="code-text">+60</span>
                                <span class="dropdown-arrow">▼</span>
                            </button>
                            <input type="hidden" id="country_code" name="country_code" value="+60">
                            <input type="tel" id="contact" name="contact" placeholder="12 345 6789" class="registration-input contact-phone" required>
                        </div>
                    </div>

                    <!-- Country Code Modal -->
                    <div id="country-modal" class="country-modal">
                        <div class="country-modal-content">
                            <div class="modal-header">
                                <h3>Select Country</h3>
                                <button type="button" id="close-country-modal" class="close-modal">×</button>
                            </div>
                            <input type="text" id="country-search" class="country-search" placeholder="Search country...">
                            <div id="country-list" class="country-list">
                                <!-- Countries will be populated by JavaScript from intl-tel-input data -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="game-button submit-btn-bottom">SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Large Keyboard Visual -->
        <div class="keyboard-visual">
            <div class="keyboard-row">
                <div class="key">1</div>
                <div class="key">2</div>
                <div class="key">3</div>
                <div class="key">4</div>
                <div class="key">5</div>
                <div class="key">6</div>
                <div class="key">7</div>
                <div class="key">8</div>
                <div class="key">9</div>
                <div class="key">0</div>
            </div>
            <div class="keyboard-row">
                <div class="key">Q</div>
                <div class="key">W</div>
                <div class="key">E</div>
                <div class="key">R</div>
                <div class="key">T</div>
                <div class="key">Y</div>
                <div class="key">U</div>
                <div class="key">I</div>
                <div class="key">O</div>
                <div class="key">P</div>
            </div>
            <div class="keyboard-row">
                <div class="key">A</div>
                <div class="key">S</div>
                <div class="key">D</div>
                <div class="key">F</div>
                <div class="key">G</div>
                <div class="key">H</div>
                <div class="key">J</div>
                <div class="key">K</div>
                <div class="key">L</div>
            </div>
            <div class="keyboard-row">
                <div class="key wide">Shift</div>
                <div class="key">Z</div>
                <div class="key">X</div>
                <div class="key">C</div>
                <div class="key">V</div>
                <div class="key">B</div>
                <div class="key">N</div>
                <div class="key">M</div>
                <div class="key wide">⌫</div>
            </div>
            <div class="keyboard-row">
                <div class="key wider">!@#</div>
                <div class="key extra-wide">Space</div>
                <div class="key wider">@</div>
            </div>
        </div>
    </div>

    <!-- Instruction Screen (Hidden by default) -->
    <div id="instruction-screen" class="registration-overlay" style="display: none; background-image: url('{{ asset('assets/images/instruction_BG.webp') }}'); background-size: cover; background-position: center; background-color: transparent;">
        <button type="button" id="instruction-back-btn" class="back-btn">BACK</button>
        
        <div class="instruction-logo-container">
            <img src="{{ asset('assets/images/airline logo.webp') }}" alt="Innisfree Airline" class="instruction-logo">
        </div>
        
        <!-- Instruction Content 1 - Tilt Controls -->
        <div id="instruction-content-1" class="instruction-content" style="display: none;">
            <div class="registration-card instruction-card">
                <h2 class="instruction-title">How to Play</h2>
                
                <div class="tilt-controls">
                    <div class="tilt-item">
                        <img src="{{ asset('assets/images/tilt_left.webp') }}" alt="Tilt Left" class="tilt-icon">
                        <span class="tilt-label">Tilt Left</span>
                    </div>
                    <div class="tilt-item">
                        <img src="{{ asset('assets/images/tilt_right.webp') }}" alt="Tilt Right" class="tilt-icon">
                        <span class="tilt-label">Tilt Right</span>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button id="instruction-1-next-btn" class="game-button">NEXT</button>
            </div>
        </div>

        <!-- Instruction Content 2 - Points -->
        <div id="instruction-content-2" class="instruction-content" style="display: none;">
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
            </div>
            
            <div class="form-actions">
                <button id="instruction-2-next-btn" class="game-button">NEXT</button>
            </div>
        </div>

        <!-- Takeoff Animation (Hidden by default) -->
        <div id="takeoff-animation" class="takeoff-animation" style="display: none;">
            <img src="{{ asset('assets/images/animate-plian1.webp') }}" alt="Airplane Takeoff" class="takeoff-plane">
        </div>

        <!-- Countdown Screen (Hidden by default) -->
        <div id="countdown-screen" class="countdown-screen" style="display: none; background-image: url('{{ asset('assets/images/background 03.webp') }}');">
            <div class="countdown-airplane-container">
                <img src="{{ asset('assets/images/plane_fly up.webp') }}" alt="Airplane" class="countdown-airplane">
            </div>

            <div class="game-loading" id="game-loading" style="display: none; background-image: url('{{ asset('assets/images/background 03.webp') }}');">
                <div class="loading-content">
                    <img src="{{ asset('assets/images/airline logo.webp') }}" alt="Innisfree Airline" class="loading-logo">
                    <div class="progress-bar-container">
                        <div class="progress-bar" id="progress-bar"></div>
                    </div>
                </div>
            </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Snow Effect Container -->
    <div id="snow-container"></div>
    
    <!-- Background Animation or Image could go here -->
    <div id="welcome-background" style="background-image: url('{{ asset('assets/images/welcome_BG.webp') }}');"></div>
    </div>
    <!-- End Welcome Page Wrapper -->
    
    <!-- Game Container (Hidden until countdown finishes) -->
    <div id="game-container" style="display: none;"></div>
    
    <!-- Game UI Overlay (Hidden until game starts) -->
    <div class="game-ui" id="game-ui" style="display: none;">
        <div class="game-ui__score">
           <span id="score">0</span>
        </div>
        <div class="game-ui__timer">
            <span id="timer">60</span>
        </div>
        
        <!-- Control Mode Toggle -->
        <div class="game-ui__controls">
            <button id="control-mode-btn" class="control-btn">
                <span id="control-mode-text">Body Pose</span>
            </button>
            <button id="calibrate-btn" class="control-btn">Calibrate</button>
        </div>
    </div>
    
    <!-- Camera Feed for Gesture Control -->
    <div id="camera-container">
        <div class="camera-wrapper">
            <video id="gesture-video" autoplay playsinline></video>
            <canvas id="gesture-canvas"></canvas>
        </div>
    </div>
    
    <!-- Game Over Screen (Hidden until game ends) -->
    <div id="game-over-screen" class="game-over-screen" style="display: none;">
        <!-- Snow Effect for Game Over -->
        <div id="game-over-snow-container"></div>
        
        <!-- Phase 1: Airplane Animation Flying Across -->
        <div class="airplane-container-down">
            <img src="{{ asset('assets/images/plane_fly down.webp') }}" alt="Airplane" class="airplane-animation-down">
        </div>
        
        <!-- Phase 2: Will reuse welcome-page-wrapper for landing simulation -->
        
        <!-- Phase 3: Congratulations Screen -->
        <div id="congratulations-screen" class="congratulations-screen">
            <div class="congrats-logo">
                <x-game-logo class="game-logo" />
            </div>
            
            <h1 class="congrats-title">Congratulations!</h1>
            <p class="congrats-subtitle">Welcome to INNISFREE Jeju House!</p>
            
            <p class="congrats-arrived">You've safely arrived with:</p>
            
            <div class="score-display">
                <div class="score-value" id="final-score-display">0</div>
                <div class="score-suffix">Points</div>
            </div>
            
            <div class="ranking-display">
                <span class="ranking-text">YOUR RANKING: <span id="final-ranking">#01</span></span>
            </div>
            
            <button id="play-again-btn" class="game-button">Play Again</button>
        </div>
    </div>

    <!-- Pass asset URLs to JavaScript for preloading -->
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
@endsection
