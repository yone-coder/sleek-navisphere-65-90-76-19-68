
import React from 'react';
import { Game } from '@/types/game';
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Star, MoreVertical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SponsoredGamesProps {
  games: Game[];
  isLoading?: boolean;
}

const SponsoredGames: React.FC<SponsoredGamesProps> = ({ games, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <ScrollArea className="w-full" type="scroll">
            <div className="flex gap-4 pb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-none w-[120px]">
                  <Skeleton className="w-[120px] h-[120px] rounded-[24px] mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            Sponsored <span className="text-gray-500">•</span> Suggested for you
          </h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="w-full" type="scroll">
          <div className="flex gap-4 pb-4">
            {games.map((game) => (
              <div 
                key={game.id}
                className="flex-none w-[120px]"
              >
                <div className="relative mb-2">
                  <img
                    src={game.icon}
                    alt={game.title}
                    className="w-[120px] h-[120px] rounded-[24px] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="text-gray-900 text-sm font-medium truncate mb-1">
                  {game.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-600 text-xs">
                  <span>{game.rating}</span>
                  <Star className="w-3 h-3 fill-gray-600 text-gray-600" />
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default SponsoredGames;
