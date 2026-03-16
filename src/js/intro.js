/**
 * Particle Intro Animation
 * Creates a beautiful particle effect where fragments converge to form the title
 */

export class ParticleIntro {
    constructor() {
        this.overlay = document.getElementById('introOverlay');
        this.canvas = document.getElementById('introCanvas');
        this.title = document.querySelector('.intro-title');
        
        if (!this.overlay || !this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.startTime = null;
        this.duration = 2500; // Animation duration in ms
        
        this.init();
    }

    init() {
        // Check if intro was already shown in this session
        if (sessionStorage.getItem('introShown')) {
            this.overlay.remove();
            return;
        }

        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.createParticles();
        this.animate();

        // Show title after a short delay
        setTimeout(() => {
            if (this.title) this.title.style.opacity = '1';
        }, 800);
        
        // Hide overlay after animation - longer display time for premium feel
        setTimeout(() => {
            this.overlay.classList.add('fade-out');
            sessionStorage.setItem('introShown', 'true');
            
            // Longer fade-out duration for smooth transition
            setTimeout(() => {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
                this.overlay.remove();
            }, 1500); // Extended from 800ms to 1500ms
        }, 3500); // Extended from 3000ms to 3500ms for longer display
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(120, Math.floor(this.width * this.height / 8000));
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        // Get theme color
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        for (let i = 0; i < particleCount; i++) {
            // Start position: random around the edges
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.max(this.width, this.height) * 0.8;
            const startX = centerX + Math.cos(angle) * distance * (0.5 + Math.random() * 0.5);
            const startY = centerY + Math.sin(angle) * distance * (0.5 + Math.random() * 0.5);
            
            // End position: cluster near center with some spread
            const endOffset = 150;
            const endX = centerX + (Math.random() - 0.5) * endOffset * 2;
            const endY = centerY + (Math.random() - 0.5) * endOffset;
            
            // Random delay for staggered animation
            const delay = Math.random() * 0.4;
            
            // Particle properties
            this.particles.push({
                startX,
                startY,
                endX,
                endY,
                x: startX,
                y: startY,
                size: Math.random() * 3 + 1,
                delay,
                // Color variations
                alpha: 0.3 + Math.random() * 0.7,
                hue: isDark ? 40 + Math.random() * 20 : 30 + Math.random() * 30,
                saturation: isDark ? 10 + Math.random() * 15 : 5 + Math.random() * 10,
                lightness: isDark ? 60 + Math.random() * 20 : 40 + Math.random() * 30
            });
        }
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    animate(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        const elapsed = timestamp - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw particles
        for (const p of this.particles) {
            // Adjusted progress with delay
            const adjustedProgress = Math.max(0, Math.min(1, (progress - p.delay) / (1 - p.delay)));
            const easedProgress = this.easeOutCubic(adjustedProgress);
            
            // Interpolate position
            p.x = p.startX + (p.endX - p.startX) * easedProgress;
            p.y = p.startY + (p.endY - p.startY) * easedProgress;
            
            // Fade in as particles approach center
            const fadeProgress = Math.min(1, adjustedProgress * 2);
            
            // Draw particle with glow effect
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${p.alpha * fadeProgress})`;
            this.ctx.fill();
            
            // Subtle glow
            if (p.size > 1.5) {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                this.ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${p.alpha * fadeProgress * 0.2})`;
                this.ctx.fill();
            }
        }
        
        // Draw connecting lines between nearby particles (creates constellation effect)
        if (progress > 0.3) {
            const lineProgress = Math.min(1, (progress - 0.3) / 0.4);
            this.ctx.strokeStyle = `rgba(150, 145, 135, ${0.1 * lineProgress})`;
            this.ctx.lineWidth = 0.5;
            
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 80) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.stroke();
                    }
                }
            }
        }
        
        if (progress < 1) {
            this.animationId = requestAnimationFrame((t) => this.animate(t));
        }
    }
}
