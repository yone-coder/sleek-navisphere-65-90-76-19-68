import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Search, Bell, Sparkles,
  Gift, Crown, Filter, Command, Settings, 
  Gamepad2, Zap, Puzzle, Star, ArrowRight,
  MoreVertical, Download
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
  DropdownMenuSeparator,
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
  updateInfo?: string;
}

interface GameEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  gameTitle: string;
  gameIcon: string;
  developer: string;
  rating: number;
  endsIn: string;
}

const games: Game[] = [
  {
    id: "chess",
    title: "Chess Master Pro",
    description: "Challenge your mind with the ultimate chess experience",
    thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    icon: "https://images.unsplash.com/photo-1586165368502-1bad197a6461",
    category: ["Board", "Strategy"],
    rating: 4.8,
    downloads: "1M+",
    size: "45MB",
    hasAds: false,
    inAppPurchases: true,
    route: "/games/chess",
    updateInfo: "Major Update"
  },
  {
    id: "morpion",
    title: "Tic Tac Toe",
    description: "Classic three-in-a-row with multiplayer",
    thumbnail: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    icon: "https://images.unsplash.com/photo-1611996575749-79a3a250f948",
    category: ["Casual", "Strategy"],
    rating: 4.5,
    downloads: "500K+",
    size: "28MB",
    hasAds: true,
    inAppPurchases: false,
    route: "/games/morpion",
    updateInfo: "New Event"
  },
  {
    id: "word-puzzle",
    title: "Word Masters",
    description: "Brain-teasing word puzzles",
    thumbnail: "https://images.unsplash.com/photo-1466921583968-f07aa80c526e",
    icon: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3",
    category: ["Word", "Puzzle"],
    rating: 4.3,
    downloads: "100K+",
    size: "32MB",
    hasAds: true,
    inAppPurchases: true
  },
  {
    id: "sports-game",
    title: "Ultimate Football",
    description: "Realistic football simulation",
    thumbnail: "https://images.unsplash.com/photo-1552667466-07770ae110d0",
    icon: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    category: ["Sports", "Simulation"],
    rating: 4.7,
    downloads: "5M+",
    size: "1.2GB",
    hasAds: false,
    inAppPurchases: true
  }
];

const gameEvents: GameEvent[] = [
  {
    id: "valentine-event",
    title: "Roses & Raids: Shadow Knight's Love Potion for Power!",
    description: "Love is in the air, Shadow Knight, but the battle continues! Join our Valentine's special event.",
    image: "https://images.unsplash.com/photo-1581375383680-903f6a661046",
    gameTitle: "Shadow Knight: Ninja",
    gameIcon: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    developer: "Fansipan Limi",
    rating: 4.5,
    endsIn: "3 days"
  },
  {
    id: "winter-event",
    title: "Chess Winter Championship",
    description: "Compete in the seasonal tournament with special winter-themed boards",
    image: "https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b",
    gameTitle: "Chess Master Pro",
    gameIcon: "https://images.unsplash.com/photo-1586165368502-1bad197a6461",
    developer: "Chess Studios",
    rating: 4.8,
    endsIn: "5 days"
  }
];

const sponsoredGames: Game[] = [
  {
    id: "candy-crush",
    title: "Candy Crush Soda Saga",
    description: "Match candies in this tasty puzzle adventure",
    thumbnail: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
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
    thumbnail: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
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
    thumbnail: "https://images.unsplash.com/photo-1661875576025-0e5d61dec14f",
    icon: "https://images.unsplash.com/photo-1661875576025-0e5d61dec14f",
    category: ["Education", "Language"],
    rating: 4.7,
    downloads: "500M+",
    size: "45MB",
    hasAds: true,
    inAppPurchases: true
  }
];

