// Game JavaScript - Phaser Configuration
import Phaser from 'phaser';
import Alpine from 'alpinejs';
import SnowEffect from '../snow';
import PreloadScene from './preload-scene';
import GameScene from './game-scene';
import ControlManager from './controls/control-manager';
import ViewManager from './view-manager';
import LeaderboardManager from './leaderboard-manager';
import './welcome';

window.Alpine = Alpine;
Alpine.start();

// Export SnowEffect for game over screen
window.SnowEffect = SnowEffect;

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
    if (document.getElementById('snow-container')) {
        snowEffect = new SnowEffect('snow-container');
    }
    
    // Setup control mode UI
    setupControlUI();
    
    // Setup play again button
    setupPlayAgainButton();
    
    // Setup leaderboard next button
    setupLeaderboardNextButton();
    
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
        if (currentMode === 'keyboard') {
            // Switch to pose mode
            const videoElement = document.getElementById('gesture-video');
            const canvasElement = document.getElementById('gesture-canvas');
            
            const success = await window.controlManager.initializePoseMode(videoElement, canvasElement);
            
            if (success) {
                window.controlManager.setControlMode('pose');
                currentMode = 'pose';
                document.getElementById('control-mode-text').textContent = 'Body Pose';
                cameraContainer.style.display = 'block';
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
            window.controlManager.calibratePose();
            alert('Body pose calibrated! Current shoulder position is now center.');
        });
    }
}

// Setup Next button (from congratulations screen)
function setupPlayAgainButton() {
    const playAgainBtn = document.getElementById('next-btn');
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', () => {
            console.log('Next button clicked, showing runway landing animation...');
            
            // Hide game over screens using reusable function
            if (window.viewManager) {
                window.viewManager.hideGameOverScreens();
                window.viewManager.showRunwayLandingAnimation(true, true, true, false, true, true);
            }
        });
    }
}

// Setup Leaderboard Next button
function setupLeaderboardNextButton() {
    const leaderboardNextBtn = document.getElementById('leaderboard-next-btn');
    if (leaderboardNextBtn) {
        leaderboardNextBtn.addEventListener('click', () => {
            console.log('Leaderboard next button clicked, reloading page...');
            window.location.reload();
        });
    }
}

// Setup View Leaderboard button
function setupViewLeaderboardButton() {
    const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
    if (viewLeaderboardBtn) {
        viewLeaderboardBtn.addEventListener('click', () => {
            console.log('View leaderboard button clicked...');
            if (window.viewManager) {
                window.viewManager.showRunwayLandingAnimation(true, false, false, false, true, false);
            }
        });
    }
}

// Setup Close Leaderboard button
function setupCloseLeaderboardButton() {
    const closeLeaderboardBtn = document.getElementById('close-leaderboard-btn');
    if (closeLeaderboardBtn) {
        closeLeaderboardBtn.addEventListener('click', () => {
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
