
import { useState } from "react";
import { Store, Trophy, BookOpen, Wallet, PiggyBank } from "lucide-react";
import { AppGrid } from "@/components/apps/AppGrid";
import { FavoritesSection } from "@/components/apps/FavoritesSection";

const apps = [
  {
    name: "Shopr",
    description: "Your ultimate marketplace for buying and selling",
    icon: Store,
    route: "/marketplace",
    color: "bg-emerald-500",
    category: "Shopping",
    users: "12.5k",
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
    users: "8.2k",
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
    users: "15.3k",
    rating: 4.9
  },
  {
    name: "Zendy",
    description: "Fast and secure money transfers worldwide",
    icon: Wallet,
    route: "/transfer",
    color: "bg-violet-500",
    category: "Finance",
    users: "9.1k",
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
    users: "6.8k",
    rating: 4.5
  }
];

const Index = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const favoriteApps = apps.filter(app => favorites.includes(app.name));

  const handleToggleFavorite = (appName: string) => {
    setFavorites(prev => 
      prev.includes(appName) 
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <FavoritesSection favoriteApps={favoriteApps} />
      <AppGrid 
        apps={apps}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default Index;
