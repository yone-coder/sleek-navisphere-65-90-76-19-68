
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ExploreSearchBarProps {
  onSearchOpen: () => void;
}

export function ExploreSearchBar({ onSearchOpen }: ExploreSearchBarProps) {
  return (
    <div 
      className="relative mb-4 mx-1"
      onClick={onSearchOpen}
    >
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input 
        className="pl-10 bg-gray-50 border-gray-200" 
        placeholder="Search apps..." 
        readOnly 
      />
      <Button 
        variant="ghost" 
        size="sm" 
        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7"
      >
        <Filter className="h-4 w-4 mr-1" />
        <span className="text-xs">Filters</span>
      </Button>
    </div>
  );
}
