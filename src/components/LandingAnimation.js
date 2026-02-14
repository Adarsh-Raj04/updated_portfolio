import { useEffect, useState } from 'react';

export default function LandingAnimation({ onComplete }) {
    const [stage, setStage] = useState('loading'); // loading -> complete

    useEffect(() => {
        // Loading animation (2.5 seconds) then complete
        const loadingTimer = setTimeout(() => {
            setStage('complete');
            onComplete();
        }, 2500);

        return () => {
            clearTimeout(loadingTimer);
        };
    }, [onComplete]);

    if (stage === 'complete') return null;

    return (
        <div className={`landing-animation ${stage}`}>
            {/* Animated Background Grid */}
            <div className="landing-grid"></div>

            {/* Center Content */}
            <div className="landing-content">
                {stage === 'loading' && (
                    <>
                        {/* Logo/Name Animation */}
                        <div className="landing-logo">
                            <h1 className="glitch-text" data-text="ADARSH RAJ">
                                ADARSH RAJ
                            </h1>
                        </div>

                        {/* Loading Bar */}
                        <div className="loading-bar-container">
                            <div className="loading-bar"></div>
                        </div>

                        {/* Loading Text */}
                        <div className="loading-text">
                            <span className="dot-1">.</span>
                            <span className="dot-2">.</span>
                            <span className="dot-3">.</span>
                            INITIALIZING PORTFOLIO
                            <span className="dot-1">.</span>
                            <span className="dot-2">.</span>
                            <span className="dot-3">.</span>
                        </div>
                    </>
                )}
            </div>

            {/* Particle Effects */}
            <div className="landing-particles">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="landing-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
