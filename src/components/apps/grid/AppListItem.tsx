
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { App } from "../types";

interface AppListItemProps {
  app: App;
  isFavorite: boolean;
  onToggleFavorite: (appName: string) => void;
  onClick: () => void;
}

export const AppListItem = ({ app, isFavorite, onToggleFavorite, onClick }: AppListItemProps) => {
  return (
    <div className="relative w-full p-3 hover:bg-gray-50 rounded-lg transition-colors" onClick={onClick}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${app.color} flex items-center justify-center relative flex-shrink-0`}>
          <app.icon className="w-6 h-6 text-white" />
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
};
