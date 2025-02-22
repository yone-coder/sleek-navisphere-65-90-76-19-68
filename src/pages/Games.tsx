
import { Game } from "@/types/games";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Games() {
  const navigate = useNavigate();

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Featured Games</h1>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-4">
            {games.map(game => (
              <Button
                key={game.id}
                variant="ghost"
                className="h-auto p-0 w-[280px] text-left"
                onClick={() => game.route && navigate(game.route)}
              >
                <div className="w-full">
                  <div className="relative aspect-[4/3] mb-2">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    {game.isEditorChoice && (
                      <Badge
                        className="absolute top-2 left-2 bg-white/90 text-black"
                        variant="secondary"
                      >
                        Editor's Choice
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm mb-1 text-white">{game.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{game.downloads}</span>
                    <Badge variant="secondary" className="text-[10px]">
                      Free
                    </Badge>
                  </div>
                  {renderRating(game.rating)}
                </div>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
