import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contact" className="py-32">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="font-orbitron text-5xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">GET IN TOUCH</span>
                </h2>

                <p className="font-jetbrains text-gray-400 text-lg mb-12">
                    Interested in collaborating or have a project in mind? Let's connect and build something amazing together.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-9 mb-12">
                    <a href="mailto:Adarsh.Raj.2004@outlook.com" className="gradient-border rounded-xl p-6 hover:scale-105 transition-transform group">
                        <Mail className="w-12 h-12 text-blue-400 mx-auto mb-3 group-hover:animate-pulse" />
                        <div className="font-space text-sm text-gray-400 mb-1">Email</div>
                        <div className="font-jetbrains text-xs text-gray-300 break-all">Adarsh.Raj.2004@outlook.com</div>
                    </a>

                    <a href="https://linkedin.com/in/adarsh-raj04" target="_blank" rel="noopener noreferrer" className="gradient-border rounded-xl p-6 hover:scale-105 transition-transform group">
                        <Linkedin className="w-12 h-12 text-pink-400 mx-auto mb-3 group-hover:animate-pulse" />
                        <div className="font-space text-sm text-gray-400 mb-1">LinkedIn</div>
                        <div className="font-jetbrains text-xs text-gray-300">@adarsh-raj04</div>
                    </a>

                    <a href="https://github.com/adarsh-raj04" target="_blank" rel="noopener noreferrer" className="gradient-border rounded-xl p-6 hover:scale-105 transition-transform group">
                        <Github className="w-12 h-12 text-green-400 mx-auto mb-3 group-hover:animate-pulse" />
                        <div className="font-space text-sm text-gray-400 mb-1">GitHub</div>
                        <div className="font-jetbrains text-xs text-gray-300">@adarsh-raj04</div>
                    </a>
                </div>

                <div className="gradient-border rounded-xl p-8 mb-12">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <MapPin className="w-6 h-6 text-blue-400" />
                        <span className="font-space text-lg text-gray-300">Bengaluru, Karnataka, India</span>
                    </div>
                    <p className="font-jetbrains text-sm text-gray-500">Currently based in the Silicon Valley of India</p>
                </div>

                <div className="flex justify-center">
                    <a
                        href="mailto:Adarsh.Raj.2004@outlook.com"
                        className="gradient-border px-8 py-4 rounded-lg font-space text-sm hover:scale-105 transition-transform flex items-center gap-3"
                    >
                        <Send className="w-5 h-5" />
                        SEND ME A MESSAGE
                    </a>
                </div>
            </div>
        </section>
    );
}