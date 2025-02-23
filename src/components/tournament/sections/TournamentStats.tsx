
import { Users, Trophy, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TournamentStatsProps {
  tournament?: {
    current_participants: number;
    max_participants: number;
    prize_pool: number;
  };
}

export function TournamentStats({ tournament }: TournamentStatsProps) {
  const getParticipantProgress = () => {
    if (!tournament) return 0;
    return (tournament.current_participants / tournament.max_participants) * 100;
  };

  const getAvailableSpots = () => {
    if (!tournament) return 0;
    return tournament.max_participants - tournament.current_participants;
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
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <Trophy className="h-8 w-8 text-yellow-500 mr-3 animate-bounce" />
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-300">Prize Pool</span>
            <p className="font-bold text-xl text-gray-800 dark:text-white">
              ${tournament?.prize_pool?.toLocaleString() || "0"}
            </p>
          </div>
        </div>
        <div className="flex items-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
          <DollarSign className="h-8 w-8 text-green-500 mr-3" />
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-300">Entry Fee</span>
            <p className="font-bold text-xl text-gray-800 dark:text-white">$75.00</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-blue-500 mr-3" />
            <span className="text-sm font-medium">
              {tournament?.current_participants || 0}/{tournament?.max_participants || 0} Participants
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
      </div>
    </div>
  );
}
