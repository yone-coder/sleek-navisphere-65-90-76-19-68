import { useState } from "react";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { type LucideIcon, Gamepad, Trophy, ShoppingCart } from "lucide-react";

interface AppItem {
  name: string;
  description: string;
  category: string;
  route: string;
  color: string;
  icon: LucideIcon;
}

const mockApps: AppItem[] = [
  {
    name: "Tournaments",
    description: "Browse and join gaming tournaments",
    category: "Gaming",
    route: "/tournaments",
    color: "bg-purple-500",
    icon: Trophy
  },
  {
    name: "Matches",
    description: "View ongoing and upcoming matches",
    category: "Gaming",
    route: "/matches",
    color: "bg-blue-500",
    icon: Gamepad
  },
  {
    name: "Marketplace",
    description: "Buy and sell gaming items",
    category: "Shopping",
    route: "/marketplace",
    color: "bg-green-500",
    icon: ShoppingCart
  }
];

const Search = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <SearchOverlay 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        apps={mockApps}
      />
    </div>
  );
};

export default Search;
