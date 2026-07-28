import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { experienceData } from "../data/portfolioData";

const buildSectionBlocks = (role) => [
  { title: "Enterprise Platforms", items: role.enterprisePlatforms },
  { title: "Core Engineering", items: role.coreEngineering },
  { title: "Business Impact", items: role.businessImpact },
  { title: "Technology Stack", items: role.technologyStack, pills: true },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-32 bg-gradient-to-b from-transparent via-slate-950/20 to-[#0f172a]/70"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_32%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-500/5 mb-6">
            <Building2 className="w-4 h-4 text-cyan-300" />
            <span className="font-space text-[11px] tracking-[0.16em] uppercase text-cyan-200">
              Engineering Systems
            </span>
          </div>

          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              {experienceData.title}
            </span>
          </h2>
          <p
            className="mx-auto font-jetbrains text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {experienceData.intro}
          </p>
        </div>

        <div className="space-y-6">
          {experienceData.roles.map((role, roleIndex) => {
            const sectionBlocks = buildSectionBlocks(role);
            const isEven = roleIndex % 2 === 0;

            return (
              <article
                key={`${role.company}-${role.role}`}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/55 p-7 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
              >
                <div
                  className="absolute inset-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: isEven
                      ? "linear-gradient(135deg, rgba(34,211,238,0.09), transparent 60%)"
                      : "linear-gradient(135deg, rgba(168,85,247,0.1), transparent 60%)",
                  }}
                />

                <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-500/5 mb-4">
                      <Building2 className="w-4 h-4 text-cyan-300" />
                      <span className="font-space text-[11px] tracking-[0.16em] uppercase text-cyan-200">
                        {role.company}
                      </span>
                    </div>

                    <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-blue-100 mb-3">
                      {role.role}
                    </h3>

                    <p
                      className="font-jetbrains text-sm md:text-base leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {role.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {role.enterprisePlatforms.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border px-3 py-1.5 text-xs md:text-sm font-space tracking-wide"
                          style={{
                            borderColor: "rgba(34,211,238,0.24)",
                            background: "rgba(34,211,238,0.08)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 xl:items-end">
                    <div className="inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2">
                      <CalendarDays className="w-4 h-4 text-blue-300" />
                      <span className="font-space text-xs md:text-sm tracking-wide text-blue-200">
                        {role.duration}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2">
                      <MapPin className="w-4 h-4 text-purple-300" />
                      <span className="font-jetbrains text-xs md:text-sm text-purple-200">
                        {role.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-8 grid xl:grid-cols-2 gap-5 md:gap-6">
                  {sectionBlocks.map((block, blockIndex) => (
                    <section
                      key={`${block.title}-${blockIndex}`}
                      className="rounded-2xl border bg-white/[0.02] p-5 md:p-6"
                      style={{
                        borderColor:
                          blockIndex % 2 === 0
                            ? "rgba(56,189,248,0.18)"
                            : "rgba(168,85,247,0.18)",
                      }}
                    >
                      <h4 className="font-space mb-4 text-[11px] tracking-[0.16em] uppercase text-cyan-200">
                        {block.title}
                      </h4>

                      {block.pills ? (
                        <div className="flex flex-wrap gap-2">
                          {block.items.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border px-3 py-1.5 text-xs md:text-sm font-jetbrains"
                              style={{
                                borderColor: "rgba(99,102,241,0.25)",
                                background: "rgba(99,102,241,0.08)",
                                color: "var(--text-secondary)",
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-3 font-jetbrains text-sm leading-relaxed">
                          {block.items.map((item, itemIndex) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 fade-in-up"
                              style={{ animationDelay: `${itemIndex * 0.04}s` }}
                            >
                              <span className="mt-0.5 shrink-0 text-blue-400">
                                ▹
                              </span>
                              <span style={{ color: "var(--text-secondary)" }}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>

                <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1.5 text-[11px] font-space uppercase tracking-[0.16em] text-cyan-200">
                    Signal
                  </span>
                  {role.businessImpact.slice(0, 2).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs md:text-sm font-jetbrains text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                  <ArrowRight className="w-4 h-4 text-cyan-300" />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <a
        href="#skills"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="skills"
      >
        <ChevronDown
          className="w-8 h-8"
          style={{ color: "var(--accent-cyan)" }}
        />
      </a>
    </section>
  );
}
