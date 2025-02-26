
import React, { useState } from 'react';
import { Game } from '@/types/game';
import { Button } from "@/components/ui/button";
import { Star, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface TopFreeGamesProps {
  games: Game[];
  isLoading?: boolean;
}

const TopFreeGames: React.FC<TopFreeGamesProps> = ({ games, isLoading }) => {
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (gameId: string) => {
    setLoadedImages(prev => ({ ...prev, [gameId]: true }));
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="px-4">
        <Skeleton className="h-7 w-48 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="w-6 h-6" />
              <Skeleton className="w-16 h-16 rounded-xl" />
              <div className="flex-1">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="w-20 h-9" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <h2 className="text-xl font-medium text-gray-900 mb-4">Top Free Games</h2>
      <div className="space-y-4">
        {games.map((game, index) => (
          <div 
            key={game.id}
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => game.route && navigate(game.route)}
          >
            <span className="text-lg font-medium text-gray-400 w-6">{index + 1}</span>
            <div className="relative w-16 h-16">
              {!loadedImages[game.id] && (
                <Skeleton className="absolute inset-0 w-16 h-16 rounded-xl" />
              )}
              <img
                src={game.icon}
                alt={`${game.title} icon`}
                className={`w-16 h-16 rounded-xl object-cover ${
                  !loadedImages[game.id] ? 'invisible' : ''
                }`}
                onLoad={() => handleImageLoad(game.id)}
              />
            </div>
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
            <Button 
              className="relative w-20 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:via-blue-500 hover:to-indigo-500 text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1.5 border border-indigo-400/30 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] backdrop-blur-sm overflow-hidden group rounded-lg animate-fade-in"
              size="sm"
            >
              <PlayCircle className="w-3 h-3 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10">Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-transparent to-indigo-600/10" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopFreeGames;
