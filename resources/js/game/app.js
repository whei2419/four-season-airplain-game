// Game JavaScript - Phaser Configuration
import Phaser from 'phaser';
import Alpine from 'alpinejs';
import SnowEffect from '../snow';
import PreloadScene from './preload-scene';
import GameScene from './game-scene';
import ControlManager from './controls/control-manager';
import ViewManager from './view-manager';
import LeaderboardManager from './leaderboard-manager';
import SoundManager from './sound-manager';
import './welcome';

window.Alpine = Alpine;
Alpine.start();

// Export SnowEffect for game over screen
window.SnowEffect = SnowEffect;

// Initialize Sound Manager
window.soundManager = new SoundManager();

// Initialize View Manager
window.viewManager = new ViewManager();

// Initialize Control Manager
window.controlManager = new ControlManager();
window.controlManager.setupKeyboardControls();

// Initialize Leaderboard Manager
window.leaderboardManager = new LeaderboardManager();

// Initialize Snow Effect
let snowEffect = null;
document.addEventListener('DOMContentLoaded', () => {
    // Hide page loader after everything is loaded
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 500); // Wait for fade out animation
        }, 1000); // Show loader for at least 1 second
    }
    
    if (document.getElementById('snow-container')) {
        snowEffect = new SnowEffect('snow-container');
    }
    
    // Setup control mode UI
    setupControlUI();
    
    // Setup sound toggle
    setupSoundToggle();
    
    // Setup play again button
    setupPlayAgainButton();
    
    // Setup leaderboard next button
    setupLeaderboardNextButton();
    
    // Setup passport done button
    setupPassportDoneButton();
    
    // Setup view leaderboard button
    setupViewLeaderboardButton();
    
    // Setup close leaderboard button
    setupCloseLeaderboardButton();
    
    // Setup leaderboard pagination
    window.leaderboardManager.setupPaginationListeners();
});

// Setup control mode switching UI
function setupControlUI() {
    const controlModeBtn = document.getElementById('control-mode-btn');
    const calibrateBtn = document.getElementById('calibrate-btn');
    const cameraContainer = document.getElementById('camera-container');
    
    if (!controlModeBtn) return;
    
    let currentMode = 'keyboard'; // Start with keyboard mode
    
    // Pose initialization will be done when loading screen appears
    // This is handled in welcome.js to preserve performance
    
    controlModeBtn.addEventListener('click', async () => {
        if (window.soundManager) window.soundManager.play('button');
        if (currentMode === 'keyboard') {
            // Switch to pose mode
            const videoElement = document.getElementById('gesture-video');
            const canvasElement = document.getElementById('gesture-canvas');
            
            const success = await window.controlManager.initializePoseMode(videoElement, canvasElement);
            
            if (success) {
                window.controlManager.setControlMode('pose');
                currentMode = 'pose';
                document.getElementById('control-mode-text').textContent = 'Body Pose';
                if (window.gameSettings?.showCamera) cameraContainer.style.display = 'block';
                calibrateBtn.style.display = 'inline-block';
            } else {
                alert('Failed to initialize body pose controls. Please allow camera access and try again.');
            }
        } else {
            // Switch back to keyboard
            window.controlManager.setControlMode('keyboard');
            currentMode = 'keyboard';
            document.getElementById('control-mode-text').textContent = 'Keyboard';
            cameraContainer.style.display = 'none';
            calibrateBtn.style.display = 'none';
        }
    });
    
    if (calibrateBtn) {
        calibrateBtn.addEventListener('click', () => {
            if (window.soundManager) window.soundManager.play('button');
            window.controlManager.calibratePose();
            alert('Body pose calibrated! Current shoulder position is now center.');
        });
    }
}

// Setup Sound Toggle
function setupSoundToggle() {
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    const soundIcon = document.getElementById('sound-icon');
    
    if (!soundToggleBtn || !soundIcon) return;
    
    soundToggleBtn.addEventListener('click', () => {
        if (window.soundManager) {
            const muted = window.soundManager.toggleMute();
            soundIcon.className = muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            window.soundManager.play('button');
        }
    });
}

