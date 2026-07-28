import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink, Github, Layers3, X } from "lucide-react";
import useCardTilt from "../hooks/useCardTilt";
import { enterpriseProjects, personalProjects } from "../data/portfolioData";

const projectBlocks = [
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
  { key: "architecture", label: "Architecture" },
];

function ProjectCard({ project, accent, isVisible, onOpen }) {
  const tiltRef = useCardTilt(10);
  const isCyan = accent === "cyan";

  return (
    <article
      ref={tiltRef}
      className="group relative cursor-pointer overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/60 p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
      style={{
        opacity: isVisible ? 1 : 0,
        transformStyle: "preserve-3d",
      }}
      onClick={onOpen}
    >
      <div
        className="absolute inset-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isCyan
            ? "linear-gradient(135deg, rgba(34,211,238,0.1), transparent 70%)"
            : "linear-gradient(135deg, rgba(192,132,252,0.12), transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
              <Layers3 className="h-5 w-5 text-cyan-300" />
            </div>
            <h4 className="font-orbitron text-xl font-bold text-blue-100">
              {project.title}
            </h4>
          </div>

          <span
            className="rounded-full border px-3 py-1 text-[10px] font-space uppercase tracking-[0.14em] md:text-xs"
            style={{
              color: isCyan ? "var(--accent-cyan)" : "#c084fc",
              borderColor: isCyan
                ? "rgba(34,211,238,0.35)"
                : "rgba(192,132,252,0.35)",
              background: isCyan
                ? "rgba(34,211,238,0.08)"
                : "rgba(192,132,252,0.08)",
            }}
          >
            {isCyan ? enterpriseProjects.title : personalProjects.title}
          </span>
        </div>

        <p
          className="mb-4 font-jetbrains text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.solution}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-jetbrains"
              style={{ color: "var(--text-secondary)" }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-jetbrains"
              style={{ color: "var(--text-secondary)" }}
            >
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectModal({ project, accent, onClose }) {
  const linkColor = accent === "cyan" ? "var(--accent-cyan)" : "#c084fc";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(2, 6, 23, 0.86)",
        backdropFilter: "blur(14px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-[28px] border border-white/10 bg-slate-950/90 p-7 md:p-10"
        style={{
          boxShadow:
            accent === "cyan"
              ? "0 0 70px rgba(34, 211, 238, 0.18)"
              : "0 0 70px rgba(168, 85, 247, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10"
          style={{ color: "var(--text-secondary)" }}
          aria-label="close"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="mb-6 flex flex-wrap items-center gap-3 pr-10">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1.5 text-[11px] font-space uppercase tracking-[0.16em] text-cyan-200">
            Case Study
          </span>
          <span className="font-jetbrains text-sm text-slate-300">
            {project.title}
          </span>
        </div>

        <h3 className="mb-6 font-orbitron text-3xl font-bold text-blue-100">
          {project.title}
        </h3>

        <div className="mb-7 grid gap-4 md:grid-cols-2">
          {projectBlocks.map((block) => (
            <section
              key={block.key}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <h4 className="mb-3 font-space text-[11px] uppercase tracking-[0.16em] text-cyan-200">
                {block.label}
              </h4>
              <p
                className="font-jetbrains text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {project[block.key]}
              </p>
            </section>
          ))}

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h4 className="mb-3 font-space text-[11px] uppercase tracking-[0.16em] text-purple-200">
              Impact
            </h4>
            <ul className="space-y-2">
              {project.impact.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 font-jetbrains text-sm"
                >
                  <span className="mt-0.5 text-cyan-300">▹</span>
                  <span style={{ color: "var(--text-secondary)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <h4 className="mb-3 font-space text-[11px] uppercase tracking-[0.16em] text-indigo-200">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-indigo-400/20 bg-indigo-500/8 px-3 py-1.5 text-xs font-jetbrains md:text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-dashed border-cyan-400/30 bg-cyan-500/5 p-5">
          <h4 className="mb-3 font-space text-[11px] uppercase tracking-[0.16em] text-cyan-200">
            Screenshot
          </h4>
          <div className="flex min-h-28 items-center justify-center rounded-xl border border-white/10 px-4 py-6">
            <p
              className="text-center font-jetbrains text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {project.screenshotPlaceholder}
            </p>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 transition-all duration-300 hover:scale-105"
              style={{ color: "var(--text-secondary)" }}
            >
              <Github className="h-4 w-4" />
              <span className="font-space text-xs uppercase tracking-[0.12em]">
                GitHub
              </span>
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 transition-all duration-300 hover:scale-105"
              style={{ borderColor: linkColor, color: linkColor }}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="font-space text-xs uppercase tracking-[0.12em]">
                Live Demo
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
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

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setExpandedProject(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const allProjectGroups = [
    {
      key: "enterprise",
      accent: "cyan",
      title: enterpriseProjects.title,
      subtitle: enterpriseProjects.subtitle,
      projects: enterpriseProjects.projects,
    },
    {
      key: "personal",
      accent: "magenta",
      title: personalProjects.title,
      subtitle: personalProjects.subtitle,
      projects: personalProjects.projects,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden py-32"
    >
      <div className="absolute inset-0 data-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1.5">
            <Layers3 className="h-4 w-4 text-cyan-300" />
            <span className="font-space text-[11px] uppercase tracking-[0.16em] text-cyan-200">
              Product Signals
            </span>
          </div>

          <h2 className="mb-5 font-orbitron text-4xl font-bold md:text-5xl">
            <span className="holographic">PROJECT SHOWCASE</span>
          </h2>
          <p className="font-space" style={{ color: "var(--text-tertiary)" }}>
            Engineering systems with clear architecture and measurable outcomes
          </p>
        </div>

        <div className="space-y-16">
          {allProjectGroups.map((group) => (
            <section key={group.key} id={`${group.key}-projects`}>
              <header className="mb-8">
                <h3
                  className="mb-2 font-orbitron text-3xl font-bold"
                  style={{
                    color:
                      group.accent === "cyan"
                        ? "var(--accent-cyan)"
                        : "#c084fc",
                  }}
                >
                  {group.title}
                </h3>
                <p
                  className="font-jetbrains text-sm md:text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {group.subtitle}
                </p>
              </header>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {group.projects.map((project, index) => {
                  const projectId = `${group.key}-${index}`;
                  return (
                    <ProjectCard
                      key={projectId}
                      project={project}
                      accent={group.accent}
                      isVisible={isVisible}
                      onOpen={() =>
                        setExpandedProject({
                          id: projectId,
                          accent: group.accent,
                          project,
                        })
                      }
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {expandedProject && (
        <ProjectModal
          project={expandedProject.project}
          accent={expandedProject.accent}
          onClose={() => setExpandedProject(null)}
        />
      )}

      <a
        href="#achievements"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("achievements")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="achievements"
      >
        <ChevronDown
          className="h-8 w-8"
          style={{ color: "var(--accent-cyan)" }}
        />
      </a>
    </section>
  );
}
