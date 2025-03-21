
import { AppGrid } from "@/components/apps/AppGrid";
import type { App } from "@/components/apps/types";
import { AppList } from "@/components/apps/AppList";

interface AppLibraryGridProps {
  apps: App[];
  favorites: string[];
  onToggleFavorite: (appName: string) => void;
  viewMode: "grid" | "list";
  expandedView?: boolean;
}

export function AppLibraryGrid({ 
  apps, 
  favorites, 
  onToggleFavorite, 
  viewMode,
  expandedView = false
}: AppLibraryGridProps) {
  if (viewMode === "list") {
    return (
      <AppList
        apps={apps}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    );
  }

  return (
    <AppGrid
      apps={apps}
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
      viewMode={viewMode}
      expandedView={expandedView}
    />
  );
}
