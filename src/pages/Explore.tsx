import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, Heart, MessageSquare, Share2, Filter, 
  SlidersHorizontal, Users, Clock, DollarSign, Star,
  Gamepad, Trophy, Tag, ThumbsUp 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Game } from "@/types/explore";

const games = {
  boardGames: [
    {
      id: 1,
      title: "Chess",
      description: "A strategic board game where two players move pieces with the goal of checkmating the opponent's king.",
      image: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
      profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
      verified: true,
      stats: {
        likes: "3.2K",
        comments: "600",
        shares: "1.1K"
      },
      category: "boardGames",
      tags: ["strategy", "classic"],
      difficulty: "medium" as const,
      players: 2,
      rating: 4.5,
      playTime: "60-120 minutes",
      price: { amount: 0, currency: "USD" }
    },
    {
      id: 2,
      title: "Dominoes",
      description: "A family of tile-based games played with rectangular \"domino\" tiles.",
      image: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
      profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
      verified: true,
      stats: {
        likes: "1.1K",
        comments: "180",
        shares: "250"
      },
      category: "boardGames",
      tags: ["tile-based", "family"],
      difficulty: "easy" as const,
      players: 2,
      rating: 3.8,
      playTime: "30-45 minutes",
      price: { amount: 0, currency: "USD" }
    }
  ],
  arcadeGames: [
    {
      id: 5,
      title: "Pac-Man",
      description: "Navigate through a maze while eating dots and avoiding ghosts in this classic arcade game.",
      image: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
      profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
      verified: true,
      stats: {
        likes: "5.2K",
        comments: "800",
        shares: "1.5K"
      },
      category: "arcadeGames",
      tags: ["maze", "classic"],
      difficulty: "easy" as const,
      players: 1,
      rating: 4.7,
      playTime: "5-15 minutes",
      price: { amount: 0, currency: "USD" }
    }
  ],
  cardGames: [
    {
      id: 7,
      title: "Poker",
      description: "A family of card games involving betting and individual play against other players.",
      image: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
      profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
      verified: true,
      stats: {
        likes: "6.5K",
        comments: "1.2K",
        shares: "2.1K"
      },
      category: "cardGames",
      tags: ["betting", "strategy"],
      difficulty: "hard" as const,
      players: 2,
      rating: 4.8,
      playTime: "30-60 minutes",
      price: { amount: 75, currency: "USD" }
    }
  ],
  puzzleGames: [
    {
      id: 9,
      title: "Tetris",
      description: "Arrange falling blocks to create complete lines in this addictive puzzle game.",
      image: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
      profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
      verified: true,
      stats: {
        likes: "7.2K",
        comments: "1.5K",
        shares: "2.8K"
      },
      category: "puzzleGames",
      tags: ["blocks", "addictive"],
      difficulty: "medium" as const,
      players: 1,
      rating: 4.9,
      playTime: "10-20 minutes",
      price: { amount: 0, currency: "USD" }
    }
  ]
};

const sliderImages = [
  {
    id: 1,
    url: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
    alt: "Gaming slide 1"
  },
  {
    id: 2,
    url: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
    alt: "Gaming slide 2"
  },
  {
    id: 3,
    url: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
    alt: "Gaming slide 3"
  }
];

const categories = [
  { id: "all", label: "All" },
  { id: "entertainment", label: "Entertainment" },
  { id: "sports", label: "Sports" },
  { id: "anime", label: "Anime & Comics" },
  { id: "games", label: "Games" }
];

interface GameCardProps {
  game: Game;
  onLike: (gameId: number) => void;
  onShare: (gameId: number) => void;
  isLiked: boolean;
}

