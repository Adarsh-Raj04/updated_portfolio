import { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, ChevronDown } from 'lucide-react';
import ParallaxLayer from './ParallaxLayer';

export default function Hero() {
    const [displayText, setDisplayText] = useState('');
    const fullText = '< DATA & AI ENGINEER />';

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Animated Grid Background - Parallax Layer 1 (slowest) */}
            <ParallaxLayer speed={0.2}>
                <div className="absolute inset-0 data-grid opacity-30" />
            </ParallaxLayer>

            {/* Scan Lines Effect - Parallax Layer 2 */}
            <ParallaxLayer speed={0.3}>
                <div className="scanlines absolute inset-0 opacity-20" />
            </ParallaxLayer>

            {/* Gradient Overlay - Parallax Layer 3 */}
            <ParallaxLayer speed={0.4}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
            </ParallaxLayer>

            {/* Main Content - No parallax (normal scroll) */}
            <div className="max-w-6xl mx-auto px-6 text-center relative z-10 pt-20">
                {/* Avatar with Enhanced Glow */}
                <div className="floating mb-8">
                    <div className="inline-block relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 glow-intensify flex items-center justify-center">
                            <div className="w-28 h-28 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: 'var(--bg-primary)' }}>
                                <span className="text-5xl font-orbitron font-bold holographic">AR</span>
                            </div>
                        </div>
                        {/* Rotating Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 rotate-3d"
                            style={{ animation: 'rotate3D 20s linear infinite' }} />
                    </div>
                </div>

                {/* Name with Glitch Effect */}
                <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-6 leading-tight">
                    <span className="glitch-hover inline-block" data-text="ADARSH">
                        ADARSH
                    </span>{' '}
                    <span className="holographic inline-block">RAJ</span>
                </h1>

                {/* Typing Animation Title */}
                <div className="font-space text-xl md:text-2xl mb-4 tracking-wider min-h-[2rem]"
                    style={{ color: 'var(--text-secondary)' }}>
                    {displayText}
                    <span className="terminal-cursor ml-1" />
                </div>

                {/* Description with Neon Highlights */}
                <p className="font-jetbrains text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
                    style={{ color: 'var(--text-tertiary)' }}>
                    Architecting enterprise-scale data and AI solutions at{' '}
                    <a href='https://www.gsk.com/' target='_blank' rel='noopener noreferrer'>
                        <span className="neon-pulse font-semibold" style={{ color: 'var(--accent-cyan)' }}>GSK</span>
                    </a>
                    . Building semantic search with <span style={{ color: 'var(--accent-cyan)' }}>OpenAI</span> &amp;{' '}
                    <span style={{ color: 'var(--accent-cyan)' }}>Azure AI Search</span>, scalable pipelines with{' '}
                    <span style={{ color: 'var(--accent-cyan)' }}>Apache Spark</span> &amp;{' '}
                    <span style={{ color: 'var(--accent-cyan)' }}>Databricks</span>, and high-impact integrations across{' '}
                    <span style={{ color: 'var(--accent-cyan)' }}>ServiceNow</span>,{' '}
                    <span style={{ color: 'var(--accent-cyan)' }}>Collibra</span>, and{' '}
                    <span style={{ color: 'var(--accent-cyan)' }}>SailPoint</span>.
                </p>

                {/* CTA Buttons with Enhanced Effects */}
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    <a href="#contact"
                        className="group relative px-8 py-4 rounded-lg font-space text-sm overflow-hidden transition-all duration-300 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-75 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-[2px] rounded-lg transition-colors"
                            style={{ backgroundColor: 'var(--bg-primary)' }} />
                        <span className="relative z-10 holographic font-bold">GET IN TOUCH</span>
                    </a>

                    <a href="#projects"
                        className="px-8 py-4 rounded-lg font-space text-sm border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{
                            borderColor: 'var(--border-primary)',
                            color: 'var(--text-secondary)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-hover)';
                            e.currentTarget.style.boxShadow = '0 0 20px var(--glow-secondary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-primary)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                        VIEW PROJECTS
                    </a>
                </div>

                {/* Social Links with Glow */}
                <div className="flex justify-center gap-6">
                    <a href="mailto:Adarsh.Raj.2004@outlook.com"
                        className="transition-all duration-300 hover:scale-110"
                        style={{ color: 'var(--text-tertiary)' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--accent-cyan)';
                            e.currentTarget.style.filter = 'drop-shadow(0 0 8px var(--glow-primary))';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-tertiary)';
                            e.currentTarget.style.filter = 'none';
                        }}
                        aria-label="Email">
                        <Mail className="w-6 h-6" />
                    </a>
                    <a href="https://linkedin.com/in/adarsh-raj04" target="_blank" rel="noopener noreferrer"
                        className="transition-all duration-300 hover:scale-110"
                        style={{ color: 'var(--text-tertiary)' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--accent-cyan)';
                            e.currentTarget.style.filter = 'drop-shadow(0 0 8px var(--glow-primary))';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-tertiary)';
                            e.currentTarget.style.filter = 'none';
                        }}
                        aria-label="LinkedIn">
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="https://github.com/adarsh-raj04" target="_blank" rel="noopener noreferrer"
                        className="transition-all duration-300 hover:scale-110"
                        style={{ color: 'var(--text-tertiary)' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--accent-cyan)';
                            e.currentTarget.style.filter = 'drop-shadow(0 0 8px var(--glow-primary))';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-tertiary)';
                            e.currentTarget.style.filter = 'none';
                        }}
                        aria-label="GitHub">
                        <Github className="w-6 h-6" />
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <a 
                href="#about"
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Scroll to About section"
            >
                <ChevronDown className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
            </a>
        </section>
    );
}