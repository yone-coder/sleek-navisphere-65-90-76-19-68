
import { useState } from "react";
import { Trophy, Calendar, Heart, MessageSquare, Eye, Share2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Match } from "./types";
import { format, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const [isFollowing, setIsFollowing] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const formatNumber = (num: number): string => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatMatchDateTime = (dateString: string, timeString: string) => {
    // Combine date and time strings to create a valid ISO datetime string
    const dateTimeString = `${dateString}T${timeString}`;
    const date = parseISO(dateTimeString);
    return `${format(date, "MMM d, yyyy")} • ${format(date, "h:mm a")}`;
  };

  const toggleFollow = (playerName: string) => {
    setIsFollowing(prev => ({
      ...prev,
      [playerName]: !prev[playerName]
    }));
    toast({
      title: isFollowing[playerName] ? "Unfollowed" : "Following",
      description: `You are ${isFollowing[playerName] ? "no longer following" : "now following"} ${playerName}`,
    });
  };

  return (
    <div className="w-[360px] bg-[#1a1a1a] rounded-lg overflow-hidden shrink-0 border border-white/10">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <h3 className="text-sm font-bold text-white uppercase">
              {match.championship}
            </h3>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "uppercase text-[10px] font-semibold px-2 py-0.5",
              match.status === "live" && "bg-green-500 text-white"
            )}
          >
            {match.status === "live" && (
              <>
                <span className="w-1 h-1 rounded-full bg-white animate-pulse mr-1 inline-block" />
                Live
              </>
            )}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-gray-800 text-white text-[10px] border-0">
            {match.phase}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>{formatMatchDateTime(match.date, match.time)}</span>
          </div>
        </div>
      </div>

      {/* Players */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          {match.opponents.map((opponent, index) => (
            <div key={opponent.name} className="text-center flex-1">
              <Avatar className="w-14 h-14 mx-auto mb-2 ring-2 ring-white/10">
                <AvatarImage src={opponent.photo} alt={opponent.name} className="object-cover" />
                <AvatarFallback>{opponent.name[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-sm font-bold text-white mb-0.5">{opponent.name}</h2>
              <p className="text-xs text-gray-400 mb-0.5">{opponent.city}</p>
              <p className="text-xs font-medium text-white mb-2">
                {opponent.wins}W - {opponent.losses}L
              </p>
              <button
                onClick={() => toggleFollow(opponent.name)}
                className={cn(
                  "text-xs font-bold px-4 py-1 rounded transition-colors",
                  isFollowing[opponent.name]
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                )}
              >
                {isFollowing[opponent.name] ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>

        {/* Game Info */}
        <div className="text-center mb-4">
          <h3 className="text-sm font-medium text-gray-400 mb-1">eFootball</h3>
          <p className="text-xs text-gray-500 mb-1">VS</p>
          {match.status === "live" && (
            <p className="text-xl font-bold text-white">2 - 1</p>
          )}
        </div>

        {/* Predictions */}
        {match.predictions && (
          <div className="text-center mb-4">
            <div className="flex justify-between text-xs font-medium text-white mb-1">
              <span>{match.predictions.firstPlayer}%</span>
              <span>{match.predictions.secondPlayer}%</span>
            </div>
            <Progress 
              value={match.predictions.firstPlayer} 
              className="h-1.5 bg-gray-700"
            />
            <p className="text-xs text-gray-400 mt-1">Fan Prediction Poll</p>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" />
            <span>{formatNumber(match.likes)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{formatNumber(match.comments)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{formatNumber(match.spectators)}</span>
          </div>
          <button>
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Watch Button */}
        {match.status === "live" && (
          <button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 rounded flex items-center justify-center gap-2 transition-colors">
            <Eye className="w-4 h-4" />
            Watch Live
          </button>
        )}
      </div>
    </div>
  );
};
