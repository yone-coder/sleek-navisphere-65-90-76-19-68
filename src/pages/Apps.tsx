
import { Grid2X2, ShoppingCart, ActivitySquare, Gamepad2, Trophy, CreditCard, Users, Gift, Settings, Mail, Bell, Clock, Star, Store, BookOpen, Wallet, PiggyBank, Briefcase, Search, Ticket, Calendar, Bitcoin, Globe, Heart, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import { AppsHeader } from "@/components/apps/AppsHeader";
import { BannerSlider } from "@/components/BannerSlider";
import { FavoritesSection } from "@/components/apps/FavoritesSection";
import { AppGrid } from "@/components/apps/AppGrid";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CategoryTabs } from "@/components/apps/CategoryTabs";
import { AppControls } from "@/components/apps/AppControls";
import { App, Category } from "@/components/apps/types";
import { SuggestionsSection } from "@/components/apps/SuggestionsSection";

const apps: App[] = [
  {
    name: "Games",
    description: "Play your favorite games",
    icon: Gamepad2,
    route: "/games-pages",
    color: "bg-violet-500",
    category: "Entertainment",
    status: "popular",
    users: "12.5K+",
    lastUsed: "5 mins ago",
    rating: 4.8,
    updates: 2
  },
  {
    name: "Activity",
    description: "Track your gaming stats",
    icon: ActivitySquare,
    route: "/activity",
    color: "bg-rose-500",
    category: "Analytics",
    users: "8.2K+",
    rating: 4.6
  },
  {
    name: "Social",
    description: "Connect with friends",
    icon: Users,
    route: "/social",
    color: "bg-pink-500",
    category: "Social",
    status: "new",
    users: "15.3K+",
    lastUsed: "2 hours ago",
    rating: 4.7,
    updates: 1
  },
  {
    name: "Payments",
    description: "Manage transactions",
    icon: CreditCard,
    route: "/payments",
    color: "bg-indigo-500",
    category: "Finance",
    users: "9.1K+",
    rating: 4.9
  },
  {
    name: "Rewards",
    description: "Claim your rewards",
    icon: Gift,
    route: "/rewards",
    color: "bg-orange-500",
    category: "Rewards",
    status: "popular",
    users: "11.2K+",
    lastUsed: "1 hour ago",
    rating: 4.8
  },
  {
    name: "Messages",
    description: "Chat with others",
    icon: Mail,
    route: "/messages",
    color: "bg-teal-500",
    category: "Communication",
    users: "7.6K+",
    rating: 4.5
  },
  {
    name: "Notifications",
    description: "Stay updated",
    icon: Bell,
    route: "/notifications",
    color: "bg-cyan-500",
    category: "Updates",
    status: "new",
    users: "6.8K+",
    lastUsed: "30 mins ago",
    rating: 4.6,
    updates: 3
  },
  {
    name: "Settings",
    description: "Customize your experience",
    icon: Settings,
    route: "/settings",
    color: "bg-gray-600",
    category: "System",
    users: "4.9K+",
    rating: 4.4
  }
];

const categories: Category[] = [
  { id: "all", label: "All Apps", icon: Grid2X2, count: apps.length },
  { id: "recent", label: "Recent", icon: Clock, count: apps.filter(app => app.status === "new").length },
  { id: "popular", label: "Popular", icon: Star, count: apps.filter(app => app.status === "popular").length },
  { id: "favorites", label: "Favorites", icon: Star }
];

const appCategories = [
  "All",
  "Entertainment",
  "Gaming",
  "Analytics",
  "Social",
  "Finance",
  "Rewards",
  "Communication",
  "Updates",
  "System"
];

export default function Apps() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "users">("name");
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
    if (selectedCategory !== "All") return app.category === selectedCategory;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "users":
        return (b.users?.replace("K+", "000") || "0").localeCompare(a.users?.replace("K+", "000") || "0");
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleToggleFavorite = (appName: string) => {
    setFavorites(prev => 
      prev.includes(appName) 
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };

  const favoriteApps = apps.filter(app => favorites.includes(app.name));
  const updatesCount = apps.filter(app => app.updates > 0).length;
  
  const suggestedApps = apps
    .filter(app => app.rating && app.rating >= 4.8)
    .slice(0, 8);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      <AppsHeader onOpenSearch={() => setIsSearchOpen(true)} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <BannerSlider />
          
          <div className="max-w-7xl mx-auto px-4">
            <div className="py-8">
              <FavoritesSection favoriteApps={favoriteApps} />
              
              <SuggestionsSection suggestedApps={suggestedApps} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <CategoryTabs categories={categories} />
                  </Tabs>
                </div>

                <div className="flex-shrink-0">
                  <AppControls
                    selectedCategory={selectedCategory}
                    viewMode={viewMode}
                    showUpdatesOnly={showUpdatesOnly}
                    updatesCount={updatesCount}
                    categories={appCategories}
                    onCategoryChange={setSelectedCategory}
                    onSortChange={setSortBy}
                    onViewModeChange={setViewMode}
                    onUpdatesToggle={() => setShowUpdatesOnly(!showUpdatesOnly)}
                  />
                </div>
              </div>

              <AppGrid 
                apps={filteredApps}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                viewMode={viewMode}
              />
            </div>
          </div>
        </div>
      </div>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />
    </div>
  );
}
