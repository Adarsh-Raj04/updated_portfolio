import { Award, TrendingUp, Users, Star } from 'lucide-react';

export default function Achievements() {
    const achievements = [
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "50K+ Tutorial Views",
            description: "Created widely-viewed technical tutorials that reached and helped over 50,000 developers worldwide in web application development and deployment.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Enterprise-Scale Pipelines",
            description: "Architected and deployed critical data pipelines at GSK processing pharmaceutical datasets for regulatory compliance and business intelligence.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Cross-Functional Leadership",
            description: "Led collaborative efforts with Data Scientists, Business Analysts, and Product Owners to deliver data-driven solutions across multiple departments.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Cloud Cost Optimization",
            description: "Optimized Azure cloud infrastructure costs through efficient resource management and implementation of best practices in cloud architecture.",
            color: "from-orange-500 to-red-500"
        }
    ];

    return (
        <section id="achievements" className="py-32 bg-gradient-to-b from-transparent to-[#0f172a]/50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ACHIEVEMENTS</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {achievements.map((achievement, index) => (
                        <div key={index} className="gradient-border rounded-xl p-8 hover:scale-105 transition-transform group">
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-shadow`}>
                                {achievement.icon}
                            </div>

                            <h3 className="font-orbitron text-2xl font-bold text-blue-300 mb-4">{achievement.title}</h3>

                            <p className="font-jetbrains text-gray-400 leading-relaxed">{achievement.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}