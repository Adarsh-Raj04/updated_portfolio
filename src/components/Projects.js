import { Terminal, Code, Rocket, Search, GitMerge, Database } from 'lucide-react';

export default function Projects() {
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

    const ProjectCard = ({ project, accent }) => (
        <div className={`gradient-border rounded-xl p-8 hover:scale-105 transition-transform group ring-1 ${accent === 'blue' ? 'ring-blue-500/20' : 'ring-purple-500/20'
            }`}>
            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow ${accent === 'blue'
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:shadow-blue-500/50'
                : 'bg-gradient-to-br from-purple-500 to-pink-500 group-hover:shadow-purple-500/50'
                }`}>
                {project.icon}
            </div>

            <h3 className="font-orbitron text-lg font-bold text-blue-300 mb-3 leading-snug">
                {project.title}
            </h3>

            <div className={`font-space text-xs mb-4 ${accent === 'blue' ? 'text-cyan-400' : 'text-purple-400'
                }`}>
                {project.tech}
            </div>

            <p className="font-jetbrains text-sm text-gray-400 leading-relaxed mb-4">
                {project.description}
            </p>

            {project.stats && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {(Array.isArray(project.stats) ? project.stats : [project.stats]).map((stat, i) => (
                        <span key={i} className={`font-space text-xs px-3 py-1 rounded-full border ${accent === 'blue'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                            }`}>
                            {stat}
                        </span>
                    ))}
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
    );

    return (
        <section id="projects" className="py-32">
            <div className="max-w-6xl mx-auto px-6">

                {/* ── Main heading ─────────────────────────────────────────── */}
                <h2 className="font-orbitron text-5xl font-bold mb-20 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        PROJECTS
                    </span>
                </h2>

                {/* ── Enterprise Projects ───────────────────────────────────── */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-10">
                        <h3 className="font-orbitron text-2xl font-bold text-blue-400">
                            Enterprise Projects
                        </h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
                        <span className="font-space text-xs text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full">
                            GSK
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enterpriseProjects.map((project, index) => (
                            <ProjectCard key={index} project={project} accent="blue" />
                        ))}
                    </div>
                </div>

                {/* ── University Projects ───────────────────────────────────── */}
                <div>
                    <div className="flex items-center gap-4 mb-10">
                        <h3 className="font-orbitron text-2xl font-bold text-purple-400">
                            University Projects
                        </h3>
                        <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                        <span className="font-space text-xs text-purple-400 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full">
                            M.S. Ramaiah
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {universityProjects.map((project, index) => (
                            <ProjectCard key={index} project={project} accent="purple" />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}




























// ------------------------ Old Codes --------------------

// import { Terminal, Code, Rocket, Search, GitMerge, Database } from 'lucide-react';

// export default function Projects() {
//     const projects = [
//         // ── Enterprise Projects ──────────────────────────────────────────────
//         {
//             title: "Rover – Semantic Search & Conversational AI Platform",
//             tech: "OpenAI · Azure AI Search · FastAPI · Python",
//             description: "Designed and implemented enterprise-scale semantic search and conversational query capabilities for the Rover metadata platform at GSK. Users can now discover and query metadata assets using natural language, powered by OpenAI embeddings and Azure AI Search.",
//             icon: <Search className="w-6 h-6" />,
//             tags: ["OpenAI", "Azure AI Search", "FastAPI", "Semantic Search", "Python"],
//             badge: { label: "Enterprise · GSK", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
//             highlight: true,
//         },
//         {
//             title: "ServiceNow–Collibra Governance Automation",
//             tech: "ServiceNow · Collibra · Azure Function Apps · Python",
//             description: "Delivered end-to-end integration between ServiceNow and Collibra that fully automated governance workflows. Eliminated 90% of manual effort (~200 hours/year saved) and reduced data sync time by 99.6% — from 30 minutes down to 7 seconds.",
//             icon: <GitMerge className="w-6 h-6" />,
//             tags: ["ServiceNow", "Collibra", "Azure Function Apps", "GraphQL", "Python"],
//             badge: { label: "Enterprise · GSK", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
//             stats: "200 hrs/yr saved · 99.6% faster sync",
//             highlight: true,
//         },
//         {
//             title: "Spark Metadata Ingestion & Cataloguing Pipelines",
//             tech: "Apache Spark · Databricks · Azure Data Factory · Delta Lake",
//             description: "Owned development and optimisation of Apache Spark-based ingestion pipelines on Databricks for enterprise metadata cataloguing. Achieved significant runtime reductions, enabled workflow automation, and integrated Data Quality outputs into Collibra for transparent DQ governance reporting.",
//             icon: <Database className="w-6 h-6" />,
//             tags: ["Apache Spark", "Databricks", "Delta Lake", "ADF", "Collibra DQ"],
//             badge: { label: "Enterprise · GSK", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
//             highlight: true,
//         },

//         // ── University Projects ──────────────────────────────────────────────
//         {
//             title: "SynthGad – Intelligent Laptop Trading & Price Predictor",
//             tech: "Python · MERN · Gradient Boosting · Random Forest",
//             description: "Full-stack laptop trading platform with an ML-powered price prediction engine combining Gradient Boosting and Random Forest, providing real-time valuations based on device specifications.",
//             icon: <Terminal className="w-6 h-6" />,
//             tags: ["Machine Learning", "Python", "MERN", "Gradient Boosting"],
//             badge: { label: "University Project", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
//         },
//         {
//             title: "CureConnect – Streamlined Health Integration",
//             tech: "SVM · Node.js · React · MERN",
//             description: "Real-time disease prediction system using an SVM model with instant symptom-based diagnosis, specialist doctor recommendations, and a dynamic doctor-matching algorithm via a Node.js backend.",
//             icon: <Code className="w-6 h-6" />,
//             tags: ["SVM", "React", "Node.js", "Full-Stack", "Healthcare"],
//             badge: { label: "University Project", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
//         },
//         {
//             title: "Web Application Deployment Tutorial",
//             tech: "HTML · CSS · PHP · XAMPP",
//             description: "Widely-viewed technical tutorial on full-stack web application development and local hosting — covering setup, development workflow, and deployment best practices end to end.",
//             icon: <Rocket className="w-6 h-6" />,
//             tags: ["PHP", "XAMPP", "HTML", "CSS", "Tutorial"],
//             badge: { label: "University Project", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
//             stats: "50K+ Views",
//         },
//     ];

//     return (
//         <section id="projects" className="py-32">
//             <div className="max-w-6xl mx-auto px-6">
//                 <h2 className="font-orbitron text-5xl font-bold mb-4 text-center">
//                     <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                         KEY PROJECTS
//                     </span>
//                 </h2>

//                 {/* Legend */}
//                 <div className="flex justify-center gap-6 mb-16 font-space text-xs">
//                     <span className="flex items-center gap-2 text-blue-400">
//                         <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
//                         Enterprise
//                     </span>
//                     <span className="flex items-center gap-2 text-purple-400">
//                         <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
//                         University
//                     </span>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {projects.map((project, index) => (
//                         <div
//                             key={index}
//                             className={`gradient-border rounded-xl p-8 hover:scale-105 transition-transform group relative ${project.highlight
//                                     ? 'ring-1 ring-blue-500/30'
//                                     : ''
//                                 }`}
//                         >
//                             {/* Category badge */}
//                             <div className="mb-4">
//                                 <span className={`font-space text-xs px-3 py-1 rounded-full border ${project.badge.color}`}>
//                                     {project.badge.label}
//                                 </span>
//                             </div>

//                             {/* Icon */}
//                             <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow ${project.highlight
//                                     ? 'bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:shadow-blue-500/50'
//                                     : 'bg-gradient-to-br from-purple-500 to-pink-500 group-hover:shadow-purple-500/50'
//                                 }`}>
//                                 {project.icon}
//                             </div>

//                             <h3 className="font-orbitron text-lg font-bold text-blue-300 mb-3 leading-snug">
//                                 {project.title}
//                             </h3>

//                             <div className="font-space text-xs text-purple-400 mb-4">
//                                 {project.tech}
//                             </div>

//                             <p className="font-jetbrains text-sm text-gray-400 leading-relaxed mb-4">
//                                 {project.description}
//                             </p>

//                             {/* Stats badge */}
//                             {project.stats && (
//                                 <div className="mb-4">
//                                     <span className="font-space text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
//                                         {project.stats}
//                                     </span>
//                                 </div>
//                             )}

//                             {/* Tags */}
//                             <div className="flex flex-wrap gap-2">
//                                 {project.tags.map((tag, i) => (
//                                     <span
//                                         key={i}
//                                         className="font-jetbrains text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded"
//                                     >
//                                         {tag}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }