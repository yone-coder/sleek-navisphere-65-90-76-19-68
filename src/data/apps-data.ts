
import { Grid2X2, BarChart3, MessageCircle, Users, ShoppingCart, Wallet, Play, Settings, GraduationCap, Briefcase, Building2, FileText, Heart, Globe, Gamepad2 } from "lucide-react";
import type { App } from "@/components/apps/types";

export const apps: App[] = [
  {
    name: "Analytics",
    description: "Track and analyze your performance metrics",
    icon: BarChart3,
    route: "/analytics",
    color: "bg-blue-500",
    category: "Analytics",
    rating: 4.8,
    users: "50K+",
    updates: 2
  },
  {
    name: "Messages",
    description: "Stay connected with your team",
    icon: MessageCircle,
    route: "/messages",
    color: "bg-green-500",
    category: "Communication",
    rating: 4.9,
    users: "100K+",
    status: "popular"
  },
  {
    name: "Social",
    description: "Connect with your community",
    icon: Users,
    route: "/social",
    color: "bg-purple-500",
    category: "Social",
    rating: 4.7,
    users: "75K+"
  },
  {
    name: "Shopping",
    description: "Browse and buy products",
    icon: ShoppingCart,
    route: "/marketplace",
    color: "bg-pink-500",
    category: "Shopping",
    rating: 4.6,
    users: "200K+",
    status: "popular"
  },
  {
    name: "Wallet",
    description: "Manage your finances",
    icon: Wallet,
    route: "/wallet",
    color: "bg-yellow-500",
    category: "Finance",
    rating: 4.8,
    users: "40K+",
    updates: 1
  },
  {
    name: "Games",
    description: "Play and compete",
    icon: Gamepad2,
    route: "/games",
    color: "bg-red-500",
    category: "Gaming",
    rating: 4.9,
    users: "150K+",
    status: "popular"
  },
  {
    name: "Media",
    description: "Stream your favorite content",
    icon: Play,
    route: "/media",
    color: "bg-indigo-500",
    category: "Entertainment",
    rating: 4.7,
    users: "90K+"
  },
  {
    name: "Settings",
    description: "Customize your experience",
    icon: Settings,
    route: "/settings",
    color: "bg-gray-500",
    category: "System",
    rating: 4.5,
    users: "25K+"
  },
  {
    name: "Education",
    description: "Learn and grow",
    icon: GraduationCap,
    route: "/education",
    color: "bg-teal-500",
    category: "Education",
    rating: 4.8,
    users: "60K+",
    status: "new"
  },
  {
    name: "Work",
    description: "Manage your work tasks",
    icon: Briefcase,
    route: "/work",
    color: "bg-orange-500",
    category: "Work",
    rating: 4.6,
    users: "45K+",
    updates: 3
  },
  {
    name: "Business",
    description: "Run your business operations",
    icon: Building2,
    route: "/business",
    color: "bg-cyan-500",
    category: "Business",
    rating: 4.7,
    users: "30K+"
  },
  {
    name: "Content",
    description: "Create and manage content",
    icon: FileText,
    route: "/content",
    color: "bg-emerald-500",
    category: "Content",
    rating: 4.5,
    users: "20K+",
    status: "new"
  },
  {
    name: "Nonprofit",
    description: "Make a difference",
    icon: Heart,
    route: "/nonprofit",
    color: "bg-rose-500",
    category: "Nonprofit",
    rating: 4.9,
    users: "15K+"
  },
  {
    name: "Services",
    description: "Find and book services",
    icon: Globe,
    route: "/services",
    color: "bg-violet-500",
    category: "Services",
    rating: 4.6,
    users: "35K+",
    updates: 1
  }
];
