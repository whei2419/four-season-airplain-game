// Game Scene - Main gameplay logic
import Phaser from 'phaser';

// Game variables
let player;
let cursors;
let score = 0;
let scoreText;
let timeLeft = 60;
let timerText;
let gameObjects;
let objectTimer;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        console.log('Creating game scene...');
        
        // Add background
        this.add.image(540, 960, 'background');
        
        // Add header at top (100% width, auto height, positioned at top left)
        const header = this.add.image(0, 0, 'header');
        header.setOrigin(0, 0);
        header.displayWidth = 1080;
        header.scaleY = header.scaleX;
        header.setDepth(1000);
        
        // Create player
        player = this.physics.add.sprite(540, 1600, 'player');
        player.setScale(0.2);
        player.setCollideWorldBounds(true);
        
        // Create group for collectible objects
        gameObjects = this.physics.add.group();
        
        // Score text (hidden, using HTML overlay)
        scoreText = this.add.text(0, 0, '', { fontSize: '1px' });
        timerText = this.add.text(0, 0, '', { fontSize: '1px' });
        
        // Input
        cursors = this.input.keyboard.createCursorKeys();
        
        // Spawn objects every 1.5 seconds
        objectTimer = this.time.addEvent({
            delay: 1500,
            callback: this.spawnObject,
            callbackScope: this,
            loop: true
        });
        
        // Collision detection
        this.physics.add.overlap(player, gameObjects, this.collectObject, null, this);
        
        // Game timer countdown
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
        
        // Reset game variables
        score = 0;
        timeLeft = 60;
        document.getElementById('score').textContent = score;
        document.getElementById('timer').textContent = timeLeft;
    }

    update() {
        // Player movement (horizontal only)
        if (cursors.left.isDown) {
            player.setVelocityX(-400);
        } else if (cursors.right.isDown) {
            player.setVelocityX(400);
        } else {
            player.setVelocityX(0);
        }
    }

    spawnObject() {
        if (timeLeft <= 0) return;
        
        const types = [
            { key: 'bottle', scale: 0.12 },
            { key: 'present', scale: 0.06 },
            { key: 'badcloud', scale: 0.15 }
        ];
        const selectedType = Phaser.Utils.Array.GetRandom(types);
        const x = Phaser.Math.Between(100, 980);
        
        const obj = gameObjects.create(x, -50, selectedType.key);
        obj.setScale(selectedType.scale);
        obj.setVelocityY(300);
        obj.objectType = selectedType.key;
        
        // Remove objects that fall off screen
        obj.checkWorldBounds = true;
        obj.outOfBoundsKill = true;
    }

    collectObject(player, obj) {
        const x = obj.x;
        const y = obj.y;
        
        obj.destroy();
        
        // Determine points and color
        let points = 0;
        let color = 0x3ACD80; // Green for positive
        
        if (obj.objectType === 'bottle') {
            points = 15;
            score += 15;
        } else if (obj.objectType === 'present') {
            points = 10;
            score += 10;
        } else if (obj.objectType === 'badcloud') {
            points = -5;
            score -= 5;
            color = 0x000000; // Black for negative
        }
        
        // Create floating point indicator
        this.showPointIndicator(x, y, points, color);
        
        // Update HTML score display
        document.getElementById('score').textContent = score;
    }
    
    showPointIndicator(x, y, points, color) {
        // Create circle background
        const circle = this.add.circle(x, y, 35, color, 1);
        circle.setStrokeStyle(3, 0xFFFFFF); // White border
        
        // Create points text
        const pointText = this.add.text(x, y, (points > 0 ? '+' : '') + points, {
            fontSize: '28px',
            fontFamily: 'Gordita, sans-serif',
            fill: '#ffffff',
            fontWeight: 'bold'
        });
        pointText.setOrigin(0.5);
        
        // Animate and fade out
        this.tweens.add({
            targets: [circle, pointText],
            y: y - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                circle.destroy();
                pointText.destroy();
            }
        });
    }

    updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('timer').textContent = timeLeft;
        } else {
            // Game over
            objectTimer.remove();
            this.endGame();
        }
    }

    endGame() {
        console.log('Game Over! Final Score:', score);
        // TODO: Show game over screen and save score
    }
}
