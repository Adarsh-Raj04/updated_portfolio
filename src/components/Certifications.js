import { Award, CheckCircle2 } from 'lucide-react';

export default function Certifications() {
    const certifications = [
        {
            title: "Career Essentials in Generative AI",
            issuer: "Microsoft & LinkedIn",
            description: "Certification covering generative AI technologies, prompt engineering, AI ethics, and practical implementation strategies in modern software development.",
            skills: ["Generative AI", "Prompt Engineering", "AI Ethics", "AI Applications"],
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            title: "Azure DevOps",
            issuer: "Udemy",
            description: "Hands-on certification covering CI/CD pipeline design, release management, environment automation, and Azure DevOps best practices.",
            skills: ["CI/CD", "Release Management", "Azure Pipelines", "DevOps"],
            gradient: "from-purple-500 to-blue-500",
        },
        {
            title: "SQL (Advanced)",
            issuer: "HackerRank",
            description: "Advanced SQL certification demonstrating expertise in complex queries, performance tuning, query optimisation, and database design.",
            skills: ["SQL", "Query Optimisation", "Database Design", "Performance Tuning"],
            gradient: "from-green-500 to-emerald-500",
        },
        {
            title: "Introduction to Cybersecurity",
            issuer: "Cisco",
            description: "Foundational certification covering cybersecurity concepts, threat landscapes, network security principles, and security best practices.",
            skills: ["Cybersecurity", "Network Security", "Threat Analysis", "Security Fundamentals"],
            gradient: "from-orange-500 to-yellow-500",
        },
        {
            title: "Python Masterclass",
            issuer: "Udemy",
            description: "Comprehensive Python certification covering advanced concepts, data structures, object-oriented programming, and real-world application development.",
            skills: ["Python", "OOP", "Data Structures", "Advanced Programming"],
            gradient: "from-yellow-500 to-orange-500",
        },
        {
            title: "Web Development Bootcamp",
            issuer: "Udemy",
            description: "Full-stack web development certification covering HTML5, CSS3, JavaScript, responsive design, and modern development workflows.",
            skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
            gradient: "from-pink-500 to-rose-500",
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
                            className="gradient-border rounded-xl p-8 hover:scale-105 transition-transform group"
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
                            <div className="border-t border-gray-700 pt-4">
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}