
import { Users, Trophy, DollarSign, Heart, MessageSquare, Share2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TournamentStatsProps {
  tournament?: {
    current_participants: number;
    max_participants: number;
    prize_pool: number;
  };
  onRegister: () => void;
}

export function TournamentStats({ tournament, onRegister }: TournamentStatsProps) {
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
    <div className="space-y-6">
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
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {tournament?.current_participants} players have joined this tournament
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
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

      <div className="flex justify-around p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="flex flex-col items-center">
          <Heart className="h-6 w-6 mb-1 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">1.2K</span>
        </div>
        <div className="flex flex-col items-center">
          <MessageSquare className="h-6 w-6 mb-1 text-blue-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">350</span>
        </div>
        <div className="flex flex-col items-center">
          <Share2 className="h-6 w-6 mb-1 text-green-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">75</span>
        </div>
        <div className="flex flex-col items-center">
          <Trophy className="h-6 w-6 mb-1 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Top 10</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5" 
          size="lg"
          onClick={onRegister}
        >
          Register Now
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          size="lg"
          onClick={() => window.open('https://discord.gg/tournament', '_blank')}
        >
          Join Discord Community
        </Button>
      </div>
    </div>
  );
}
