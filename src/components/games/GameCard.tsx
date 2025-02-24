
import { useState } from "react";
import { Heart, MessageSquare, Share2, Plus, Check, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Game } from "./types";
import { useToast } from "@/hooks/use-toast";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(game.bookmarked);
  const { toast } = useToast();

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: `You are ${isFollowing ? "no longer following" : "now following"} ${game.title}`,
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Bookmarked",
      description: `${game.title} has been ${isBookmarked ? "removed from" : "added to"} your bookmarks`,
    });
  };

  const handleShare = () => {
    const shareText = `Check out ${game.title} - ${game.description}`;
    if (navigator.share) {
      navigator.share({
        title: game.title,
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Link copied!",
        description: "Game details copied to clipboard",
      });
    }
  };

  return (
    <div className="w-[280px] shrink-0 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-32">
        <img
          src={game.coverImage}
          alt={`${game.title} cover`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <img
          src={game.creatorImage}
          alt="Creator"
          className="absolute bottom-0 left-0 transform translate-x-3 translate-y-3 w-12 h-12 rounded-full border-2 border-white object-cover"
          loading="lazy"
          decoding="async"
        />
        <button
          onClick={handleBookmark}
          className="absolute top-0 right-0 transform -translate-x-2 translate-y-2 bg-white p-1.5 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        >
          <Bookmark className={cn(
            "w-3 h-3",
            isBookmarked ? "fill-current" : "stroke-current"
          )} />
        </button>
        <div className="absolute top-0 left-0 transform translate-x-2 translate-y-2 flex gap-1">
          {game.type.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className={cn(
                "text-white border-none text-[10px] px-1.5 py-0.5",
                type.toLowerCase() === "1vs1" ? "bg-blue-500" : "bg-green-500"
              )}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1">
            <h2 className="text-lg font-bold">{game.title}</h2>
            {game.verified && (
              <Check className="w-4 h-4 text-green-500" />
            )}
          </div>
          <Button
            variant="default"
            size="sm"
            className={cn(
              "gap-1 text-xs px-2 py-1 h-7",
              isFollowing ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : ""
            )}
            onClick={handleFollow}
          >
            {isFollowing ? (
              <Check className="w-3 h-3" />
            ) : (
              <Plus className="w-3 h-3" />
            )}
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        <p className="text-gray-700 mb-3 text-sm line-clamp-2">{game.description}</p>

        <div className="flex items-center justify-between text-gray-600 mb-3 text-sm">
          <button className="flex items-center gap-1 hover:text-gray-800">
            <Heart className="w-3 h-3 text-red-500" />
            <span>{formatNumber(game.likes)}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-gray-800">
            <MessageSquare className="w-3 h-3" />
            <span>{formatNumber(game.comments)}</span>
          </button>
          <button 
            className="flex items-center gap-1 hover:text-gray-800"
            onClick={handleShare}
          >
            <Share2 className="w-3 h-3" />
            <span>{formatNumber(game.shares)}</span>
          </button>
        </div>

        <Button size="sm" className="w-full text-sm h-8">Play Now</Button>
      </div>
    </div>
  );
};

export default GameCard;
