import { Mail, Linkedin, Github, ChevronDown } from 'lucide-react';

export default function Hero() {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative data-grid overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

            <div className="max-w-6xl mx-auto px-6 text-center relative z-10 pt-20">
                <div className="floating">
                    <div className="inline-block mb-8">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 pulse-glow flex items-center justify-center">
                            <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center">
                                <span className="text-5xl font-orbitron font-bold bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent">AR</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-6 glow-text leading-tight">
                    ADARSH <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">RAJ</span>
                </h1>

                <div className="font-space text-xl md:text-2xl text-blue-300 mb-4 tracking-wider">
                    &lt; DATA & AI ENGINEER /&gt;
                </div>

                <p className="font-jetbrains text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
                    Architecting enterprise-scale data and AI solutions at <a href='https://www.gsk.com/' target='_blank' rel='noopener noreferrer'><span className="text-blue-400 font-semibold">GSK</span></a>.
                    Leveraging Azure Data & AI, PySpark, Machine Learning, OpenAI, ServiceNow, and SailPoint to build intelligent, automated, and high-impact systems.
                </p>


                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    <a href="#contact" className="gradient-border px-8 py-4 rounded-lg font-space text-sm hover:scale-105 transition-transform">
                        GET IN TOUCH
                    </a>
                    <a href="#projects" className="px-8 py-4 rounded-lg font-space text-sm border border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 transition-all">
                        VIEW PROJECTS
                    </a>
                </div>

                <div className="flex justify-center gap-6">
                    <a href="mailto:Adarsh.Raj.2004@outlook.com" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Email">
                        <Mail className="w-6 h-6" />
                    </a>
                    <a href="https://linkedin.com/in/adarsh-raj04" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="https://github.com/adarsh-raj04" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="GitHub">
                        <Github className="w-6 h-6" />
                    </a>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator">
                <ChevronDown className="w-8 h-8 text-blue-400" />
            </div>
        </section>
    );
}