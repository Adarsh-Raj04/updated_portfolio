import { Github, GitBranch, ChevronDown, Code, Users, BookOpen } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function GitHubStats() {
    const [isVisible, setIsVisible] = useState(false);
    const [githubData, setGithubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [linkClicks, setLinkClicks] = useState(0);
    const sectionRef = useRef(null);

    const githubUsername = "adarsh-raj04";

    // Load link clicks from localStorage
    useEffect(() => {
        const savedClicks = localStorage.getItem('github-profile-clicks');
        if (savedClicks) {
            setLinkClicks(parseInt(savedClicks, 10));
        }
    }, []);

    const handleProfileClick = () => {
        const newCount = linkClicks + 1;
        setLinkClicks(newCount);
        localStorage.setItem('github-profile-clicks', newCount.toString());
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // Fetch GitHub user data
        fetch(`https://api.github.com/users/${githubUsername}`)
            .then(res => res.json())
            .then(data => {
                setGithubData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching GitHub data:', err);
                setLoading(false);
            });
    }, []);

    const stats = [
        {
            icon: Code,
            label: 'Public Repos',
            value: githubData?.public_repos || 0,
            color: 'text-cyan-400'
        },
        {
            icon: Users,
            label: 'Followers',
            value: githubData?.followers || 0,
            color: 'text-purple-400'
        },
        {
            icon: GitBranch,
            label: 'Following',
            value: githubData?.following || 0,
            color: 'text-pink-400'
        },
        {
            icon: BookOpen,
            label: 'Public Gists',
            value: githubData?.public_gists || 0,
            color: 'text-green-400'
        }
    ];

    return (
        <section
            ref={sectionRef}
            id="github"
            className="py-32 relative overflow-hidden"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 data-grid opacity-20" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <h2 className="font-orbitron text-5xl font-bold mb-4 text-center">
                    <span className="holographic flex items-center justify-center gap-3">
                        <Github className="w-12 h-12" />
                        GITHUB STATS
                    </span>
                </h2>

                <p className="text-center mb-16 font-space" style={{ color: 'var(--text-tertiary)' }}>
                    // My open source contributions and activity
                </p>

                {loading ? (
                    <div className="text-center" style={{ color: 'var(--text-tertiary)' }}>
                        <p className="font-jetbrains">Loading GitHub stats...</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Profile Card */}
                        {githubData && (
                            <div className={`gradient-border rounded-xl p-8 ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <img
                                        src={githubData.avatar_url}
                                        alt={githubData.name}
                                        className="w-32 h-32 rounded-full border-4"
                                        style={{ borderColor: 'var(--accent-cyan)' }}
                                    />
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="font-orbitron text-3xl font-bold mb-2" style={{ color: 'var(--accent-cyan)' }}>
                                            {githubData.name || githubUsername}
                                        </h3>
                                        <p className="font-jetbrains mb-4" style={{ color: 'var(--text-secondary)' }}>
                                            @{githubData.login}
                                        </p>
                                        {githubData.bio && (
                                            <p className="font-space mb-4" style={{ color: 'var(--text-primary)' }}>
                                                {githubData.bio}
                                            </p>
                                        )}
                                        {githubData.location && (
                                            <p className="font-jetbrains text-sm" style={{ color: 'var(--text-tertiary)' }}>
                                                📍 {githubData.location}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Stats Grid */}
                        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${isVisible ? 'fade-in-up stagger-2' : 'opacity-0'}`}>
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="gradient-border rounded-xl p-6 text-center transition-all duration-300 hover:scale-105"
                                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                                >
                                    <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                                    <p className="font-orbitron text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                        {stat.value}
                                    </p>
                                    <p className="font-jetbrains text-sm" style={{ color: 'var(--text-tertiary)' }}>
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Profile View Counter */}
                        <div className={`text-center mb-6 ${isVisible ? 'fade-in-up stagger-3' : 'opacity-0'}`}>
                            <img
                                src={`https://komarev.com/ghpvc/?username=${githubUsername}&color=60A5FA&style=flat-square&label=Profile+Views`}
                                alt="Profile views counter"
                                className="inline-block"
                            />
                        </div>

                        {/* GitHub Link with Click Counter */}
                        <div className={`text-center ${isVisible ? 'fade-in-up stagger-3' : 'opacity-0'}`}>
                            <a
                                href={`https://github.com/${githubUsername}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleProfileClick}
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-orbitron font-bold transition-all duration-300 hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2))',
                                    border: '2px solid var(--border-primary)',
                                    color: 'var(--accent-cyan)',
                                    boxShadow: '0 0 20px var(--glow-primary)'
                                }}
                            >
                                <Github className="w-6 h-6" />
                                VIEW FULL PROFILE
                            </a>
                            {linkClicks > 0 && (
                                <p className="mt-4 font-jetbrains text-sm" style={{ color: 'var(--text-tertiary)' }}>
                                    🔗 Profile link clicked {linkClicks} {linkClicks === 1 ? 'time' : 'times'}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Scroll Indicator */}
            <a 
                href="#contact"
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer transition-all duration-300 hover:scale-110"
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Scroll to Contact section"
            >
                <ChevronDown className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
            </a>
        </section>
    );
}
