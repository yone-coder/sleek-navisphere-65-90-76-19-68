
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    <div className="relative border-b border-gray-100 bg-white">
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex whitespace-nowrap px-1 min-w-max">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={el => (tabsRef.current[index] = el)}
              className={cn(
                "py-3 px-4 text-sm font-medium relative transition-colors",
                activeTab === tab.id 
                  ? "text-red-500" 
                  : "text-gray-600 hover:text-gray-900"
              )}
              onClick={() => onChange(tab.id)}
            >
              <div className="flex items-center">
                {tab.label}
                {tab.count !== undefined && (
                  <span className={cn(
                    "ml-1 text-xs rounded-full px-1.5 py-0.5",
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
          className="absolute bottom-0 h-0.5 bg-red-500"
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
    </div>
  );
}
