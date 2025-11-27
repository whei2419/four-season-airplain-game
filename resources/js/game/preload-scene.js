// Preload Scene - Load all game assets
import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        console.log('Preloading game assets...');

        // Load game assets using URLs from Laravel
        // No loading bar needed - assets load instantly on single page
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
