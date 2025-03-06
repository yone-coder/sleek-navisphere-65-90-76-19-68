
import React from 'react';

export function StoryAnimations() {
  return (
    <style>{`
      @keyframes pageExitToLeft {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-10%); opacity: 0; }
      }
      
      @keyframes pageExitToRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(10%); opacity: 0; }
      }
      
      @keyframes pageEnterFromRight {
        from { transform: translateX(10%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes pageEnterFromLeft {
        from { transform: translateX(-10%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slideUpIn {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      .animate-slide-up-in {
        animation: slideUpIn 0.4s ease-out forwards;
      }
      
      .animate-page-exit-to-left {
        animation: pageExitToLeft 0.5s ease-in-out forwards;
      }
      
      .animate-page-exit-to-right {
        animation: pageExitToRight 0.5s ease-in-out forwards;
      }
      
      .animate-page-enter-from-right {
        animation: pageEnterFromRight 0.5s ease-in-out forwards;
      }
      
      .animate-page-enter-from-left {
        animation: pageEnterFromLeft 0.5s ease-in-out forwards;
      }
    `}</style>
  );
}
