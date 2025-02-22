import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageSquare,
  Share2,
  Search,
  Users,
  Trophy,
  Bookmark,
  Check,
  Filter,
  Gamepad2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Game {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  creatorImage: string;
  verified: boolean;
  type: string[];
  likes: number;
  comments: number;
  shares: number;
  bookmarked: boolean;
  players?: number;
  tournaments?: number;
}

const sampleGames: Game[] = [
  {
    id: 1,
    title: "Chess",
    description: "A two-player strategy board game played on a checkered board with 64 squares arranged in an 8×8 grid.",
    coverImage: "https://storage.googleapis.com/a1aa/image/mXWQ7mdPAnTHpduxXF4Ijpxvg_lJjGQ1WpJw-QQrNqA.jpg",
    creatorImage: "https://storage.googleapis.com/a1aa/image/Rx1djXfNKOUuCzUIYc6iMZXnX0AAqQTUDeMdWWnW-uE.jpg",
    verified: true,
    type: ["1vs1", "Tournament"],
    likes: 1259,
    comments: 346,
    shares: 528,
    bookmarked: false,
    players: 15420,
    tournaments: 32
  },
  {
    id: 2,
    title: "Gomoku",
    description: "A strategy board game where players alternate placing pieces on the board with the goal of getting 5 in a row.",
    coverImage: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player1",
    verified: true,
    type: ["1vs1"],
    likes: 823,
    comments: 156,
    shares: 245,
    bookmarked: false
  },
  {
    id: 3,
    title: "Morpion",
    description: "A classic strategy game where players take turns marking spaces in a 3×3 grid, aiming to get three in a row to win.",
    coverImage: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player2",
    verified: true,
    type: ["1vs1"],
    likes: 756,
    comments: 124,
    shares: 198,
    bookmarked: false
  },
  {
    id: 4,
    title: "Go",
    description: "An abstract strategy board game for two players in which the aim is to surround more territory than the opponent.",
    coverImage: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player3",
    verified: false,
    type: ["1vs1"],
    likes: 876,
    comments: 234,
    shares: 345,
    bookmarked: false
  },
  {
    id: 5,
    title: "Checkers",
    description: "A diagonal moving board game where players compete to capture all opposing pieces by jumping over them.",
    coverImage: "https://storage.googleapis.com/a1aa/image/URT1V_NcnrlLxnJWpP80Ej-uYh8hMuDel6e7Pxqs_eo.jpg",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player4",
    verified: true,
    type: ["1vs1", "Tournament"],
    likes: 654,
    comments: 189,
    shares: 267,
    bookmarked: false
  },
  {
    id: 6,
    title: "Backgammon",
    description: "One of the oldest known board games, combining strategy and luck as players race to bear off all their pieces.",
    coverImage: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player5",
    verified: true,
    type: ["1vs1", "Tournament"],
    likes: 432,
    comments: 98,
    shares: 156,
    bookmarked: false
  },
  {
    id: 7,
    title: "Chinese Chess",
    description: "Also known as Xiangqi, this strategy game features unique piece movements and river division on the board.",
    coverImage: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player6",
    verified: true,
    type: ["1vs1"],
    likes: 567,
    comments: 145,
    shares: 234,
    bookmarked: false
  },
  {
    id: 8,
    title: "Othello",
    description: "A strategy board game where players capture opponent's disks by flanking them with their own colored disks.",
    coverImage: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player7",
    verified: false,
    type: ["1vs1", "Tournament"],
    likes: 389,
    comments: 87,
    shares: 156,
    bookmarked: false
  }
];

const categories = ["All", "Popular", "Tournament", "1vs1", "Multiplayer", "New"];

export default function Games() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedGames, setSavedGames] = useState<number[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handleSaveGame = (gameId: number) => {
    setSavedGames(prev => {
      const newSaved = prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId];
      
      toast({
        title: prev.includes(gameId) ? "Game removed" : "Game saved",
        description: prev.includes(gameId) 
          ? "Game removed from your saved list"
          : "Game added to your saved list",
      });
      
      return newSaved;
    });
  };

  const filteredGames = sampleGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || game.type.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Games</h1>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search games..."
                className="pl-9 bg-gray-800 border-gray-700 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-gray-800 border-gray-700 text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Most Popular</DropdownMenuItem>
                <DropdownMenuItem>Newest</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Active Tournaments</DropdownMenuItem>
                <DropdownMenuItem>Most Players</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="bg-gray-800">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map(game => (
            <div
              key={game.id}
              className="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div className="relative h-48">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {game.type.map(type => (
                    <Badge
                      key={type}
                      className={cn(
                        "text-white border-none",
                        type === "Tournament" ? "bg-purple-500" : "bg-blue-500"
                      )}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
                <button
                  onClick={() => handleSaveGame(game.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                >
                  <Bookmark className={cn(
                    "w-4 h-4 text-white",
                    savedGames.includes(game.id) && "fill-white"
                  )} />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">{game.title}</h3>
                      {game.verified && <Check className="w-4 h-4 text-blue-400" />}
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                      {game.description}
                    </p>
                  </div>
                  <img
                    src={game.creatorImage}
                    alt="Creator"
                    className="w-10 h-10 rounded-full border-2 border-gray-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {game.players && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{formatNumber(game.players)} Players</span>
                    </div>
                  )}
                  {game.tournaments && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{game.tournaments} Tournaments</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{formatNumber(game.likes)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{formatNumber(game.comments)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">{formatNumber(game.shares)}</span>
                    </div>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Gamepad2 className="w-4 h-4" />
                    Play
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
