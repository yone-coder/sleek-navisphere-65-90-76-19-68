
import { Button } from "@/components/ui/button";
import { Heart, GitCompare, Share2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryActionsProps = {
  isWishlisted: boolean;
  onWishlistToggle: () => void;
  onShare: () => void;
  onFullscreen: () => void;
};

export function GalleryActions({
  isWishlisted,
  onWishlistToggle,
  onShare,
  onFullscreen
}: GalleryActionsProps) {
  return (
    <div className="absolute top-4 right-4 z-50 flex gap-2">
      <Button 
        variant="outline" 
        size="sm"
        className={cn(
          "h-10 w-10 rounded-lg backdrop-blur-md border-0 shadow-lg",
          "transition-all duration-300 hover:scale-110",
          isWishlisted 
            ? "bg-pink-500/20 text-pink-500 hover:bg-pink-500/30" 
            : "bg-black/20 text-white hover:bg-black/30"
        )}
        onClick={onWishlistToggle}
      >
        <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
      </Button>

      <Button 
        variant="outline" 
        size="sm"
        className={cn(
          "h-10 w-10 rounded-lg backdrop-blur-md border-0",
          "bg-black/20 text-white hover:bg-black/30",
          "transition-all duration-300 hover:scale-110",
          "shadow-lg"
        )}
      >
        <GitCompare className="w-4 h-4" />
      </Button>

      <Button 
        variant="outline" 
        size="sm"
        className={cn(
          "h-10 w-10 rounded-lg backdrop-blur-md border-0",
          "bg-black/20 text-white hover:bg-black/30",
          "transition-all duration-300 hover:scale-110",
          "shadow-lg"
        )}
        onClick={onShare}
      >
        <Share2 className="w-4 h-4" />
      </Button>

      <Button 
        variant="outline" 
        size="sm"
        className={cn(
          "h-10 w-10 rounded-lg backdrop-blur-md border-0",
          "bg-black/20 text-white hover:bg-black/30",
          "transition-all duration-300 hover:scale-110",
          "shadow-lg"
        )}
        onClick={onFullscreen}
      >
        <Maximize2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
