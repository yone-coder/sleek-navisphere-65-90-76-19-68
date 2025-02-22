import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameCard from "@/components/games/GameCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  onLike: (id: number) => void;
  onShare: (id: number) => void;
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
      <ScrollArea className="w-full whitespace-nowrap">
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
  const [activeCategory, setActiveCategory] = useState("all");
  const [likedGames, setLikedGames] = useState<number[]>([]);
  const { toast } = useToast();

  const handleLike = (gameId: number) => {
    setLikedGames(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );
    
    toast({
      title: likedGames.includes(gameId) ? "Removed from favorites" : "Added to favorites",
      description: "Your game preferences have been updated.",
    });
  };

  const handleShare = (gameId: number) => {
    toast({
      title: "Share link copied!",
      description: "Game link has been copied to your clipboard.",
    });
  };

  return (
    <div className="bg-gray-100">
      <header className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <button className="text-xl" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="text-2xl font-bold ml-4">Explore</h1>
        </div>
        <button className="text-xl">
          <i className="fas fa-search"></i>
        </button>
      </header>

      <div className="w-full relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
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
                      ? "bg-blue-500 w-4 scale-110" 
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  onClick={() => {
                    api?.scrollTo(index);
                  }}
                />
              ))}
            </div>
          </div>
        </Carousel>
      </div>

      <div className="py-4">
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <div className="relative">
            <TabsList className="h-10 items-center bg-transparent gap-2 flex overflow-x-auto no-scrollbar">
              <div className="flex gap-2 min-w-full px-4">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0",
                      "data-[state=active]:bg-gray-900 data-[state=active]:text-white",
                      "data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-600",
                      "hover:bg-gray-300"
                    )}
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
                <div className="w-4 flex-shrink-0" />
              </div>
            </TabsList>
          </div>
        </Tabs>
      </div>

      <div className="space-y-4">
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
