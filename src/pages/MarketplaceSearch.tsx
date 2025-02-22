
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, X, Sparkle, TrendingUp, Clock, History, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { cn } from "@/lib/utils";

const recentSearches = [
  "Gaming Chair",
  "RTX 4090",
  "Mechanical Keyboard",
  "Gaming Mouse",
  "Gaming Monitor"
];

const suggestedSearches = [
  { text: "Gaming Laptop", trend: "+15%" },
  { text: "RGB Mousepad", trend: "+32%" },
  { text: "Gaming Headset", trend: "+28%" },
  { text: "Stream Deck", trend: "+45%" }
];

const popularCategories = [
  { name: "PC Components", count: 1245, icon: "🖥️" },
  { name: "Gaming Chairs", count: 856, icon: "💺" },
  { name: "Peripherals", count: 2341, icon: "🖱️" },
  { name: "Monitors", count: 967, icon: "🖥️" },
  { name: "Accessories", count: 1532, icon: "🎮" }
];

const MarketplaceSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showTrending, setShowTrending] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTrending(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Search Header */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white border-b transition-all duration-300",
        isFocused ? "border-blue-500" : "border-gray-200"
      )}>
        <form onSubmit={handleSearch} className="flex items-center gap-2 p-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="relative flex-1">
            <Search className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300",
              isFocused ? "text-blue-500" : "text-gray-400"
            )} />
            <Input
              type="search"
              placeholder="Search marketplace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={cn(
                "pl-10 pr-10 h-10 transition-all duration-300",
                isFocused ? "bg-white ring-2 ring-blue-100" : "bg-gray-50"
              )}
              autoFocus
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-gray-200"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Search Content */}
      <div className="pt-16 pb-20">
        {!hasSearched ? (
          <div className="p-4 space-y-6">
            {/* Recent Searches */}
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-gray-500" />
                  <h2 className="text-sm font-medium text-gray-900">Recent Searches</h2>
                </div>
                <button className="text-xs text-blue-600 font-medium">Clear All</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-900 animate-scale-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => {
                      setSearchQuery(search);
                      setHasSearched(true);
                    }}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Trending Searches */}
            {showTrending && (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <h2 className="text-sm font-medium text-gray-900">Trending Now</h2>
                </div>
                <div className="space-y-2">
                  {suggestedSearches.map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors animate-scale-in"
                      style={{ animationDelay: `${(index + recentSearches.length) * 50}ms` }}
                      onClick={() => {
                        setSearchQuery(item.text);
                        setHasSearched(true);
                      }}
                    >
                      <span className="text-sm text-gray-900">{item.text}</span>
                      <span className="text-xs text-green-600 font-medium">{item.trend}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Categories */}
            <div className="space-y-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-2">
                <Sparkle className="w-4 h-4 text-gray-500" />
                <h2 className="text-sm font-medium text-gray-900">Popular Categories</h2>
              </div>
              <div className="space-y-2">
                {popularCategories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors animate-scale-in"
                    style={{ animationDelay: `${(index + recentSearches.length + suggestedSearches.length) * 50}ms` }}
                    onClick={() => {
                      setSearchQuery(category.name);
                      setHasSearched(true);
                    }}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="flex-1 text-sm text-gray-900">{category.name}</span>
                    <span className="text-xs text-gray-500">{category.count.toLocaleString()} items</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 animate-fade-in">
            <h2 className="text-sm font-medium text-gray-500 mb-4">
              Search results for "{searchQuery}"
            </h2>
            <ProductGrid />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceSearch;
