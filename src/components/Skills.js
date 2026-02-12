import { Code, Cloud, Database, Brain, Wrench, Globe, Layers, Link } from 'lucide-react';

export default function Skills() {
    const skills = [
        {
            category: "AI & Search",
            icon: Brain,
            color: "text-pink-400",
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
            color: "text-blue-400",
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
            color: "text-cyan-400",
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
            color: "text-green-400",
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
            items: [
                "React.js",
                "AI-Assisted Development"
            ]
        },
        {
            category: "Tools & Platforms",
            icon: Wrench,
            color: "text-gray-400",
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
        <section id="skills" className="py-32 bg-gradient-to-b from-[#0f172a]/50 to-transparent">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        TECHNICAL SKILLS
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map(({ category, icon: Icon, color, items }, index) => (
                        <div key={index} className="skill-category gradient-border rounded-xl p-8">
                            <h3 className={`font-orbitron text-xl font-bold mb-6 flex items-center gap-3 ${color}`}>
                                <Icon className="w-6 h-6 shrink-0" />
                                {category}
                            </h3>
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
        </section>
    );
}