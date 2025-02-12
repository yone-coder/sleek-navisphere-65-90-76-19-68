
import { useState } from "react";
import { Trophy, Globe, Clock, Check, User, Heart, MessageSquare, Share2, Star, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Match } from "./types";
import { format, isValid, parseISO } from "date-fns";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const [isFollowing, setIsFollowing] = useState<{ [key: string]: boolean }>({});

  const calculateTimeLeft = (matchDate: string) => {
    if (match.status !== 'upcoming') return '';
    const date = parseISO(matchDate);
    if (!isValid(date)) return '';
    
    const diff = date.getTime() - new Date().getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatMatchDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) return '';
      return format(date, "d/M/y");
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
  };

  return (
    <div className="w-[320px] animate-fade-in">
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] hover:translate-y-[-2px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4e54ff]/5 to-[#7b5dff]/5 pointer-events-none" />
        
        <div className="relative p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              {match.phase.toLowerCase().includes('final') && (
                <Trophy className="w-4 h-4 text-yellow-400" />
              )}
              <h3 className="text-base font-bold tracking-tight text-white">
                {match.championship}
              </h3>
            </div>
            <Badge 
              variant="outline" 
              className="font-medium uppercase text-[10px] tracking-wider"
            >
              {match.phase}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-white/80">
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>{match.venue}</span>
              </div>
            </div>
            <Badge 
              variant="secondary"
              className={cn(
                "uppercase text-[10px] tracking-wider font-medium",
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
                  <Clock className="w-2.5 h-2.5 mr-1" />
                  {calculateTimeLeft(match.date)}
                </>
              )}
              {match.status === "done" && (
                <>
                  <Check className="w-2.5 h-2.5 mr-1" />
                  Done
                </>
              )}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between gap-4">
            {match.opponents.map((opponent, index) => (
              <div key={opponent.name} className="flex-1 flex items-center gap-4">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative">
                    <Avatar className="w-16 h-16 border-2 border-[#9b87f5] ring-1 ring-white/10">
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
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none text-[10px] px-1.5"
                    >
                      #{opponent.rank}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white">{opponent.name}</h4>
                    <div className="flex items-center justify-center gap-1 text-xs text-white/80">
                      <Globe className="w-3 h-3" />
                      <span>{opponent.country}</span>
                    </div>
                    {match.status !== "upcoming" && opponent.score !== undefined && (
                      <span className={cn(
                        "text-2xl font-bold block",
                        match.status === "done" && 
                        opponent.score === Math.max(...match.opponents.map(o => o.score ?? 0)) 
                          ? "text-green-400" 
                          : "text-white"
                      )}>
                        {opponent.score}
                      </span>
                    )}
                    <button
                      onClick={() => toggleFollow(opponent.name)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all",
                        isFollowing[opponent.name]
                          ? "bg-[#9b87f5] text-white"
                          : "bg-white/10 text-white hover:bg-white/20"
                      )}
                    >
                      {isFollowing[opponent.name] ? 'Following' : 'Follow'}
                    </button>
                  </div>
                </div>
                {index === 0 && (
                  <div className="flex flex-col items-center justify-center text-white/60 px-2">
                    <span className="text-sm font-medium whitespace-nowrap">
                      {formatMatchDate(match.date)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {match.predictions && (
            <div className="space-y-2 bg-white/5 rounded-lg p-3">
              <p className="text-xs font-medium text-white/80">Fan Predictions</p>
              <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-[#9b87f5] rounded-full"
                  style={{ width: `${match.predictions.firstPlayer}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/60">
                <span>{match.predictions.firstPlayer}%</span>
                <span>{match.predictions.secondPlayer}%</span>
              </div>
            </div>
          )}

          {match.highlights && (
            <div className="space-y-1.5 bg-yellow-500/10 rounded-lg p-3">
              <p className="text-xs font-medium text-yellow-400">Highlights</p>
              {match.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-1.5 text-xs text-yellow-300/80">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-white/60">
                <Users className="w-3 h-3" />
                <span className="text-xs">{match.spectators.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 text-white/60">
                <Heart className="w-3 h-3" />
                <span className="text-xs">{match.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-white/60">
                <MessageSquare className="w-3 h-3" />
                <span className="text-xs">{match.comments}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {match.status === 'live' && (
                <button className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-red-600 transition-colors">
                  Watch
                </button>
              )}
              <button className="text-white/60 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
