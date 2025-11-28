// Tilt Control using Device Orientation API
export default class TiltControl {
    constructor() {
        this.enabled = false;
        this.horizontalInput = 0; // -1 (left) to 1 (right)
        this.calibrationOffset = 0;
        this.sensitivity = 1.0;
        this.maxTiltAngle = 30; // Maximum tilt angle in degrees
        this.onTiltChange = null;
        this.permissionGranted = false;
    }

    async requestPermission() {
        // For iOS 13+ devices, need to request permission
        if (typeof DeviceOrientationEvent !== 'undefined' && 
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                this.permissionGranted = (permission === 'granted');
                console.log('Device orientation permission:', permission);
                return this.permissionGranted;
            } catch (error) {
                console.error('Error requesting device orientation permission:', error);
                return false;
            }
        } else {
            // For other browsers, permission is automatic
            this.permissionGranted = true;
            return true;
        }
    }

    async initialize() {
        const hasPermission = await this.requestPermission();
        
        if (!hasPermission) {
            console.warn('Device orientation permission not granted');
            return false;
        }

        // Check if device orientation is supported
        if (!window.DeviceOrientationEvent) {
            console.warn('Device orientation not supported');
            return false;
        }

        // Listen to device orientation events
        window.addEventListener('deviceorientation', (event) => this.handleOrientation(event), true);
        
        console.log('Tilt control initialized');
        return true;
    }

    handleOrientation(event) {
        if (!this.enabled) {
            this.horizontalInput = 0;
            return;
        }

        // Get gamma (left-right tilt) from device orientation
        // gamma: -90 to 90 (negative = left, positive = right)
        let gamma = event.gamma;

        if (gamma === null) {
            this.horizontalInput = 0;
            return;
        }

        // Apply calibration offset
        gamma -= this.calibrationOffset;

        // Normalize to -1 to 1 range
        let normalizedTilt = gamma / this.maxTiltAngle;
        
        // Clamp to -1 to 1
        normalizedTilt = Math.max(-1, Math.min(1, normalizedTilt));

        // Apply sensitivity
        this.horizontalInput = normalizedTilt * this.sensitivity;

        if (this.onTiltChange) {
            this.onTiltChange(this.horizontalInput);
        }
    }

    calibrate() {
        // Set current tilt as center/zero position
        window.addEventListener('deviceorientation', (event) => {
            this.calibrationOffset = event.gamma || 0;
            console.log('Tilt calibrated. Offset:', this.calibrationOffset);
        }, { once: true });
    }

    enable() {
        if (!this.permissionGranted) {
            console.warn('Cannot enable tilt control: permission not granted');
            return;
        }
        this.enabled = true;
        console.log('Tilt control enabled');
    }

    disable() {
        this.enabled = false;
        this.horizontalInput = 0;
        console.log('Tilt control disabled');
    }

    getHorizontalInput() {
        return this.horizontalInput;
    }

    setSensitivity(value) {
        this.sensitivity = Math.max(0.1, Math.min(2.0, value));
        console.log('Tilt sensitivity set to:', this.sensitivity);
    }

    isSupported() {
        return typeof DeviceOrientationEvent !== 'undefined';
    }

    destroy() {
        this.disable();
        window.removeEventListener('deviceorientation', this.handleOrientation);
    }
}
