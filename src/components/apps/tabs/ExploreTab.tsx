
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Store, Package, Filter, TrendingUp, Star, Clock, Grid, List, Maximize, Minimize, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apps } from "@/components/apps/data/appsData";
import { ExploreFilters } from "@/components/apps/explore/ExploreFilters";
import { AppLibraryGrid } from "@/components/apps/explore/AppLibraryGrid";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { App, AppCategory } from "@/components/apps/types";
import { useNavigate } from "react-router-dom";

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
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedView, setExpandedView] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "rating" | "users">("name");
  const [showUpdatesOnly, setShowUpdatesOnly] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [installingApps, setInstallingApps] = useState<string[]>([]);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredApps = apps.filter(app => {
    if (showUpdatesOnly) return app.updates > 0;
    if (activeTab === "favorites") return favorites.includes(app.name);
    if (activeTab === "frequent") return app.status === "popular";
    if (activeTab === "recent") return app.status === "new";
    if (selectedCategory !== "All") return app.category === selectedCategory;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "users":
        return (b.users?.replace("K+", "000") || "0").localeCompare(a.users?.replace("K+", "000") || "0");
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Refreshed",
        description: "App list has been updated",
        duration: 2000,
      });
    }, 1500);
  };

  const handleInstallApp = (appName: string) => {
    if (installingApps.includes(appName)) return;
    
    setInstallingApps(prev => [...prev, appName]);
    
    setTimeout(() => {
      setInstallingApps(prev => prev.filter(name => name !== appName));
      onToggleFavorite(appName);
      
      toast({
        title: "App Installed",
        description: `${appName} has been installed successfully`,
        duration: 2000,
      });
    }, 1500);
  };

  const handleOpenAppStore = () => {
    navigate("/appstore");
  };

  return (
    <motion.div 
      className="pb-24 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm pt-2 pb-3 px-2 border-b border-gray-100 w-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">All Apps</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={handleOpenAppStore}
            >
              <Store className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={() => setIsDrawerOpen(true)}
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-gray-100/80 p-0.5 h-auto">
            <div className="flex w-full">
              <TabsTrigger 
                value="all" 
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-sm font-medium"
              >
                <Package className="h-4 w-4" />
                <span>All</span>
              </TabsTrigger>
              <TabsTrigger 
                value="recent" 
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-sm font-medium"
              >
                <Clock className="h-4 w-4" />
                <span>Recent</span>
                {updatesCount > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                    {updatesCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="frequent" 
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-sm font-medium"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Frequent</span>
              </TabsTrigger>
            </div>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex justify-between items-center mb-4 mt-4 mx-2">
        <h3 className="text-lg font-medium">
          {showUpdatesOnly ? "Apps with Updates" : 
           activeTab === "favorites" ? "Your Favorites" : 
           activeTab === "frequent" ? "Frequently Used" : 
           activeTab === "recent" ? "Recently Added" : 
           selectedCategory !== "All" ? `${selectedCategory} Apps` : "All Apps"}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            title={viewMode === "grid" ? "List View" : "Grid View"}
          >
            {viewMode === "grid" ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setExpandedView(!expandedView)}
            title={expandedView ? "Compact View" : "Expanded View"}
          >
            {expandedView ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
          
          <Badge variant="outline" className="h-6 px-2">
            {filteredApps.length} apps
          </Badge>
        </div>
      </div>

      <div className="mx-2">
        {filteredApps.length > 0 ? (
          <AppLibraryGrid 
            apps={filteredApps}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            viewMode={viewMode}
          />
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">No apps found matching your criteria.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => {
                setSelectedCategory("All");
                setActiveTab("all");
                setShowUpdatesOnly(false);
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {activeTab === "all" && !showUpdatesOnly && selectedCategory === "All" && (
        <div className="mx-2 mt-6 mb-8">
          <h3 className="text-base font-medium mb-2">Featured App</h3>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-4 shadow-sm border border-blue-100 dark:border-blue-900">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-4 shadow-md">
                <Store className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold">Super App Store</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">All your favorite apps in one place</p>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    Install Now
                  </Button>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />
      
      <ExploreFilters 
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showUpdatesOnly={showUpdatesOnly}
        setShowUpdatesOnly={setShowUpdatesOnly}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        updatesCount={updatesCount}
        expandedView={expandedView}
        setExpandedView={setExpandedView}
      />
    </motion.div>
  );
}
