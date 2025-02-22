
import * as React from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { 
  Clock, 
  X, 
  Pin, 
  PinOff, 
  Maximize2, 
  ArrowUpRight,
  Home,
  User,
  Gamepad2,
  Trophy,
  Wallet,
  ShoppingBag,
  Newspaper,
  History,
  Minimize2,
  Trash2
} from "lucide-react";

interface RecentScreen {
  path: string;
  title: string;
  timestamp: number;
  isPinned?: boolean;
}

const getIconForPath = (path: string) => {
  switch (path) {
    case "/":
      return <Home className="w-5 h-5" />;
    case "/profile":
      return <User className="w-5 h-5" />;
    case "/games":
      return <Gamepad2 className="w-5 h-5" />;
    case "/tournaments":
      return <Trophy className="w-5 h-5" />;
    case "/wallet":
      return <Wallet className="w-5 h-5" />;
    case "/marketplace":
      return <ShoppingBag className="w-5 h-5" />;
    case "/feeds":
      return <Newspaper className="w-5 h-5" />;
    default:
      return <History className="w-5 h-5" />;
  }
};

const mockScreens: RecentScreen[] = [
  { path: "/", title: "Home", timestamp: Date.now() - 1000, isPinned: true },
  { path: "/profile", title: "Profile", timestamp: Date.now() - 2000 },
  { path: "/games", title: "Games", timestamp: Date.now() - 3000 },
  { path: "/matches", title: "Matches", timestamp: Date.now() - 4000 },
  { path: "/wallet", title: "Wallet", timestamp: Date.now() - 5000 },
  { path: "/tournaments", title: "Tournaments", timestamp: Date.now() - 6000 },
  { path: "/marketplace", title: "Marketplace", timestamp: Date.now() - 7000 },
  { path: "/feeds", title: "Feeds", timestamp: Date.now() - 8000 },
];

export function RecentScreens({ children }: { children: React.ReactNode }) {
  const [recentScreens, setRecentScreens] = React.useState<RecentScreen[]>(mockScreens);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const pathTitle = location.pathname === "/" ? "Home" : 
      location.pathname.split("/").pop()?.charAt(0).toUpperCase() + 
      location.pathname.split("/").pop()?.slice(1) || "Unknown";

    setRecentScreens(prev => {
      const newScreens = prev.filter(screen => screen.path !== location.pathname);
      return [{ 
        path: location.pathname, 
        title: pathTitle,
        timestamp: Date.now() 
      }, ...newScreens].slice(0, 8);
    });
  }, [location.pathname]);

  const pinnedScreens = recentScreens.filter(screen => screen.isPinned);
  const unpinnedScreens = recentScreens.filter(screen => !screen.isPinned);

  const togglePin = (screenPath: string) => {
    setRecentScreens(prev => 
      prev.map(screen => 
        screen.path === screenPath 
          ? { ...screen, isPinned: !screen.isPinned }
          : screen
      )
    );
  };

  const removeScreen = (screenPath: string) => {
    setRecentScreens(prev => prev.filter(screen => screen.path !== screenPath));
  };

  const clearAll = () => {
    setRecentScreens(prev => prev.filter(screen => screen.isPinned));
  };

  const renderScreen = (screen: RecentScreen) => (
    <Card 
      key={screen.path + screen.timestamp}
      className={`relative group cursor-pointer hover:shadow-lg transition-all duration-200 aspect-video bg-gradient-to-br 
        ${screen.isPinned 
          ? 'from-blue-500/10 to-blue-600/10 ring-1 ring-blue-500/20' 
          : 'from-gray-500/5 to-gray-600/5'
        } ${location.pathname === screen.path ? 'ring-2 ring-primary' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      
      {/* Icon */}
      <div className="absolute top-4 left-4 text-white/70">
        {getIconForPath(screen.path)}
      </div>
      
      {/* Action buttons */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePin(screen.path);
          }}
          className="p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white"
          title={screen.isPinned ? "Unpin" : "Pin"}
        >
          {screen.isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeScreen(screen.path);
          }}
          className="p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white"
          title="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Screen content */}
      <div 
        className="absolute inset-0 flex flex-col justify-end p-4"
        onClick={() => navigate(screen.path)}
      >
        <div className="flex items-center gap-2">
          <p className="text-white font-medium flex-1">{screen.title}</p>
          <ArrowUpRight className="w-4 h-4 text-white/70" />
        </div>
        <p className="text-xs text-gray-300">
          {new Date(screen.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </Card>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className={`p-0 transition-all duration-300 ease-in-out ${
          isFullScreen ? 'h-[90vh]' : 'h-[60vh]'
        }`}
      >
        <ScrollArea className="h-full">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Recent Screens</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  title={isFullScreen ? "Minimize" : "Maximize"}
                >
                  {isFullScreen ? (
                    <Minimize2 className="w-5 h-5" />
                  ) : (
                    <Maximize2 className="w-5 h-5" />
                  )}
                </button>
                <SheetClose asChild>
                  <button className="p-2 hover:bg-gray-100 rounded-full" title="Close">
                    <X className="w-5 h-5" />
                  </button>
                </SheetClose>
              </div>
            </div>

            {/* Pinned screens */}
            {pinnedScreens.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Pin className="w-4 h-4" />
                  Pinned
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {pinnedScreens.map(renderScreen)}
                </div>
              </div>
            )}

            {/* Recent screens */}
            {unpinnedScreens.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Recent
                  </h3>
                  <button
                    onClick={clearAll}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear all
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {unpinnedScreens.map(renderScreen)}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
