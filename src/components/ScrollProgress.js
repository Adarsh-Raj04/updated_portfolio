import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
    const progressRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            // Cancel any pending animation frame
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            // Use requestAnimationFrame for smooth updates
            rafRef.current = requestAnimationFrame(() => {
                if (progressRef.current) {
                    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const progress = (window.scrollY / totalHeight) * 100;
                    // Direct style update - no React state, no transition
                    progressRef.current.style.width = `${progress}%`;
                }
            });
        };

        // Initial call
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <div 
            className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none"
            style={{
                background: 'transparent'
            }}
        >
            <div
                ref={progressRef}
                className="h-full breathing-glow progress-shimmer"
                style={{
                    background: 'linear-gradient(90deg, #00ffff, #a855f7, #00ffff)',
                    width: '0%',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(168, 85, 247, 0.6), 0 2px 10px rgba(0, 255, 255, 0.5)',
                    willChange: 'width'
                }}
            />
        </div>
    );
}
