
import { Home, Search, Grid, ShoppingCart, Clock, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { RecentScreens } from '../RecentScreens';

export const MarketplaceNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
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
      badge: '2' // This would normally come from a cart context/state
    },
    {
      icon: Clock,
      label: 'Recent',
      isRecent: true,
      color: 'from-rose-500 to-red-500'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Back button */}
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

      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 to-white/75 backdrop-blur-lg border-t border-gray-200/30" />
      
      {/* Navigation content */}
      <div className="relative max-w-2xl mx-auto px-4 py-2">
        <ul className="flex items-center justify-between">
          {navItems.map(({ icon: Icon, label, path, color, badge, isRecent }) => {
            const isActive = path ? location.pathname === path : false;
            const button = (
              <button
                onClick={() => path && navigate(path)}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 p-2 w-16",
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
                    "w-6 h-6 transition-colors duration-300",
                    isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"
                  )} />

                  {/* Badge for cart items */}
                  {badge && (
                    <Badge 
                      className={cn(
                        "absolute -top-1.5 -right-1.5 h-4 min-w-4 p-0.5",
                        "flex items-center justify-center rounded-full",
                        "bg-red-500 text-[10px] font-medium text-white border-2 border-white"
                      )}
                    >
                      {badge}
                    </Badge>
                  )}
                </div>

                {/* Label */}
                <span className={cn(
                  "text-[10px] font-medium tracking-tight transition-colors duration-300",
                  isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"
                )}>
                  {label}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <div className={cn(
                    "absolute -bottom-2 left-1/2 -translate-x-1/2",
                    "h-1 w-8 rounded-full bg-gradient-to-r",
                    color
                  )} />
                )}
              </button>
            );

            return (
              <li key={label}>
                {isRecent ? (
                  <RecentScreens>{button}</RecentScreens>
                ) : (
                  button
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
