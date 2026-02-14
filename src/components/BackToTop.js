import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 500px
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 p-4 rounded-full backdrop-blur-md border transition-all duration-300 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
            style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.15), rgba(255, 0, 255, 0.15))',
                borderColor: 'var(--border-primary)',
                boxShadow: '0 4px 20px rgba(0, 255, 255, 0.3)'
            }}
            aria-label="Back to top"
        >
            <ArrowUp 
                className="w-6 h-6 transition-transform group-hover:-translate-y-1 duration-300" 
                style={{ color: 'var(--accent-cyan)' }} 
            />
        </button>
    );
}
