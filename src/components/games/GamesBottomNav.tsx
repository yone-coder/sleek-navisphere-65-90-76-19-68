
import { Gamepad2, Trophy, Compass } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  {
    icon: Gamepad2,
    label: "Games",
    path: "/games-pages",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Trophy,
    label: "Contest",
    path: "/games-pages/contest",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Compass,
    label: "Explore",
    path: "/games/explore",
    color: "from-emerald-500 to-green-500"
  }
];

export const GamesBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 to-white/75 dark:from-gray-900/95 dark:to-gray-900/75 backdrop-blur-lg border-t border-white/10" />
      
      {/* Navigation content */}
      <div className="relative max-w-2xl mx-auto px-4 py-1">
        <ul className="flex items-center justify-around">
          {navItems.map(({ icon: Icon, label, path, color }) => {
            const isActive = location.pathname === path;
            
            return (
              <li key={label}>
                <button
                  onClick={() => navigate(path)}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-0.5 py-1.5 px-2 w-16",
                    "transition-all duration-300 group",
                    isActive ? "scale-105" : "hover:scale-105"
                  )}
                >
                  {/* Icon container with gradient background */}
                  <div className="relative">
                    <div className={cn(
                      "absolute inset-0 rounded-full opacity-0 bg-gradient-to-tr",
                      color,
                      isActive ? "opacity-10" : "group-hover:opacity-5",
                      "transition-opacity duration-300"
                    )} />
                    
                    <Icon className={cn(
                      "w-5 h-5",
                      "transition-colors duration-300",
                      isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                    )} />
                  </div>

                  {/* Label */}
                  <span className={cn(
                    "text-[9px] font-medium tracking-tight transition-colors duration-300",
                    isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                  )}>
                    {label}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className={cn(
                      "absolute -bottom-1 left-1/2 -translate-x-1/2",
                      "h-0.5 w-6 rounded-full bg-gradient-to-r",
                      color
                    )} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
