
import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SellersList } from "@/components/marketplace/SellersList";

const locations = [
  { id: 1, name: "New York, USA", code: "NYC" },
  { id: 2, name: "London, UK", code: "LON" },
  { id: 3, name: "Paris, France", code: "PAR" },
  { id: 4, name: "Tokyo, Japan", code: "TYO" },
  { id: 5, name: "Sydney, Australia", code: "SYD" },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'home', label: 'Home' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'sports', label: 'Sports' },
  { id: 'beauty', label: 'Beauty' },
];

const Marketplace = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
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
        </div>

        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Tabs 
              defaultValue="all" 
              className="w-full"
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <TabsList className="h-10 w-full justify-start gap-1.5 bg-transparent p-0 overflow-x-auto no-scrollbar">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="h-7 px-3 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      <main className="pt-28">
        <SellersList />
      </main>
    </div>
  );
};

export default Marketplace;
