import { Eye, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function PortfolioCounter() {
  const [visits, setVisits] = useState(null);
  const [likes, setLikes] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasIncrementedVisit = useRef(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    // Check if user has already liked
    const liked = localStorage.getItem('portfolio-liked');
    setHasLiked(liked === 'true');

    // Increment visit counter on page load (only once)
    if (!hasIncrementedVisit.current) {
      hasIncrementedVisit.current = true;
      incrementVisits();
    }
    
    // Always fetch current like count from server
    fetchLikes();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const incrementVisits = async () => {
    try {
      const response = await fetch('/.netlify/functions/counter?action=up&counter=adarsh04-p-count');
      const data = await response.json();
      console.log('Visit response:', data);
      setVisits(data.data?.up_count || 0);
    } catch (error) {
      console.error('Failed to increment visits:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikes = async () => {
    try {
      // Add timestamp to bypass any caching
      const timestamp = Date.now();
      const response = await fetch(`/.netlify/functions/counter?action=get&counter=adarsh04-p-likes&t=${timestamp}`);
      const data = await response.json();
      console.log('Likes response on fetch:', data);
      
      const serverCount = data.data?.up_count || 0;
      
      // Check if we have a stored optimistic count
      const storedCount = localStorage.getItem('portfolio-like-count');
      
      if (isMounted.current) {
        // Use the higher of server count or stored count (to handle API buffering delay)
        const finalCount = storedCount ? Math.max(serverCount, parseInt(storedCount, 10)) : serverCount;
        setLikes(finalCount);
        
        // Update stored count if server is higher
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

    // Store current value before optimistic update
    const currentLikes = likes || 0;
    
    // Optimistically update UI immediately
    const newCount = currentLikes + 1;
    setLikes(newCount);
    setHasLiked(true);
    localStorage.setItem('portfolio-liked', 'true');
    // Store the optimistic count so we don't overwrite it on refresh
    localStorage.setItem('portfolio-like-count', newCount.toString());

    try {
      const response = await fetch('/.netlify/functions/counter?action=up&counter=adarsh04-p-likes');
      
      if (!response.ok) {
        throw new Error('Failed to increment like');
      }
      
      const data = await response.json();
      console.log('Like response after click:', data);
      
      // Update with server value only if it's higher (to handle race conditions)
      if (data.data?.up_count && data.data.up_count >= newCount) {
        setLikes(data.data.up_count);
        localStorage.setItem('portfolio-like-count', data.data.up_count.toString());
      }
    } catch (error) {
      console.error('Failed to like:', error);
      // Revert on error and allow retry
      setLikes(currentLikes);
      setHasLiked(false);
      localStorage.removeItem('portfolio-liked');
      localStorage.removeItem('portfolio-like-count');
      alert('Failed to register like. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
        <div className="gradient-border rounded-lg px-4 py-3 backdrop-blur-sm" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <p className="font-jetbrains text-xs" style={{ color: 'var(--text-tertiary)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
      {/* Visit Counter */}
      <div 
        className="gradient-border rounded-lg px-4 py-3 backdrop-blur-sm flex items-center gap-3"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <Eye className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
        <div>
          <p className="font-jetbrains text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Visits
          </p>
          <p className="font-orbitron text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {visits?.toLocaleString() || '---'}
          </p>
        </div>
      </div>

      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={hasLiked}
        className={`gradient-border rounded-lg px-4 py-3 backdrop-blur-sm flex items-center gap-3 transition-all duration-300 ${
          hasLiked ? 'cursor-not-allowed opacity-75' : 'hover:scale-105 cursor-pointer'
        }`}
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        <Heart 
          className={`w-5 h-5 transition-all duration-300 ${hasLiked ? 'fill-current' : ''}`}
          style={{ color: hasLiked ? '#ff0080' : 'var(--accent-pink)' }} 
        />
        <div>
          <p className="font-jetbrains text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {hasLiked ? 'Liked!' : 'Like'}
          </p>
          <p className="font-orbitron text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {likes?.toLocaleString() || '---'}
          </p>
        </div>
      </button>
    </div>
  );
}
