import { useState, useEffect, useRef } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('hero');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [theme, setTheme] = useState('dark');
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

    // ── Initialize theme from localStorage or system preference ──────────────
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === 'light') {
                document.documentElement.classList.add('light');
            }
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const systemTheme = prefersDark ? 'dark' : 'light';
            setTheme(systemTheme);
            if (systemTheme === 'light') {
                document.documentElement.classList.add('light');
            }
        }
    }, []);

    // ── Toggle theme function ─────────────────────────────────────────────────
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.width = '100vw';
        ripple.style.height = '100vh';
        ripple.style.background = newTheme === 'light' 
            ? 'radial-gradient(circle at center, #f0f4f8 0%, transparent 70%)'
            : 'radial-gradient(circle at center, #0a0e1a 0%, transparent 70%)';
        ripple.style.zIndex = '9998';
        ripple.style.pointerEvents = 'none';
        ripple.style.opacity = '0';
        ripple.style.transition = 'opacity 0.6s ease-out';
        document.body.appendChild(ripple);

        // Trigger animation
        requestAnimationFrame(() => {
            ripple.style.opacity = '1';
        });

        // Apply theme change
        setTimeout(() => {
            if (newTheme === 'light') {
                document.documentElement.classList.add('light');
            } else {
                document.documentElement.classList.remove('light');
            }
        }, 300);

        // Remove ripple
        setTimeout(() => {
            ripple.style.opacity = '0';
            setTimeout(() => ripple.remove(), 600);
        }, 600);
    };

    // ── Scroll: active section + navbar background ────────────────────────────
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = [
                'hero', 'about', 'experience', 'skills',
                'projects', 'achievements', 'participation', 'education', 'certifications', 'contact'
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
        { name: 'Participation', href: '#participation' },
        { name: 'Education', href: '#education' },
        { name: 'Certifications', href: '#certifications' },
        { name: 'Contact', href: '#contact' },
    ];

    const isActive = (href) => activeSection === href.slice(1);

    return (
        <nav
            ref={menuRef}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-lg border-b' : 'bg-transparent'
                }`}
            style={{
                backgroundColor: isScrolled ? 'rgba(10, 14, 26, 0.8)' : 'transparent',
                borderColor: isScrolled ? 'var(--border-primary)' : 'transparent'
            }}
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <a href="#hero" className="font-orbitron text-2xl font-bold shrink-0 holographic">
                        ADARSH.
                    </a>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <div className="flex items-center gap-6 font-space text-sm">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`hover:transition-all duration-300 whitespace-nowrap`}
                                    style={{
                                        color: isActive(item.href) ? 'var(--accent-cyan)' : 'var(--text-tertiary)',
                                        textShadow: isActive(item.href) ? '0 0 10px var(--glow-secondary)' : 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive(item.href)) {
                                            e.currentTarget.style.color = 'var(--accent-cyan)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive(item.href)) {
                                            e.currentTarget.style.color = 'var(--text-tertiary)';
                                        }
                                    }}
                                >
                                    {item.name}
                                </a>
                            ))}

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg backdrop-blur-md border transition-all duration-300 hover:scale-110 group"
                                style={{
                                    background: theme === 'dark'
                                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
                                        : 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))',
                                    borderColor: 'var(--border-primary)',
                                }}
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <FiSun className="w-4 h-4 text-yellow-400 transition-transform group-hover:rotate-180 duration-500" />
                                ) : (
                                    <FiMoon className="w-4 h-4 text-blue-600 transition-transform group-hover:-rotate-12 duration-500" />
                                )}
                            </button>

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

                    {/* Mobile: Theme Toggle + Resume icon + Hamburger */}
                    {isMobile && (
                        <div className="flex items-center gap-3">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg backdrop-blur-md border transition-all duration-300"
                                style={{
                                    background: theme === 'dark'
                                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
                                        : 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))',
                                    borderColor: 'var(--border-primary)',
                                }}
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? (
                                    <FiSun className="w-4 h-4 text-yellow-400" />
                                ) : (
                                    <FiMoon className="w-4 h-4 text-blue-600" />
                                )}
                            </button>

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