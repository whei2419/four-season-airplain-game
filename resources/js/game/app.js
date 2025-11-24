// Game JavaScript - Phaser Configuration
import Phaser from 'phaser';

// Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: '#87CEEB'
};

// Game variables
let player;
let cursors;
let score = 0;
let scoreText;

function preload() {
    // Load game assets here
    // this.load.image('airplane', '/assets/airplane.png');
    // this.load.image('cloud', '/assets/cloud.png');
    console.log('Preloading game assets...');
}

function create() {
    console.log('Creating game scene...');
    
    // Create player (placeholder rectangle)
    player = this.add.rectangle(400, 500, 50, 30, 0xff0000);
    this.physics.add.existing(player);
    
    // Score text
    scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#fff',
        fontFamily: 'Arial',
        stroke: '#000',
        strokeThickness: 4
    });
    
    // Input
    cursors = this.input.keyboard.createCursorKeys();
    
    // Add welcome text
    const welcomeText = this.add.text(400, 300, 'Four Season Airplane Game', {
        fontSize: '24px',
        fill: '#fff',
        fontFamily: 'Arial',
        stroke: '#000',
        strokeThickness: 3
    });
    welcomeText.setOrigin(0.5);
}

function update() {
    // Player movement
    if (cursors.left.isDown) {
        player.x -= 5;
    } else if (cursors.right.isDown) {
        player.x += 5;
    }
    
    if (cursors.up.isDown) {
        player.y -= 5;
    } else if (cursors.down.isDown) {
        player.y += 5;
    }
    
    // Keep player in bounds
    player.x = Phaser.Math.Clamp(player.x, 25, 775);
    player.y = Phaser.Math.Clamp(player.y, 25, 575);
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only start the game if the game container exists
    if (document.getElementById('game-container')) {
        console.log('Initializing Phaser game...');
        const game = new Phaser.Game(config);
    }
});

export default config;
