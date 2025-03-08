
import React, { useState, useEffect } from 'react';

interface Heart {
  id: number;
  x: number;
  size: number;
  opacity: number;
  speed: number;
  delay: number;
  color: string;
}

interface AnimatedHeartsProps {
  isActive: boolean;
}

const AnimatedHearts: React.FC<AnimatedHeartsProps> = ({ isActive }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  
  // Colors for the hearts
  const heartColors = [
    '#ea384c', // Red
    '#D946EF', // Magenta Pink
    '#9b87f5', // Primary Purple
    '#FFDEE2', // Soft Pink
  ];
  
  useEffect(() => {
    if (!isActive) return;
    
    // Create new hearts when activated
    const createHearts = () => {
      const newHearts: Heart[] = [];
      const count = Math.floor(Math.random() * 5) + 3; // 3-7 hearts
      
      for (let i = 0; i < count; i++) {
        newHearts.push({
          id: Date.now() + i,
          x: Math.random() * 100, // Random horizontal position (0-100%)
          size: Math.random() * 15 + 15, // Size between 15-30px
          opacity: 0.7 + Math.random() * 0.3, // Opacity between 0.7-1
          speed: Math.random() * 2 + 2, // Speed of floating up
          delay: Math.random() * 200, // Staggered start
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
        });
      }
      
      setHearts(prev => [...prev, ...newHearts]);
    };
    
    // Create initial batch of hearts
    createHearts();
    
    // Create more hearts periodically while active
    const interval = setInterval(createHearts, 300);
    
    // Clean up old hearts
    const cleanup = setInterval(() => {
      setHearts(prev => prev.filter(heart => {
        const elapsedTime = Date.now() - heart.id;
        return elapsedTime < 3000; // Keep hearts for 3 seconds
      }));
    }, 1000);
    
    return () => {
      clearInterval(interval);
      clearInterval(cleanup);
    };
  }, [isActive]);
  
  return (
    <div className="absolute inset-x-0 bottom-0 h-full overflow-hidden pointer-events-none">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.x}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            opacity: heart.opacity,
            animationDuration: `${3 / heart.speed}s`,
            animationDelay: `${heart.delay}ms`,
            color: heart.color,
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-full h-full"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default AnimatedHearts;
