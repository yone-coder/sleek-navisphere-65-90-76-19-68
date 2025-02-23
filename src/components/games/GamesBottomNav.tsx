
import { Home, Compass, Radio, Wallet2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  {
    icon: Home,
    label: "Home",
    path: "/games-pages",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Compass,
    label: "Explore",
    path: "/games-pages/explore",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Radio,
    label: "Live",
    path: "/games-pages/live",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: Wallet2,
    label: "Wallet",
    path: "/games-pages/wallet",
    color: "from-emerald-500 to-green-500"
  },
  {
    icon: User,
    label: "Profile",
    path: "/games-pages/profile",
    color: "from-amber-500 to-yellow-500"
  }
];

export const GamesBottomNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      {/* Modern glass effect background */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-full shadow-lg shadow-black/5 border border-white/20">
        <ul className="flex items-center gap-1 p-1">
          {navItems.map(({ icon: Icon, label, path, color }) => (
            <li key={label}>
              <button
                onClick={() => navigate(path)}
                className="relative flex flex-col items-center justify-center p-3 group"
              >
                {/* Background gradient on hover */}
                <div className={cn(
                  "absolute inset-0 rounded-full opacity-0 bg-gradient-to-tr",
                  color,
                  "group-hover:opacity-10 transition-opacity duration-300"
                )} />

                {/* Icon with hover effect */}
                <Icon className="w-5 h-5 mb-1 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
                
                {/* Label with fade in effect */}
                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                  {label}
                </span>
                
                {/* Active indicator */}
                <div className={cn(
                  "absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0",
                  `bg-gradient-to-r ${color}`,
                  "group-hover:opacity-100 transition-all duration-300",
                  "group-hover:w-8"
                )} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
