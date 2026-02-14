import { Eye, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function PortfolioCounter() {
  const [visits, setVisits] = useState(null);
  const [likes, setLikes] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const [animateLike, setAnimateLike] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [showVisits, setShowVisits] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const hasIncrementedVisit = useRef(false);
  const isMounted = useRef(true);

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
    const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_7c1a4b1b2f.mp3?filename=click-124467.mp3");
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
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
    playClickSound();
    triggerConfetti();

    setTimeout(() => setAnimateLike(false), 400);
    setTimeout(() => setShowPlusOne(false), 900);
    setTimeout(() => setShowThanks(false), 2500);

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

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 animate-pulse bg-gradient-to-r from-pink-500/10 via-cyan-500/10 to-purple-500/10" />
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
            {visits?.toLocaleString()}
            {visitMilestone && <span className="ml-2 text-yellow-400">🏆</span>}
          </p>
        </div>
      </div>

      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={hasLiked}
        className={`relative gradient-border rounded-lg px-4 py-3 backdrop-blur-sm flex items-center gap-3 transition-all duration-300 ${
          hasLiked ? 'opacity-80' : 'hover:scale-105'
        }`}
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          boxShadow: hasLiked ? '0 0 15px rgba(255,0,128,0.5)' : 'none'
        }}
      >
        {showPlusOne && (
          <span className="absolute -top-2 right-3 text-pink-400 text-xs font-bold animate-bounce">
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

          <p className={`font-orbitron text-lg font-bold ${animateLike ? 'scale-110' : ''}`}>
            {likes?.toLocaleString()}
            {likeMilestone && <span className="ml-2 text-yellow-400">⭐</span>}
          </p>

          {showThanks && (
            <p className="text-[10px] mt-1 text-pink-400">
              Thanks for the support ❤️
            </p>
          )}
        </div>
      </button>
    </div>
  );
}
