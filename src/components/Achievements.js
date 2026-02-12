import { Award, Zap, GitMerge, Search, Trophy, Users } from 'lucide-react';

export default function Achievements() {
    const achievements = [
        {
            icon: <GitMerge className="w-8 h-8" />,
            title: "90% Manual Effort Eliminated",
            metric: "~200 hrs/year saved",
            description: "Delivered the ServiceNow–Collibra governance automation integration end-to-end, eliminating 90% of manual workflow effort and saving approximately 200 hours per year across the team.",
            color: "from-blue-500 to-cyan-500",
            metricColor: "text-cyan-400",
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "99.6% Faster Data Sync",
            metric: "30 min → 7 seconds",
            description: "Reduced data sync time between ServiceNow and Collibra from 30 minutes to just 7 seconds through process optimisation and architectural improvements — a 99.6% reduction.",
            color: "from-purple-500 to-pink-500",
            metricColor: "text-pink-400",
        },
        {
            icon: <Search className="w-8 h-8" />,
            title: "87.5% Faster Metadata Retrieval",
            metric: "8 hours → 1 hour",
            description: "Re-engineered Collibra GraphQL queries to cut asset metadata retrieval time by 87.5%, dropping execution from 8 hours to 1 hour and dramatically improving governance workflow speed.",
            color: "from-green-500 to-emerald-500",
            metricColor: "text-emerald-400",
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Best Project Award",
            metric: "Top of 250 students",
            description: "Awarded Best Project out of 250 students at M.S. Ramaiah University of Applied Sciences for outstanding final year project work.",
            color: "from-yellow-500 to-orange-500",
            metricColor: "text-yellow-400",
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Rank 5 – GeeksforGeeks",
            metric: "Rank 281 in GFG Contest 119",
            description: "Ranked 5th on the GeeksforGeeks coding platform at university level and placed 281st in GFG Coding Contest 119 out of thousands of participants nationwide.",
            color: "from-orange-500 to-red-500",
            metricColor: "text-orange-400",
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "50K+ Tutorial Views",
            metric: "50,000+ developers reached",
            description: "Created a widely-viewed web application deployment tutorial that reached and helped over 50,000 developers worldwide with full-stack development and local hosting best practices.",
            color: "from-pink-500 to-rose-500",
            metricColor: "text-rose-400",
        },
    ];

    return (
        <section id="achievements" className="py-32 bg-gradient-to-b from-transparent to-[#0f172a]/50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        ACHIEVEMENTS
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((achievement, index) => (
                        <div
                            key={index}
                            className="gradient-border rounded-xl p-8 hover:scale-105 transition-transform group"
                        >
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-shadow`}>
                                {achievement.icon}
                            </div>

                            {/* Title */}
                            <h3 className="font-orbitron text-xl font-bold text-blue-300 mb-2 leading-snug">
                                {achievement.title}
                            </h3>

                            {/* Metric pill */}
                            <div className={`font-space text-sm font-semibold mb-4 ${achievement.metricColor}`}>
                                {achievement.metric}
                            </div>

                            {/* Description */}
                            <p className="font-jetbrains text-sm text-gray-400 leading-relaxed">
                                {achievement.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}