// Control Manager - Coordinates all input methods
import GestureControl from './gesture-control.js';
import TiltControl from './tilt-control.js';

export default class ControlManager {
    constructor() {
        this.controlMode = 'keyboard'; // 'keyboard' or 'gesture'
        this.gestureControl = new GestureControl();
        this.tiltControl = new TiltControl();
        
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

    async initializeGestureMode(videoElement, canvasElement) {
        try {
            // Initialize gesture control
            await this.gestureControl.initialize(videoElement, canvasElement);
            
            // Initialize tilt control
            const tiltSupported = await this.tiltControl.initialize();
            
            if (!tiltSupported) {
                console.warn('Tilt control not supported on this device');
            }
            
            // Set up callbacks
            this.gestureControl.onGestureChange = (input) => {
                this.verticalInput = input;
            };
            
            this.tiltControl.onTiltChange = (input) => {
                this.horizontalInput = input;
            };
            
            console.log('Gesture mode initialized');
            return true;
        } catch (error) {
            console.error('Failed to initialize gesture mode:', error);
            return false;
        }
    }

    setControlMode(mode) {
        this.controlMode = mode;
        
        if (mode === 'gesture') {
            this.gestureControl.enable();
            this.tiltControl.enable();
            console.log('Switched to gesture control mode');
        } else {
            this.gestureControl.disable();
            this.tiltControl.disable();
            console.log('Switched to keyboard control mode');
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
        if (this.controlMode === 'gesture') {
            return {
                horizontal: this.tiltControl.getHorizontalInput(),
                vertical: this.gestureControl.getVerticalInput()
            };
        } else {
            // Keyboard input
            let horizontal = 0;
            let vertical = 0;
            
            if (this.keys.left) horizontal = -1;
            if (this.keys.right) horizontal = 1;
            if (this.keys.up) vertical = 1;
            if (this.keys.down) vertical = -1;
            
            return { horizontal, vertical };
        }
    }

    calibrateTilt() {
        if (this.controlMode === 'gesture') {
            this.tiltControl.calibrate();
        }
    }

    destroy() {
        this.gestureControl.destroy();
        this.tiltControl.destroy();
    }
}
