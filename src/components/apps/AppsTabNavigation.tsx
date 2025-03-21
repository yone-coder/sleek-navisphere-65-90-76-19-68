
import React from 'react';
import { Home, ListFilter, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

interface AppsTabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppsTabNavigation({ activeTab, onTabChange }: AppsTabNavigationProps) {
  const tabs: Tab[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="h-5 w-5" />
    },
    {
      id: 'feeds',
      label: 'Feeds',
      icon: <ListFilter className="h-5 w-5" />
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: <Search className="h-5 w-5" />
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/10 backdrop-blur-xl border-t border-gray-200/20 pb-safe z-50">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex flex-col items-center pt-2 pb-2 flex-1",
              activeTab === tab.id 
                ? "text-blue-500" 
                : "text-gray-500"
            )}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon}
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
