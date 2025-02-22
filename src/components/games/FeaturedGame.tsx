
import { useNavigate } from "react-router-dom";
import { Check, Bookmark, Users, Trophy, Heart, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Game } from "@/types/games";
import { formatNumber } from "@/lib/format";

interface FeaturedGameProps {
  game: Game;
  onSave: (gameId: string) => void;
  isSaved: boolean;
}

export function FeaturedGame({ game, onSave, isSaved }: FeaturedGameProps) {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="absolute inset-0">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      
      <div className="relative p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm">
              <img 
                src={game.logo}
                alt={`${game.title} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-bold">{game.title}</h3>
                {game.verified && (
                  <Check className="w-5 h-5 text-blue-400" />
                )}
              </div>
              <p className="text-sm text-gray-200 max-w-xl">
                {game.description}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSave(game.id)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
          >
            <Bookmark className={cn(
              "w-5 h-5",
              isSaved ? "fill-white text-white" : "text-white"
            )} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm mb-1">
              <Users className="w-4 h-4" />
              <span>Active Players</span>
            </div>
            <span className="text-xl font-bold">
              {formatNumber(game.activePlayers)}
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm mb-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>Tournaments</span>
            </div>
            <span className="text-xl font-bold">
              {formatNumber(game.tournaments)}
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm mb-1">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Likes</span>
            </div>
            <span className="text-xl font-bold">
              {formatNumber(game.likes)}
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm mb-1">
              <MessageSquare className="w-4 h-4" />
              <span>Comments</span>
            </div>
            <span className="text-xl font-bold">
              {formatNumber(game.comments)}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>{formatNumber(game.comments)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span>{formatNumber(game.shares)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate("/tournaments")}
            >
              <Trophy className="w-4 h-4 mr-2" />
              View Tournaments
            </Button>
            <Button 
              className="bg-white text-blue-600 hover:bg-white/90"
              onClick={() => game.route && navigate(game.route)}
            >
              Play Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
