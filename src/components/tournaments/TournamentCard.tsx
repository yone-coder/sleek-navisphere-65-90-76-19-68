
import React, { useEffect, useState } from 'react';
import { CalendarIcon, Users, Trophy, DollarSign, Heart, Share2, GiftIcon, Globe } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from "sonner";

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
  const [isHovered, setIsHovered] = useState(false);
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

  const getProgressBarColor = (current: number, max: number) => {
    const remainingPercentage = ((max - current) / max) * 100;
    return remainingPercentage < 50 ? '#ea384c' : 'rgb(37 99 235)';
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

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd')}, ${format(end, 'yyyy')}`;
  };

  return (
    <div 
      className={cn(
        "group overflow-hidden rounded-xl shadow-md bg-white dark:bg-gray-800",
        "transition-all duration-300 ease-in-out transform",
        "hover:shadow-xl hover:-translate-y-1",
        "dark:hover:shadow-2xl dark:hover:shadow-blue-500/10",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={tournament?.banner_url || "https://storage.googleapis.com/a1aa/image/1KrFqMU9yacw7XaUF67L6MaKLpXyjGHzZqDa24FBdig.jpg"}
          alt="Tournament banner"
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-in-out",
            isHovered && "scale-110"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Action Buttons */}
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <button 
            onClick={handleLike}
            className={cn(
              "p-1.5 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110",
              isLiked ? "bg-red-500 text-white" : "bg-black/50 text-white hover:bg-red-500/80"
            )}
          >
            <Heart className="h-3.5 w-3.5" fill={isLiked ? "white" : "none"} />
          </button>
          <button 
            onClick={handleShare}
            className="p-1.5 rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-300 transform hover:scale-110 hover:bg-blue-500/80"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Status Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          <div className="bg-red-600 text-white px-2 py-0.5 rounded-full text-xs animate-pulse">
            {countdown}
          </div>
          <div className={cn(
            "text-white px-2 py-0.5 rounded-full text-xs",
            "transform transition-transform duration-300 ease-bounce",
            getStatusColor(tournament?.status)
          )}>
            {getStatusText(tournament?.status)}
          </div>
        </div>

        {/* Tournament Info Tags */}
        <div className="absolute bottom-2 left-2 flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <img
              src="https://storage.googleapis.com/a1aa/image/RW76eSv1bI06GoXLZPNVQlLvVFuloRbfcxmSiTYAc8E.jpg"
              alt="Game icon"
              className="w-6 h-6 rounded-full border-2 border-white/50 group-hover:border-white transition-all duration-300"
            />
            <div className="bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm group-hover:bg-black/70 transition-colors duration-300">
              <span className="text-white text-xs">{tournament?.game || "Chess"}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Globe className="w-4 h-4 text-white" />
            <div className="bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
              <span className="text-white text-xs">Online</span>
            </div>
          </div>
        </div>

        {/* Sponsored Tag */}
        <div className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-2 py-0.5 rounded-full text-xs transform transition-all duration-300 hover:scale-105 flex items-center gap-1">
          <GiftIcon className="w-3 h-3" />
          <span>Sponsored</span>
        </div>
      </div>

      <div className="p-3 transform transition-all duration-300 group-hover:bg-gray-50 dark:group-hover:bg-gray-800/80">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {tournament?.title || "2025 Summer Championship"}
        </h3>

        <div className="space-y-2 mb-2">
          <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
            <CalendarIcon className="h-3 w-3 text-blue-500 mr-1 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs">
              {tournament 
                ? formatDateRange(tournament.start_date, tournament.end_date)
                : "Feb 12 - May 01, 2025"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
              <Users className="h-3 w-3 text-blue-500 mr-1 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs">
                {tournament 
                  ? `${tournament.current_participants}/${tournament.max_participants}`
                  : "128/256"}
              </span>
            </div>
            <span className="text-xs text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
              {tournament 
                ? `${tournament.max_participants - tournament.current_participants} left`
                : "128 left"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 overflow-hidden">
            <div 
              className="h-1.5 rounded-full transition-all duration-700 ease-in-out transform origin-left"
              style={{ 
                width: tournament 
                  ? `${(tournament.current_participants / tournament.max_participants) * 100}%`
                  : "50%",
                backgroundColor: tournament 
                  ? getProgressBarColor(tournament.current_participants, tournament.max_participants)
                  : 'rgb(37 99 235)'
              }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between mb-2 text-xs">
          <div className="flex items-center space-x-1 group-hover:scale-105 transition-transform duration-300">
            <Trophy className="h-3 w-3 text-yellow-500 animate-pulse" />
            <div>
              <span className="text-gray-500 dark:text-gray-400">Prize</span>
              <p className="font-semibold text-gray-800 dark:text-white">
                ${tournament ? tournament.prize_pool.toLocaleString() : "10,000"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 group-hover:scale-105 transition-transform duration-300">
            <DollarSign className="h-3 w-3 text-green-500 animate-pulse" />
            <div>
              <span className="text-gray-500 dark:text-gray-400">Entry</span>
              <p className="font-semibold text-gray-800 dark:text-white">$75</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 text-xs opacity-90 group-hover:opacity-100 transition-opacity duration-300">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
            Register
          </button>
          <button 
            onClick={() => navigate(`/tournament/${tournament?.id || '1'}`)}
            className="flex-1 bg-transparent hover:bg-blue-50 text-blue-600 dark:text-blue-400 font-medium py-1 px-2 border border-blue-600 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg dark:hover:bg-gray-700 dark:border-blue-400"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
