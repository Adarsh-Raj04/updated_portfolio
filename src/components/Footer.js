import { Mail, Linkedin, Github, Heart } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 border-t border-blue-500/20 bg-gradient-to-b from-transparent to-black/50">
            <div className="max-w-6xl mx-auto px-6">

                {/* Logo and Tagline */}
                <div className="text-center mb-8">
                    <div className="font-orbitron text-2xl font-bold mb-2 glow-text">
                        <span className="text-blue-400">A</span>DARSH<span className="text-purple-400">.</span>
                    </div>
                    <p className="font-jetbrains text-gray-500 text-sm">
                        Turning data into intelligence, one integration at a time
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-6 mb-8">
                    <a
                        href="mailto:Adarsh.Raj.2004@outlook.com"
                        className="text-gray-500 hover:text-blue-400 transition-colors"
                        aria-label="Email"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                    <a
                        href="https://linkedin.com/in/adarsh-raj04"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-400 transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href="https://github.com/adarsh-raj04"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-400 transition-colors"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                </div>

                {/* Quick Links */}
                <div className="flex justify-center gap-8 mb-8 flex-wrap">
                    <a href="#about" className="font-space text-sm text-gray-500 hover:text-blue-400 transition-colors">
                        About
                    </a>
                    <a href="#experience" className="font-space text-sm text-gray-500 hover:text-blue-400 transition-colors">
                        Experience
                    </a>
                    <a href="#projects" className="font-space text-sm text-gray-500 hover:text-blue-400 transition-colors">
                        Projects
                    </a>
                    <a href="#contact" className="font-space text-sm text-gray-500 hover:text-blue-400 transition-colors">
                        Contact
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="font-jetbrains text-gray-600 text-sm flex items-center justify-center gap-2">
                        <span>© {currentYear} Adarsh Raj. Crafted with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        <span>and passion</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}