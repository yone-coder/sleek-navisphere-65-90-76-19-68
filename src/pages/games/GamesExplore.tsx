
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GamesBottomNav } from "@/components/games/GamesBottomNav";
import { GameSearchOverlay } from "@/components/search/GameSearchOverlay";
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { TournamentCardSkeleton } from "@/components/tournaments/TournamentCardSkeleton";

const popularTournaments = [
  {
    id: "1",
    title: "Summer Championship 2024",
    start_date: "2024-06-01T10:00:00Z",
    end_date: "2024-06-30T18:00:00Z",
    status: "upcoming" as const,
    prize_pool: 50000,
    max_participants: 500,
    current_participants: 234,
    banner_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    game: "Battle Royale"
  },
  {
    id: "2",
    title: "Spring Masters Series",
    start_date: "2024-04-15T09:00:00Z",
    end_date: "2024-05-15T20:00:00Z",
    status: "in-progress" as const,
    prize_pool: 25000,
    max_participants: 300,
    current_participants: 300,
    banner_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    game: "League of Legends"
  }
];

const upcomingTournaments = [
  {
    id: "3",
    title: "Winter Championship",
    start_date: "2024-12-01T10:00:00Z",
    end_date: "2024-12-31T18:00:00Z",
    status: "upcoming" as const,
    prize_pool: 75000,
    max_participants: 1000,
    current_participants: 456,
    banner_url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    game: "VALORANT"
  },
  {
    id: "4",
    title: "Regional Qualifiers",
    start_date: "2024-08-15T09:00:00Z",
    end_date: "2024-09-15T20:00:00Z",
    status: "upcoming" as const,
    prize_pool: 15000,
    max_participants: 200,
    current_participants: 98,
    banner_url: "https://images.unsplash.com/photo-1614294148960-9aa740b3a350",
    game: "CS:GO"
  }
];

const featuredTournaments = [
  {
    id: "5",
    title: "World Championship 2024",
    start_date: "2024-10-01T10:00:00Z",
    end_date: "2024-11-30T18:00:00Z",
    status: "upcoming" as const,
    prize_pool: 1000000,
    max_participants: 2000,
    current_participants: 1543,
    banner_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    game: "Fortnite"
  },
  {
    id: "6",
    title: "Pro League Finals",
    start_date: "2024-07-15T09:00:00Z",
    end_date: "2024-08-15T20:00:00Z",
    status: "upcoming" as const,
    prize_pool: 500000,
    max_participants: 1500,
    current_participants: 876,
    banner_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    game: "DOTA 2"
  }
];

export default function GamesExplore() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications] = useState(3);
  const [activeTab, setActiveTab] = useState("all");

  const TournamentSection = ({ title, tournaments }: { title: string, tournaments: typeof popularTournaments }) => (
    <section className="px-4 mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {tournaments.map((tournament) => (
            <div key={tournament.id} className="w-[300px] flex-none">
              <TournamentCard tournament={tournament} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tournaments"
              className="w-full pl-10 bg-muted border-none"
              value=""
              onClick={() => setIsSearchOpen(true)}
              readOnly
            />
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-8 w-8"
          >
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge 
                className="absolute -right-0.5 -top-0.5 h-4 w-4 items-center justify-center rounded-full bg-red-500 p-0.5 text-[10px] font-medium text-white border-2 border-white"
              >
                {notifications}
              </Badge>
            )}
          </Button>
        </div>

        {/* Category Tabs */}
        <ScrollArea className="w-full pb-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="inline-flex h-9 items-center justify-start gap-2 rounded-lg bg-transparent p-1 text-muted-foreground">
              <TabsTrigger 
                value="all"
                className="rounded-md px-3 py-1 text-sm font-medium transition-colors hover:bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All Tournaments
              </TabsTrigger>
              <TabsTrigger 
                value="popular"
                className="rounded-md px-3 py-1 text-sm font-medium transition-colors hover:bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Popular
              </TabsTrigger>
              <TabsTrigger 
                value="upcoming"
                className="rounded-md px-3 py-1 text-sm font-medium transition-colors hover:bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger 
                value="featured"
                className="rounded-md px-3 py-1 text-sm font-medium transition-colors hover:bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Featured
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="pt-4 pb-24 space-y-6">
          <TournamentSection title="Popular Tournaments" tournaments={popularTournaments} />
          <TournamentSection title="Upcoming Tournaments" tournaments={upcomingTournaments} />
          <TournamentSection title="Featured Tournaments" tournaments={featuredTournaments} />
        </div>
      </div>

      {/* Bottom Navigation */}
      <GamesBottomNav />

      {/* Search Overlay */}
      <GameSearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
