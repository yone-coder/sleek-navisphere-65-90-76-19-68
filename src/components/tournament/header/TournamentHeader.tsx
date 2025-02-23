
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Share2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface TournamentHeaderProps {
  title: string;
  isLiked: boolean;
  onBack: () => void;
  onShare: () => void;
  onLike: () => void;
}

export function TournamentHeader({
  title,
  isLiked,
  onBack,
  onShare,
  onLike,
}: TournamentHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/40">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-foreground/10"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold truncate max-w-[200px]">
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-foreground/10"
            onClick={onShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "text-foreground hover:bg-foreground/10",
              isLiked && "text-red-500"
            )}
            onClick={onLike}
          >
            <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-foreground/10"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
