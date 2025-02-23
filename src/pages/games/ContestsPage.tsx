import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Search, Bell, Sparkles,
  Gift, Crown, Filter, Command, Settings, 
  Gamepad2, Zap, Puzzle, Star, ArrowRight,
  MoreVertical, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GameSearchOverlay } from "@/components/search/GameSearchOverlay";
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const contests = [
  {
    id: "chess-tournament",
    title: "Chess Masters Championship",
    description: "Join the ultimate chess tournament and compete for the grand prize",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    icon: "https://images.unsplash.com/photo-1586165368502-1bad197a6461",
    category: ["Tournament", "Strategy"],
    rating: 4.8,
    players: "128",
    prize: "$1,000",
    status: "Registering",
    startsIn: "2d 5h",
    route: "/games/chess"
  },
  {
    id: "puzzle-challenge",
    title: "Speed Puzzle Challenge",
    description: "Test your puzzle-solving skills in this fast-paced competition",
    thumbnail: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    icon: "https://images.unsplash.com/photo-1611996575749-79a3a250f948",
    category: ["Challenge", "Puzzle"],
    rating: 4.5,
    players: "256",
    prize: "$500",
    status: "In Progress",
    startsIn: "Live",
    route: "/games/puzzle"
  },
  {
    id: "word-tournament",
    title: "Word Masters League",
    description: "Compete in the most prestigious word game tournament",
    thumbnail: "https://images.unsplash.com/photo-1466921583968-f07aa80c526e",
    icon: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3",
    category: ["Tournament", "Word"],
    rating: 4.3,
    players: "64",
    prize: "$750",
    status: "Coming Soon",
    startsIn: "5d 12h",
    route: "/games/word"
  }
];

const tournaments = [
  {
    id: "1",
    title: "Summer Championship 2024",
    start_date: "2024-06-01T10:00:00Z",
    end_date: "2024-06-15T18:00:00Z",
    status: "upcoming" as const,
    prize_pool: 5000,
    max_participants: 128,
    current_participants: 85,
    banner_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    game: "Chess"
  },
  {
    id: "2",
    title: "Spring Puzzle Rush",
    start_date: "2024-04-15T14:00:00Z",
    end_date: "2024-04-20T22:00:00Z",
    status: "upcoming" as const,
    prize_pool: 2500,
    max_participants: 256,
    current_participants: 180,
    banner_url: "https://images.unsplash.com/photo-1553481187-be93c21490a9",
    game: "Puzzle"
  },
  {
    id: "3",
    title: "Winter Word Masters",
    start_date: "2024-03-01T09:00:00Z",
    end_date: "2024-03-10T20:00:00Z",
    status: "in-progress" as const,
    prize_pool: 3000,
    max_participants: 64,
    current_participants: 64,
    banner_url: "https://images.unsplash.com/photo-1559336197-ded8aaa244bc",
    game: "Word"
  }
];

export default function ContestsPage() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="pt-4 pb-24">
        {/* New Tournament Cards Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-xl font-medium text-foreground">Popular Tournaments</h2>
            <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
              Browse All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <ScrollArea className="w-full">
            <div className="flex px-4 gap-4 pb-4">
              {tournaments.map((tournament) => (
                <div key={tournament.id} className="flex-none w-[300px]">
                  <TournamentCard tournament={tournament} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Featured Contests */}
        <div className="mb-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-xl font-medium text-foreground">Featured Contests</h2>
            <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <ScrollArea className="w-full">
            <div className="flex px-4 gap-4 pb-4">
              {contests.map(contest => (
                <div key={contest.id} className="flex-none w-[300px]">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3">
                    <img
                      src={contest.thumbnail}
                      alt={contest.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className={cn(
                      "absolute top-3 right-3",
                      contest.status === "Live" ? "bg-red-500" : 
                      contest.status === "Registering" ? "bg-green-500" : 
                      "bg-blue-500"
                    )}>
                      {contest.status}
                    </Badge>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-none text-white">
                          {contest.prize}
                        </Badge>
                        <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-none text-white">
                          {contest.players} Players
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-white truncate">{contest.title}</h3>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <img
                      src={contest.icon}
                      alt={`${contest.title} icon`}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">
                          {contest.category[0]}
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                          {contest.category[1]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span>Starts in {contest.startsIn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Live Tournaments */}
        <div className="mb-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-xl font-medium text-foreground">Live Tournaments</h2>
            <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
              More <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="px-4 grid gap-4">
            {contests.filter(c => c.status === "In Progress").map(contest => (
              <div
                key={contest.id}
                className="flex gap-4 p-4 bg-card rounded-xl border hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <img
                  src={contest.icon}
                  alt={contest.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">{contest.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {contest.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                      {contest.prize} Prize Pool
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {contest.players} participants
                    </span>
                  </div>
                </div>
                <Button className="self-center">
                  Join Now
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tournaments */}
        <div className="mb-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-xl font-medium text-foreground">Upcoming Tournaments</h2>
            <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
              View Calendar <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <ScrollArea className="w-full">
            <div className="flex px-4 gap-4 pb-4">
              {contests.filter(c => c.status === "Coming Soon").map(contest => (
                <div
                  key={contest.id}
                  className="flex-none w-[300px] p-4 bg-card rounded-xl border hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={contest.icon}
                      alt={contest.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{contest.title}</h3>
                      <p className="text-sm text-muted-foreground">Starting in {contest.startsIn}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Prize Pool</span>
                      <span className="font-medium">{contest.prize}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Participants</span>
                      <span className="font-medium">{contest.players}/256</span>
                    </div>
                    <Button className="w-full mt-2">
                      Register Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      <GameSearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
