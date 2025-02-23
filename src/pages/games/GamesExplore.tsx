
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, Bell, Trophy, Gamepad, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GamesBottomNav } from "@/components/games/GamesBottomNav";
import { GameSearchOverlay } from "@/components/search/GameSearchOverlay";

const categories = [
  {
    id: "action",
    name: "Action Games",
    description: "Fast-paced action and adventure",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    gamesCount: 124,
    color: "from-orange-500 to-red-600"
  },
  {
    id: "strategy",
    name: "Strategy",
    description: "Plan, build, and conquer",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948",
    gamesCount: 89,
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "puzzle",
    name: "Puzzle",
    description: "Challenge your mind",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf",
    gamesCount: 56,
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "sports",
    name: "Sports",
    description: "Competitive sports games",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    gamesCount: 78,
    color: "from-green-500 to-emerald-600"
  }
];

const featuredContests = [
  {
    id: "summer-championship",
    title: "Summer Championship 2024",
    prize: "$50,000",
    participants: "2.5k",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    status: "Live",
    game: "Battle Royale"
  },
  {
    id: "puzzle-masters",
    title: "Puzzle Masters Tournament",
    prize: "$10,000",
    participants: "1.2k",
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387",
    status: "Registering",
    game: "Mind Games"
  }
];

const trendingGames = [
  {
    id: "chess-masters",
    name: "Chess Masters",
    players: "15k",
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793",
    rating: 4.8
  },
  {
    id: "space-warriors",
    name: "Space Warriors",
    players: "8k",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740b3a350",
    rating: 4.6
  },
  {
    id: "racing-legends",
    name: "Racing Legends",
    players: "12k",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601",
    rating: 4.7
  }
];

export default function GamesExplore() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications] = useState(3);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
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
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search games & contests"
              className="w-full pl-10 bg-muted border-none"
              value=""
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

        {/* Category Tabs */}
        <ScrollArea className="w-full pb-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="inline-flex h-9 items-center justify-start gap-2 rounded-lg bg-transparent p-1 text-muted-foreground">
              <TabsTrigger 
                value="all"
                className="rounded-md px-3 py-1 text-sm font-medium transition-colors hover:bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All Games
              </TabsTrigger>
              <TabsTrigger 
                value="popular"
                className="rounded-md px-3 py-1 text-sm font-medium transition-colors hover:bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Popular
              </TabsTrigger>
              <TabsTrigger 
                value="new"
                className="rounded-md px-3 py-1 text-sm font-medium transition-colors hover:bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                New
              </TabsTrigger>
              <TabsTrigger 
                value="recommended"
                className="rounded-md px-3 py-1 text-sm font-medium transition-colors hover:bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                For You
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="pt-4 pb-24 space-y-8">
          {/* Featured Contests */}
          <section className="px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <h2 className="text-xl font-semibold">Featured Contests</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <ScrollArea className="w-full">
              <div className="flex gap-4">
                {featuredContests.map((contest) => (
                  <div key={contest.id} className="flex-none w-[300px]">
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                      <img
                        src={contest.image}
                        alt={contest.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className={`absolute top-3 right-3 ${
                        contest.status === "Live" ? "bg-red-500" : "bg-green-500"
                      }`}>
                        {contest.status}
                      </Badge>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-none text-white">
                            {contest.prize}
                          </Badge>
                          <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-none text-white">
                            {contest.participants} Players
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-white">{contest.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Game Categories */}
          <section className="px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Gamepad className="h-5 w-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Categories</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <Card 
                  key={category.id}
                  className="group relative overflow-hidden hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/games/category/${category.id}`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/80">{category.gamesCount} games</p>
                  </div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform"
                  />
                </Card>
              ))}
            </div>
          </section>

          {/* Trending Games */}
          <section className="px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-red-500"
                  stroke="currentColor"
                >
                  <path
                    d="M2.52 7.11h18.96M2.52 12h18.96M2.52 16.89h18.96"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
                <h2 className="text-xl font-semibold">Trending Now</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <ScrollArea className="w-full">
              <div className="flex gap-4">
                {trendingGames.map((game) => (
                  <Card
                    key={game.id}
                    className="flex-none w-[200px] group hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-square rounded-t-lg overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{game.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-muted-foreground">
                          {game.players} players
                        </span>
                        <div className="flex items-center">
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4 text-yellow-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-1 text-sm font-medium">
                            {game.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        </div>
      </div>

      {/* Bottom Navigation */}
      <GamesBottomNav />

      {/* Search Overlay */}
      <GameSearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
