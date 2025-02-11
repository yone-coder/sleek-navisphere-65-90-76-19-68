
import { Home, Search, Users, Rss, User, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Explore', path: '/explore' },
  { icon: Users, label: 'Matches', path: '/matches' },
  { icon: Rss, label: 'Feeds', path: '/feeds' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Wallet, label: 'Wallet', path: '/wallet' },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-6 py-2 rounded-2xl bg-nav-bg backdrop-blur-lg shadow-lg border border-white/10">
      <ul className="flex items-center gap-8">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <li key={path}>
              <Link
                to={path}
                className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                  isActive ? 'text-nav-active scale-105' : 'text-nav-inactive hover:text-nav-active'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
