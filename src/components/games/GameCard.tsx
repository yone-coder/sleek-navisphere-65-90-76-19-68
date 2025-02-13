
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

export const GameCard = ({ game }: GameCardProps) => {
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
    <div className="w-[400px] bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <img
          src={game.coverImage}
          alt={`${game.title} cover`}
          className="w-full h-full object-cover"
        />
        <img
          src={game.creatorImage}
          alt="Creator"
          className="absolute bottom-0 left-0 transform translate-x-4 translate-y-4 w-16 h-16 rounded-full border-4 border-white object-cover"
        />
        <button
          onClick={handleBookmark}
          className="absolute top-0 right-0 transform -translate-x-4 translate-y-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        >
          <Bookmark className={cn(
            "w-4 h-4",
            isBookmarked ? "fill-current" : "stroke-current"
          )} />
        </button>
        <div className="absolute top-0 left-0 transform translate-x-4 translate-y-4 flex gap-2">
          {game.type.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className={cn(
                "text-white border-none",
                type.toLowerCase() === "1vs1" ? "bg-blue-500" : "bg-green-500"
              )}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{game.title}</h2>
            {game.verified && (
              <Check className="w-5 h-5 text-green-500" />
            )}
          </div>
          <Button
            variant="default"
            size="sm"
            className={cn(
              "gap-1",
              isFollowing ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : ""
            )}
            onClick={handleFollow}
          >
            {isFollowing ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        <p className="text-gray-700 mb-4">{game.description}</p>

        <div className="flex items-center justify-between text-gray-600 mb-4">
          <button className="flex items-center gap-1 hover:text-gray-800">
            <Heart className="w-4 h-4 text-red-500" />
            <span>{formatNumber(game.likes)}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-gray-800">
            <MessageSquare className="w-4 h-4" />
            <span>{formatNumber(game.comments)}</span>
          </button>
          <button 
            className="flex items-center gap-1 hover:text-gray-800"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
            <span>{formatNumber(game.shares)}</span>
          </button>
        </div>

        <Button className="w-full">Play Now</Button>
      </div>
    </div>
  );
};
