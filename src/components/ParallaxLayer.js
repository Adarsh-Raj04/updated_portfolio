import { useEffect, useRef } from 'react';

export default function ParallaxLayer({ speed = 0.5, children, className = '' }) {
    const layerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (layerRef.current) {
                const scrolled = window.scrollY;
                const yPos = -(scrolled * speed);
                layerRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div
            ref={layerRef}
            className={className}
            style={{
                willChange: 'transform',
                transition: 'transform 0.1s ease-out'
            }}
        >
            {children}
        </div>
    );
}
