
import { useState, useEffect } from "react";
import { View, Text, ScrollView, Platform } from 'react-native';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeTab } from "@/components/apps/tabs/HomeTab";
import { FeedsTab } from "@/components/apps/tabs/FeedsTab";
import { ExploreTab } from "@/components/apps/tabs/ExploreTab";
import { SplashScreen } from "@/components/apps/SplashScreen";
import { toast } from "@/hooks/use-toast";
import { apps } from "@/components/apps/data/appsData";

export default function AppsScreen() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Platform-specific storage handling
    if (Platform.OS === 'web') {
      const saved = localStorage.getItem("favoriteApps");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    // Check if the user has seen the splash screen before (platform-specific)
    if (Platform.OS === 'web') {
      const hasSeenSplash = localStorage.getItem("hasSeenSplashScreen");
      if (!hasSeenSplash) {
        setShowSplash(true);
      }
    }
  }, []);

  useEffect(() => {
    // Platform-specific storage
    if (Platform.OS === 'web') {
      localStorage.setItem("favoriteApps", JSON.stringify(favorites));
    }
  }, [favorites]);

  const handleDismissSplash = () => {
    // Animate the splash screen away
    setShowSplash(false);
    // Remember that the user has seen the splash screen (platform-specific)
    if (Platform.OS === 'web') {
      localStorage.setItem("hasSeenSplashScreen", "true");
    }
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
    <View style={{ flex: 1, overflow: 'hidden' }}>
      {showSplash && <SplashScreen onDismiss={handleDismissSplash} />}
      
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* Platform-specific styling for the header */}
          <View style={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 10, 
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            paddingVertical: 4, 
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            elevation: 1
          }}>
            <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="feeds">Feeds</TabsTrigger>
                <TabsTrigger value="explore">Explore</TabsTrigger>
              </TabsList>
            </Tabs>
          </View>
          
          {/* Content area */}
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <Tabs defaultValue="home" value={activeTab}>
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
