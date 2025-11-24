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
        <button type="button" id="back-btn" class="back-btn-top">← BACK</button>
        
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

    <!-- Instruction Screen 1 - How to Play (Hidden by default) -->
    <div id="instruction-screen-1" class="registration-overlay" style="display: none; background-image: url('{{ asset('assets/images/instruction_BG.webp') }}'); background-size: cover; background-position: center; background-color: transparent;">
        <button type="button" id="instruction-1-back-btn" class="back-btn">BACK</button>
        
        <div class="instruction-logo-container">
            <img src="{{ asset('assets/images/airline logo.webp') }}" alt="Innisfree Airline" class="instruction-logo">
        </div>
        
        <div class="registration-content">
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

                <div class="form-actions">
                    <button id="instruction-1-next-btn" class="game-button">NEXT</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Instruction Screen 2 - Points (Hidden by default) -->
    <div id="instruction-screen-2" class="registration-overlay" style="display: none; background-image: url('{{ asset('assets/images/instruction_BG.webp') }}'); background-size: cover; background-position: center; background-color: transparent;">
        <button type="button" id="instruction-2-back-btn" class="back-btn">BACK</button>
        
        <div class="instruction-logo-container">
            <img src="{{ asset('assets/images/airline logo.webp') }}" alt="Innisfree Airline" class="instruction-logo">
        </div>
        
        <div class="registration-content">
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
                    <button id="instruction-2-next-btn" class="game-button">NEXT</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Snow Effect Container -->
    <div id="snow-container"></div>
    
    <!-- Background Animation or Image could go here -->
    <div id="welcome-background" style="background-image: url('{{ asset('assets/images/welcome_BG.webp') }}');"></div>
@endsection
