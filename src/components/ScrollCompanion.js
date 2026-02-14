import { useState, useEffect, useRef } from 'react';
import { Rocket } from 'lucide-react';
import './ScrollCompanion.css';

export default function ScrollCompanion() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [rocketState, setRocketState] = useState('navbar'); // navbar, roaming, following, navigating
    const [position, setPosition] = useState({ x: 50, y: 20 }); // Percentage based
    const [message, setMessage] = useState('');
    const [targetPosition, setTargetPosition] = useState(null);
    const [idleTimer, setIdleTimer] = useState(0);
    const [isNavigating, setIsNavigating] = useState(false);
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const [scrollDirection, setScrollDirection] = useState('down'); // 'up' or 'down'

    const scrollTimeoutRef = useRef(null);
    const lastScrollY = useRef(0);
    const roamingIntervalRef = useRef(null);

    // Initial navbar state - after 3 seconds, start roaming if no scroll
    useEffect(() => {
        const timer = setTimeout(() => {
            if (rocketState === 'navbar' && window.scrollY < 50) {
                setRocketState('roaming');
                startRoaming();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [rocketState]);

    // Roaming behavior - rocket explores screen
    const startRoaming = () => {
        if (roamingIntervalRef.current) {
            clearInterval(roamingIntervalRef.current);
        }

        roamingIntervalRef.current = setInterval(() => {
            if (rocketState === 'roaming') {
                const newX = 10 + Math.random() * 80; // 10% to 90%
                const newY = 15 + Math.random() * 70; // 15% to 85%
                setTargetPosition({ x: newX, y: newY });
            }
        }, 300);
    };

    // Smooth position interpolation for roaming
    useEffect(() => {
        if (targetPosition && rocketState === 'roaming') {
            const interval = setInterval(() => {
                setPosition(prev => ({
                    x: prev.x + (targetPosition.x - prev.x) * 0.05,
                    y: prev.y + (targetPosition.y - prev.y) * 0.05
                }));
            }, 16);

            return () => clearInterval(interval);
        }
    }, [targetPosition, rocketState]);

    // Scroll detection with velocity
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking && !isNavigating) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const velocity = Math.abs(currentScrollY - lastScrollY.current);

                    // Detect scroll direction
                    if (currentScrollY > lastScrollY.current) {
                        setScrollDirection('down');
                    } else if (currentScrollY < lastScrollY.current) {
                        setScrollDirection('up');
                    }

                    lastScrollY.current = currentScrollY;

                    setScrollVelocity(velocity);

                    const windowHeight = window.innerHeight;
                    const documentHeight = document.documentElement.scrollHeight - windowHeight;
                    const progress = (currentScrollY / documentHeight) * 100;

                    setScrollProgress(progress);

                    // Switch to following mode
                    if (currentScrollY > 50) {
                        setRocketState('following');
                        if (roamingIntervalRef.current) {
                            clearInterval(roamingIntervalRef.current);
                        }
                    }

                    if (scrollTimeoutRef.current) {
                        clearTimeout(scrollTimeoutRef.current);
                    }

                    scrollTimeoutRef.current = setTimeout(() => {
                        setScrollVelocity(0);
                        if (currentScrollY < 50) {
                            setRocketState('roaming');
                            startRoaming();
                        }
                    }, 500);

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            if (roamingIntervalRef.current) {
                clearInterval(roamingIntervalRef.current);
            }
        };
    }, [isNavigating]);

    // Enhanced navigation with parallax scroll
    useEffect(() => {
        const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'achievements', 'participation', 'education', 'certifications', 'contact'];

        const handleNavClick = (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (target) {
                e.preventDefault();
                const href = target.getAttribute('href');
                const sectionId = href.substring(1);
                const sectionIndex = sections.indexOf(sectionId);

                if (sectionIndex !== -1) {
                    // Calculate travel time: 1 second base + (section index * 0.3s)
                    // Section 1: 1.3s, Section 4: 2.2s, Section 9: 3.7s
                    const travelTime = 100 + (sectionIndex * 300);

                    setIsNavigating(true);
                    setRocketState('navigating');

                    // Stage 1: Starting Engine (0.5 seconds)
                    setMessage('🔥 Starting Engine...');

                    setTimeout(() => {
                        // Stage 2: Let's Go!
                        setMessage("🚀 Let's Go!");

                        const targetElement = document.getElementById(sectionId);
                        if (targetElement) {
                            const startPosition = window.scrollY;
                            const targetPosition = targetElement.offsetTop - 80;
                            const distance = targetPosition - startPosition;
                            const startTime = performance.now();

                            const animateScroll = (currentTime) => {
                                const elapsed = currentTime - startTime;
                                const progress = Math.min(elapsed / travelTime, 1);

                                // Smooth easing with slight bounce at end
                                const easeOutBack = (x) => {
                                    const c1 = 1.70158;
                                    const c3 = c1 + 1;
                                    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
                                };

                                window.scrollTo(0, startPosition + (distance * easeOutBack(progress)));

                                if (progress < 1) {
                                    requestAnimationFrame(animateScroll);
                                } else {
                                    setMessage('✨ We made it!');
                                    setRocketState('following');

                                    setTimeout(() => {
                                        setMessage('');
                                        setIsNavigating(false);
                                    }, 1500);
                                }
                            };

                            requestAnimationFrame(animateScroll);
                        }
                    }, 500);
                }
            }
        };

        document.addEventListener('click', handleNavClick);
        return () => document.removeEventListener('click', handleNavClick);
    }, []);

    // Calculate rocket position based on state
    const getRocketPosition = () => {
        switch (rocketState) {
            case 'navbar':
                return { x: 50, y: 8 }; // Center of navbar
            case 'roaming':
                return position;
            case 'following':
                // Move DOWN as user scrolls down (20% to 85% of viewport)
                return {
                    x: 5 + Math.sin(scrollProgress * 0.1) * 3,
                    y: 20 + (scrollProgress * 0.65) // Goes from 20% to 85% as scroll increases
                };
            case 'navigating':
                return {
                    x: 50,
                    y: 50
                };
            default:
                return position;
        }
    };

    const currentPos = getRocketPosition();

    // Rotate rocket based on scroll direction and state
    let rotation = 0;
    if (rocketState === 'navigating') {
        rotation = 180; // Point down during navigation
    } else if (rocketState === 'following') {
        if (scrollDirection === 'down') {
            rotation = scrollVelocity > 5 ? 160 : 180; // Point down, slight tilt if fast
        } else {
            rotation = scrollVelocity > 5 ? 20 : 0; // Point up, slight tilt if fast
        }
    }

    return (
        <>
            {/* Rocket */}
            <div
                className={`rocket-companion state-${rocketState}`}
                style={{
                    position: 'fixed',
                    left: `${currentPos.x}%`,
                    top: `${currentPos.y}%`,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                    zIndex: 100,
                    pointerEvents: 'none',
                    transition: rocketState === 'roaming'
                        ? 'left 2s cubic-bezier(0.4, 0, 0.2, 1), top 2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease-out'
                        : 'left 0.3s ease-out, top 0.3s ease-out, transform 0.3s ease-out'
                }}
            >
                <div className="rocket-container">
                    <Rocket
                        className={`rocket-icon state-${rocketState}`}
                        size={rocketState === 'navigating' ? 56 : 44}
                        style={{
                            color: 'var(--accent-cyan)',
                            filter: `drop-shadow(0 0 ${rocketState === 'navigating' ? 30 : 20}px rgba(0, 255, 255, 0.8))`,
                            transition: 'all 0.3s ease-out'
                        }}
                    />

                    {/* Flame trail */}
                    {(rocketState === 'navigating' || (rocketState === 'following' && scrollVelocity > 3)) && (
                        <div className="rocket-flame">
                            <div className="flame-particle"></div>
                            <div className="flame-particle"></div>
                            <div className="flame-particle"></div>
                        </div>
                    )}

                    {/* Sparkles for roaming */}
                    {rocketState === 'roaming' && (
                        <>
                            <div className="sparkle" style={{ animationDelay: '0s' }}></div>
                            <div className="sparkle" style={{ animationDelay: '0.3s' }}></div>
                            <div className="sparkle" style={{ animationDelay: '0.6s' }}></div>
                        </>
                    )}
                </div>

                {/* Message bubble */}
                {message && (
                    <div className="rocket-message">
                        {message}
                        <div className="message-arrow"></div>
                    </div>
                )}
            </div>

            {/* Progress indicator during navigation */}
            {isNavigating && (
                <div className="scroll-progress-bar">
                    <div
                        className="scroll-progress-fill"
                        style={{
                            width: `${(scrollProgress)}%`
                        }}
                    ></div>
                </div>
            )}
        </>
    );
}
