import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { MatchesSection } from "@/components/matches/MatchesSection";
import { Match } from "@/components/matches/types";
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
  Loader,
  ScrollText,
  ChevronUpIcon,
  ChevronDownIcon
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TournamentBrackets } from "@/components/tournament/sections/TournamentBrackets";
import { TournamentRoadmap } from "@/components/tournament/sections/TournamentRoadmap";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const rules = [
  {
    id: 'general',
    title: 'General Rules',
    rules: [
      'All matches will be played on the latest tournament patch (v2.34)',
      'Players must arrive 30 minutes before scheduled match time',
      'Match results are final once submitted to tournament officials',
      'Players must use tournament-provided equipment',
      'Unsportsmanlike conduct will result in immediate disqualification'
    ]
  },
  {
    id: 'competition',
    title: 'Competition Format',
    rules: [
      'Double elimination bracket system',
      'Best-of-three matches for all rounds except finals',
      'Finals will be best-of-five',
      'Map selection alternates between players, loser picks next map',
      'No map may be played twice in the same match'
    ]
  },
  {
    id: 'conduct',
    title: 'Player Conduct',
    rules: [
      'Players must maintain professional behavior at all times',
      'Verbal abuse of opponents or officials is prohibited',
      'Intentional disconnects without approval will count as a forfeit',
      'Players may not receive coaching during matches',
      'All disputes must be reported to tournament officials immediately'
    ]
  },
  {
    id: 'technical',
    title: 'Technical Rules',
    rules: [
      'In case of technical failure, match may be paused up to 15 minutes',
      'Only approved peripherals may be used (list available at check-in)',
      'Settings must be configured before match start',
      'Recording software must be approved by tournament officials',
      'Streaming is prohibited during tournament hours'
    ]
  }
];

