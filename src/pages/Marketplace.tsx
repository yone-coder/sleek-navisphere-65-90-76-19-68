
import { useState } from 'react';
import { Search, MapPin, Grid, ListFilter, Menu, Bell, Heart } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from 'react-router-dom';

const locations = [
  { id: 1, name: "New York, USA", code: "NYC" },
  { id: 2, name: "London, UK", code: "LON" },
  { id: 3, name: "Paris, France", code: "PAR" },
  { id: 4, name: "Tokyo, Japan", code: "TYO" },
  { id: 5, name: "Sydney, Australia", code: "SYD" },
];

const Marketplace = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('browse');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with location selector and search */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center gap-4">
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
        </div>
      </header>

      {/* Main content */}
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Placeholder content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Skeleton className="w-full h-48 rounded-md mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Marketplace-specific bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200">
        <div className="max-w-md mx-auto px-4">
          <ul className="flex items-center justify-between h-16">
            <li>
              <Link
                to="/marketplace"
                className={`flex flex-col items-center gap-1 ${
                  activeTab === 'browse' ? 'text-primary' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('browse')}
              >
                <Grid className="h-5 w-5" />
                <span className="text-xs">Browse</span>
              </Link>
            </li>
            <li>
              <button
                className={`flex flex-col items-center gap-1 ${
                  activeTab === 'filter' ? 'text-primary' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('filter')}
              >
                <ListFilter className="h-5 w-5" />
                <span className="text-xs">Filter</span>
              </button>
            </li>
            <li>
              <button
                className={`flex flex-col items-center gap-1 ${
                  activeTab === 'notifications' ? 'text-primary' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="h-5 w-5" />
                <span className="text-xs">Alerts</span>
              </button>
            </li>
            <li>
              <button
                className={`flex flex-col items-center gap-1 ${
                  activeTab === 'saved' ? 'text-primary' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('saved')}
              >
                <Heart className="h-5 w-5" />
                <span className="text-xs">Saved</span>
              </button>
            </li>
            <li>
              <button
                className={`flex flex-col items-center gap-1 ${
                  activeTab === 'menu' ? 'text-primary' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('menu')}
              >
                <Menu className="h-5 w-5" />
                <span className="text-xs">Menu</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Marketplace;
