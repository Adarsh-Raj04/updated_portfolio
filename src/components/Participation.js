import { Trophy, Calendar, Users, Award, Code, ExternalLink } from 'lucide-react';

export default function Participation() {
    const participations = [
        {
            title: "DIGITAL & TECH GLOBAL HACKATHON",
            organizer: "GSK",
            date: "June 2025",
            achievement: "Finalist",
            description: "Developed an AI-powered solution for real-time file data detection, classification and retension and strategy.",
            technologies: ["Python", "OpenAI", "React", "FastAPI", "Azure", "Sharepoint"],
            teamSize: 4,
            icon: <Trophy className="w-8 h-8" />,
            color: "from-yellow-500 to-orange-500",
            achievementColor: "text-yellow-400",
            link: "/hackathon_dnt.jpeg"
        },
        {
            title: "Namma Yatri Open Mobility Challenge",
            organizer: "Unstop",
            date: "March 2023",
            achievement: "Participant",
            description: "Participated in an open initiative to build innovative solutions for mobility issues. Proposed solutions across 3 tracks: Future of Mobility, Driver Enablement, and Namma Yatri platform, focusing on improving transportation efficiency, affordability, and sustainability.",
            technologies: ["Python", "Data Analysis", "Problem Solving", "Innovation"],
            teamSize: 1,
            icon: <Trophy className="w-8 h-8" />,
            color: "from-green-500 to-emerald-500",
            achievementColor: "text-emerald-400",
            link: "https://unstop.com/certificate-preview/f71ef2f1-2682-4ed5-a257-5e42c5e88cb2"
        },
        {
            title: "IBM Hack Challenge 2022",
            organizer: "IBM",
            date: "August 2022",
            achievement: "Participant",
            description: "Participated in IBM Hack Challenge 2022, a hackathon organized by IBM. Explored various IBM technologies and tools, and learned about cloud computing, artificial intelligence, and data analytics.",
            technologies: ["IBM Cloud", "AI", "Data Analytics"],
            teamSize: 3,
            icon: <Award className="w-8 h-8" />,
            color: "from-blue-500 to-cyan-500",
            achievementColor: "text-cyan-400",
            link: "https://smartinternz.com/challenges/certificates_issue/52/b2eeb7362ef83deff5c7813a67e14f0a"
        },
    ];

    return (
        <section id="participation" className="py-32 bg-gradient-to-b from-[#0f172a]/50 to-transparent">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        HACKATHON PARTICIPATION
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {participations.map((hackathon, index) => (
                        <div
                            key={index}
                            className="gradient-border rounded-xl p-8 hover:scale-105 transition-transform group"
                        >
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${hackathon.color} flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-shadow`}>
                                {hackathon.icon}
                            </div>

                            {/* Title */}
                            <h3 className="font-orbitron text-xl font-bold text-blue-300 mb-2 leading-snug">
                                {hackathon.title}
                            </h3>

                            {/* Organizer */}
                            <div className="font-space text-sm text-purple-400 mb-4">
                                {hackathon.organizer}
                            </div>

                            {/* Meta info pills */}
                            <div className="flex flex-wrap gap-3 mb-4">
                                <div className="flex items-center gap-2 font-space text-xs text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/30">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {hackathon.date}
                                </div>
                                <div className="flex items-center gap-2 font-space text-xs text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/30">
                                    <Users className="w-3.5 h-3.5" />
                                    Team of {hackathon.teamSize}
                                </div>
                            </div>

                            {/* Achievement badge */}
                            <div className={`font-space text-sm font-semibold mb-4 ${hackathon.achievementColor}`}>
                                🏆 {hackathon.achievement}
                            </div>

                            {/* Description */}
                            <p className="font-jetbrains text-sm text-gray-400 leading-relaxed mb-4">
                                {hackathon.description}
                            </p>

                            {/* Technologies */}
                            <div className="border-t border-gray-700 pt-4 mb-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Code className="w-4 h-4 text-blue-400" />
                                    <span className="font-space text-xs text-gray-400 tracking-wider">TECHNOLOGIES</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {hackathon.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="font-jetbrains text-xs bg-gray-800/50 text-gray-400 px-2 py-1 rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* View Details button — dynamic based on link availability */}
                            <div className="mt-auto pt-2">
                                {hackathon.link ? (
                                    <a
                                        href={hackathon.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 font-space text-xs text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/10 px-4 py-2 rounded-lg transition-all"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        VIEW DETAILS
                                    </a>
                                ) : (
                                    <span className="inline-flex items-center gap-2 font-space text-xs text-gray-600 border border-gray-700 px-4 py-2 rounded-lg cursor-not-allowed">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        VIEW DETAILS
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
