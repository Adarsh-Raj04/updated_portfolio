import { Award, CheckCircle2 } from 'lucide-react';

export default function Certifications() {
    const certifications = [
        {
            title: "Python Programming",
            issuer: "Professional Certification",
            description: "Comprehensive Python programming certification covering advanced concepts, data structures, and best practices.",
            skills: ["Python", "Data Structures", "OOP", "Advanced Programming"]
        },
        {
            title: "SQL (Advanced)",
            issuer: "Professional Certification",
            description: "Advanced SQL certification demonstrating expertise in complex queries, optimization, and database management.",
            skills: ["SQL", "Query Optimization", "Database Design", "Performance Tuning"]
        },
        {
            title: "Career Essentials in Generative AI",
            issuer: "Microsoft and LinkedIn",
            description: "Certification focusing on generative AI technologies, applications, and implementation strategies in modern software development.",
            skills: ["Generative AI", "AI Ethics", "Prompt Engineering", "AI Applications"]
        }
    ];

    return (
        <section id="certifications" className="py-32 bg-gradient-to-b from-[#0f172a]/50 to-transparent">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CERTIFICATIONS</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {certifications.map((cert, index) => (
                        <div key={index} className="gradient-border rounded-xl p-8 hover:scale-105 transition-transform">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6">
                                <Award className="w-8 h-8 text-white" />
                            </div>

                            <h3 className="font-orbitron text-xl font-bold text-blue-300 mb-2">{cert.title}</h3>

                            <div className="font-space text-sm text-purple-400 mb-4">{cert.issuer}</div>

                            <p className="font-jetbrains text-sm text-gray-400 leading-relaxed mb-4">{cert.description}</p>

                            <div className="border-t border-gray-700 pt-4">
                                <div className="flex flex-wrap gap-2">
                                    {cert.skills.map((skill, i) => (
                                        <span key={i} className="flex items-center gap-1 font-jetbrains text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded">
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