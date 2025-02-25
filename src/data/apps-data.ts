
import {
  ShoppingCart,
  Wallet,
  Play,
  Gamepad2,
  BarChart3,
  Users,
  MessageCircle,
  Settings,
  GraduationCap,
  Briefcase,
  Building2,
  FileText,
  Heart,
  Apple,
  HelpingHand,
  Home
} from "lucide-react";
import type { App } from "@/components/apps/types";

export const apps: App[] = [
  {
    name: "Shopping",
    description: "Browse and buy items",
    icon: ShoppingCart,
    route: "/marketplace",
    color: "bg-blue-500",
    category: "Shopping",
    users: "50K+",
    rating: 4.8
  },
  {
    name: "Finance",
    description: "Manage your finances",
    icon: Wallet,
    route: "/wallet",
    color: "bg-green-500",
    category: "Finance",
    users: "30K+",
    rating: 4.6
  },
  {
    name: "Entertainment",
    description: "Watch videos and more",
    icon: Play,
    route: "/entertainment",
    color: "bg-purple-500",
    category: "Entertainment",
    status: "new",
    rating: 4.5
  },
  {
    name: "Gaming",
    description: "Play and compete",
    icon: Gamepad2,
    route: "/games",
    color: "bg-red-500",
    category: "Gaming",
    status: "popular",
    updates: 2,
    rating: 4.9
  },
  {
    name: "Analytics",
    description: "Track your metrics",
    icon: BarChart3,
    route: "/analytics",
    color: "bg-indigo-500",
    category: "Analytics",
    rating: 4.7
  },
  {
    name: "Social",
    description: "Connect with others",
    icon: Users,
    route: "/social",
    color: "bg-pink-500",
    category: "Social",
    status: "popular",
    rating: 4.8
  }
];
