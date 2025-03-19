
import React from 'react';

export function PlatformHeader() {
  return (
    <div className="w-full py-0 px-0">
      <div className="relative overflow-hidden p-8 md:p-12 transition-all duration-500">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-green-500/15 via-blue-500/15 to-purple-500/20 rounded-full blur-3xl"></div>
        
        {/* Main Headline - with enhanced gradient */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
              A Digital Home for Haïti
            </span>
          </h1>
          
          {/* Animated underline with enhanced gradient */}
          <div className="relative h-1.5 w-48 mt-6 mb-10 overflow-hidden rounded-full mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-shimmer"></div>
          </div>
          
          {/* Enhanced subheadline - text alignment changed to left */}
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            A first-of-its-kind platform empowering Haitians worldwide to 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> connect</span>, 
            <span className="font-semibold text-purple-600 dark:text-purple-400"> compete</span>, and 
            <span className="font-semibold text-pink-600 dark:text-pink-400"> collaborate </span>
            — bridging the gap between talent, opportunity, and cultural heritage.
          </p>
        </div>
      </div>
    </div>
  );
}
