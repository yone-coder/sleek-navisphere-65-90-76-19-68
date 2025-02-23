
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Game } from "./types";
import { GameListItem } from "./GameListItem";

interface CategorySectionProps {
  title: string;
  games: Game[];
}

export const CategorySection = ({ title, games }: CategorySectionProps) => (
  <div className="mb-8">
    <div className="flex items-center justify-between px-4 mb-4">
      <h2 className="text-xl font-medium text-gray-900">{title}</h2>
      <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
        More <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
    
    <ScrollArea className="w-full" type="scroll">
      <div className="flex px-4 gap-4 pb-4">
        {games.map(game => (
          <div key={game.id} className="flex-none w-[280px]">
            <GameListItem game={game} />
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
);
