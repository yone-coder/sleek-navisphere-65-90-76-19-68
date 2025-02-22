
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import GameCard from "@/components/games/GameCard";

interface GameSectionProps {
  title: string;
  games: any[];
  onLike: (id: number) => void;
  onShare: (id: number) => void;
  likedGames: number[];
}

export const GameSection = ({ title, games, onLike, onShare, likedGames }: GameSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center px-4 mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">{title}</h1>
          <Badge variant="secondary" className="rounded-full">
            {games.length}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="text-sm">
          See All
        </Button>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 px-4 pb-4">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onLike={onLike}
              onShare={onShare}
              isLiked={likedGames.includes(game.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
