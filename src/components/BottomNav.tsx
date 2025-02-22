
import { Home, ChevronRight, Clock } from 'lucide-react';
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
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      icon: Clock, 
      label: t('nav.recent'), 
      isRecent: true,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: ChevronRight, 
      label: t('nav.back'), 
      action: () => navigate(-1),
      color: 'from-emerald-500 to-green-500'
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 to-white/75 dark:from-gray-900/95 dark:to-gray-900/75 backdrop-blur-lg border-t border-white/10" />
      
      {/* Navigation content */}
      <div className="relative max-w-2xl mx-auto px-4 py-2">
        <ul className="flex items-center justify-around">
          {navItems.map(({ icon: Icon, label, path, action, isRecent, color }) => {
            const isActive = path ? location.pathname === path : false;
            const handleClick = action ? action : () => path && navigate(path);
            
            const button = (
              <button
                onClick={handleClick}
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
                    isMobile ? "w-6 h-6" : "w-7 h-7",
                    "transition-colors duration-300",
                    isActive ? "text-nav-active" : "text-nav-inactive group-hover:text-nav-active"
                  )} />
                </div>

                {/* Label */}
                <span className={cn(
                  "text-[10px] font-medium tracking-tight transition-colors duration-300",
                  isActive ? "text-nav-active" : "text-nav-inactive group-hover:text-nav-active",
                  isMobile && "tracking-tight"
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
