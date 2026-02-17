import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Participation from "./components/Participation";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import GitHubStats from "./components/GitHubStats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import ParticleBackground from "./components/ParticleBackground";
import ParallaxLayer from "./components/ParallaxLayer";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import EasterEggs from "./components/EasterEggs";
import SoundEffects from "./components/SoundEffects";
import Terminal from "./components/Terminal";
import CursorSelector from "./components/CursorSelector";
import PortfolioCounter from "./components/PortfolioCounter";
import LandingAnimation from "./components/LandingAnimation";
import CursorGlow from "./components/CursorGlow";
import "./components/LandingAnimation.css";
import "./animations.css";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {/* Landing Animation for the portfolio */}
      <LandingAnimation onComplete={() => setShowContent(true)} />

      <main
        className="min-h-screen"
        style={{
          color: "var(--text-primary)",
          position: "relative",
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease-in",
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

        {/* Enhanced Cursor Glow with Trails */}
        <CursorGlow />

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

        {/* Portfolio Counter */}
        <PortfolioCounter />
      </main>
    </>
  );
}
