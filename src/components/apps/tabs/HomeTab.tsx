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

