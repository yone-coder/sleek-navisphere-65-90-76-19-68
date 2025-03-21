
import React from 'react';
import { Smartphone, Sparkles, ChevronRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type ModishActionButtonsProps = {
  onVirtualTryOn: () => void;
  onARView: () => void;
  onCompare: () => void;
  onLikeToggle: () => void;
  showVirtualTryOn: boolean;
  showARView: boolean;
  showCompareProducts: boolean;
  isLiked: boolean;
  likeCount: number;
};

export function ModishActionButtons({
  onVirtualTryOn,
  onARView,
  onCompare,
  onLikeToggle,
  showVirtualTryOn,
  showARView,
  showCompareProducts,
  isLiked,
  likeCount
}: ModishActionButtonsProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <button 
        onClick={onVirtualTryOn}
        className={`p-2 rounded-lg flex flex-col items-center justify-center text-center ${
          showVirtualTryOn ? 'bg-purple-100 text-purple-700' : 'bg-gray-50 text-gray-700'
        }`}
      >
        <Smartphone className="h-5 w-5 mb-1" />
        <span className="text-xs">Virtual Try-On</span>
      </button>
      <button 
        onClick={onARView}
        className={`p-2 rounded-lg flex flex-col items-center justify-center text-center ${
          showARView ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-700'
        }`}
      >
        <Sparkles className="h-5 w-5 mb-1" />
        <span className="text-xs">AR View</span>
      </button>
      <button 
        onClick={onCompare}
        className={`p-2 rounded-lg flex flex-col items-center justify-center text-center ${
          showCompareProducts ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-700'
        }`}
      >
        <ChevronRight className="h-5 w-5 mb-1" />
        <span className="text-xs">Compare</span>
      </button>
      <button 
        onClick={onLikeToggle}
        className={`p-2 rounded-lg flex flex-col items-center justify-center text-center ${
          isLiked ? 'bg-red-100 text-red-700' : 'bg-gray-50 text-gray-700'
        }`}
      >
        <Heart className={`h-5 w-5 mb-1 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
        <span className="text-xs">{likeCount}</span>
      </button>
    </div>
  );
}
