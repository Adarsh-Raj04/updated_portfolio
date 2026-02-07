import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';

export default function Education() {
    return (
        <section id="education" className="py-32">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">EDUCATION</span>
                </h2>

                <div className="gradient-border rounded-xl p-10">
                    <div className="flex items-start gap-8 flex-col md:flex-row">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/50">
                            <GraduationCap className="w-10 h-10 text-white" />
                        </div>

                        <div className="flex-1">
                            <h3 className="font-orbitron text-3xl font-bold text-blue-300 mb-3">Bachelor of Technology (B.Tech)</h3>

                            <div className="font-space text-xl text-purple-300 mb-4">Information Science/Studies</div>

                            <div className="font-jetbrains text-lg text-gray-400 mb-4">
                                M.S. Ramaiah University of Applied Sciences
                            </div>

                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center gap-2 font-space text-sm text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/30">
                                    <Calendar className="w-4 h-4" />
                                    August 2020 – June 2024
                                </div>
                                <div className="flex items-center gap-2 font-space text-sm text-purple-400 bg-purple-500/10 px-4 py-2 rounded-lg border border-purple-500/30">
                                    <MapPin className="w-4 h-4" />
                                    Bengaluru, Karnataka
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-6">
                                <h4 className="font-orbitron text-lg font-bold text-blue-300 mb-4 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    Key Focus Areas
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        "Data Structures & Algorithms",
                                        "Database Management Systems",
                                        "Cloud Computing",
                                        "Machine Learning",
                                        "Software Engineering",
                                        "Web Technologies"
                                    ].map((area, i) => (
                                        <span key={i} className="tech-tag px-4 py-2 rounded-lg font-jetbrains text-sm">
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}