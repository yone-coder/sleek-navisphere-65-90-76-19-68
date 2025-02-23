
import { useState } from "react";
import { Search, GameController, Trophy, Radio, Target, Tag, TrendingUp, History, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/games/GameCard";
import { Game } from "@/components/games/types";
import { useNavigate } from "react-router-dom";

const popularSearches = [
  "Action RPG", "Battle Royale", "Racing", "Strategy", "MMO", "FPS", "MOBA"
];

const categories = [
  { name: "Tournaments", icon: Trophy, color: "bg-purple-500" },
  { name: "Live Games", icon: Radio, color: "bg-red-500" },
  { name: "Trending", icon: TrendingUp, color: "bg-blue-500" },
  { name: "Popular", icon: Target, color: "bg-green-500" },
  { name: "New", icon: GameController, color: "bg-amber-500" }
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory] = useState<string[]>(["League of Legends", "CS:GO", "Valorant"]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black/95">
      <div className="sticky top-0 z-50 bg-black/95 border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search games, tournaments, or players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {!searchQuery ? (
            <>
              {/* Categories */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant="outline"
                    className="h-auto py-4 border-white/10 hover:bg-white/5"
                    onClick={() => navigate(`/games-pages/category/${category.name.toLowerCase()}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${category.color} p-2 rounded-lg`}>
                        <category.icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-white font-medium">{category.name}</span>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Popular Searches */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <Badge
                      key={term}
                      variant="outline"
                      className="border-purple-500/50 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 cursor-pointer"
                      onClick={() => setSearchQuery(term)}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {searchHistory.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Searches</h3>
                  <div className="space-y-2">
                    {searchHistory.map((term) => (
                      <Button
                        key={term}
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
                        onClick={() => setSearchQuery(term)}
                      >
                        <History className="h-4 w-4 mr-2" />
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              {/* Search Results would go here */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-white">Results for "{searchQuery}"</h2>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4">
                {/* Example search results */}
                <div className="text-center text-gray-400 py-8">
                  <GameController className="h-12 w-12 mx-auto mb-3 text-gray-500" />
                  <p>No results found for "{searchQuery}"</p>
                  <p className="text-sm">Try searching for something else</p>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
