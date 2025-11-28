// Gesture Control using MediaPipe Hands
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

export default class GestureControl {
    constructor() {
        this.enabled = false;
        this.verticalInput = 0; // -1 (down) to 1 (up)
        this.hands = null;
        this.camera = null;
        this.videoElement = null;
        this.canvasElement = null;
        this.onGestureChange = null;
    }

    async initialize(videoElement, canvasElement) {
        this.videoElement = videoElement;
        this.canvasElement = canvasElement;

        // Initialize MediaPipe Hands
        this.hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });

        this.hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7
        });

        this.hands.onResults((results) => this.onResults(results));

        // Initialize camera
        this.camera = new Camera(this.videoElement, {
            onFrame: async () => {
                if (this.enabled) {
                    await this.hands.send({ image: this.videoElement });
                }
            },
            width: 640,
            height: 480
        });

        await this.camera.start();
        console.log('Gesture control initialized');
    }

    onResults(results) {
        if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
            this.verticalInput = 0;
            return;
        }

        const landmarks = results.multiHandLandmarks[0];
        
        // Draw hand landmarks on canvas for visual feedback
        this.drawHandLandmarks(landmarks);

        // Detect gestures
        this.detectGesture(landmarks);

        if (this.onGestureChange) {
            this.onGestureChange(this.verticalInput);
        }
    }

    detectGesture(landmarks) {
        // Key landmarks:
        // 0 = wrist
        // 4 = thumb tip
        // 8 = index finger tip
        // 12 = middle finger tip
        // 16 = ring finger tip
        // 20 = pinky tip

        const wrist = landmarks[0];
        const indexTip = landmarks[8];
        const middleTip = landmarks[12];
        const ringTip = landmarks[16];
        const pinkyTip = landmarks[20];

        // Calculate average fingertips Y position relative to wrist
        const avgFingerY = (indexTip.y + middleTip.y + ringTip.y + pinkyTip.y) / 4;
        const wristY = wrist.y;

        // Gesture 1: Hand DOWN (fingers below wrist) = Move plane UP
        // When hand points downward, fingertips Y > wrist Y (in normalized coords, Y increases downward)
        if (avgFingerY > wristY + 0.1) {
            this.verticalInput = 1; // Move UP
            console.log('Gesture: Hand DOWN - Move UP');
        }
        // Gesture 2: Hand horizontal/airplane pose (arm extended to side) = Move plane DOWN
        // When hand is horizontal, wrist and fingertips are at similar Y level
        else if (Math.abs(avgFingerY - wristY) < 0.05) {
            this.verticalInput = -1; // Move DOWN
            console.log('Gesture: Airplane pose - Move DOWN');
        }
        // Neutral position
        else {
            this.verticalInput = 0;
        }
    }

    drawHandLandmarks(landmarks) {
        if (!this.canvasElement) return;

        const ctx = this.canvasElement.getContext('2d');
        const width = this.canvasElement.width;
        const height = this.canvasElement.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;

        const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
            [0, 5], [5, 6], [6, 7], [7, 8], // Index
            [0, 9], [9, 10], [10, 11], [11, 12], // Middle
            [0, 13], [13, 14], [14, 15], [15, 16], // Ring
            [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
            [5, 9], [9, 13], [13, 17] // Palm
        ];

        connections.forEach(([start, end]) => {
            const startPoint = landmarks[start];
            const endPoint = landmarks[end];
            ctx.beginPath();
            ctx.moveTo(startPoint.x * width, startPoint.y * height);
            ctx.lineTo(endPoint.x * width, endPoint.y * height);
            ctx.stroke();
        });

        // Draw landmarks
        ctx.fillStyle = '#FF0000';
        landmarks.forEach((landmark) => {
            ctx.beginPath();
            ctx.arc(landmark.x * width, landmark.y * height, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    enable() {
        this.enabled = true;
        console.log('Gesture control enabled');
    }

    disable() {
        this.enabled = false;
        this.verticalInput = 0;
        console.log('Gesture control disabled');
    }

    getVerticalInput() {
        return this.verticalInput;
    }

    async destroy() {
        if (this.camera) {
            this.camera.stop();
        }
        if (this.hands) {
            this.hands.close();
        }
    }
}
