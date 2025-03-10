
import React from 'react';
import { motion } from 'framer-motion';

interface TabItem {
  id: string;
  label: string;
}

interface ModernTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: TabItem[];
  children: React.ReactNode;
}

const ModernTabs: React.FC<ModernTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  tabs,
  children 
}) => {
  return (
    <div className="w-full flex flex-col">
      <div className="px-3 py-2.5 relative">
        <div className="flex items-center justify-center gap-1 p-1 rounded-full bg-gray-100 relative z-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2.5 text-sm font-medium rounded-full flex-1 transition-all duration-200 z-10 outline-none focus:outline-none`}
            >
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 bg-white rounded-full shadow-sm shadow-gray-200/60"
                  layoutId="tab-bubble"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`relative z-10 ${activeTab === tab.id ? 'text-pink-500 font-semibold' : 'text-gray-600'}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default ModernTabs;
