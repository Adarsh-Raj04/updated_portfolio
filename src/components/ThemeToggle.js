import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
    const [theme, setTheme] = useState('dark');

    // Initialize theme from system preference or localStorage
    useEffect(() => {
        // Check if user has a saved preference
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === 'light') {
                document.documentElement.classList.add('light');
            }
        } else {
            // Use system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const systemTheme = prefersDark ? 'dark' : 'light';
            setTheme(systemTheme);
            if (systemTheme === 'light') {
                document.documentElement.classList.add('light');
            }
        }
    }, []);

    // Toggle theme function
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'light') {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-24 right-6 z-50 p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 group"
            style={{
                background: theme === 'dark'
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))',
                borderColor: 'var(--border-primary)',
            }}
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <FiSun className="w-5 h-5 text-yellow-400 transition-transform group-hover:rotate-180 duration-500" />
            ) : (
                <FiMoon className="w-5 h-5 text-blue-600 transition-transform group-hover:-rotate-12 duration-500" />
            )}
        </button>
    );
}
