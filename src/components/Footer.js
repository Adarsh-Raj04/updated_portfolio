import { Github, Heart, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-black/50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 text-center">
          <div className="mb-3 font-orbitron text-2xl font-bold text-blue-100">
            <span className="text-blue-400">A</span>DARSH
            <span className="text-purple-400">.</span>
          </div>
          <p
            className="font-jetbrains text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Turning data into intelligence, one integration at a time.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {[
            {
              label: "Email",
              href: "mailto:Adarsh.Raj.2004@outlook.com",
              icon: Mail,
            },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/adarsh-raj04",
              icon: Linkedin,
            },
            {
              label: "GitHub",
              href: "https://github.com/adarsh-raj04",
              icon: Github,
            },
          ].map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:text-cyan-300"
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-6">
          {[
            ["About", "#about"],
            ["Experience", "#experience"],
            ["Projects", "#projects"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-space text-sm transition-colors duration-300 hover:text-cyan-300"
              style={{ color: "var(--text-secondary)" }}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-6 border-t border-white/5 pt-8">
          {[
            ["Professional About", "/about/"],
            ["AI Projects", "/projects/"],
            ["Research", "/research/"],
            ["Technical Writing", "/writing/"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-space text-sm transition-colors duration-300 hover:text-cyan-300"
              style={{ color: "var(--text-secondary)" }}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="text-center">
          <p
            className="flex flex-wrap items-center justify-center gap-2 font-jetbrains text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            <span>© {currentYear} Adarsh Raj. Crafted with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>and purpose.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
