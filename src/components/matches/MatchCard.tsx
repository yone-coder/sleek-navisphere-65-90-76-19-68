import { useState } from "react";
import { Trophy, Calendar, Eye, Play } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Match } from "./types";
import { format, parse, setHours, setMinutes, setSeconds } from "date-fns";
import { useNavigate } from "react-router-dom";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const navigate = useNavigate();

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

  const handleCardClick = () => {
    navigate(`/match/${match.id}`);
  };

  return (
    <div 
      className="w-full bg-[#1a1a1a] rounded-lg overflow-hidden border border-white/10 cursor-pointer hover:border-white/20 transition-colors"
    >
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

      <div className="px-3 pb-3">
        <div className="flex items-center justify-between relative mb-3">
          <div className="text-center w-1/3">
            <Avatar className="w-10 h-10 mx-auto mb-1.5 ring-1 ring-white/10">
              <AvatarImage src={match.opponents[0].photo} alt={match.opponents[0].name} className="object-cover" />
              <AvatarFallback>{match.opponents[0].name[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-xs font-bold text-white mb-0.5">{match.opponents[0].name}</h2>
            <p className="text-[10px] text-gray-400 mb-0.5">{match.opponents[0].city}</p>
            <p className="text-[10px] font-medium text-white">
              {match.opponents[0].wins}W - {match.opponents[0].losses}L
            </p>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h3 className="text-xs font-medium text-gray-400 mb-0.5">eFootball</h3>
            <p className="text-[10px] text-gray-500 mb-0.5">VS</p>
            {match.status === "live" && (
              <p className="text-lg font-bold text-white">2 - 1</p>
            )}
          </div>

          <div className="text-center w-1/3">
            <Avatar className="w-10 h-10 mx-auto mb-1.5 ring-1 ring-white/10">
              <AvatarImage src={match.opponents[1].photo} alt={match.opponents[1].name} className="object-cover" />
              <AvatarFallback>{match.opponents[1].name[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-xs font-bold text-white mb-0.5">{match.opponents[1].name}</h2>
            <p className="text-[10px] text-gray-400 mb-0.5">{match.opponents[1].city}</p>
            <p className="text-[10px] font-medium text-white">
              {match.opponents[1].wins}W - {match.opponents[1].losses}L
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button 
            className="text-white text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors bg-blue-500 hover:bg-blue-600"
            onClick={handleCardClick}
          >
            <Eye className="w-3 h-3" />
            View Details
          </button>
          <button 
            className="text-white text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors bg-red-500 hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              // Add watch live functionality here
            }}
          >
            <Play className="w-3 h-3" />
            Watch Live
          </button>
        </div>
      </div>
    </div>
  );
};
