import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Loader2, 
  ChevronUp, 
  ChevronDown,
  ScrollText as Scroll
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TournamentHeader } from "@/components/tournament/header/TournamentHeader";
import { TournamentBanner } from "@/components/tournament/banner/TournamentBanner";
import { TournamentStats } from "@/components/tournament/sections/TournamentStats";
import { TournamentDescription } from "@/components/tournament/sections/TournamentDescription";
import { MatchesSection } from "@/components/tournament/sections/MatchesSection";
import { cn } from "@/lib/utils";

interface Match {
  id: number;
  championship: string;
  phase: string;
  status: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  opponents: Array<{
    name: string;
    photo: string;
    country: string;
    city: string;
    rank: number;
    stats: string;
    wins: number;
    losses: number;
  }>;
  spectators: number;
  likes: number;
  comments: number;
  predictions: {
    firstPlayer: number;
    secondPlayer: number;
  };
}

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
          <Scroll className="h-5 w-5" />
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
                  <ChevronUp className="h-5 w-5 text-slate-500" /> : 
                  <ChevronDown className="h-5 w-5 text-slate-500" />
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
  const [activeTab, setActiveTab] = useState("participants");
  const [isLiked, setIsLiked] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
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
    toast({
      title: "Registration request sent!",
      description: "Check your email for confirmation.",
      duration: 3000,
    });
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

  if (isLoading) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen animate-fade-in">
      <TournamentHeader
        title={tournament?.title || "Tournament Details"}
        isLiked={isLiked}
        onBack={() => navigate(-1)}
        onShare={handleShare}
        onLike={handleLike}
      />

      <div className="pt-16">
        <div className="bg-white dark:bg-gray-800">
          <TournamentBanner
            bannerUrl={tournament?.banner_url || "https://storage.googleapis.com/a1aa/image/BcP3itd2BEfYcAhKkd2UAUs_vV9N3Sl-reNN8Mi1FEo.jpg"}
            statusColor={getStatusColor(tournament?.status)}
            statusText={getStatusText(tournament?.status)}
            game={tournament?.game}
            onImageClick={() => setShowFullImage(true)}
          />

          <div className="px-4">
            <div className="py-6 space-y-6">
              <TournamentDescription tournament={tournament} />
              
              <TournamentStats 
                tournament={tournament}
                onRegister={handleRegister}
              />

              <Tabs defaultValue="participants" className="w-full">
                <div className="w-full overflow-x-auto no-scrollbar">
                  <TabsList className="w-full h-auto inline-flex whitespace-nowrap">
                    {["participants", "rules", "matches", "faqs", "schedule", "brackets", "roadmap"].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        onClick={() => setActiveTab(tab)}
                        className="flex-shrink-0"
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

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

                {["faqs", "schedule", "brackets", "roadmap"].map((tab) => (
                  <TabsContent key={tab} value={tab}>
                    <div className="p-4 text-center text-gray-500">
                      {tab.charAt(0).toUpperCase() + tab.slice(1)} content coming soon...
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
