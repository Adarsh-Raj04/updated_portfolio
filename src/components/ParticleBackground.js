import { useEffect, useRef, useState } from 'react';

export default function ParticleBackground() {
    const canvasRef = useRef(null);
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Detect theme changes
        const checkTheme = () => {
            setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
        };
        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let cursorTrails = [];
        let mouse = { x: null, y: null, radius: 150 };

        // Theme-based colors
        const colors = theme === 'dark' 
            ? {
                particles: ['0, 255, 255', '255, 0, 255', '0, 200, 255'],
                connections: '0, 255, 255',
                trail: '0, 255, 255'
              }
            : {
                particles: ['8, 145, 178', '168, 85, 247', '59, 130, 246'],
                connections: '8, 145, 178',
                trail: '8, 145, 178'
              };

        // Cursor Trail class
        class CursorTrail {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 4 + 2;
                this.life = 2000; // 2 seconds in milliseconds
                this.maxLife = 2000;
                this.createdAt = Date.now();
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
            }

            update() {
                const age = Date.now() - this.createdAt;
                this.life = this.maxLife - age;
                this.x += this.vx;
                this.y += this.vy;
                return this.life > 0;
            }

            draw() {
                const opacity = (this.life / this.maxLife) * 0.8;
                const size = this.size * (this.life / this.maxLife);
                
                // Draw trail particle with glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = `rgba(${colors.trail}, ${opacity})`;
                ctx.fillStyle = `rgba(${colors.trail}, ${opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.colorIndex = Math.floor(Math.random() * colors.particles.length);
                this.opacity = Math.random() * 0.5 + 0.3;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Pulse effect
                this.pulsePhase += this.pulseSpeed;
                const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8;

                // Mouse interaction - repel particles
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        this.x -= Math.cos(angle) * force * 2;
                        this.y -= Math.sin(angle) * force * 2;
                    }
                }

                // Boundary check with wrap-around
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;

                return pulse;
            }

            draw(pulse) {
                const color = colors.particles[this.colorIndex];
                ctx.fillStyle = `rgba(${color}, ${this.opacity * pulse})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
                ctx.fill();

                // Add glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(${color}, ${this.opacity * 0.5})`;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // Create particles
        const initParticles = () => {
            particles = [];
            const numberOfParticles = Math.min((canvas.width * canvas.height) / 12000, 120);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Connect particles with lines
        const connectParticles = () => {
            const maxDistance = 120;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (maxDistance - distance) / maxDistance * 0.25;
                        ctx.strokeStyle = `rgba(${colors.connections}, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw cursor trails
            cursorTrails = cursorTrails.filter(trail => {
                const isAlive = trail.update();
                if (isAlive) trail.draw();
                return isAlive;
            });

            particles.forEach(particle => {
                const pulse = particle.update();
                particle.draw(pulse);
            });

            connectParticles();
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Mouse move handler - create trail particles
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Create trail particles (spawn multiple for smoother trail)
            for (let i = 0; i < 3; i++) {
                cursorTrails.push(new CursorTrail(
                    mouse.x + (Math.random() - 0.5) * 10,
                    mouse.y + (Math.random() - 0.5) * 10
                ));
            }

            // Limit trail array size for performance
            if (cursorTrails.length > 200) {
                cursorTrails = cursorTrails.slice(-200);
            }
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{
                zIndex: 1,
                opacity: theme === 'dark' ? 0.5 : 0.4
            }}
        />
    );
}
