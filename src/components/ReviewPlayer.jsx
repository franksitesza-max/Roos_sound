import { useState, useEffect, useRef } from 'react';

const REVIEWS = [
  {
    client: 'Simonsberg Met',
    initials: 'SM',
    event: 'Residence event - Stellenbosch',
    quote: 'The setup was clean, the levels were right from the first song, and the floor stayed busy until the last track.'
  },
  {
    client: 'Eendrag',
    initials: 'E',
    event: 'Housedance - Stellenbosch',
    quote: 'Michael read the room properly. The sound had punch without getting messy, and every changeover felt smooth.'
  },
  {
    client: 'Huis Marais',
    initials: 'HM',
    event: 'Private residence function',
    quote: 'Professional from arrival to pack-down. The gear looked sharp, the playlist landed, and the whole night felt effortless.'
  },
  {
    client: 'Stellenbosch Choir',
    initials: 'SC',
    event: 'Society event - Stellenbosch',
    quote: 'Clear communication, reliable timing and a polished sound setup. It made the event feel considered from start to finish.'
  }
];

export default function ReviewPlayer() {
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  
  const intervalMs = 6000;
  const tickMs = 30; // Milliseconds per progress tick

  // Detect motion preference on mount
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsPlaying(!prefersReduced);
  }, []);

  // Handle active review transition & play loop
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    if (isPlaying) {
      const startTime = Date.now();
      
      // Update progress bar width smoothly
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const ratio = Math.min(elapsed / intervalMs, 1);
        setProgressWidth(ratio * 100);
      }, tickMs);

      // Transition to next review when timer completes
      timerRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % REVIEWS.length);
        setProgressWidth(0);
      }, intervalMs);
    } else {
      setProgressWidth(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, active]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
    setProgressWidth(0);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % REVIEWS.length);
    setProgressWidth(0);
  };

  const handleToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const activeReview = REVIEWS[active];

  return (
    <div className="review-player reveal visible" data-review-player aria-label="Client reviews carousel">
      <ul className="sr-only">
        {REVIEWS.map((r, i) => (
          <li key={i}>{r.client}</li>
        ))}
      </ul>

      <div className="review-player-main">
        <div className="review-copy">
          <span className="review-kicker">Now Playing</span>
          <h3>{activeReview.client}</h3>
          <p>"{activeReview.quote}"</p>

          <div className="review-footer">
            <div className="review-meta">
              <span className="review-avatar">{activeReview.initials}</span>
              <span>
                <strong>{activeReview.client}</strong>
                <small>{activeReview.event}</small>
              </span>
            </div>

            <div className="review-rating" aria-label="5 out of 5 client rating">
              <div className="rs-stars" aria-label="5 out of 5 stars">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <small>5.0 client rating</small>
            </div>
          </div>
        </div>

        <div className="review-progress" aria-hidden="true">
          <span style={{ width: `${progressWidth}%`, transition: isPlaying ? 'width 0.03s linear' : 'none' }}></span>
        </div>
        <div className="review-times" aria-hidden="true">
          <span>0:00</span>
          <span>1:00</span>
        </div>

        <div className="review-controls">
          <button className="review-control" type="button" onClick={handlePrev} aria-label="Previous review">
            <span className="control-icon control-icon-prev" aria-hidden="true"></span>
          </button>
          <button 
            className="review-control review-control-play" 
            type="button" 
            onClick={handleToggle} 
            aria-label={isPlaying ? 'Pause review carousel' : 'Play review carousel'} 
            aria-pressed={isPlaying}
          >
            <span 
              className={`control-icon ${isPlaying ? 'control-icon-pause' : 'control-icon-play'}`} 
              aria-hidden="true"
            ></span>
          </button>
          <button className="review-control" type="button" onClick={handleNext} aria-label="Next review">
            <span className="control-icon control-icon-next" aria-hidden="true"></span>
          </button>
        </div>

        <div className="review-dots" role="tablist" aria-label="Choose review">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === active ? 'active' : ''}
              onClick={() => {
                setActive(i);
                setProgressWidth(0);
              }}
              aria-label={`Show ${REVIEWS[i].client} review`}
              aria-selected={i === active}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
