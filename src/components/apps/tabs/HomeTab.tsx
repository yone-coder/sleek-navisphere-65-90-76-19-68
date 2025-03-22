import React, { useState, useEffect } from 'react';
import { 
  Heart, X, Search, Settings, Plus, Mail, Calendar, Music, Video, ShoppingCart, 
  Image, Globe, Compass, Bell, BookOpen, Activity, Zap, Layout, Send, Download, 
  TrendingUp, ChevronRight, Clock, Star, MoreHorizontal, Bookmark, User, ArrowDownLeft, 
  ArrowUpRight, Sparkles, Package, Trophy, Headphones, Palette, Sunrise, Coffee, FileText, 
  Briefcase, Wifi, Cpu, Archive, Layers, Play, CheckSquare, List, ListMusic, ListVideo, 
  Home, Phone, MessageCircle, Cloud, Shield, Lock, Mic, Calculator, Map, Car, Utensils, 
  Moon, Baby, Ticket, Building, CreditCard, Stethoscope, Share2, Languages, 
  Code, Monitor, Users, Plane, Book, GraduationCap, HelpCircle, 
  Bed, Flower, Truck, ShoppingBag, Bitcoin, Gift, Gamepad, Camera
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ProfileCard } from '@/components/apps/ProfileCard';
import { FavoritesGrid } from '@/components/apps/FavoritesGrid';
import { apps } from '@/components/apps/data/appsData';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { Card } from "@/components/ui/card";
import { QuickActionsGrid, QuickAction } from '@/components/apps/QuickActionsGrid';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RecentActivitySection, RecentApp, Transaction, ActivityItem } from '@/components/apps/RecentActivitySection';
import { App } from '@/components/apps/types';

const appIconsMap = {
  "Messages": Mail,
  "Calendar": Calendar,
  "Photos": Image,
  "Camera": Camera,
  "Maps": Map,
  "Weather": Sunrise,
  "Clock": Clock,
  "Notes": FileText,
  "Reminders": CheckSquare,
  "Stocks": TrendingUp,
  "Books": BookOpen,
  "App Store": Layers,
  "Health": Activity,
  "Wallet": CreditCard,
  "Settings": Settings,
  "Files": Archive,
  "Music": Music,
  "Podcasts": Headphones,
  "Games": Gamepad,
  "News": FileText,
  "TV": Monitor,
  "Shopping": ShoppingCart,
  "Social": Users,
  "Fitness": Activity,
  "Finance": CreditCard,
  "Education": BookOpen,
  "Travel": Plane,
  "Food": Coffee,
  "Entertainment": Play,
  "Work": Briefcase,
  "Utilities": Zap,
  "Productivity": Zap,
  "Developer": Code,
  "Business": Building,
  "Graphics": Palette,
  "Videos": Video,
  "Audio": Music,
  "Reference": Book,
  "Medical": Stethoscope,
  "Lifestyle": User,
  "Sports": Trophy,
  "Navigation": Compass,
  "Search": Search,
  "Email": Mail,
  "Browser": Globe,
  "Chat": MessageCircle,
  "Photo Editor": Image,
  "Video Editor": Video,
  "Document Editor": FileText,
  "Spreadsheet": FileText,
  "Presentation": FileText,
  "Cloud Storage": Cloud,
  "VPN": Shield,
  "Password Manager": Lock,
  "Recorder": Mic,
  "Translator": Languages,
  "Scanner": Search,
  "Rewards": Gift,
  "Banking": CreditCard,
  "Investing": TrendingUp,
  "Crypto": Bitcoin,
  "Social Media": Share2,
  "Dating": Heart,
  "Forums": Users,
  "Video Chat": Video,
  "Email Client": Mail,
  "News Reader": FileText,
  "Ride Sharing": Car,
  "Food Delivery": Utensils,
  "Streaming": Play,
  "Gaming": Gamepad,
  "Meditation": Moon,
  "Quiz": HelpCircle,
  "Kids": Baby,
  "Parenting": Users,
  "Hotels": Bed,
  "Events": Calendar,
  "Tickets": Ticket,
  "Real Estate": Home,
  "Home Services": Home,
  "Job Search": Briefcase,
  "Networking": Users,
  "To-Do": CheckSquare,
  "Modish": ShoppingBag,
  "LernX": BookOpen,
  "Borlette": Ticket,
  "Rise": TrendingUp,
  "Winnr": Trophy,
  "Matches": Activity,
  "Skilt": Briefcase,
  "GoTix": Ticket,
  "Flora": Flower,
  "Tribr": Users,
  "Domus": Building,
  "VaultX": Lock,
  "Meteo": Cloud,
  "PicShare": Camera,
  "Courier": Truck,
  "Healr": Heart,
  "DinoPlay": Gamepad,
  "EatsNow": Utensils,
  "Careo": Heart,
  "Evnto": Calendar,
  "Druck": Package,
  "Activity": Activity,
  "Boltz": Truck,
  "Chess": Gamepad
};

