
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Game } from "./types";

interface GameListItemProps {
  game: Game;
  index?: number;
  onNavigate?: (path: string) => void;
}

export const GameListItem = ({ game, index, onNavigate }: GameListItemProps) => {
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <div 
      className="flex items-center gap-4 cursor-pointer"
      onClick={() => game.route && onNavigate?.(game.route)}
    >
      {index !== undefined && (
        <span className="text-lg font-medium text-gray-400 w-6">{index + 1}</span>
      )}
      <img
        src={game.icon}
        alt={`${game.title} icon`}
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{game.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{game.category[0]}</span>
          <span>•</span>
          <span>{game.downloads}</span>
        </div>
        <div className="flex items-center gap-2">
          {renderRating(game.rating)}
          <span className="text-xs text-gray-500">{game.size}</span>
        </div>
      </div>
      <Button className="w-20" size="sm">Install</Button>
    </div>
  );
};
