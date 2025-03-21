
import React, { forwardRef } from 'react';

type ModishTabsNavigationProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export const ModishTabsNavigation = forwardRef<HTMLDivElement, ModishTabsNavigationProps>(
  ({ activeTab, onTabChange }, ref) => {
    return (
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-1">
        <div className="flex overflow-x-auto scrollbar-none gap-4 pt-2" ref={ref}>
          {['description', 'specs', 'shipping', 'reviews', 'questions', 'similar'].map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`whitespace-nowrap py-3 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab === 'questions' ? 'Q&A' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

ModishTabsNavigation.displayName = 'ModishTabsNavigation';
