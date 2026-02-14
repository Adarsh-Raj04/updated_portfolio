import { useEffect, useRef } from 'react';
import './CursorGlow.css';

export default function CursorGlow() {
    const cursorRef = useRef(null);
    const trailsRef = useRef([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Create trail elements
        const trailCount = 15;
        for (let i = 0; i < trailCount; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.opacity = (1 - i / trailCount) * 0.6;
            trail.style.transform = 'translate(-50%, -50%) scale(' + (1 - i / trailCount) + ')';
            document.body.appendChild(trail);
            trailsRef.current.push({
                element: trail,
                x: 0,
                y: 0
            });
        }

        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMouseMove = (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
            mousePos.current = { x: targetX, y: targetY };
        };

        const animate = () => {
            // Smooth cursor movement with easing
            currentX += (targetX - currentX) * 0.15;
            currentY += (targetY - currentY) * 0.15;

            // Update main cursor glow
            cursor.style.left = currentX + 'px';
            cursor.style.top = currentY + 'px';

            // Update trails with delay
            trailsRef.current.forEach((trail, index) => {
                const delay = index * 0.05;
                const trailX = currentX + (targetX - currentX) * delay;
                const trailY = currentY + (targetY - currentY) * delay;

                trail.x += (trailX - trail.x) * 0.1;
                trail.y += (trailY - trail.y) * 0.1;

                trail.element.style.left = trail.x + 'px';
                trail.element.style.top = trail.y + 'px';
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            // Clean up trail elements
            trailsRef.current.forEach(trail => {
                if (trail.element.parentNode) {
                    trail.element.parentNode.removeChild(trail.element);
                }
            });
            trailsRef.current = [];
        };
    }, []);

    return <div ref={cursorRef} className="cursor-glow-enhanced"></div>;
}
