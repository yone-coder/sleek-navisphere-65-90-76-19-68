
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Gamepad2, Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
}

const games: Game[] = [
  {
    id: "chess",
    title: "Chess Master Pro",
    description: "Challenge your mind with the ultimate chess experience",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    category: "Board",
    rating: 4.8,
    downloads: "1M+",
    isFeatured: true,
    route: "/games/chess"
  },
  {
    id: "morpion",
    title: "Tic Tac Toe",
    description: "Classic three-in-a-row with multiplayer",
    thumbnail: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    category: "Casual",
    rating: 4.5,
    downloads: "500K+",
    isEditorChoice: true,
    route: "/games/morpion"
  },
  {
    id: "domino",
    title: "Domino Masters",
    description: "Strategic tile-matching multiplayer game",
    thumbnail: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    category: "Board",
    rating: 4.3,
    downloads: "100K+",
    price: "Free"
  },
  {
    id: "puzzle",
    title: "Brain Teaser",
    description: "Mind-bending puzzles and challenges",
    thumbnail: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    category: "Puzzle",
    rating: 4.7,
    downloads: "250K+",
    price: "Free"
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
            <p className="text-sm text-gray-500">Discover amazing games</p>
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

      {/* Content */}
      <div className="pt-[116px] pb-24">
        {/* Featured Game */}
        {games.find(game => game.isFeatured) && (
          <div className="px-4 mb-8">
            <h2 className="text-lg font-semibold mb-4">Featured Game</h2>
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={games.find(game => game.isFeatured)?.thumbnail}
                alt="Featured game"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">
                  {games.find(game => game.isFeatured)?.title}
                </h3>
                <p className="text-sm opacity-90">
                  {games.find(game => game.isFeatured)?.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Editor's Choice */}
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

        {/* All Games */}
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
    </div>
  );
}
