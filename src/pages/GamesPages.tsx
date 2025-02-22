import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Search, Bell, Sparkles,
  Gift, Crown, Filter, Command, Settings, 
  Gamepad2, Zap, Puzzle, Star,
  Heart, MessageSquare, Share2, Plus,
  Check, Bookmark, Users, Trophy, Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GameSearchOverlay } from "@/components/search/GameSearchOverlay";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
  rating: number;
  totalRatings: number;
  activePlayers: number;
  tournaments: number;
  avgGameTime: string;
  difficulty: string;
  bookmarked?: boolean;
}

const games: Game[] = [
  {
    id: 1,
    title: "Chess Master Pro",
    description: "Challenge your mind with the ultimate chess experience",
    coverImage: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player1",
    verified: true,
    type: ["1vs1", "Tournament"],
    likes: 1259,
    comments: 346,
    shares: 528,
    rating: 4.8,
    totalRatings: 2500,
    activePlayers: 1200,
    tournaments: 32,
    avgGameTime: "15 min",
    difficulty: "Medium",
    bookmarked: false
  },
  {
    id: 2,
    title: "Tic Tac Toe",
    description: "Classic three-in-a-row with multiplayer",
    coverImage: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player2",
    verified: false,
    type: ["2vs2"],
    likes: 890,
    comments: 234,
    shares: 456,
    rating: 4.5,
    totalRatings: 1500,
    activePlayers: 800,
    tournaments: 12,
    avgGameTime: "10 min",
    difficulty: "Easy",
    bookmarked: true
  },
  {
    id: 3,
    title: "Domino Masters",
    description: "Strategic tile-matching multiplayer game",
    coverImage: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player3",
    verified: true,
    type: ["1vs1"],
    likes: 1500,
    comments: 500,
    shares: 750,
    rating: 4.3,
    totalRatings: 3000,
    activePlayers: 1500,
    tournaments: 20,
    avgGameTime: "12 min",
    difficulty: "Medium",
    bookmarked: false
  },
  {
    id: 4,
    title: "Brain Teaser",
    description: "Mind-bending puzzles and challenges",
    coverImage: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player4",
    verified: false,
    type: ["Puzzle"],
    likes: 1000,
    comments: 300,
    shares: 600,
    rating: 4.7,
    totalRatings: 2000,
    activePlayers: 1000,
    tournaments: 10,
    avgGameTime: "8 min",
    difficulty: "Hard",
    bookmarked: true
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
  const [gameStates, setGameStates] = useState<{ [key: number]: { isFollowing: boolean; isLiked: boolean; isBookmarked: boolean; likes: number } }>({});
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

  const getGameState = (gameId: number) => {
    if (!gameStates[gameId]) {
      setGameStates(prev => ({
        ...prev,
        [gameId]: {
          isFollowing: false,
          isLiked: false,
          isBookmarked: false,
          likes: games.find(g => g.id === gameId)?.likes || 0
        }
      }));
    }
    return gameStates[gameId];
  };

  const handleFollow = (gameId: number) => {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    setGameStates(prev => ({
      ...prev,
      [gameId]: {
        ...prev[gameId],
        isFollowing: !prev[gameId]?.isFollowing
      }
    }));

    toast({
      title: gameStates[gameId]?.isFollowing ? "Unfollowed" : "Following",
      description: `You are ${gameStates[gameId]?.isFollowing ? "no longer following" : "now following"} ${game.title}`,
    });
  };

  const handleLike = (gameId: number) => {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    setGameStates(prev => ({
      ...prev,
      [gameId]: {
        ...prev[gameId],
        isLiked: !prev[gameId]?.isLiked,
        likes: prev[gameId]?.likes + (prev[gameId]?.isLiked ? -1 : 1)
      }
    }));

    toast({
      title: gameStates[gameId]?.isLiked ? "Unliked" : "Liked",
      description: `You ${gameStates[gameId]?.isLiked ? "unliked" : "liked"} ${game.title}`,
    });
  };

  const handleBookmark = (gameId: number) => {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    setGameStates(prev => ({
      ...prev,
      [gameId]: {
        ...prev[gameId],
        isBookmarked: !prev[gameId]?.isBookmarked
      }
    }));

    toast({
      title: gameStates[gameId]?.isBookmarked ? "Removed from bookmarks" : "Bookmarked",
      description: `${game.title} has been ${gameStates[gameId]?.isBookmarked ? "removed from" : "added to"} your bookmarks`,
    });
  };

  const handleShare = (game: Game) => {
    const shareText = `Check out ${game.title} - ${game.description}`;
    if (navigator.share) {
      navigator.share({
        title: game.title,
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Link copied!",
        description: "Game details copied to clipboard",
      });
    }
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
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {games.map((game) => {
            const state = getGameState(game.id);
            return (
              <div key={game.id} className="w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-40">
                  <img
                    src={game.coverImage}
                    alt={`${game.title} cover`}
                    className="w-full h-full object-cover"
                  />
                  <img
                    src={game.creatorImage}
                    alt="Creator"
                    className="absolute bottom-0 left-0 transform translate-x-3 translate-y-3 w-12 h-12 rounded-full border-2 border-white object-cover shadow-md"
                  />
                  <button
                    onClick={() => handleBookmark(game.id)}
                    className="absolute top-0 right-0 transform -translate-x-2 translate-y-2 bg-white p-1.5 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <Bookmark className={cn(
                      "w-3 h-3",
                      state.isBookmarked ? "fill-current" : "stroke-current"
                    )} />
                  </button>
                  <div className="absolute top-0 left-0 transform translate-x-2 translate-y-2 flex gap-1">
                    {game.type.map((type) => (
                      <Badge
                        key={type}
                        variant="secondary"
                        className={cn(
                          "text-white border-none text-[10px] px-1.5 py-0.5",
                          type.toLowerCase() === "1vs1" ? "bg-blue-500" : "bg-green-500"
                        )}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1">
                      <h2 className="text-lg font-bold">{game.title}</h2>
                      {game.verified && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className={cn(
                        "gap-1 text-xs px-2 py-1 h-7",
                        state.isFollowing ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : ""
                      )}
                      onClick={() => handleFollow(game.id)}
                    >
                      {state.isFollowing ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                      {state.isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>

                  <p className="text-gray-700 mb-3 text-sm line-clamp-2">{game.description}</p>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Users className="w-3 h-3" />
                      <span>{formatNumber(game.activePlayers)} Playing</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Trophy className="w-3 h-3 text-yellow-500" />
                      <span>{game.tournaments} Tournaments</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Timer className="w-3 h-3" />
                      <span>~{game.avgGameTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Gamepad2 className="w-3 h-3" />
                      <span>{game.difficulty}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-3 h-3",
                            star <= game.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          )}
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">{game.rating}</span>
                    </div>
                    <span className="text-xs text-gray-600">{formatNumber(game.totalRatings)} ratings</span>
                  </div>

                  <Progress value={(game.rating / 5) * 100} className="h-1.5 mb-3" />

                  <div className="flex items-center justify-between text-gray-600 mb-3 text-sm">
                    <button 
                      className="flex items-center gap-1 hover:text-gray-800"
                      onClick={() => handleLike(game.id)}
                    >
                      <Heart className={cn(
                        "w-3 h-3 transition-colors",
                        state.isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                      )} />
                      <span>{formatNumber(state.likes)}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-gray-800">
                      <MessageSquare className="w-3 h-3" />
                      <span>{formatNumber(game.comments)}</span>
                    </button>
                    <button 
                      className="flex items-center gap-1 hover:text-gray-800"
                      onClick={() => handleShare(game)}
                    >
                      <Share2 className="w-3 h-3" />
                      <span>{formatNumber(game.shares)}</span>
                    </button>
                  </div>

                  <Button size="sm" className="w-full text-sm h-8 bg-blue-500 hover:bg-blue-600">
                    Play Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <GameSearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
