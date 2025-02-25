
import { CategoryTabs } from "@/components/apps/CategoryTabs";
import { AppControls } from "@/components/apps/AppControls";
import { AppGrid } from "@/components/apps/AppGrid";
import { App } from "@/components/apps/types";
import { appCategories, categories } from "@/data/categories";

interface MainContentProps {
  activeTab: string;
  selectedCategory: string;
  viewMode: "grid" | "list";
  showUpdatesOnly: boolean;
  updatesCount: number;
  apps: App[];
  favorites: string[];
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: "name" | "rating" | "users") => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onUpdatesToggle: () => void;
  onToggleFavorite: (appName: string) => void;
}

export const MainContent = ({
  activeTab,
  selectedCategory,
  viewMode,
  showUpdatesOnly,
  updatesCount,
  apps,
  favorites,
  onCategoryChange,
  onSortChange,
  onViewModeChange,
  onUpdatesToggle,
  onToggleFavorite,
}: MainContentProps) => {
  const filteredApps = apps.filter(app => {
    if (showUpdatesOnly) return app.updates > 0;
    if (activeTab === "favorites") return favorites.includes(app.name);
    if (activeTab === "popular") return app.status === "popular";
    if (activeTab === "recent") return app.status === "new";
    if (selectedCategory !== "All") return app.category === selectedCategory;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="py-8">
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
              onCategoryChange={onCategoryChange}
              onSortChange={onSortChange}
              onViewModeChange={onViewModeChange}
              onUpdatesToggle={onUpdatesToggle}
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
  );
};
