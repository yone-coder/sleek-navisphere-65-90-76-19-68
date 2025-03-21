
import { Card } from "@/components/ui/card";
import { AppGridItem } from "../grid/AppGridItem";
import { AppListItem } from "../grid/AppListItem";
import { motion } from "framer-motion";
import type { App } from "../types";
import { useNavigate } from "react-router-dom";

interface AppLibraryGridProps {
  apps: App[];
  favorites: string[];
  onToggleFavorite: (appName: string) => void;
  viewMode?: "grid" | "list";
}

export const AppLibraryGrid = ({ 
  apps, 
  favorites, 
  onToggleFavorite, 
  viewMode = "grid" 
}: AppLibraryGridProps) => {
  const navigate = useNavigate();
  const AppComponent = viewMode === "grid" ? AppGridItem : AppListItem;
  
  const handleAppClick = (app: App) => {
    if (app.name === "Chess") {
      navigate('/games/chess');
    } else if (app.category === "Gaming") {
      const gameId = app.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/games/${gameId}`);
    } else {
      navigate(app.route || '/');
    }
  };

  return (
    <div className={
      viewMode === "grid" 
        ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 min-w-0 w-full"
        : "flex flex-col gap-2 min-w-0 w-full"
    }>
      {apps.map((app, index) => (
        <motion.div
          key={app.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card 
            className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${viewMode === "list" ? "border-0 shadow-none hover:shadow-none" : ""}`}
          >
            <AppComponent
              app={app}
              isFavorite={favorites.includes(app.name)}
              onToggleFavorite={onToggleFavorite}
              onClick={() => handleAppClick(app)}
            />
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
