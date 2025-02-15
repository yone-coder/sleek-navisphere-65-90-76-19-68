import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { MatchesSection } from "@/components/matches/MatchesSection";
import { Match } from "@/components/matches/types";
import { 
  ArrowLeft, 
  Search, 
  Scroll,
  CalendarClock, 
  Users,
  Trophy,
  DollarSign,
  Heart,
  MessageSquare,
  Share2,
  Copy,
  UserPlus,
  ChevronDown,
  ChevronUp,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

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

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd')}, ${format(end, 'yyyy')}`;
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
      {/* Custom Header */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/40">
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
            <h1 className="text-lg font-semibold">{tournament?.title || "Tournament Details"}</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-foreground/10"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="pt-16">
        {/* Tournament Card */}
        <div className="bg-white dark:bg-gray-800">
          <div className="relative">
            <img 
              src={tournament?.banner_url || "https://storage.googleapis.com/a1aa/image/BcP3itd2BEfYcAhKkd2UAUs_vV9N3Sl-reNN8Mi1FEo.jpg"}
              alt="Tournament banner" 
              className="w-full h-48 object-cover"
            />
            <Badge className="absolute bottom-4 right-4" variant="default">
              Sponsored by Google
            </Badge>
            <div className="absolute bottom-2 left-2 flex items-center space-x-1">
              <img
                src="https://storage.googleapis.com/a1aa/image/RW76eSv1bI06GoXLZPNVQlLvVFuloRbfcxmSiTYAc8E.jpg"
                alt="Game icon"
                className="w-8 h-8 rounded-full border border-white"
              />
              <div className="bg-black bg-opacity-50 px-2 py-0.5 rounded backdrop-blur-sm">
                <span className="text-white text-xs">{tournament?.game || "Chess"}</span>
              </div>
            </div>
          </div>

          <div className="px-4">
            <div className="py-6">
              <div className="flex justify-between items-center mb-4">
                <Badge variant="secondary">
                  Game: {tournament?.game || "Chess"}
                </Badge>
                <Button variant="default" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Follow
                </Button>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                The premier gaming event featuring the latest titles and top competitors from around the world.
              </p>

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
                      <span className="text-sm">
                        {tournament?.current_participants || 0}/{tournament?.max_participants || 0} Participants
                      </span>
                    </div>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {tournament 
                        ? `${tournament.max_participants - tournament.current_participants} left`
                        : "Loading..."}
                    </span>
                  </div>
                  <Progress 
                    value={tournament 
                      ? (tournament.current_participants / tournament.max_participants) * 100
                      : 0
                    } 
                    className="h-2" 
                  />
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Prize Pool</span>
                    <p className="font-bold text-gray-800 dark:text-white">
                      ${tournament?.prize_pool?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Entry Fee</span>
                    <p className="font-bold text-gray-800 dark:text-white">$75.00</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-around mb-6 space-x-4">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">1.2K</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">350</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">75</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Copy className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div className="flex mb-6">
                <Button className="w-full" size="lg">
                  Register Now
                </Button>
              </div>

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

                {["participants", "faqs", "schedule", "brackets", "roadmap"].map((tab) => (
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
