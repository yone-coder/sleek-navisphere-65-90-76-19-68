import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs } from "@/components/ui/tabs";
import { AppsHeader } from "@/components/apps/AppsHeader";
import { BannerSlider } from "@/components/BannerSlider";
import { FavoritesSection } from "@/components/apps/FavoritesSection";
import { AppGrid } from "@/components/apps/AppGrid";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CategoryTabs } from "@/components/apps/CategoryTabs";
import { AppControls } from "@/components/apps/AppControls";
import { SuggestionsSection } from "@/components/apps/SuggestionsSection";
import { ProfileCard } from "@/components/apps/ProfileCard";
import { apps, categories, appCategories } from "@/components/apps/data/appsData";
import type { App, AppCategory } from "@/components/apps/types";

export default function Apps() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "users">("name");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteApps");
    return saved ? JSON.parse(saved) : [];
  });
  const [showUpdatesOnly, setShowUpdatesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem("favoriteApps", JSON.stringify(favorites));
  }, [favorites]);

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

  const handleToggleFavorite = (appName: string) => {
    setFavorites(prev => 
      prev.includes(appName) 
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
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
        
        <div>
          <ProfileCard />
          <BannerSlider />
          
          <div className="max-w-7xl mx-auto px-4">
            <div className="py-8">
              <FavoritesSection favoriteApps={favoriteApps} />
              
              <SuggestionsSection suggestedApps={suggestedApps} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <CategoryTabs categories={categories} />
                  </Tabs>
                </div>

                <div className="flex-shrink-0">
                  <AppControls
                    selectedCategory={selectedCategory}
                    viewMode={viewMode}
                    showUpdatesOnly={showUpdatesOnly}
                    updatesCount={updatesCount}
                    categories={[...appCategories]}
                    onCategoryChange={(category) => setSelectedCategory(category)}
                    onSortChange={setSortBy}
                    onViewModeChange={setViewMode}
                    onUpdatesToggle={() => setShowUpdatesOnly(!showUpdatesOnly)}
                  />
                </div>
              </div>

              <AppGrid 
                apps={filteredApps}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                viewMode={viewMode}
              />
            </div>
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
