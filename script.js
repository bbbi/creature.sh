/** SUPRACILIARY — Animated Background + Bot Protection */

// Bot detection and trap monitoring
// TODO: Add IP-based rate limiting here if deploying with server-side middleware
const BotProtection = {
    init() {
        this.checkUserAgent();
        this.monitorTrap();
        this.detectAutomation();
    },

    // Block known bot user agents
    checkUserAgent() {
        const botPatterns = [
            'bot', 'crawler', 'spider', 'scraper', 'archive',
            'wget', 'curl', 'httpie', 'python-requests'
        ];
        const ua = navigator.userAgent.toLowerCase();
        
        if (botPatterns.some(pattern => ua.includes(pattern))) {
            // Log bot access (could extend to block/redirect)
            console.log('Bot detected');
        }
    },

    // Monitor if trap link is accessed
    monitorTrap() {
        if (window.location.pathname.includes('trap')) {
            document.body.innerHTML = '<h1 style="text-align:center;padding:80px 24px;font-family:sans-serif;color:#4a443c">403 Forbidden</h1>';
            document.title = '403 Forbidden';
        }
    },

    // Detect automation tools
    detectAutomation() {
        // Check for common automation indicators
        const isHeadless = navigator.webdriver || false;
        
        if (isHeadless) {
            console.log('Headless browser detected');
        }
    }
};

// Animated Particles Background
class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.count = 35;
        this.raf = null;
        this.resize();
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resize(), { passive: true });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < this.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 3 + 2,
                opacity: Math.random() * 0.3 + 0.15
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(169, 139, 106, ${p.opacity})`;
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(169, 139, 106, ${0.08 * (1 - dist / 150)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });

        this.raf = requestAnimationFrame(() => this.animate());
    }

    stop() {
        if (this.raf) cancelAnimationFrame(this.raf);
    }
}

// Loader
function hideLoader() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        // Fade in content with stagger
        document.querySelectorAll('.name, .title, .bio, .link').forEach((el, i) => {
            el.style.animationDelay = `${i * 0.08}s`;
            el.classList.add('fade-in');
        });
    }, 1200);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    BotProtection.init();
    hideLoader();
    new ParticleBackground('bgCanvas');
}, { once: true });

// Visibility optimization
document.addEventListener('visibilitychange', () => {
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        canvas.style.display = document.hidden ? 'none' : 'block';
    }
});

// Console easter egg
console.log('creature © 2026 — built with care');
