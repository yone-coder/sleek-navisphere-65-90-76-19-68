
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/marketplace/ProductGrid";

const recentSearches = [
  "Gaming Chair",
  "RTX 4090",
  "Mechanical Keyboard",
  "Gaming Mouse",
  "Gaming Monitor"
];

const popularCategories = [
  { name: "PC Components", count: 1245 },
  { name: "Gaming Chairs", count: 856 },
  { name: "Peripherals", count: 2341 },
  { name: "Monitors", count: 967 },
  { name: "Accessories", count: 1532 }
];

const MarketplaceSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

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
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search marketplace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-10 bg-gray-50"
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
        </form>
      </div>

      {/* Search Content */}
      <div className="pt-16 pb-20">
        {!hasSearched ? (
          <div className="p-4 space-y-6">
            {/* Recent Searches */}
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-gray-900">Recent Searches</h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-900"
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

            {/* Popular Categories */}
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-gray-900">Popular Categories</h2>
              <div className="space-y-2">
                {popularCategories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setSearchQuery(category.name);
                      setHasSearched(true);
                    }}
                  >
                    <span className="text-sm text-gray-900">{category.name}</span>
                    <span className="text-xs text-gray-500">{category.count} items</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
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
