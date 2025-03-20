
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type TabItem = {
  id: string;
  label: string;
  count?: number;
};

type ModishTabsProps = {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
};

export function ModishTabs({ tabs, activeTab, onChange }: ModishTabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const { isMobile } = useIsMobile();
  
  // Update indicator position when active tab changes
  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (activeIndex >= 0 && tabsRef.current[activeIndex]) {
      const tabElement = tabsRef.current[activeIndex];
      if (tabElement) {
        const { offsetLeft, offsetWidth } = tabElement;
        setIndicatorStyle({
          left: offsetLeft,
          width: offsetWidth,
        });
      }
    }
  }, [activeTab, tabs]);

  // Handle scroll to bring active tab into view
  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (activeIndex >= 0 && tabsRef.current[activeIndex]) {
      const tabElement = tabsRef.current[activeIndex];
      if (tabElement) {
        tabElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeTab, tabs]);

  return (
    <div className={cn(
      "relative border-b border-gray-200 bg-white",
      isMobile ? "rounded-t-xl mx-2 mt-1" : ""
    )}>
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex whitespace-nowrap py-2 px-1 min-w-max">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={el => (tabsRef.current[index] = el)}
              className={cn(
                "px-4 py-2 text-sm font-medium relative transition-colors",
                activeTab === tab.id ? "text-red-500" : "text-gray-600 hover:text-gray-900"
              )}
              onClick={() => onChange(tab.id)}
            >
              <div className="flex items-center">
                {tab.label}
                {tab.count !== undefined && (
                  <span className={cn(
                    "ml-1.5 text-xs rounded-full px-1.5 py-0.5",
                    activeTab === tab.id
                      ? "bg-red-50 text-red-500"
                      : "bg-gray-100 text-gray-600"
                  )}>
                    {tab.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
        
        {/* Animated indicator */}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-red-500 rounded-full"
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      </div>
      
      {/* Tab hints - show on scroll */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white via-white to-transparent pr-1 pl-6 py-2 pointer-events-none">
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}
