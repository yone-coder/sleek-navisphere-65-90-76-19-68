
import React from 'react';
import { Smartphone } from 'lucide-react';

type ModishShareButtonProps = {
  onShare: () => void;
};

export function ModishShareButton({ onShare }: ModishShareButtonProps) {
  return (
    <div className="px-3">
      <button 
        onClick={onShare}
        className="w-full py-2 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center gap-2 text-blue-600"
      >
        <Smartphone className="h-4 w-4" />
        <span className="text-sm font-medium">Share This Product</span>
      </button>
    </div>
  );
}
