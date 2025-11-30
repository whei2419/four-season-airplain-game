// Game Scene - Main gameplay logic
import Phaser from 'phaser';

// Game variables
let player;
let cursors;
let score = 0;
let scoreText;
let timeLeft = 60; // Game duration in seconds
let timerText;
let gameObjects;
let objectTimer;
let timerEvent; // Store timer event reference
let backgrounds = [];
let decorativeClouds = [];
let backgroundSpeed = 150;
let cloudSpeed = 180;
let gameTime = 0;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        console.log('Creating game scene...');
        
        // Create wide scrolling backgrounds (seamless vertical loop with 3 copies to prevent gaps)
        backgrounds = [];
        for (let i = 0; i < 3; i++) {
            const bg = this.add.image(540, (i * 1920) - 960, 'background');
            bg.setOrigin(0.5, 0.5);
            bg.displayWidth = 1080; // Match canvas width
            bg.scaleY = bg.scaleX; // Maintain aspect ratio
            backgrounds.push(bg);
        }
        
        // Signal that game is ready (background is loaded)
        window.gameReady = true;
        console.log('Game background loaded, signaling ready');
        
        // Add decorative clouds on the sides
        decorativeClouds = [];
        this.createDecorativeClouds();
        
        // Add header at top (1080px width, centered on camera, fixed to camera)
        const header = this.add.image(540, 0, 'header');
        header.setOrigin(0.5, 0);
        header.displayWidth = 1080;
        header.scaleY = header.scaleX;
        header.setDepth(1000);
        header.setScrollFactor(0); // Header stays fixed on screen
        
        // Create player at bottom center (off-screen initially)
        player = this.physics.add.sprite(540, 2100, 'player');
        player.setScale(0.2);
        player.setCollideWorldBounds(true);
        player.setDepth(50); // Middle depth for cloud layering
        
        // Disable physics body during entrance animation
        player.body.enable = false;
        
        // Animate plane entering from bottom
        this.tweens.add({
            targets: player,
            y: 1600,
            duration: 1500,
            ease: 'Power2',
            onComplete: () => {
                // Re-enable physics and start gameplay
                player.body.enable = true;
                this.startGameplay();
            }
        });
        
        // Set world bounds to match camera
        this.physics.world.setBounds(0, 0, 1080, 1920);
        
        // Create group for collectible objects
        gameObjects = this.physics.add.group();
        
        // Score text (hidden, using HTML overlay)
        scoreText = this.add.text(0, 0, '', { fontSize: '1px' });
        timerText = this.add.text(0, 0, '', { fontSize: '1px' });
        
        // Input
        cursors = this.input.keyboard.createCursorKeys();
        
        // Don't spawn objects immediately - wait for plane animation
        objectTimer = null;
        timerEvent = null;
        
        // Collision detection
        this.physics.add.overlap(player, gameObjects, this.collectObject, null, this);
        
        // Reset game variables
        score = 0;
        timeLeft = 60; // Game duration in seconds
        gameTime = 0;
        document.getElementById('score').textContent = score;
        document.getElementById('timer').textContent = '01:00';
    }
    
    startGameplay() {
        // Start game timer countdown
        timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
        
        // Reduce spawn rate for better performance (4 seconds instead of 3)
        objectTimer = this.time.addEvent({
            delay: 4000,
            callback: this.spawnObject,
            callbackScope: this,
            loop: true
        });
    }

    update(time, delta) {
        // Use delta for smooth frame-rate independent movement
        const deltaSeconds = delta / 1000;
        gameTime += deltaSeconds;
        
        // Increase speed over time (10% faster every 10 seconds, max 2x speed)
        const speedMultiplier = Math.min(1 + (Math.floor(gameTime / 10) * 0.1), 2.0);
        const currentBackgroundSpeed = backgroundSpeed * speedMultiplier;
        const currentCloudSpeed = cloudSpeed * speedMultiplier;
        
        // Get input from control manager (supports keyboard and gesture controls)
        const input = window.controlManager ? window.controlManager.getInput() : { horizontal: 0, vertical: 0 };
        
        // Player horizontal movement (left/right)
        if (input.horizontal !== 0) {
            player.setVelocityX(input.horizontal * 400);
        } else if (cursors.left.isDown) {
            player.setVelocityX(-400);
        } else if (cursors.right.isDown) {
            player.setVelocityX(400);
        } else {
            player.setVelocityX(0);
        }
        
        // Player vertical movement (up/down)
        if (input.vertical !== 0) {
            player.setVelocityY(-input.vertical * 450); // Negative because Y increases downward
        } else if (cursors.up.isDown) {
            player.setVelocityY(-450);
        } else if (cursors.down.isDown) {
            player.setVelocityY(450);
        } else {
            player.setVelocityY(0);
        }
        
        // Scroll backgrounds downward only - camera movement creates parallax naturally
        backgrounds.forEach(bg => {
            bg.y += currentBackgroundSpeed * deltaSeconds;
            
            // Reset position when off screen (seamless loop with 3 backgrounds)
            if (bg.y > 1920 + 960) {
                bg.y -= 1920 * 3;
            }
        });
        
        // Scroll clouds downward - camera creates natural parallax
        decorativeClouds.forEach(cloud => {
            cloud.y += currentCloudSpeed * deltaSeconds;
            
            // Reset position when off screen
            if (cloud.y > 1920 + 100) {
                cloud.x = Phaser.Math.Between(50, 1030);
                cloud.y = -100;
            }
        });
        
        // Move objects down - they stay in X position, player flies to them
        gameObjects.children.entries.forEach(obj => {
            obj.y += currentBackgroundSpeed * deltaSeconds;
            
            // Remove if off screen
            if (obj.y > 1920 + 100) {
                obj.destroy();
            }
        });
    }

    spawnObject() {
        if (timeLeft <= 0) return;
        
        const types = [
            { key: 'bottle', scale: 0.08 },
            { key: 'present', scale: 0.04 },
            { key: 'badcloud', scale: 0.10 }
        ];
        const selectedType = Phaser.Utils.Array.GetRandom(types);
        const x = Phaser.Math.Between(100, 980);
        
        const obj = gameObjects.create(x, -50, selectedType.key);
        obj.setScale(selectedType.scale);
        obj.setVelocityY(0); // No physics velocity - manual movement in update
        obj.setVelocityX(0); // No horizontal movement
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
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            document.getElementById('timer').textContent = formattedTime;
        } else {
            // Game over
            objectTimer.remove();
            this.endGame();
        }
    }

    endGame() {
        console.log('Game Over! Final Score:', score);
        
        // Pause game physics
        this.physics.pause();
        
        // Stop object spawning
        if (objectTimer) {
            objectTimer.remove();
        }
        
        // Stop timer event
        if (timerEvent) {
            timerEvent.remove();
        }
        
        // Hide the Phaser game scene
        this.cameras.main.setVisible(false);
        
        // Use view manager to show game over sequence
        if (window.viewManager) {
            // Hide game UI and container
            window.viewManager.removeActiveClass(['game-ui', 'camera-container', 'game-container']);
            
            // Start the game over sequence (descending -> runway -> congratulations)
            window.viewManager.showGameOver(score);
        } else {
            // Fallback if view manager not available
            const gameUI = document.getElementById('game-ui');
            const cameraContainer = document.getElementById('camera-container');
            if (gameUI) gameUI.style.display = 'none';
            if (cameraContainer) cameraContainer.style.display = 'none';
            window.showGameOverScreen(score);
        }
    }

    createDecorativeClouds() {
        // Reduce cloud count for better performance (6-8 instead of 8-12)
        const cloudCount = Phaser.Math.Between(6, 8);
        
        for (let i = 0; i < cloudCount; i++) {
            // Random position - spread across entire screen
            const x = Phaser.Math.Between(50, 1030);
            const y = Phaser.Math.Between(200, 1800);
            
            // Create cloud
            const cloud = this.add.image(x, y, 'cloud');
            
            // Random scale (0.15 to 0.25)
            const scale = Phaser.Math.FloatBetween(0.15, 0.25);
            cloud.setScale(scale);
            
            // Random opacity (0.6 to 0.9)
            const opacity = Phaser.Math.FloatBetween(0.6, 0.9);
            cloud.setAlpha(opacity);
            
            // Randomize depth - some clouds in front, some behind plane
            const depth = Math.random() > 0.5 ? 1 : 100;
            cloud.setDepth(depth);
            
            // Add to array for parallax scrolling
            decorativeClouds.push(cloud);
        }
    }
}
