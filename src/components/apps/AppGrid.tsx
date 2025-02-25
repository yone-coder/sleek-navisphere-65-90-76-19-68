
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { AppCard } from "./grid/AppCard";
import { AppList } from "./grid/AppList";
import type { App } from "./types";

interface AppGridProps {
  apps: App[];
  favorites: string[];
  onToggleFavorite: (appName: string) => void;
  viewMode?: "grid" | "list";
}

export const AppGrid = ({ apps, favorites, onToggleFavorite, viewMode = "grid" }: AppGridProps) => {
  const navigate = useNavigate();
  const AppComponent = viewMode === "grid" ? AppCard : AppList;
  
  const handleAppClick = (app: App) => {
    if (app.category === "Gaming") {
      const gameId = app.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/games/${gameId}`);
    } else {
      navigate(app.route);
    }
  };
  
  return (
    <div className={
      viewMode === "grid" 
        ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 min-w-0 w-full"
        : "flex flex-col gap-2 min-w-0 w-full"
    }>
      {apps.map((app) => (
        <Card 
          key={app.name} 
          className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${viewMode === "list" ? "border-0 shadow-none hover:shadow-none" : ""}`}
        >
          <AppComponent
            app={app}
            isFavorite={favorites.includes(app.name)}
            onToggleFavorite={onToggleFavorite}
            onClick={() => handleAppClick(app)}
          />
        </Card>
      ))}
    </div>
  );
};
