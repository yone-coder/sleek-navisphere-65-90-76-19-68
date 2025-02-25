
import { Star, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import type { App } from "./types";
import { cn } from "@/lib/utils";

interface AppGridProps {
  apps: App[];
  favorites: string[];
  onToggleFavorite: (appName: string) => void;
  viewMode?: "grid" | "list";
}

const AppCard = ({ app, isFavorite, onToggleFavorite, onClick }) => (
  <div className="relative w-full overflow-hidden" onClick={onClick}>
    <div className="relative flex flex-col items-center gap-2 p-4 h-auto w-full">
      <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center relative`}>
        {'component' in app.icon 
          ? <img {...app.icon.props} className={cn("w-[80%] h-[80%]", app.icon.props.className)} />
          : <app.icon className="w-7 h-7 text-white" />
        }
        {app.updates > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-[10px] h-5">
            {app.updates} NEW
          </Badge>
        )}
      </div>
      <div className="text-center w-full overflow-hidden">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">{app.name}</span>
          {app.rating && (
            <div className="flex items-center gap-1 text-xs text-yellow-500 flex-shrink-0">
              <Star className="w-3 h-3 fill-yellow-400" />
              {app.rating}
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2 px-2">{app.description}</p>
        {app.lastUsed && (
          <div className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" />
            <span className="truncate max-w-[100px]">{app.lastUsed}</span>
          </div>
        )}
      </div>
    </div>
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 h-7 w-7 rounded-full hover:bg-gray-200"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onToggleFavorite(app.name);
      }}
    >
      <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
    </Button>
    {app.users && (
      <Badge variant="secondary" className="absolute bottom-2 right-2 text-[10px]">
        {app.users} users
      </Badge>
    )}
  </div>
);

const AppList = ({ app, isFavorite, onToggleFavorite, onClick }) => (
  <div className="relative w-full p-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={onClick}>
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${app.color} flex items-center justify-center relative flex-shrink-0`}>
        {'component' in app.icon 
          ? <img {...app.icon.props} className={cn("w-[80%] h-[80%]", app.icon.props.className)} />
          : <app.icon className="w-6 h-6 text-white" />
        }
        {app.updates > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-[10px] h-5">
            {app.updates}
          </Badge>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-700 truncate">{app.name}</span>
          {app.rating && (
            <div className="flex items-center gap-1 text-xs text-yellow-500">
              <Star className="w-3 h-3 fill-yellow-400" />
              {app.rating}
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 line-clamp-1">{app.description}</p>
      </div>
      <div className="flex items-center gap-3">
        {app.users && (
          <Badge variant="secondary" className="text-[10px]">
            {app.users} users
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onToggleFavorite(app.name);
          }}
        >
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
        </Button>
      </div>
    </div>
  </div>
);

export const AppGrid = ({ apps, favorites, onToggleFavorite, viewMode = "grid" }: AppGridProps) => {
  const navigate = useNavigate();
  const AppComponent = viewMode === "grid" ? AppCard : AppList;
  
  const handleAppClick = (app: App) => {
    // For games, navigate to game details page
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
