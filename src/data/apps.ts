
import { Mail, Settings, Users, FileText, ShoppingBag, DollarSign, Play, GameController, BarChart3, MessageSquare, Phone, Laptop, GraduationCap, Briefcase, Building2, Share2, Heart, Utensils, Tool } from "lucide-react";
import type { App } from "@/components/apps/types";

export const apps: App[] = [
  {
    name: "Mail",
    description: "Send and receive emails",
    icon: Mail,
    color: "bg-blue-500",
    category: "Communication",
    route: "/mail",
    users: "500K+",
    rating: 4.8,
    status: "popular",
    updates: 2
  },
  {
    name: "Settings",
    description: "System preferences and configurations",
    icon: Settings,
    color: "bg-gray-600",
    category: "System",
    route: "/settings",
    users: "1M+",
    rating: 4.5,
    status: "stable",
    updates: 0
  },
  {
    name: "Social",
    description: "Connect with friends and family",
    icon: Users,
    color: "bg-purple-500",
    category: "Social",
    route: "/social",
    users: "2M+",
    rating: 4.9,
    status: "popular",
    updates: 5
  },
  {
    name: "Notes",
    description: "Take notes and organize your thoughts",
    icon: FileText,
    color: "bg-yellow-500",
    category: "Work",
    route: "/notes",
    users: "300K+",
    rating: 4.7,
    status: "stable",
    updates: 1
  },
  {
    name: "Store",
    description: "Shop online for products",
    icon: ShoppingBag,
    color: "bg-green-500",
    category: "Shopping",
    route: "/store",
    users: "1.5M+",
    rating: 4.8,
    status: "popular",
    updates: 3
  },
  {
    name: "Finance",
    description: "Manage your finances",
    icon: DollarSign,
    color: "bg-emerald-500",
    category: "Finance",
    route: "/finance",
    users: "800K+",
    rating: 4.6,
    status: "stable",
    updates: 0
  },
  {
    name: "Media",
    description: "Stream your favorite content",
    icon: Play,
    color: "bg-red-500",
    category: "Entertainment",
    route: "/media",
    users: "2.5M+",
    rating: 4.9,
    status: "popular",
    updates: 2
  },
  {
    name: "Games",
    description: "Play exciting games",
    icon: GameController,
    color: "bg-indigo-500",
    category: "Gaming",
    route: "/games",
    users: "3M+",
    rating: 4.8,
    status: "popular",
    updates: 4
  },
  {
    name: "Analytics",
    description: "Track your performance metrics",
    icon: BarChart3,
    color: "bg-blue-600",
    category: "Analytics",
    route: "/analytics",
    users: "400K+",
    rating: 4.7,
    status: "stable",
    updates: 1
  },
  {
    name: "Chat",
    description: "Message your contacts",
    icon: MessageSquare,
    color: "bg-teal-500",
    category: "Communication",
    route: "/chat",
    users: "1.8M+",
    rating: 4.9,
    status: "popular",
    updates: 3
  }
];
