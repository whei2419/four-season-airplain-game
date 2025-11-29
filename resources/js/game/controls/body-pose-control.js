// Body Pose Control using MediaPipe Pose
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

export default class BodyPoseControl {
    constructor() {
        this.enabled = false;
        this.horizontalInput = 0; // -1 (left) to 1 (right) based on shoulder tilt
        this.verticalInput = 0; // -1 (down) to 1 (up) based on hand height
        this.pose = null;
        this.camera = null;
        this.videoElement = null;
        this.canvasElement = null;
        this.shoulderTiltCalibration = 0; // Neutral shoulder angle
    }

    async initialize(videoElement, canvasElement) {
        this.videoElement = videoElement;
        this.canvasElement = canvasElement;

        // Set canvas dimensions to match video
        this.canvasElement.width = 320;
        this.canvasElement.height = 240;

        // Initialize MediaPipe Pose
        this.pose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            }
        });

        this.pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            smoothSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        this.pose.onResults((results) => this.onResults(results));

        // Initialize camera
        this.camera = new Camera(this.videoElement, {
            onFrame: async () => {
                await this.pose.send({ image: this.videoElement });
            },
            width: 320,
            height: 240
        });

        await this.camera.start();
        console.log('Body pose control initialized');
    }

    onResults(results) {
        if (!results.poseLandmarks) {
            this.horizontalInput = 0;
            this.verticalInput = 0;
            return;
        }

        const landmarks = results.poseLandmarks;
        
        // Store landmarks for calibration
        this.lastLandmarks = landmarks;
        
        // Draw pose landmarks on canvas for visual feedback
        this.drawPoseLandmarks(landmarks);

        if (this.enabled) {
            // Detect shoulder tilt for horizontal movement
            this.detectShoulderTilt(landmarks);
            
            // Detect hand height for vertical movement
            this.detectHandHeight(landmarks);
        }
    }

    detectShoulderTilt(landmarks) {
        // Key landmarks:
        // 11 = left shoulder
        // 12 = right shoulder
        
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        
        if (!leftShoulder || !rightShoulder) {
            this.horizontalInput = 0;
            return;
        }

        // Calculate shoulder tilt angle
        const shoulderAngle = Math.atan2(
            rightShoulder.y - leftShoulder.y,
            rightShoulder.x - leftShoulder.x
        );

        // Normalize relative to calibration (0 degrees = neutral)
        const tiltAngle = shoulderAngle - this.shoulderTiltCalibration;
        
        // Convert to -1 to 1 range (±15 degrees = max tilt)
        const maxTilt = 15 * (Math.PI / 180); // 15 degrees in radians
        this.horizontalInput = Math.max(-1, Math.min(1, tiltAngle / maxTilt));
    }

    detectHandHeight(landmarks) {
        // Key landmarks:
        // 11 = left shoulder
        // 12 = right shoulder
        // 15 = left wrist
        // 16 = right wrist
        
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        const leftWrist = landmarks[15];
        const rightWrist = landmarks[16];
        
        if (!leftShoulder || !rightShoulder || !leftWrist || !rightWrist) {
            this.verticalInput = 0;
            return;
        }

        if (leftWrist.visibility < 0.5 || rightWrist.visibility < 0.5) {
            this.verticalInput = 0;
            return;
        }
        
        // Calculate average arm height (positive = arms up, negative = arms down)
        const leftArmHeight = leftShoulder.y - leftWrist.y;
        const rightArmHeight = rightShoulder.y - rightWrist.y;
        const avgArmHeight = (leftArmHeight + rightArmHeight) / 2;
        
        // Arms raised (T-pose or higher) - plane goes up
        // More forgiving: any position where wrists are near or above shoulders
        if (avgArmHeight > -0.1) {
            // Scale from -0.1 (arms slightly below shoulders) to 0.2 (arms well above)
            this.verticalInput = Math.min(1, Math.max(0, (avgArmHeight + 0.1) / 0.3));
        }
        // Arms down at sides - plane goes down
        else {
            // Scale from -0.1 to -0.4 (arms clearly down)
            this.verticalInput = Math.max(-1, Math.min(0, (avgArmHeight + 0.1) / 0.3));
        }
    }

    drawPoseLandmarks(landmarks) {
        if (!this.canvasElement) return;

        const ctx = this.canvasElement.getContext('2d');
        const width = this.canvasElement.width;
        const height = this.canvasElement.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw key connections (shoulders and arms)
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;

        const connections = [
            [11, 12], // Shoulders
            [11, 13], [13, 15], // Left arm
            [12, 14], [14, 16], // Right arm
            [11, 23], [12, 24], // Torso
            [23, 24] // Hips
        ];

        connections.forEach(([start, end]) => {
            const startPoint = landmarks[start];
            const endPoint = landmarks[end];
            if (startPoint && endPoint && 
                startPoint.visibility > 0.5 && endPoint.visibility > 0.5) {
                ctx.beginPath();
                ctx.moveTo(startPoint.x * width, startPoint.y * height);
                ctx.lineTo(endPoint.x * width, endPoint.y * height);
                ctx.stroke();
            }
        });

        // Draw key landmarks
        ctx.fillStyle = '#FF0000';
        [0, 11, 12, 15, 16].forEach((index) => { // Nose, shoulders, wrists
            const landmark = landmarks[index];
            if (landmark && landmark.visibility > 0.5) {
                ctx.beginPath();
                ctx.arc(landmark.x * width, landmark.y * height, 5, 0, 2 * Math.PI);
                ctx.fill();
            }
        });

        // Draw reference line for shoulder tilt
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        if (leftShoulder && rightShoulder) {
            ctx.strokeStyle = '#FFFF00';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(leftShoulder.x * width, leftShoulder.y * height);
            ctx.lineTo(rightShoulder.x * width, rightShoulder.y * height);
            ctx.stroke();
        }
    }

    calibrate() {
        // Calibrate current shoulder position as neutral
        if (this.pose && this.lastLandmarks) {
            const leftShoulder = this.lastLandmarks[11];
            const rightShoulder = this.lastLandmarks[12];
            
            if (leftShoulder && rightShoulder) {
                this.shoulderTiltCalibration = Math.atan2(
                    rightShoulder.y - leftShoulder.y,
                    rightShoulder.x - leftShoulder.x
                );
                console.log('Body pose calibrated');
            }
        }
    }

    enable() {
        this.enabled = true;
        console.log('Body pose control enabled');
    }

    disable() {
        this.enabled = false;
        this.horizontalInput = 0;
        this.verticalInput = 0;
        console.log('Body pose control disabled');
    }

    getInput() {
        return {
            horizontal: this.horizontalInput,
            vertical: this.verticalInput
        };
    }

    async destroy() {
        if (this.camera) {
            this.camera.stop();
        }
        if (this.pose) {
            this.pose.close();
        }
    }
}
