
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type GalleryFullscreenProps = {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  productName: string;
  onClose: () => void;
  onChangeImage: (index: number) => void;
};

export function GalleryFullscreen({
  isOpen,
  images,
  currentIndex,
  productName,
  onClose,
  onChangeImage
}: GalleryFullscreenProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-60 bg-black bg-opacity-50 text-white rounded-full p-1"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <img
        src={images[currentIndex]}
        alt={productName}
        className="max-w-full max-h-full object-contain"
      />
      
      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onChangeImage(index)}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all",
              currentIndex === index
                ? "bg-white w-4"
                : "bg-gray-500"
            )}
          />
        ))}
      </div>
    </div>
  );
}
