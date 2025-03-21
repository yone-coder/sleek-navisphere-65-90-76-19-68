
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const mostUsedApps = [...favorites].slice(0, 4);
  
  if (mostUsedApps.length < 4) {
    const popularApps = apps
      .filter(app => app.status === "popular" && !favorites.some(fav => fav.name === app.name))
      .slice(0, 4 - mostUsedApps.length);
    
    mostUsedApps.push(...popularApps);
  }
  
  const arrangedApps = [...apps]
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 24);
  
  const appRows = [];
  for (let i = 0; i < arrangedApps.length; i += 4) {
    appRows.push(arrangedApps.slice(i, i + 4));
  }
  
  const handleAppClick = (app: App) => {
    if (isEditMode) return;
    
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
      <div className="sticky top-0 z-50 mb-2 px-4 flex items-center justify-between bg-black/10 backdrop-blur-sm py-2 rounded-b-xl">
        <div className="text-sm font-medium text-white">{formatTime(time)}</div>
        <div className="flex gap-1.5 items-center">
          <Signal className="w-4 h-4 text-white" />
          <Wifi className="w-4 h-4 text-white" />
          <Battery className="w-5 h-5 text-white" />
        </div>
      </div>
      
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
      
      <div className="fixed inset-0 bg-black/60 z-40 flex flex-col">
        <div className="flex justify-between items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
          >
            <Settings className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={handleLockScreen}
          >
            <Lock className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Weather widget */}
        <div className="mx-4 mb-6 p-4 bg-black/30 backdrop-blur-sm rounded-xl text-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-light">Port-au-Prince</h3>
              <p className="text-sm opacity-80">Partly Cloudy</p>
            </div>
            <div className="text-3xl font-light">31°</div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="text-center">
              <p className="text-xs">Now</p>
              <p className="font-medium">31°</p>
            </div>
            <div className="text-center">
              <p className="text-xs">12PM</p>
              <p className="font-medium">33°</p>
            </div>
            <div className="text-center">
              <p className="text-xs">1PM</p>
              <p className="font-medium">34°</p>
            </div>
            <div className="text-center">
              <p className="text-xs">2PM</p>
              <p className="font-medium">34°</p>
            </div>
            <div className="text-center">
              <p className="text-xs">3PM</p>
              <p className="font-medium">33°</p>
            </div>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="mx-4 mb-6">
          <div 
            className="flex items-center bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 text-white"
            onClick={() => navigate('/search')}
          >
            <Search className="w-5 h-5 mr-2 opacity-80" />
            <span className="opacity-80">Search apps, contacts, web...</span>
          </div>
        </div>
        
        {/* Edit mode toggle */}
        <div className="px-4 mb-4 flex justify-end">
          <Button
            variant={isEditMode ? "secondary" : "ghost"}
            size="sm"
            className={`text-white ${isEditMode ? 'bg-white/30' : 'bg-transparent'}`}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditMode ? "Done" : "Edit"}
          </Button>
        </div>
        
        {/* Wallpaper selector */}
        {isEditMode && (
          <div className="px-4 mb-4">
            <p className="text-white text-sm mb-2">Choose Wallpaper</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {wallpapers.map((wallpaper, index) => (
                <button
                  key={index}
                  className={`w-12 h-12 rounded-lg ${wallpaper} border-2 flex-shrink-0 ${selectedWallpaper === index ? 'border-white' : 'border-transparent'}`}
                  onClick={() => setSelectedWallpaper(index)}
                ></button>
              ))}
            </div>
          </div>
        )}
        
        {/* App Grid */}
        <ScrollArea className="flex-grow px-4">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {appRows.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map((app) => (
                  <div
                    key={app.name}
                    className="relative flex flex-col items-center"
                    onClick={() => handleAppClick(app)}
                  >
                    {isEditMode && (
                      <button
                        className="absolute -right-1 -top-1 z-10 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Remove app logic would go here
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${
                      app.color ? app.color : 'from-blue-500 to-indigo-600'
                    } flex items-center justify-center ${isEditMode ? 'animate-wiggle' : ''}`}>
                      {app.icon && React.isValidElement(app.icon) ? app.icon : <AppWindow className="w-8 h-8 text-white" />}
                    </div>
                    <p className="mt-1 text-xs text-center text-white font-medium">
                      {app.name}
                    </p>
                    <button
                      className={`mt-1 ${favorites.some(fav => fav.name === app.name) ? 'text-yellow-400' : 'text-white/60'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(app.name);
                      }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
        
        {/* Bottom Dock */}
        <div className="fixed bottom-8 inset-x-0 flex justify-center">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2 mx-4 w-full max-w-xs">
            <div className="grid grid-cols-4 gap-2">
              {mostUsedApps.map((app) => (
                <div
                  key={app.name}
                  className="flex flex-col items-center"
                  onClick={() => handleAppClick(app)}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                    app.color ? app.color : 'from-blue-500 to-indigo-600'
                  } flex items-center justify-center`}>
                    {app.icon && React.isValidElement(app.icon) ? app.icon : <AppWindow className="w-8 h-8 text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`.animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }`}
      </style>
    </div>
  );
}
