import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Participation from './components/Participation';
import Education from './components/Education';
import Certifications from './components/Certifications';
import GitHubStats from './components/GitHubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import ParticleBackground from './components/ParticleBackground';
import ParallaxLayer from './components/ParallaxLayer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import EasterEggs from './components/EasterEggs';
import SoundEffects from './components/SoundEffects';
import Terminal from './components/Terminal';
import CursorSelector from './components/CursorSelector';
import './animations.css';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen"
      style={{
        color: 'var(--text-primary)',
        position: 'relative'
      }}
    >
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Animated Gradient Background */}
      <AnimatedBackground />

      {/* Particle Network Effect - Medium parallax */}
      <ParallaxLayer speed={0.3}>
        <ParticleBackground />
      </ParallaxLayer>

      {/* Cursor Glow Effect */}
      <div
        className="cursor-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      />

      {/* Easter Eggs */}
      <EasterEggs />

      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
      <Participation />
      <Education />
      <Certifications />
      <GitHubStats />
      <Contact />
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Sound Effects Toggle */}
      <SoundEffects />

      {/* Cursor Selector */}
      <CursorSelector />

      {/* Terminal */}
      <Terminal />
    </main>
  );
}