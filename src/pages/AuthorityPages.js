import { useEffect } from "react";

const SITE = "https://adarshraj.in";
const LINKEDIN = "https://www.linkedin.com/in/adarsh-raj04/";
const GITHUB = "https://github.com/Adarsh-Raj04";
const RESEARCH_GATE =
  "https://www.researchgate.net/publication/379502645_CureConnect_Streamlined_Health_Integration";

const person = {
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: "Adarsh Raj",
  url: SITE,
  jobTitle: "Applied AI & Backend Engineer",
  description:
    "Applied AI & Backend Engineer at GSK specializing in Generative AI, LLMs, RAG, AI agents, Azure AI, FastAPI, Databricks and enterprise data platforms.",
  worksFor: {
    "@type": "Organization",
    name: "GSK",
    url: "https://www.gsk.com/",
  },
  sameAs: [LINKEDIN, GITHUB, RESEARCH_GATE],
  knowsAbout: [
    "Generative AI",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "AI Agents",
    "Agentic AI",
    "LangChain",
    "LangGraph",
    "Azure AI",
    "Azure AI Search",
    "Python",
    "FastAPI",
    "Databricks",
    "Apache Spark",
    "Semantic Search",
    "Vector Search",
    "Enterprise AI",
    "Backend Engineering",
    "Data & AI platforms",
  ],
};

function Seo({ title, description, path, schema }) {
  useEffect(() => {
    document.title = title;

    const canonical = `${SITE}${path}`;
    const meta = [
      ["name", "description", description],
      ["name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"],
      ["property", "og:type", "website"],
      ["property", "og:url", canonical],
      ["property", "og:title", title],
      ["property", "og:description", description],
      ["property", "og:site_name", "Adarsh Raj"],
      ["property", "og:locale", "en_IN"],
      ["name", "twitter:card", "summary"],
      ["name", "twitter:title", title],
      ["name", "twitter:description", description],
    ];

    meta.forEach(([attribute, key, content]) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    });

    let canonicalLink = document.head.querySelector("link[data-authority-canonical]");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      canonicalLink.setAttribute("data-authority-canonical", "true");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonical);

    const scriptId = "authority-page-structured-data";
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const current = document.getElementById(scriptId);
      if (current) current.remove();
    };
  }, [title, description, path, schema]);

  return null;
}

function AuthorityNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <a href="/" className="font-orbitron text-lg font-bold text-cyan-300">
          ADARSH.
        </a>
        <div className="flex flex-wrap gap-4 font-space text-sm text-slate-300">
          <a href="/about/" className="hover:text-cyan-300">About</a>
          <a href="/projects/" className="hover:text-cyan-300">Projects</a>
          <a href="/research/" className="hover:text-cyan-300">Research</a>
          <a href="/writing/" className="hover:text-cyan-300">Writing</a>
          <a href="/" className="hover:text-cyan-300">Portfolio</a>
        </div>
      </div>
    </nav>
  );
}

function PageShell({ children }) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <AuthorityNav />
      <div className="mx-auto max-w-6xl px-6 py-16">{children}</div>
    </main>
  );
}

function PageIntro({ eyebrow, title, description }) {
  return (
    <header className="mb-12 max-w-4xl">
      <p className="mb-4 font-jetbrains text-sm uppercase tracking-[0.2em] text-cyan-300">
        {eyebrow}
      </p>
      <h1 className="font-orbitron text-4xl font-bold leading-tight md:text-5xl">
        {title}
      </h1>
      <p className="mt-6 max-w-3xl font-space text-lg leading-8 text-slate-300">
        {description}
      </p>
    </header>
  );
}

function InternalLinks({ links }) {
  return (
    <div className="mt-12 flex flex-wrap gap-4 border-t border-white/10 pt-8 font-space text-sm">
      {links.map(([label, href]) => (
        <a
          key={href}
          href={href}
          className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-400/10"
        >
          {label}
        </a>
      ))}
    </div>
  );
}

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE}/about/#profile`,
  url: `${SITE}/about/`,
  name: "Adarsh Raj | About | Applied AI & Backend Engineer",
  mainEntity: person,
};

