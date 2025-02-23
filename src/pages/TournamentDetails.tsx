import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { MatchesSection } from "@/components/matches/MatchesSection";
import { Match } from "@/components/matches/types";
import { 
  ArrowLeft, 
  Trophy, 
  Users,
  Loader,
  MessageSquare,
  Share2,
  Heart,
  CalendarClock,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BannerSlider } from "@/components/BannerSlider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  TournamentBrackets } from "@/components/tournament/sections/TournamentBrackets";
import { TournamentRoadmap } from "@/components/tournament/sections/TournamentRoadmap";
import { ParticipantsTable } from "@/components/tournament/sections/ParticipantsTable";
import { TournamentRulesCard } from "@/components/tournament/sections/TournamentRulesCard";

const formatPrizePool = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount}`;
};

const mockTournament = {
  id: "1",
  title: "Winter Championship 2025",
  banner_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
  prize_pool: 100000,
  current_participants: 95,
  max_participants: 128,
  start_date: "2025-01-15",
  end_date: "2025-02-28",
  game: "League of Legends",
  status: "in-progress",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  position: 1
};

const sampleMatches: Match[] = [
  {
    id: 1,
    championship: "World Championship",
    phase: "Quarterfinals",
    status: "live",
    date: "2025-02-12",
    time: "17:45:00",
    venue: "Madison Square Garden",
    location: "New York, USA",
    opponents: [
      {
        name: "Alex Johnson",
        photo: "https://storage.googleapis.com/a1aa/image/u9QlGEQDPW0dq8Wric7AsU_j7PkzMnKLIgLMlSRCv5I.jpg",
        country: "USA",
        city: "New York",
        rank: 1,
        stats: "Top Player",
        wins: 42,
        losses: 12
      },
      {
        name: "Maria Rodriguez",
        photo: "https://storage.googleapis.com/a1aa/image/iG3N08MIvjY6mNComFBnnpKsPY-e90lt6EILTZH3NF8.jpg",
        country: "Spain",
        city: "Miami",
        rank: 2,
        stats: "Rising Star",
        wins: 38,
        losses: 15
      }
    ],
    spectators: 2500,
    likes: 1200,
    comments: 458,
    predictions: {
      firstPlayer: 65,
      secondPlayer: 35
    }
  },
  {
    id: 2,
    championship: "Pro League Finals",
    phase: "Semifinals",
    status: "upcoming",
    date: "2025-02-13",
    time: "19:00:00",
    venue: "O2 Arena",
    location: "London, UK",
    opponents: [
      {
        name: "James Wilson",
        photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        country: "UK",
        city: "London",
        rank: 3,
        stats: "Veteran",
        wins: 36,
        losses: 14
      },
      {
        name: "Sofia Chen",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        country: "China",
        city: "Shanghai",
        rank: 4,
        stats: "Champion",
        wins: 40,
        losses: 10
      }
    ],
    spectators: 1800,
    likes: 950,
    comments: 324,
    predictions: {
      firstPlayer: 45,
      secondPlayer: 55
    }
  },
  {
    id: 3,
    championship: "Regional Cup",
    phase: "Finals",
    status: "done",
    date: "2025-02-11",
    time: "20:30:00",
    venue: "Tokyo Dome",
    location: "Tokyo, Japan",
    opponents: [
      {
        name: "Yuki Tanaka",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        country: "Japan",
        city: "Tokyo",
        rank: 5,
        stats: "Local Favorite",
        wins: 34,
        losses: 16
      },
      {
        name: "Lucas Silva",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        country: "Brazil",
        city: "São Paulo",
        rank: 6,
        stats: "Challenger",
        wins: 32,
        losses: 18
      }
    ],
    spectators: 2200,
    likes: 1100,
    comments: 389,
    predictions: {
      firstPlayer: 52,
      secondPlayer: 48
    }
  }
];

export default function TournamentDetails() {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const { data: tournament, isLoading } = useQuery({
    queryKey: ["tournament", id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTournament;
    },
  });

  const getParticipantProgress = () => {
    if (!tournament) return 0;
    return (tournament.current_participants / tournament.max_participants) * 100;
  };

  const getParticipantProgressColor = () => {
    const progress = getParticipantProgress();
    if (progress >= 90) return "bg-red-500";
    if (progress >= 75) return "bg-orange-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };

  const getAvailableSpotsCount = () => {
    if (!tournament) return 0;
    return tournament.max_participants - tournament.current_participants;
  };

  const getSpotsText = () => {
    if (!tournament) return "Loading...";
    const spots = getAvailableSpotsCount();
    if (spots <= 0) return "Tournament Full";
    if (spots <= 5) return `Only ${spots} spots left!`;
    return `${spots} spots available`;
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    return `${format(new Date(startDate), 'MMM d, yyyy')} - ${format(new Date(endDate), 'MMM d, yyyy')}`;
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

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      duration: 2000,
    });
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'in-progress':
        return 'Ongoing';
      case 'upcoming':
        return 'Soon';
      case 'completed':
        return 'Ended';
      case 'closed':
        return 'Closed';
      default:
        return 'Loading';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20';
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20';
      case 'completed':
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20';
      case 'closed':
        return 'bg-red-50 text-red-700 dark:bg-red-900/20';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="backdrop-blur-lg bg-background/80">
          <div className="h-14 px-4 flex items-center justify-between border-b border-border/40">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-foreground/10"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-base font-medium truncate max-w-[200px]">
                  {tournament?.title || "Tournament Details"}
                </h1>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarClock className="h-3 w-3" />
                  <span>
                    {tournament 
                      ? formatDateRange(tournament.start_date, tournament.end_date)
                      : "Loading..."}
                  </span>
                </div>
              </div>
            </div>
            <Badge 
              variant="outline"
              className={cn(
                "text-[10px] px-1.5 py-0.5 animate-pulse transition-colors duration-300",
                getStatusColor(tournament?.status)
              )}
            >
              {getStatusText(tournament?.status)}
            </Badge>
          </div>

          <div className="px-4 py-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="w-full overflow-x-auto no-scrollbar">
                <TabsList className="w-full h-auto inline-flex whitespace-nowrap">
                  {["overview", "participants", "rules", "matches", "brackets", "faqs", "schedule", "roadmap"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="flex-shrink-0"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-32">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="overview">
            <div className="space-y-6">
              <BannerSlider />
              
              <div className="px-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-yellow-500" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm text-gray-500 dark:text-gray-300">Prize Pool</span>
                      <p className="font-bold text-xl text-gray-800 dark:text-white truncate">
                        {tournament ? formatPrizePool(tournament.prize_pool) : "$0"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      <DollarSign className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm text-gray-500 dark:text-gray-300">Entry Fee</span>
                      <p className="font-bold text-xl text-gray-800 dark:text-white truncate">Free</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    The premier gaming event featuring the latest titles and top competitors from around the world.
                    Join us for an unforgettable experience of competitive gaming at its finest.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Competitive", "Professional", "Global", "Live Streamed", "Ranked"].map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="bg-blue-50 dark:bg-blue-900/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <CalendarClock className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="text-sm">
                      {tournament 
                        ? formatDateRange(tournament.start_date, tournament.end_date)
                        : "Loading..."}
                    </span>
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
                          getAvailableSpotsCount() <= 5 ? "bg-red-100 text-red-800 dark:bg-red-900/30" : ""
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
                    </div>
                  </div>
                </div>

                <div className="flex justify-around mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex flex-col items-center">
                    <Heart className={cn(
                      "h-6 w-6 mb-1",
                      isLiked ? "text-red-500 fill-current" : "text-gray-500"
                    )} />
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
              </div>
            </div>
          </TabsContent>

          <TabsContent value="participants">
            <ParticipantsTable />
          </TabsContent>

          <TabsContent value="rules">
            <TournamentRulesCard />
          </TabsContent>

          <TabsContent value="matches">
            <div className="space-y-12 -mx-4">
              <MatchesSection matches={sampleMatches} title="Quarter Finals" />
              <MatchesSection matches={sampleMatches} title="Group Stage" />
              <MatchesSection matches={sampleMatches} title="Qualifiers" />
            </div>
          </TabsContent>

          <TabsContent value="brackets">
            <TournamentBrackets />
          </TabsContent>

          <TabsContent value="roadmap">
            <TournamentRoadmap />
          </TabsContent>

          {["faqs", "schedule"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="p-4 text-center text-gray-500">
                {tab.charAt(0).toUpperCase() + tab.slice(1)} content coming soon...
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-background/80 border-t border-border/40">
        <div className="p-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {tournament?.current_participants || 0}/{tournament?.max_participants || 0} Participants
                </span>
              </div>
              <span className="text-sm font-medium">
                {getSpotsText()}
              </span>
            </div>
            <Progress 
              value={getParticipantProgress()} 
              className={cn("h-2 transition-all duration-500", getParticipantProgressColor())} 
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/tournament/${id}/comments`)}
              className="flex-1"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>350</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShare}
              className="flex-1"
            >
              <Share2 className="h-4 w-4 mr-2" />
              <span>Share</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLike}
              className={cn(
                "flex-1",
                isLiked && "text-red-500 hover:text-red-600"
              )}
            >
              <Heart className={cn(
                "h-4 w-4 mr-2",
                isLiked && "fill-current"
              )} />
              <span>1.2K</span>
            </Button>
          </div>

          <Button 
            size="sm"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white gap-2"
          >
            <Trophy className="h-4 w-4" />
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
}
