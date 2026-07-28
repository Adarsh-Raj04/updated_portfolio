import { useEffect, useRef, useState } from "react";
import { Award, ChevronDown } from "lucide-react";
import { awardsData } from "../data/portfolioData";

export default function Achievements() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1.5">
            <Award className="h-4 w-4 text-cyan-300" />
            <span className="font-space text-[11px] uppercase tracking-[0.16em] text-cyan-200">
              Recognition
            </span>
          </div>

          <h2 className="mb-5 font-orbitron text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              {awardsData.title}
            </span>
          </h2>
          <p
            className="font-space text-sm md:text-base"
            style={{ color: "var(--text-tertiary)" }}
          >
            {awardsData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {awardsData.items.map((item, index) => (
            <article
              key={`${item.title}-${item.year}`}
              className={`rounded-[24px] border border-white/10 bg-slate-950/60 p-6 md:p-7 transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "fade-in-up" : "opacity-0"
              }`}
              style={{
                background:
                  index % 2 === 0
                    ? "linear-gradient(160deg, rgba(59,130,246,0.09) 0%, rgba(56,189,248,0.03) 100%)"
                    : "linear-gradient(160deg, rgba(147,51,234,0.09) 0%, rgba(236,72,153,0.03) 100%)",
                transitionDelay: `${index * 0.08}s`,
              }}
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
                  <Award className="h-6 w-6 text-cyan-300" />
                </div>

                <div>
                  <h3 className="mb-2 font-orbitron text-xl font-bold leading-snug text-blue-200">
                    {item.title}
                  </h3>
                  <p className="font-space text-[11px] uppercase tracking-[0.14em] text-cyan-300">
                    {item.issuer} · {item.year}
                  </p>
                </div>
              </div>

              <p
                className="font-jetbrains text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <a
        href="#education"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("education")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="education"
      >
        <ChevronDown
          className="w-8 h-8"
          style={{ color: "var(--accent-cyan)" }}
        />
      </a>
    </section>
  );
}
