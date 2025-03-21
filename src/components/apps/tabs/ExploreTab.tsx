
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavoritesSection } from "@/components/apps/FavoritesSection";
import { AppGrid } from "@/components/apps/AppGrid";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { AppControls } from "@/components/apps/AppControls";
import { SuggestionsSection } from "@/components/apps/SuggestionsSection";
import { ProfileCard } from "@/components/apps/ProfileCard";
import { apps, categories, appCategories } from "@/components/apps/data/appsData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Star, Bell, BarChart2, TrendingUp, Award, Gift, Clock, Calendar, Globe, ShoppingBag, Smartphone, Headphones, Search, Filter, ChevronDown, ChevronRight, RefreshCw, CheckCircle, Settings, Zap, FileText, Package } from "lucide-react";
import type { App, AppCategory } from "@/components/apps/types";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "users">("name");
  const [showUpdatesOnly, setShowUpdatesOnly] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [installingApps, setInstallingApps] = useState<string[]>([]);
  const [featuredApp, setFeaturedApp] = useState(apps[Math.floor(Math.random() * apps.length)]);

  // Trending categories
  const trendingCategories = [
    { name: "Entertainment", icon: Headphones, color: "bg-pink-500" },
    { name: "Shopping", icon: ShoppingBag, color: "bg-indigo-500" },
    { name: "Productivity", icon: Calendar, color: "bg-amber-500" },
    { name: "Travel", icon: Globe, color: "bg-teal-500" },
    { name: "Games", icon: Smartphone, color: "bg-purple-500" },
  ];

  // Latest updates (mock data)
  const latestUpdates = apps
    .filter(app => app.updates && app.updates > 0)
    .slice(0, 3);

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

  useEffect(() => {
    // Change featured app every 30 seconds
    const interval = setInterval(() => {
      setFeaturedApp(apps[Math.floor(Math.random() * apps.length)]);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-24">
      <div>
        <ProfileCard />
        
        <div className="max-w-7xl mx-auto px-4">
          {/* Featured App Banner */}
          <motion.div 
            className="mb-6 rounded-xl overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`bg-gradient-to-r from-${featuredApp.color.replace('bg-', '')} to-${featuredApp.color.replace('bg-', '')}/80 p-4 text-white`}>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-3xl font-bold">{featuredApp.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold">{featuredApp.name}</h3>
                    <Badge className="ml-2 bg-white/20 text-white">Featured</Badge>
                  </div>
                  <p className="text-sm opacity-90 mt-1">{featuredApp.description}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-white text-white" />
                      <span className="text-xs ml-1">{featuredApp.rating?.toFixed(1) || '4.5'}</span>
                    </div>
                    <span className="mx-2 text-white/40">•</span>
                    <span className="text-xs">{featuredApp.users || '1M+ users'}</span>
                  </div>
                </div>
                <Button 
                  className="bg-white text-gray-800 hover:bg-white/90"
                  onClick={() => handleInstallApp(featuredApp.name)}
                  disabled={installingApps.includes(featuredApp.name)}
                >
                  {installingApps.includes(featuredApp.name) ? (
                    <div className="flex items-center">
                      <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                      <span>Installing...</span>
                    </div>
                  ) : "Get"}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Latest Updates Section */}
          {latestUpdates.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-900">Latest Updates</h2>
                {updatesCount > 3 && (
                  <Button variant="ghost" size="sm" className="text-blue-500">
                    See All ({updatesCount}) <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
              
              <div className="space-y-3">
                {latestUpdates.map(app => (
                  <motion.div 
                    key={app.name} 
                    className="bg-gray-50 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start">
                      <div className={`${app.color} w-12 h-12 rounded-xl flex items-center justify-center mr-3`}>
                        <span className="text-white text-xl font-bold">{app.name.charAt(0)}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{app.name}</h3>
                              <Badge className="ml-2 bg-red-500 text-white text-xs">Update</Badge>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Version {Math.floor(Math.random() * 10)}.{Math.floor(Math.random() * 10)}.{Math.floor(Math.random() * 10)}</p>
                          </div>
                          
                          <Button 
                            size="sm" 
                            className="text-xs h-8"
                            onClick={() => handleInstallApp(app.name)}
                            disabled={installingApps.includes(app.name)}
                          >
                            {installingApps.includes(app.name) ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : "Update"}
                          </Button>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-xs text-gray-700">• Bug fixes and performance improvements</p>
                          <p className="text-xs text-gray-700">• New features and enhanced user interface</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Categories */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Trending Categories</h2>
            <div className="flex overflow-x-auto space-x-3 pb-2 -mx-1 px-1 scrollbar-none">
              {trendingCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  className="flex-none"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button 
                    variant="outline" 
                    className="h-auto py-3 border-gray-200 hover:bg-gray-50"
                    onClick={() => setSelectedCategory(category.name as AppCategory)}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`${category.color} w-10 h-10 rounded-full flex items-center justify-center mb-2`}>
                        <category.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs">{category.name}</span>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          <FavoritesSection favoriteApps={favoriteApps} />
            
          <SuggestionsSection suggestedApps={suggestedApps} />
          
          {/* Quick Stats Section */}
          <motion.div 
            className="grid grid-cols-3 gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-3 flex flex-col items-center">
                <Package className="h-6 w-6 text-blue-500 mb-1" />
                <span className="text-lg font-bold text-gray-800">{apps.length}</span>
                <span className="text-xs text-gray-600">Total Apps</span>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-100">
              <CardContent className="p-3 flex flex-col items-center">
                <Download className="h-6 w-6 text-green-500 mb-1" />
                <span className="text-lg font-bold text-gray-800">{favorites.length}</span>
                <span className="text-xs text-gray-600">Installed</span>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 border-amber-100">
              <CardContent className="p-3 flex flex-col items-center">
                <Zap className="h-6 w-6 text-amber-500 mb-1" />
                <span className="text-lg font-bold text-gray-800">{updatesCount}</span>
                <span className="text-xs text-gray-600">Updates</span>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex-1 min-w-0">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 w-full">
                  {categories.map(category => (
                    <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
                      <category.icon className="w-4 h-4" />
                      <span>{category.label}</span>
                      {category.count && <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">{category.count}</span>}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-shrink-0 flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-8"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              
              <div className="flex-shrink-0">
                <AppControls
                  selectedCategory={selectedCategory}
                  viewMode={viewMode}
                  showUpdatesOnly={showUpdatesOnly}
                  updatesCount={updatesCount}
                  categories={appCategories}
                  onCategoryChange={(category: AppCategory) => setSelectedCategory(category)}
                  onSortChange={setSortBy}
                  onViewModeChange={setViewMode}
                  onUpdatesToggle={() => setShowUpdatesOnly(!showUpdatesOnly)}
                />
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="mb-4 relative">
            <div 
              className="bg-gray-100 rounded-lg p-2 flex items-center cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5 text-gray-500 ml-1 mr-2" />
              <span className="text-gray-500 text-sm flex-1">Search all apps and games...</span>
              <Badge variant="outline" className="bg-white flex items-center gap-1 border-gray-200">
                <Filter className="h-3 w-3" />
                <span className="text-xs">Filters</span>
                <ChevronDown className="h-3 w-3" />
              </Badge>
            </div>
          </div>

          {/* Custom Header for App Grid */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4 flex justify-between items-center">
            <div>
              <h2 className="font-medium text-gray-900">
                {showUpdatesOnly ? "Apps with Updates" : 
                 activeTab === "favorites" ? "Your Favorites" : 
                 activeTab === "popular" ? "Popular Apps" : 
                 activeTab === "recent" ? "Recently Added" : 
                 selectedCategory !== "All" ? `${selectedCategory} Apps` : "All Applications"}
              </h2>
              <p className="text-xs text-gray-500">
                {filteredApps.length} {filteredApps.length === 1 ? 'app' : 'apps'} found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs h-8 text-gray-600"
                onClick={() => setSortBy('name')}
              >
                <span className={sortBy === 'name' ? 'text-blue-500 font-medium' : ''}>A-Z</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs h-8 text-gray-600"
                onClick={() => setSortBy('rating')}
              >
                <span className={sortBy === 'rating' ? 'text-blue-500 font-medium' : ''}>Rating</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs h-8 text-gray-600"
                onClick={() => setSortBy('users')}
              >
                <span className={sortBy === 'users' ? 'text-blue-500 font-medium' : ''}>Popular</span>
              </Button>
            </div>
          </div>

          <AppGrid 
            apps={filteredApps}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            viewMode={viewMode}
          />
          
          {/* Action Buttons */}
          <div className="fixed bottom-20 right-4 flex flex-col gap-2">
            <motion.button 
              className="bg-blue-500 text-white h-12 w-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <BarChart2 className="h-5 w-5" />
            </motion.button>
            
            <motion.button 
              className="bg-purple-500 text-white h-12 w-12 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toast({
                title: "App Settings",
                description: "Settings panel will open here",
                duration: 2000,
              })}
            >
              <Settings className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />
    </div>
  );
}
