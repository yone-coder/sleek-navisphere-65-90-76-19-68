
import { Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { App } from "../types";

interface AppCardProps {
  app: App;
  isFavorite: boolean;
  onToggleFavorite: (appName: string) => void;
  onClick: () => void;
}

export const AppCard = ({ app, isFavorite, onToggleFavorite, onClick }: AppCardProps) => {
  return (
    <div className="relative w-full overflow-hidden" onClick={onClick}>
      <div className="relative flex flex-col items-center gap-2 p-4 h-auto w-full">
        <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center relative`}>
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
};
