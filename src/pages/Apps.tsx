
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppsHeader } from "@/components/apps/AppsHeader";
import { BannerSlider } from "@/components/BannerSlider";
import { FavoritesSection } from "@/components/apps/FavoritesSection";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { SuggestionsSection } from "@/components/apps/SuggestionsSection";
import { ProfileCard } from "@/components/apps/ProfileCard";
import { MainContent } from "@/components/apps/MainContent";
import { apps } from "@/data/apps-data";

export default function Apps() {
  const navigate = useNavigate();
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

  useEffect(() => {
    localStorage.setItem("favoriteApps", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (appName: string) => {
    setFavorites(prev => 
      prev.includes(appName) 
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };

  const sortedApps = [...apps].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "users":
        return (b.users?.replace("K+", "000") || "0").localeCompare(a.users?.replace("K+", "000") || "0");
      default:
        return a.name.localeCompare(b.name);
    }
  });

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
          
          <div className="max-w-7xl mx-auto">
            <FavoritesSection favoriteApps={favoriteApps} />
            <SuggestionsSection suggestedApps={suggestedApps} />
            
            <MainContent
              activeTab={activeTab}
              selectedCategory={selectedCategory}
              viewMode={viewMode}
              showUpdatesOnly={showUpdatesOnly}
              updatesCount={updatesCount}
              apps={sortedApps}
              favorites={favorites}
              onCategoryChange={setSelectedCategory}
              onSortChange={setSortBy}
              onViewModeChange={setViewMode}
              onUpdatesToggle={() => setShowUpdatesOnly(!showUpdatesOnly)}
              onToggleFavorite={handleToggleFavorite}
            />
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
