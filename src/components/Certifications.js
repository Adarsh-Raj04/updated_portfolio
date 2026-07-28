import { Award, ChevronDown, ExternalLink } from "lucide-react";
import { certificationsData } from "../data/portfolioData";

export default function Certifications() {
  const visibleItems = certificationsData.items.slice(
    0,
    certificationsData.maxVisible,
  );

  return (
    <section id="certifications" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1.5">
            <Award className="h-4 w-4 text-cyan-300" />
            <span className="font-space text-[11px] uppercase tracking-[0.16em] text-cyan-200">
              Credentials
            </span>
          </div>

          <h2 className="mb-5 font-orbitron text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              {certificationsData.title}
            </span>
          </h2>
          <p
            className="font-space text-sm md:text-base"
            style={{ color: "var(--text-tertiary)" }}
          >
            {certificationsData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((certification, index) => (
            <article
              key={`${certification.name}-${certification.year}`}
              className="rounded-[24px] border border-white/10 bg-slate-950/60 p-6 md:p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background:
                  index % 2 === 0
                    ? "linear-gradient(160deg, rgba(56,189,248,0.1) 0%, rgba(14,165,233,0.03) 100%)"
                    : "linear-gradient(160deg, rgba(168,85,247,0.1) 0%, rgba(236,72,153,0.03) 100%)",
              }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
                <Award className="h-6 w-6 text-cyan-300" />
              </div>

              <h3 className="mb-3 font-orbitron text-lg font-bold leading-snug text-blue-200">
                {certification.name}
              </h3>

              <p className="mb-4 font-space text-[11px] uppercase tracking-[0.14em] text-purple-200">
                {certification.issuer} · {certification.year}
              </p>

              <div className="mt-auto pt-2">
                {certification.credentialUrl ? (
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 font-space text-xs transition-all duration-300 hover:scale-105"
                    style={{ color: "var(--accent-cyan)" }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    VIEW CREDENTIAL
                  </a>
                ) : (
                  <span
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 font-space text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    CREDENTIAL AVAILABLE ON REQUEST
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <a
        href="#contact"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="contact"
      >
        <ChevronDown
          className="w-8 h-8"
          style={{ color: "var(--accent-cyan)" }}
        />
      </a>
    </section>
  );
}
