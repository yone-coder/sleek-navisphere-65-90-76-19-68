
import React, { useRef, useEffect } from 'react';

export function VideoSection() {
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Adjust sticky container height based on viewport
  useEffect(() => {
    const updateHeight = () => {
      if (videoContainerRef.current) {
        // Set a maximum height for the video container
        const maxHeight = Math.min(window.innerHeight * 0.6, 500);
        videoContainerRef.current.style.height = `${maxHeight}px`;
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div 
      ref={videoContainerRef}
      className="w-full bg-gray-900 sticky top-0 z-30 overflow-hidden"
    >
      <div className="relative w-full h-full">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
