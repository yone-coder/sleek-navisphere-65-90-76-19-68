
import { Heart, MessageSquare, Share2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TournamentActionsProps {
  isLiked: boolean;
  onLike: () => void;
  onRegister: () => void;
  stats: {
    likes: number;
    comments: number;
    shares: number;
    ranking?: string;
  };
}

export function TournamentActions({
  isLiked,
  onLike,
  onRegister,
  stats
}: TournamentActionsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-around p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="flex flex-col items-center">
          <Heart 
            className={cn(
              "h-6 w-6 mb-1",
              isLiked ? "text-red-500 fill-current" : "text-gray-500"
            )}
            onClick={onLike}
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {stats.likes}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <MessageSquare className="h-6 w-6 mb-1 text-blue-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {stats.comments}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <Share2 className="h-6 w-6 mb-1 text-green-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {stats.shares}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <Trophy className="h-6 w-6 mb-1 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {stats.ranking || "Top 10"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5" 
          size="lg"
          onClick={onRegister}
        >
          Register Now
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          size="lg"
          onClick={() => window.open('https://discord.gg/tournament', '_blank')}
        >
          Join Discord Community
        </Button>
      </div>
    </div>
  );
}
