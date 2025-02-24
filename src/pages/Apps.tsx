
import { Grid2X2, ShoppingCart, ActivitySquare, Gamepad2, Trophy, CreditCard, Users, Gift, Settings, Mail, Bell, Clock, Star, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { AppsHeader } from "@/components/apps/AppsHeader";
import { BannerSlider } from "@/components/BannerSlider";
import { FavoritesSection } from "@/components/apps/FavoritesSection";
import { AppGrid } from "@/components/apps/AppGrid";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { CategoryTabs } from "@/components/apps/CategoryTabs";
import { AppControls } from "@/components/apps/AppControls";
import { App, Category } from "@/components/apps/types";

const apps: App[] = [
  {
    name: "Shop",
    description: "Browse and buy products",
    icon: Store,
    route: "/marketplace",
    color: "bg-emerald-500",
    category: "Shopping",
    status: "popular",
    users: "20.1K+"
  },
  {
    name: "Games",
    description: "Play your favorite games",
    icon: Gamepad2,
    route: "/games-pages",
    color: "bg-violet-500",
    category: "Entertainment",
    status: "popular",
    users: "12.5K+"
  },
  {
    name: "Activity",
    description: "Track your gaming stats",
    icon: ActivitySquare,
    route: "/activity",
    color: "bg-rose-500",
    category: "Analytics",
    users: "8.2K+"
  },
  {
    name: "Social",
    description: "Connect with friends",
    icon: Users,
    route: "/social",
    color: "bg-pink-500",
    category: "Social",
    status: "new",
    users: "15.3K+"
  },
  {
    name: "Payments",
    description: "Manage transactions",
    icon: CreditCard,
    route: "/payments",
    color: "bg-indigo-500",
    category: "Finance",
    users: "9.1K+"
  },
  {
    name: "Rewards",
    description: "Claim your rewards",
    icon: Gift,
    route: "/rewards",
    color: "bg-orange-500",
    category: "Rewards",
    status: "popular",
    users: "11.2K+"
  },
  {
    name: "Messages",
    description: "Chat with others",
    icon: Mail,
    route: "/messages",
    color: "bg-teal-500",
    category: "Communication",
    users: "7.6K+"
  },
  {
    name: "Notifications",
    description: "Stay updated",
    icon: Bell,
    route: "/notifications",
    color: "bg-cyan-500",
    category: "Updates",
    status: "new",
    users: "6.8K+"
  },
  {
    name: "Settings",
    description: "Customize your experience",
    icon: Settings,
    route: "/settings",
    color: "bg-gray-600",
    category: "System",
    users: "4.9K+"
  }
];

const categories: Category[] = [
  { id: "all", label: "All Apps", icon: Grid2X2 },
  { id: "shopping", label: "Shopping", icon: ShoppingCart },
  { id: "recent", label: "Recent", icon: Clock },
  { id: "popular", label: "Popular", icon: Star }
];

export default function Apps() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteApps");
    return saved ? JSON.parse(saved) : [];
  });

  const filteredApps = apps.filter(app => {
    if (activeTab === "favorites") return favorites.includes(app.name);
    if (activeTab === "popular") return app.status === "popular";
    if (activeTab === "recent") return app.status === "new";
    if (activeTab === "shopping") return app.category === "Shopping";
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
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      <AppsHeader onOpenSearch={() => setIsSearchOpen(true)} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <BannerSlider />
          
          <div className="max-w-7xl mx-auto px-4">
            <div className="py-8">
              <FavoritesSection favoriteApps={favoriteApps} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <CategoryTabs categories={categories} />
                  </Tabs>
                </div>

                <div className="flex-shrink-0">
                  <AppControls
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
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
