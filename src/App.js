import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
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
import {
  AboutPage,
  ProjectsPage,
  ResearchPage,
  WritingPage,
} from "./pages/AuthorityPages";
import "./components/LandingAnimation.css";
import "./animations.css";

function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
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
        <ScrollProgress />
        <AnimatedBackground />
        <ParallaxLayer speed={0.3}>
          <ParticleBackground />
        </ParallaxLayer>
        <CursorGlow />
        <EasterEggs />
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
        <BackToTop />
        <SoundEffects />
        <CursorSelector />
        <Terminal />
        <PortfolioCounter />
      </main>
    </>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  switch (path) {
    case "/about":
      return <AboutPage />;
    case "/projects":
      return <ProjectsPage />;
    case "/research":
      return <ResearchPage />;
    case "/writing":
      return <WritingPage />;
    default:
      return <Home />;
  }
}
