import { useState, useEffect, useRef } from 'react';
import { Code, Cloud, Database, Brain, Wrench, Globe, Layers, Link, ChevronDown } from 'lucide-react';

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
            { threshold: 0.2 }
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

    const skills = [
        {
            category: "AI & Search",
            icon: Brain,
            color: "text-pink-400",
            level: 90,
            items: [
                "OpenAI (Embeddings, Chat)",
                "Azure AI Search",
                "Semantic Search",
                "Databricks Genie (NLQ)",
                "Power BI NLP",
                "Machine Learning Pipelines",
                "Predictive Analytics",
                "Model Deployment",
                "Feature Engineering",
                "Azure Machine Learning",
            ]
        },
        {
            category: "Data Engineering",
            icon: Database,
            color: "text-cyan-400",
            level: 95,
            items: [
                "PySpark",
                "Azure Databricks",
                "Azure Data Factory (ADF)",
                "Delta Lake",
                "ETL/ELT Pipelines",
                "Data Warehousing",
                "Data Modeling",
                "Data Quality Management",
                "Apache Hive",
            ]
        },
        {
            category: "Backend & APIs",
            icon: Code,
            color: "text-green-400",
            level: 85,
            items: [
                "Python",
                "FastAPI",
                "GraphQL",
                "RESTful APIs",
                "Java",
                "SQL",
            ]
        },
        {
            category: "DevOps & Cloud",
            icon: Cloud,
            color: "text-purple-400",
            level: 88,
            items: [
                "Azure DevOps",
                "GitHub Actions",
                "CI/CD Pipelines",
                "Azure Function Apps",
                "Azure SQL",
                "Azure Machine Learning",
                "Docker",
                "Release Automation",
                "Environment Management",
            ]
        },
        {
            category: "Enterprise Integrations",
            icon: Link,
            color: "text-orange-400",
            level: 80,
            items: [
                "Collibra",
                "ServiceNow",
                "SailPoint",
                "Metadata Management",
                "Data and Access Governance",
            ]
        },
        {
            category: "Databases",
            icon: Layers,
            color: "text-blue-400",
            level: 92,
            items: [
                "Azure SQL",
                "MySQL",
                "SQL Server",
                "PostgreSQL",
            ]
        },
        {
            category: "Web Development",
            icon: Globe,
            color: "text-yellow-400",
            level: 75,
            items: [
                "React.js",
                "AI-Assisted Development"
            ]
        },
        {
            category: "Tools & Platforms",
            icon: Wrench,
            color: "text-gray-400",
            level: 85,
            items: [
                "Power BI",
                "JIRA",
                "SharePoint",
                "Git",
                "GitHub",
                "Visual Studio Code",
                "Docker",
                "Claude"
            ]
        },
    ];

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="py-32 relative overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 data-grid opacity-20" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <h2 className="font-orbitron text-5xl font-bold mb-4 text-center">
                    <span className="holographic">
                        TECHNICAL SKILLS
                    </span>
                </h2>

                <p className="text-center mb-16 font-space" style={{ color: 'var(--text-tertiary)' }}>
                    // Level up your game with these tech stacks
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map(({ category, icon: Icon, color, level, items }, index) => (
                        <div
                            key={index}
                            className={`gradient-border rounded-xl p-8 transition-all duration-500 ${isVisible ? `flip-in-y stagger-${(index % 8) + 1}` : 'opacity-0'
                                }`}
                            style={{
                                backgroundColor: 'var(--bg-tertiary)',
                                opacity: isVisible ? 1 : 0
                            }}>

                            {/* Category Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h3 className={`font-orbitron text-xl font-bold flex items-center gap-3 ${color}`}>
                                    <Icon className="w-6 h-6 shrink-0 zoom-pulse" />
                                    {category}
                                </h3>
                                <span className="font-orbitron text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    LVL {level}
                                </span>
                            </div>

                            {/* XP Bar */}
                            <div className="relative h-3 mb-6 rounded-full overflow-hidden"
                                style={{ backgroundColor: 'rgba(100, 116, 139, 0.2)' }}>
                                <div
                                    className="h-full rounded-full transition-all duration-1000 ease-out breathing-glow progress-shimmer"
                                    style={{
                                        width: isVisible ? `${level}%` : '0%',
                                        background: color === 'text-pink-400' ? 'linear-gradient(90deg, #f472b6, #ec4899)' :
                                                   color === 'text-cyan-400' ? 'linear-gradient(90deg, #22d3ee, #06b6d4)' :
                                                   color === 'text-green-400' ? 'linear-gradient(90deg, #4ade80, #22c55e)' :
                                                   color === 'text-purple-400' ? 'linear-gradient(90deg, #c084fc, #a855f7)' :
                                                   color === 'text-orange-400' ? 'linear-gradient(90deg, #fb923c, #f97316)' :
                                                   color === 'text-blue-400' ? 'linear-gradient(90deg, #60a5fa, #3b82f6)' :
                                                   color === 'text-yellow-400' ? 'linear-gradient(90deg, #facc15, #eab308)' :
                                                   'linear-gradient(90deg, #94a3b8, #64748b)',
                                        boxShadow: isVisible ? (
                                            color === 'text-pink-400' ? '0 0 20px rgba(244, 114, 182, 0.6), 0 0 40px rgba(236, 72, 153, 0.4)' :
                                            color === 'text-cyan-400' ? '0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(6, 182, 212, 0.4)' :
                                            color === 'text-green-400' ? '0 0 20px rgba(74, 222, 128, 0.6), 0 0 40px rgba(34, 197, 94, 0.4)' :
                                            color === 'text-purple-400' ? '0 0 20px rgba(192, 132, 252, 0.6), 0 0 40px rgba(168, 85, 247, 0.4)' :
                                            color === 'text-orange-400' ? '0 0 20px rgba(251, 146, 60, 0.6), 0 0 40px rgba(249, 115, 22, 0.4)' :
                                            color === 'text-blue-400' ? '0 0 20px rgba(96, 165, 250, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)' :
                                            color === 'text-yellow-400' ? '0 0 20px rgba(250, 204, 21, 0.6), 0 0 40px rgba(234, 179, 8, 0.4)' :
                                            '0 0 20px rgba(148, 163, 184, 0.6), 0 0 40px rgba(100, 116, 139, 0.4)'
                                        ) : 'none',
                                        transitionDelay: `${index * 0.1}s`
                                    }}
                                />
                            </div>

                            {/* Skills Tags */}
                            <div className="flex flex-wrap gap-3">
                                {items.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="tech-tag px-4 py-2 rounded-lg font-jetbrains text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <a 
                href="#projects"
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Scroll to Projects section"
            >
                <ChevronDown className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
            </a>
        </section>
    );
}