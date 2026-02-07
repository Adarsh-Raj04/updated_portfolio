import { Terminal, Code, Rocket } from 'lucide-react';

export default function Projects() {
    const projects = [
        {
            title: "Intelligent Laptop Trading Application with Price Prediction",
            tech: "Python, ML, Web Development",
            description: "Developed end-to-end intelligent trading platform featuring machine learning-based price prediction models for laptop pricing optimization. Implemented advanced regression algorithms to analyze market trends and predict optimal pricing strategies.",
            icon: <Terminal className="w-6 h-6" />,
            tags: ["Machine Learning", "Python", "Data Analysis", "Web Dev"]
        },
        {
            title: "CureConnect: Streamlined Health Integration",
            tech: "Full-Stack Development, Healthcare IT",
            description: "Built comprehensive healthcare integration platform streamlining patient data management and medical record accessibility. Implemented secure authentication, real-time data synchronization, and HIPAA-compliant data handling.",
            icon: <Code className="w-6 h-6" />,
            tags: ["Full-Stack", "Healthcare", "React", "Node.js"]
        },
        {
            title: "Web Application Deployment Tutorial",
            tech: "HTML, CSS, PHP, XAMPP",
            description: "Created widely-viewed technical tutorial demonstrating full-stack web application development and local hosting, achieving 50K+ views. Comprehensive guide covering setup, development, and deployment best practices.",
            icon: <Rocket className="w-6 h-6" />,
            tags: ["PHP", "XAMPP", "Tutorial", "Web Development"],
            stats: "50K+ Views"
        }
    ];

    return (
        <section id="projects" className="py-32">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">KEY PROJECTS</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="gradient-border rounded-xl p-8 hover:scale-105 transition-transform group">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                                {project.icon}
                            </div>

                            <h3 className="font-orbitron text-xl font-bold text-blue-300 mb-3">{project.title}</h3>

                            <div className="font-space text-xs text-purple-400 mb-4">{project.tech}</div>

                            <p className="font-jetbrains text-sm text-gray-400 leading-relaxed mb-4">{project.description}</p>

                            {project.stats && (
                                <div className="mb-4 inline-block">
                                    <span className="font-space text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                                        {project.stats}
                                    </span>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="font-jetbrains text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded">
                                        {tag}
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