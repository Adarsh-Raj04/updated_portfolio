import { Award, CheckCircle2, ExternalLink } from 'lucide-react';

export default function Certifications() {
    const certifications = [
        {
            title: "Build Smarter, Scalable Al Agents with UiPath",
            issuer: "GeeksforGeeks",
            description: "This certification covers the fundamentals of UiPath, a leading automation platform. It focuses on building intelligent automation solutions using UiPath Studio, Orchestrator, and AI-powered capabilities. The course emphasizes practical skills in designing, developing, and deploying scalable automation agents for various business processes.",
            skills: ["UiPath", "AI", "Automation"],
            gradient: "from-pink-500 to-rose-500",
            link: "https://media.geeksforgeeks.org/auth-certificates/1769970600/c7108bb1be9bae5f9e5679f6b2750d37.png", // TODO: add your certificate URL here
        },
        {
            title: "Career Essentials in Generative AI",
            issuer: "Microsoft & LinkedIn",
            description: "Certification covering generative AI technologies, prompt engineering, AI ethics, and practical implementation strategies in modern software development.",
            skills: ["Generative AI", "Prompt Engineering", "AI Ethics", "AI Applications"],
            gradient: "from-blue-500 to-cyan-500",
            link: "https://www.linkedin.com/learning/certificates/65d0d0029af8b823e35c45f769cea4987ed4bf3b08c03dcb524c0802c273bb5c?trk=share_certificate", // TODO: add your certificate URL here
        },
        {
            title: "Machine Learning with Python",
            issuer: "Cognitive Class",
            description: "This certification covers the fundamentals of Machine Learning with Python. It focuses on building intelligent automation solutions using UiPath Studio, Orchestrator, and AI-powered capabilities. The course emphasizes practical skills in designing, developing, and deploying scalable automation agents for various business processes.",
            skills: ["Machine Learning", "Python", "Data Science", "AI"],
            gradient: "from-purple-500 to-blue-500",
            link: "https://courses.cognitiveclass.ai/certificates/43abf0af3da74bba93beec03a13b6284", // TODO: add your certificate URL here
        },
        {
            title: "SQL (Advanced)",
            issuer: "HackerRank",
            description: "Advanced SQL certification demonstrating expertise in complex queries, performance tuning, query optimisation, and database design.",
            skills: ["SQL", "Query Optimisation", "Database Design", "Performance Tuning"],
            gradient: "from-green-500 to-emerald-500",
            link: "https://www.hackerrank.com/certificates/9d25e362dc2a", // TODO: add your certificate URL here
        },
        {
            title: "Introduction to Cybersecurity",
            issuer: "Cisco",
            description: "Foundational certification covering cybersecurity concepts, threat landscapes, network security principles, and security best practices.",
            skills: ["Cybersecurity", "Network Security", "Threat Analysis", "Security Fundamentals"],
            gradient: "from-orange-500 to-yellow-500",
            link: "https://www.credly.com/badges/b96cad5d-5a2e-4332-9536-684062708470", // TODO: add your certificate URL here
        },
        {
            title: "Python Masterclass",
            issuer: "Udemy",
            description: "Comprehensive Python certification covering advanced concepts, data structures, object-oriented programming, and real-world application development.",
            skills: ["Python", "OOP", "Data Structures", "Advanced Programming"],
            gradient: "from-yellow-500 to-orange-500",
            link: "https://www.udemy.com/certificate/UC-c96dc376-20d3-484a-8704-db7fdfde4475/", // TODO: add your certificate URL here
        },

    ];

    return (
        <section id="certifications" className="py-32 bg-gradient-to-b from-[#0f172a]/50 to-transparent">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        CERTIFICATIONS
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            className="gradient-border rounded-xl p-8 hover:scale-105 transition-transform group flex flex-col"
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-shadow`}>
                                <Award className="w-8 h-8 text-white" />
                            </div>

                            {/* Title */}
                            <h3 className="font-orbitron text-lg font-bold text-blue-300 mb-2 leading-snug">
                                {cert.title}
                            </h3>

                            {/* Issuer */}
                            <div className="font-space text-sm text-purple-400 mb-4">
                                {cert.issuer}
                            </div>

                            {/* Description */}
                            <p className="font-jetbrains text-sm text-gray-400 leading-relaxed mb-4">
                                {cert.description}
                            </p>

                            {/* Skills */}
                            <div className="border-t border-gray-700 pt-4 mb-4">
                                <div className="flex flex-wrap gap-2">
                                    {cert.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="flex items-center gap-1 font-jetbrains text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded"
                                        >
                                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Verify button — pushed to bottom */}
                            <div className="mt-auto pt-2">
                                {cert.link ? (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 font-space text-xs text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/10 px-4 py-2 rounded-lg transition-all"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        VIEW CERTIFICATE
                                    </a>
                                ) : (
                                    <span className="inline-flex items-center gap-2 font-space text-xs text-gray-600 border border-gray-700 px-4 py-2 rounded-lg cursor-not-allowed">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        VIEW CERTIFICATE
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}