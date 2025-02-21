
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
import { Search, Heart, MessageSquare, Share2, Filter, SlidersHorizontal } from "lucide-react";
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
      }
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
      }
    },
    {
      id: 3,
      title: "Morpion (Tic-Tac-Toe)",
      description: "A simple strategy game for two players, who take turns marking the spaces in a 3×3 grid.",
      image: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
      profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
      verified: true,
      stats: {
        likes: "900",
        comments: "150",
        shares: "200"
      }
    },
    {
      id: 4,
      title: "Shogi",
      description: "A Japanese strategy board game for two players, similar to chess.",
      image: "https://storage.googleapis.com/a1aa/image/URT1V_NcnrlLxnJWpP80Ej-uYh8hMuDel6e7Pxqs_eo.jpg",
      profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
      verified: true,
      stats: {
        likes: "1.5K",
        comments: "250",
        shares: "400"
      }
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
      }
    },
    {
      id: 6,
      title: "Space Invaders",
      description: "Defend Earth from an alien invasion in this timeless shooting game.",
      image: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
      profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
      verified: true,
      stats: {
        likes: "4.1K",
        comments: "720",
        shares: "950"
      }
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
      }
    },
    {
      id: 8,
      title: "Solitaire",
      description: "A single-player card game also known as Patience, perfect for casual gaming.",
      image: "https://storage.googleapis.com/a1aa/image/URT1V_NcnrlLxnJWpP80Ej-uYh8hMuDel6e7Pxqs_eo.jpg",
      profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
      verified: true,
      stats: {
        likes: "3.8K",
        comments: "450",
        shares: "780"
      }
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
      }
    },
    {
      id: 10,
      title: "Sudoku",
      description: "Fill a 9×9 grid with numbers according to specific rules in this logic puzzle.",
      image: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
      profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
      verified: true,
      stats: {
        likes: "4.5K",
        comments: "890",
        shares: "1.2K"
      }
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

interface GameSectionProps {
  title: string;
  games: any[];
  onLike: (gameId: number) => void;
  onShare: (gameId: number) => void;
  likedGames: number[];
}

const GameSection = ({ title, games, onLike, onShare, likedGames }: GameSectionProps) => {
  const navigate = useNavigate();

  const handleGameClick = (gameId: number, gameTitle: string) => {
    navigate(`/tournaments?game=${gameId}&title=${encodeURIComponent(gameTitle)}`);
  };

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
      <div className="flex overflow-x-auto no-scrollbar">
        <div className="flex space-x-4 px-4">
          {games.map((game) => (
            <Card key={game.id} className="bg-white rounded-lg shadow-md overflow-hidden w-72 flex-shrink-0 group hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img 
                  src={game.image} 
                  alt={`${game.title} board`} 
                  className="h-40 w-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <img 
                  src={game.profileImage} 
                  alt="Profile" 
                  className="absolute bottom-3 left-3 h-10 w-10 rounded-full border-2 border-white shadow-md"
                />
                {game.verified && (
                  <Badge className="absolute top-3 right-3 bg-blue-500/90 hover:bg-blue-500/95">
                    Verified
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold line-clamp-1">
                    {game.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {game.description}
                  </p>
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
                        likedGames.includes(game.id) && "fill-red-500 text-red-500"
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
                  <Button 
                    className="w-full"
                    onClick={() => handleGameClick(game.id, game.title)}
                  >
                    View Tournaments
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
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
