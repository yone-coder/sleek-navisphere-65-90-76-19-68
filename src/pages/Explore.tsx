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
      title: "Go",
      description: "An ancient board game of territory control and strategic thinking.",
      image: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player8",
      verified: true,
      stats: {
        likes: "2.8K",
        comments: "450",
        shares: "980"
      }
    },
    {
      id: 3,
      title: "Shogi",
      description: "Japanese chess with unique piece capturing and redeployment mechanics.",
      image: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player9",
      verified: true,
      stats: {
        likes: "1.5K",
        comments: "320",
        shares: "670"
      }
    }
  ],
  arcadeGames: [
    {
      id: 4,
      title: "Pac-Man",
      description: "Navigate through a maze while eating dots and avoiding ghosts.",
      image: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player10",
      verified: true,
      stats: {
        likes: "5.2K",
        comments: "800",
        shares: "1.5K"
      }
    },
    {
      id: 5,
      title: "Space Invaders",
      description: "Classic shooter game defending Earth from alien invasion.",
      image: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player11",
      verified: true,
      stats: {
        likes: "4.1K",
        comments: "720",
        shares: "950"
      }
    },
    {
      id: 6,
      title: "Tetris",
      description: "Arrange falling blocks to create complete lines in this classic puzzle game.",
      image: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player12",
      verified: true,
      stats: {
        likes: "6.7K",
        comments: "1.2K",
        shares: "2.1K"
      }
    }
  ],
  cardGames: [
    {
      id: 7,
      title: "Poker",
      description: "Strategic card game of betting and bluffing.",
      image: "https://storage.googleapis.com/a1aa/image/URT1V_NcnrlLxnJWpP80Ej-uYh8hMuDel6e7Pxqs_eo.jpg",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player13",
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
      description: "Classic single-player card game of patience and strategy.",
      image: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player14",
      verified: true,
      stats: {
        likes: "3.8K",
        comments: "450",
        shares: "780"
      }
    },
    {
      id: 9,
      title: "Bridge",
      description: "Partnership card game of bidding and trick-taking.",
      image: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player15",
      verified: true,
      stats: {
        likes: "2.9K",
        comments: "520",
        shares: "890"
      }
    }
  ],
  puzzleGames: [
    {
      id: 10,
      title: "Sudoku",
      description: "Fill a 9×9 grid with numbers according to specific rules.",
      image: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player16",
      verified: true,
      stats: {
        likes: "4.5K",
        comments: "890",
        shares: "1.2K"
      }
    },
    {
      id: 11,
      title: "2048",
      description: "Merge tiles to reach the elusive 2048 tile in this addictive puzzle.",
      image: "https://storage.googleapis.com/a1aa/image/URT1V_NcnrlLxnJWpP80Ej-uYh8hMuDel6e7Pxqs_eo.jpg",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player17",
      verified: true,
      stats: {
        likes: "5.1K",
        comments: "950",
        shares: "1.7K"
      }
    },
    {
      id: 12,
      title: "Minesweeper",
      description: "Classic logic puzzle game of uncovering tiles while avoiding mines.",
      image: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
      profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Player18",
      verified: true,
      stats: {
        likes: "3.4K",
        comments: "670",
        shares: "920"
      }
    }
  ]
};

const sliderImages = [
  {
    id: 1,
    url: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
    alt: "Gaming slide 1",
    title: "Weekly Tournament",
    subtitle: "Join now and win exclusive rewards"
  },
  {
    id: 2,
    url: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
    alt: "Gaming slide 2",
    title: "New Games Added",
    subtitle: "Explore our latest collection"
  },
  {
    id: 3,
    url: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
    alt: "Gaming slide 3",
    title: "Special Events",
    subtitle: "Don't miss out on the action"
  }
];

const categories = [
  { id: "all", label: "All" },
  { id: "entertainment", label: "Entertainment" },
  { id: "sports", label: "Sports" },
  { id: "anime", label: "Anime & Comics" },
  { id: "games", label: "Games" }
];

const GameSection = ({ title, games }: { title: string; games: any[] }) => {
  const navigate = useNavigate();

  const handleGameClick = (gameId: number, gameTitle: string) => {
    navigate(`/tournaments?game=${gameId}&title=${encodeURIComponent(gameTitle)}`);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center px-4 mb-2">
        <h1 className="text-xl font-bold">{title}</h1>
        <i className="fas fa-arrow-right text-xl"></i>
      </div>
      <div className="flex overflow-x-auto no-scrollbar">
        <div className="flex space-x-3 px-4">
          {games.map((game) => (
            <div key={game.id} className="bg-white rounded-lg shadow-md overflow-hidden w-60 flex-shrink-0">
              <div className="relative">
                <img 
                  src={game.image} 
                  alt={`${game.title} board`} 
                  className="h-32 w-full object-cover"
                />
                <img 
                  src={game.profileImage} 
                  alt="Profile picture of the user" 
                  className="absolute bottom-0 left-2 transform translate-y-1/2 h-10 w-10 rounded-full border-2 border-white"
                />
              </div>
              <div className="p-2 pt-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-sm font-bold">
                      {game.title}
                      {game.verified && (
                        <span className="text-green-500 ml-1">
                          <i className="fas fa-check-circle"></i>
                        </span>
                      )}
                    </h2>
                  </div>
                  <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
                    + Follow
                  </button>
                </div>
                <p className="text-gray-500 text-xs truncate-2-lines">
                  {game.description}
                </p>
                <div className="mt-2 flex items-center justify-between text-gray-500 text-xs">
                  <span>
                    <i className="fas fa-heart"></i> {game.stats.likes}
                  </span>
                  <span>
                    <i className="fas fa-comment"></i> {game.stats.comments}
                  </span>
                  <span>
                    <i className="fas fa-share"></i> {game.stats.shares}
                  </span>
                </div>
                <button 
                  onClick={() => handleGameClick(game.id, game.title)}
                  className="mt-2 w-full bg-blue-500 text-white py-1 rounded-md text-sm"
                >
                  View Tournaments
                </button>
              </div>
            </div>
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

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

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

      {/* Image Slider */}
      <div className="w-full relative">
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
                <div className="relative aspect-[21/9]">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                    <p className="text-white/90 text-sm">{image.subtitle}</p>
                  </div>
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
                    "w-2 h-2 rounded-full transition-all duration-300 ease-in-out",
                    currentSlide === index 
                      ? "bg-white w-4" 
                      : "bg-white/50 hover:bg-white/70"
                  )}
                  onClick={() => {
                    api?.scrollTo(index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Carousel>
      </div>

      {/* Categories Tab Switcher */}
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
        <GameSection title="Board Games" games={games.boardGames} />
        <GameSection title="Arcade Games" games={games.arcadeGames} />
        <GameSection title="Card Games" games={games.cardGames} />
        <GameSection title="Puzzle Games" games={games.puzzleGames} />
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
