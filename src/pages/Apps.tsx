
import { Grid2X2, Wallet, ShoppingCart, ActivitySquare, Gamepad2, Trophy, CreditCard, Users, Gift, Settings, Mail, Bell, Search, Clock, Star, Sparkles, Filter, TrendingUp, Zap, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppsHeader } from "@/components/apps/AppsHeader";
import { BannerSlider } from "@/components/BannerSlider";
import { FavoritesSection } from "@/components/apps/FavoritesSection";
import { QuickActions } from "@/components/apps/QuickActions";
import { AppGrid } from "@/components/apps/AppGrid";

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

export default function Apps() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteApps");
    return saved ? JSON.parse(saved) : [];
  });
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

  const favoriteApps = apps.filter(app => favorites.includes(app.name));

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex-none">
        <AppsHeader onOpenSearch={() => setIsSearchOpen(true)} />
      </div>
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="bg-gradient-to-b from-gray-50 to-white min-h-full">
            <div className="relative">
              <BannerSlider />
              <div className="relative max-w-7xl mx-auto px-4">
                <div className="py-8">
                  <FavoritesSection favoriteApps={favoriteApps} />

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

                  <QuickActions actions={quickActions} />

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

                  <AppGrid 
                    apps={filteredApps}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
