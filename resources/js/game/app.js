// Game JavaScript - Phaser Configuration
import Phaser from 'phaser';
import Alpine from 'alpinejs';
import SnowEffect from '../snow';
import PreloadScene from './preload-scene';
import GameScene from './game-scene';
import ControlManager from './controls/control-manager';
import './welcome';

window.Alpine = Alpine;
Alpine.start();

// Initialize Control Manager
window.controlManager = new ControlManager();
window.controlManager.setupKeyboardControls();

// Initialize Snow Effect
let snowEffect = null;
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('snow-container')) {
        snowEffect = new SnowEffect('snow-container');
    }
    
    // Setup control mode UI
    setupControlUI();
});

// Setup control mode switching UI
function setupControlUI() {
    const controlModeBtn = document.getElementById('control-mode-btn');
    const calibrateBtn = document.getElementById('calibrate-btn');
    const cameraContainer = document.getElementById('camera-container');
    
    if (!controlModeBtn) return;
    
    let currentMode = 'pose';
    
    // Auto-initialize pose mode on load
    setTimeout(async () => {
        const videoElement = document.getElementById('gesture-video');
        const canvasElement = document.getElementById('gesture-canvas');
        
        const success = await window.controlManager.initializePoseMode(videoElement, canvasElement);
        
        if (success) {
            window.controlManager.setControlMode('pose');
            document.getElementById('control-mode-text').textContent = 'Body Pose';
            cameraContainer.style.display = 'block';
            calibrateBtn.style.display = 'inline-block';
            console.log('Body pose controls initialized automatically');
        } else {
            // Fallback to keyboard if pose fails
            currentMode = 'keyboard';
            document.getElementById('control-mode-text').textContent = 'Keyboard';
            console.log('Failed to initialize body pose controls, using keyboard');
        }
    }, 1000);
    
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
