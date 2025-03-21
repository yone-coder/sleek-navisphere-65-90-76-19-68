
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FavoritesSection } from "@/components/apps/FavoritesSection";
import { AppGrid } from "@/components/apps/AppGrid";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { AppControls } from "@/components/apps/AppControls";
import { SuggestionsSection } from "@/components/apps/SuggestionsSection";
import { ProfileCard } from "@/components/apps/ProfileCard";
import { apps, categories, appCategories } from "@/components/apps/data/appsData";
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
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "users">("name");
  const [showUpdatesOnly, setShowUpdatesOnly] = useState(false);

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
    <div className="pb-24">
      <div>
        <ProfileCard />
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-8">
            <FavoritesSection favoriteApps={favoriteApps} />
            
            <SuggestionsSection suggestedApps={suggestedApps} />

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

            <AppGrid 
              apps={filteredApps}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
              viewMode={viewMode}
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
