import { Calendar, ChevronDown, GraduationCap, MapPin } from "lucide-react";
import { educationData } from "../data/portfolioData";

export default function Education() {
  return (
    <section id="education" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1.5">
            <GraduationCap className="h-4 w-4 text-cyan-300" />
            <span className="font-space text-[11px] uppercase tracking-[0.16em] text-cyan-200">
              Academic Foundation
            </span>
          </div>

          <h2 className="mb-5 font-orbitron text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              {educationData.title}
            </span>
          </h2>
          <p
            className="font-space text-sm md:text-base"
            style={{ color: "var(--text-tertiary)" }}
          >
            {educationData.subtitle}
          </p>
        </div>

        <article className="rounded-[28px] border border-white/10 bg-slate-950/60 p-7 md:p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="flex flex-col gap-6 md:flex-row md:gap-8 md:items-start">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30 md:h-20 md:w-20">
              <GraduationCap className="h-8 w-8 text-white md:h-10 md:w-10" />
            </div>

            <div className="flex-1">
              <h3 className="mb-3 font-orbitron text-2xl font-bold text-blue-200 md:text-3xl">
                {educationData.degree}
              </h3>

              <p className="mb-2 font-space text-lg text-purple-200 md:text-xl">
                {educationData.institution}
              </p>

              <div className="mb-5 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2">
                  <Calendar className="h-4 w-4 text-blue-300" />
                  <span className="font-space text-xs tracking-wide text-blue-200 md:text-sm">
                    {educationData.duration}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2">
                  <MapPin className="h-4 w-4 text-purple-300" />
                  <span className="font-jetbrains text-xs text-purple-200 md:text-sm">
                    {educationData.location}
                  </span>
                </div>
              </div>

              <p
                className="mb-5 font-jetbrains text-sm leading-relaxed md:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                {educationData.summary}
              </p>

              <ul className="space-y-3">
                {educationData.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 font-jetbrains text-sm"
                  >
                    <span className="mt-0.5 shrink-0 text-cyan-300">▹</span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>

      <a
        href="#certifications"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("certifications")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="certifications"
      >
        <ChevronDown
          className="w-8 h-8"
          style={{ color: "var(--accent-cyan)" }}
        />
      </a>
    </section>
  );
}
