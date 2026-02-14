import { Eye, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const AnimatedNumber = ({ value, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!value) return;
    
    const startTime = Date.now();
    const startValue = displayValue;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentValue = Math.floor(startValue + (value - startValue) * progress);
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue?.toLocaleString()}</>;
};

const Particle = ({ x, y, color, delay }) => {
  return (
    <div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: color,
        animation: `particle-burst 0.8s ease-out ${delay}ms forwards`,
      }}
    />
  );
};

export default function PortfolioCounter() {
  const [visits, setVisits] = useState(null);
  const [likes, setLikes] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const [animateLike, setAnimateLike] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [showVisits, setShowVisits] = useState(false);
  const [particles, setParticles] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const hasIncrementedVisit = useRef(false);
  const isMounted = useRef(true);
  const buttonRef = useRef(null);

  useEffect(() => {
    isMounted.current = true;

    const liked = localStorage.getItem('portfolio-liked');
    setHasLiked(liked === 'true');

    if (!hasIncrementedVisit.current) {
      hasIncrementedVisit.current = true;
      incrementVisits();
    }

    fetchLikes();
    setTimeout(() => setShowVisits(true), 300);

    return () => {
      isMounted.current = false;
    };
  }, []);

  const playClickSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const speakThanks = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Thanks for the support!');
      utterance.rate = 1.2;
      utterance.pitch = 1.1;
      utterance.volume = 0.5;
      window.speechSynthesis.speak(utterance);
    }
  };

  const createParticleBurst = () => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newParticles = [];
    const colors = ['#ff0080', '#00ffff', '#a855f7', '#fbbf24'];
    
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const velocity = 50 + Math.random() * 30;
      
      newParticles.push({
        id: Date.now() + i,
        x: centerX + Math.cos(angle) * velocity,
        y: centerY + Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: i * 20,
      });
    }
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const incrementVisits = async () => {
    try {
      const response = await fetch('/.netlify/functions/counter?action=up&counter=adarsh04-p-count');
      const data = await response.json();
      setVisits(data.data?.up_count || 0);
    } catch (error) {
      console.error('Failed to increment visits:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikes = async () => {
    try {
      const timestamp = Date.now();
      const response = await fetch(`/.netlify/functions/counter?action=get&counter=adarsh04-p-likes&t=${timestamp}`);
      const data = await response.json();

      const serverCount = data.data?.up_count || 0;
      const storedCount = localStorage.getItem('portfolio-like-count');

      if (isMounted.current) {
        const finalCount = storedCount ? Math.max(serverCount, parseInt(storedCount, 10)) : serverCount;
        setLikes(finalCount);

        if (serverCount >= finalCount) {
          localStorage.setItem('portfolio-like-count', serverCount.toString());
        }
      }
    } catch (error) {
      console.error('Failed to fetch likes:', error);
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;

    const currentLikes = likes || 0;
    const newCount = currentLikes + 1;

    setLikes(newCount);
    setHasLiked(true);
    localStorage.setItem('portfolio-liked', 'true');
    localStorage.setItem('portfolio-like-count', newCount.toString());

    setAnimateLike(true);
    setShowPlusOne(true);
    setShowThanks(true);
    setShowLeaderboard(true);
    playClickSound();
    createParticleBurst();
    speakThanks();

    setTimeout(() => setAnimateLike(false), 400);
    setTimeout(() => setShowPlusOne(false), 1200);
    setTimeout(() => setShowThanks(false), 3000);
    setTimeout(() => setShowLeaderboard(false), 4000);

    try {
      const response = await fetch('/.netlify/functions/counter?action=up&counter=adarsh04-p-likes');

      if (!response.ok) throw new Error('Failed to increment like');

      const data = await response.json();

      if (data.data?.up_count && data.data.up_count >= newCount) {
        setLikes(data.data.up_count);
        localStorage.setItem('portfolio-like-count', data.data.up_count.toString());
      }
    } catch (error) {
      setLikes(currentLikes);
      setHasLiked(false);
      localStorage.removeItem('portfolio-liked');
      localStorage.removeItem('portfolio-like-count');
      alert('Failed to register like. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="fixed bottom-6 right-2 z-40">
        <p className="text-xs text-gray-400">Loading...</p>
      </div>
    );
  }

  const likeMilestone = likes >= 100;
  const visitMilestone = visits >= 1000;

  return (
    <div className="fixed bottom-6 right-2 z-40 flex flex-col gap-3">
      <style>{`
        @keyframes particle-burst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx, 0), var(--ty, 0)) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes leaderboard-slide {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Global Leaderboard Notification */}
      {showLeaderboard && (
        <div 
          className="absolute -top-16 right-0 px-4 py-2 rounded-lg backdrop-blur-md border"
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
            borderColor: 'var(--accent-pink)',
            animation: 'leaderboard-slide 0.5s ease-out'
          }}
        >
          <p className="font-orbitron text-xs text-pink-400">
            🎉 You're awesome! #{likes}
          </p>
        </div>
      )}

      {/* Visit Counter */}
      <div
        className={`gradient-border rounded-lg px-4 py-3 backdrop-blur-sm flex items-center gap-3 transition-all duration-500 ${
          showVisits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <Eye className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
        <div>
          <p className="font-jetbrains text-xs text-gray-400">
            Visitors Logged
          </p>
          <p className="font-orbitron text-lg font-bold">
            <AnimatedNumber value={visits} duration={1500} />
            {visitMilestone && <span className="ml-2 text-yellow-400">🏆</span>}
          </p>
        </div>
      </div>

      {/* Like Button */}
      <button
        ref={buttonRef}
        onClick={handleLike}
        disabled={hasLiked}
        className={`relative gradient-border rounded-lg px-4 py-3 backdrop-blur-sm flex items-center gap-3 transition-all duration-300 overflow-visible ${
          hasLiked ? 'opacity-80' : 'hover:scale-105'
        }`}
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          boxShadow: hasLiked ? '0 0 15px rgba(255,0,128,0.5)' : 'none'
        }}
      >
        {/* Particle Burst */}
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            x={particle.x}
            y={particle.y}
            color={particle.color}
            delay={particle.delay}
          />
        ))}

        {showPlusOne && (
          <span className="absolute -top-8 right-3 text-pink-400 font-orbitron text-2xl font-bold animate-bounce">
            +1
          </span>
        )}

        <Heart
          className={`w-5 h-5 transition-all duration-300 ${
            hasLiked ? 'fill-current scale-110' : ''
          } ${animateLike ? 'scale-150' : ''}`}
          style={{ color: likeMilestone ? '#FFD700' : '#ff0080' }}
        />

        <div>
          <p className="font-jetbrains text-xs text-gray-400">
            {hasLiked ? 'Liked!' : 'Appreciate'}
          </p>

          <p className={`font-orbitron text-lg font-bold transition-all duration-300 ${animateLike ? 'scale-110' : ''}`}>
            <AnimatedNumber value={likes} duration={800} />
            {likeMilestone && <span className="ml-2 text-yellow-400">⭐</span>}
          </p>

          {showThanks && (
            <p className="text-[10px] mt-1 text-pink-400 animate-pulse">
              Thanks for the support! 💖
            </p>
          )}
        </div>
      </button>
    </div>
  );
}