const GameCard = ({ game, onLike, onShare, isLiked }: GameCardProps) => {
  const navigate = useNavigate();

  const handleGameClick = (gameId: number, gameTitle: string) => {
    navigate(`/tournaments?game=${gameId}&title=${encodeURIComponent(gameTitle)}`);
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "hard": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden w-72 flex-shrink-0 group hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img 
          src={game.image} 
          alt={`${game.title} cover`} 
          className="h-40 w-full object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          {game.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-black/50 text-white backdrop-blur-sm text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
        {game.difficulty && (
          <Badge 
            className={`absolute top-3 right-3 ${getDifficultyColor(game.difficulty)}`}
          >
            {game.difficulty}
          </Badge>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <img 
            src={game.profileImage} 
            alt="Creator" 
            className="h-8 w-8 rounded-full border-2 border-white"
          />
          {game.verified && (
            <Badge className="bg-blue-500/90">Verified</Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h2 className="text-lg font-semibold line-clamp-1">{game.title}</h2>
            {game.rating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-sm">{game.rating}</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-500 line-clamp-2">{game.description}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {game.players && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {game.players}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Players required</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {game.playTime && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {game.playTime}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Average play time</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {game.price && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {game.price.amount} {game.price.currency}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Entry fee</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onLike(game.id);
              }}
            >
              <Heart className={cn(
                "w-4 h-4 mr-1",
                isLiked && "fill-red-500 text-red-500"
              )} />
              {game.stats.likes}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onShare(game.id);
              }}
            >
              <Share2 className="w-4 h-4 mr-1" />
              {game.stats.shares}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="w-4 h-4 mr-1" />
              {game.stats.comments}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={() => handleGameClick(game.id, game.title)}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Tournaments
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate(`/game/${game.id}`)}
            >
              <Gamepad className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface GameSectionProps {
  title: string;
  games: Game[];
  onLike: (gameId: number) => void;
  onShare: (gameId: number) => void;
  likedGames: number[];
}

const GameSection = ({ title, games, onLike, onShare, likedGames }: GameSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center px-4 mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">{title}</h1>
          <Badge variant="secondary" className="rounded-full">
            {games.length}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="text-sm">
          See All
        </Button>
      </div>
      <ScrollArea className="w-full">
        <div className="flex space-x-4 px-4 pb-4">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onLike={onLike}
              onShare={onShare}
              isLiked={likedGames.includes(game.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default function Explore() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedGames, setLikedGames] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    verified: false,
    hasComments: false,
    trending: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const handleLike = (gameId: number) => {
    setLikedGames(prev => {
      const isLiked = prev.includes(gameId);
      const newLikedGames = isLiked 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId];
      
      toast({
        title: isLiked ? "Removed from favorites" : "Added to favorites",
        description: "Your preferences have been updated",
      });
      
      return newLikedGames;
    });
  };

  const handleShare = (gameId: number) => {
    toast({
      title: "Sharing...",
      description: "This feature will be available soon!",
    });
  };

  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'rating'>('popular');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <button className="text-xl" onClick={() => navigate(-1)}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <h1 className="text-2xl font-bold ml-4">Explore</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filters</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filters.verified}
                  onCheckedChange={(checked) => 
                    setFilters(prev => ({ ...prev, verified: checked }))
                  }
                >
                  Verified Only
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.hasComments}
                  onCheckedChange={(checked) =>
                    setFilters(prev => ({ ...prev, hasComments: checked }))
                  }
                >
                  Has Comments
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.trending}
                  onCheckedChange={(checked) =>
                    setFilters(prev => ({ ...prev, trending: checked }))
                  }
                >
                  Trending
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <Input
            placeholder="Search games, tournaments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="px-4 pb-4">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="w-full justify-start overflow-x-auto no-scrollbar">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-4 py-2"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </header>

      <div className="w-full relative mb-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {sliderImages.map((image, index) => (
              <CarouselItem key={image.id} className="w-full pl-0">
                <div className="relative aspect-[2/1]">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex justify-center gap-2">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300 ease-in-out transform",
                    currentSlide === index 
                      ? "bg-white w-4" 
                      : "bg-white/60 hover:bg-white/80"
                  )}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </Carousel>
      </div>

      <div className="space-y-6">
        <GameSection 
          title="Board Games" 
          games={games.boardGames} 
          onLike={handleLike}
          onShare={handleShare}
          likedGames={likedGames}
        />
        <GameSection 
          title="Arcade Games" 
          games={games.arcadeGames}
          onLike={handleLike}
          onShare={handleShare}
          likedGames={likedGames}
        />
        <GameSection 
          title="Card Games" 
          games={games.cardGames}
          onLike={handleLike}
          onShare={handleShare}
          likedGames={likedGames}
        />
        <GameSection 
          title="Puzzle Games" 
          games={games.puzzleGames}
          onLike={handleLike}
          onShare={handleShare}
          likedGames={likedGames}
        />
      </div>

      <style>{`
        .truncate-2-lines {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
