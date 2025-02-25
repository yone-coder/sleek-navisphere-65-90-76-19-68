<lov-code>
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
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
  Calendar,
  Filter,
  Search,
  TrendingUp,
  ChartLine,
  BarChart,
  Users as UsersIcon,
  ActivitySquare,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Gauge
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { MatchCard } from "@/components/matches/MatchCard";
import type { Match } from "@/components/matches/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewsCard } from "@/components/news/NewsCard";
import type { NewsArticle } from "@/components/news/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

const mockGame = {
  id: "1",
  title: "League of Legends",
  banner_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
  current_players: 95000,
  total_players: 128000,
  release_date: "2009-10-27",
  developer: "Riot Games",
  publisher: "Riot Games",
  game_type: "MOBA",
  status: "live",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  description: "League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base.",
  features: ["Multiplayer", "Competitive", "Free to Play", "Cross-Platform"],
  platform: ["PC", "Mac"],
  category: ["MOBA", "Strategy", "Action"],
  system_requirements: {
    minimum: {
      os: "Windows 7 or higher",
      processor: "3 GHz processor",
      memory: "2 GB RAM",
      graphics: "Shader version 2.0 capable",
      storage: "16 GB"
    },
    recommended: {
      os: "Windows 10",
      processor: "3 GHz processor",
      memory: "4 GB RAM",
      graphics: "Nvidia GeForce 8800 / AMD Radeon HD 5670 or equivalent",
      storage: "16 GB"
    }
  }
};

const mockTournaments = [
  {
    id: "1",
    title: "Winter Championship 2025",
    start_date: "2025-01-15",
    end_date: "2025-02-15",
    status: "upcoming" as const,
    prize_pool: 10000,
    max_participants: 128,
    current_participants: 64,
    banner_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    game: "League of Legends"
  },
  {
    id: "2",
    title: "Spring Tournament 2025",
    start_date: "2025-03-01",
    end_date: "2025-03-31",
    status: "upcoming" as const,
    prize_pool: 15000,
    max_participants: 256,
    current_participants: 128,
    banner_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    game: "League of Legends"
  }
];

const mockMatches: Match[] = [
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
    championship: "Regional Championship",
    phase: "Finals",
    status: "upcoming",
    date: "2025-02-14",
    time: "20:00:00",
    venue: "Staples Center",
    location: "Los Angeles, USA",
    opponents: [
      {
        name: "David Kim",
        photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        country: "South Korea",
        city: "Seoul",
        rank: 5,
        stats: "Rising Star",
        wins: 32,
        losses: 8
      },
      {
        name: "Lucas Silva",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        country: "Brazil",
        city: "São Paulo",
        rank: 6,
        stats: "Champion",
        wins: 28,
        losses: 12
      }
    ],
    spectators: 1500,
    likes: 750,
    comments: 280,
    predictions: {
      firstPlayer: 55,
      secondPlayer: 45
    }
  },
  {
    id: 4,
    championship: "Summer Cup",
    phase: "Group Stage",
    status: "done",
    date: "2025-02-11",
    time: "15:30:00",
    venue: "Tokyo Dome",
    location: "Tokyo, Japan",
    opponents: [
      {
        name: "Yuki Tanaka",
        photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        country: "Japan",
        city: "Tokyo",
        rank: 7,
        stats: "Veteran",
        wins: 25,
        losses: 15
      },
      {
        name: "Anna Liu",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        country: "China",
        city: "Beijing",
        rank: 8,
        stats: "Rising Star",
        wins: 22,
        losses: 18
      }
    ],
    spectators: 1200,
    likes: 500,
    comments: 150,
    predictions: {
      firstPlayer: 40,
      secondPlayer: 60
    }
  }
];

const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "Major Update Coming to League of Legends",
    excerpt: "Riot Games announces groundbreaking changes coming to League of Legends in the next patch, including new champions and map updates.",
    content: "Full article content here...",
    category: "Updates",
    date: "2024-02-15",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    author: {
      name: "Alex Turner",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
    }
  },
  {
    id: "2",
    title: "Pro Players React to Latest Balance Changes",
    excerpt: "Professional players share their thoughts on the recent balance changes and how they might affect the competitive scene.",
    content: "Full article content here...",
    category: "Esports",
    date: "2024-02-14",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    }
  },
  {
    id: "3",
    title: "Community Spotlight: Player-Created Content",
    excerpt: "Highlighting the most creative and innovative content created by the League of Legends community this month.",
    content: "Full article content here...",
    category: "Community",
    date: "2024-02-13",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    author: {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
    }
  }
];

