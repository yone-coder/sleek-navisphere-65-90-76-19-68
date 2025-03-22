
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeTab } from "@/components/apps/tabs/HomeTab";
import { FeedsTab } from "@/components/apps/tabs/FeedsTab";
import { ExploreTab } from "@/components/apps/tabs/ExploreTab";
import { SplashScreen } from "@/components/apps/SplashScreen";
import { toast } from "@/hooks/use-toast";
import { apps } from "@/components/apps/data/appsData";

export default function Apps() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteApps");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Check if the user has seen the splash screen before
    const hasSeenSplash = localStorage.getItem("hasSeenSplashScreen");
    if (!hasSeenSplash) {
      setShowSplash(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteApps", JSON.stringify(favorites));
  }, [favorites]);

  const handleDismissSplash = () => {
    // Animate the splash screen away
    setShowSplash(false);
    // Remember that the user has seen the splash screen
    localStorage.setItem("hasSeenSplashScreen", "true");
  };

  const handleToggleFavorite = (appName: string) => {
    setFavorites(prev => 
      prev.includes(appName) 
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
    
    toast({
      title: favorites.includes(appName) ? "Removed from favorites" : "Added to favorites",
      description: appName,
      duration: 2000,
    });
  };

  const favoriteApps = apps.filter(app => favorites.includes(app.name));
  const updatesCount = apps.filter(app => app.updates > 0).length;
  const suggestedApps = apps
    .filter(app => app.rating && app.rating >= 4.8)
    .slice(0, 8);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      {showSplash && <SplashScreen onDismiss={handleDismissSplash} />}
      
      <div className="flex-1 overflow-y-auto">
        <div className="h-full flex flex-col">
          {/* Sticky tabs navigation - don't show on 'feeds' tab because it has its own header */}
          <div className={`sticky top-0 z-30 bg-white px-4 py-1 shadow-sm ${activeTab === 'feeds' ? 'hidden' : ''}`}>
            <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="feeds">Feeds</TabsTrigger>
                <TabsTrigger value="explore">Explore</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Content area */}
          <div className="flex-1 px-4">
            <Tabs defaultValue="home" value={activeTab} className="w-full">
              <TabsContent value="home" className="mt-0 p-0">
                <HomeTab />
              </TabsContent>
              
              <TabsContent value="feeds" className="mt-0 p-0">
                <FeedsTab />
              </TabsContent>
              
              <TabsContent value="explore" className="mt-0 p-0">
                <ExploreTab 
                  favorites={favorites} 
                  onToggleFavorite={handleToggleFavorite} 
                  suggestedApps={suggestedApps} 
                  favoriteApps={favoriteApps}
                  updatesCount={updatesCount}
                  isSearchOpen={isSearchOpen}
                  setIsSearchOpen={setIsSearchOpen}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
