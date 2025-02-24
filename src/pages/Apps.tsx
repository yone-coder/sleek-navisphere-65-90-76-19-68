
import { useState } from "react";
import { BannerSlider } from "@/components/BannerSlider";
import { AppsHeader } from "@/components/apps/AppsHeader";
import { ProfileCard } from "@/components/apps/ProfileCard";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { Command, Settings, FileText, Gamepad2, ShoppingCart } from "lucide-react";

// Define the apps data
const apps = [
  {
    name: "Settings",
    description: "Customize your experience and preferences",
    category: "System",
    route: "/settings",
    color: "bg-gray-500",
    icon: Settings
  },
  {
    name: "Documents",
    description: "Access and manage your files",
    category: "Productivity",
    route: "/documents",
    color: "bg-blue-500",
    icon: FileText
  },
  {
    name: "Games",
    description: "Play and explore gaming content",
    category: "Entertainment",
    route: "/games",
    color: "bg-purple-500",
    icon: Gamepad2
  },
  {
    name: "Marketplace",
    description: "Shop and browse products",
    category: "Shopping",
    route: "/marketplace",
    color: "bg-green-500",
    icon: ShoppingCart
  }
];

export default function Apps() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppsHeader onOpenSearch={() => setIsSearchOpen(true)} />
      <ProfileCard />
      <BannerSlider />
      
      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        apps={apps}
      />
    </div>
  );
}
