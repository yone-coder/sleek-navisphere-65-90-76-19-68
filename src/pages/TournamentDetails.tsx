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
  DollarSign,
  MapPin,
  Globe,
  GamepadIcon,
  Clock,
  Users2,
  Calendar
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TournamentCommentsPanel } from "@/components/tournament/sections/TournamentCommentsPanel";

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
  const [likeCount, setLikeCount] = useState(1234);
  const [shareCount, setShareCount] = useState(245);
  const [commentCount, setCommentCount] = useState(350);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);
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

  const getProgressStatus = () => {
    const progress = getParticipantProgress();
    if (progress >= 90) return "Almost Full!";
    if (progress >= 75) return "Filling Fast!";
    if (progress >= 50) return "Active";
    return "Open";
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
        setShareCount(prev => prev + 1);
        toast({
          title: "Tournament shared successfully!",
          duration: 2000,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareCount(prev => prev + 1);
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
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    setIsLikeAnimating(true);
    setTimeout(() => setIsLikeAnimating(false), 500);
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

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
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

      <div className={cn("pt-24", activeTab === "overview" ? "pb-48" : "pb-4")}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="overview">
            <div className="space-y-6">
              <BannerSlider />
              
              <div className="px-4">
                {/* Stats Grid */}
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

                {/* Tournament Details */}
                <div className="space-y-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tournament Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <GamepadIcon className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Game</p>
                            <p className="text-sm font-medium">{tournament?.game}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Region</p>
                            <p className="text-sm font-medium">International</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="text-sm font-medium">Online & LAN Finals</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users2 className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Team Size</p>
                            <p className="text-sm font-medium">5v5</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Check-in Time</p>
                            <p className="text-sm font-medium">30 mins before</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Match Duration</p>
                            <p className="text-sm font-medium">~45 mins</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">About Tournament</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Join us for an epic gaming showdown in the {tournament?.title}! This premier tournament 
                        brings together the most skilled players from around the world to compete for glory 
                        and incredible prizes. Whether you're a seasoned pro or an ambitious newcomer, 
                        this tournament offers an unforgettable competitive experience.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Competitive", "Professional", "Global", "Live Streamed", "Ranked", "Official"].map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="bg-blue-50 dark:bg-blue-900/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tournament Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Important Dates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Registration Opens</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(tournament?.start_date || new Date()), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium">Group Stage Begins</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(tournament?.start_date || new Date()), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                            <Trophy className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">Finals</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(tournament?.end_date || new Date()), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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

      {activeTab === "overview" && (
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-lg bg-background/80 border-t border-border/40">
          <div className="p-4 space-y-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {tournament?.current_participants || 0}/{tournament?.max_participants || 0}
                    </span>
                    <span className="text-xs text-muted-foreground">Participants</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "px-2 py-0.5 text-[10px]",
                      getParticipantProgress() >= 90 ? "bg-red-100 text-red-700 dark:bg-red-900/20" :
                      getParticipantProgress() >= 75 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20" :
                      getParticipantProgress() >= 50 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20" :
                      "bg-blue-100 text-blue-700 dark:bg-blue-900/20"
                    )}
                  >
                    {getProgressStatus()}
                  </Badge>
                  <span className="text-xs text-muted-foreground mt-1">
                    {getSpotsText()}
                  </span>
                </div>
              </div>

              <div className="relative">
                <Progress 
                  value={getParticipantProgress()} 
                  className="h-2.5 transition-all duration-500" 
                />
                {getParticipantProgress() >= 75 && (
                  <div className="absolute -top-1 right-0 transform translate-x-1/2 -translate-y-full">
                    <div className="animate-bounce">
                      <Badge 
                        variant="outline" 
                        className="bg-red-100 text-red-700 dark:bg-red-900/20 text-[10px]"
                      >
                        Limited Spots!
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLike}
                className={cn(
                  "flex-1 relative overflow-hidden transition-all duration-300",
                  isLiked ? "border-pink-500 text-pink-500 hover:text-pink-600 hover:border-pink-600" 
                         : "hover:border-pink-500/50"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <Heart 
                    className={cn(
                      "h-4 w-4 transition-all duration-300",
                      isLiked && "fill-current",
                      isLikeAnimating && "animate-ping"
                    )} 
                  />
                  <span className="font-medium">{formatCount(likeCount)}</span>
                </div>
                {isLiked && (
                  <div 
                    className="absolute inset-0 bg-pink-500/10 animate-fade-out"
                    style={{ animationDuration: '0.5s' }}
                  />
                )}
              </Button>

              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsCommentsPanelOpen(true)}
                className={cn(
                  "flex-1 hover:border-blue-500/50 transition-all duration-300",
                  "group"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4 group-hover:text-blue-500 transition-colors duration-300" />
                  <span className="font-medium group-hover:text-blue-500 transition-colors duration-300">
                    {formatCount(commentCount)}
                  </span>
                </div>
              </Button>

              <Button 
                variant="outline" 
                size="sm"
                onClick={handleShare}
                className={cn(
                  "flex-1 hover:border-green-500/50 transition-all duration-300",
                  "group relative overflow-hidden"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <Share2 className="h-4 w-4 group-hover:text-green-500 transition-colors duration-300" />
                  <span className="font-medium group-hover:text-green-500 transition-colors duration-300">
                    {formatCount(shareCount)}
                  </span>
                </div>
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
      )}

      <TournamentCommentsPanel 
        open={isCommentsPanelOpen} 
        onOpenChange={setIsCommentsPanelOpen}
      />
    </div>
  );
}
