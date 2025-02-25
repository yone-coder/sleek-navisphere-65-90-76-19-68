
import { AppDisplayProps } from "./types";
import { AppGrid } from "../AppGrid";

export const AppDisplay = ({
  apps,
  activeTab,
  selectedCategory,
  viewMode,
  sortBy,
  showUpdatesOnly,
  favorites,
  onToggleFavorite
}: AppDisplayProps) => {
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
    <AppGrid 
      apps={filteredApps}
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
      viewMode={viewMode}
    />
  );
};
