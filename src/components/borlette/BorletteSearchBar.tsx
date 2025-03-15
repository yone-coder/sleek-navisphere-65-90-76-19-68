
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface BorletteSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function BorletteSearchBar({ searchQuery, setSearchQuery }: BorletteSearchBarProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input 
        type="search"
        placeholder="Search lotteries, states, numbers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-9 pr-3 h-9 bg-gray-50/50 border-0 rounded-full focus:bg-white transition-colors shadow-sm"
      />
    </div>
  );
}
