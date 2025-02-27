
import React from 'react';

export function VideoSection() {
  return (
    <div className="w-full bg-gray-900 aspect-video relative">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
