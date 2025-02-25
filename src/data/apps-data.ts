import {
  Trophy,
  Swords,
  Store,
  GamepadIcon,
  ShoppingCart,
  MessagesSquare,
  Wallet,
  Users,
  Settings,
  LayoutGrid
} from "lucide-react";
import { type App } from "@/components/apps/types";

export const appsData: App[] = [
  {
    name: "Tournaments",
    description: "Browse and join gaming tournaments",
    category: "Gaming",
    route: "/tournaments",
    color: "bg-purple-500",
    icon: Trophy,
    rating: 4.8,
    users: "10K+"
  },
  {
    name: "Matches",
    description: "View ongoing and upcoming matches",
    category: "Gaming",
    route: "/matches",
    color: "bg-blue-500",
    icon: Swords,
    rating: 4.5,
    updates: 3
  },
  {
    name: "Marketplace",
    description: "Buy and sell gaming items",
    category: "Shopping",
    route: "/marketplace",
    color: "bg-green-500",
    icon: Store,
    rating: 4.9,
    users: "50K+"
  },
  {
    name: "Games",
    description: "Play various online games",
    category: "Gaming",
    route: "/games",
    color: "bg-red-500",
    icon: GamepadIcon,
    rating: 4.7
  },
  {
    name: "Cart",
    description: "View your shopping cart",
    category: "Shopping",
    route: "/cart",
    color: "bg-orange-500",
    icon: ShoppingCart,
    lastUsed: "2 hours ago"
  },
  {
    name: "Chat",
    description: "Connect with other gamers",
    category: "Social",
    route: "/chat",
    color: "bg-indigo-500",
    icon: MessagesSquare,
    updates: 5
  },
  {
    name: "Wallet",
    description: "Manage your gaming wallet",
    category: "Finance",
    route: "/wallet",
    color: "bg-emerald-500",
    icon: Wallet
  },
  {
    name: "Community",
    description: "Join gaming communities",
    category: "Social",
    route: "/community",
    color: "bg-pink-500",
    icon: Users,
    users: "100K+"
  },
  {
    name: "Settings",
    description: "Customize your experience",
    category: "System",
    route: "/settings",
    color: "bg-gray-500",
    icon: Settings
  },
  {
    name: "Dashboard",
    description: "View your gaming statistics",
    category: "System",
    route: "/dashboard",
    color: "bg-cyan-500",
    icon: LayoutGrid,
    lastUsed: "Just now"
  }
];
