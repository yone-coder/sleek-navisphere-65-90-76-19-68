
import { Search, MapPin, Bell, Heart, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

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

const notifications = [
  { id: 1, title: "Flash Sale Starting!", message: "50% off on all gaming accessories", time: "2m ago", isNew: true },
  { id: 2, title: "Order Shipped", message: "Your order #12345 has been shipped", time: "1h ago", isNew: true },
  { id: 3, title: "Price Drop Alert", message: "Items in your wishlist are on sale", time: "3h ago", isNew: false },
];

export const MarketplaceHeader = ({
  selectedLocation,
  setSelectedLocation,
  searchQuery,
  setSearchQuery,
}: MarketplaceHeaderProps) => {
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchClick = () => {
    navigate('/marketplace/search');
  };

  return (
    <div className="relative">
      {/* Main header content */}
      <div className={cn(
        "h-12 flex items-center gap-2 px-3 transition-all duration-300",
        showSearchBar && "opacity-0 pointer-events-none"
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
            >
              <MapPin className="w-4 h-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[240px]">
            <div className="px-2 py-1.5">
              <p className="text-xs text-gray-500">Current location</p>
              <p className="text-sm font-medium">{selectedLocation.name}</p>
            </div>
            {locations.map((location) => (
              <DropdownMenuItem
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className="flex items-center gap-2 cursor-pointer py-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-sm">{location.name}</span>
                {selectedLocation.id === location.id && (
                  <span className="ml-auto text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div 
          className="flex-1"
          onClick={handleSearchClick}
        >
          <div className="relative cursor-pointer">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <div className="w-full h-8 pl-10 pr-3 flex items-center bg-gray-50 rounded-md border border-gray-200">
              <span className="text-sm text-gray-500 truncate">Search products, categories, brands...</span>
            </div>
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative h-8 w-8 border-gray-200">
              <Bell className="h-3.5 w-3.5 text-gray-500" />
              <Badge className="absolute -top-1 -right-1 h-3.5 min-w-3.5 p-0.5 flex items-center justify-center bg-red-500 text-[9px]">
                2
              </Badge>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>Notifications</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-2">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {notification.isNew && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-[9px] px-1.5">New</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{notification.message}</p>
                    <p className="text-[10px] text-gray-400">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200">
          <Heart className="h-3.5 w-3.5 text-gray-500" />
        </Button>
      </div>
    </div>
  );
};

export { locations };
