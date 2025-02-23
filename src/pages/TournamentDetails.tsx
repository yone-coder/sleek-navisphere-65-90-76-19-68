import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { MatchesSection } from "@/components/matches/MatchesSection";
import { Match } from "@/components/matches/types";
import { Loader } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BannerSlider } from "@/components/BannerSlider";
import { TournamentBrackets } from "@/components/tournament/sections/TournamentBrackets";
import { TournamentRoadmap } from "@/components/tournament/sections/TournamentRoadmap";
import { TournamentHeader } from "@/components/tournament/header/TournamentHeader";
import { TournamentTabs } from "@/components/tournament/navigation/TournamentTabs";
import { RegisterBar } from "@/components/tournament/footer/RegisterBar";
import { ParticipantsTable } from "@/components/tournament/sections/ParticipantsTable";
import { TournamentRulesCard } from "@/components/tournament/sections/TournamentRulesCard";
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
  ScrollText,
  ChevronUpIcon,
  ChevronDownIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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

export default function TournamentDetails() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

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
          <TournamentHeader title={tournament?.title} />
          <TournamentTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      <div className="pt-24">
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
                      <p className="font-bold text-xl text-gray-800 dark:text-white">{tournament?.max_participants - (tournament?.current_participants || 0)}</p>
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
                        ? `${format(new Date(tournament.start_date), 'MMM dd')} - ${format(new Date(tournament.end_date), 'MMM dd')}, ${format(new Date(tournament.end_date), 'yyyy')}`
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
                          (tournament?.max_participants || 0) - (tournament?.current_participants || 0) <= 5 ? "bg-red-100 text-red-800 dark:bg-red-900/30" : ""
                        )}
                      >
                        {tournament?.max_participants && tournament?.current_participants ? (tournament?.max_participants - tournament?.current_participants) <= 0 ? "Tournament Full" : (tournament?.max_participants - tournament?.current_participants) <= 5 ? `Only ${tournament?.max_participants - tournament?.current_participants} spots left!` : `${tournament?.max_participants - tournament?.current_participants} spots available` : "Loading..."}
                      </Badge>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={tournament?.current_participants && tournament?.max_participants ? (tournament?.current_participants / tournament?.max_participants) * 100 : 0} 
                        className="h-2 transition-all duration-500" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-around mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex flex-col items-center">
                    <Heart className="h-6 w-6 mb-1 text-gray-500" />
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

      <RegisterBar 
        currentParticipants={tournament?.current_participants || 0}
        maxParticipants={tournament?.max_participants || 0}
      />
    </div>
  );
}
