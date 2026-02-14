import { MapPin, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Experience() {
    const [expandedJob, setExpandedJob] = useState(0); // First job expanded by default
    const experience = [
        {
            title: "Data & AI Engineer",
            company: "GSK (GlaxoSmithKline)",
            location: "Bengaluru, Karnataka, India",
            period: "August 2024 – Present",
            highlights: [
                "Designed and implemented semantic search and conversational AI capabilities for the Rover metadata platform using OpenAI embeddings and Azure AI Search, improving metadata discoverability and user engagement across the enterprise.",
                "Owned development and optimisation of Apache Spark-based ingestion pipelines on Databricks, achieving significant runtime reductions and enabling automated metadata cataloguing at enterprise scale.",
                "Built and maintained production-grade FastAPI microservices for metadata retrieval, data lineage views, and enterprise-wide search — with high test coverage and end-to-end robustness.",
                "Delivered end-to-end ServiceNow–Collibra integration automating governance workflows, eliminating 90% of manual effort (~200 hours/year saved) and achieving a 99.6% reduction in data sync time (30 min → 7 sec).",
                "Re-engineered Collibra GraphQL queries, reducing asset metadata retrieval time by 87.5% — from 8 hours down to 1 hour.",
                "Built SailPoint–Rover integration to streamline access governance, surfacing entitlement visibility and simplifying permission validation workflows.",
                "Led integration of Data Quality outputs into Collibra, automating registration of DQ metrics and enabling transparent governance reporting across metadata assets.",
                "Owned end-to-end CI/CD pipelines using GitHub Actions and Azure DevOps — release automation, environment management, and deployment reliability for Metadata Management and GSC DQM products.",
                "Explored NLP-driven analytics in Power BI and evaluated Databricks Genie for Natural Language Query (NLQ) feasibility at enterprise scale.",
                "Designed scalable cloud solutions using Azure Function Apps, Azure Data Factory, and Azure SQL to orchestrate automated data workflows across platforms.",
                "Mentored new team members and complementary workers on technical direction and deliverables, accelerating onboarding and team productivity."
            ]
        },
        {
            title: "Graduate Intern – (Data & DevOps)",
            company: "GSK (GlaxoSmithKline)",
            location: "Bengaluru, Karnataka, India",
            period: "January 2024 – August 2024",
            highlights: [
                "Automated reporting workflows using Azure DevOps, Power BI, and JIRA, reducing manual overhead for the SCDT team.",
                "Gained hands-on project-based experience across DevOps pipelines and data analytics, building foundational practices carried into the full-time role.",
                "Contributed to CI/CD setup and environment automation, supporting smoother release cycles across the team."
            ]
        }
    ];

    return (
        <section id="experience" className="py-32 bg-gradient-to-b from-transparent to-[#0f172a]/50 relative">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        EXPERIENCE
                    </span>
                </h2>

                <div className="space-y-12 pl-8 timeline-line">
                    {experience.map((job, index) => (
                        <div key={index} className="relative">
                            {/* Timeline dot — blue for current, purple for previous */}
                            <div className={`absolute -left-8 top-2 w-4 h-4 rounded-full ring-4 transition-all duration-300 cursor-pointer ${
                                index === 0
                                    ? 'bg-blue-500 ring-blue-500/20'
                                    : 'bg-purple-500 ring-purple-500/20'
                            } ${expandedJob === index ? 'scale-125' : 'scale-100'}`} 
                            onClick={() => setExpandedJob(expandedJob === index ? -1 : index)}
                            />

                            <div className="gradient-border rounded-xl p-8 ml-4 transition-all duration-300 hover:scale-[1.02]">
                                <div 
                                    className="flex items-start justify-between mb-6 flex-wrap gap-4 cursor-pointer"
                                    onClick={() => setExpandedJob(expandedJob === index ? -1 : index)}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-orbitron text-xl font-bold text-blue-300">
                                                {job.title}
                                            </h3>
                                            <ChevronRight 
                                                className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
                                                    expandedJob === index ? 'rotate-90' : ''
                                                }`}
                                            />
                                        </div>
                                        <div className="font-space text-lg text-purple-300 mt-2">
                                            {job.company}
                                        </div>
                                        <div className="font-jetbrains text-sm text-gray-400 mt-1 flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            {job.location}
                                        </div>
                                    </div>
                                    <div className="font-space text-sm text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/30 self-start">
                                        {job.period}
                                    </div>
                                </div>

                                {/* Expandable highlights */}
                                <div 
                                    className={`overflow-hidden transition-all duration-500 ${
                                        expandedJob === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <ul className="space-y-3 font-jetbrains text-gray-300 text-sm leading-relaxed">
                                        {job.highlights.map((highlight, i) => (
                                            <li key={i} className="flex items-start gap-3 fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                                                <span className="text-blue-400 mt-0.5 shrink-0">▹</span>
                                                <span dangerouslySetInnerHTML={{
                                                    __html: highlight
                                                        .replace(/90%/g, '<strong class="text-white">90%</strong>')
                                                        .replace(/99\.6%/g, '<strong class="text-white">99.6%</strong>')
                                                        .replace(/87\.5%/g, '<strong class="text-white">87.5%</strong>')
                                                        .replace(/~200 hours\/year saved/g, '<strong class="text-white">~200 hours/year saved</strong>')
                                                        .replace(/30 min → 7 sec/g, '<strong class="text-white">30 min → 7 sec</strong>')
                                                        .replace(/8 hours down to 1 hour/g, '<strong class="text-white">8 hours down to 1 hour</strong>')
                                                }} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Show preview when collapsed */}
                                {expandedJob !== index && (
                                    <p className="font-jetbrains text-sm text-gray-400 mt-4">
                                        Click to expand {job.highlights.length} key achievements...
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <a 
                href="#skills"
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Scroll to Skills section"
            >
                <ChevronDown className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
            </a>
        </section>
    );
}