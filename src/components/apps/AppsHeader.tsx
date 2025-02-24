
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Globe, Check, Mic } from "lucide-react";
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
  // This should be replaced with your actual auth check
  const isAuthenticated = false;
  const user = isAuthenticated ? {
    name: "Danny Rico",
    email: "danny@example.com",
    subtitle: "Apple Account, iCloud, and more",
    avatar: "https://github.com/shadcn.png",
  } : null;

  const languageDetails = {
    en: { name: "English", flag: "🇬🇧" },
    fr: { name: "Français", flag: "🇫🇷" },
    es: { name: "Español", flag: "🇪🇸" },
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col py-2 gap-2">
        {/* Top: Search bar */}
        <div className="flex items-center gap-2 w-full px-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground/60" />
            <Input
              placeholder="Search"
              className="pl-10 pr-12 bg-muted/40 hover:bg-muted/60 transition-colors duration-200 cursor-pointer border-none h-11 text-sm rounded-full"
              onClick={onOpenSearch}
              readOnly
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent"
            >
              <Mic className="h-5 w-5 text-muted-foreground/70" />
            </Button>
          </div>
        </div>

        {/* Bottom: Profile Section - Always shown */}
        <div className="px-4">
          <button 
            onClick={() => navigate('/login')} 
            className="flex items-center gap-3 w-full py-2 hover:bg-muted/60 transition-colors duration-200 rounded-lg"
          >
            <Avatar className="h-10 w-10">
              {isAuthenticated && user ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback className="bg-muted-foreground/10">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-muted-foreground/60"
                  >
                    <path 
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col items-start">
              {isAuthenticated && user ? (
                <>
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.subtitle}</span>
                </>
              ) : (
                <>
                  <span className="text-sm font-medium">Sign in</span>
                  <span className="text-xs text-muted-foreground">Access your account and data</span>
                </>
              )}
            </div>
            <div className="ml-auto">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-muted-foreground/70"
                >
                  <path 
                    d="M9 18L15 12L9 6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
