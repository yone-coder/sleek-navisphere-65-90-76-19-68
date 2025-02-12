
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, Check, Search, Scan, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from '@/hooks/use-mobile';

const languageDetails = {
  en: {
    nativeName: 'English',
    languageInNative: 'English',
    flag: '🇬🇧'
  },
  es: {
    nativeName: 'Spanish',
    languageInNative: 'Español',
    flag: '🇪🇸'
  },
  fr: {
    nativeName: 'French',
    languageInNative: 'Français',
    flag: '🇫🇷'
  },
  ht: {
    nativeName: 'Haitian Creole',
    languageInNative: 'Kreyòl Ayisyen',
    flag: '🇭🇹'
  }
};

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Filter languages based on search query
  const filteredLanguages = Object.entries(languageDetails).filter(([code, details]) => {
    const search = searchQuery.toLowerCase();
    return (
      details.nativeName.toLowerCase().includes(search) ||
      details.languageInNative.toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (user) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 h-14 px-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 md:h-10 md:w-10 rounded-full"
              >
                <Avatar>
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex-1 max-w-2xl mx-auto px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 h-10 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-9 w-9 md:h-10 md:w-10"
            >
              <Scan className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              className="h-9 w-9 md:h-10 md:w-10 relative"
            >
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4 md:px-6">
        <div className="flex items-center gap-4 md:gap-8">
          <Link 
            to="/" 
            className="text-lg md:text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Lovable
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 md:h-10 md:w-10 relative group"
              >
                <Globe className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="absolute -bottom-1 -right-1 text-xs">
                  {languageDetails[language].flag}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-[280px] p-2 animate-in fade-in-0 zoom-in-95"
            >
              <div className="px-2 py-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search language..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-9"
                  />
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                {filteredLanguages.map(([code, details]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => handleLanguageChange(code as Language)}
                    className="flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-accent rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{details.flag}</span>
                      <div className="max-w-[180px]">
                        <p className="font-medium truncate">{details.nativeName}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {details.languageInNative}
                        </p>
                      </div>
                    </div>
                    {language === code && (
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    )}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            className="text-sm font-medium h-8 md:h-10 truncate max-w-[100px]"
            onClick={() => navigate('/login')}
          >
            {t('btn.signin')}
          </Button>
          <Button 
            className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-opacity h-8 md:h-10 truncate max-w-[100px]"
            onClick={() => navigate('/signup')}
          >
            {t('btn.signup')}
          </Button>
        </div>
      </div>
    </header>
  );
};
