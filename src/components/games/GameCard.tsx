
import { Star, Users, Clock, Heart, Share2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface GameCardProps {
  game: {
    id: number;
    title: string;
    description: string;
    image: string;
    profileImage: string;
    verified: boolean;
    stats: {
      likes: string;
      comments: string;
      shares: string;
    };
    difficulty?: "easy" | "medium" | "hard";
    players?: number;
    rating?: number;
    playTime?: string;
  };
  isLiked?: boolean;
  onLike?: (id: number) => void;
  onShare?: (id: number) => void;
}

const difficultyColors = {
  easy: "bg-green-500",
  medium: "bg-yellow-500",
  hard: "bg-red-500",
};

const GameCard = ({ game, isLiked, onLike, onShare }: GameCardProps) => {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={cn(
            "w-4 h-4",
            index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          )}
        />
      ));
  };

  return (
    <div className="w-[280px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {game.difficulty && (
            <Badge
              className={cn(
                "text-white border-none",
                difficultyColors[game.difficulty]
              )}
            >
              {game.difficulty}
            </Badge>
          )}
        </div>
        <img
          src={game.profileImage}
          alt="Creator"
          className="absolute -bottom-4 left-4 w-12 h-12 rounded-full border-4 border-white"
        />
      </div>

      <div className="p-4 pt-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <HoverCard>
            <HoverCardTrigger>
              <h3 className="font-bold hover:underline cursor-pointer">
                {game.title}
              </h3>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">{game.title}</h4>
                <p className="text-sm text-gray-600">{game.description}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
          {game.verified && (
            <Badge variant="secondary" className="ml-2">
              Verified
            </Badge>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {game.description}
        </p>

        {game.rating && (
          <div className="flex items-center gap-1 mb-2">
            {renderStars(game.rating)}
            <span className="text-sm text-gray-600 ml-1">
              ({game.rating.toFixed(1)})
            </span>
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {game.players && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{game.players} players</span>
            </div>
          )}
          {game.playTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{game.playTime}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <Button
            variant="ghost"
            size="sm"
            className={cn("flex items-center gap-1", 
              isLiked && "text-red-500"
            )}
            onClick={() => onLike?.(game.id)}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
            <span>{game.stats.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{game.stats.comments}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => onShare?.(game.id)}
          >
            <Share2 className="w-4 h-4" />
            <span>{game.stats.shares}</span>
          </Button>
        </div>

        <Button className="w-full">Play Now</Button>
      </div>
    </div>
  );
};

export default GameCard;
