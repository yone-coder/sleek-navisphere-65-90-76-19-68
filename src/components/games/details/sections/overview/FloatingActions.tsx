
import { useState } from "react";
import { Heart, MessageSquare, Share2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface FloatingActionsProps {
  currentPlayers?: number;
  gameTitle?: string;
}

export const FloatingActions = ({ currentPlayers, gameTitle }: FloatingActionsProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1234);
  const [shareCount, setShareCount] = useState(245);
  const [commentCount, setCommentCount] = useState(350);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    setIsLikeAnimating(true);
    setTimeout(() => setIsLikeAnimating(false), 500);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      duration: 2000,
    });
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: gameTitle || 'Game Details',
        text: `Check out this game: ${gameTitle}`,
        url: window.location.href,
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
        setShareCount(prev => prev + 1);
        toast({
          title: "Game shared successfully!",
          duration: 2000,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareCount(prev => prev + 1);
        toast({
          title: "Game link copied to clipboard!",
          duration: 2000,
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
      toast({
        title: "Failed to share game",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-background/80 border-t border-border/40">
      <div className="p-2 space-y-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <Progress value={75} className="w-20 h-2" />
            <span className="text-xs font-medium">75%</span>
          </div>
          <Badge variant="outline" className="text-[10px]">
            {currentPlayers?.toLocaleString()} Playing Now
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleLike}
            className={cn(
              "flex-1 relative overflow-hidden transition-all duration-300 h-7 min-h-0",
              isLiked ? "border-pink-500 text-pink-500 hover:text-pink-600 hover:border-pink-600" 
                     : "hover:border-pink-500/50"
            )}
          >
            <div className="flex items-center justify-center gap-1.5">
              <Heart 
                className={cn(
                  "h-3.5 w-3.5 transition-all duration-300",
                  isLiked && "fill-current",
                  isLikeAnimating && "animate-ping"
                )} 
              />
              <span className="text-xs font-medium">{formatCount(likeCount)}</span>
            </div>
            {isLiked && (
              <div 
                className="absolute inset-0 bg-pink-500/10 animate-fade-out"
                style={{ animationDuration: '0.5s' }}
              />
            )}
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {}}
            className="flex-1 hover:border-blue-500/50 transition-all duration-300 group h-7 min-h-0"
          >
            <div className="flex items-center justify-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 group-hover:text-blue-500 transition-colors duration-300" />
              <span className="text-xs font-medium group-hover:text-blue-500 transition-colors duration-300">
                {formatCount(commentCount)}
              </span>
            </div>
          </Button>

          <Button 
            variant="outline" 
            size="sm"
            onClick={handleShare}
            className="flex-1 hover:border-green-500/50 transition-all duration-300 group h-7 min-h-0"
          >
            <div className="flex items-center justify-center gap-1.5">
              <Share2 className="h-3.5 w-3.5 group-hover:text-green-500 transition-colors duration-300" />
              <span className="text-xs font-medium group-hover:text-green-500 transition-colors duration-300">
                {formatCount(shareCount)}
              </span>
            </div>
          </Button>
        </div>

        <Button 
          size="sm"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white gap-1.5 h-7 min-h-0 text-xs"
        >
          <Play className="h-3.5 w-3.5" />
          Play Now
        </Button>
      </div>
    </div>
  );
};
