import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { aboutData } from "../data/portfolioData";

export default function About() {
  const sectionRef = useRef(null);

  const storyCards = [
    {
      id: "who",
      title: aboutData.bento.whoIAm.title,
      description: aboutData.bento.whoIAm.description,
      className: "lg:col-span-4",
      tone: "from-cyan-500/15 to-blue-500/10",
    },
    {
      id: "build",
      title: aboutData.bento.whatIBuild.title,
      description: aboutData.bento.whatIBuild.description,
      className: "lg:col-span-4",
      tone: "from-violet-500/15 to-indigo-500/10",
    },
    {
      id: "beyond",
      title: aboutData.bento.beyondWork.title,
      description: aboutData.bento.beyondWork.description,
      className: "lg:col-span-8",
      tone: "from-pink-500/15 to-purple-500/10",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-orbitron text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {aboutData.title}
            </span>
          </h2>

          <p
            className="max-w-3xl mx-auto text-base md:text-lg font-jetbrains"
            style={{ color: "var(--text-secondary)" }}
          >
            {aboutData.subtitle}
          </p>
        </div>

        <p
          className="max-w-4xl mx-auto mb-14 text-center font-jetbrains text-sm md:text-base leading-relaxed"
          style={{ color: "var(--text-tertiary)" }}
        >
          {aboutData.intro}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 mb-16">
          {storyCards.map((card) => (
            <article
              key={card.id}
              className={`gradient-border rounded-2xl p-6 md:p-8 bg-gradient-to-br ${card.tone} ${card.className} transition-all duration-300 hover:-translate-y-1 fade-in-up`}
            >
              <h3 className="font-orbitron text-2xl mb-4 text-cyan-200">
                {card.title}
              </h3>
              <p
                className="font-jetbrains leading-7 text-sm md:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                {card.description}
              </p>
            </article>
          ))}

          <article className="gradient-border rounded-2xl p-6 md:p-8 lg:col-span-3 bg-white/[0.02] fade-in-up">
            <h3 className="font-orbitron text-2xl mb-6 text-cyan-200">
              {aboutData.bento.coreExpertise.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {aboutData.bento.coreExpertise.items.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full border text-xs md:text-sm font-space tracking-wide"
                  style={{
                    borderColor: "rgba(34,211,238,.3)",
                    color: "var(--text-secondary)",
                    background: "rgba(34,211,238,.08)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="gradient-border rounded-2xl p-6 md:p-8 lg:col-span-5 bg-white/[0.02] fade-in-up">
            <h3 className="font-orbitron text-2xl mb-6 text-cyan-200">
              {aboutData.bento.impactMetrics.title}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {aboutData.bento.impactMetrics.items.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border p-4 md:p-5"
                  style={{
                    borderColor: "rgba(56,189,248,.2)",
                    background:
                      "linear-gradient(160deg, rgba(14,165,233,.08) 0%, rgba(56,189,248,.02) 100%)",
                  }}
                >
                  <div className="font-orbitron text-xl md:text-2xl font-bold holographic mb-2">
                    {item.value}
                  </div>
                  <p
                    className="font-space text-[10px] md:text-xs tracking-[0.14em] uppercase"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>

      <a
        href="#experience"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("experience")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="experience"
      >
        <ChevronDown
          className="w-8 h-8"
          style={{ color: "var(--accent-cyan)" }}
        />
      </a>
    </section>
  );
}
