import { useEffect, useState } from 'react';

export default function EasterEggs() {
    const [konamiActive, setKonamiActive] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        const handleKeyDown = (e) => {
            if (!e.key) return; // Guard against undefined key
            
            if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activateKonamiMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        };

        const activateKonamiMode = () => {
            setKonamiActive(true);
            
            // Add matrix rain effect
            document.body.classList.add('konami-mode');
            
            // Show notification
            const notification = document.createElement('div');
            notification.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, rgba(0, 255, 255, 0.95), rgba(255, 0, 255, 0.95));
                    padding: 30px 50px;
                    border-radius: 20px;
                    font-family: 'Orbitron', sans-serif;
                    font-size: 24px;
                    font-weight: bold;
                    color: white;
                    z-index: 10000;
                    box-shadow: 0 0 50px rgba(0, 255, 255, 0.8);
                    animation: pulse 0.5s ease-in-out;
                ">
                    🎮 KONAMI CODE ACTIVATED! 🎮
                </div>
            `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
                document.body.classList.remove('konami-mode');
                setKonamiActive(false);
            }, 3000);
        };

        // Logo click easter egg (click 7 times)
        const handleLogoClick = (e) => {
            if (e.target.closest('.holographic')) {
                setClickCount(prev => {
                    const newCount = prev + 1;
                    if (newCount === 7) {
                        triggerMatrixRain();
                        return 0;
                    }
                    return newCount;
                });
            }
        };

        const triggerMatrixRain = () => {
            const canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '9999';
            canvas.style.pointerEvents = 'none';
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const chars = '01アイウエオカキクケコサシスセソタチツテト';
            const fontSize = 14;
            const columns = canvas.width / fontSize;
            const drops = Array(Math.floor(columns)).fill(1);

            let frameCount = 0;
            const maxFrames = 200;

            const draw = () => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#0F0';
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }

                frameCount++;
                if (frameCount < maxFrames) {
                    requestAnimationFrame(draw);
                } else {
                    canvas.remove();
                }
            };

            draw();
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleLogoClick);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleLogoClick);
        };
    }, []);

    return null;
}
