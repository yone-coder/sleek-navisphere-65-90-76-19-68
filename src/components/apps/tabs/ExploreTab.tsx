
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { apps } from "@/components/apps/data/appsData";
import { ExploreFilters } from "@/components/apps/explore/ExploreFilters";
import { AppLibraryGrid } from "@/components/apps/explore/AppLibraryGrid";
import { SearchOverlay } from "@/components/search/SearchOverlay";
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

  // Add scroll detection for UI enhancements
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <motion.div 
      className="pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
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
        </div>
      </div>

      {/* App Grid with Optimized Rendering */}
      <div className="mx-1">
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

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />
      
      {/* Filters Drawer */}
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
        onRefresh={() => {
          setIsRefreshing(true);
          
          // Simulate refresh delay
          setTimeout(() => {
            setIsRefreshing(false);
          }, 1500);
        }}
        updatesCount={updatesCount}
        expandedView={expandedView}
        setExpandedView={setExpandedView}
      />
    </motion.div>
  );
}
