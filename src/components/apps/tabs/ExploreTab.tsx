
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, Filter, Menu, Package, Download, Bell, Grid, List, 
  ArrowUpDown, RefreshCw, Clock, ArrowLeft, ArrowRight, LayoutGrid, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "folder">("grid");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "users">("name");
  const [showUpdatesOnly, setShowUpdatesOnly] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [installingApps, setInstallingApps] = useState<string[]>([]);

  // Filter apps based on current filters
  const filteredApps = apps.filter(app => {
    if (showUpdatesOnly) return app.updates > 0;
    if (activeTab === "favorites") return favorites.includes(app.name);
    if (activeTab === "popular") return app.status === "popular";
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
    
    // Simulate refresh delay
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
      className="pb-24 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Section */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">App Library</h2>
          <div className="flex gap-2">
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>App Categories</DrawerTitle>
                    <DrawerDescription>
                      Browse apps by category or use filters to find what you need.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4">
                    <ScrollArea className="h-[50vh] px-1">
                      <div className="space-y-1">
                        <Button
                          variant={selectedCategory === "All" ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => {
                            setSelectedCategory("All");
                            setIsDrawerOpen(false);
                          }}
                        >
                          <Package className="mr-2 h-4 w-4" />
                          All Apps
                          <Badge className="ml-auto">{apps.length}</Badge>
                        </Button>
                        
                        {appCategories.map((category) => (
                          <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsDrawerOpen(false);
                            }}
                          >
                            <Package className="mr-2 h-4 w-4" />
                            {category}
                            <Badge className="ml-auto">
                              {apps.filter(app => app.category === category).length}
                            </Badge>
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <div className="mt-4 space-y-3">
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="mb-2 text-sm font-medium">Sort Apps</h4>
                        <div className="flex gap-2">
                          <Button 
                            variant={sortBy === "name" ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setSortBy("name")}
                            className="flex-1"
                          >
                            Name
                          </Button>
                          <Button 
                            variant={sortBy === "rating" ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setSortBy("rating")}
                            className="flex-1"
                          >
                            Rating
                          </Button>
                          <Button 
                            variant={sortBy === "users" ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setSortBy("users")}
                            className="flex-1"
                          >
                            Popular
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="mb-2 text-sm font-medium">View Mode</h4>
                        <div className="flex gap-2">
                          <Button 
                            variant={viewMode === "grid" ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setViewMode("grid")}
                            className="flex-1"
                          >
                            <Grid className="mr-2 h-4 w-4" />
                            Grid
                          </Button>
                          <Button 
                            variant={viewMode === "folder" ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => setViewMode("folder")}
                            className="flex-1"
                          >
                            <LayoutGrid className="mr-2 h-4 w-4" />
                            Folder
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <Button 
                          variant={showUpdatesOnly ? "default" : "outline"} 
                          size="sm" 
                          onClick={() => setShowUpdatesOnly(!showUpdatesOnly)}
                          className="w-full"
                        >
                          <Bell className="mr-2 h-4 w-4" />
                          {showUpdatesOnly ? "Showing Updates Only" : "Show Updates Only"}
                          {updatesCount > 0 && (
                            <Badge variant="destructive" className="ml-2">{updatesCount}</Badge>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="w-full"
                    >
                      <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                      {isRefreshing ? "Refreshing..." : "Refresh App List"}
                    </Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
            
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
              className="rounded-full relative"
            >
              <Bell className="h-5 w-5" />
              {updatesCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                  {updatesCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* App Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-3">
              <Package className="h-5 w-5 text-blue-400 mb-1" />
              <span className="text-lg font-bold">{apps.length}</span>
              <span className="text-xs text-gray-400">All Apps</span>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-3">
              <Download className="h-5 w-5 text-green-400 mb-1" />
              <span className="text-lg font-bold">{favorites.length}</span>
              <span className="text-xs text-gray-400">Installed</span>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-3">
              <Clock className="h-5 w-5 text-amber-400 mb-1" />
              <span className="text-lg font-bold">{updatesCount}</span>
              <span className="text-xs text-gray-400">Updates</span>
            </CardContent>
          </Card>
        </div>

        {/* iOS-style search bar */}
        <div 
          className="bg-gray-100 rounded-xl flex items-center px-3 py-2.5"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-400 text-sm">Search apps, games, and tools...</span>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="px-4 pt-4 pb-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all" className="text-sm py-1.5">All</TabsTrigger>
            <TabsTrigger value="popular" className="text-sm py-1.5">Popular</TabsTrigger>
            <TabsTrigger value="recent" className="text-sm py-1.5">New</TabsTrigger>
            <TabsTrigger value="favorites" className="text-sm py-1.5">Favorites</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Current Category or Filter Label */}
      <div className="flex justify-between items-center px-4 py-3">
        <h3 className="text-lg font-medium">
          {showUpdatesOnly ? "Apps with Updates" : 
           activeTab === "favorites" ? "Your Favorites" : 
           activeTab === "popular" ? "Popular Apps" : 
           activeTab === "recent" ? "Recently Added" : 
           selectedCategory !== "All" ? `${selectedCategory} Apps` : "All Apps"}
        </h3>
        <div className="flex items-center text-sm text-gray-400">
          <span>{filteredApps.length} apps</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 ml-1 text-gray-400"
            onClick={() => {
              const nextSortOption = sortBy === "name" ? "rating" : sortBy === "rating" ? "users" : "name";
              setSortBy(nextSortOption);
            }}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* App Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${selectedCategory}-${viewMode}-${sortBy}-${showUpdatesOnly}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filteredApps.length > 0 ? (
            <AppLibraryGrid 
              apps={filteredApps}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
              viewMode={viewMode}
              installingApps={installingApps}
              onInstall={handleInstallApp}
            />
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-400">No apps found matching your criteria.</p>
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
        </motion.div>
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />
    </motion.div>
  );
}
