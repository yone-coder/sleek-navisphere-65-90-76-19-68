import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Search, Bell, Sparkles,
  Gift, Crown, Filter, Command, Settings, 
  Gamepad2, Zap, Puzzle, Star,
  Heart, MessageSquare, Share2, Users,
  Trophy, Check, Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GameSearchOverlay } from "@/components/search/GameSearchOverlay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const games = [
  {
    id: "chess",
    title: "Chess Master Pro",
    description: "Challenge your mind with the ultimate chess experience. Play against AI or compete with players worldwide in real-time matches.",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Chess",
    category: "Board",
    rating: 4.8,
    downloads: "1M+",
    isFeatured: true,
    route: "/games/chess",
    activePlayers: 15420,
    tournaments: 32,
    likes: 45200,
    comments: 1200,
    shares: 890,
    verified: true
  },
  {
    id: "morpion",
    title: "Tic Tac Toe",
    description: "Classic three-in-a-row with multiplayer",
    thumbnail: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TicTacToe",
    category: "Casual",
    rating: 4.5,
    downloads: "500K+",
    isEditorChoice: true,
    route: "/games/morpion",
    activePlayers: 8765,
    tournaments: 15,
    likes: 23400,
    comments: 678,
    shares: 456,
    verified: false
  },
  {
    id: "domino",
    title: "Domino Masters",
    description: "Strategic tile-matching multiplayer game",
    thumbnail: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Domino",
    category: "Board",
    rating: 4.3,
    downloads: "100K+",
    price: "Free",
    activePlayers: 3456,
    tournaments: 8,
    likes: 12300,
    comments: 345,
    shares: 234,
    verified: false
  },
  {
    id: "puzzle",
    title: "Brain Teaser",
    description: "Mind-bending puzzles and challenges",
    thumbnail: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Puzzle",
    category: "Puzzle",
    rating: 4.7,
    downloads: "250K+",
    price: "Free",
    activePlayers: 5678,
    tournaments: 12,
    likes: 34500,
    comments: 789,
    shares: 567,
    verified: true
  }
];

const categories = [
  "For you",
  "Top charts",
  "Kids",
  "Premium",
  "Categories",
  "Editor's choice"
];

export default function GamesPages() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("For you");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [savedGames, setSavedGames] = useState<string[]>([]);
  const { toast } = useToast();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handleSaveGame = (gameId: string) => {
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
                placeholder="Search games, categories..."
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
                    Quick Play
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Star className="mr-2 h-4 w-4" />
                    My Favorites
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Puzzle className="mr-2 h-4 w-4" />
                    Game Suggestions
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
                    Premium Games
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Sparkles className="mr-2 h-4 w-4" />
                    New Releases
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Gift className="mr-2 h-4 w-4" />
                    Special Offers
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
                  <DropdownMenuItem>
                    Game Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Privacy Controls
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Help & Support
                  </DropdownMenuItem>
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
            <h2 className="text-lg font-semibold mb-4">Featured Game</h2>
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="absolute inset-0">
                <img
                  src={games.find(game => game.isFeatured)?.thumbnail}
                  alt="Featured game"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              
              <div className="relative p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm">
                      <img 
                        src={games.find(game => game.isFeatured)?.logo}
                        alt="Game logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-bold">
                          {games.find(game => game.isFeatured)?.title}
                        </h3>
                        {games.find(game => game.isFeatured)?.verified && (
                          <Check className="w-5 h-5 text-blue-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-200 max-w-xl">
                        {games.find(game => game.isFeatured)?.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const featuredGame = games.find(game => game.isFeatured);
                      if (featuredGame) handleSaveGame(featuredGame.id);
                    }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                  >
                    <Bookmark className={cn(
                      "w-5 h-5",
                      savedGames.includes(games.find(game => game.isFeatured)?.id || '') 
                        ? "fill-white text-white" 
                        : "text-white"
                    )} />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <Users className="w-4 h-4" />
                      <span>Active Players</span>
                    </div>
                    <span className="text-xl font-bold">
                      {formatNumber(games.find(game => game.isFeatured)?.activePlayers || 0)}
                    </span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span>Tournaments</span>
                    </div>
                    <span className="text-xl font-bold">
                      {formatNumber(games.find(game => game.isFeatured)?.tournaments || 0)}
                    </span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span>Likes</span>
                    </div>
                    <span className="text-xl font-bold">
                      {formatNumber(games.find(game => game.isFeatured)?.likes || 0)}
                    </span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>Comments</span>
                    </div>
                    <span className="text-xl font-bold">
                      {formatNumber(games.find(game => game.isFeatured)?.comments || 0)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>{formatNumber(games.find(game => game.isFeatured)?.comments || 0)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      <span>{formatNumber(games.find(game => game.isFeatured)?.shares || 0)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => navigate("/tournaments")}
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      View Tournaments
                    </Button>
                    <Button 
                      className="bg-white text-blue-600 hover:bg-white/90"
                      onClick={() => {
                        const featuredGame = games.find(game => game.isFeatured);
                        if (featuredGame?.route) navigate(featuredGame.route);
                      }}
                    >
                      Play Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 mb-8">
          <h2 className="text-lg font-semibold mb-4">Editor's Choice</h2>
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
                      <Badge
                        className="absolute top-2 left-2 bg-white/90 text-black"
                        variant="secondary"
                      >
                        Editor's Choice
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{game.title}</h3>
                    {renderRating(game.rating)}
                  </div>
                </Button>
              ))}
          </div>
        </div>

        <div className="px-4">
          <h2 className="text-lg font-semibold mb-4">Popular Games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {games.map(game => (
              <Button
                key={game.id}
                variant="ghost"
                className="h-auto p-0 w-full"
                onClick={() => game.route && navigate(game.route)}
              >
                <div className="w-full text-left">
                  <div className="aspect-[4/3] mb-2">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <h3 className="font-semibold text-sm mb-1 truncate">
                    {game.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{game.downloads}</span>
                    {game.price ? (
                      <span className="text-xs font-medium">{game.price}</span>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">
                        Free
                      </Badge>
                    )}
                  </div>
                  {renderRating(game.rating)}
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
