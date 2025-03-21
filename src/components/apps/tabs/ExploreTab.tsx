
import React, { useState } from 'react';
import { FavoritesSection } from '@/components/apps/FavoritesSection';
import { AppGrid } from '@/components/apps/AppGrid';
import { SuggestionsSection } from '@/components/apps/SuggestionsSection';
import { CategoryTabs } from '@/components/apps/CategoryTabs';
import { AppControls } from '@/components/apps/AppControls';
import { apps, appCategories, categories } from '@/components/apps/data/appsData';
import type { App, AppCategory } from '@/components/apps/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ExploreTab() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "users">("name");
  const [favorites, setFavorites] = useState<string[]>([]);
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

  const handleToggleFavorite = (appName: string) => {
    setFavorites(prev => 
      prev.includes(appName) 
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };

  const favoriteApps = apps.filter(app => favorites.includes(app.name));
  const suggestedApps = apps
    .filter(app => app.rating && app.rating >= 4.8)
    .slice(0, 8);

  return (
    <div className="pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-8">
          <FavoritesSection favoriteApps={favoriteApps} />
          
          <SuggestionsSection suggestedApps={suggestedApps} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex-1 min-w-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="recent">New</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-shrink-0">
              <AppControls
                selectedCategory={selectedCategory}
                viewMode={viewMode}
                showUpdatesOnly={showUpdatesOnly}
                updatesCount={apps.filter(app => app.updates > 0).length}
                categories={appCategories}
                onCategoryChange={(category: AppCategory) => setSelectedCategory(category)}
                onSortChange={setSortBy}
                onViewModeChange={setViewMode}
                onUpdatesToggle={() => setShowUpdatesOnly(!showUpdatesOnly)}
              />
            </div>
          </div>

          <CategoryTabs 
            categories={categories}
          />

          <div className="mt-6">
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
  );
}
