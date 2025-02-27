
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="px-4 py-2">
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input 
          type="search"
          placeholder="Search updates, comments, or FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-3 h-9 bg-gray-50/50 border-0 focus:bg-white transition-colors text-sm"
        />
      </div>
    </div>
  );
}
