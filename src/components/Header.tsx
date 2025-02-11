
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Globe, Check, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Input } from "@/components/ui/input";

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
  }
};

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const filteredLanguages = Object.entries(languageDetails).filter(([code, details]) =>
    details.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    details.languageInNative.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-3 md:py-4 
      ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link 
            to="/" 
            className="text-lg md:text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Lovable
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">{t('nav.products')}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/features" className="block p-3 space-y-1 hover:bg-accent rounded-md">
                      <div className="font-medium">{t('nav.features')}</div>
                      <div className="text-sm text-muted-foreground">{t('features.discover')}</div>
                    </Link>
                    <Link to="/pricing" className="block p-3 space-y-1 hover:bg-accent rounded-md">
                      <div className="font-medium">{t('nav.pricing')}</div>
                      <div className="text-sm text-muted-foreground">{t('pricing.plans')}</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className="px-4 py-2 text-sm">{t('nav.about')}</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className="px-4 py-2 text-sm">{t('nav.contact')}</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right section */}
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
                      <div>
                        <p className="font-medium">{details.nativeName}</p>
                        <p className="text-sm text-muted-foreground">
                          {details.languageInNative}
                        </p>
                      </div>
                    </div>
                    {language === code && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            className="text-sm font-medium h-8 md:h-10"
            asChild
          >
            <Link to="/login">{t('btn.signin')}</Link>
          </Button>
          <Button 
            className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition-opacity h-8 md:h-10"
            asChild
          >
            <Link to="/register">{t('btn.signup')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
