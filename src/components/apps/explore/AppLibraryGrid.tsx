
import { AppGrid } from "@/components/apps/AppGrid";
import type { App } from "@/components/apps/types";

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
      <div className="flex flex-col gap-2 min-w-0 w-full">
        {apps.map((app) => (
          <div key={app.name} className="p-2 border rounded-md">
            <div className="flex items-center">
              <div className="mr-3">
                <img src={app.icon || "/placeholder.svg"} alt={app.name} className="w-10 h-10 rounded-lg" />
              </div>
              <div>
                <h3 className="text-sm font-medium">{app.name}</h3>
                <p className="text-xs text-gray-500">{app.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
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