export function AboutPage() {
  const title = "Adarsh Raj | About | Applied AI & Backend Engineer";
  const description =
    "Learn about Adarsh Raj, an Applied AI & Backend Engineer at GSK specializing in Generative AI, RAG, LLMs, AI agents and enterprise AI systems.";

  return (
    <PageShell>
      <Seo title={title} description={description} path="/about/" schema={aboutSchema} />
      <PageIntro
        eyebrow="Professional identity"
        title="Adarsh Raj | Applied AI & Backend Engineer"
        description="I am Adarsh Raj, an Applied AI & Backend Engineer at GSK in Bengaluru, India, focused on Generative AI, LLMs, RAG, AI agents, backend engineering and enterprise AI platforms."
      />

      <section className="grid gap-6 md:grid-cols-2">
        {[
          ["Current role", "Applied AI & Backend Engineer at GSK"],
          ["Location", "Bengaluru, India"],
          ["AI focus", "Generative AI, LLMs, RAG and AI Agents"],
          ["Engineering focus", "Python, FastAPI, Azure AI, Databricks and enterprise platforms"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="font-jetbrains text-xs uppercase tracking-wider text-slate-500">{label}</p>
            <p className="mt-3 font-space text-lg text-slate-200">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="font-orbitron text-2xl font-semibold">Core expertise</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {person.knowsAbout.map((item) => (
            <span key={item} className="rounded-full border border-purple-400/20 bg-purple-400/5 px-4 py-2 font-space text-sm text-slate-300">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="font-orbitron text-2xl font-semibold">Professional profiles</h2>
        <div className="mt-6 flex flex-wrap gap-6 font-space text-cyan-300">
          <a href={LINKEDIN} target="_blank" rel="noreferrer noopener">LinkedIn</a>
          <a href={GITHUB} target="_blank" rel="noreferrer noopener">GitHub</a>
          <a href={RESEARCH_GATE} target="_blank" rel="noreferrer noopener">ResearchGate</a>
          <a href="/">Main portfolio</a>
        </div>
      </section>

      <InternalLinks links={[["Explore projects", "/projects/"], ["Research & publication", "/research/"], ["Technical writing", "/writing/"]]} />
    </PageShell>
  );
}

const projects = [
  {
    name: "Mnemo",
    description: "An independent AI product focused on memory-oriented workflows, semantic recall and contextual assistant experiences.",
    problem: "Knowledge workers struggle to retain and retrieve context across fragmented notes and resources.",
    built: "Designed a memory-oriented AI workspace with semantic recall and contextual assistant workflows.",
    technologies: ["React", "FastAPI", "Python", "OpenAI", "Vector Database"],
    architecture: "React frontend + FastAPI backend + vector retrieval + model orchestration + cloud deployment.",
    url: "https://github.com/adarsh-raj04",
  },
  {
    name: "MedResearch",
    description: "An AI-assisted research exploration interface for summarization, retrieval and structured insight extraction.",
    problem: "Medical research synthesis requires navigating dense documents with high cognitive overhead.",
    built: "Built an AI-assisted exploration interface for summarization, retrieval and structured insight extraction.",
    technologies: ["Python", "React", "LLMs", "Search Index", "NLP"],
    architecture: "Document ingestion + semantic indexing + prompt workflows + interactive result surfaces.",
    url: "https://github.com/adarsh-raj04",
  },
  {
    name: "Rover",
    description: "An enterprise metadata discovery platform using semantic search and conversational access for governance workflows.",
    problem: "Enterprise metadata discovery was fragmented across tools, making governance and search slow and inconsistent.",
    built: "Built semantic search and conversational access for metadata with retrieval services and governance-aware indexing.",
    technologies: ["Python", "FastAPI", "OpenAI", "Azure AI Search", "Databricks", "Apache Spark", "Collibra"],
    architecture: "OpenAI embeddings + Azure AI Search + FastAPI service layer + Databricks ingestion pipelines + Collibra integration.",
  },
  {
    name: "Augmented DQ",
    description: "An enterprise data-quality workflow connecting DQ outputs with governance reporting and metadata tooling.",
    problem: "Data quality outputs were disconnected from governance tooling, reducing visibility and trust.",
    built: "Integrated DQ outputs into Collibra with automated registration and governance reporting flows.",
    technologies: ["Python", "Azure Functions", "Collibra", "Azure Data Factory", "Azure SQL"],
    architecture: "Data quality producers + integration services + Collibra APIs + scheduled cloud orchestration.",
  },
];

const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE}/projects/#page`,
  url: `${SITE}/projects/`,
  name: "Adarsh Raj | AI & Engineering Projects",
  description: "Selected AI, backend, search and enterprise data engineering projects by Adarsh Raj.",
  about: person,
};

export function ProjectsPage() {
  const title = "Adarsh Raj | AI & Engineering Projects";
  const description =
    "Explore AI, backend, semantic search and enterprise data projects built by Adarsh Raj, including Mnemo, MedResearch, Rover and Augmented DQ.";

  return (
    <PageShell>
      <Seo title={title} description={description} path="/projects/" schema={projectsSchema} />
      <PageIntro
        eyebrow="Selected work"
        title="AI & Engineering Projects"
        description="A project authority hub covering independent AI products and enterprise engineering systems represented in my portfolio."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <article key={project.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <h2 className="font-orbitron text-2xl font-semibold text-cyan-200">{project.name}</h2>
            <p className="mt-4 font-space leading-7 text-slate-300">{project.description}</p>
            <div className="mt-6 space-y-5 font-space text-sm leading-6 text-slate-400">
              <div><strong className="text-slate-200">Problem:</strong> {project.problem}</div>
              <div><strong className="text-slate-200">What I built:</strong> {project.built}</div>
              <div><strong className="text-slate-200">Architecture:</strong> {project.architecture}</div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full bg-white/5 px-3 py-1.5 font-jetbrains text-xs text-slate-300">{tech}</span>
              ))}
            </div>
            {project.url && (
              <a className="mt-6 inline-block font-space text-sm text-cyan-300 hover:text-cyan-200" href={project.url} target="_blank" rel="noreferrer noopener">
                GitHub profile →
              </a>
            )}
          </article>
        ))}
      </div>
      <InternalLinks links={[["About Adarsh Raj", "/about/"], ["Research", "/research/"], ["Technical writing", "/writing/"]]} />
    </PageShell>
  );
}

