
import { useState } from "react";
import { Trophy, Globe, Clock, Check, User, Heart, MessageSquare, Share2, Star, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Match } from "./types";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const [isFollowing, setIsFollowing] = useState<{ [key: string]: boolean }>({});

  const calculateTimeLeft = (matchDate: string) => {
    if (match.status !== 'upcoming') return '';
    const diff = new Date(matchDate).getTime() - new Date().getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const toggleFollow = (playerName: string) => {
    setIsFollowing(prev => ({
      ...prev,
      [playerName]: !prev[playerName]
    }));
  };

  return (
    <div className="w-[450px] animate-fade-in">
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] hover:translate-y-[-2px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4e54ff]/5 to-[#7b5dff]/5 pointer-events-none" />
        
        <div className="relative p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {match.phase.toLowerCase().includes('final') && (
                <Trophy className="w-5 h-5 text-yellow-400" />
              )}
              <h3 className="text-xl font-bold tracking-tight text-white">
                {match.championship}
              </h3>
            </div>
            <Badge 
              variant="outline" 
              className="font-medium uppercase text-xs tracking-wider"
            >
              {match.phase}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-white/80">
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>{match.venue}, {match.location}</span>
              </div>
            </div>
            <Badge 
              variant="secondary"
              className={cn(
                "uppercase text-xs tracking-wider font-medium",
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
                  <Clock className="w-3 h-3 mr-1.5" />
                  {calculateTimeLeft(match.date)}
                </>
              )}
              {match.status === "done" && (
                <>
                  <Check className="w-3 h-3 mr-1.5" />
                  Completed
                </>
              )}
            </Badge>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="flex items-center justify-between gap-8">
            {match.opponents.map((opponent, index) => (
              <div key={opponent.name} className="flex-1">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-2 border-[#9b87f5] ring-2 ring-white/10">
                      <AvatarImage 
                        src={opponent.photo} 
                        alt={opponent.name}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        <User className="w-12 h-12 text-gray-400" />
                      </AvatarFallback>
                    </Avatar>
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none"
                    >
                      #{opponent.rank}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-bold text-white">{opponent.name}</h4>
                    <div className="flex items-center justify-center gap-2 text-sm text-white/80">
                      <Globe className="w-4 h-4" />
                      <span>{opponent.country}</span>
                    </div>
                    <p className="text-sm text-white/60">{opponent.stats}</p>
                    {match.status !== "upcoming" && opponent.score !== undefined && (
                      <span className={cn(
                        "text-3xl font-bold mt-2 block",
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
          </div>

          {match.predictions && (
            <div className="space-y-3 bg-white/5 rounded-xl p-4">
              <p className="text-sm font-medium text-white/80">Fan Predictions</p>
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-[#9b87f5] rounded-full"
                  style={{ width: `${match.predictions.firstPlayer}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-white/60">
                <span>{match.predictions.firstPlayer}%</span>
                <span>{match.predictions.secondPlayer}%</span>
              </div>
            </div>
          )}

          {match.highlights && (
            <div className="space-y-2 bg-yellow-500/10 rounded-xl p-4">
              <p className="font-medium text-yellow-400">Match Highlights</p>
              {match.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-yellow-300/80">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 text-white/60">
                <Users className="w-4 h-4" />
                <span>{match.spectators.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60">
                <Heart className="w-4 h-4" />
                <span>{match.likes}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60">
                <MessageSquare className="w-4 h-4" />
                <span>{match.comments}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {match.status === 'live' && (
                <button className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-red-600 transition-colors">
                  Watch Live
                </button>
              )}
              <button className="text-white/60 hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
