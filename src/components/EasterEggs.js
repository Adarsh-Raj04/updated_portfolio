import { useEffect, useState } from 'react';

export default function EasterEggs() {
    // eslint-disable-next-line no-unused-vars
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        const konamiCode = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
        let konamiIndex = 0;

        let typedKeys = '';

        const showPopup = (text) => {
            const notification = document.createElement('div');
            notification.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, rgba(0,255,255,0.95), rgba(255,0,255,0.95));
                    padding: 25px 40px;
                    border-radius: 16px;
                    font-family: 'Orbitron';
                    font-size: 20px;
                    font-weight: bold;
                    color: white;
                    z-index: 10000;
                    box-shadow: 0 0 40px rgba(0,255,255,0.7);
                ">
                    ${text}
                </div>
            `;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 2500);
        };

        const activateHackerMode = () => {
    document.body.classList.add('hacker-mode');

    // 1️⃣ GLITCH FLASH
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.background = 'white';
    flash.style.opacity = '0.8';
    flash.style.zIndex = '9999';
    flash.style.pointerEvents = 'none';
    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 120);

    // 2️⃣ TERMINAL OVERLAY
    const terminal = document.createElement('div');
    terminal.style.position = 'fixed';
    terminal.style.top = '0';
    terminal.style.left = '0';
    terminal.style.width = '100%';
    terminal.style.height = '100%';
    terminal.style.background = 'rgba(0,0,0,0.95)';
    terminal.style.color = '#00ff00';
    terminal.style.fontFamily = 'monospace';
    terminal.style.fontSize = '18px';
    terminal.style.padding = '40px';
    terminal.style.zIndex = '10000';
    terminal.style.lineHeight = '1.8';
    terminal.style.whiteSpace = 'pre-line';
    terminal.innerText = '';

    document.body.appendChild(terminal);

    // 3️⃣ TYPEWRITER EFFECT
    const lines = [
        'INITIALIZING SYSTEM...',
        'BYPASSING SECURITY...',
        'ACCESS GRANTED',
        'WELCOME ADARSH',
        'LOADING SECRET MODULES...',
        'HACKER MODE ENABLED'
    ];

    let lineIndex = 0;
    let charIndex = 0;

    const typeLine = () => {
        if (lineIndex >= lines.length) {
            setTimeout(() => {
                terminal.remove();
                triggerMatrixRain(); // 🌧️ start rain automatically
            }, 800);
            return;
        }

        const line = lines[lineIndex];

        if (charIndex < line.length) {
            terminal.innerText += line[charIndex];
            charIndex++;
            setTimeout(typeLine, 30);
        } else {
            terminal.innerText += '\n';
            lineIndex++;
            charIndex = 0;
            setTimeout(typeLine, 300);
        }
    };

    typeLine();
};


        const handleKeyDown = (e) => {
    // Ignore if user is typing in an input field, textarea, or contenteditable
    const target = e.target;
    const isTyping = target.tagName === 'INPUT' || 
                     target.tagName === 'TEXTAREA' || 
                     target.isContentEditable ||
                     target.closest('input') ||
                     target.closest('textarea');
    
    if (isTyping) {
        return; // Don't trigger easter eggs while typing
    }

    const key = e.key.toLowerCase();

    // -----------------------------
    // 1️⃣ KONAMI DETECTION (PRIORITY)
    // -----------------------------
    if (key === konamiCode[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
            activateHackerMode();
            konamiIndex = 0;
        }
    } else if (key === konamiCode[0]) {
        // restart if first key matches
        konamiIndex = 1;
    } else {
        konamiIndex = 0;
    }

    // -----------------------------
    // 2️⃣ SINGLE KEY TRIGGERS
    // -----------------------------
    
    // R - Download Resume
    if (key === 'r') {
        const link = document.createElement('a');
        link.href = '/Adarsh_Raj_Resume.pdf';
        link.download = 'Adarsh_Raj_Resume.pdf';
        link.click();
        showPopup('� Resume Downloaded!');
        return;
    }

    // T - Open Terminal
    if (key === 't') {
        // Trigger terminal open by simulating click on terminal button
        const terminalBtn = document.querySelector('[aria-label="Open terminal"]');
        if (terminalBtn) {
            terminalBtn.click();
            showPopup('💻 Terminal Activated!');
        }
        return;
    }

    // C - Toggle Cursor Effects
    if (key === 'c') {
        const cursorGlow = document.querySelector('.cursor-glow');
        if (cursorGlow) {
            cursorGlow.style.display = cursorGlow.style.display === 'none' ? 'block' : 'none';
            showPopup('✨ Cursor Effects Toggled');
        }
        return;
    }

    // P - Toggle Particles
    if (key === 'p') {
        document.body.classList.toggle('hide-particles');
        const isHidden = document.body.classList.contains('hide-particles');
        console.log('Particles toggled:', isHidden ? 'HIDDEN' : 'VISIBLE');
        console.log('Body classes:', document.body.className);
        showPopup(isHidden ? '🌟 Particles Disabled' : '🌟 Particles Enabled');
        return;
    }

    // S - Scroll to Top
    if (key === 's') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showPopup('⬆️ Scrolled to Top!');
        return;
    }

    // H - Show Help
    if (key === 'h') {
        const helpText = `
            <div style="text-align: left; font-size: 14px; line-height: 1.8;">
                <div style="font-size: 18px; margin-bottom: 10px;">🎮 Secret Keys:</div>
                <div>R - Download Resume</div>
                <div>T - Open Terminal</div>
                <div>C - Toggle Cursor</div>
                <div>P - Toggle Particles</div>
                <div>S - Scroll to Top</div>
                <div>G - Dev Mode</div>
                <div>L - Love Mode</div>
                <div>H - Show This Help</div>
                <div style="margin-top: 10px; color: #fbbf24;">Type "adarsh" for surprise!</div>
                <div style="color: #fbbf24;">Click logo 7 times for Matrix!</div>
                <div style="color: #fbbf24;">Konami Code for Hacker Mode!</div>
            </div>
        `;
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(0,255,255,0.95), rgba(255,0,255,0.95));
                padding: 30px 40px;
                border-radius: 16px;
                font-family: 'Orbitron';
                color: white;
                z-index: 10000;
                box-shadow: 0 0 40px rgba(0,255,255,0.7);
                max-width: 400px;
            ">
                ${helpText}
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
        return;
    }

    if (key === 'g') {
        document.body.classList.toggle('dev-mode');
        showPopup('🚀 Dev Mode Toggled');
        return;
    }

    if (key === 'l') {
        document.body.classList.toggle('love-mode');
        showPopup('❤️ Love Mode Toggled');
        return;
    }

    // -----------------------------
    // 3️⃣ SECRET WORD TRACKING
    // -----------------------------
    typedKeys += key;
    typedKeys = typedKeys.slice(-10);

    if (typedKeys.includes('adarsh')) {
        showPopup('👋 Hey! You found the creator');
        typedKeys = '';
    }
};


        const handleLogoClick = (e) => {
            if (e.target.closest('.holographic')) {
                setClickCount(prev => {
                    const newCount = prev + 1;
                    if (newCount === 7) {
                        triggerMatrixRain();
                        showPopup('🧠 Matrix Unlocked');
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
            const chars = '01アイウエオカキクケコサシスセソ';
            const fontSize = 14;
            const columns = canvas.width / fontSize;
            const drops = Array(Math.floor(columns)).fill(1);

            let frames = 0;
            const draw = () => {
                ctx.fillStyle = 'rgba(0,0,0,0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#0F0';
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                    drops[i]++;
                }

                frames++;
                if (frames < 200) requestAnimationFrame(draw);
                else canvas.remove();
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
