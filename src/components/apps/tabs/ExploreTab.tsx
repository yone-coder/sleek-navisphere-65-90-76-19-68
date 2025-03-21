
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, ArrowRight, Grid3X3, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppLibraryGrid } from "@/components/apps/grid/AppLibraryGrid";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { apps, appCategories } from "@/components/apps/data/appsData";
import { toast } from "@/hooks/use-toast";
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [installingApps, setInstallingApps] = useState<string[]>([]);

  // Filter apps based on current filters
  const filteredApps = apps.filter(app => {
    if (activeTab === "favorites") return favorites.includes(app.name);
    if (activeTab === "popular") return app.status === "popular";
    if (activeTab === "recent") return app.status === "new";
    if (selectedCategory !== "All") return app.category === selectedCategory;
    return true;
  });

  const handleInstallApp = (appName: string) => {
    if (installingApps.includes(appName)) return;
    
    setInstallingApps(prev => [...prev, appName]);
    
    // Simulate installation delay
    setTimeout(() => {
      setInstallingApps(prev => prev.filter(name => name !== appName));
      onToggleFavorite(appName);
      
      toast({
        title: "Installation Complete",
        description: `${appName} has been installed successfully`,
        duration: 2000,
      });
    }, 1500);
  };

  return (
    <motion.div 
      className="pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Section with iOS-style search bar */}
      <div className="bg-slate-950 px-4 pt-6 pb-2 sticky top-0 z-10">
        <div 
          className="bg-slate-800/60 rounded-2xl flex items-center p-3 mb-4"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <p className="text-gray-400 text-sm">Search apps</p>
        </div>

        {/* Horizontal category tabs */}
        <ScrollArea className="w-full pb-2" orientation="horizontal">
          <div className="flex space-x-2 w-max pb-1">
            <TabButton 
              isActive={selectedCategory === "All"} 
              onClick={() => setSelectedCategory("All")}
            >
              All
            </TabButton>
            {appCategories.map(category => (
              <TabButton 
                key={category} 
                isActive={selectedCategory === category} 
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </TabButton>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* App Library Grid - iOS Style */}
      <div className="px-4 pt-4 bg-slate-950 min-h-screen">
        {filteredApps.length > 0 ? (
          <AppLibraryGrid 
            apps={filteredApps}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onInstall={handleInstallApp}
            installingApps={installingApps}
          />
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-400">No apps found</p>
            <Button 
              variant="outline" 
              className="mt-4 bg-slate-800 text-white border-slate-700"
              onClick={() => setSelectedCategory("All")}
            >
              Show all apps
            </Button>
          </div>
        )}
      </div>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />
    </motion.div>
  );
}

// iOS style tab button
function TabButton({ 
  children, 
  isActive, 
  onClick 
}: { 
  children: React.ReactNode; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-full text-sm whitespace-nowrap transition-colors ${
        isActive 
          ? "bg-blue-500 text-white" 
          : "bg-slate-800/70 text-gray-300 hover:bg-slate-800"
      }`}
    >
      {children}
    </button>
  );
}
