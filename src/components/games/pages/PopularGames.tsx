
import React from 'react';
import { Game } from '@/types/game';
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PopularGamesProps {
  games: Game[];
  isLoading?: boolean;
}

const PopularGames: React.FC<PopularGamesProps> = ({ games, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>

          <ScrollArea className="w-full" type="scroll">
            <div className="flex gap-6 pb-4">
              {/* First Column */}
              <div className="flex-none w-[300px] space-y-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <Skeleton className="w-16 h-16 rounded-2xl" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Column */}
              <div className="flex-none w-[300px] space-y-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <Skeleton className="w-16 h-16 rounded-2xl" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              Browse popular games
            </h2>
            <p className="text-gray-500">A great place to start</p>
          </div>
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="w-full" type="scroll">
          <div className="flex gap-6 pb-4">
            {/* First Column */}
            <div className="flex-none w-[300px] space-y-4">
              {games.slice(0, 3).map((game) => (
                <div 
                  key={game.id}
                  className="flex gap-4 items-center"
                >
                  <img
                    src={game.icon}
                    alt={game.title}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-base truncate">
                      {game.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {game.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600">{game.rating} ★</span>
                      <span className="text-sm text-gray-600">{game.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Column */}
            <div className="flex-none w-[300px] space-y-4">
              {games.slice(3, 6).map((game) => (
                <div 
                  key={game.id}
                  className="flex gap-4 items-center"
                >
                  <img
                    src={game.icon}
                    alt={game.title}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-base truncate">
                      {game.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {game.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-600">{game.rating} ★</span>
                      <span className="text-sm text-gray-600">{game.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default PopularGames;

