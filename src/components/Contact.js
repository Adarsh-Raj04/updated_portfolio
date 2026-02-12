import { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2, AlertCircle, Loader } from 'lucide-react';

export default function Contact() {
    const [formState, setFormState] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState('sending');

        try {
            const res = await fetch('https://formspree.io/f/mvojjryl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormState('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setFormState('error');
            }
        } catch {
            setFormState('error');
        }
    };

    const contactLinks = [
        {
            href: "mailto:Adarsh.Raj.2004@outlook.com",
            icon: <Mail className="w-10 h-10" />,
            label: "Email",
            value: "Adarsh.Raj.2004@outlook.com",
            color: "text-blue-400",
            external: false,
        },
        {
            href: "https://linkedin.com/in/adarsh-raj04",
            icon: <Linkedin className="w-10 h-10" />,
            label: "LinkedIn",
            value: "@adarsh-raj04",
            color: "text-pink-400",
            external: true,
        },
        {
            href: "https://github.com/adarsh-raj04",
            icon: <Github className="w-10 h-10" />,
            label: "GitHub",
            value: "@adarsh-raj04",
            color: "text-green-400",
            external: true,
        },
    ];

    return (
        <section id="contact" className="py-32">
            <div className="max-w-6xl mx-auto px-6">

                {/* ── Heading ───────────────────────────────────────────────── */}
                <h2 className="font-orbitron text-5xl font-bold mb-6 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        GET IN TOUCH
                    </span>
                </h2>
                <p className="font-jetbrains text-gray-400 text-lg mb-16 text-center max-w-2xl mx-auto">
                    Interested in collaborating or have a project in mind? Drop me a message
                    or connect directly — I'm always open to interesting conversations.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* ── Left: contact links + location ───────────────────── */}
                    <div className="flex flex-col gap-6">
                        {contactLinks.map(({ href, icon, label, value, color, external }) => (
                            <a
                                key={label}
                                href={href}
                                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="gradient-border rounded-xl p-6 hover:scale-105 transition-transform group flex items-center gap-5"
                            >
                                <div className={`${color} group-hover:animate-pulse shrink-0`}>
                                    {icon}
                                </div>
                                <div>
                                    <div className="font-space text-sm text-gray-400 mb-1">{label}</div>
                                    <div className="font-jetbrains text-sm text-gray-300 break-all">{value}</div>
                                </div>
                            </a>
                        ))}

                        {/* Location */}
                        <div className="gradient-border rounded-xl p-6 flex items-center gap-5">
                            <MapPin className="w-10 h-10 text-purple-400 shrink-0" />
                            <div>
                                <div className="font-space text-sm text-gray-400 mb-1">Location</div>
                                <div className="font-jetbrains text-sm text-gray-300">Bengaluru, Karnataka, India</div>
                                <div className="font-jetbrains text-xs text-gray-500 mt-1">
                                    Silicon Valley of India
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Right: contact form ───────────────────────────────── */}
                    <div className="gradient-border rounded-xl p-8">
                        <h3 className="font-orbitron text-xl font-bold text-blue-300 mb-6">
                            Send a Message
                        </h3>

                        {/* Success state */}
                        {formState === 'success' ? (
                            <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
                                <CheckCircle2 className="w-16 h-16 text-green-400" />
                                <p className="font-orbitron text-lg text-green-400">Message Sent!</p>
                                <p className="font-jetbrains text-sm text-gray-400">
                                    Thanks for reaching out — I'll get back to you soon.
                                </p>
                                <button
                                    onClick={() => setFormState('idle')}
                                    className="font-space text-xs text-blue-400 hover:text-blue-300 transition-colors mt-2 border border-blue-500/30 px-4 py-2 rounded-lg hover:bg-blue-500/10"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="font-space text-xs text-gray-400 mb-2 block tracking-wider"
                                    >
                                        NAME
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your name"
                                        autoComplete="name"
                                        className="w-full bg-gray-900/50 border border-gray-700 hover:border-blue-500/50 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 font-jetbrains text-sm text-gray-300 placeholder-gray-600 transition-colors"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="font-space text-xs text-gray-400 mb-2 block tracking-wider"
                                    >
                                        EMAIL
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="your@email.com"
                                        autoComplete="email"
                                        className="w-full bg-gray-900/50 border border-gray-700 hover:border-blue-500/50 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 font-jetbrains text-sm text-gray-300 placeholder-gray-600 transition-colors"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="contact-message"
                                        className="font-space text-xs text-gray-400 mb-2 block tracking-wider"
                                    >
                                        MESSAGE
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder="What's on your mind?"
                                        autoComplete="off"
                                        className="w-full bg-gray-900/50 border border-gray-700 hover:border-blue-500/50 focus:border-blue-500 focus:outline-none rounded-lg px-4 py-3 font-jetbrains text-sm text-gray-300 placeholder-gray-600 transition-colors resize-none"
                                    />
                                </div>

                                {/* Error message */}
                                {formState === 'error' && (
                                    <div className="flex items-center gap-2 text-red-400 font-jetbrains text-sm">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        Something went wrong. Please try again or email me directly.
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={formState === 'sending'}
                                    className="gradient-border px-6 py-3 rounded-lg font-space text-sm hover:scale-105 transition-transform flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {formState === 'sending' ? (
                                        <>
                                            <Loader className="w-4 h-4 animate-spin" />
                                            SENDING...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            SEND MESSAGE
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}