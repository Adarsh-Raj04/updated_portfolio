import { Code } from 'lucide-react';

export default function Skills() {
    const skills = {
        "Cloud & Big Data": ["Azure Databricks", "Azure Data Factory (ADF)", "Azure Synapse Analytics", "Apache Hive", "PySpark", "Hadoop"],
        "Programming": ["Python", "SQL (Advanced)", "JavaScript", "PHP", "HTML5", "CSS3"],
        "Databases": ["SQL Server", "MySQL", "PostgreSQL", "NoSQL"],
        "Data Engineering": ["ETL/ELT Pipelines", "Data Warehousing", "Data Modeling", "Data Quality Management", "Workflow Automation"],
        "AI/ML": ["Machine Learning Pipelines", "Predictive Analytics", "Model Deployment", "Feature Engineering"],
        "Web Development": ["React.js", "Next.js", "Node.js", "RESTful APIs", "Responsive Design", "Full-Stack Development"],
        "Tools & Platforms": ["Git", "GitHub", "Visual Studio Code", "XAMPP", "Docker"]
    };

    return (
        <section id="skills" className="py-32 bg-gradient-to-b from-[#0f172a]/50 to-transparent">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TECHNICAL SKILLS</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(skills).map(([category, items], index) => (
                        <div key={index} className="skill-category gradient-border rounded-xl p-8">
                            <h3 className="font-orbitron text-xl font-bold text-blue-300 mb-6 flex items-center gap-3">
                                <Code className="w-6 h-6" />
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {items.map((skill, i) => (
                                    <span key={i} className="tech-tag px-4 py-2 rounded-lg font-jetbrains text-sm">
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