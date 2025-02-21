import { Grid2X2, Wallet, ShoppingCart, ActivitySquare, Gamepad2, Trophy, CreditCard, Users, Gift, Settings, Mail, Bell, Search, Clock, Star, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SearchOverlay } from "@/components/search/SearchOverlay";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const recentApps = apps.slice(0, 4);
  const featuredApps = apps.slice(4, 7);

  return (
    <>
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={apps}
      />

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
                  <div 
                    className="relative cursor-pointer"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <Input
                      readOnly
                      placeholder="Search apps, categories, or features..."
                      className="w-full pl-10 pr-4 h-11 bg-white/80 backdrop-blur-xl border-gray-200 rounded-xl cursor-pointer"
                    />
                  </div>
                </div>

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
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
