
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Globe, Check } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage, Language } from "@/contexts/LanguageContext";
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
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/shadcn.png",
  };

  const languageDetails = {
    en: { name: "English", flag: "🇬🇧" },
    fr: { name: "Français", flag: "🇫🇷" },
    es: { name: "Español", flag: "🇪🇸" },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Search bar */}
        <div className="flex flex-1 items-center gap-2 md:gap-4 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search apps, games, tournaments..."
              className="pl-8 bg-muted/50 cursor-pointer"
              onClick={onOpenSearch}
              readOnly
            />
          </div>
        </div>

        {/* Right section */}
        <div className="ml-auto flex items-center gap-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(languageDetails).map(([code, details]) => (
                <DropdownMenuItem
                  key={code}
                  onClick={() => setLanguage(code as Language)}
                  className="flex items-center gap-2"
                >
                  <span>{details.flag}</span>
                  <span>{details.name}</span>
                  {language === code && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge 
                className="absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-[10px] text-white"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
