
import { Home, Search, Users, Rss, User, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

export const BottomNav = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const navItems = [
    { icon: Home, label: t('nav.home'), path: '/' },
    { icon: Search, label: t('nav.products'), path: '/explore' },
    { icon: Users, label: t('nav.matches'), path: '/matches' },
    { icon: Rss, label: t('nav.feeds'), path: '/feeds' },
    { icon: User, label: t('nav.profile'), path: '/profile' },
    { icon: Wallet, label: t('nav.wallet'), path: '/wallet' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-nav-bg backdrop-blur-lg shadow-lg border-t border-white/10">
      <ul className="flex items-center justify-between px-4 py-2 max-w-screen-sm mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <li key={path}>
              <Link
                to={path}
                className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${
                  isActive ? 'text-nav-active scale-105' : 'text-nav-inactive hover:text-nav-active'
                }`}
              >
                <Icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                <span className={`text-[10px] font-medium ${isMobile ? 'tracking-tight' : ''}`}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
