
import { Star, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface App {
  name: string;
  description: string;
  icon: any;
  color: string;
  status?: string;
  users?: string;
  lastUsed?: string;
  rating?: number;
  updates?: number;
}

interface AppGridProps {
  apps: App[];
  favorites: string[];
  onToggleFavorite: (appName: string) => void;
}

const AppCard = ({ app, isFavorite, onToggleFavorite }) => (
  <div className="relative w-full">
    <Button
      variant="ghost"
      className="relative flex flex-col items-center gap-2 p-4 h-auto hover:bg-gray-50 w-full group"
      onClick={(e) => e.preventDefault()}
    >
      <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300`}>
        <app.icon className="w-7 h-7 text-white" />
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
              <Star className="w-3 h-3 fill-yellow-400 flex-shrink-0" />
              {app.rating}
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2 px-2">{app.description}</p>
        {app.lastUsed && (
          <div className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span className="truncate max-w-[100px]">{app.lastUsed}</span>
          </div>
        )}
      </div>
    </Button>
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 h-7 w-7 rounded-full hover:bg-gray-200 z-10"
      onClick={(e) => {
        e.stopPropagation();
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

export const AppGrid = ({ apps, favorites, onToggleFavorite }: AppGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {apps.map((app) => (
        <Card key={app.name} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <AppCard
            app={app}
            isFavorite={favorites.includes(app.name)}
            onToggleFavorite={onToggleFavorite}
          />
        </Card>
      ))}
    </div>
  );
};
