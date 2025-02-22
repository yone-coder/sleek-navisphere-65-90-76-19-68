
import { Home, ChevronLeft, Clock, Menu, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';
import { RecentScreens } from './RecentScreens';
import { cn } from '@/lib/utils';

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const navItems = [
    { 
      icon: Home, 
      label: t('nav.home'), 
      path: '/',
      color: 'from-indigo-500 to-blue-500' 
    },
    { 
      icon: Search, 
      label: t('nav.search'), 
      path: '/search',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Menu, 
      label: t('nav.menu'), 
      path: '/menu',
      color: 'from-orange-500 to-amber-500'
    },
    { 
      icon: Clock, 
      label: t('nav.recent'), 
      isRecent: true,
      color: 'from-green-500 to-emerald-500'
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Backdrop blur + gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-white/40 backdrop-blur-lg border-t border-gray-200/30" />
      
      {/* Main content */}
      <div className="relative">
        <ul className="flex items-center justify-around px-4 py-2 max-w-screen-sm mx-auto">
          {navItems.map(({ icon: Icon, label, path, color, isRecent }) => {
            const isActive = path ? location.pathname === path : false;
            const handleClick = () => path && navigate(path);
            
            const button = (
              <button
                onClick={handleClick}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 p-2 transition-all duration-300",
                  "relative group",
                  isActive ? "scale-105" : "hover:scale-105"
                )}
              >
                {/* Icon background with gradient */}
                <div className={cn(
                  "absolute inset-0 rounded-xl opacity-0 bg-gradient-to-tr",
                  color,
                  isActive ? "opacity-10" : "group-hover:opacity-5",
                  "transition-opacity duration-300"
                )} />

                {/* Icon wrapper */}
                <div className="relative">
                  <Icon 
                    className={cn(
                      "transition-all duration-300",
                      isMobile ? "w-6 h-6" : "w-6 h-6",
                      isActive 
                        ? "text-gray-900 transform scale-105" 
                        : "text-gray-500 group-hover:text-gray-700"
                    )}
                  />
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className={cn(
                      "absolute -bottom-2 left-1/2 -translate-x-1/2",
                      "w-1 h-1 rounded-full bg-gradient-to-r",
                      color
                    )} />
                  )}
                </div>

                {/* Label */}
                <span 
                  className={cn(
                    "text-[10px] font-medium tracking-tight",
                    "transition-colors duration-300",
                    isActive 
                      ? "text-gray-900" 
                      : "text-gray-500 group-hover:text-gray-700"
                  )}
                >
                  {label}
                </span>
              </button>
            );

            return (
              <li key={label} className="flex-1">
                {isRecent ? (
                  <RecentScreens>{button}</RecentScreens>
                ) : (
                  button
                )}
              </li>
            );
          })}
        </ul>

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
            location.pathname !== '/' && "opacity-100 translate-y-0"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </nav>
  );
};
