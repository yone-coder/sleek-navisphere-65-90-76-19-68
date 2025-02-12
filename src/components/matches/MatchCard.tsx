import { useState } from "react";
import { 
  Trophy, Calendar, Clock, Check, User, Heart, MessageSquare, Share2, Users,
  Globe, Crown, ArrowRight
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Match } from "./types";
import { format, isValid, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const [isFollowing, setIsFollowing] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const formatNumber = (num: number): string => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  const formatMatchDateTime = (dateString: string, timeString: string) => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) return '';
      return `${format(date, "MMM d, yyyy")} • ${format(parseISO(timeString), "h:mm a")}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return '';
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

  const handleShare = () => {
    const shareText = `Check out this match: ${match.opponents[0].name} vs ${match.opponents[1].name} at ${match.championship}!`;
    if (navigator.share) {
      navigator.share({
        title: 'Match Details',
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Link copied!",
        description: "Match details copied to clipboard",
      });
    }
  };

  return (
    <div className="w-[480px] h-[200px] animate-fade-in">
      <div className="relative h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.25)] hover:translate-y-[-2px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/80 to-[#2d3449]/80" />
        
        {/* Header Section */}
        <div className="relative p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {match.phase.toLowerCase().includes('final') && (
                <Trophy className="w-4 h-4 text-yellow-400" />
              )}
              <h3 className="text-base font-bold tracking-tight text-white uppercase">
                {match.championship}
              </h3>
            </div>
            <Badge 
              variant="outline" 
              className="font-semibold uppercase text-[10px] tracking-wider px-2"
            >
              {match.phase}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-white/90">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-medium">
                {formatMatchDateTime(match.date, match.time)}
              </span>
            </div>
            <Badge 
              variant="secondary"
              className={cn(
                "uppercase text-[10px] tracking-wider font-semibold px-2 py-0.5",
                match.status === "live" && "bg-green-500/90 text-white border-none",
                match.status === "upcoming" && "bg-blue-500/90 text-white border-none",
                match.status === "done" && "bg-gray-500/90 text-white border-none"
              )}
            >
              {match.status === "live" && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse mr-1" />
                  Live
                </>
              )}
              {match.status === "upcoming" && (
                <>
                  <Clock className="w-3 h-3 mr-1" />
                  Upcoming
                </>
              )}
              {match.status === "done" && (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Completed
                </>
              )}
            </Badge>
          </div>
        </div>

        {/* Main Content Section - Flexbox layout */}
        <div className="relative p-4 flex justify-between h-[calc(200px-126px)]">
          {/* Left Side - Players */}
          <div className="flex-1">
            <div className="flex items-center justify-between gap-8">
              {match.opponents.map((opponent, index) => (
                <div key={opponent.name} className="flex-1">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-[#9b87f5] ring-1 ring-white/10">
                      <AvatarImage 
                        src={opponent.photo} 
                        alt={opponent.name}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        <User className="w-6 h-6 text-gray-400" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{opponent.name}</span>
                        <Badge 
                          variant="secondary" 
                          className="bg-gradient-to-r from-[#9b87f5] to-[#7b5dff] text-white border-none text-[10px] px-1.5"
                        >
                          #{opponent.rank}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Globe className="w-3 h-3" />
                        <span>{opponent.city}</span>
                      </div>
                      <div className="text-xs font-medium text-white/80 mt-1">
                        {opponent.wins}W - {opponent.losses}L
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Stats & Actions */}
          <div className="flex flex-col justify-between ml-4 border-l border-white/10 pl-4">
            {match.predictions && (
              <div className="w-[120px]">
                <div className="text-xs text-white/80 mb-1">Match Prediction</div>
                <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden mb-1">
                  <div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#9b87f5] to-[#7b5dff] rounded-full"
                    style={{ width: `${match.predictions.firstPlayer}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/60">
                  <span>{match.predictions.firstPlayer}%</span>
                  <span>{match.predictions.secondPlayer}%</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-white/60" />
                <span className="text-xs text-white/60">{formatNumber(match.likes)}</span>
              </div>
              {match.status === 'live' && (
                <button className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-red-600 transition-colors">
                  Watch
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
