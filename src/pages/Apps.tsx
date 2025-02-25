
import { useState } from "react";
import { Grid2X2, Star, Clock } from "lucide-react";
import { AppsHeader } from "@/components/apps/AppsHeader";
import { BannerSlider } from "@/components/BannerSlider";
import { FavoritesSection } from "@/components/apps/FavoritesSection";
import { AppGrid } from "@/components/apps/AppGrid";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CategoryTabs } from "@/components/apps/CategoryTabs";
import { AppControls } from "@/components/apps/AppControls";
import { SuggestionsSection } from "@/components/apps/suggestions/SuggestionsSection";
import { ProfileCard } from "@/components/apps/ProfileCard";
import { useAppsFilter } from "@/components/apps/hooks/useAppsFilter";
import { useFavorites } from "@/components/apps/hooks/useFavorites";
import { categories } from "@/components/apps/data/categories";
import { appCategories } from "@/components/apps/data/appCategories";
import { apps } from "@/data/apps";

export default function Apps() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { favorites, handleToggleFavorite } = useFavorites();
  const {
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    showUpdatesOnly,
    setShowUpdatesOnly,
    filteredApps
  } = useAppsFilter(apps, favorites);

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
                  <CategoryTabs categories={categories} />
                </div>

                <div className="flex-shrink-0">
                  <AppControls
                    selectedCategory={selectedCategory}
                    viewMode={viewMode}
                    showUpdatesOnly={showUpdatesOnly}
                    updatesCount={updatesCount}
                    categories={appCategories}
                    onCategoryChange={setSelectedCategory}
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
