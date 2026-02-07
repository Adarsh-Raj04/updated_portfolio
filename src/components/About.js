export default function About() {
    return (
        <section id="about" className="py-32 relative">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-orbitron text-5xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">ABOUT ME</span>
                </h2>

                <div className="gradient-border rounded-2xl p-12">
                    <p className="font-jetbrains text-gray-300 text-lg leading-relaxed mb-6">
                        Data & AI Engineer with 2+ years of experience building scalable data pipelines and implementing AI-driven solutions at GSK.
                        Expert in designing end-to-end data systems using Azure Databricks, Azure Data Factory, and modern cloud technologies.
                    </p>
                    <p className="font-jetbrains text-gray-300 text-lg leading-relaxed">
                        Proven track record of optimizing complex workflows, automating processes, and delivering data-driven insights that drive
                        measurable business impact across pharmaceutical operations. Passionate about leveraging cutting-edge technologies to solve
                        real-world problems and drive innovation in healthcare and data science.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="text-center">
                            <div className="text-4xl font-orbitron font-bold text-blue-400 mb-2">2+</div>
                            <div className="font-space text-gray-400 text-sm">YEARS EXPERIENCE</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-orbitron font-bold text-purple-400 mb-2">50K+</div>
                            <div className="font-space text-gray-400 text-sm">TUTORIAL VIEWS</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-orbitron font-bold text-pink-400 mb-2">∞</div>
                            <div className="font-space text-gray-400 text-sm">PIPELINES BUILT</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}