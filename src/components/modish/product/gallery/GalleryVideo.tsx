
import React from 'react';
import { ChevronLeft } from 'lucide-react';

type GalleryVideoProps = {
  isActive: boolean;
  onClose: () => void;
};

export function GalleryVideo({ isActive, onClose }: GalleryVideoProps) {
  if (!isActive) return null;
  
  return (
    <div className="absolute inset-0 bg-black z-20 flex items-center justify-center">
      <div className="relative w-full h-full">
        <video 
          className="w-full h-full object-contain" 
          controls
          autoPlay
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-black bg-opacity-50 text-white rounded-full p-1"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
