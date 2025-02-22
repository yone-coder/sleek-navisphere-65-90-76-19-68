
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Trophy, Dices, Dice1, Grid3X3, PlaySquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  route?: string;
  status?: "Live" | "Popular" | "New" | "Coming Soon";
}

const games: Game[] = [
  {
    id: "chess",
    title: "Chess",
    description: "Classic strategy board game",
    icon: <Dices className="w-6 h-6" />,
    category: "Strategy",
    route: "/games/chess",
    status: "Live"
  },
  {
    id: "morpion",
    title: "Tic Tac Toe",
    description: "Three-in-a-row game",
    icon: <Grid3X3 className="w-6 h-6" />,
    category: "Casual",
    route: "/games/morpion",
    status: "Popular"
  },
  {
    id: "domino",
    title: "Dominoes",
    description: "Tile-based matching game",
    icon: <Dice1 className="w-6 h-6" />,
    category: "Strategy",
    status: "Coming Soon"
  },
  {
    id: "poker",
    title: "Poker",
    description: "Card game of skill",
    icon: <PlaySquare className="w-6 h-6" />,
    category: "Cards",
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
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {filteredGames.map((game) => (
            <Button
              key={game.id}
              variant="ghost"
              className={cn(
                "h-auto flex flex-col items-center gap-2 p-4",
                "hover:bg-gray-100/80",
                game.status === "Coming Soon" && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => game.route && navigate(game.route)}
              disabled={game.status === "Coming Soon"}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center",
                game.category === "Strategy" && "bg-blue-500",
                game.category === "Casual" && "bg-green-500",
                game.category === "Cards" && "bg-purple-500",
                game.category === "Puzzle" && "bg-orange-500"
              )}>
                {game.icon}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">{game.title}</p>
                <p className="text-xs text-gray-500">{game.description}</p>
              </div>
              {game.status === "New" && (
                <div className="absolute -top-1 -right-1">
                  <div className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    NEW
                  </div>
                </div>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
