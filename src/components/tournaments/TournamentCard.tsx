
import React, { useEffect, useState } from 'react';
import { CalendarIcon, Users, Trophy, DollarSign } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';

interface Tournament {
  id: string;
  title: string;
  start_date: string;
  status: "upcoming" | "in-progress" | "closed" | "completed";
  prize_pool: number;
  max_participants: number;
  current_participants: number;
  banner_url: string;
}

interface TournamentCardProps {
  className?: string;
  tournament: Tournament;
}

export const TournamentCard = ({ className, tournament }: TournamentCardProps) => {
  const [countdown, setCountdown] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const targetDate = new Date(tournament.start_date).getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown("Event Started");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, [tournament.start_date]);

  return (
    <div className={cn("rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-lg", className)}>
      {/* Tournament Image */}
      <div className="relative h-32">
        <img
          src={tournament.banner_url}
          alt={`${tournament.title} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs">
          {countdown}
        </div>
        {tournament.status === "in-progress" && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
            Live
          </div>
        )}
      </div>

      {/* Tournament Info */}
      <div className="p-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
          {tournament.title}
        </h3>

        {/* Details Section */}
        <div className="space-y-2 mb-2">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <CalendarIcon className="h-3 w-3 text-blue-500 mr-1" />
            <span className="text-xs">{new Date(tournament.start_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="h-3 w-3 text-blue-500 mr-1" />
              <span className="text-xs">{tournament.current_participants}/{tournament.max_participants}</span>
            </div>
            <span className="text-xs text-blue-600 dark:text-blue-400">
              {tournament.max_participants - tournament.current_participants} left
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-1.5 rounded-full" 
              style={{ 
                width: `${(tournament.current_participants / tournament.max_participants) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Prize & Entry */}
        <div className="flex justify-between mb-2 text-xs">
          <div className="flex items-center space-x-1">
            <Trophy className="h-3 w-3 text-yellow-500" />
            <div>
              <span className="text-gray-500 dark:text-gray-400">Prize</span>
              <p className="font-semibold text-gray-800 dark:text-white">
                ${tournament.prize_pool.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-3 w-3 text-green-500" />
            <div>
              <span className="text-gray-500 dark:text-gray-400">Entry</span>
              <p className="font-semibold text-gray-800 dark:text-white">Free</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 text-xs">
          {tournament.status === "upcoming" && (
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded transition-colors duration-300">
              Register
            </button>
          )}
          <button 
            onClick={() => navigate(`/tournament/${tournament.id}`)}
            className="flex-1 bg-transparent hover:bg-blue-50 text-blue-600 dark:text-blue-400 font-medium py-1 px-2 border border-blue-600 rounded transition-colors duration-300 dark:hover:bg-gray-700 dark:border-blue-400"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
