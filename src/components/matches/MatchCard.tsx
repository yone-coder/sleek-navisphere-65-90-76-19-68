
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
      return `${format(date, "MMM d, yyyy")} • ${timeString}`;
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
    <div className="w-[360px] animate-fade-in">
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.25)] hover:translate-y-[-2px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2c]/80 to-[#2d3449]/80" />
        
        {/* Header Section */}
        <div className="relative p-5 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {match.phase.toLowerCase().includes('final') && (
                <Trophy className="w-5 h-5 text-yellow-400" />
              )}
              <h3 className="text-lg font-bold tracking-tight text-white uppercase">
                {match.championship}
              </h3>
            </div>
            <Badge 
              variant="outline" 
              className="font-semibold uppercase text-[10px] tracking-wider px-3"
            >
              {match.phase}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-white/90">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">
                {formatMatchDateTime(match.date, match.time)}
              </span>
            </div>
            <Badge 
              variant="secondary"
              className={cn(
                "uppercase text-xs tracking-wider font-semibold px-3 py-0.5",
                match.status === "live" && "bg-green-500/90 text-white border-none",
                match.status === "upcoming" && "bg-blue-500/90 text-white border-none",
                match.status === "done" && "bg-gray-500/90 text-white border-none"
              )}
            >
              {match.status === "live" && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-1.5" />
                  Live
                </>
              )}
              {match.status === "upcoming" && (
                <>
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  Upcoming
                </>
              )}
              {match.status === "done" && (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5" />
                  Completed
                </>
              )}
            </Badge>
          </div>
        </div>

        {/* Opponents Section */}
        <div className="relative p-5">
          <div className="flex items-center justify-between gap-4">
            {match.opponents.map((opponent, index) => (
              <div key={opponent.name} className="flex-1">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-2 border-[#9b87f5] ring-2 ring-white/10">
                      <AvatarImage 
                        src={opponent.photo} 
                        alt={opponent.name}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        <User className="w-8 h-8 text-gray-400" />
                      </AvatarFallback>
                    </Avatar>
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-[#9b87f5] to-[#7b5dff] text-white border-none text-xs px-2 py-0.5"
                    >
                      #{opponent.rank}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-base font-bold text-white">{opponent.name}</h4>
                      <div className="flex items-center justify-center gap-1.5 mt-1 text-sm text-white/80">
                        <Globe className="w-3.5 h-3.5" />
                        <span>{opponent.city}</span>
                      </div>
                    </div>

                    {match.status !== "upcoming" && opponent.score !== undefined && (
                      <div className={cn(
                        "text-3xl font-bold",
                        match.status === "done" && 
                        opponent.score === Math.max(...match.opponents.map(o => o.score ?? 0)) 
                          ? "text-green-400" 
                          : "text-white"
                      )}>
                        {opponent.score}
                      </div>
                    )}

                    <div className="text-sm font-medium text-white/90">
                      {opponent.wins}W - {opponent.losses}L
                    </div>

                    <button
                      onClick={() => toggleFollow(opponent.name)}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                        isFollowing[opponent.name]
                          ? "bg-[#9b87f5] text-white"
                          : "bg-white/10 text-white hover:bg-white/20"
                      )}
                    >
                      {isFollowing[opponent.name] ? 'Following' : 'Follow'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-white/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Predictions Section */}
        {match.predictions && (
          <div className="px-5 pb-5">
            <div className="bg-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/90 font-medium">Match Prediction</span>
                <span className="text-white/60">
                  {match.predictions.firstPlayer + match.predictions.secondPlayer} votes
                </span>
              </div>
              
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#9b87f5] to-[#7b5dff] rounded-full"
                  style={{ width: `${match.predictions.firstPlayer}%` }}
                />
              </div>
              
              <div className="flex justify-between text-sm text-white/80">
                <span>{match.predictions.firstPlayer}%</span>
                <span>{match.predictions.secondPlayer}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Section */}
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{formatNumber(match.likes)}</span>
              </button>
              <button className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">{formatNumber(match.comments)}</span>
              </button>
              {match.status === 'live' && (
                <div className="flex items-center gap-1.5 text-white/60">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{formatNumber(match.spectators)}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {match.status === 'live' && (
                <button className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-red-600 transition-colors">
                  Watch Live
                </button>
              )}
              <button 
                onClick={handleShare}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
