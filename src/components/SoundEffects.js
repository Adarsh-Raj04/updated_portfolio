import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundEffects() {
    const [soundEnabled, setSoundEnabled] = useState(() => {
        const saved = localStorage.getItem('soundEnabled');
        return saved !== null ? JSON.parse(saved) : false; // Default off
    });

    useEffect(() => {
        localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
    }, [soundEnabled]);

    useEffect(() => {
        if (!soundEnabled) return;

        // Create audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Sound generator functions
        const playSound = (frequency, duration, type = 'sine') => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        };

        // Button click sound
        const handleButtonClick = (e) => {
            // Check if target is an element and has closest method
            if (e.target && e.target.closest && typeof e.target.closest === 'function') {
                if (e.target.closest('button, a[href^="#"]')) {
                    playSound(800, 0.1, 'square');
                }
            }
        };

        // Hover sound for interactive elements
        const handleHover = (e) => {
            // Check if target is an element and has closest method
            if (e.target && e.target.closest && typeof e.target.closest === 'function') {
                if (e.target.closest('.tech-tag, .gradient-border, button, a')) {
                    playSound(600, 0.05, 'sine');
                }
            }
        };

        // Section scroll sound
        let lastSection = '';
        const handleScroll = () => {
            const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'achievements', 'participation', 'education', 'certifications', 'contact'];
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (currentSection && currentSection !== lastSection) {
                playSound(1000, 0.15, 'triangle');
                lastSection = currentSection;
            }
        };

        document.addEventListener('click', handleButtonClick);
        document.addEventListener('mouseenter', handleHover, true);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('click', handleButtonClick);
            document.removeEventListener('mouseenter', handleHover, true);
            window.removeEventListener('scroll', handleScroll);
            audioContext.close();
        };
    }, [soundEnabled]);

    return (
        <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`fixed bottom-8 left-8 z-50 p-4 rounded-full backdrop-blur-md border transition-all duration-300 group ${
                soundEnabled ? 'opacity-100' : 'opacity-100'
            }`}
            style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.15), rgba(255, 0, 255, 0.15))',
                borderColor: 'var(--border-primary)',
                boxShadow: '0 4px 20px rgba(0, 255, 255, 0.3)'
            }}
            aria-label={soundEnabled ? 'Disable sound effects' : 'Enable sound effects'}
        >
            {soundEnabled ? (
                <Volume2 
                    className="w-6 h-6 transition-transform group-hover:scale-110 duration-300" 
                    style={{ color: 'var(--accent-cyan)' }} 
                />
            ) : (
                <VolumeX 
                    className="w-6 h-6 transition-transform group-hover:scale-110 duration-300" 
                    style={{ color: 'var(--text-tertiary)' }} 
                />
            )}
        </button>
    );
}
