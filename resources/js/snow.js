class SnowEffect {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.particles = [];
        this.particleCount = 150; // Reduced from 400 for better performance
        this.animationFrame = null;

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.initParticles();
        this.animate();
    }
    
    destroy() {
        // Stop animation and clean up
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
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
            size: Math.random() * 3 + 1.5, // Reduced from 4+2 for better performance
            speedY: Math.random() * 0.5 + 0.2,
            speedX: Math.random() * 0.4 - 0.2,
            opacity: Math.random() * 0.4 + 0.2
        };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctx.fillStyle = 'white';
        this.ctx.shadowBlur = 3; // Reduced from 5 for better performance
        this.ctx.shadowColor = "white";
        
        this.particles.forEach((p, index) => {
            this.ctx.beginPath();
            this.ctx.globalAlpha = p.opacity;
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Update position
            p.y += p.speedY;
            p.x += p.speedX;

            // Reset if out of bounds
            if (p.y > this.height) {
                this.particles[index] = this.createParticle(true);
            }
            if (p.x > this.width) {
                p.x = 0;
            } else if (p.x < 0) {
                p.x = this.width;
            }
        });

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
}

export default SnowEffect;
