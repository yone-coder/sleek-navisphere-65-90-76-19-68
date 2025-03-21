
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { AppListItem } from "./grid/AppListItem";
import type { App } from "./types";

interface AppListProps {
  apps: App[];
  favorites: string[];
  onToggleFavorite: (appName: string) => void;
}

export const AppList = ({ apps, favorites, onToggleFavorite }: AppListProps) => {
  const navigate = useNavigate();
  
  const handleAppClick = (app: App) => {
    if (app.name === "Chess") {
      navigate('/games/chess');
    } else if (app.category === "Gaming") {
      const gameId = app.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/games/${gameId}`);
    } else {
      navigate(app.route);
    }
  };
  
  return (
    <div className="flex flex-col gap-2 min-w-0 w-full">
      {apps.map((app) => (
        <Card 
          key={app.name} 
          className="overflow-hidden border-0 shadow-none hover:shadow-none"
        >
          <AppListItem
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
