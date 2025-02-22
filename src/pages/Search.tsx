
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { 
  Trophy, // Import Lucide icons directly
  Swords,
  Store,
  GamepadIcon
} from "lucide-react";

const mockApps = [
  {
    name: "Tournaments",
    description: "Browse and join gaming tournaments",
    category: "Gaming",
    route: "/tournaments",
    color: "bg-purple-500",
    icon: Trophy // Use Lucide icon component directly
  },
  {
    name: "Matches",
    description: "View ongoing and upcoming matches",
    category: "Gaming",
    route: "/matches",
    color: "bg-blue-500",
    icon: Swords
  },
  {
    name: "Marketplace",
    description: "Buy and sell gaming items",
    category: "Shopping",
    route: "/marketplace",
    color: "bg-green-500",
    icon: Store
  },
  {
    name: "Games",
    description: "Play various online games",
    category: "Gaming",
    route: "/games",
    color: "bg-red-500",
    icon: GamepadIcon
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
