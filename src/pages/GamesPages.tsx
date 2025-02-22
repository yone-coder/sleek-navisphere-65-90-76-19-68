
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Search, Bell, Sparkles,
  Gift, Crown, Filter, Command, Settings, 
  Gamepad2, Zap, Puzzle, Star, Trophy,
  Users, Timer, Globe, Swords, Dice
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GameSearchOverlay } from "@/components/search/GameSearchOverlay";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  rating: number;
  downloads: string;
  price?: string;
  isFeatured?: boolean;
  isEditorChoice?: boolean;
  route?: string;
  activePlayers?: number;
  maxPlayers?: number;
  tournamentCount?: number;
  upcomingTournaments?: number;
  difficulty?: "Easy" | "Medium" | "Hard";
  avgMatchDuration?: string;
  regions?: string[];
  prizePool?: string;
}

const games: Game[] = [
  {
    id: "chess",
    title: "Chess Master Pro",
    description: "Challenge your mind with the ultimate chess experience. Compete in ranked matches and tournaments.",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    category: "Strategy",
    rating: 4.8,
    downloads: "1M+",
    isFeatured: true,
    route: "/games/chess",
    activePlayers: 15234,
    maxPlayers: 2,
    tournamentCount: 156,
    upcomingTournaments: 12,
    difficulty: "Medium",
    avgMatchDuration: "15-30min",
    regions: ["Global", "Europe", "Americas"],
    prizePool: "$50,000+"
  },
  {
    id: "morpion",
    title: "Tic Tac Toe",
    description: "Classic three-in-a-row with ranked multiplayer and custom tournaments",
    thumbnail: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    category: "Casual",
    rating: 4.5,
    downloads: "500K+",
    isEditorChoice: true,
    route: "/games/morpion",
    activePlayers: 8965,
    maxPlayers: 2,
    tournamentCount: 89,
    upcomingTournaments: 5,
    difficulty: "Easy",
    avgMatchDuration: "5-10min",
    regions: ["Global"],
    prizePool: "$10,000+"
  },
  {
    id: "domino",
    title: "Domino Masters",
    description: "Strategic tile-matching multiplayer game with competitive leagues",
    thumbnail: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    category: "Strategy",
    rating: 4.3,
    downloads: "100K+",
    price: "Free",
    activePlayers: 5432,
    maxPlayers: 4,
    tournamentCount: 45,
    upcomingTournaments: 3,
    difficulty: "Medium",
    avgMatchDuration: "20-30min",
    regions: ["Americas", "Europe"],
    prizePool: "$25,000+"
  },
  {
    id: "puzzle",
    title: "Brain Teaser Battle",
    description: "Real-time puzzle battles and weekly tournaments",
    thumbnail: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    category: "Puzzle",
    rating: 4.7,
    downloads: "250K+",
    price: "Free",
    activePlayers: 12543,
    maxPlayers: 4,
    tournamentCount: 78,
    upcomingTournaments: 8,
    difficulty: "Hard",
    avgMatchDuration: "10-15min",
    regions: ["Global", "Asia"],
    prizePool: "$15,000+"
  }
];

const categories = [
  "For you",
  "Top charts",
  "Tournament Ready",
  "Quick Games",
  "Team Games",
  "Strategy",
  "Casual",
  "Competitive"
];

