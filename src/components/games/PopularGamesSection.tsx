
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Game } from "./types";
import { GameListItem } from "./GameListItem";

interface PopularGamesSectionProps {
  games: Game[];
}

export const PopularGamesSection = ({ games }: PopularGamesSectionProps) => {
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
                <GameListItem key={game.id} game={game} />
              ))}
            </div>

            {/* Second Column */}
            <div className="flex-none w-[300px] space-y-4">
              {games.slice(3, 6).map((game) => (
                <GameListItem key={game.id} game={game} />
              ))}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