const ParticipantsTable = () => {
  const participants = [
    {
      id: 1,
      name: "Alex Johnson",
      rank: "#1",
      avatar: "https://storage.googleapis.com/a1aa/image/u9QlGEQDPW0dq8Wric7AsU_j7PkzMnKLIgLMlSRCv5I.jpg",
      country: "USA",
      rating: 2800,
      winRate: 85,
      status: "confirmed"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      rank: "#2",
      avatar: "https://storage.googleapis.com/a1aa/image/iG3N08MIvjY6mNComFBnnpKsPY-e90lt6EILTZH3NF8.jpg",
      country: "Spain",
      rating: 2750,
      winRate: 82,
      status: "confirmed"
    },
    {
      id: 3,
      name: "James Wilson",
      rank: "#3",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      country: "UK",
      rating: 2700,
      winRate: 79,
      status: "pending"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Tournament Participants</h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Confirmed: 28
          </Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            Pending: 12
          </Badge>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Win Rate</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant.id} className="hover:bg-muted/50 cursor-pointer">
                <TableCell className="font-medium">{participant.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img 
                      src={participant.avatar} 
                      alt={participant.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{participant.name}</span>
                  </div>
                </TableCell>
                <TableCell>{participant.country}</TableCell>
                <TableCell>{participant.rating}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={participant.winRate} 
                      className="w-20 h-2"
                    />
                    <span className="text-sm text-muted-foreground">
                      {participant.winRate}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={participant.status === "confirmed" ? "default" : "secondary"}
                    className={cn(
                      participant.status === "confirmed" 
                        ? "bg-green-500" 
                        : "bg-yellow-500"
                    )}
                  >
                    {participant.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 p-4 bg-muted/20 rounded-lg">
        <h4 className="font-medium mb-4">Quick Stats</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-muted-foreground">Average Rating</div>
            <div className="text-2xl font-bold">2750</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-muted-foreground">Top Country</div>
            <div className="text-2xl font-bold">USA</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-muted-foreground">Total Prize Claims</div>
            <div className="text-2xl font-bold">$45K</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-muted-foreground">Avg. Win Rate</div>
            <div className="text-2xl font-bold">82%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TournamentRulesCard = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="w-full max-w-2xl mx-auto shadow-lg">
      <div className="bg-slate-800 text-white p-4">
        <div className="flex items-center gap-2">
          <ScrollText className="h-5 w-5" />
          <h2 className="text-lg font-bold">Official Tournament Rule Book</h2>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          {rules.map((section) => (
            <div key={section.id} className="border border-slate-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full p-4 text-left bg-slate-50 hover:bg-slate-100 transition"
              >
                <span className="font-semibold text-slate-800">{section.title}</span>
                {expandedSection === section.id ? 
                  <ChevronUpIcon className="h-5 w-5 text-slate-500" /> : 
                  <ChevronDownIcon className="h-5 w-5 text-slate-500" />
                }
              </button>
              
              {expandedSection === section.id && (
                <div className="p-4 bg-white">
                  <ul className="space-y-2">
                    {section.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span className="text-slate-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="my-6 border-t border-slate-200"></div>
        
        <div className="text-sm text-slate-500">
          <p>All rules are subject to interpretation by the tournament committee. Additional rules may be announced before the tournament. Players are responsible for staying updated on any rule changes.</p>
        </div>
      </div>
    </div>
  );
};

export default function TournamentDetails() {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
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

  const handleRegister = () => {
    if (!tournament) {
      toast({
        title: "Error",
        description: "Tournament details not available",
        variant: "destructive",
      });
      return;
    }

    if (getAvailableSpots() <= 0) {
      toast({
        title: "Tournament Full",
        description: "No spots available. Join the waitlist instead?",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Successful! 🎉",
      description: "Check your email for confirmation and next steps.",
      duration: 5000,
    });

    setNotificationsEnabled(true);
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd')}, ${format(end, 'yyyy')}`;
  };

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

  const RegisterButton = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <Trophy className="h-4 w-4" />
          Register Now {tournament?.prize_pool ? `($${tournament.prize_pool})` : '(Free)'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register for Tournament</DialogTitle>
          <DialogDescription>
            Join {tournament?.title || 'this tournament'} and compete for the prize pool!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Prize Pool:</span>
            <span className="font-semibold">{tournament?.prize_pool ? `$${tournament.prize_pool.toLocaleString()}` : 'Free'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Available Spots:</span>
            <span className="font-semibold">{getAvailableSpots()} remaining</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tournament Start:</span>
            <span className="font-semibold">
              {tournament?.start_date ? format(new Date(tournament.start_date), 'PPP') : 'TBA'}
            </span>
          </div>
          <Progress 
            value={getParticipantProgress()} 
            className={cn(
              "h-2 transition-all duration-500", 
              getParticipantProgressColor()
            )} 
          />
          <p className="text-xs text-muted-foreground text-center">
            {tournament?.current_participants || 0} out of {tournament?.max_participants || 0} spots filled
          </p>
          <div className="space-y-2">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
              onClick={handleRegister}
            >
              Confirm Registration
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => window.open('https://discord.gg/tournament', '_blank')}
            >
              Join Discord Community
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

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
        <div className="backdrop-blur-lg bg-background/80 border-b border-border/40">
          <div className="h-16 px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-foreground/10"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold truncate max-w-[200px]">
                  {tournament?.title || "Tournament Details"}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {tournament?.current_participants || 0} participants • {getStatusText()}
                </p>
              </div>
            </div>

            <RegisterButton />
          </div>

          <div className="px-4 py-2 border-t border-border/5">
            <div className="flex items-center justify-between overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-yellow-50 transition-colors"
                  onClick={() => toast({
                    title: "Prize Pool Details",
                    description: `Total prize pool of $${tournament?.prize_pool?.toLocaleString() || "0"} will be distributed among top performers.`
                  })}
                >
                  <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>${tournament?.prize_pool?.toLocaleString() || "0"}</span>
                </Button>
                <Separator orientation="vertical" className="h-4" />
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hover:bg-blue-50 transition-colors"
                  onClick={() => toast({
                    title: "Participant Information",
                    description: `${tournament?.current_participants || 0} players have registered out of ${tournament?.max_participants || 0} total spots.`
                  })}
                >
                  <Users className="h-4 w-4 text-blue-500 mr-2" />
                  <span>{tournament?.current_participants || 0}/{tournament?.max_participants || 0}</span>
                </Button>
                <Separator orientation="vertical" className="h-4" />
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hover:bg-green-50 transition-colors"
                  onClick={() => toast({
                    title: "Tournament Schedule",
                    description: tournament ? `Tournament runs from ${format(new Date(tournament.start_date), 'PPP')} to ${format(new Date(tournament.end_date), 'PPP')}` : "Dates to be announced"
                  })}
                >
                  <CalendarClock className="h-4 w-4 text-green-500 mr-2" />
                  <span>{tournament && formatDateRange(tournament.start_date, tournament.end_date)}</span>
                </Button>
              </div>
              <Badge 
                variant="secondary" 
                className={cn(
                  "ml-4 whitespace-nowrap animate-pulse",
                  getAvailableSpots() <= 5 ? "bg-red-100 text-red-800 font-semibold" : ""
                )}
              >
                {getSpotsText()}
              </Badge>
            </div>
          </div>

          <div className="px-4 py-2 border-t border-border/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-foreground hover:bg-foreground/10",
                  notificationsEnabled && "text-blue-500"
                )}
                onClick={() => {
                  setNotificationsEnabled(!notificationsEnabled);
                  toast({
                    title: notificationsEnabled ? "Notifications disabled" : "Notifications enabled",
                    description: notificationsEnabled ? 
                      "You won't receive updates about this tournament" :
                      "You'll receive updates about this tournament",
                    duration: 2000,
                  });
                }}
              >
                <Bell className="h-5 w-5" fill={notificationsEnabled ? "currentColor" : "none"} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-foreground hover:bg-foreground/10",
                  isLiked && "text-red-500"
                )}
                onClick={handleLike}
              >
                <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>
            <RegisterButton />
          </div>
        </div>

        <div className="px-4 pb-2 backdrop-blur-lg bg-background/80">
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

      <div className="pt-48">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="overview">
            <div className="space-y-6">
              <BannerSlider />
              
              <div className="px-4">
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
                      <span className="text-sm text-gray-500 dark:text-gray-300">Spots Left</span>
                      <p className="font-bold text-xl text-gray-800 dark:text-white">{getAvailableSpots()}</p>
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
                    </div>
                  </div>
                </div>

                <div className="flex justify-around mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex flex-col items-center">
                    <Heart className={cn(
                      "h-6 w-6 mb-1",
                      isLiked ? "text-red-50
