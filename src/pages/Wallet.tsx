
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Grid, 
  Search, 
  ScanLine, 
  Bell, 
  Settings,
  ChevronRight,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

// Mock notifications for demo
const notifications = [
  { id: 1, title: "Payment Received", message: "$50.00 from John Doe", time: "2m ago", isNew: true },
  { id: 2, title: "Transfer Complete", message: "Successfully sent $30.00", time: "1h ago", isNew: true },
  { id: 3, title: "Weekly Summary", message: "View your spending report", time: "3h ago", isNew: false },
];

export default function Wallet() {
  const { t } = useLanguage();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="relative">
          {/* Main Header */}
          <div className={cn(
            "h-14 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300",
            showSearch && "opacity-0 pointer-events-none"
          )}>
            <div className="h-full px-3 flex items-center gap-2 max-w-2xl mx-auto">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 shrink-0"
              >
                <Grid className="h-4 w-4 text-gray-700" />
              </Button>

              <div 
                className="flex-1 min-w-0 px-1"
                onClick={() => setShowSearch(true)}
              >
                <div className="relative cursor-pointer">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <div className="w-full h-8 pl-8 pr-3 flex items-center bg-gray-50 rounded-full border border-gray-100">
                    <span className="text-sm text-gray-500 truncate">Search transactions, contacts...</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 shrink-0"
                >
                  <ScanLine className="h-3.5 w-3.5 text-gray-700" />
                </Button>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="relative h-7 w-7 shrink-0"
                    >
                      <Bell className="h-3.5 w-3.5 text-gray-700" />
                      <Badge 
                        className="absolute -top-0.5 -right-0.5 h-3 min-w-3 p-0.5 flex items-center justify-center bg-blue-500 text-[10px]"
                      >
                        2
                      </Badge>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-sm">
                    <SheetHeader>
                      <SheetTitle>Notifications</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-2">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-1 space-y-0.5">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{notification.title}</p>
                              {notification.isNew && (
                                <Badge variant="secondary" className="bg-blue-50 text-blue-600 text-[10px] px-1.5">New</Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{notification.message}</p>
                            <p className="text-[10px] text-gray-400">{notification.time}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 shrink-0 text-gray-400"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>

                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 shrink-0"
                >
                  <Settings className="h-3.5 w-3.5 text-gray-700" />
                </Button>
              </div>
            </div>
          </div>

          {/* Search Overlay */}
          <div className={cn(
            "absolute inset-0 bg-white h-14 transition-all duration-300",
            !showSearch && "opacity-0 pointer-events-none"
          )}>
            <div className="h-full px-3 flex items-center gap-2 max-w-2xl mx-auto">
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <Input
                    placeholder="Search transactions, contacts..."
                    className="pl-8 h-8 bg-gray-50 border-gray-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
              >
                <X className="h-3.5 w-3.5 text-gray-700" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content (with header spacing) */}
      <div className="pt-14">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">{t('nav.wallet')}</h1>
        </div>
      </div>
    </div>
  );
}
