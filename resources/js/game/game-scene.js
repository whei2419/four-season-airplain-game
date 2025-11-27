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
let backgrounds = [];
let decorativeClouds = [];
let backgroundSpeed = 80;
let cloudSpeed = 100;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        console.log('Creating game scene...');
        
        // Create wide scrolling backgrounds (2 copies for seamless loop)
        backgrounds = [];
        for (let i = 0; i < 2; i++) {
            const bg = this.add.image(810, 960 + (i * 1920), 'background');
            bg.setOrigin(0.5, 0.5);
            // Make background wide enough to cover horizontal movement
            bg.displayWidth = 3240; // 2x canvas width for smooth horizontal scrolling
            bg.scaleY = bg.scaleX; // Maintain aspect ratio
            backgrounds.push(bg);
        }
        
        // Add decorative clouds on the sides
        decorativeClouds = [];
        this.createDecorativeClouds();
        
        // Add header at top (1080px width, centered, fixed to camera)
        const header = this.add.image(810, 0, 'header');
        header.setOrigin(0.5, 0);
        header.displayWidth = 1080;
        header.scaleY = header.scaleX;
        header.setDepth(1000);
        header.setScrollFactor(0); // Header stays fixed on screen
        
        // Create player at bottom center
        player = this.physics.add.sprite(810, 1700, 'player');
        player.setScale(0.2);
        player.setCollideWorldBounds(true);
        
        // Set world bounds to be wider than camera for smooth scrolling
        this.physics.world.setBounds(0, 0, 1620, 1920);
        
        // Camera follows player horizontally only (smooth follow)
        this.cameras.main.setBounds(0, 0, 1620, 1920);
        this.cameras.main.startFollow(player, true, 0.08, 0);
        this.cameras.main.setDeadzone(200, 0); // Player can move 200px before camera follows
        
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
        
        // Scroll backgrounds downward (parallax effect)
        backgrounds.forEach(bg => {
            bg.y += backgroundSpeed * (1/60); // Move down
            
            // Reset position when off screen
            if (bg.y > 1920 + 960) {
                bg.y = -960;
            }
        });
        
        // Scroll clouds downward (faster than background)
        decorativeClouds.forEach(cloud => {
            cloud.y += cloudSpeed * (1/60); // Move down faster
            
            // Reset position when off screen
            if (cloud.y > 1920 + 100) {
                // Randomize position when resetting
                const isLeftSide = Math.random() > 0.5;
                cloud.x = isLeftSide ? 
                    Phaser.Math.Between(50, 350) : 
                    Phaser.Math.Between(1270, 1570);
                cloud.y = -100;
            }
        });
    }

    spawnObject() {
        if (timeLeft <= 0) return;
        
        const types = [
            { key: 'bottle', scale: 0.12 },
            { key: 'present', scale: 0.06 },
            { key: 'badcloud', scale: 0.15 }
        ];
        const selectedType = Phaser.Utils.Array.GetRandom(types);
        const x = Phaser.Math.Between(150, 1470);
        
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
            fontFamily: 'Gordita, Arial, sans-serif',
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

    createDecorativeClouds() {
        // Create 8-12 random clouds on the sides
        const cloudCount = Phaser.Math.Between(8, 12);
        
        for (let i = 0; i < cloudCount; i++) {
            // Random position - left or right side
            const isLeftSide = Math.random() > 0.5;
            let x;
            
            if (isLeftSide) {
                x = Phaser.Math.Between(50, 350); // Left side - more visible
            } else {
                x = Phaser.Math.Between(1270, 1570); // Right side - more visible
            }
            
            const y = Phaser.Math.Between(300, 1700); // Random vertical position
            
            // Create cloud
            const cloud = this.add.image(x, y, 'cloud');
            
            // Random scale (0.15 to 0.25) - larger
            const scale = Phaser.Math.FloatBetween(0.15, 0.25);
            cloud.setScale(scale);
            
            // Random opacity (0.6 to 0.9) - very visible
            const opacity = Phaser.Math.FloatBetween(0.6, 0.9);
            cloud.setAlpha(opacity);
            
            // Set depth behind player but in front of background
            cloud.setDepth(1);
            
            // Add to array for parallax scrolling
            decorativeClouds.push(cloud);
        }
    }
}
