import { useState, useEffect } from 'react';
import './AnimatedBackground.css';

export default function AnimatedBackground() {
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

    return (
        <div className={`smooth-gradient-background ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
            <div className="gradient-layer layer-1"></div>
            <div className="gradient-layer layer-2"></div>
            <div className="gradient-layer layer-3"></div>
        </div>
    );
}