export default function GamesPages() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("For you");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toast } = useToast();

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium">{rating}</span>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full",
                i < Math.floor(rating) ? "bg-yellow-400" : "bg-gray-200"
              )}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleQuickPlay = (game: Game) => {
    toast({
      title: "Finding match...",
      description: `Looking for ${game.maxPlayers} players for ${game.title}`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-white border-b border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground/60 group-hover:text-muted-foreground/80 transition-colors duration-200" />
              <Input
                placeholder="Search games, tournaments..."
                className="w-full pl-10 pr-16 bg-gray-50/80 hover:bg-gray-50 focus:bg-white transition-colors border-none h-10 text-sm rounded-xl cursor-pointer"
                value={searchQuery}
                onClick={() => setIsSearchOpen(true)}
                readOnly
              />
              <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-50 hover:opacity-100 transition-opacity duration-200">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>

            <div className="flex items-center gap-1.5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-100"
                  >
                    <Gamepad2 className="h-4 w-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Zap className="mr-2 h-4 w-4" />
                    Quick Match
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trophy className="mr-2 h-4 w-4" />
                    Join Tournament
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Swords className="mr-2 h-4 w-4" />
                    Create Challenge
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Globe className="mr-2 h-4 w-4" />
                    Change Region
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-100"
                  >
                    <Filter className="h-4 w-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Crown className="mr-2 h-4 w-4" />
                    Ranked Games
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Timer className="mr-2 h-4 w-4" />
                    Quick Games
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trophy className="mr-2 h-4 w-4" />
                    Tournament Ready
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-8 w-8 rounded-full hover:bg-gray-100"
              >
                <Bell className="h-4 w-4 text-gray-600" />
                {notifications > 0 && (
                  <Badge 
                    className="absolute -right-0.5 -top-0.5 h-4 w-4 items-center justify-center rounded-full bg-red-500 p-0.5 text-[10px] font-medium text-white border-2 border-white animate-pulse"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>Match Settings</DropdownMenuItem>
                  <DropdownMenuItem>Tournament Preferences</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Game History</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <ScrollArea className="w-full" type="scroll">
            <div className="px-4 pb-3">
              <Tabs 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="h-9 bg-transparent p-0 w-auto">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="h-9 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      <div className="pt-[116px] pb-24">
        {games.find(game => game.isFeatured) && (
          <div className="px-4 mb-8">
            <h2 className="text-lg font-semibold mb-4">Featured Tournament Game</h2>
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={games.find(game => game.isFeatured)?.thumbnail}
                alt="Featured game"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-yellow-500 text-white border-none">
                  ${games.find(game => game.isFeatured)?.prizePool} Prize Pool
                </Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">
                  {games.find(game => game.isFeatured)?.title}
                </h3>
                <p className="text-sm opacity-90 mb-2">
                  {games.find(game => game.isFeatured)?.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {games.find(game => game.isFeatured)?.activePlayers} Playing
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    {games.find(game => game.isFeatured)?.tournamentCount} Tournaments
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="w-4 h-4" />
                    {games.find(game => game.isFeatured)?.avgMatchDuration}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 mb-8">
          <h2 className="text-lg font-semibold mb-4">Tournament Ready Games</h2>
          <div className="grid grid-cols-2 gap-4">
            {games
              .filter(game => game.isEditorChoice)
              .map(game => (
                <Button
                  key={game.id}
                  variant="ghost"
                  className="h-auto p-0 w-full"
                  onClick={() => game.route && navigate(game.route)}
                >
                  <div className="w-full text-left">
                    <div className="relative aspect-[4/3] mb-2">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        <Badge
                          className="bg-white/90 text-black"
                          variant="secondary"
                        >
                          {game.difficulty}
                        </Badge>
                        <Badge
                          className="bg-blue-500 text-white border-none"
                        >
                          {game.maxPlayers} Players
                        </Badge>
                      </div>
                      <Badge
                        className="absolute top-2 right-2 bg-purple-500 text-white border-none"
                      >
                        {game.upcomingTournaments} Upcoming Tournaments
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{game.title}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4" />
                        {game.regions?.join(", ")}
                      </div>
                      {game.prizePool && (
                        <Badge variant="secondary" className="bg-yellow-100">
                          {game.prizePool}
                        </Badge>
                      )}
                    </div>
                    {renderRating(game.rating)}
                  </div>
                </Button>
              ))}
          </div>
        </div>

        <div className="px-4">
          <h2 className="text-lg font-semibold mb-4">All Games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {games.map(game => (
              <Button
                key={game.id}
                variant="ghost"
                className="h-auto p-0 w-full"
                onClick={() => game.route && navigate(game.route)}
              >
                <div className="w-full text-left">
                  <div className="relative aspect-[4/3] mb-2">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <Badge className="bg-blue-500 text-white border-none">
                        {game.category}
                      </Badge>
                      {game.activePlayers && (
                        <Badge className="bg-green-500 text-white border-none">
                          {game.activePlayers.toLocaleString()} Online
                        </Badge>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 truncate">
                    {game.title}
                  </h3>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">{game.downloads}</span>
                    {game.price ? (
                      <span className="text-xs font-medium">{game.price}</span>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">
                        Free
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    {renderRating(game.rating)}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 hover:bg-blue-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickPlay(game);
                      }}
                    >
                      <Zap className="w-4 h-4 text-blue-500" />
                    </Button>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <GameSearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
