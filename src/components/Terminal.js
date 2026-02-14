import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react';

export default function Terminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', text: 'Welcome to Adarsh Portfolio Terminal v1.0' },
        { type: 'system', text: 'Type "help" for available commands' }
    ]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isMobile, setIsMobile] = useState(false);
    const inputRef = useRef(null);
    const historyRef = useRef(null);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const commands = {
        help: {
            description: 'Show available commands',
            action: () => [
                { type: 'output', text: 'Available commands:' },
                { type: 'output', text: '  about      - Navigate to About section' },
                { type: 'output', text: '  experience - Navigate to Experience section' },
                { type: 'output', text: '  skills     - Navigate to Skills section' },
                { type: 'output', text: '  projects   - Navigate to Projects section' },
                { type: 'output', text: '  contact    - Navigate to Contact section' },
                { type: 'output', text: '  clear      - Clear terminal' },
                { type: 'output', text: '  theme      - Toggle dark/light theme' },
                { type: 'output', text: '  whoami     - Display info about me' },
                { type: 'output', text: '  exit       - Close terminal' }
            ]
        },
        about: {
            description: 'Navigate to About section',
            action: () => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                return [{ type: 'success', text: 'Navigating to About section...' }];
            }
        },
        experience: {
            description: 'Navigate to Experience section',
            action: () => {
                document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                return [{ type: 'success', text: 'Navigating to Experience section...' }];
            }
        },
        skills: {
            description: 'Navigate to Skills section',
            action: () => {
                document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                return [{ type: 'success', text: 'Navigating to Skills section...' }];
            }
        },
        projects: {
            description: 'Navigate to Projects section',
            action: () => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                return [{ type: 'success', text: 'Navigating to Projects section...' }];
            }
        },
        contact: {
            description: 'Navigate to Contact section',
            action: () => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                return [{ type: 'success', text: 'Navigating to Contact section...' }];
            }
        },
        clear: {
            description: 'Clear terminal',
            action: () => {
                setHistory([]);
                return [];
            }
        },
        theme: {
            description: 'Toggle theme',
            action: () => {
                const isLight = document.documentElement.classList.contains('light');
                if (isLight) {
                    document.documentElement.classList.remove('light');
                    localStorage.setItem('theme', 'dark');
                    return [{ type: 'success', text: 'Switched to dark theme' }];
                } else {
                    document.documentElement.classList.add('light');
                    localStorage.setItem('theme', 'light');
                    return [{ type: 'success', text: 'Switched to light theme' }];
                }
            }
        },
        whoami: {
            description: 'Display info',
            action: () => [
                { type: 'output', text: 'Adarsh Raj' },
                { type: 'output', text: 'Data & AI Engineer @ GSK' },
                { type: 'output', text: 'Location: Bengaluru, India' },
                { type: 'output', text: 'Email: Adarsh.Raj.2004@outlook.com' }
            ]
        },
        exit: {
            description: 'Close terminal',
            action: () => {
                setIsOpen(false);
                return [{ type: 'success', text: 'Goodbye!' }];
            }
        }
    };

    const handleCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        
        setHistory(prev => [...prev, { type: 'input', text: `$ ${cmd}` }]);
        
        if (!trimmedCmd) return;

        if (commands[trimmedCmd]) {
            const output = commands[trimmedCmd].action();
            setHistory(prev => [...prev, ...output]);
        } else {
            setHistory(prev => [...prev, { type: 'error', text: `Command not found: ${trimmedCmd}. Type "help" for available commands.` }]);
        }

        setCommandHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            handleCommand(input);
            setInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex + 1;
                if (newIndex < commandHistory.length) {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[commandHistory.length - 1 - newIndex]);
                }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, isMinimized]);

    // Don't render on mobile
    if (isMobile) {
        return null;
    }

    return (
        <>
            {/* Terminal Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-0 left-0 z-50 px-6 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 group flex items-center gap-2"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.15), rgba(255, 0, 255, 0.15))',
                        borderColor: 'var(--border-primary)',
                        boxShadow: '0 4px 20px rgba(0, 255, 255, 0.3)'
                    }}
                    aria-label="Open terminal"
                >
                    <TerminalIcon className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
                    <span className="font-space text-sm" style={{ color: 'var(--accent-cyan)' }}>
                        TERMINAL
                    </span>
                </button>
            )}

            {/* Terminal Window */}
            {isOpen && (
                <div
                    className={`fixed bottom-0 left-0 right-0 md:left-0 md:right-auto md:bottom-0 z-50 transition-all duration-300 ${
                        isMinimized ? 'h-12' : 'h-96'
                    }`}
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        background: 'rgba(10, 14, 26, 0.95)',
                        backdropFilter: 'blur(10px)',
                        borderTop: '1px solid var(--border-primary)',
                        borderRight: '1px solid var(--border-primary)',
                        boxShadow: '0 -4px 20px rgba(0, 255, 255, 0.2)'
                    }}
                >
                    {/* Terminal Header */}
                    <div
                        className="flex items-center justify-between px-4 py-2 border-b cursor-pointer"
                        style={{ borderColor: 'var(--border-primary)' }}
                        onClick={() => setIsMinimized(!isMinimized)}
                    >
                        <div className="flex items-center gap-2">
                            <TerminalIcon className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
                            <span className="font-space text-sm" style={{ color: 'var(--accent-cyan)' }}>
                                terminal@adarsh-portfolio
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMinimized(!isMinimized);
                                }}
                                className="p-1 hover:bg-white/10 rounded transition-colors"
                            >
                                {isMinimized ? (
                                    <Maximize2 className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                                ) : (
                                    <Minimize2 className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                                )}
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                }}
                                className="p-1 hover:bg-red-500/20 rounded transition-colors"
                            >
                                <X className="w-4 h-4 text-red-400" />
                            </button>
                        </div>
                    </div>

                    {/* Terminal Content */}
                    {!isMinimized && (
                        <div className="flex flex-col h-[calc(100%-48px)]">
                            {/* History */}
                            <div
                                ref={historyRef}
                                className="flex-1 overflow-y-auto p-4 font-jetbrains text-sm"
                            >
                                {history.map((line, i) => (
                                    <div
                                        key={i}
                                        className={`mb-1 ${
                                            line.type === 'input' ? 'text-cyan-400' :
                                            line.type === 'error' ? 'text-red-400' :
                                            line.type === 'success' ? 'text-green-400' :
                                            line.type === 'system' ? 'text-purple-400' :
                                            'text-gray-300'
                                        }`}
                                    >
                                        {line.text}
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSubmit} className="border-t p-4" style={{ borderColor: 'var(--border-primary)' }}>
                                <div className="flex items-center gap-2 font-jetbrains text-sm">
                                    <span className="text-cyan-400">$</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 bg-transparent outline-none text-gray-300"
                                        placeholder="Type a command..."
                                        autoComplete="off"
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
