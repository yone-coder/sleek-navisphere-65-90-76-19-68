import React from 'react';
import { Grid2X2, ShoppingCart, ActivitySquare, Gamepad2, Trophy, CreditCard, Users, Gift, Settings, Mail, Bell, Clock, Star, Store, BookOpen, Wallet, PiggyBank, Briefcase, Search, Ticket, Calendar, Bitcoin, Globe, Heart, Newspaper, Building } from "lucide-react";
import type { App } from "../types";

export const apps: App[] = [
  {
    name: "Morpion",
    description: "Classic Tic-tac-toe game with a modern twist",
    icon: () => (
      <img 
        src="/lovable-uploads/44c5c93d-ace1-4feb-a49b-db4a8a02f987.png" 
        alt="Morpion"
        className="w-[80%] h-[80%]"
      />
    ),
    route: "/games/morpion",
    color: "bg-indigo-500",
    category: "Gaming",
    status: "new",
    users: "1.2K+",
    lastUsed: "5 mins ago",
    rating: 4.8,
    updates: 1
  },
  {
    name: "Flora",
    description: "Order fresh flowers & cakes for delivery",
    icon: Store,
    route: "/flora",
    color: "bg-pink-500",
    category: "Shopping",
    status: "new",
    users: "3.8K+",
    lastUsed: "30 mins ago",
    rating: 4.7,
    updates: 2
  },
  {
    name: "Munch",
    description: "Discover and order from top food franchises",
    icon: Store,
    route: "/food-franchises",
    color: "bg-orange-500",
    category: "Food",
    users: "9.4K+",
    rating: 4.8,
    updates: 1
  },
  {
    name: "Boltz",
    description: "Fast and reliable delivery services",
    icon: Store,
    route: "/delivery",
    color: "bg-yellow-500",
    category: "Services",
    status: "popular",
    users: "11.2K+",
    lastUsed: "15 mins ago",
    rating: 4.9
  },
  {
    name: "Domus",
    description: "Find and rent your perfect property",
    icon: Building,
    route: "/property",
    color: "bg-blue-500",
    category: "Real Estate",
    users: "7.6K+",
    rating: 4.6
  },
  {
    name: "Evnto",
    description: "Discover and host amazing seminars & conferences",
    icon: Calendar,
    route: "/events",
    color: "bg-blue-500",
    category: "Business",
    status: "new",
    users: "5.2K+",
    lastUsed: "1 hour ago",
    rating: 4.8,
    updates: 2
  },
  {
    name: "Novus",
    description: "Premium newsletters for passionate readers",
    icon: Mail,
    route: "/newsletters",
    color: "bg-indigo-500",
    category: "Content",
    users: "8.7K+",
    rating: 4.6,
    updates: 1
  },
  {
    name: "Stash",
    description: "Buy and sell high-quality study notes",
    icon: BookOpen,
    route: "/study-notes",
    color: "bg-emerald-500",
    category: "Education",
    status: "popular",
    users: "16.3K+",
    lastUsed: "2 hours ago",
    rating: 4.9
  },
  {
    name: "Careo",
    description: "Support and manage nonprofit fundraising",
    icon: Heart,
    route: "/fundraising",
    color: "bg-pink-500",
    category: "Nonprofit",
    users: "4.8K+",
    rating: 4.7
  },
  {
    name: "Rise",
    description: "Smart investment platform for everyone",
    icon: PiggyBank,
    route: "/invest",
    color: "bg-purple-500",
    category: "Finance",
    status: "popular",
    users: "12.9K+",
    rating: 4.8,
    updates: 3
  },
  {
    name: "Druck",
    description: "Create and sell custom printed products",
    icon: Store,
    route: "/print",
    color: "bg-cyan-500",
    category: "Business",
    users: "7.1K+",
    rating: 4.5
  },
  {
    name: "Skilt",
    description: "Connect with top freelancers worldwide",
    icon: Briefcase,
    route: "/freelance",
    color: "bg-sky-500",
    category: "Work",
    status: "new",
    users: "7.3K+",
    lastUsed: "5 mins ago",
    rating: 4.7,
    updates: 2
  },
  {
    name: "Vocar",
    description: "Find your dream job opportunity",
    icon: Search,
    route: "/jobs",
    color: "bg-purple-500",
    category: "Work",
    users: "18.9K+",
    rating: 4.8,
    updates: 1
  },
  {
    name: "GoTix",
    description: "Book tickets for events and shows",
    icon: Ticket,
    route: "/tickets",
    color: "bg-yellow-500",
    category: "Entertainment",
    status: "popular",
    users: "21.4K+",
    lastUsed: "3 hours ago",
    rating: 4.9
  },
  {
    name: "Resby",
    description: "Easy scheduling and booking platform",
    icon: Calendar,
    route: "/booking",
    color: "bg-green-500",
    category: "Business",
    users: "11.2K+",
    rating: 4.6
  },
  {
    name: "TrdeX",
    description: "Trade cryptocurrencies securely",
    icon: Bitcoin,
    route: "/crypto",
    color: "bg-orange-500",
    category: "Finance",
    status: "popular",
    users: "14.7K+",
    rating: 4.8,
    updates: 3
  },
  {
    name: "Tribr",
    description: "Build and manage your community",
    icon: Globe,
    route: "/community",
    color: "bg-indigo-500",
    category: "Social",
    users: "9.8K+",
    rating: 4.7
  },
  {
    name: "Shopr",
    description: "Your ultimate marketplace for buying and selling",
    icon: Store,
    route: "/marketplace",
    color: "bg-emerald-500",
    category: "Shopping",
    status: "popular",
    users: "12.5K+",
    lastUsed: "2 hours ago",
    rating: 4.8,
    updates: 2
  },
  {
    name: "Winnr",
    description: "Compete in tournaments and win prizes",
    icon: Trophy,
    route: "/tournaments",
    color: "bg-amber-500",
    category: "Gaming",
    status: "popular",
    users: "8.2K+",
    lastUsed: "1 day ago",
    rating: 4.7,
    updates: 1
  },
  {
    name: "LernX",
    description: "Learn new skills with interactive online courses",
    icon: BookOpen,
    route: "/courses",
    color: "bg-blue-500",
    category: "Education",
    users: "15.3K+",
    rating: 4.9
  },
  {
    name: "Zendy",
    description: "Fast and secure money transfers worldwide",
    icon: Wallet,
    route: "/transfer",
    color: "bg-violet-500",
    category: "Finance",
    users: "9.1K+",
    rating: 4.6,
    updates: 3
  },
  {
    name: "FundX",
    description: "Crowdfunding platform for innovative projects",
    icon: PiggyBank,
    route: "/crowdfunding",
    color: "bg-rose-500",
    category: "Finance",
    users: "6.8K+",
    rating: 4.5
  },
  {
    name: "Games",
    description: "Play your favorite games",
    icon: Gamepad2,
    route: "/games-pages",
    color: "bg-violet-500",
    category: "Entertainment"
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

export const appCategories = [
  "All",
  "Shopping",
  "Finance",
  "Entertainment",
  "Gaming",
  "Analytics",
  "Social",
  "Communication",
  "System",
  "Education",
  "Work",
  "Business",
  "Content",
  "Nonprofit",
  "Food",
  "Services",
  "Real Estate"
] as const;

export const categories = [
  { id: "all", label: "All Apps", icon: Grid2X2, count: apps.length },
  { id: "recent", label: "Recent", icon: Clock, count: apps.filter(app => app.status === "new").length },
  { id: "popular", label: "Popular", icon: Star, count: apps.filter(app => app.status === "popular").length },
  { id: "favorites", label: "Favorites", icon: Star }
];
