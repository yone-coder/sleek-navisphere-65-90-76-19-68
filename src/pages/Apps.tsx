
import { Grid2X2, Wallet, ShoppingCart, ActivitySquare, Gamepad2, Trophy, CreditCard, Users, Gift, Settings, Mail, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const categories = Array.from(new Set(apps.map(app => app.category)));

export default function Apps() {
  const navigate = useNavigate();

  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-24 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-blue-100/50 backdrop-blur-sm">
                <Grid2X2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Apps</h1>
                <p className="text-sm text-gray-500">Access all your gaming tools and services</p>
              </div>
            </div>
            
            {/* Category sections */}
            {categories.map((category) => (
              <div key={category} className="mb-12">
                <h2 className="text-lg font-semibold text-gray-800 mb-6 pl-1">{category}</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                  {apps
                    .filter(app => app.category === category)
                    .map((app) => (
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
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
