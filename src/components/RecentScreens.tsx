
import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface RecentScreen {
  path: string;
  title: string;
  timestamp: number;
}

const mockScreens: RecentScreen[] = [
  { path: "/", title: "Home", timestamp: Date.now() - 1000 },
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
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Update recent screens when location changes
    const pathTitle = location.pathname === "/" ? "Home" : 
      location.pathname.split("/").pop()?.charAt(0).toUpperCase() + 
      location.pathname.split("/").pop()?.slice(1) || "Unknown";

    setRecentScreens(prev => {
      const newScreens = prev.filter(screen => screen.path !== location.pathname);
      return [{ 
        path: location.pathname, 
        title: pathTitle,
        timestamp: Date.now() 
      }, ...newScreens].slice(0, 8); // Keep last 8 screens
    });
  }, [location.pathname]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[60vh] p-0">
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Recent Screens</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
              {recentScreens.map((screen) => (
                <Card 
                  key={screen.path + screen.timestamp}
                  className="relative group cursor-pointer hover:shadow-lg transition-all duration-200 aspect-video"
                  onClick={() => {
                    navigate(screen.path);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium">{screen.title}</p>
                    <p className="text-xs text-gray-300">
                      {new Date(screen.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
