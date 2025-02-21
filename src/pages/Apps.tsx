import { Grid2X2, Wallet, ShoppingCart, ActivitySquare, Gamepad2, Trophy, CreditCard, Users, Gift, Settings, Mail, Bell, Search, Clock, Star, Sparkles, History, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";

const apps = [
  {
    name: "Marketplace",
    description: "Buy and sell gaming gear",
    icon: ShoppingCart,
    route: "/marketplace",
    color: "bg-blue-500",
    category: "Shopping"
  },
  {
    name: "Wallet",
    description: "Manage your balance",
    icon: Wallet,
    route: "/wallet",
    color: "bg-emerald-500",
    category: "Finance"
  },
  {
    name: "Games",
    description: "Play your favorite games",
    icon: Gamepad2,
    route: "/games",
    color: "bg-violet-500",
    category: "Entertainment"
  },
  {
    name: "Tournaments",
    description: "Join competitive matches",
    icon: Trophy,
    route: "/tournaments",
    color: "bg-amber-500",
    category: "Gaming"
  },
  {
    name: "Activity",
    description: "Track your gaming stats",
    icon: ActivitySquare,
    route: "/activity",
    color: "bg-rose-500",
    category: "Analytics"
  },
  {
    name: "Social",
    description: "Connect with friends",
    icon: Users,
    route: "/social",
    color: "bg-pink-500",
    category: "Social"
  },
  {
    name: "Payments",
    description: "Manage transactions",
    icon: CreditCard,
    route: "/payments",
    color: "bg-indigo-500",
    category: "Finance"
  },
  {
    name: "Rewards",
    description: "Claim your rewards",
    icon: Gift,
    route: "/rewards",
    color: "bg-orange-500",
    category: "Rewards"
  },
  {
    name: "Messages",
    description: "Chat with others",
    icon: Mail,
    route: "/messages",
    color: "bg-teal-500",
    category: "Communication"
  },
  {
    name: "Notifications",
    description: "Stay updated",
    icon: Bell,
    route: "/notifications",
    color: "bg-cyan-500",
    category: "Updates"
  },
  {
    name: "Settings",
    description: "Customize your experience",
    icon: Settings,
    route: "/settings",
    color: "bg-gray-600",
    category: "System"
  }
];

export default function Apps() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentApps = apps.slice(0, 4);
  const featuredApps = apps.slice(4, 7);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && !searchHistory.includes(query.trim())) {
      const newHistory = [query.trim(), ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const removeSearchItem = (index: number) => {
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const categoryTags = Array.from(new Set(apps.map(app => app.category)));

  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-violet-50" />
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="py-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500">
                    <Grid2X2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                      Apps
                    </h1>
                    <p className="text-sm text-gray-500">Access all your gaming tools and services</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Star className="w-5 h-5 text-amber-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </Button>
                </div>
              </div>

              <div className="relative max-w-2xl mx-auto mb-8">
                <Popover open={isSearchFocused} onOpenChange={setIsSearchFocused}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Search apps, categories, or features..."
                        className="w-full pl-10 pr-4 h-11 bg-white/80 backdrop-blur-xl border-gray-200 rounded-xl"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                          onClick={() => setSearchQuery("")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[calc(100vw-2rem)] max-w-2xl p-4" align="start">
                    <div className="space-y-4">
                      {searchHistory.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">Recent Searches</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-gray-500 h-auto py-1"
                              onClick={clearSearchHistory}
                            >
                              Clear All
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {searchHistory.map((query, index) => (
                              <div
                                key={index}
                                className="group flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-1.5"
                              >
                                <History className="w-3 h-3 text-gray-400" />
                                <button
                                  className="text-sm text-gray-600"
                                  onClick={() => handleSearch(query)}
                                >
                                  {query}
                                </button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => removeSearchItem(index)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-900">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                          {categoryTags.map((category) => (
                            <Button
                              key={category}
                              variant="outline"
                              size="sm"
                              className="h-auto py-1.5 px-3 text-xs"
                              onClick={() => handleSearch(category)}
                            >
                              {category}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {searchQuery && filteredApps.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-gray-900">Quick Results</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {filteredApps.slice(0, 4).map((app) => (
                              <Button
                                key={app.name}
                                variant="ghost"
                                className="flex items-center gap-2 justify-start h-auto py-2"
                                onClick={() => {
                                  navigate(app.route);
                                  setIsSearchFocused(false);
                                }}
                              >
                                <div className={`w-8 h-8 rounded-lg ${app.color} flex items-center justify-center`}>
                                  <app.icon className="w-4 h-4 text-white" />
                                </div>
                                <div className="text-left">
                                  <div className="text-sm font-medium">{app.name}</div>
                                  <div className="text-xs text-gray-500">{app.category}</div>
                                </div>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {!searchQuery && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="p-4 border border-gray-100 rounded-xl bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <h3 className="font-medium text-gray-900">Recent Apps</h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {recentApps.map((app) => (
                        <Button
                          key={`recent-${app.name}`}
                          variant="ghost"
                          className="flex flex-col items-center gap-2 p-2 h-auto hover:bg-gray-50"
                          onClick={() => navigate(app.route)}
                        >
                          <div className={`w-12 h-12 rounded-2xl ${app.color} flex items-center justify-center`}>
                            <app.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs font-medium text-gray-700 text-center">
                            {app.name}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-4 border border-gray-100 rounded-xl bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <h3 className="font-medium text-gray-900">Featured Apps</h3>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {featuredApps.map((app) => (
                        <Button
                          key={`featured-${app.name}`}
                          variant="ghost"
                          className="flex flex-col items-center gap-2 p-2 h-auto hover:bg-gray-50"
                          onClick={() => navigate(app.route)}
                        >
                          <div className={`w-12 h-12 rounded-2xl ${app.color} flex items-center justify-center`}>
                            <app.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs font-medium text-gray-700 text-center">
                            {app.name}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {searchQuery && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800">Search Results</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                    {filteredApps.map((app) => (
                      <Button
                        key={app.name}
                        variant="ghost"
                        className="group flex flex-col items-center gap-3 p-0 h-auto hover:bg-transparent"
                        onClick={() => navigate(app.route)}
                      >
                        <div className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center shadow-lg shadow-black/5 group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                          <app.icon className="w-7 h-7 text-white relative z-10" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center transition-colors">
                          {app.name}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
