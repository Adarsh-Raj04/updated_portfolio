import { ChevronDown } from 'lucide-react';

export default function About() {
    const stats = [
        { value: '2+', label: 'YEARS AT GSK', color: 'text-blue-400' },
        { value: '200+', label: 'HOURS AUTOMATED', color: 'text-purple-400' },
        { value: '90%', label: 'MANUAL EFFORT REMOVED', color: 'text-pink-400' },
        { value: '50K+', label: 'TUTORIAL VIEWS', color: 'text-cyan-400' },
    ];

    return (
        <section id="about" className="py-32 relative">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        ABOUT ME
                    </span>
                </h2>

                <div className="gradient-border rounded-2xl p-12">
                    {/* Bio paragraphs */}
                    <p className="font-jetbrains text-gray-300 text-lg leading-relaxed mb-6">
                        Data &amp; AI Engineer with 2+ years of experience at{' '}
                        <span className="text-blue-400 font-semibold">GSK</span>, building
                        enterprise-scale intelligent systems across metadata management, data
                        quality, and governance automation. I design and ship end-to-end
                        solutions — from{' '}
                        <span className="text-blue-400">semantic search powered by OpenAI
                            and Azure AI Search</span>, to{' '}
                        <span className="text-blue-400">Apache Spark pipelines on Databricks</span>,
                        to <span className="text-blue-400">FastAPI microservices</span> serving
                        metadata and lineage at scale.
                    </p>

                    <p className="font-jetbrains text-gray-300 text-lg leading-relaxed mb-6">
                        I own the full engineering lifecycle — architecture, backend development,
                        enterprise integrations, and DevOps. I've delivered integrations between
                        complex platforms like{' '}
                        <span className="text-purple-400">ServiceNow</span>,{' '}
                        <span className="text-purple-400">Collibra</span>, and{' '}
                        <span className="text-purple-400">SailPoint</span> that eliminated
                        hundreds of hours of manual work and drove measurable compliance
                        improvements across pharmaceutical data assets.
                    </p>

                    <p className="font-jetbrains text-gray-300 text-lg leading-relaxed">
                        Beyond delivery, I explore what's next — evaluating{' '}
                        <span className="text-pink-400">Databricks Genie</span> for natural
                        language querying, prototyping{' '}
                        <span className="text-pink-400">NLP-driven analytics in Power BI</span>,
                        and mentoring new engineers to accelerate team velocity. I care about
                        building systems that don't just work — they last.
                    </p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                        {stats.map(({ value, label, color }) => (
                            <div key={label} className="text-center">
                                <div className={`text-4xl font-orbitron font-bold ${color} mb-2`}>
                                    {value}
                                </div>
                                <div className="font-space text-gray-400 text-sm tracking-wider">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <a 
                href="#experience"
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Scroll to Experience section"
            >
                <ChevronDown className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
            </a>
        </section>
    );
}