const popularGames: Game[] = [
  {
    id: "free-fire-naruto",
    title: "Free Fire x NARUTO SHIPPUDEN",
    description: "Battle other players around the world in a survival shooter",
    thumbnail: "https://images.unsplash.com/photo-1612404730960-5c71577fca11",
    icon: "https://images.unsplash.com/photo-1612404730960-5c71577fca11",
    category: ["Action", "Shooter"],
    rating: 4.4,
    downloads: "100M+",
    size: "326MB"
  },
  {
    id: "mobile-legends",
    title: "Mobile Legends: Bang Bang",
    description: "Play the 5v5 MOBA game on mobile with players worldwide.",
    thumbnail: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    icon: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e",
    category: ["Strategy", "MOBA"],
    rating: 3.9,
    downloads: "500M+",
    size: "156MB"
  },
  {
    id: "candy-crush",
    title: "Candy Crush Saga",
    description: "Match 3 candies to blast sugar! Spread jam & master the sweetest of puzzle games",
    thumbnail: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    icon: "https://images.unsplash.com/photo-1596450514735-111a2fe02935",
    category: ["Casual", "Puzzle"],
    rating: 4.6,
    downloads: "1B+",
    size: "85MB"
  },
  {
    id: "pubg-mobile",
    title: "PUBG MOBILE: Miramar",
    description: "Battle royale game with intense multiplayer combat",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    category: ["Action", "Shooter"],
    rating: 4.2,
    downloads: "1B+",
    size: "772MB"
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    description: "Run and dodge trains in this endless runner game",
    thumbnail: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf",
    icon: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf",
    category: ["Casual", "Runner"],
    rating: 4.5,
    downloads: "1B+",
    size: "128MB"
  },
  {
    id: "genshin-impact",
    title: "Genshin Impact",
    description: "Open-world action RPG with stunning visuals",
    thumbnail: "https://images.unsplash.com/photo-1624085568108-36410cef3028",
    icon: "https://images.unsplash.com/photo-1624085568108-36410cef3028",
    category: ["RPG", "Adventure"],
    rating: 4.3,
    downloads: "500M+",
    size: "15GB"
  }
];

const categories = [
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

  const EventsSection = () => (
    <div className="mb-8">
      <h2 className="text-2xl font-medium text-gray-900 px-4 mb-4">Events happening now</h2>
      <ScrollArea className="w-full" type="scroll">
        <div className="flex px-4 gap-4 pb-4">
          {gameEvents.map(event => (
            <div key={event.id} className="flex-none w-[340px]">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-black/50 text-white border-none backdrop-blur-sm">
                    Ends in {event.endsIn}
                  </Badge>
                </div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full aspect-[5/3] object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2 mb-2">
                    {event.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <img
                  src={event.gameIcon}
                  alt={event.gameTitle}
                  className="w-12 h-12 rounded-xl"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {event.gameTitle}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="truncate">{event.developer}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <span>{event.rating}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>
                <Button className="h-9" size="sm">Install</Button>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );

  const SponsoredSection = () => (
    <div className="mb-8">
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            Sponsored <span className="text-gray-500">•</span> Suggested for you
          </h2>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="w-full" type="scroll">
          <div className="flex gap-4 pb-4">
            {sponsoredGames.map((game) => (
              <div 
                key={game.id}
                className="flex-none w-[120px]"
              >
                <div className="relative mb-2">
                  <img
                    src={game.icon}
                    alt={game.title}
                    className="w-[120px] h-[120px] rounded-[24px] object-cover"
                  />
                </div>
                <h3 className="text-gray-900 text-sm font-medium truncate mb-1">
                  {game.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-600 text-xs">
                  <span>{game.rating}</span>
                  <Star className="w-3 h-3 fill-gray-600 text-gray-600" />
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );

  const PopularGamesSection = () => (
    <div className="mb-8">
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              Browse popular games
            </h2>
            <p className="text-gray-500">A great place to start</p>
          </div>
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="w-full" type="scroll">
          <div className="flex gap-4 pb-4">
            {popularGames.map((game) => (
              <div 
                key={game.id}
                className="flex-none w-[300px] flex gap-4 items-center"
              >
                <img
                  src={game.icon}
                  alt={game.title}
                  className="w-16 h-16 rounded-2xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-base truncate">
                    {game.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {game.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">{game.rating} ★</span>
                    <span className="text-sm text-gray-600">{game.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
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
        <EventsSection />
        <SponsoredSection />
        <CategorySection title="Popular Sports Games" games={games.filter(g => g.category.includes("Sports"))} />
        <CategorySection title="Trending Board Games" games={games.filter(g => g.category.includes("Board"))} />
        <PopularGamesSection />
        <CategorySection title="Suggested For You" games={games} />
        
        <div className="px-4">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Top Free Games</h2>
          <div className="space-y-4">
            {games.map((game, index) => (
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
