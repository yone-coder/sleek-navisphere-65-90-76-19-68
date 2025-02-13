
import { useState } from "react";
import { Trophy, Calendar, Heart, MessageSquare, Eye, Share2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Match } from "./types";
import { format, parse, setHours, setMinutes, setSeconds } from "date-fns";
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
    try {
      let dateTime = parse(dateString, 'yyyy-MM-dd', new Date());
      const [hours, minutes, seconds] = timeString.split(':').map(Number);
      dateTime = setHours(dateTime, hours);
      dateTime = setMinutes(dateTime, minutes);
      dateTime = setSeconds(dateTime, seconds);
      return `${format(dateTime, "MMM d, yyyy")} • ${format(dateTime, "h:mm a")}`;
    } catch (error) {
      console.error('Error formatting date/time:', error);
      return 'Invalid date';
    }
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
    <div className="w-[280px] bg-[#1a1a1a] rounded-lg overflow-hidden shrink-0 border border-white/10">
      {/* Header */}
      <div className="p-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3 h-3 text-yellow-500" />
            <h3 className="text-xs font-bold text-white uppercase">
              {match.championship}
            </h3>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "uppercase text-[9px] font-semibold px-1.5 py-0.5",
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
          <Badge variant="secondary" className="bg-gray-800 text-white text-[9px] border-0">
            {match.phase}
          </Badge>
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>{formatMatchDateTime(match.date, match.time)}</span>
          </div>
        </div>
      </div>

      {/* Players */}
      <div className="px-3 pb-3">
        <div className="flex items-center justify-between mb-3">
          {match.opponents.map((opponent, index) => (
            <div key={opponent.name} className="text-center flex-1">
              <Avatar className="w-10 h-10 mx-auto mb-1.5 ring-1 ring-white/10">
                <AvatarImage src={opponent.photo} alt={opponent.name} className="object-cover" />
                <AvatarFallback>{opponent.name[0]}</AvatarFallback>
              </Avatar>
              <h2 className="text-xs font-bold text-white mb-0.5">{opponent.name}</h2>
              <p className="text-[10px] text-gray-400 mb-0.5">{opponent.city}</p>
              <p className="text-[10px] font-medium text-white mb-1.5">
                {opponent.wins}W - {opponent.losses}L
              </p>
              <button
                onClick={() => toggleFollow(opponent.name)}
                className={cn(
                  "text-[10px] font-bold px-3 py-0.5 rounded transition-colors",
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
        <div className="text-center mb-3">
          <h3 className="text-xs font-medium text-gray-400 mb-0.5">eFootball</h3>
          <p className="text-[10px] text-gray-500 mb-0.5">VS</p>
          {match.status === "live" && (
            <p className="text-lg font-bold text-white">2 - 1</p>
          )}
        </div>

        {/* Predictions */}
        {match.predictions && (
          <div className="text-center mb-3">
            <div className="flex justify-between text-[10px] font-medium text-white mb-1">
              <span>{match.predictions.firstPlayer}%</span>
              <span>{match.predictions.secondPlayer}%</span>
            </div>
            <Progress 
              value={match.predictions.firstPlayer} 
              className="h-1 bg-gray-700"
            />
            <p className="text-[10px] text-gray-400 mt-0.5">Fan Prediction Poll</p>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            <span>{formatNumber(match.likes)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            <span>{formatNumber(match.comments)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{formatNumber(match.spectators)}</span>
          </div>
          <button>
            <Share2 className="w-3 h-3" />
          </button>
        </div>

        {/* Watch Button */}
        {match.status === "live" && (
          <button className="w-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors">
            <Eye className="w-3 h-3" />
            Watch Live
          </button>
        )}
      </div>
    </div>
  );
};
