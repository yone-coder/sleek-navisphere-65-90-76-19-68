
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeTab } from "@/components/apps/tabs/HomeTab";
import { FeedsTab } from "@/components/apps/tabs/FeedsTab";
import { ExploreTab } from "@/components/apps/tabs/ExploreTab";
import { SplashScreen } from "@/components/apps/SplashScreen";
import { toast } from "@/hooks/use-toast";
import { apps } from "@/components/apps/data/appsData";
import type { App } from "@/components/apps/types";

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
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-slate-950">
      {showSplash && <SplashScreen onDismiss={handleDismissSplash} />}
      
      <div className="flex-1 overflow-y-auto">
        <div className="h-full flex flex-col">
          {/* Make the tabs section sticky */}
          <div className="sticky top-0 z-20 bg-slate-950 px-4 py-2 shadow-sm border-b border-slate-800">
            <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-2 bg-slate-800/50">
                <TabsTrigger value="home" className="text-white data-[state=active]:bg-slate-700">Home</TabsTrigger>
                <TabsTrigger value="feeds" className="text-white data-[state=active]:bg-slate-700">Feeds</TabsTrigger>
                <TabsTrigger value="explore" className="text-white data-[state=active]:bg-slate-700">Explore</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Content area */}
          <div className="flex-1">
            <Tabs defaultValue="home" value={activeTab} className="w-full">
              <TabsContent value="home" className="mt-0 p-0 h-full">
                <HomeTab />
              </TabsContent>
              
              <TabsContent value="feeds" className="mt-0 p-0 h-full">
                <FeedsTab />
              </TabsContent>
              
              <TabsContent value="explore" className="mt-0 p-0 h-full">
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