// Setup Next button (from congratulations screen)
function setupPlayAgainButton() {
    const playAgainBtn = document.getElementById('next-btn');
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', () => {
            if (window.soundManager) window.soundManager.play('button');
            console.log('Next button clicked, showing runway landing animation...');
            
            // Hide instruction screen explicitly
            const instructionScreen = document.getElementById('instruction-screen');
            if (instructionScreen) {
                instructionScreen.classList.remove('active');
                instructionScreen.style.display = 'none';
            }
            
            // Hide game over screens using reusable function
            if (window.viewManager) {
                window.viewManager.hideGameOverScreens();
                // Show leaderboard with next button but WITHOUT welcome-actions or close button (game over flow)
                // Parameters: withLogo=true, withButton=false, withPlaneAnimation=true, planeInPosition=false, showLeaderboard=true, showLeaderboardNextBtn=true, showCloseButton=false
                window.viewManager.showRunwayLandingAnimation(true, false, true, false, true, true, false);
            }
        });
    }
}

// Setup Leaderboard Next button
function setupLeaderboardNextButton() {
    const leaderboardNextBtn = document.getElementById('leaderboard-next-btn');
    if (leaderboardNextBtn) {
        leaderboardNextBtn.addEventListener('click', async () => {
            if (window.soundManager) window.soundManager.play('button');
            console.log('Leaderboard next button clicked, checking for QR code...');
            
            // Ensure QR code is generated before showing passport
            if (!window.playerData?.qr_code_url && window.playerData?.id) {
                console.log('QR code not ready, waiting for generation...');
                // Wait a bit for the saveScore API to complete
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            // Hide leaderboard
            const leaderboardContainer = document.querySelector('.leaderboard-container');
            const leaderboardActions = document.querySelector('.leaderboard-actions');
            if (leaderboardContainer) leaderboardContainer.classList.remove('active');
            if (leaderboardActions) leaderboardActions.classList.remove('active');
            
            // Show passport animation (without auto-reload)
            if (window.viewManager) {
                window.viewManager.showPassportAnimation();
            }
        });
    }
}

// Setup Passport Done button
function setupPassportDoneButton() {
    const passportDoneBtn = document.getElementById('passport-done-btn');
    if (passportDoneBtn) {
        passportDoneBtn.addEventListener('click', () => {
            if (window.soundManager) window.soundManager.play('button');
            console.log('Passport done button clicked, reloading page...');
            
            // Reload the page
            window.location.reload();
        });
    }
}

// Setup View Leaderboard button
function setupViewLeaderboardButton() {
    const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
    if (viewLeaderboardBtn) {
        viewLeaderboardBtn.addEventListener('click', () => {
            if (window.soundManager) window.soundManager.play('button');
            console.log('View leaderboard button clicked...');
            
            // Hide instruction screen explicitly
            const instructionScreen = document.getElementById('instruction-screen');
            if (instructionScreen) {
                instructionScreen.classList.remove('active');
                instructionScreen.style.display = 'none';
            }
            
            if (window.viewManager) {
                // Show leaderboard WITH close button (welcome screen flow)
                window.viewManager.showRunwayLandingAnimation(true, false, false, false, true, false, true);
            }
        });
    }
}

// Setup Close Leaderboard button
function setupCloseLeaderboardButton() {
    const closeLeaderboardBtn = document.getElementById('close-leaderboard-btn');
    if (closeLeaderboardBtn) {
        closeLeaderboardBtn.addEventListener('click', () => {
            if (window.soundManager) window.soundManager.play('button');
            console.log('Close leaderboard button clicked...');
            if (window.viewManager) {
                window.viewManager.showRunwayLandingAnimation(true, true, false, true, false, false);
            }
        });
    }
}

// Export snow effect for cleanup
window.destroySnowEffect = function() {
    if (snowEffect && snowEffect.destroy) {
        snowEffect.destroy();
        snowEffect = null;
    }
};

// Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 1920,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [PreloadScene, GameScene],
    backgroundColor: 'transparent'
};

// Global game initialization function
window.initializeGame = function() {
    console.log('Initializing Phaser game...');
    const game = new Phaser.Game(config);
    return game;
};

export default config;
