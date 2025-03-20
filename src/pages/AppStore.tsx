
import { useState } from "react";
import { AppStoreHeader } from "@/components/appstore/AppStoreHeader";
import { FeaturedApps } from "@/components/appstore/FeaturedApps";
import { AppSection } from "@/components/appstore/AppSection"; 
import { TopCharts } from "@/components/appstore/TopCharts";
import { AppStoreTabs } from "@/components/appstore/AppStoreTabs";

const AppStore = () => {
  const [activeTab, setActiveTab] = useState("today");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Header */}
      <AppStoreHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="pt-[120px] px-4 max-w-7xl mx-auto">
        {activeTab === "today" && (
          <div className="space-y-8">
            <FeaturedApps />
            <AppSection 
              title="What We're Playing" 
              subtitle="Handpicked games by our editors"
              type="game"
            />
            <AppSection 
              title="Top Apps This Week" 
              subtitle="Popular apps everyone's downloading"
              type="app"
            />
          </div>
        )}
        
        {activeTab === "games" && (
          <div className="space-y-8">
            <AppSection 
              title="New Games We Love" 
              subtitle="Our favorite new releases"
              type="game"
            />
            <TopCharts type="game" />
          </div>
        )}
        
        {activeTab === "apps" && (
          <div className="space-y-8">
            <AppSection 
              title="Essential Apps" 
              subtitle="Must-have apps for your device"
              type="app"
            />
            <TopCharts type="app" />
          </div>
        )}
        
        {activeTab === "arcade" && (
          <div className="space-y-8">
            <AppSection 
              title="Apple Arcade Originals" 
              subtitle="Exclusive games only on Arcade"
              type="arcade"
            />
          </div>
        )}
      </div>
      
      {/* Bottom Tabs */}
      <AppStoreTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default AppStore;