export default function GameDetails() {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1234);
  const [shareCount, setShareCount] = useState(245);
  const [downloadCount, setDownloadCount] = useState(1500000);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const { toast } = useToast();

  const { data: game, isLoading } = useQuery({
    queryKey: ["game", id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockGame;
    },
  });

  const getPlayerProgress = () => {
    if (!game) return 0;
    return (game.current_players / game.total_players) * 100;
  };

  const formatPlayerCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return `${count}`;
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: game?.title || 'Game Details',
        text: `Check out this game: ${game?.title}`,
        url: window.location.href,
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
        setShareCount(prev => prev + 1);
        toast({
          title: "Game shared successfully!",
          duration: 2000,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareCount(prev => prev + 1);
        toast({
          title: "Game link copied to clipboard!",
          duration: 2000,
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
      toast({
        title: "Failed to share game",
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
      case 'live':
        return 'Live';
      case 'maintenance':
        return 'Maintenance';
      case 'upcoming':
        return 'Coming Soon';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20';
      case 'maintenance':
        return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20';
      case 'upcoming':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20';
      case 'offline':
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

  const playerData = [
    { name: "Jan", count: 95000 },
    { name: "Feb", count: 102000 },
    { name: "Mar", count: 108000 },
    { name: "Apr", count: 115000 },
    { name: "May", count: 125000 },
    { name: "Jun", count: 128000 },
  ];

  const serverData = [
    { name: "NA", players: 45000, uptime: 99.9 },
    { name: "EU", players: 52000, uptime: 99.8 },
    { name: "ASIA", players: 31000, uptime: 99.7 },
  ];

  const matchData = [
    { type: "Ranked", matches: 25000 },
    { type: "Casual", matches: 35000 },
    { type: "Custom", matches: 15000 },
    { type: "Tournament", matches: 5000 },
  ];

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
                  {game?.title || "Game Details"}
                </h1>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <GamepadIcon className="h-3 w-3" />
                  <span>{game?.game_type}</span>
                </div>
              </div>
            </div>
            <Badge 
              variant="outline"
              className={cn(
                "text-[10px] px-1.5 py-0.5 animate-pulse transition-colors duration-300",
                getStatusColor(game?.status)
              )}
            >
              {getStatusText(game?.status)}
            </Badge>
          </div>

          <div className="px-4 py-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="w-full overflow-x-auto no-scrollbar">
                <TabsList className="w-full h-auto inline-flex whitespace-nowrap">
                  {["overview", "stats", "tournaments", "matches", "news", "dlc"].map((tab) => (
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
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm text-gray-500 dark:text-gray-300">Active Players</span>
                      <p className="font-bold text-xl text-gray-800 dark:text-white truncate">
                        {game ? formatPlayerCount(game.current_players) : "0"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      <DollarSign className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm text-gray-500 dark:text-gray-300">Price</span>
                      <p className="font-bold text-xl text-gray-800 dark:text-white truncate">Free</p>
                    </div>
                  </div>
                </div>

                {/* Game Details */}
                <div className="space-y-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Game Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <GamepadIcon className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Genre</p>
                            <p className="text-sm font-medium">{game?.game_type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Developer</p>
                            <p className="text-sm font-medium">{game?.developer}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Publisher</p>
                            <p className="text-sm font-medium">{game?.publisher}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users2 className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Platform</p>
                            <p className="text-sm font-medium">{game?.platform.join(", ")}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Release Date</p>
                            <p className="text-sm font-medium">
                              {game?.release_date ? format(new Date(game.release_date), 'MMM d, yyyy') : 'TBA'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Last Updated</p>
                            <p className="text-sm font-medium">
                              {game?.updated_at ? format(new Date(game.updated_at), 'MMM d, yyyy') : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">About Game</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {game?.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {game?.features.map((feature) => (
                          <Badge 
                            key={feature} 
                            variant="outline" 
                            className="bg-blue-50 dark:bg-blue-900/20"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Requirements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">System Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2">Minimum:</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="text-muted-foreground">OS:</span> {game?.system_requirements.minimum.os}</p>
                            <p><span className="text-muted-foreground">Processor:</span> {game?.system_requirements.minimum.processor}</p>
                            <p><span className="text-muted-foreground">Memory:</span> {game?.system_requirements.minimum.memory}</p>
                            <p><span className="text-muted-foreground">Graphics:</span> {game?.system_requirements.minimum.graphics}</p>
                            <p><span className="text-muted-foreground">Storage:</span> {game?.system_requirements.minimum.storage}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Recommended:</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="text-muted-foreground">OS:</span> {game?.system_requirements.recommended.os}</p>
                            <p><span className="text-muted-foreground">Processor:</span> {game?.system_requirements.recommended.processor}</p>
                            <p><span className="text-muted-foreground">Memory:</span> {game?.system_requirements.recommended.memory}</p>
                            <p><span className="text-muted-foreground">Graphics:</span> {game?.system_requirements.recommended.graphics}</p>
                            <p><span className="text-muted-foreground">Storage:</span> {game?.system_requirements.recommended.storage}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tournaments">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Upcoming Tournaments</h2>
              <div className="space-y-4">
                {mockTournaments.map((tournament) => (
                  <TournamentCard 
                    key={tournament.id} 
                    tournament={tournament}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="matches">
            <div className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Game Matches</h2>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search Matches</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input 
                        placeholder="Search by player or tournament..." 
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Match Status</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Matches</SelectItem>
                        <SelectItem value="live">Live Now</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="done">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-400">Live & Upcoming</h3>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                        {mockMatches.filter(m => m.status === "live" || m.status === "upcoming").length} Matches
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      {mockMatches
                        .filter(m => m.status === "live" || m.status === "upcoming")
                        .map((match) => (
                          <MatchCard 
                            key={match.id} 
                            match={match}
                          />
                        ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-400">Recent Matches</h3>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                        {mockMatches.filter(m => m.status === "done").length} Matches
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      {mockMatches
                        .filter(m => m.status === "done")
                        .map((match) => (
                          <MatchCard 
                            key={match.id} 
                            match={match}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="news">
            <div className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Latest News</h2>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter News
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="p-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-purple-500
