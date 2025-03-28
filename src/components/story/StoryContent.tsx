
import React from 'react';
import { StoryContentType } from './storyContent';

type StoryContentProps = {
  currentContent: StoryContentType;
  currentPage: number;
  fontSize: number;
  getAnimationClasses: () => string;
  getEnterAnimationClasses: () => string;
  isPageAnimating: boolean;
};

export function StoryContent({
  currentContent,
  currentPage,
  fontSize,
  getAnimationClasses,
  getEnterAnimationClasses,
  isPageAnimating
}: StoryContentProps) {
  return (
    <>
      <div className={`transition-all duration-500 ${getAnimationClasses()}`}>
        {currentPage === 1 && (
          <div className="mb-12 text-center">
            <p className="text-lg text-gray-600">by {currentContent.author}</p>
          </div>
        )}
        
        <div className="mb-8">
          <div className="flex items-center text-gray-600 mb-6 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Reading time: {currentContent.readingTime}</span>
          </div>
        </div>
        
        <div 
          className="prose max-w-none mb-8 relative" 
          style={{ fontSize: `${fontSize}px` }}
        >
          {currentContent.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="leading-relaxed mb-6 tracking-wide">
              {paragraph}
            </p>
          ))}
          
          {currentContent.image && (
            <div className="my-12 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={currentContent.image} 
                alt="Story illustration" 
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
      
      {isPageAnimating && (
        <div className={`absolute inset-0 pointer-events-none ${getEnterAnimationClasses()}`}>
          <div className="h-full opacity-0">Transition placeholder</div>
        </div>
      )}
    </>
  );
}
