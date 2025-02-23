
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface TournamentParticipantStatsProps {
  currentParticipants?: number;
  maxParticipants?: number;
  loading?: boolean;
}

export function TournamentParticipantStats({
  currentParticipants = 0,
  maxParticipants = 0,
  loading = false
}: TournamentParticipantStatsProps) {
  const getParticipantProgress = () => {
    if (maxParticipants === 0) return 0;
    return (currentParticipants / maxParticipants) * 100;
  };

  const getAvailableSpots = () => {
    return maxParticipants - currentParticipants;
  };

  const getSpotsText = () => {
    const spots = getAvailableSpots();
    if (spots <= 0) return "Tournament Full";
    if (spots <= 5) return `Only ${spots} spots left!`;
    return `${spots} spots available`;
  };

  const getParticipantProgressColor = () => {
    const progress = getParticipantProgress();
    if (progress >= 90) return "bg-red-500";
    if (progress >= 75) return "bg-orange-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-blue-500 mr-3" />
          <span className="text-sm font-medium">
            {loading ? "Loading..." : `${currentParticipants}/${maxParticipants} Participants`}
          </span>
        </div>
        <Badge 
          variant="secondary" 
          className={cn(
            "animate-pulse",
            getAvailableSpots() <= 5 ? "bg-red-100 text-red-800 dark:bg-red-900/30" : ""
          )}
        >
          {getSpotsText()}
        </Badge>
      </div>
      <div className="relative">
        <Progress 
          value={getParticipantProgress()} 
          className={cn("h-2 transition-all duration-500", getParticipantProgressColor())} 
        />
        <div className="absolute -top-1 left-0 w-full flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {currentParticipants} players have joined this tournament
      </p>
    </div>
  );
}
