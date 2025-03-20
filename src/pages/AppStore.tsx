
import { useState } from "react";
import { AppStoreHeader } from "@/components/appstore/AppStoreHeader";
import { FeaturedApps } from "@/components/appstore/FeaturedApps";
import { AppSection } from "@/components/appstore/AppSection"; 
import { TopCharts } from "@/components/appstore/TopCharts";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CategoryTabs } from "@/components/apps/CategoryTabs";
import { Gamepad2, Grid3X3, Sparkles, Star, Award, Gift, Zap } from "lucide-react";
import { appData } from "@/components/appstore/data/appStoreData";
import { useIsMobile } from "@/hooks/use-mobile";

const categoryIcons = {
  All: Grid3X3,
  Games: Gamepad2,
  Apps: Grid3X3,
  Arcade: Sparkles,
  Featured: Star,
  Editors: Award,
  Premium: Gift,
  New: Zap,
};

const categories = [
  { id: "all", label: "All", icon: categoryIcons.All, count: appData.length },
  { id: "games", label: "Games", icon: categoryIcons.Games, count: appData.filter(app => app.type === "game").length },
  { id: "apps", label: "Apps", icon: categoryIcons.Apps, count: appData.filter(app => app.type === "app").length },
  { id: "arcade", label: "Arcade", icon: categoryIcons.Arcade },
  { id: "featured", label: "Featured", icon: categoryIcons.Featured },
  { id: "editors", label: "Editor's Choice", icon: categoryIcons.Editors },
  { id: "premium", label: "Premium", icon: categoryIcons.Premium },
  { id: "new", label: "New", icon: categoryIcons.New },
];

const AppStore = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [categoryTab, setCategoryTab] = useState("all");
  const [downloadingApps, setDownloadingApps] = useState<number[]>([]);
  const isMobile = useIsMobile();

  const handleAppDownload = (appId: number) => {
    setDownloadingApps(prev => [...prev, appId]);
    setTimeout(() => {
      setDownloadingApps(prev => prev.filter(id => id !== appId));
    }, 2000);
  };

  const premiumApps = appData.filter(app => app.price > 0);
  const topRatedApps = [...appData].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const newGames = appData.filter(app => app.type === "game").slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <AppStoreHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="pt-[108px] sm:pt-[120px] px-2 sm:px-4 max-w-7xl mx-auto">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="today" className="space-y-6 sm:space-y-8 mt-0">
            <FeaturedApps />
            
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm">
              <CategoryTabs categories={categories} />
            </div>
            
            <AppSection 
              title="What We're Playing" 
              subtitle="Handpicked games by our editors"
              type="game"
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <TopCharts type="app" />
              <TopCharts type="game" />
            </div>
            
            <AppSection 
              title="Premium Apps Worth the Price" 
              subtitle="Quality apps that deliver exceptional value"
              type="app"
              apps={premiumApps}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
          </TabsContent>
          
          <TabsContent value="games" className="space-y-6 sm:space-y-8 mt-0">
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm mb-4 sm:mb-6">
              <CategoryTabs categories={categories.filter(c => ["all", "games", "arcade", "premium", "new"].includes(c.id))} />
            </div>
            
            <AppSection 
              title="New Games We Love" 
              subtitle="Our favorite new releases"
              type="game"
              apps={newGames}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            <div className="grid grid-cols-1 gap-4 sm:gap-8">
              <TopCharts type="game" limit={isMobile ? 10 : 15} />
            </div>
          </TabsContent>
          
          <TabsContent value="apps" className="space-y-6 sm:space-y-8 mt-0">
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm mb-4 sm:mb-6">
              <CategoryTabs categories={categories.filter(c => ["all", "apps", "premium", "new"].includes(c.id))} />
            </div>
            
            <AppSection 
              title="Top Rated Apps" 
              subtitle="Apps users love the most"
              type="app"
              apps={topRatedApps}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            <div className="grid grid-cols-1 gap-4 sm:gap-8">
              <TopCharts type="app" limit={isMobile ? 10 : 15} />
            </div>
          </TabsContent>
          
          <TabsContent value="arcade" className="space-y-6 sm:space-y-8 mt-0">
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm mb-4 sm:mb-6">
              <CategoryTabs categories={categories.filter(c => ["all", "arcade", "premium", "new"].includes(c.id))} />
            </div>
            
            <AppSection 
              title="Apple Arcade Originals" 
              subtitle="Exclusive games only on Arcade"
              type="app"
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppStore;
