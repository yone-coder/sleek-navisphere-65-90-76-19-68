
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Globe, Check } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppsHeaderProps {
  onOpenSearch: () => void;
}

export const AppsHeader = ({ onOpenSearch }: AppsHeaderProps) => {
  const [notifications, setNotifications] = useState(3);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  // Temporary auth state until you provide your auth context
  const isAuthenticated = false; 
  
  const languageDetails = {
    en: { name: "English", flag: "🇬🇧" },
    fr: { name: "Français", flag: "🇫🇷" },
    es: { name: "Español", flag: "🇪🇸" },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Left: Profile Menu or Sign In Button */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-10 w-10 rounded-full hover:bg-muted/60 transition-colors duration-200 p-0.5"
                >
                  <Avatar className="h-full w-full ring-2 ring-background">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-semibold leading-none">User Name</p>
                    <p className="text-xs text-muted-foreground">user@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-3 py-2 gap-2 cursor-pointer">
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline"
              size="sm"
              className="font-medium"
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
          )}
        </div>

        {/* Middle: Search bar */}
        <div className="flex flex-1 items-center justify-center max-w-2xl">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground/60 group-hover:text-muted-foreground/80 transition-colors duration-200" />
            <Input
              placeholder="Search apps, games, tournaments..."
              className="pl-10 bg-muted/40 hover:bg-muted/60 transition-colors duration-200 cursor-pointer border-none h-11 text-sm"
              onClick={onOpenSearch}
              readOnly
            />
          </div>
        </div>

        {/* Right: Language & Notifications */}
        <div className="flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full w-10 h-10 hover:bg-muted/60 transition-colors duration-200"
              >
                <Globe className="h-5 w-5 text-muted-foreground/70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {Object.entries(languageDetails).map(([code, details]) => (
                <DropdownMenuItem
                  key={code}
                  onClick={() => setLanguage(code as Language)}
                  className="flex items-center gap-2.5 px-3 py-2"
                >
                  <span className="text-lg">{details.flag}</span>
                  <span className="font-medium text-sm">{details.name}</span>
                  {language === code && <Check className="ml-auto h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            size="icon" 
            className="relative rounded-full w-10 h-10 hover:bg-muted/60 transition-colors duration-200"
          >
            <Bell className="h-5 w-5 text-muted-foreground/70" />
            {notifications > 0 && (
              <Badge 
                className="absolute -right-0.5 -top-0.5 h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0.5 text-[11px] font-medium text-white border-2 border-background"
              >
                {notifications}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
