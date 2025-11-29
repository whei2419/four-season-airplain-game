class SnowEffect {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.particles = [];
        this.particleCount = 150; // More particles for better effect
        this.animationFrame = null;
        this.wind = 0; // Wind effect for more natural movement

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.initParticles();
        this.animate();
    }
    
    destroy() {
        // Stop animation and clean up
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        this.particles = [];
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }

    resize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    initParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle(reset = false) {
        return {
            x: Math.random() * this.width,
            y: reset ? -10 : Math.random() * this.height,
            size: Math.random() * 3 + 1.5, // Varied sizes (1.5-4.5px)
            speedY: Math.random() * 1.5 + 0.5, // Faster fall (0.5-2)
            speedX: Math.random() * 0.8 - 0.4, // More horizontal drift
            opacity: Math.random() * 0.6 + 0.3, // Better visibility (0.3-0.9)
            baseOpacity: Math.random() * 0.6 + 0.3, // Store initial opacity
            swing: Math.random() * 0.5, // Swinging motion
            swingSpeed: Math.random() * 0.02 + 0.01, // Swing speed variation
            fadeStart: Math.random() * 0.4 + 0.5 // Random fade start between 50-90% for depth
        };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Subtle wind effect that changes over time
        this.wind = Math.sin(Date.now() / 5000) * 0.3;
        
        this.particles.forEach((p, index) => {
            // Calculate fade based on each particle's individual fade start (depth simulation)
            const fadeStartHeight = this.height * p.fadeStart;
            const fadeDistance = this.height - fadeStartHeight;
            
            if (p.y > fadeStartHeight) {
                const fadeProgress = (p.y - fadeStartHeight) / fadeDistance;
                p.opacity = p.baseOpacity * (1 - fadeProgress);
            } else {
                p.opacity = p.baseOpacity;
            }
            
            // Draw snowflake with soft glow
            this.ctx.beginPath();
            this.ctx.globalAlpha = Math.max(0, p.opacity);
            this.ctx.fillStyle = 'white';
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Update position with swing effect
            p.swing += p.swingSpeed;
            p.y += p.speedY;
            p.x += p.speedX + Math.sin(p.swing) * 0.5 + this.wind;

            // Reset if out of bounds
            if (p.y > this.height) {
                this.particles[index] = this.createParticle(true);
            }
            if (p.x > this.width + 10) {
                p.x = -10;
            } else if (p.x < -10) {
                p.x = this.width + 10;
            }
        });

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
}

export default SnowEffect;

