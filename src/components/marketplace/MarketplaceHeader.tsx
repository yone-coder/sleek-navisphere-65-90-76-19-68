
import { Search, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Location {
  id: number;
  name: string;
  code: string;
}

interface MarketplaceHeaderProps {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const locations = [
  { id: 1, name: "New York, USA", code: "NYC" },
  { id: 2, name: "London, UK", code: "LON" },
  { id: 3, name: "Paris, France", code: "PAR" },
  { id: 4, name: "Tokyo, Japan", code: "TYO" },
  { id: 5, name: "Sydney, Australia", code: "SYD" },
];

export const MarketplaceHeader = ({
  selectedLocation,
  setSelectedLocation,
  searchQuery,
  setSearchQuery,
}: MarketplaceHeaderProps) => {
  return (
    <div className="h-14 flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="h-9 gap-1 border-gray-200"
          >
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium truncate max-w-[100px]">
              {selectedLocation.name}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[280px]">
          {locations.map((location) => (
            <DropdownMenuItem
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{location.name}</span>
              {selectedLocation.id === location.id && (
                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Selected
                </span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search marketplace..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 h-9 bg-gray-50 border-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export { locations };
