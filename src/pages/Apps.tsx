
import { useState } from "react";
import { Grid2X2, Clock, Star } from "lucide-react";
import { AppsHeader } from "@/components/apps/AppsHeader";
import { BannerSlider } from "@/components/BannerSlider";
import { FavoritesSection } from "@/components/apps/FavoritesSection";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CategoryTabs } from "@/components/apps/CategoryTabs";
import { AppControls } from "@/components/apps/AppControls";
import { type App, type Category } from "@/components/apps/types";
import { SuggestionsSection } from "@/components/apps/SuggestionsSection";
import { ProfileCard } from "@/components/apps/ProfileCard";
import { AppDisplay } from "@/components/apps/app-store/AppDisplay";
import { appsData } from "@/data/apps-data";

const categories: Category[] = [
  { id: "all", label: "All Apps", icon: Grid2X2, count: appsData.length },
  { id: "recent", label: "Recent", icon: Clock, count: appsData.filter(app => app.status === "new").length },
  { id: "popular", label: "Popular", icon: Star, count: appsData.filter(app => app.status === "popular").length },
  { id: "favorites", label: "Favorites", icon: Star }
];

const appCategories = [
  "All",
  "Shopping",
  "Finance",
  "Entertainment",
  "Gaming",
  "Analytics",
  "Social",
  "Communication",
  "System",
  "Education",
  "Work",
  "Business",
  "Content",
  "Nonprofit",
  "Food",
  "Services",
  "Real Estate"
];

export default function Apps() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "users">("name");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteApps");
    return saved ? JSON.parse(saved) : [];
  });
  const [showUpdatesOnly, setShowUpdatesOnly] = useState(false);

  const handleToggleFavorite = (appName: string) => {
    setFavorites(prev => 
      prev.includes(appName) 
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };

  const favoriteApps = appsData.filter(app => favorites.includes(app.name));
  const updatesCount = appsData.filter(app => app.updates > 0).length;
  const suggestedApps = appsData
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

              <AppDisplay 
                apps={appsData}
                activeTab={activeTab}
                selectedCategory={selectedCategory}
                viewMode={viewMode}
                sortBy={sortBy}
                showUpdatesOnly={showUpdatesOnly}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          </div>
        </div>
      </div>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={appsData}
      />
    </div>
  );
}
