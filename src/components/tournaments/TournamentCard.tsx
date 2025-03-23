
import React, { useEffect, useState } from 'react';
import { CalendarIcon, Users, Trophy, DollarSign, Heart, Share2, Globe } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Tournament {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  status: "upcoming" | "in-progress" | "closed" | "completed";
  prize_pool: number;
  max_participants: number;
  current_participants: number;
  banner_url: string;
  game: string;
}

interface TournamentCardProps {
  className?: string;
  tournament?: Tournament;
}

export const TournamentCard = ({ className, tournament }: TournamentCardProps) => {
  const [countdown, setCountdown] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const targetDate = tournament ? new Date(tournament.start_date).getTime() : new Date('2025-02-12T17:45:00').getTime();

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-green-600';
      case 'upcoming':
        return 'bg-blue-600';
      case 'closed':
        return 'bg-red-600';
      case 'completed':
        return 'bg-gray-600';
      default:
        return 'bg-blue-600';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'in-progress':
        return 'Live';
      case 'upcoming':
        return 'Upcoming';
      case 'closed':
        return 'Closed';
      case 'completed':
        return 'Completed';
      default:
        return 'Upcoming';
    }
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd')}, ${format(end, 'yyyy')}`;
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: tournament?.title || '2025 Summer Championship',
        text: `Check out this tournament: ${tournament?.title}`,
        url: window.location.href,
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Tournament shared successfully!");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Tournament link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
      toast.error("Failed to share tournament");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        clearInterval(interval);
        setCountdown("Event Started");
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Card className={cn(
      "overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md",
      className
    )}>
      <div className="relative">
        {/* Banner image */}
        <div className="h-48 w-full overflow-hidden">
          <img
            src={tournament?.banner_url || "https://storage.googleapis.com/a1aa/image/1KrFqMU9yacw7XaUF67L6MaKLpXyjGHzZqDa24FBdig.jpg"}
            alt="Tournament banner"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge variant="secondary" className="px-2 py-1 font-medium text-xs bg-black/70 text-white backdrop-blur-sm animate-pulse">
            {countdown}
          </Badge>
          <Badge className={cn(
            "px-2 py-1 font-medium text-xs text-white backdrop-blur-sm",
            getStatusColor(tournament?.status)
          )}>
            {getStatusText(tournament?.status)}
          </Badge>
        </div>

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          <button 
            onClick={handleLike}
            className={cn(
              "p-1.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110",
              isLiked ? "bg-red-500 text-white" : "bg-black/50 text-white hover:bg-red-500/80"
            )}
          >
            <Heart className="h-4 w-4" fill={isLiked ? "white" : "none"} />
          </button>
          <button 
            onClick={handleShare}
            className="p-1.5 rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-blue-500/80"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Game badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm">
            <img
              src="https://storage.googleapis.com/a1aa/image/RW76eSv1bI06GoXLZPNVQlLvVFuloRbfcxmSiTYAc8E.jpg"
              alt="Game icon"
              className="w-4 h-4 rounded-full"
            />
            <span className="text-white text-xs font-medium">{tournament?.game || "Chess"}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm">
            <Globe className="w-3 h-3 text-white" />
            <span className="text-white text-xs">Online</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {tournament?.title || "2025 Summer Championship"}
        </h3>

        <div className="space-y-3">
          {/* Date */}
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <CalendarIcon className="h-4 w-4 text-blue-500 mr-2" />
            <span className="text-sm">
              {tournament 
                ? formatDateRange(tournament.start_date, tournament.end_date)
                : "Feb 12 - May 01, 2025"}
            </span>
          </div>

          {/* Participants */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Users className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm">
                  Participants: {tournament 
                    ? `${tournament.current_participants}/${tournament.max_participants}`
                    : "128/256"}
                </span>
              </div>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {tournament 
                  ? `${tournament.max_participants - tournament.current_participants} slots left`
                  : "128 slots left"}
              </span>
            </div>
            
            <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
              <div 
                className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                style={{ 
                  width: tournament 
                    ? `${(tournament.current_participants / tournament.max_participants) * 100}%`
                    : "50%"
                }}
              ></div>
            </div>
          </div>

          {/* Prize & Entry */}
          <div className="flex justify-between py-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Prize Pool</div>
                <div className="font-semibold">${tournament ? tournament.prize_pool.toLocaleString() : "10,000"}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Entry Fee</div>
                <div className="font-semibold">$75</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-md text-sm transition-colors">
              Register
            </button>
            <button 
              onClick={() => navigate(`/tournament/${tournament?.id || '1'}`)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-3 rounded-md text-sm transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
