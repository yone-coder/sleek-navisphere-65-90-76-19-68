
import { AppGrid } from "@/components/apps/AppGrid";
import { AppList } from "@/components/apps/AppList";
import type { App } from "@/components/apps/types";

interface AppLibraryGridProps {
  apps: App[];
  favorites: string[];
  onToggleFavorite: (appName: string) => void;
  viewMode: "grid" | "list";
}

export function AppLibraryGrid({ 
  apps, 
  favorites, 
  onToggleFavorite, 
  viewMode
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
    />
  );
}
