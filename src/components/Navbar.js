import { useState, useEffect, useRef } from 'react';
import { Menu, X, Download } from 'lucide-react';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('hero');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const menuRef = useRef(null);

    // ── Detect screen size dynamically ───────────────────────────────────────
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            // Auto-close mobile menu when resizing to desktop
            if (!mobile) setIsMobileMenuOpen(false);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // ── Scroll: active section + navbar background ────────────────────────────
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = [
                'hero', 'about', 'experience', 'skills',
                'projects', 'achievements', 'education', 'certifications', 'contact'
            ];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ── Close mobile menu on outside click ───────────────────────────────────
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    const navItems = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Achievements', href: '#achievements' },
        { name: 'Education', href: '#education' },
        { name: 'Certifications', href: '#certifications' },
        { name: 'Contact', href: '#contact' },
    ];

    const isActive = (href) => activeSection === href.slice(1);

    return (
        <nav
            ref={menuRef}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-blue-500/20' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <a href="#hero" className="font-orbitron text-2xl font-bold glow-text shrink-0">
                        <span className="text-blue-400">A</span>DARSH<span className="text-purple-400">.</span>
                    </a>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <div className="flex items-center gap-6 font-space text-sm">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`hover:text-blue-400 transition-colors whitespace-nowrap ${isActive(item.href) ? 'text-blue-400' : 'text-gray-400'
                                        }`}
                                >
                                    {item.name}
                                </a>
                            ))}

                            {/* Resume Download CTA */}
                            <a
                                target="_blank"
                                href="/Adarsh_Raj_Resume.pdf"
                                download
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 transition-all font-space text-xs whitespace-nowrap"
                            >
                                <Download className="w-3.5 h-3.5" />
                                Resume
                            </a>
                        </div>
                    )}

                    {/* Mobile: Resume icon + Hamburger */}
                    {isMobile && (
                        <div className="flex items-center gap-3">
                            <a
                                target="_blank"
                                href="/Adarsh_Raj_Resume.pdf"
                                download
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                aria-label="Download Resume"
                            >
                                <Download className="w-5 h-5" />
                            </a>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen
                                    ? <X className="w-6 h-6" />
                                    : <Menu className="w-6 h-6" />
                                }
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Dropdown Menu */}
                {isMobile && (
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="mt-4 py-4 border-t border-blue-500/20 flex flex-col space-y-4 font-space text-sm">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`hover:text-blue-400 transition-colors ${isActive(item.href) ? 'text-blue-400' : 'text-gray-400'
                                        }`}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}