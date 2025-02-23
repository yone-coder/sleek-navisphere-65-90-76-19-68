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
    category: ["Tournament", "Strategy"],
    rating: 4.8,
    players: "128",
    prize: "$1,000",
    status: "Registering",
    startsIn: "2d 5h",
    route: "/games/chess"
  },
  {
    id: "design-challenge",
    title: "Logo Design Contest 2024",
    description: "Create innovative logos for tech startups",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
    category: ["Creative", "Design"],
    rating: 4.6,
    players: "256",
    prize: "$2,500",
    status: "Live",
    startsIn: "Now",
    route: "/contests/design"
  },
  {
    id: "hackathon-2024",
    title: "Global Hackathon 2024",
    description: "Build innovative solutions in 48 hours",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: ["Tech", "Coding"],
    rating: 4.9,
    players: "500",
    prize: "$10,000",
    status: "Coming Soon",
    startsIn: "5d",
    route: "/contests/hackathon"
  },
  {
    id: "photo-contest",
    title: "Wildlife Photography Challenge",
    description: "Capture nature's most stunning moments",
    thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    category: ["Photography", "Nature"],
    rating: 4.7,
    players: "312",
    prize: "$3,000",
    status: "Registering",
    startsIn: "3d",
    route: "/contests/photography"
  },
  {
    id: "cooking-masters",
    title: "MasterChef Online Challenge",
    description: "Show off your culinary expertise",
    thumbnail: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    category: ["Cooking", "Food"],
    rating: 4.5,
    players: "150",
    prize: "$5,000",
    status: "Live",
    startsIn: "Now",
    route: "/contests/cooking"
  },
  {
    id: "startup-pitch",
    title: "Startup Pitch Competition",
    description: "Present your innovative business ideas",
    thumbnail: "https://images.unsplash.com/photo-1553484771-689277e6fa16",
    category: ["Business", "Startup"],
    rating: 4.8,
    players: "75",
    prize: "$50,000",
    status: "Coming Soon",
    startsIn: "7d",
    route: "/contests/startup"
  },
  {
    id: "music-battle",
    title: "Virtual Music Festival",
    description: "Compete in the ultimate music showdown",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    category: ["Music", "Performance"],
    rating: 4.6,
    players: "200",
    prize: "$7,500",
    status: "Registering",
    startsIn: "4d",
    route: "/contests/music"
  },
  {
    id: "pet-show",
    title: "International Pet Show Online",
    description: "Show off your adorable pets",
    thumbnail: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    category: ["Pets", "Competition"],
    rating: 4.9,
    players: "1000",
    prize: "$2,000",
    status: "Live",
    startsIn: "Now",
    route: "/contests/pets"
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

const sponsoredGames = [
  {
    id: "candy-crush",
    title: "Candy Crush Tournament",
    description: "Match candies in this tasty tournament adventure",
    thumbnail: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    icon: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    category: ["Casual", "Puzzle"],
    rating: 4.5,
    downloads: "1B+",
    size: "98MB",
    hasAds: true,
    inAppPurchases: true,
    prize: "$5,000"
  },
  {
    id: "royal-match",
    title: "Royal Match Championship",
    description: "Match-3 puzzle with royal prize pools",
    thumbnail: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    icon: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    category: ["Casual", "Puzzle"],
    rating: 4.7,
    downloads: "100M+",
    size: "156MB",
    hasAds: true,
    inAppPurchases: true,
    prize: "$2,500"
  },
  {
    id: "duolingo",
    title: "Language Masters Challenge",
    description: "Learn and compete in language challenges",
    thumbnail: "https://images.unsplash.com/photo-1661875576025-0e5d61dec14f",
    icon: "https://images.unsplash.com/photo-1661875576025-0e5d61dec14f",
    category: ["Education", "Language"],
    rating: 4.7,
    downloads: "500M+",
    size: "45MB",
    hasAds: true,
    inAppPurchases: true,
    prize: "$1,000"
  }
];

export default function ContestsPage() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="pt-4 pb-24">
        {/* Popular Tournaments Section */}
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

        {/* Sponsored Section */}
        <div className="mb-8">
          <div className="px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                Sponsored <span className="text-gray-500">•</span> Suggested for you
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>

            <ScrollArea className="w-full" type="scroll">
              <div className="flex gap-4 pb-4">
                {sponsoredGames.map((game) => (
                  <div 
                    key={game.id}
                    className="flex-none w-[120px]"
                  >
                    <div className="relative mb-2">
                      <img
                        src={game.icon}
                        alt={game.title}
                        className="w-[120px] h-[120px] rounded-[24px] object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        {game.prize}
                      </Badge>
                    </div>
                    <h3 className="text-gray-900 text-sm font-medium truncate mb-1">
                      {game.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600 text-xs">
                      <span>{game.rating}</span>
                      <Star className="w-3 h-3 fill-gray-600 text-gray-600" />
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
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
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
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
