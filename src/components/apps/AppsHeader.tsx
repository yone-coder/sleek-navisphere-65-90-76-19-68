
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

        {/* Bottom: Profile Section */}
        <div className="px-4">
          {isAuthenticated && user ? (
            <button 
              onClick={() => {}} 
              className="flex items-center gap-3 w-full py-2 hover:bg-muted/60 transition-colors duration-200 rounded-lg"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.subtitle}</span>
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
          ) : (
            <Button 
              variant="outline"
              size="sm"
              className="font-medium w-full justify-start"
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
