
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Search, 
  Share2, 
  Heart, 
  MessageSquare, 
  Trophy, 
  DollarSign, 
  Users,
  CalendarClock,
  Filter,
  MoreVertical,
  Bell,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TournamentDetails() {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { toast } = useToast();

  const { data: tournament, isLoading } = useQuery({
    queryKey: ["tournament", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      duration: 2000,
    });
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: tournament?.title || 'Tournament Details',
        text: `Check out this tournament: ${tournament?.title}`,
        url: window.location.href,
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Tournament shared successfully!",
          duration: 2000,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Tournament link copied to clipboard!",
          duration: 2000,
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
      toast({
        title: "Failed to share tournament",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const getParticipantProgress = () => {
    if (!tournament) return 0;
    return (tournament.current_participants / tournament.max_participants) * 100;
  };

  const getAvailableSpots = () => {
    if (!tournament) return 0;
    return tournament.max_participants - tournament.current_participants;
  };

  const getParticipantProgressColor = () => {
    const progress = getParticipantProgress();
    if (progress >= 90) return "bg-red-500";
    if (progress >= 75) return "bg-orange-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-background/80 border-t border-border/40">
      <div className="px-4 pt-3">
        {/* Tournament Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="flex flex-col items-center p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-all">
            <Trophy className="h-4 w-4 text-yellow-500 mb-1" />
            <span className="text-xs font-medium">${tournament?.prize_pool?.toLocaleString() || "0"}</span>
            <span className="text-[10px] text-muted-foreground">Prize Pool</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-all">
            <CalendarClock className="h-4 w-4 text-blue-500 mb-1" />
            <span className="text-xs font-medium">
              {tournament?.start_date ? format(new Date(tournament.start_date), 'MMM dd') : 'TBA'}
            </span>
            <span className="text-[10px] text-muted-foreground">Start Date</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-all">
            <Users className="h-4 w-4 text-green-500 mb-1" />
            <span className="text-xs font-medium">{getAvailableSpots()}</span>
            <span className="text-[10px] text-muted-foreground">Spots Left</span>
          </div>
        </div>

        {/* Participants Progress Section */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {tournament?.current_participants || 0}/{tournament?.max_participants || 0} Participants
              </span>
            </div>
            <Badge 
              variant="secondary" 
              className={cn(
                "animate-pulse transition-colors duration-500",
                getAvailableSpots() <= 0 
                  ? "bg-red-100 text-red-800 dark:bg-red-900/20" 
                  : getAvailableSpots() <= 5
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20"
                  : "bg-green-100 text-green-800 dark:bg-green-900/20"
              )}
            >
              {getAvailableSpots() <= 0 
                ? "Tournament Full" 
                : getAvailableSpots() <= 5
                ? `Only ${getAvailableSpots()} spots left!`
                : `${getAvailableSpots()} spots available`}
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <Progress 
              value={getParticipantProgress()} 
              className={cn(
                "h-2 transition-all duration-500", 
                getParticipantProgressColor()
              )} 
            />
            {getParticipantProgress() >= 75 && (
              <span className="absolute right-0 top-[-20px] text-xs text-red-500 animate-bounce">
                Filling fast!
              </span>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between px-1 mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0 rounded-full",
                notificationsEnabled && "text-blue-500"
              )}
              onClick={() => {
                setNotificationsEnabled(!notificationsEnabled);
                toast({
                  title: notificationsEnabled ? "Notifications disabled" : "Notifications enabled",
                  description: notificationsEnabled ? 
                    "You won't receive updates about this tournament" :
                    "You'll receive updates about this tournament"
                });
              }}
            >
              <Bell 
                className="h-4 w-4" 
                fill={notificationsEnabled ? "currentColor" : "none"}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0 rounded-full",
                isLiked && "text-red-500"
              )}
              onClick={handleLike}
            >
              <Heart 
                className="h-4 w-4" 
                fill={isLiked ? "currentColor" : "none"}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