const researchSchema = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "@id": `${SITE}/research/#cureconnect`,
  url: `${SITE}/research/`,
  name: "CureConnect: Streamlined Health Integration",
  author: {
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: "Adarsh Raj",
  },
  sameAs: RESEARCH_GATE,
};

export function ResearchPage() {
  const title = "Adarsh Raj | Research & Publications";
  const description =
    "Research and publication work associated with Adarsh Raj, including CureConnect: Streamlined Health Integration.";

  return (
    <PageShell>
      <Seo title={title} description={description} path="/research/" schema={researchSchema} />
      <PageIntro
        eyebrow="Research & publications"
        title="Research by Adarsh Raj"
        description="A focused research hub for genuine publication work represented in the portfolio. Bibliographic details are intentionally limited to information confirmed in the existing project."
      />
      <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <p className="font-jetbrains text-xs uppercase tracking-wider text-purple-300">Publication</p>
        <h2 className="mt-4 font-orbitron text-2xl font-semibold">CureConnect: Streamlined Health Integration</h2>
        <p className="mt-5 max-w-3xl font-space leading-8 text-slate-300">
          Adarsh Raj is an author of this publication. The existing portfolio confirms the publication and its ResearchGate record; additional bibliographic details are not added here unless represented in the repository.
        </p>
        <a className="mt-6 inline-block font-space text-cyan-300 hover:text-cyan-200" href={RESEARCH_GATE} target="_blank" rel="noreferrer noopener">
          View publication on ResearchGate →
        </a>
      </article>
      <InternalLinks links={[["About Adarsh Raj", "/about/"], ["Projects", "/projects/"], ["Technical writing", "/writing/"]]} />
    </PageShell>
  );
}

const writingSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE}/writing/#page`,
  url: `${SITE}/writing/`,
  name: "Adarsh Raj | Technical Writing",
  description: "Technical writing hub by Adarsh Raj covering Generative AI, LLMs, RAG, AI agents, Azure AI, search and backend engineering.",
  author: person,
};

const writingTopics = [
  "Generative AI",
  "LLMs",
  "RAG",
  "AI Agents",
  "LangGraph",
  "LangChain",
  "Azure AI",
  "Semantic Search",
  "Vector Search",
  "Backend Engineering",
  "AI evaluation",
  "Production AI systems",
];

export function WritingPage() {
  const title = "Adarsh Raj | Technical Writing | Generative AI & Backend";
  const description =
    "Technical writing hub by Adarsh Raj covering Generative AI, LLMs, RAG, AI agents, LangGraph, Azure AI, semantic search and production AI systems.";

  return (
    <PageShell>
      <Seo title={title} description={description} path="/writing/" schema={writingSchema} />
      <PageIntro
        eyebrow="Technical writing"
        title="Technical Writing by Adarsh Raj"
        description="A growing author hub for practical engineering notes and future articles on production AI systems, retrieval, agents, search and backend engineering."
      />
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h2 className="font-orbitron text-2xl font-semibold">Topics</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {writingTopics.map((topic) => (
            <span key={topic} className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 font-space text-sm text-slate-300">
              {topic}
            </span>
          ))}
        </div>
      </section>
      <section className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8">
        <h2 className="font-orbitron text-xl font-semibold">Articles coming here</h2>
        <p className="mt-4 font-space leading-7 text-slate-400">
          No placeholder articles are presented as published work. This hub is ready for genuine technical articles to be added as they are created.
        </p>
      </section>
      <InternalLinks links={[["About Adarsh Raj", "/about/"], ["Projects", "/projects/"], ["Research", "/research/"]]} />
    </PageShell>
  );
}
