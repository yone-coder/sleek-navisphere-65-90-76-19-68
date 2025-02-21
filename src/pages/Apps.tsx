
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
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    textColor: "text-white"
  },
  {
    name: "Wallet",
    description: "Manage your balance",
    icon: Wallet,
    route: "/wallet",
    color: "bg-gradient-to-br from-green-500 to-green-600",
    textColor: "text-white"
  },
  {
    name: "Games",
    description: "Play your favorite games",
    icon: Gamepad2,
    route: "/games",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    textColor: "text-white"
  },
  {
    name: "Tournaments",
    description: "Join competitive matches",
    icon: Trophy,
    route: "/tournaments",
    color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    textColor: "text-white"
  },
  {
    name: "Activity",
    description: "Track your gaming stats",
    icon: ActivitySquare,
    route: "/activity",
    color: "bg-gradient-to-br from-red-500 to-red-600",
    textColor: "text-white"
  },
  {
    name: "Social",
    description: "Connect with friends",
    icon: Users,
    route: "/social",
    color: "bg-gradient-to-br from-pink-500 to-pink-600",
    textColor: "text-white"
  },
  {
    name: "Payments",
    description: "Manage transactions",
    icon: CreditCard,
    route: "/payments",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    textColor: "text-white"
  },
  {
    name: "Rewards",
    description: "Claim your rewards",
    icon: Gift,
    route: "/rewards",
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    textColor: "text-white"
  },
  {
    name: "Messages",
    description: "Chat with others",
    icon: Mail,
    route: "/messages",
    color: "bg-gradient-to-br from-teal-500 to-teal-600",
    textColor: "text-white"
  },
  {
    name: "Notifications",
    description: "Stay updated",
    icon: Bell,
    route: "/notifications",
    color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    textColor: "text-white"
  },
  {
    name: "Settings",
    description: "Customize your experience",
    icon: Settings,
    route: "/settings",
    color: "bg-gradient-to-br from-gray-600 to-gray-700",
    textColor: "text-white"
  }
];

export default function Apps() {
  const navigate = useNavigate();

  return (
    <ScrollArea className="h-screen">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-24 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-blue-100">
              <Grid2X2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Apps</h1>
              <p className="text-sm text-gray-500">Access all your gaming tools and services</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {apps.map((app) => (
              <Card
                key={app.name}
                className={`group relative overflow-hidden border-0 ${app.color} hover:shadow-2xl hover:scale-[1.02] transition-all duration-300`}
              >
                <Button
                  variant="ghost"
                  className="w-full h-full p-6 flex flex-col items-center justify-center gap-4 text-white hover:bg-transparent"
                  onClick={() => navigate(app.route)}
                >
                  <div className="relative z-10">
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                      <app.icon className="w-6 h-6" />
                    </div>
                    <h2 className="font-semibold mb-1">{app.name}</h2>
                    <p className="text-xs opacity-80">{app.description}</p>
                  </div>
                </Button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
