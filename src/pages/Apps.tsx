
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeTab } from "@/components/apps/tabs/HomeTab";
import { FeedsTab } from "@/components/apps/tabs/FeedsTab";
import { ExploreTab } from "@/components/apps/tabs/ExploreTab";
import { AppsHeader } from "@/components/apps/AppsHeader";
import { toast } from "@/hooks/use-toast";
import { apps } from "@/components/apps/data/appsData";
import type { App } from "@/components/apps/types";

export default function Apps() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteApps");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoriteApps", JSON.stringify(favorites));
  }, [favorites]);

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
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
        <AppsHeader onOpenSearch={() => setIsSearchOpen(true)} />
        
        <div className="h-full flex flex-col">
          <div className="px-4 py-2">
            <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-2">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="feeds">Feeds</TabsTrigger>
                <TabsTrigger value="explore">Explore</TabsTrigger>
              </TabsList>
              
              <TabsContent value="home" className="mt-0">
                <HomeTab favorites={favoriteApps} onToggleFavorite={handleToggleFavorite} />
              </TabsContent>
              
              <TabsContent value="feeds" className="mt-0">
                <FeedsTab />
              </TabsContent>
              
              <TabsContent value="explore" className="mt-0">
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
