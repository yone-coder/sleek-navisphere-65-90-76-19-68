
import { useState, useEffect } from "react";
import { AppStoreHeader } from "@/components/appstore/AppStoreHeader";
import { FeaturedApps } from "@/components/appstore/FeaturedApps";
import { AppSection } from "@/components/appstore/AppSection"; 
import { TopCharts } from "@/components/appstore/TopCharts";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CategoryTabs } from "@/components/apps/CategoryTabs";
import { Gamepad2, Grid3X3, Sparkles, Star, Award, Gift, Zap } from "lucide-react";
import { appData } from "@/components/appstore/data/appStoreData";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { toast } from "sonner";

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
    if (downloadingApps.includes(appId)) return;
    
    setDownloadingApps(prev => [...prev, appId]);
    
    const appName = appData.find(app => app.id === appId)?.name || "App";
    
    toast.info(`Downloading ${appName}...`, {
      duration: 2000,
    });
    
    setTimeout(() => {
      setDownloadingApps(prev => prev.filter(id => id !== appId));
      toast.success(`${appName} downloaded successfully!`, {
        duration: 3000,
      });
    }, 2000);
  };

  const premiumApps = appData.filter(app => app.price > 0);
  const topRatedApps = [...appData].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const newGames = appData.filter(app => app.type === "game").slice(0, 6);
  
  // Today's editor's picks
  const editorsPicks = appData
    .filter(app => app.rating > 4.7)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);
  
  // Apps with updates
  const updatedApps = appData
    .filter(app => app.type === "app")
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  useEffect(() => {
    // Simulate initial load animation
    const timer = setTimeout(() => {
      toast.info("Welcome to App Store", {
        description: "Discover amazing apps and games!",
        duration: 3000,
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16">
      <AppStoreHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="pt-[90px] px-3 max-w-7xl mx-auto">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="today" className="space-y-5 mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FeaturedApps />
            </motion.div>
            
            <div className="bg-gray-50 rounded-xl p-3 shadow-sm">
              <CategoryTabs categories={categories} />
            </div>
            
            <AppSection 
              title="Today's Editor's Picks" 
              subtitle="Handpicked apps by our editors"
              type="app"
              apps={editorsPicks}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
              highlight={true}
            />
            
            <AppSection 
              title="What We're Playing" 
              subtitle="Handpicked games by our editors"
              type="game"
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TopCharts type="app" />
              <TopCharts type="game" />
            </div>
            
            <AppSection 
              title="Recently Updated" 
              subtitle="Apps with new features and improvements"
              type="app"
              apps={updatedApps}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            <AppSection 
              title="Premium Apps Worth the Price" 
              subtitle="Quality apps that deliver exceptional value"
              type="app"
              apps={premiumApps}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
              highlight={true}
            />
          </TabsContent>
          
          <TabsContent value="games" className="space-y-5 mt-0">
            <div className="bg-gray-50 rounded-xl p-3 shadow-sm mb-4">
              <CategoryTabs categories={categories.filter(c => ["all", "games", "arcade", "premium", "new"].includes(c.id))} />
            </div>
            
            <AppSection 
              title="New Games We Love" 
              subtitle="Our favorite new releases"
              type="game"
              apps={newGames}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
              highlight={true}
            />
            
            <AppSection 
              title="Top Action Games" 
              subtitle="Exciting action titles for every player"
              type="game"
              apps={appData.filter(app => app.type === "game").slice(0, 6)}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            <div className="grid grid-cols-1 gap-4">
              <TopCharts type="game" limit={isMobile ? 10 : 15} />
            </div>
          </TabsContent>
          
          <TabsContent value="apps" className="space-y-5 mt-0">
            <div className="bg-gray-50 rounded-xl p-3 shadow-sm mb-4">
              <CategoryTabs categories={categories.filter(c => ["all", "apps", "premium", "new"].includes(c.id))} />
            </div>
            
            <AppSection 
              title="Top Rated Apps" 
              subtitle="Apps users love the most"
              type="app"
              apps={topRatedApps}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
              highlight={true}
            />
            
            <AppSection 
              title="Essential Apps" 
              subtitle="Must-have apps for your device"
              type="app"
              apps={appData.filter(app => app.type === "app" && app.downloads.includes("B+")).slice(0, 6)}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            <div className="grid grid-cols-1 gap-4">
              <TopCharts type="app" limit={isMobile ? 10 : 15} />
            </div>
          </TabsContent>
          
          <TabsContent value="arcade" className="space-y-5 mt-0">
            <div className="bg-gray-50 rounded-xl p-3 shadow-sm mb-4">
              <CategoryTabs categories={categories.filter(c => ["all", "arcade", "premium", "new"].includes(c.id))} />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white"
            >
              <h2 className="text-xl font-bold mb-1">Apple Arcade</h2>
              <p className="text-sm mb-3">Unlimited access to 200+ games. No ads, no in-app purchases.</p>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-full font-medium text-sm">
                Try it free
              </button>
            </motion.div>
            
            <AppSection 
              title="Apple Arcade Originals" 
              subtitle="Exclusive games only on Arcade"
              type="arcade"
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
              highlight={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppStore;
