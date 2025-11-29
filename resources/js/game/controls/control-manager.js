// Control Manager - Coordinates all input methods
import BodyPoseControl from './body-pose-control.js';

export default class ControlManager {
    constructor() {
        this.controlMode = 'keyboard'; // 'keyboard' or 'pose'
        this.bodyPoseControl = new BodyPoseControl();
        
        // Input states
        this.horizontalInput = 0; // -1 (left) to 1 (right)
        this.verticalInput = 0;   // -1 (down) to 1 (up)
        
        // Keyboard state
        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false
        };
    }

    async initializePoseMode(videoElement, canvasElement) {
        try {
            // Initialize body pose control
            await this.bodyPoseControl.initialize(videoElement, canvasElement);
            
            console.log('Pose mode initialized');
            return true;
        } catch (error) {
            console.error('Failed to initialize pose mode:', error);
            return false;
        }
    }

    setControlMode(mode) {
        this.controlMode = mode;
        
        if (mode === 'pose') {
            this.bodyPoseControl.enable();
            console.log('Switched to body pose control mode');
        } else {
            this.bodyPoseControl.disable();
            console.log('Switched to keyboard control mode');
        }
    }

    calibratePose() {
        if (this.bodyPoseControl) {
            this.bodyPoseControl.calibrate();
        }
    }

    setupKeyboardControls() {
        window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.keys.left = true;
                    break;
                case 'ArrowRight':
                    this.keys.right = true;
                    break;
                case 'ArrowUp':
                    this.keys.up = true;
                    break;
                case 'ArrowDown':
                    this.keys.down = true;
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.keys.left = false;
                    break;
                case 'ArrowRight':
                    this.keys.right = false;
                    break;
                case 'ArrowUp':
                    this.keys.up = false;
                    break;
                case 'ArrowDown':
                    this.keys.down = false;
                    break;
            }
        });
    }

    getInput() {
        if (this.controlMode === 'pose') {
            // Get input from body pose control
            return this.bodyPoseControl.getInput();
        } else {
            // Keyboard controls
            let horizontal = 0;
            let vertical = 0;
            
            if (this.keys.left) horizontal = -1;
            if (this.keys.right) horizontal = 1;
            if (this.keys.up) vertical = 1;
            if (this.keys.down) vertical = -1;
            
            return { horizontal, vertical };
        }
    }

    destroy() {
        this.bodyPoseControl.destroy();
    }
}
