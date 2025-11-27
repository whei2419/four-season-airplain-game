// Preload Scene - Load all game assets
import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        console.log('Preloading game assets...');

        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Loading text
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontSize: '48px',
            fontFamily: 'Gordita, sans-serif',
            fill: '#ffffff',
            fontWeight: 'bold'
        });
        loadingText.setOrigin(0.5);

        // Progress bar background
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 320, height / 2, 640, 50);

        // Percentage text
        const percentText = this.add.text(width / 2, height / 2 + 25, '0%', {
            fontSize: '36px',
            fontFamily: 'Gordita, sans-serif',
            fill: '#ffffff'
        });
        percentText.setOrigin(0.5);

        // Update progress bar
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x3BB776, 1);
            progressBar.fillRect(width / 2 - 310, height / 2 + 10, 620 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        // Load game assets using URLs from Laravel
        const assets = window.gameAssets || {};
        this.load.image('player', assets.player);
        this.load.image('background', assets.background);
        this.load.image('header', assets.header);
        this.load.image('cloud', assets.cloud);
        this.load.image('bottle', assets.bottle);
        this.load.image('present', assets.present);
        this.load.image('badcloud', assets.badcloud);
    }

    create() {
        console.log('Assets loaded, starting game...');
        // Start the game scene
        this.scene.start('GameScene');
    }
}
