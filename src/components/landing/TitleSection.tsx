
import React from 'react';
import { Users, Trophy, ShoppingCart, Home } from 'lucide-react';

export function TitleSection() {
  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* Main Title with Gradient */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
          Mima
        </h1>
        
        {/* Subtitle with Icons */}
        <div className="flex items-center justify-center gap-2 text-lg md:text-xl font-medium text-gray-800">
          <span>A Digital Home for</span>
          <div className="flex items-center gap-4 px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-full shadow-sm border border-gray-100">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-[#9b87f5]" />
              <span>Community</span>
            </div>
            <span className="text-gray-400">&middot;</span>
            <div className="flex items-center gap-1">
              <ShoppingCart className="w-4 h-4 text-[#9b87f5]" />
              <span>Commerce</span>
            </div>
            <span className="text-gray-400">&middot;</span>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-[#9b87f5]" />
              <span>Competition</span>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-full opacity-50" />
      </div>
    </div>
  );
}
