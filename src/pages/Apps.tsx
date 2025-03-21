import { useState, useEffect } from "react";
import { AppsHeader } from "@/components/apps/AppsHeader";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { AppsTabNavigation } from "@/components/apps/AppsTabNavigation";
import { HomeTab } from "@/components/apps/tabs/HomeTab";
import { FeedsTab } from "@/components/apps/tabs/FeedsTab";
import { ExploreTab } from "@/components/apps/tabs/ExploreTab";
import { apps } from "@/components/apps/data/appsData";

export default function Apps() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'feeds' | 'explore'>('home');

  // Update page title when tab changes
  useEffect(() => {
    document.title = `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} - Apps`;
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'feeds':
        return <FeedsTab />;
      case 'explore':
        return <ExploreTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      <div className="pt-safe bg-gradient-to-b from-gray-50 to-white">
        {/* Top Tab Navigation */}
        <AppsTabNavigation 
          activeTab={activeTab} 
          onTabChange={(tab) => setActiveTab(tab as 'home' | 'feeds' | 'explore')} 
          position="top" 
        />
        
        {activeTab === 'explore' && <AppsHeader onOpenSearch={() => setIsSearchOpen(true)} />}
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {renderTabContent()}
      </div>

      {/* Bottom Tab Navigation - Keeping for reference but can be removed */}
      {/* <AppsTabNavigation 
        activeTab={activeTab} 
        onTabChange={(tab) => setActiveTab(tab as 'home' | 'feeds' | 'explore')} 
      /> */}

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />
    </div>
  );
}
