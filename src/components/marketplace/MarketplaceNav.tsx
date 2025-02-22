
import { Home, Search, Grid, ShoppingCart, Clock, ChevronLeft, UserRound } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { RecentScreens } from '../RecentScreens';

// Define the type for navigation items
interface NavItem {
  icon: typeof Home | typeof Search | typeof Grid | typeof ShoppingCart | typeof UserRound;
  label: string;
  path: string;
  color: string;
  badge?: string;
}

export const MarketplaceNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    {
      icon: Home,
      label: 'Home',
      path: '/marketplace',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Search,
      label: 'Search',
      path: '/marketplace/search',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Grid,
      label: 'Categories',
      path: '/marketplace/categories',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: ShoppingCart,
      label: 'Cart',
      path: '/marketplace/cart',
      color: 'from-emerald-500 to-green-500',
      badge: '2'
    },
    {
      icon: UserRound,
      label: 'Profile',
      path: '/profile',
      color: 'from-slate-500 to-gray-500'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100]">
      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 to-white/75 backdrop-blur-lg border-t border-gray-200/30" />
      
      {/* Navigation content */}
      <div className="relative max-w-screen-xl mx-auto">
        {/* Back button with animation */}
        <button
          onClick={() => navigate(-1)}
          className={cn(
            "absolute left-4 -top-12",
            "flex items-center gap-2 px-3 py-1.5",
            "text-xs font-medium text-gray-600",
            "bg-white/50 backdrop-blur-sm rounded-full",
            "border border-gray-200/30 shadow-sm",
            "transition-all duration-300 hover:bg-white/80",
            "opacity-0 -translate-y-2",
            location.pathname !== '/marketplace' && "opacity-100 translate-y-0"
          )}
          aria-label="Go back"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Back
        </button>

        {/* Recent Apps button */}
        <RecentScreens>
          <button
            className={cn(
              "absolute right-4 -top-12",
              "flex items-center gap-2 px-3 py-1.5",
              "text-xs font-medium text-gray-600",
              "bg-white/50 backdrop-blur-sm rounded-full",
              "border border-gray-200/30 shadow-sm",
              "transition-all duration-300 hover:bg-white/80",
              "opacity-0 -translate-y-2",
              location.pathname !== '/marketplace' && "opacity-100 translate-y-0"
            )}
            aria-label="Recent Apps"
          >
            <Clock className="w-4 h-4" aria-hidden="true" />
            Recent
          </button>
        </RecentScreens>

        <ul className="flex items-center justify-around py-3 px-4 relative z-10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            const button = (
              <button
                key={item.label}
                onClick={() => item.path && navigate(item.path)}
                className={cn(
                  "flex flex-col items-center gap-1.5 py-1 px-3",
                  "transition-all duration-300 group relative"
                )}
              >
                <div 
                  className={cn(
                    "p-2 rounded-xl transition-all duration-300",
                    "group-hover:scale-105",
                    isActive && "bg-gradient-to-r shadow-lg",
                    isActive && item.color
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors duration-300",
                    isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
                  )} />
                </div>
                <span className={cn(
                  "text-[10px] font-medium transition-colors duration-300",
                  isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"
                )}>
                  {item.label}
                </span>
                {item.badge && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center bg-red-500 text-[10px]"
                  >
                    {item.badge}
                  </Badge>
                )}
              </button>
            );

            return (
              <li key={item.label}>
                {button}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

