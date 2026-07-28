import { useEffect, useRef, useState } from "react";
import {
  Braces,
  Cloud,
  Cpu,
  Database,
  GitBranch,
  Server,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { skillsData } from "../data/portfolioData";

const iconMap = {
  Programming: Braces,
  Backend: Server,
  AI: Sparkles,
  "Data Engineering": Cpu,
  Cloud,
  Databases: Database,
  DevOps: GitBranch,
};

const toneMap = {
  Programming: "from-cyan-500/12 to-blue-500/6",
  Backend: "from-emerald-500/12 to-lime-500/6",
  AI: "from-fuchsia-500/12 to-purple-500/6",
  "Data Engineering": "from-sky-500/12 to-cyan-500/6",
  Cloud: "from-violet-500/12 to-indigo-500/6",
  Databases: "from-blue-500/12 to-indigo-500/6",
  DevOps: "from-amber-500/12 to-orange-500/6",
};

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
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
      id="skills"
      className="py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 data-grid opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-5xl font-bold mb-5">
            <span className="holographic">{skillsData.title}</span>
          </h2>
          <p className="font-space" style={{ color: "var(--text-tertiary)" }}>
            {skillsData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillsData.groups.map((group, index) => {
            const Icon = iconMap[group.category] ?? Cloud;
            const tone =
              toneMap[group.category] ?? "from-slate-500/12 to-slate-500/6";

            return (
              <article
                key={group.category}
                className={`gradient-border rounded-2xl p-6 md:p-7 bg-gradient-to-br ${tone} transition-all duration-500 ${
                  isVisible ? "fade-in-up" : "opacity-0"
                }`}
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  transitionDelay: `${index * 0.08}s`,
                }}
              >
                <header className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-cyan-400/30 bg-cyan-500/10">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <h3 className="font-orbitron text-xl font-bold text-blue-100">
                    {group.category}
                  </h3>
                </header>

                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full text-xs md:text-sm font-jetbrains border"
                      style={{
                        borderColor: "rgba(56,189,248,0.24)",
                        background: "rgba(56,189,248,0.08)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <a
        href="#projects"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="projects"
      >
        <ChevronDown
          className="w-8 h-8"
          style={{ color: "var(--accent-cyan)" }}
        />
      </a>
    </section>
  );
}
