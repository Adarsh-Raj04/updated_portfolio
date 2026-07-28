import { useState, useEffect, useRef } from "react";
import { Menu, X, Download } from "lucide-react";
import { FiSun, FiMoon } from "react-icons/fi";
import {
  heroData,
  aboutData,
  experienceData,
  enterpriseProjects,
  skillsData,
  awardsData,
  educationData,
  certificationsData,
  contactData,
} from "../data/portfolioData";

const cleanNavLabel = (text) =>
  text
    .replace("PROFESSIONAL ", "")
    .replace("TECHNICAL ", "")
    .replace("ENTERPRISE ", "")
    .trim();

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("dark");
  const menuRef = useRef(null);

  const navItems = [
    { name: cleanNavLabel(aboutData.title), href: "#about" },
    { name: cleanNavLabel(experienceData.title), href: "#experience" },
    { name: cleanNavLabel(enterpriseProjects.title), href: "#projects" },
    { name: cleanNavLabel(skillsData.title), href: "#skills" },
    { name: cleanNavLabel(awardsData.title), href: "#achievements" },
    { name: cleanNavLabel(educationData.title), href: "#education" },
    { name: cleanNavLabel(certificationsData.title), href: "#certifications" },
    { name: cleanNavLabel(contactData.title), href: "#contact" },
  ];

  const activeSections = navItems.map((item) => item.href.slice(1));
  const resumeCta = heroData.ctas.find((cta) => cta.download) || null;
  const resumeHref = resumeCta?.href || "/Adarsh_Raj_Resume.pdf";
  const resumeLabel = (resumeCta?.label || "Resume").replace("Download ", "");
  const logoText = `${heroData.name.split(" ")[0] || "PORTFOLIO"}.`;

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
      }
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const systemTheme = prefersDark ? "dark" : "light";
    setTheme(systemTheme);
    if (systemTheme === "light") {
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    const ripple = document.createElement("div");
    ripple.style.position = "fixed";
    ripple.style.top = "0";
    ripple.style.left = "0";
    ripple.style.width = "100vw";
    ripple.style.height = "100vh";
    ripple.style.background =
      newTheme === "light"
        ? "radial-gradient(circle at center, #f0f4f8 0%, transparent 70%)"
        : "radial-gradient(circle at center, #0a0e1a 0%, transparent 70%)";
    ripple.style.zIndex = "9998";
    ripple.style.pointerEvents = "none";
    ripple.style.opacity = "0";
    ripple.style.transition = "opacity 0.6s ease-out";
    document.body.appendChild(ripple);

    requestAnimationFrame(() => {
      ripple.style.opacity = "1";
    });

    setTimeout(() => {
      if (newTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    }, 300);

    setTimeout(() => {
      ripple.style.opacity = "0";
      setTimeout(() => ripple.remove(), 600);
    }, 600);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["hero", ...activeSections];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) {
          return false;
        }
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSections]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const isActive = (href) => activeSection === href.slice(1);

  const trackResumeDownload = async () => {
    try {
      await fetch(
        "/.netlify/functions/counter?action=up&counter=adarsh04-p-resume",
      );
    } catch {
      // Silent fail; never block resume download.
    }
  };

  return (
    <nav
      ref={menuRef}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "border-b backdrop-blur-xl" : "bg-transparent"
      }`}
      style={{
        backgroundColor: isScrolled ? "rgba(10, 14, 26, 0.72)" : "transparent",
        borderColor: isScrolled ? "rgba(34, 211, 238, 0.2)" : "transparent",
        boxShadow: isScrolled
          ? "0 8px 30px rgba(2, 8, 23, 0.35), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "none",
        backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            className="group relative shrink-0 font-orbitron text-2xl font-bold"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {logoText}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100">
              {logoText}
            </span>
          </a>

          {!isMobile && (
            <div className="flex items-center gap-6 font-space text-sm">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="whitespace-nowrap transition-all duration-300 hover:text-cyan-300"
                  style={{
                    color: isActive(item.href)
                      ? "var(--accent-cyan)"
                      : "var(--text-tertiary)",
                    textShadow: isActive(item.href)
                      ? "0 0 10px var(--glow-secondary)"
                      : "none",
                  }}
                >
                  {item.name}
                </a>
              ))}

              <button
                onClick={toggleTheme}
                className="group rounded-lg border border-white/10 bg-white/[0.04] p-2 transition-all duration-300 hover:scale-110"
                style={{ boxShadow: "0 0 10px rgba(34, 211, 238, 0.12)" }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <FiSun className="h-4 w-4 text-cyan-400 transition-transform duration-500 group-hover:rotate-180" />
                ) : (
                  <FiMoon className="h-4 w-4 text-purple-500 transition-transform duration-500 group-hover:-rotate-12" />
                )}
              </button>

              <a
                target="_blank"
                rel="noreferrer noopener"
                href={resumeHref}
                download
                onClick={trackResumeDownload}
                className="group relative flex items-center gap-2 overflow-hidden rounded-lg border border-cyan-400/30 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/10 px-4 py-2 font-space text-xs whitespace-nowrap transition-all duration-300 hover:scale-[1.02]"
                style={{ color: "#00ffff" }}
              >
                <Download className="h-3.5 w-3.5" />
                {resumeLabel}
              </a>
            </div>
          )}

          {isMobile && (
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-2 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <FiSun className="h-4 w-4 text-cyan-400" />
                ) : (
                  <FiMoon className="h-4 w-4 text-purple-500" />
                )}
              </button>

              <a
                target="_blank"
                rel="noreferrer noopener"
                href={resumeHref}
                download
                onClick={trackResumeDownload}
                className="transition-colors"
                style={{ color: "#00ffff" }}
                aria-label={resumeLabel}
              >
                <Download className="h-5 w-5" />
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="transition-colors"
                style={{ color: "#64748b" }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "#00ffff";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "#64748b";
                }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          )}
        </div>

        {isMobile && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className="mt-4 py-4 border-t flex flex-col space-y-4 font-space text-sm"
              style={{ borderColor: "rgba(0, 255, 255, 0.2)" }}
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="transition-colors"
                  style={{
                    color: isActive(item.href) ? "#00ffff" : "#64748b",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "#00ffff";
                  }}
                  onMouseLeave={(event) => {
                    if (!isActive(item.href)) {
                      event.currentTarget.style.color = "#64748b";
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
