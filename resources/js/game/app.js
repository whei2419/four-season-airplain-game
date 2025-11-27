// Game JavaScript - Phaser Configuration
import Phaser from 'phaser';
import Alpine from 'alpinejs';
import SnowEffect from '../snow';
import PreloadScene from './preload-scene';
import GameScene from './game-scene';
import './welcome';

window.Alpine = Alpine;
Alpine.start();

// Initialize Snow Effect
let snowEffect = null;
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('snow-container')) {
        snowEffect = new SnowEffect('snow-container');
    }
});

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
    backgroundColor: '#87CEEB'
};

// Global game initialization function
window.initializeGame = function() {
    console.log('Initializing Phaser game...');
    const game = new Phaser.Game(config);
    return game;
};

export default config;
