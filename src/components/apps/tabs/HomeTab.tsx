
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Star, Settings, Wifi, Battery, Signal, Search, X, AppWindow, Edit, Grid3x3, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { apps } from "../data/appsData";
import type { App } from "../types";
import { cn } from "@/lib/utils";

interface HomeTabProps {
  favorites: App[];
  onToggleFavorite: (appName: string) => void;
}

export function HomeTab({ favorites, onToggleFavorite }: HomeTabProps) {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(80);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  
  // Wallpaper options
  const wallpapers = [
    "bg-gradient-to-br from-blue-400 to-purple-500",
    "bg-gradient-to-br from-green-400 to-blue-500",
    "bg-gradient-to-br from-purple-500 to-pink-500",
    "bg-gradient-to-br from-amber-300 to-orange-500",
    "bg-gradient-to-br from-rose-400 to-red-500",
    "bg-[url('https://source.unsplash.com/random/1080x1920?nature')]",
    "bg-[url('https://source.unsplash.com/random/1080x1920?city')]",
    "bg-[url('https://source.unsplash.com/random/1080x1920?abstract')]",
  ];
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Get the most used apps (we'll use favorites for this example)
  const mostUsedApps = [...favorites].slice(0, 4);
  
  // Fill with popular apps if we don't have enough favorites
  if (mostUsedApps.length < 4) {
    const popularApps = apps
      .filter(app => app.status === "popular" && !favorites.some(fav => fav.name === app.name))
      .slice(0, 4 - mostUsedApps.length);
    
    mostUsedApps.push(...popularApps);
  }
  
  // Use the main apps list, but arrange in a grid pattern
  const arrangedApps = [...apps]
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 24);
  
  // Group apps into rows of 4 for the iOS-style grid
  const appRows = [];
  for (let i = 0; i < arrangedApps.length; i += 4) {
    appRows.push(arrangedApps.slice(i, i + 4));
  }
  
  const handleAppClick = (app: App) => {
    if (isEditMode) return; // Prevent app opening in edit mode
    
    if (app.name === "Chess") {
      navigate('/games/chess');
    } else if (app.category === "Gaming") {
      const gameId = app.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/games/${gameId}`);
    } else {
      navigate(app.route);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  };
  
  const handleLockScreen = () => {
    setIsLockScreen(true);
    setTimeout(() => {
      setIsLockScreen(false);
    }, 2000);
  };
  
  if (isLockScreen) {
    return (
      <div className={`fixed inset-0 flex flex-col items-center justify-center ${wallpapers[selectedWallpaper]} bg-cover bg-center`}
           style={{ filter: `brightness(${brightness}%)` }}>
        <div className="text-white text-center p-8">
          <div className="text-6xl font-thin mb-2">{formatTime(time)}</div>
          <div className="text-xl font-light">{formatDate(time)}</div>
          <div className="mt-20 opacity-80">
            <Lock className="w-10 h-10 mx-auto" />
            <p className="mt-2">Swipe up to unlock</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`pt-4 pb-40 min-h-screen relative ${wallpapers[selectedWallpaper]} bg-cover bg-center`}
         style={{ filter: `brightness(${brightness}%)` }}>
      {/* iOS-style Status Bar */}
      <div className="sticky top-0 z-50 mb-2 px-4 flex items-center justify-between bg-black/10 backdrop-blur-sm py-2 rounded-b-xl">
        <div className="text-sm font-medium text-white">{formatTime(time)}</div>
        <div className="flex gap-1.5 items-center">
          <Signal className="w-4 h-4 text-white" />
          <Wifi className="w-4 h-4 text-white" />
          <Battery className="w-5 h-5 text-white" />
        </div>
      </div>
      
      {/* Control Center Pull Down */}
      <div 
        className={`absolute inset-x-0 top-0 z-50 transition-transform duration-300 ${isControlCenterOpen ? 'translate-y-0' : '-translate-y-full'}`}
        onClick={() => setIsControlCenterOpen(false)}
      >
        <div className="bg-black/60 backdrop-blur-lg text-white p-6 rounded-b-2xl">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-2 p-3 bg-black/40 rounded-xl flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Wifi</span>
                <Switch checked={true} />
              </div>
              <div className="flex justify-between">
                <span>Bluetooth</span>
                <Switch checked={true} />
              </div>
            </div>
            <div className="p-3 bg-black/40 rounded-xl flex flex-col items-center justify-center">
              <Wifi className="w-6 h-6 mb-1" />
              <span className="text-xs">Wifi</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl flex flex-col items-center justify-center">
              <Battery className="w-6 h-6 mb-1" />
              <span className="text-xs">Battery</span>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm mb-1">Brightness</p>
            <Slider
              value={[brightness]}
              min={20}
              max={100}
              step={1}
              onValueChange={(values) => setBrightness(values[0])}
              className="w-full"
            />
          </div>
          <div className="flex justify-end">
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => setIsControlCenterOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
      
      {/* Edit Mode & Wallpaper Controls */}
      {isEditMode && (
        <div className="fixed inset-0 bg-black/60 z-40 flex flex-col">
          <div className="flex justify-between items-center p-4">
            <Button variant="ghost" className="text-white" onClick={() => setIsEditMode(false)}>
              <X className="w-6 h-6" />
            </Button>
            <h2 className="text-white text-lg font-medium">Edit Home Screen</h2>
            <Button variant="ghost" className="text-white" onClick={() => setIsEditMode(false)}>
              Done
            </Button>
          </div>
          
          <div className="p-4 bg-black/40 backdrop-blur-sm mx-4 rounded-xl mb-4">
            <h3 className="text-white mb-3">Choose Wallpaper</h3>
            <div className="grid grid-cols-4 gap-3">
              {wallpapers.map((wallpaper, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-16 rounded-lg border-2",
                    wallpaper,
                    selectedWallpaper === index ? "border-white" : "border-transparent"
                  )}
                  onClick={() => setSelectedWallpaper(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-black/40 backdrop-blur-sm mx-4 rounded-xl">
            <h3 className="text-white mb-3">Display Settings</h3>
            <div className="mb-3">
              <p className="text-white text-sm mb-2">Brightness</p>
              <Slider
                value={[brightness]}
                min={20}
                max={100}
                step={1}
                onValueChange={(values) => setBrightness(values[0])}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Pull-down hint */}
      <div className="absolute top-0 inset-x-0 h-1 flex justify-center">
        <div
          className="w-12 h-1 rounded-full bg-white/30 mb-2"
          onClick={() => setIsControlCenterOpen(true)}
        />
      </div>
      
      {/* Search Bar */}
      <div className="px-6 mb-6">
        <Card className="flex items-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-md border-0 text-white shadow-sm">
          <Search className="w-4 h-4" />
          <span className="text-sm opacity-80">Search</span>
        </Card>
      </div>
      
      {/* Weather Widget */}
      <div className="mb-6 mx-4">
        <Card className="bg-gradient-to-r from-blue-500/70 to-blue-700/70 backdrop-blur-md text-white p-4 rounded-2xl border-0 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">New York</h3>
              <p className="text-3xl font-bold">68°</p>
              <p className="text-sm opacity-90">Partly Cloudy</p>
            </div>
            <div className="text-6xl">⛅</div>
          </div>
        </Card>
      </div>
      
      {/* App Grid (iOS style) */}
      <ScrollArea className="h-[calc(100vh-200px)] pb-40">
        <div className="px-2">
          {appRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-around mb-8">
              {row.map((app, colIndex) => (
                <div 
                  key={`${rowIndex}-${colIndex}`} 
                  className={`flex flex-col items-center gap-1 w-20 ${isEditMode ? 'animate-[wiggle_1s_ease-in-out_infinite]' : ''}`}
                  onClick={() => handleAppClick(app)}
                >
                  <div 
                    className={`w-14 h-14 rounded-[22px] ${app.color} flex items-center justify-center relative shadow-sm
                    ${isEditMode ? 'animate-pulse' : ''}`}
                  >
                    <app.icon className="w-7 h-7 text-white" />
                    {app.updates > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {app.updates}
                      </div>
                    )}
                    
                    {/* Delete button in edit mode */}
                    {isEditMode && (
                      <button 
                        className="absolute -top-2 -left-2 bg-black/70 text-white w-5 h-5 flex items-center justify-center rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Mock removing app (just show as favorite toggle for demo)
                          onToggleFavorite(app.name);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <span className="text-xs font-medium text-center truncate w-full text-white drop-shadow-md">
                    {app.name}
                  </span>
                  
                  {!isEditMode && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 hover:opacity-100 hover:bg-gray-100/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(app.name);
                      }}
                    >
                      <Star className={`w-3 h-3 ${favorites.some(fav => fav.name === app.name) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {/* Dock */}
      <div className="fixed bottom-16 left-0 right-0 mx-auto w-[90%] max-w-md">
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-white/30">
          <div className="flex justify-around">
            {apps.slice(0, 4).map((app, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleAppClick(app)}
              >
                <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center relative`}>
                  <app.icon className="w-7 h-7 text-white" />
                  {app.updates > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {app.updates}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        <Button 
          className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 p-3 w-12 h-12 hover:bg-white/30"
          onClick={() => setIsEditMode(!isEditMode)}
        >
          <Edit className="w-5 h-5 text-white" />
        </Button>
        <Button 
          className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 p-3 w-12 h-12 hover:bg-white/30"
          onClick={handleLockScreen}
        >
          <Lock className="w-5 h-5 text-white" />
        </Button>
        <Button 
          className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 p-3 w-12 h-12 hover:bg-white/30"
          onClick={() => setIsControlCenterOpen(true)}
        >
          <Grid3x3 className="w-5 h-5 text-white" />
        </Button>
      </div>
      
      <style jsx global>{`
        @keyframes wiggle {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-1deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(1deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
