import { Grid2X2, Wallet, ShoppingCart, ActivitySquare, Gamepad2, Trophy, CreditCard, Users, Gift, Settings, Mail, Bell, Search, Clock, Star, Sparkles, Filter, TrendingUp, Zap, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppsHeader } from "@/components/apps/AppsHeader";

const apps = [
  {
    name: "Marketplace",
    description: "Buy and sell gaming gear",
    icon: ShoppingCart,
    route: "/marketplace",
    color: "bg-blue-500",
    category: "Shopping",
    status: "popular",
    users: "10K+",
    lastUsed: "2 hours ago",
    rating: 4.8,
    updates: 2
  },
  {
    name: "Wallet",
    description: "Manage your balance",
    icon: Wallet,
    route: "/wallet",
    color: "bg-emerald-500",
    category: "Finance",
    status: "new",
    users: "5K+",
    lastUsed: "1 day ago",
    rating: 4.5,
    updates: 1
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

const categories = [
  { id: "all", label: "All Apps", icon: Grid2X2, count: apps.length },
  { id: "recent", label: "Recent", icon: Clock, count: apps.filter(app => app.status === "new").length },
  { id: "popular", label: "Popular", icon: TrendingUp, count: apps.filter(app => app.status === "popular").length },
  { id: "favorites", label: "Favorites", icon: Star }
];

const quickActions = [
  { 
    name: "New Tournament", 
    icon: Trophy, 
    color: "bg-amber-500",
    description: "Join competitive matches"
  },
  { 
    name: "Quick Play", 
    icon: Gamepad2, 
    color: "bg-violet-500",
    description: "Start gaming instantly"
  },
  { 
    name: "Daily Rewards", 
    icon: Gift, 
    color: "bg-pink-500",
    description: "Claim your rewards"
  },
  { 
    name: "Premium", 
    icon: Crown, 
    color: "bg-yellow-500",
    description: "Upgrade your account"
  }
];

const AppCard = ({ app, isFavorite, onToggleFavorite }) => (
  <Button
    variant="ghost"
    className="relative flex flex-col items-center gap-2 p-4 h-auto hover:bg-gray-50 w-full group"
  >
    <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300`}>
      <app.icon className="w-7 h-7 text-white" />
      {app.updates > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-[10px] h-5">
          {app.updates} NEW
        </Badge>
      )}
    </div>
    <div className="text-center w-full">
      <div className="flex items-center justify-center gap-1 mb-1">
        <span className="text-sm font-medium text-gray-700">{app.name}</span>
        {app.rating && (
          <div className="flex items-center gap-1 text-xs text-yellow-500">
            <Star className="w-3 h-3 fill-yellow-400" />
            {app.rating}
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 mb-2">{app.description}</p>
      {app.lastUsed && (
        <div className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
          <Clock className="w-3 h-3" />
          {app.lastUsed}
        </div>
      )}
    </div>
    <div className="absolute top-2 right-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-full hover:bg-gray-200"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(app.name);
        }}
      >
        <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
      </Button>
    </div>
    {app.users && (
      <Badge variant="secondary" className="absolute bottom-2 right-2 text-[10px]">
        {app.users} users
      </Badge>
    )}
  </Button>
);

export default function Apps() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteApps");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpdatesOnly, setShowUpdatesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem("favoriteApps", JSON.stringify(favorites));
  }, [favorites]);

  const filteredApps = apps.filter(app => {
    if (showUpdatesOnly) return app.updates > 0;
    if (activeTab === "favorites") return favorites.includes(app.name);
    if (activeTab === "popular") return app.status === "popular";
    if (activeTab === "recent") return app.status === "new";
    return true;
  });

  const handleToggleFavorite = (appName: string) => {
    setFavorites(prev => 
      prev.includes(appName) 
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };

  return (
    <>
      <AppsHeader />
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />

      <ScrollArea className="h-[calc(100vh-3.5rem)]">
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
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`rounded-xl transition-colors ${showUpdatesOnly ? 'bg-amber-100 text-amber-600' : 'hover:bg-gray-100'}`}
                      onClick={() => setShowUpdatesOnly(!showUpdatesOnly)}
                    >
                      <Zap className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                      <Filter className="w-5 h-5 text-gray-500" />
                    </Button>
                  </div>
                </div>

                <div className="relative max-w-2xl mx-auto mb-8">
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search apps, categories, or features..."
                      className="w-full pl-10 pr-4 h-11 bg-white/80 backdrop-blur-xl border-gray-200 rounded-xl cursor-pointer group-hover:border-gray-300 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {quickActions.map((action) => (
                    <Button
                      key={action.name}
                      variant="ghost"
                      className="flex flex-col items-center gap-3 p-4 h-auto hover:bg-gray-50 group"
                    >
                      <div className={`${action.color} p-3 rounded-xl group-hover:scale-105 transition-transform duration-300`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-medium text-gray-700">{action.name}</span>
                        <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>

                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                  <TabsList className="grid grid-cols-4 gap-4 bg-transparent h-auto p-0">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="flex flex-col items-center gap-2 p-3 data-[state=active]:bg-white rounded-xl border border-transparent data-[state=active]:border-gray-200 relative"
                      >
                        <category.icon className="w-5 h-5" />
                        <span className="text-xs">{category.label}</span>
                        {category.count && (
                          <Badge 
                            variant="secondary" 
                            className="absolute -top-1 -right-1 text-[10px] h-5"
                          >
                            {category.count}
                          </Badge>
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredApps.map((app) => (
                    <Card key={app.name} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <AppCard
                        app={app}
                        isFavorite={favorites.includes(app.name)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
