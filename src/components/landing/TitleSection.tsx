
import React from 'react';
import { Users, Trophy, ShoppingCart } from 'lucide-react';

export function TitleSection() {
  return (
    <div className="w-full py-4 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        {/* Main Title with Enhanced Gradient */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
          Mima
        </h1>
        
        {/* Subtitle with Icons */}
        <div className="flex items-center justify-center gap-2 text-lg md:text-xl font-medium text-gray-800">
          <span>A Digital Home for</span>
          <div className="flex items-center gap-4 px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-500" />
              <span>Community</span>
            </div>
            <span className="text-gray-400">&middot;</span>
            <div className="flex items-center gap-1">
              <ShoppingCart className="w-4 h-4 text-purple-500" />
              <span>Commerce</span>
            </div>
            <span className="text-gray-400">&middot;</span>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-pink-500" />
              <span>Competition</span>
            </div>
          </div>
        </div>

        {/* Enhanced Decorative Line */}
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-70" />
      </div>
    </div>
  );
}
