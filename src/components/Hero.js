import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, Globe, ChevronDown } from "lucide-react";
import ParallaxLayer from "./ParallaxLayer";
import { heroData } from "../data/portfolioData";

const socialIconMap = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  portfolio: Globe,
};

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const fullText = heroData.typingText;
  const [firstName = "", ...restName] = heroData.name.split(" ");
  const lastName = restName.join(" ");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index += 1;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [fullText]);

  const socialEntries = Object.entries(heroData.social).filter(([, href]) =>
    Boolean(href),
  );

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <ParallaxLayer speed={0.2}>
        <div className="absolute inset-0 data-grid opacity-30" />
      </ParallaxLayer>

      <ParallaxLayer speed={0.3}>
        <div className="scanlines absolute inset-0 opacity-20" />
      </ParallaxLayer>

      <ParallaxLayer speed={0.4}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </ParallaxLayer>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-24 pb-20 w-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-start">
          <div className="text-center lg:text-left">
            <div className="floating mb-8">
              <div className="inline-block relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 glow-intensify flex items-center justify-center">
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--bg-primary)" }}
                  >
                    <span className="text-4xl md:text-5xl font-orbitron font-bold holographic">
                      {firstName?.[0]}
                      {lastName?.[0]}
                    </span>
                  </div>
                </div>
                <div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/30 rotate-3d"
                  style={{ animation: "rotate3D 20s linear infinite" }}
                />
              </div>
            </div>

            <h1 className="font-orbitron text-5xl md:text-7xl xl:text-8xl font-black leading-[1.05] mb-6">
              <span className="glitch-hover inline-block" data-text={firstName}>
                {firstName}
              </span>{" "}
              <span className="holographic inline-block">{lastName}</span>
            </h1>

            <p
              className="font-space text-base md:text-xl tracking-wider min-h-[2rem] mb-5"
              style={{ color: "var(--text-secondary)" }}
            >
              {displayText}
              <span className="terminal-cursor ml-1" />
            </p>

            <div className="inline-flex mb-6 px-4 py-2 rounded-full border border-cyan-400/25 bg-cyan-500/5">
              <span
                className="font-space text-xs md:text-sm tracking-[0.18em] uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                {heroData.role}
              </span>
            </div>

            <p
              className="font-jetbrains text-base md:text-lg max-w-3xl leading-relaxed mb-8"
              style={{ color: "var(--text-tertiary)" }}
            >
              {heroData.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start">
              {heroData.expertisePills.map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-2 rounded-full border text-xs md:text-sm font-space tracking-wide transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: "rgba(34,211,238,.25)",
                    color: "var(--text-secondary)",
                    background: "rgba(14,165,233,.06)",
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              {heroData.ctas.map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  target={cta.download ? "_blank" : undefined}
                  rel={cta.download ? "noopener noreferrer" : undefined}
                  download={cta.download}
                  className={
                    cta.variant === "primary"
                      ? "group relative px-7 py-3.5 rounded-xl font-space text-sm overflow-hidden transition-all duration-300 hover:scale-105"
                      : "px-7 py-3.5 rounded-xl font-space text-sm border transition-all duration-300 hover:scale-105"
                  }
                  style={
                    cta.variant === "secondary"
                      ? {
                          borderColor: "var(--border-primary)",
                          color: "var(--text-secondary)",
                          background: "rgba(255,255,255,.02)",
                        }
                      : undefined
                  }
                >
                  {cta.variant === "primary" && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div
                        className="absolute inset-[1.5px] rounded-xl"
                        style={{ backgroundColor: "var(--bg-primary)" }}
                      />
                    </>
                  )}
                  <span className="relative z-10 font-bold">{cta.label}</span>
                </a>
              ))}
            </div>

            <div className="flex gap-5 justify-center lg:justify-start">
              {socialEntries.map(([key, href]) => {
                const Icon = socialIconMap[key] ?? Globe;
                const label = key.charAt(0).toUpperCase() + key.slice(1);

                return (
                  <a
                    key={key}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="transition-all duration-300 hover:scale-110"
                    style={{ color: "var(--text-tertiary)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--accent-cyan)";
                      e.currentTarget.style.filter =
                        "drop-shadow(0 0 8px var(--glow-primary))";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-tertiary)";
                      e.currentTarget.style.filter = "none";
                    }}
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="gradient-border rounded-2xl p-6 md:p-8 backdrop-blur-sm bg-white/[0.02]">
            <div className="flex items-center justify-between mb-6">
              <p
                className="font-space text-sm tracking-[0.16em] uppercase"
                style={{ color: "var(--text-secondary)" }}
              >
                {heroData.company.name}
              </p>
              <a
                href={heroData.company.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs md:text-sm font-jetbrains transition-colors duration-300"
                style={{ color: "var(--accent-cyan)" }}
              >
                {heroData.company.url.replace("https://", "")}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {heroData.metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-2xl p-4 md:p-5 border"
                  style={{
                    borderColor: "rgba(56,189,248,.2)",
                    background:
                      "linear-gradient(160deg, rgba(14,165,233,.07) 0%, rgba(56,189,248,.02) 100%)",
                  }}
                >
                  <p className="font-orbitron text-2xl md:text-3xl font-bold holographic">
                    {metric.value}
                  </p>
                  <p
                    className="font-jetbrains text-[11px] md:text-xs mt-2 leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {metric.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="about"
      >
        <ChevronDown
          className="w-8 h-8"
          style={{ color: "var(--accent-cyan)" }}
        />
      </a>
    </section>
  );
}
