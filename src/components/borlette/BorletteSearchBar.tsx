
import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BorletteSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function BorletteSearchBar({ searchQuery, setSearchQuery }: BorletteSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [recentSearches] = useState(['florida midday', 'new york evening', '123', 'texas']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add search handling logic here
      console.log("Searching for:", searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    // Delay to allow clicks on suggestions
    setTimeout(() => setIsExpanded(false), 150);
  };

  const handleRecentSearch = (term: string) => {
    setSearchQuery(term);
    setIsExpanded(false);
  };

  return (
    <div className="relative flex-1">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            type="search"
            placeholder="Search lotteries, states, numbers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full pl-9 pr-9 h-9 bg-gray-50/50 border-0 rounded-full focus:bg-white transition-colors shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={handleClear}
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        {searchQuery && (
          <Button 
            type="submit" 
            size="icon" 
            className="h-9 w-9 ml-1.5 rounded-full"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </form>

      {/* Recent searches dropdown */}
      {isExpanded && recentSearches.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-white rounded-lg shadow-lg border border-gray-100 z-20">
          <div className="text-xs font-medium text-gray-500 mb-2 px-2">Recent Searches</div>
          <div className="space-y-1">
            {recentSearches.map((term, i) => (
              <div 
                key={i}
                className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-md cursor-pointer"
                onClick={() => handleRecentSearch(term)}
              >
                <Search className="w-3 h-3 text-gray-400" />
                <span className="text-sm">{term}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
