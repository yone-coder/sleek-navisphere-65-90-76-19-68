import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Search, Bell, Star, 
  ArrowRight, MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { GameSearchOverlay } from "@/components/search/GameSearchOverlay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  icon?: string;
  category: string[];
  rating: number;
  downloads: string;
  size?: string;
  hasAds?: boolean;
  inAppPurchases?: boolean;
  route?: string;
}

const sponsoredGames: Game[] = [
  {
    id: "candy-crush",
    title: "Candy Crush Soda Saga",
    description: "Match candies in this tasty puzzle adventure",
    icon: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    category: ["Casual", "Puzzle"],
    rating: 4.5,
    downloads: "1B+",
    size: "98MB",
    hasAds: true,
    inAppPurchases: true
  },
  {
    id: "royal-match",
    title: "Royal Match",
    description: "Match-3 puzzle with royal twists",
    icon: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    category: ["Casual", "Puzzle"],
    rating: 4.7,
    downloads: "100M+",
    size: "156MB",
    hasAds: true,
    inAppPurchases: true
  },
  {
    id: "duolingo",
    title: "Duolingo: Language Lessons",
    description: "Learn languages for free",
    icon: "https://images.unsplash.com/photo-1661875576025-0e5d61dec14f",
    category: ["Education", "Language"],
    rating: 4.7,
    downloads: "500M+",
    size: "45MB",
    hasAds: true,
    inAppPurchases: true
  }
];

const categories = [
  "For you",
  "Top charts",
  "Children",
  "Premium",
  "New",
  "Action",
  "Adventure",
  "Arcade",
  "Board",
  "Card",
  "Casino",
  "Casual",
  "Educational",
  "Music",
  "Puzzle",
  "Racing",
  "Role Playing",
  "Simulation",
  "Sports",
  "Strategy",
  "Trivia",
  "Word"
];

export default function GamesPages() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("For you");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
    );
  };

  const SponsoredSection = () => (
    <div className="mb-8 bg-gray-900 py-6">
      <div className="px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              Sponsored <span className="text-gray-400">•</span> Suggested for you
            </h2>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {sponsoredGames.map((game) => (
              <div 
                key={game.id}
                className="flex-none w-[120px] cursor-pointer"
                onClick={() => game.route && navigate(game.route)}
              >
                <div className="relative mb-2">
                  <img
                    src={game.icon}
                    alt={game.title}
                    className="w-[120px] h-[120px] rounded-[24px] object-cover"
                  />
                </div>
                <h3 className="text-white text-sm font-medium truncate mb-1">
                  {game.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <span>{game.rating}</span>
                  <Star className="w-3 h-3 fill-gray-400 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );

  const CategorySection = ({ title, games }: { title: string, games: Game[] }) => (
    <div className="mb-8">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-xl font-medium text-gray-900">{title}</h2>
        <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
          More <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      <ScrollArea className="w-full" type="scroll">
        <div className="flex px-4 gap-4 pb-4">
          {games.map(game => (
            <div key={game.id} className="flex-none w-[280px]">
              <div 
                className="relative aspect-video rounded-xl overflow-hidden mb-3 cursor-pointer"
                onClick={() => game.route && navigate(game.route)}
              >
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3">
                <img
                  src={game.icon}
                  alt={`${game.title} icon`}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{game.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{game.category[0]}</span>
                    <span>•</span>
                    <span>{game.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderRating(game.rating)}
                    <span className="text-xs text-gray-500">({game.downloads})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for games"
              className="w-full pl-10 bg-gray-50 border-none"
              value={searchQuery}
              onClick={() => setIsSearchOpen(true)}
              readOnly
            />
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-8 w-8"
          >
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge 
                className="absolute -right-0.5 -top-0.5 h-4 w-4 items-center justify-center rounded-full bg-red-500 p-0.5 text-[10px] font-medium text-white border-2 border-white"
              >
                {notifications}
              </Badge>
            )}
          </Button>
        </div>

        <ScrollArea className="w-full" type="scroll">
          <div className="px-4 pb-3">
            <Tabs 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="h-9 bg-transparent p-0 w-auto">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="px-4 h-9 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="pt-4 pb-24">
        <SponsoredSection />
        <CategorySection title="Popular Sports Games" games={sponsoredGames} />
        <CategorySection title="Trending Board Games" games={sponsoredGames} />
        <CategorySection title="Suggested For You" games={sponsoredGames} />
        
        <div className="px-4">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Top Free Games</h2>
          <div className="space-y-4">
            {sponsoredGames.map((game, index) => (
              <div 
                key={game.id}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => game.route && navigate(game.route)}
              >
                <span className="text-lg font-medium text-gray-400 w-6">{index + 1}</span>
                <img
                  src={game.icon}
                  alt={`${game.title} icon`}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{game.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{game.category[0]}</span>
                    <span>•</span>
                    <span>{game.downloads}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderRating(game.rating)}
                    <span className="text-xs text-gray-500">{game.size}</span>
                  </div>
                </div>
                <Button className="w-20" size="sm">Install</Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <GameSearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
