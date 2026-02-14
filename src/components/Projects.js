import { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Rocket, Search, GitMerge, Database, X, ChevronDown } from 'lucide-react';
import useCardTilt from '../hooks/useCardTilt';

export default function Projects() {
    const [isVisible, setIsVisible] = useState(false);
    const [expandedCard, setExpandedCard] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'enterprise', 'university'
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
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

    // Close expanded card on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setExpandedCard(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const enterpriseProjects = [
        {
            title: "Rover – Semantic Search & Conversational AI Platform",
            tech: "OpenAI · Azure AI Search · FastAPI · Python",
            description: "Designed and implemented enterprise-scale semantic search and conversational query capabilities for the Rover metadata platform at GSK. Users can now discover and query metadata assets using natural language, powered by OpenAI embeddings and Azure AI Search.",
            icon: <Search className="w-6 h-6" />,
            tags: ["OpenAI", "Azure AI Search", "FastAPI", "Semantic Search", "Python"],
        },
        {
            title: "ServiceNow–Collibra Governance Automation",
            tech: "ServiceNow · Collibra · Azure Function Apps · Python",
            description: "Delivered end-to-end integration between ServiceNow and Collibra that fully automated governance workflows. Eliminated 90% of manual effort (~200 hours/year saved) and reduced data sync time by 99.6% — from 30 minutes down to 7 seconds.",
            icon: <GitMerge className="w-6 h-6" />,
            tags: ["ServiceNow", "Collibra", "Azure Function Apps", "GraphQL", "Python"],
            stats: ["200 hrs/yr saved", "99.6% faster sync"],
        },
        {
            title: "Spark Metadata Ingestion & Cataloguing Pipelines",
            tech: "Apache Spark · Databricks · Azure Data Factory · Delta Lake",
            description: "Owned development and optimisation of Apache Spark-based ingestion pipelines on Databricks for enterprise metadata cataloguing. Achieved significant runtime reductions, automated workflows, and integrated Data Quality outputs into Collibra for transparent DQ governance reporting.",
            icon: <Database className="w-6 h-6" />,
            tags: ["Apache Spark", "Databricks", "Delta Lake", "ADF", "Collibra DQ"],
        },
    ];

    const universityProjects = [
        {
            title: "SynthGad – Intelligent Laptop Trading & Price Predictor",
            tech: "Python · MERN · Gradient Boosting · Random Forest",
            description: "Full-stack laptop trading platform with an ML-powered price prediction engine combining Gradient Boosting and Random Forest, providing real-time valuations based on device specifications.",
            icon: <Terminal className="w-6 h-6" />,
            tags: ["Machine Learning", "Python", "MERN", "Gradient Boosting"],
        },
        {
            title: "CureConnect – Streamlined Health Integration",
            tech: "SVM · Node.js · React · MERN",
            description: "Real-time disease prediction system using an SVM model with instant symptom-based diagnosis, specialist doctor recommendations, and a dynamic doctor-matching algorithm via a Node.js backend.",
            icon: <Code className="w-6 h-6" />,
            tags: ["SVM", "React", "Node.js", "Full-Stack", "Healthcare"],
        },
        {
            title: "Web Application Deployment Tutorial",
            tech: "HTML · CSS · PHP · XAMPP",
            description: "Widely-viewed technical tutorial on full-stack web application development and local hosting — covering setup, development workflow, and deployment best practices end to end.",
            icon: <Rocket className="w-6 h-6" />,
            tags: ["PHP", "XAMPP", "HTML", "CSS", "Tutorial"],
            stats: "50K+ Views",
        },
    ];

    const ProjectCard = ({ project, accent, index, cardId }) => {
        const isExpanded = expandedCard === cardId;
        const tiltRef = useCardTilt(10);

        return (
            <>
                <div
                    ref={tiltRef}
                    className={`gradient-border rounded-xl p-8 relative cursor-pointer transition-all duration-200 ${
                        isExpanded ? 'invisible' : ''
                    }`}
                    style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        opacity: isVisible && !isExpanded ? 1 : 0,
                        transformStyle: 'preserve-3d'
                    }}
                    onClick={() => setExpandedCard(cardId)}
                >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-xl"
                        style={{
                            background: accent === 'cyan'
                                ? 'radial-gradient(circle at center, rgba(0, 255, 255, 0.15), transparent 70%)'
                                : 'radial-gradient(circle at center, rgba(168, 85, 247, 0.15), transparent 70%)'
                        }} />

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative z-10`}
                        style={{
                            background: accent === 'cyan'
                                ? 'linear-gradient(135deg, #00ffff, #0891b2)'
                                : 'linear-gradient(135deg, #a855f7, #ec4899)',
                            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                        }}>
                        {project.icon}
                    </div>

                    <h3 className="font-orbitron text-lg font-bold mb-3 leading-snug relative z-10"
                        style={{ color: 'var(--text-secondary)' }}>
                        {project.title}
                    </h3>

                    <div className="font-space text-xs mb-4 relative z-10"
                        style={{ color: accent === 'cyan' ? 'var(--accent-cyan)' : 'var(--accent-magenta)' }}>
                        {project.tech}
                    </div>

                    <p className="font-jetbrains text-sm leading-relaxed mb-4 relative z-10 line-clamp-3"
                        style={{ color: 'var(--text-tertiary)' }}>
                        {project.description}
                    </p>

                    {project.stats && (
                        <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                            {(Array.isArray(project.stats) ? project.stats : [project.stats]).map((stat, i) => (
                                <span key={i} className="font-space text-xs px-3 py-1 rounded-full border"
                                    style={{
                                        backgroundColor: accent === 'cyan' ? 'rgba(0, 255, 255, 0.1)' : 'rgba(168, 85, 247, 0.1)',
                                        color: accent === 'cyan' ? 'var(--accent-cyan)' : 'var(--accent-magenta)',
                                        borderColor: accent === 'cyan' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(168, 85, 247, 0.3)'
                                    }}>
                                    {stat}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 relative z-10">
                        {project.tags.slice(0, 4).map((tag, i) => (
                            <span key={i} className="tech-tag font-jetbrains text-xs px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 4 && (
                            <span className="tech-tag font-jetbrains text-xs px-2 py-1 rounded">
                                +{project.tags.length - 4}
                            </span>
                        )}
                    </div>
                </div>

                {/* Expanded Card Modal */}
                {isExpanded && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            backdropFilter: 'blur(10px)'
                        }}
                        onClick={() => setExpandedCard(null)}
                    >
                        <div
                            className="gradient-border rounded-2xl p-10 max-w-3xl w-full relative"
                            style={{
                                backgroundColor: 'var(--bg-tertiary)',
                                boxShadow: accent === 'cyan'
                                    ? '0 0 60px rgba(0, 255, 255, 0.4)'
                                    : '0 0 60px rgba(168, 85, 247, 0.4)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setExpandedCard(null)}
                                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Icon - Larger */}
                            <div className={`w-20 h-20 rounded-xl flex items-center justify-center mb-6`}
                                style={{
                                    background: accent === 'cyan'
                                        ? 'linear-gradient(135deg, #00ffff, #0891b2)'
                                        : 'linear-gradient(135deg, #a855f7, #ec4899)',
                                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
                                }}>
                                <div style={{ transform: 'scale(1.5)' }}>
                                    {project.icon}
                                </div>
                            </div>

                            {/* Title - Larger */}
                            <h3 className="font-orbitron text-3xl font-bold mb-4 leading-tight"
                                style={{ color: 'var(--text-secondary)' }}>
                                {project.title}
                            </h3>

                            {/* Tech Stack */}
                            <div className="font-space text-base mb-6"
                                style={{ color: accent === 'cyan' ? 'var(--accent-cyan)' : 'var(--accent-magenta)' }}>
                                {project.tech}
                            </div>

                            {/* Full Description */}
                            <p className="font-jetbrains text-base leading-relaxed mb-6"
                                style={{ color: 'var(--text-primary)' }}>
                                {project.description}
                            </p>

                            {/* Stats */}
                            {project.stats && (
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {(Array.isArray(project.stats) ? project.stats : [project.stats]).map((stat, i) => (
                                        <span key={i} className="font-space text-sm px-4 py-2 rounded-full border"
                                            style={{
                                                backgroundColor: accent === 'cyan' ? 'rgba(0, 255, 255, 0.2)' : 'rgba(168, 85, 247, 0.2)',
                                                color: accent === 'cyan' ? 'var(--accent-cyan)' : 'var(--accent-magenta)',
                                                borderColor: accent === 'cyan' ? 'rgba(0, 255, 255, 0.5)' : 'rgba(168, 85, 247, 0.5)'
                                            }}>
                                            {stat}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* All Tags */}
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="tech-tag font-jetbrains text-sm px-3 py-2 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <section ref={sectionRef} id="projects" className="py-32 relative overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 data-grid opacity-20" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <h2 className="font-orbitron text-5xl font-bold mb-4 text-center">
                    <span className="holographic">
                        FEATURED PROJECTS
                    </span>
                </h2>

                <p className="text-center mb-8 font-space" style={{ color: 'var(--text-tertiary)' }}>
                    Enterprise solutions and innovative applications
                </p>

                {/* Filter Buttons */}
                <div className="flex justify-center gap-4 mb-16">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-3 rounded-lg font-space text-sm transition-all duration-300 ${
                            filter === 'all' 
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white scale-105' 
                                : 'border border-gray-600 text-gray-400 hover:border-cyan-400 hover:text-cyan-400'
                        }`}
                    >
                        ALL PROJECTS
                    </button>
                    <button
                        onClick={() => setFilter('enterprise')}
                        className={`px-6 py-3 rounded-lg font-space text-sm transition-all duration-300 ${
                            filter === 'enterprise' 
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white scale-105' 
                                : 'border border-gray-600 text-gray-400 hover:border-cyan-400 hover:text-cyan-400'
                        }`}
                    >
                        ENTERPRISE
                    </button>
                    <button
                        onClick={() => setFilter('university')}
                        className={`px-6 py-3 rounded-lg font-space text-sm transition-all duration-300 ${
                            filter === 'university' 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105' 
                                : 'border border-gray-600 text-gray-400 hover:border-purple-400 hover:text-purple-400'
                        }`}
                    >
                        UNIVERSITY
                    </button>
                </div>

                {/* Enterprise Projects */}
                {(filter === 'all' || filter === 'enterprise') && (
                    <>
                        <h3 className="font-orbitron text-2xl font-bold mb-8" style={{ color: 'var(--accent-cyan)' }}>
                            Enterprise Projects
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {enterpriseProjects.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    project={project}
                                    accent="cyan"
                                    index={index}
                                    cardId={`enterprise-${index}`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* University Projects */}
                {(filter === 'all' || filter === 'university') && (
                    <>
                        <h3 className="font-orbitron text-2xl font-bold mb-8" style={{ color: 'var(--accent-magenta)' }}>
                            University Projects
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {universityProjects.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    project={project}
                                    accent="magenta"
                                    index={index}
                                    cardId={`university-${index}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Scroll Indicator */}
            <a 
                href="#achievements"
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Scroll to Achievements section"
            >
                <ChevronDown className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
            </a>
        </section>
    );
}