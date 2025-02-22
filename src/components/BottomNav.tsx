
import { Home, ChevronRight, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';
import { RecentScreens } from './RecentScreens';

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const navItems = [
    { icon: Home, label: t('nav.home'), path: '/' },
    { 
      icon: Clock, 
      label: t('nav.recent'), 
      isRecent: true 
    },
    { icon: ChevronRight, label: t('nav.back'), action: () => navigate(-1) },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-nav-bg backdrop-blur-lg shadow-lg border-t border-white/10">
      <ul className="flex items-center justify-around px-4 py-2 max-w-screen-sm mx-auto">
        {navItems.map(({ icon: Icon, label, path, action, isRecent }) => {
          const isActive = path ? location.pathname === path : false;
          const handleClick = action ? action : () => path && navigate(path);
          
          const button = (
            <button
              onClick={handleClick}
              className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${
                isActive ? 'text-nav-active scale-105' : 'text-nav-inactive hover:text-nav-active'
              }`}
            >
              <Icon className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7'}`} />
              <span className={`text-[10px] font-medium ${isMobile ? 'tracking-tight' : ''}`}>
                {label}
              </span>
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
    </nav>
  );
};
