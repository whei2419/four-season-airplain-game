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
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('snow-container')) {
        new SnowEffect('snow-container');
    }
});

// Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 1620,
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

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only start the game if the game container exists
    if (document.getElementById('game-container')) {
        console.log('Initializing Phaser game...');
        const game = new Phaser.Game(config);
    }
});

export default config;
