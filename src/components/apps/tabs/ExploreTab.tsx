
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Menu, Package, Download, Bell, Grid, List, ArrowUpDown, RefreshCw, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { FavoritesSection } from "@/components/apps/FavoritesSection";
import { SuggestionsSection } from "@/components/apps/SuggestionsSection";
import { AppGrid } from "@/components/apps/AppGrid";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { apps, appCategories } from "@/components/apps/data/appsData";
import { toast } from "@/hooks/use-toast";
import type { App, AppCategory } from "@/components/apps/types";

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
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
      
      toast({
        title: "Installation Complete",
        description: `${appName} has been installed successfully`,
        duration: 2000,
      });
    }, 2000);
  };

  return (
    <motion.div 
      className="pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xl font-bold">Explore Apps</h2>
        <div className="flex gap-2">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
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
                    <div className="border-t pt-4">
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
                    
                    <div className="border-t pt-4">
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
                          variant={viewMode === "list" ? "default" : "outline"} 
                          size="sm" 
                          onClick={() => setViewMode("list")}
                          className="flex-1"
                        >
                          <List className="mr-2 h-4 w-4" />
                          List
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <Button 
                        variant={showUpdatesOnly ? "default" : "outline"} 
                        size="sm" 
                        onClick={() => setShowUpdatesOnly(!showUpdatesOnly)}
                        className="w-full"
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        {showUpdatesOnly ? "Showing Updates Only" : "Show Updates Only"}
                        {updatesCount > 0 && (
                          <Badge variant="secondary" className="ml-2">{updatesCount}</Badge>
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
            variant="outline" 
            size="icon" 
            className="rounded-full"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full relative"
          >
            <Bell className="h-5 w-5" />
            {updatesCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
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
            <Package className="h-5 w-5 text-blue-500 mb-1" />
            <span className="text-lg font-bold">{apps.length}</span>
            <span className="text-xs text-gray-500">All Apps</span>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-3">
            <Download className="h-5 w-5 text-green-500 mb-1" />
            <span className="text-lg font-bold">{favorites.length}</span>
            <span className="text-xs text-gray-500">Installed</span>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-3">
            <Clock className="h-5 w-5 text-amber-500 mb-1" />
            <span className="text-lg font-bold">{updatesCount}</span>
            <span className="text-xs text-gray-500">Updates</span>
          </CardContent>
        </Card>
      </div>

      {/* Favorites Section */}
      {favoriteApps.length > 0 && (
        <FavoritesSection favoriteApps={favoriteApps} />
      )}
      
      {/* Suggestions Section */}
      <SuggestionsSection suggestedApps={suggestedApps} />
      
      {/* Tab Navigation */}
      <div className="sticky top-16 z-10 bg-white py-2 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Search Bar (Clickable to open search overlay) */}
      <div 
        className="relative mb-4 mx-1"
        onClick={() => setIsSearchOpen(true)}
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          className="pl-10 bg-gray-50 border-gray-200" 
          placeholder="Search apps..." 
          readOnly 
        />
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7"
        >
          <Filter className="h-4 w-4 mr-1" />
          <span className="text-xs">Filters</span>
        </Button>
      </div>

      {/* Current Category or Filter Label */}
      <div className="flex justify-between items-center mb-4 mx-1">
        <h3 className="text-lg font-medium">
          {showUpdatesOnly ? "Apps with Updates" : 
           activeTab === "favorites" ? "Your Favorites" : 
           activeTab === "popular" ? "Popular Apps" : 
           activeTab === "recent" ? "Recently Added" : 
           selectedCategory !== "All" ? `${selectedCategory} Apps` : "All Apps"}
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <span>{filteredApps.length} apps</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 ml-1"
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
      <div className="mx-1">
        {filteredApps.length > 0 ? (
          <AppGrid 
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

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />
    </motion.div>
  );
}
