import { useState, useRef, useEffect } from 'react';
import { Briefcase, GraduationCap, Award, Calendar } from 'lucide-react';

function InteractiveTimeline() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const timelineRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const timelineEvents = [
        {
            date: 'Aug 2024 - Present',
            title: 'Data & AI Engineer',
            company: 'GSK',
            icon: <Briefcase className="w-5 h-5" />,
            color: '#00ffff',
            description: 'Building enterprise-scale AI solutions, semantic search, and data pipelines'
        },
        {
            date: 'Jan 2024 - Aug 2024',
            title: 'Graduate Intern',
            company: 'GSK',
            icon: <Briefcase className="w-5 h-5" />,
            color: '#a855f7',
            description: 'DevOps automation and data analytics'
        },
        {
            date: 'Aug 2020 - May 2024',
            title: 'B.Tech in Computer Science',
            company: 'M.S. Ramaiah University',
            icon: <GraduationCap className="w-5 h-5" />,
            color: '#3b82f6',
            description: 'CGPA: 8.2/10.0, Best Project Award'
        },
        {
            date: '2023',
            title: 'Rank 5 - GeeksforGeeks',
            company: 'Competitive Programming',
            icon: <Award className="w-5 h-5" />,
            color: '#f59e0b',
            description: 'University level coding achievement'
        }
    ];

    const handleTimelineClick = (e) => {
        if (!timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        const index = Math.round((percentage / 100) * (timelineEvents.length - 1));
        setActiveIndex(Math.max(0, Math.min(index, timelineEvents.length - 1)));
        setProgress(percentage);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging || !timelineRef.current) return;
        handleTimelineClick(e);
    };

    useEffect(() => {
        const newProgress = (activeIndex / (timelineEvents.length - 1)) * 100;
        setProgress(newProgress);
    }, [activeIndex, timelineEvents.length]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging]);

    return (
        <div className="max-w-6xl mx-auto px-6 py-16">
            <h3 className="font-orbitron text-3xl font-bold mb-12 text-center">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    INTERACTIVE TIMELINE
                </span>
            </h3>

            {/* Timeline Track */}
            <div className="relative mb-12">
                <div
                    ref={timelineRef}
                    className="relative h-2 rounded-full cursor-pointer"
                    style={{ backgroundColor: 'rgba(100, 116, 139, 0.3)' }}
                    onClick={handleTimelineClick}
                    onMouseDown={handleMouseDown}
                >
                    {/* Progress Bar */}
                    <div
                        className="absolute h-full rounded-full transition-all duration-300"
                        style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #00ffff, #a855f7)',
                            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                        }}
                    />

                    {/* Timeline Markers */}
                    {timelineEvents.map((event, index) => {
                        const position = (index / (timelineEvents.length - 1)) * 100;
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={index}
                                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer transition-all duration-300"
                                style={{
                                    left: `${position}%`,
                                    zIndex: isActive ? 10 : 5
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveIndex(index);
                                }}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                                        isActive ? 'scale-150' : 'scale-100 hover:scale-125'
                                    }`}
                                    style={{
                                        backgroundColor: isActive ? event.color : 'var(--bg-primary)',
                                        borderColor: event.color,
                                        boxShadow: isActive ? `0 0 20px ${event.color}` : 'none'
                                    }}
                                />
                            </div>
                        );
                    })}

                    {/* Scrubber */}
                    <div
                        className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 cursor-grab active:cursor-grabbing transition-all duration-300"
                        style={{
                            left: `${progress}%`,
                            backgroundColor: 'var(--bg-primary)',
                            borderColor: timelineEvents[activeIndex].color,
                            boxShadow: `0 0 20px ${timelineEvents[activeIndex].color}`,
                            zIndex: 20
                        }}
                        onMouseDown={handleMouseDown}
                    />
                </div>
            </div>

            {/* Event Details Card */}
            <div
                className="gradient-border rounded-xl p-8 transition-all duration-500"
                style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: timelineEvents[activeIndex].color
                }}
            >
                <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                            background: `linear-gradient(135deg, ${timelineEvents[activeIndex].color}40, ${timelineEvents[activeIndex].color}20)`,
                            color: timelineEvents[activeIndex].color,
                            boxShadow: `0 0 20px ${timelineEvents[activeIndex].color}40`
                        }}
                    >
                        {timelineEvents[activeIndex].icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <Calendar className="w-4 h-4" style={{ color: timelineEvents[activeIndex].color }} />
                            <span className="font-space text-sm" style={{ color: timelineEvents[activeIndex].color }}>
                                {timelineEvents[activeIndex].date}
                            </span>
                        </div>
                        <h4 className="font-orbitron text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                            {timelineEvents[activeIndex].title}
                        </h4>
                        <p className="font-space text-lg mb-3" style={{ color: 'var(--text-secondary)' }}>
                            {timelineEvents[activeIndex].company}
                        </p>
                        <p className="font-jetbrains text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                            {timelineEvents[activeIndex].description}
                        </p>
                    </div>
                </div>

                {/* Navigation Hints */}
                <div className="mt-6 pt-6 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-primary)' }}>
                    <button
                        onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                        disabled={activeIndex === 0}
                        className="font-space text-xs px-4 py-2 rounded-lg border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{
                            borderColor: 'var(--border-primary)',
                            color: 'var(--text-tertiary)'
                        }}
                    >
                        ← PREVIOUS
                    </button>
                    <span className="font-space text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        {activeIndex + 1} / {timelineEvents.length}
                    </span>
                    <button
                        onClick={() => setActiveIndex(Math.min(timelineEvents.length - 1, activeIndex + 1))}
                        disabled={activeIndex === timelineEvents.length - 1}
                        className="font-space text-xs px-4 py-2 rounded-lg border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{
                            borderColor: 'var(--border-primary)',
                            color: 'var(--text-tertiary)'
                        }}
                    >
                        NEXT →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InteractiveTimeline;
