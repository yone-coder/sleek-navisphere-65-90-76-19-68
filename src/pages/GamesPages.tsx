
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Gamepad2, Trophy, Users, 
  Clock, Star, Chess, Dice, Cards, Grid3X3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  players: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  playTime: string;
  rating: number;
  status: "Live" | "Popular" | "New" | "Coming Soon";
  route?: string;
}

const games: Game[] = [
  {
    id: "chess",
    title: "Chess",
    description: "Classic strategy board game for two players",
    icon: <Chess className="w-6 h-6" />,
    image: "https://storage.googleapis.com/a1aa/image/mXWQ7mdPAnTHpduxXF4Ijpxvg_lJjGQ1WpJw-QQrNqA.jpg",
    players: "1v1",
    category: "Strategy",
    difficulty: "Hard",
    playTime: "10-60 min",
    rating: 4.8,
    status: "Live",
    route: "/games/chess"
  },
  {
    id: "morpion",
    title: "Tic Tac Toe",
    description: "Simple but engaging three-in-a-row game",
    icon: <Grid3X3 className="w-6 h-6" />,
    image: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
    players: "1v1",
    category: "Casual",
    difficulty: "Easy",
    playTime: "1-5 min",
    rating: 4.5,
    status: "Popular",
    route: "/games/morpion"
  },
  {
    id: "domino",
    title: "Dominoes",
    description: "Strategic tile-based game of matching numbers",
    icon: <Dice className="w-6 h-6" />,
    image: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
    players: "2-4",
    category: "Strategy",
    difficulty: "Medium",
    playTime: "15-30 min",
    rating: 4.3,
    status: "Coming Soon"
  },
  {
    id: "poker",
    title: "Poker",
    description: "Popular card game of skill and chance",
    icon: <Cards className="w-6 h-6" />,
    image: "https://storage.googleapis.com/a1aa/image/URT1V_NcnrlLxnJWpP80Ej-uYh8hMuDel6e7Pxqs_eo.jpg",
    players: "2-6",
    category: "Cards",
    difficulty: "Hard",
    playTime: "30+ min",
    rating: 4.7,
    status: "New"
  }
];

const categories = ["All", "Strategy", "Cards", "Casual", "Puzzle"];

export default function GamesPages() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredGames = selectedCategory === "All" 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={cn(
          "w-4 h-4",
          index < Math.floor(rating) 
            ? "text-yellow-400 fill-current" 
            : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Games</h1>
            <p className="text-sm text-gray-500">Play with friends online</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => navigate("/tournaments")}
          >
            <Trophy className="w-4 h-4" />
            Tournaments
          </Button>
        </div>

        {/* Categories */}
        <ScrollArea className="w-full" type="scroll">
          <div className="px-4 pb-3">
            <Tabs 
              defaultValue="All" 
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full"
            >
              <TabsList className="h-9 bg-gray-100/50">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="text-sm"
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

      {/* Games Grid */}
      <div className="pt-[116px] px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map((game) => (
            <Card
              key={game.id}
              className={cn(
                "overflow-hidden border-none shadow-lg",
                "transition-all duration-300 hover:shadow-xl",
                "animate-fade-in"
              )}
            >
              <div className="relative aspect-[16/9]">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    className={cn(
                      "px-2 py-0.5",
                      game.status === "Live" && "bg-green-500",
                      game.status === "Popular" && "bg-blue-500",
                      game.status === "New" && "bg-purple-500",
                      game.status === "Coming Soon" && "bg-gray-500"
                    )}
                  >
                    {game.status}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold group-hover:text-primary">
                      {game.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                      {game.description}
                    </p>
                  </div>
                  <div className="shrink-0 p-2 bg-gray-100 rounded-lg">
                    {game.icon}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{game.players}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{game.playTime}</span>
                    </div>
                    <Badge variant="secondary">
                      {game.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1">
                    {renderStars(game.rating)}
                    <span className="text-sm text-gray-500 ml-1">
                      {game.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-4"
                  disabled={game.status === "Coming Soon"}
                  onClick={() => game.route && navigate(game.route)}
                >
                  {game.status === "Coming Soon" ? "Coming Soon" : "Play Now"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