export function HomeTab() {
  const [favoriteAppNames, setFavoriteAppNames] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteApps");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [favoriteApps, setFavoriteApps] = useState(() => {
    return convertAppsToFavoriteFormat(apps, favoriteAppNames);
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("favoriteApps");
      const newFavorites = saved ? JSON.parse(saved) : [];
      setFavoriteAppNames(newFavorites);
      setFavoriteApps(convertAppsToFavoriteFormat(apps, newFavorites));
    };

    window.addEventListener('storage', handleStorageChange);
    
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  function convertAppsToFavoriteFormat(allApps: App[], favoriteNames: string[]) {
    return allApps
      .filter(app => favoriteNames.includes(app.name))
      .map((app, index) => {
        return {
          id: index + 1,
          name: app.name,
          color: app.color,
          favorite: true
        };
      });
  }

  const { toast } = useToast();
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAppId, setActiveAppId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredApps = favoriteApps.filter(app => 
    app.favorite && 
    (!searchMode || app.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleFavorite = (id: number) => {
    const app = favoriteApps.find(app => app.id === id);
    if (!app) return;
    
    const saved = localStorage.getItem("favoriteApps");
    const currentFavorites: string[] = saved ? JSON.parse(saved) : [];
    
    const newFavorites = currentFavorites.filter(name => name !== app.name);
    
    localStorage.setItem("favoriteApps", JSON.stringify(newFavorites));
    setFavoriteAppNames(newFavorites);
    setFavoriteApps(convertAppsToFavoriteFormat(apps, newFavorites));
    
    toast({
      title: `${app.name} removed from favorites`,
      description: "You can add it back anytime",
      duration: 2000,
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchMode(false);
  };

  const handleAppTap = (id) => {
    if (!editMode) {
      const app = favoriteApps.find(app => app.id === id);
      toast({
        title: `Opening ${app.name}`,
        description: "Starting application...",
        duration: 1500,
      });
    }
  }

  const handleAppLongPress = (id: number) => {
    console.log('Long press detected on app:', id);
  };

  const quickActions = [
    { 
      icon: Send, 
      label: 'Send', 
      color: 'bg-blue-500',
      action: () => {
        toast({
          title: "Send action",
          description: "Opening send options...",
          duration: 1500,
        });
      }
    },
    { 
      icon: Download, 
      label: 'Receive', 
      color: 'bg-green-500',
      action: () => {
        toast({
          title: "Receive action",
          description: "Opening receive options...",
          duration: 1500,
        });
      }
    },
    { 
      icon: Calendar, 
      label: 'Events', 
      color: 'bg-purple-500',
      action: () => {
        toast({
          title: "Events action",
          description: "Opening calendar...",
          duration: 1500,
        });
      }
    },
    { 
      icon: Bookmark, 
      label: 'Saved', 
      color: 'bg-amber-500',
      action: () => {
        toast({
          title: "Saved items",
          description: "Opening saved items...",
          duration: 1500,
        });
      }
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      color: 'bg-gray-500',
      action: () => {
        toast({
          title: "Settings action",
          description: "Opening settings...",
          duration: 1500,
        });
      }
    },
  ];

  const categories = [
    { id: 'all', label: 'All', icon: List },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'frequent', label: 'Frequent', icon: Star },
  ];

  const pinnedApps = [
    { id: 301, name: 'Messages', icon: Mail, color: 'bg-blue-500', notification: 3 },
    { id: 302, name: 'Photos', icon: Image, color: 'bg-pink-500', notification: 0 },
    { id: 303, name: 'Files', icon: FileText, color: 'bg-amber-500', notification: 2 },
    { id: 304, name: 'Work', icon: Briefcase, color: 'bg-purple-500', notification: 0 },
  ];

  const recentApps: RecentApp[] = [
    { id: 101, name: 'Modish', color: 'bg-purple-500', letter: 'M', time: '2 mins ago', type: 'app-usage' },
    { id: 102, name: 'Maps', color: 'bg-blue-500', letter: 'M', time: '1 hour ago', type: 'app-usage' },
    { id: 103, name: 'Chat', color: 'bg-green-500', letter: 'C', time: '3 hours ago', type: 'app-usage' },
  ];

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ProfileCard />

      <motion.div 
        className="flex-1 overflow-y-auto pt-1 pb-20 no-horizontal-overflow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4 px-2 mt-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Quick Actions</h2>
          <QuickActionsGrid actions={quickActions} />
        </div>

        <div className="mb-4 px-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-gray-800">Pinned</h2>
            <Button variant="ghost" size="sm" className="text-xs text-blue-500">
              Edit <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {pinnedApps.map(app => (
              <motion.div
                key={app.id}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <div className={`bg-gradient-to-tr from-${app.color.replace('bg-', '')}-400 via-${app.color.replace('bg-', '')}-500 to-${app.color.replace('bg-', '')}-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-md mb-1`}>
                    <app.icon className="h-6 w-6 text-white" />
                  </div>
                  {app.notification > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center px-1">
                      {app.notification}
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-center">{app.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {filteredApps.length > 0 && (
          <div className="mb-4 px-2">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-base font-semibold text-gray-800">Favorites</h1>
              <div className="flex space-x-3">
                {searchMode ? (
                  <button 
                    onClick={clearSearch}
                    className="text-blue-500"
                  >
                    <X size={18} />
                  </button>
                ) : (
                  <button 
                    onClick={() => setSearchMode(true)}
                    className="text-blue-500"
                  >
                    <Search size={18} />
                  </button>
                )}
                <button 
                  onClick={() => setEditMode(!editMode)}
                  className={`${editMode ? 'text-red-500' : 'text-blue-500'} text-xs font-medium`}
                >
                  {editMode ? 'Done' : 'Edit'}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="bg-white rounded-full border border-gray-200 p-0.5 shadow-sm w-full">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="py-1 px-3 text-xs rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white flex-1 flex items-center justify-center gap-1.5"
                    >
                      <category.icon className="h-3.5 w-3.5" />
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {searchMode && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-3"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search favorites..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full p-2 bg-white rounded-lg pl-8 text-sm border border-gray-200 shadow-sm"
                    autoFocus
                  />
                  <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
                </div>
              </motion.div>
            )}
          </div>
        )}

        {!searchMode && activeCategory === 'recent' && (
          <div className="mb-4 px-2">
            <h2 className="text-xs font-medium text-gray-600 mb-2">Recently Used</h2>
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              {recentApps.map(app => (
                <motion.div 
                  key={app.id} 
                  className="flex items-center p-2 hover:bg-gray-50 rounded-lg"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`${app.color} w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-sm`}>
                    <span className="text-white text-lg font-bold">{app.letter}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{app.name}</p>
                    <p className="text-xs text-gray-500">{app.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs bg-gray-100">Open</Badge>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {filteredApps.length > 0 && (
          <div className="px-2 pb-16">
            <FavoritesGrid 
              apps={filteredApps}
              editMode={editMode}
              onToggleFavorite={toggleFavorite}
              onAppTap={handleAppTap}
              onAppLongPress={handleAppLongPress}
              activeAppId={activeAppId}
              showIcons={true}
            />
          </div>
        )}
        
        {filteredApps.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-2">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
              <Star className="text-gray-400 h-8 w-8" />
            </div>
            <p className="text-sm text-gray-600 mb-1">No favorite apps yet</p>
            <p className="text-xs text-gray-500 max-w-xs text-center mb-4">
              Go to the Explore tab and tap the star on apps you want to add to favorites.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-blue-500 border-blue-200"
              onClick={() => {
                const appTabsElement = document.querySelector('[value="explore"]');
                if (appTabsElement) {
                  (appTabsElement as HTMLElement).click();
                }
              }}
            >
              Browse Apps
            </Button>
          </div>
        )}
      </motion.div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-14 w-16">
            <Home className="h-5 w-5 mb-1 text-blue-500" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-14 w-16">
            <Clock className="h-5 w-5 mb-1 text-green-500" />
            <span className="text-xs">Recent</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-14 w-16">
            <Star className="h-5 w-5 mb-1 text-amber-500" />
            <span className="text-xs">Popular</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-14 w-16">
            <User className="h-5 w-5 mb-1 text-purple-500" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

