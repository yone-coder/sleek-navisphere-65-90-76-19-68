
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, History, ArrowLeft, Filter, Tag, Star, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

interface GameSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GameSearchOverlay({ isOpen, onClose }: GameSearchOverlayProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("gameSearchHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [filters, setFilters] = useState({
    name: true,
    category: true,
    rating: true,
  });
  const [sortBy, setSortBy] = useState<"relevance" | "rating" | "downloads">("relevance");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteGameSearches");
    return saved ? JSON.parse(saved) : [];
  });

  const popularCategories = [
    "Action",
    "Adventure",
    "Arcade",
    "Board",
    "Card",
    "Casino",
    "Casual",
    "Educational",
    "Music",
    "Puzzle",
    "Racing",
    "Role Playing",
    "Simulation",
    "Sports",
    "Strategy",
    "Word"
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") {
        onClose();
      }

      if (e.metaKey || e.ctrlKey) {
        if (e.key === "k") {
          e.preventDefault();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && !searchHistory.includes(query.trim())) {
      const newHistory = [query.trim(), ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem("gameSearchHistory", JSON.stringify(newHistory));
    }
  };

  const toggleFavorite = (query: string) => {
    const newFavorites = favorites.includes(query)
      ? favorites.filter(q => q !== query)
      : [...favorites, query];
    setFavorites(newFavorites);
    localStorage.setItem("favoriteGameSearches", JSON.stringify(newFavorites));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("gameSearchHistory");
  };

  const removeSearchItem = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    localStorage.setItem("gameSearchHistory", JSON.stringify(newHistory));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 animate-in fade-in">
      <div className="h-full flex flex-col">
        <div className="border-b">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={onClose}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <Input
                type="search"
                placeholder="Search games by name, category, or features..."
                className="w-full pl-10 pr-24"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <Command className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="font-medium">Search in:</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={filters.name}
                      onCheckedChange={(checked) => setFilters(f => ({ ...f, name: checked }))}
                    >
                      Game Names
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.category}
                      onCheckedChange={(checked) => setFilters(f => ({ ...f, category: checked }))}
                    >
                      Categories
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.rating}
                      onCheckedChange={(checked) => setFilters(f => ({ ...f, rating: checked }))}
                    >
                      Ratings
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-medium">Sort by:</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={sortBy === "relevance"}
                      onCheckedChange={(checked) => checked && setSortBy("relevance")}
                    >
                      Relevance
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={sortBy === "rating"}
                      onCheckedChange={(checked) => checked && setSortBy("rating")}
                    >
                      Rating
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={sortBy === "downloads"}
                      onCheckedChange={(checked) => checked && setSortBy("downloads")}
                    >
                      Downloads
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="max-w-2xl mx-auto py-4 space-y-6">
            {!searchQuery && favorites.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-900">Favorites</h3>
                <div className="flex flex-wrap gap-2">
                  {favorites.map((query, index) => (
                    <Button
                      key={`favorite-${index}`}
                      variant="outline"
                      size="sm"
                      className="h-auto py-1.5 px-3 text-xs"
                      onClick={() => handleSearch(query)}
                    >
                      <Star className="w-3 h-3 mr-1 fill-amber-400 text-amber-400" />
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {!searchQuery && searchHistory.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm text-gray-900">Recent Searches</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-500 h-auto py-1"
                    onClick={clearSearchHistory}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((query, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-1.5"
                    >
                      <History className="w-3 h-3 text-gray-400" />
                      <button
                        className="text-sm text-gray-600"
                        onClick={() => handleSearch(query)}
                      >
                        {query}
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => toggleFavorite(query)}
                      >
                        <Star className={`h-3 w-3 ${favorites.includes(query) ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => removeSearchItem(index, e)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!searchQuery && (
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-900">Popular Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {popularCategories.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      className="h-auto py-1.5 px-3 text-xs"
                      onClick={() => handleSearch(category)}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">Search results will appear here</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
