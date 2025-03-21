
import { useState, useEffect } from "react";
import { Search, ShoppingBag, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { apps } from "@/components/apps/data/appsData";
import type { App } from "@/components/apps/types";

interface ExploreTabProps {
  favorites: string[];
  onToggleFavorite: (appName: string) => void;
  suggestedApps: App[];
  favoriteApps: App[];
  updatesCount: number;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

export function ExploreTab({ 
  favorites, 
  onToggleFavorite, 
  suggestedApps, 
  favoriteApps,
  updatesCount,
  isSearchOpen,
  setIsSearchOpen
}: ExploreTabProps) {
  const [selectedApps, setSelectedApps] = useState<App[]>([]);
  const [installingApps, setInstallingApps] = useState<string[]>([]);

  // Initialize selectedApps with all apps
  useEffect(() => {
    setSelectedApps(apps);
  }, []);

  const handleAppClick = (app: App) => {
    // Navigate to app route or install if not installed
    if (favorites.includes(app.name)) {
      // If already installed, just navigate to the app
      console.log(`Opening ${app.name}`);
    } else {
      // If not installed yet, install it
      handleInstallApp(app.name);
    }
  };

  const handleInstallApp = (appName: string) => {
    if (installingApps.includes(appName)) return;
    
    setInstallingApps(prev => [...prev, appName]);
    
    // Simulate installation delay
    setTimeout(() => {
      setInstallingApps(prev => prev.filter(name => name !== appName));
      onToggleFavorite(appName);
    }, 1000);
  };

  return (
    <motion.div 
      className="pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ backgroundColor: "#2a2b81", minHeight: "100vh" }}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-4 pt-8">
        <h2 className="text-3xl font-bold text-white">Services</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-white"
          >
            <Search className="h-6 w-6" />
          </button>
          <button className="p-2 text-white">
            <ShoppingBag className="h-6 w-6" />
          </button>
          <button className="p-2 text-white">
            <MoreVertical className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Apps Grid */}
      <ScrollArea className="h-[calc(100vh-140px)] px-2">
        <div className="grid grid-cols-4 gap-4 px-2 py-4">
          {selectedApps.map((app) => (
            <motion.div
              key={app.name}
              onClick={() => handleAppClick(app)}
              className="flex flex-col items-center"
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-1"
                style={{ 
                  backgroundColor: app.color || "#4285F4",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {installingApps.includes(app.name) ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  app.icon && <app.icon className="h-8 w-8 text-white" />
                )}
              </div>
              <span className="text-xs text-center text-white mt-1">{app.name}</span>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />
    </motion.div>
  );
}
