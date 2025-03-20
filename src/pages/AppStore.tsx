import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppStoreHeader } from "@/components/appstore/AppStoreHeader";
import { FeaturedApps } from "@/components/appstore/FeaturedApps";
import { AppSection } from "@/components/appstore/AppSection"; 
import { TopCharts } from "@/components/appstore/TopCharts";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CategoryTabs } from "@/components/apps/CategoryTabs";
import { Gamepad2, Grid3X3, Sparkles, Star, Award, Gift, Zap, Menu, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { apps } from "@/components/apps/data/appsData";
import { convertPlatformAppsToAppStore } from "@/components/appstore/utils/appDataAdapter";
import { CategoriesSidebar } from "@/components/appstore/CategoriesSidebar";
import { ContinueSection } from "@/components/appstore/ContinueSection";
import { DiscountBanner } from "@/components/appstore/DiscountBanner";
import { Button } from "@/components/ui/button";

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

// Convert platform apps to app store format
const convertedApps = convertPlatformAppsToAppStore(apps);

const AppStore = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("today");
  const [categoryTab, setCategoryTab] = useState("all");
  const [downloadingApps, setDownloadingApps] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Apps");
  const isMobile = useIsMobile();

  // Create categories based on the converted apps
  const categories = [
    { id: "all", label: "All", icon: categoryIcons.All, count: convertedApps.length },
    { id: "games", label: "Games", icon: categoryIcons.Games, count: convertedApps.filter(app => app.type === "game").length },
    { id: "apps", label: "Apps", icon: categoryIcons.Apps, count: convertedApps.filter(app => app.type === "app").length },
    { id: "arcade", label: "Arcade", icon: categoryIcons.Arcade },
    { id: "featured", label: "Featured", icon: categoryIcons.Featured },
    { id: "editors", label: "Editor's Choice", icon: categoryIcons.Editors },
    { id: "premium", label: "Premium", icon: categoryIcons.Premium },
    { id: "new", label: "New", icon: categoryIcons.New },
  ];

  const handleAppDownload = (appId: number) => {
    if (downloadingApps.includes(appId)) return;
    
    setDownloadingApps(prev => [...prev, appId]);
    
    const appName = convertedApps.find(app => app.id === appId)?.name || "App";
    
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

  // Filter and sort apps for different sections
  const premiumApps = convertedApps.filter(app => app.price > 0);
  const topRatedApps = [...convertedApps].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const newGames = convertedApps.filter(app => app.type === "game").slice(0, 6);
  
  // Apps with "new" status for editor's picks
  const editorsPicks = convertedApps
    .filter(app => app.rating > 4.7)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);
  
  // Apps from different categories for variety
  const updatedApps = convertedApps
    .filter(app => app.type === "app")
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);
    
  // Recent apps (for Continue section)
  const recentApps = convertedApps
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  // Trending now section - currently popular apps
  const trendingApps = convertedApps
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  // Apps that have been significantly updated
  const majorUpdates = convertedApps
    .filter(app => app.type === "app")
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  // Quick actions to popular categories
  const quickCategories = [
    { name: "Games", icon: "🎮", color: "bg-red-500" },
    { name: "Social", icon: "💬", color: "bg-blue-500" },
    { name: "Shopping", icon: "🛍️", color: "bg-green-500" },
    { name: "Education", icon: "📚", color: "bg-yellow-500" },
    { name: "Music", icon: "🎵", color: "bg-purple-500" },
    { name: "Productivity", icon: "📊", color: "bg-cyan-500" },
  ];

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
      
      {/* Categories Sidebar */}
      <CategoriesSidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <div className="pt-[90px] px-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Search icon instead of search bar */}
          <div className="flex-1 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-gray-100"
              onClick={() => navigate("/appsearch")}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="today" className="space-y-6 mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FeaturedApps />
            </motion.div>
            
            {/* Quick Categories */}
            <div className="overflow-x-auto scrollbar-none -mx-3 px-3">
              <div className="flex gap-4 py-2">
                {quickCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center gap-2 min-w-[60px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-xl`}>
                      {category.icon}
                    </div>
                    <span className="text-xs font-medium">{category.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Limited Time Offer */}
            <DiscountBanner
              title="Limited Time Offers"
              subtitle="Premium apps at special prices"
              discount="50%"
              expiresIn="2 days"
              background="bg-gradient-to-r from-purple-500 to-indigo-600"
            />
            
            {/* Continue Section */}
            <ContinueSection recentApps={recentApps} />
            
            {/* Trending Now Section */}
            <AppSection 
              title="Trending Now" 
              subtitle="What everyone's downloading"
              type="app"
              apps={trendingApps}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            {/* Editor's Picks */}
            <AppSection 
              title="Today's Editor's Picks" 
              subtitle="Handpicked apps by our editors"
              type="app"
              apps={editorsPicks}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            {/* Major Updates */}
            <AppSection 
              title="Major Updates" 
              subtitle="Significant new features and improvements"
              type="app"
              apps={majorUpdates}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            {/* Seasonal Banner */}
            <DiscountBanner
              title="Summer Gaming Collection"
              subtitle="Perfect games for summer fun"
              discount="New"
              expiresIn="Limited collection"
              background="bg-gradient-to-r from-orange-400 to-pink-500"
            />
            
            <AppSection 
              title="What We're Playing" 
              subtitle="Handpicked games by our editors"
              type="game"
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            />
          </TabsContent>
          
          <TabsContent value="games" className="space-y-6 mt-0">
            <div className="bg-gray-50 rounded-xl p-3 mb-2">
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
            
            <AppSection 
              title="Top Action Games" 
              subtitle="Exciting action titles for every player"
              type="game"
              apps={convertedApps.filter(app => app.type === "game").slice(0, 6)}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            <div className="grid grid-cols-1 gap-4">
              <TopCharts type="game" limit={isMobile ? 10 : 15} />
            </div>
          </TabsContent>
          
          <TabsContent value="apps" className="space-y-6 mt-0">
            <div className="bg-gray-50 rounded-xl p-3 mb-2">
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
            
            <AppSection 
              title="Essential Apps" 
              subtitle="Must-have apps for your device"
              type="app"
              apps={convertedApps.filter(app => app.type === "app" && app.downloads.includes("M+")).slice(0, 6)}
              onAppDownload={handleAppDownload}
              downloadingApps={downloadingApps}
            />
            
            <div className="grid grid-cols-1 gap-4">
              <TopCharts type="app" limit={isMobile ? 10 : 15} />
            </div>
          </TabsContent>
          
          <TabsContent value="arcade" className="space-y-6 mt-0">
            <div className="bg-gray-50 rounded-xl p-3 mb-2">
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
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AppStore;
