
import React, { useState, useEffect } from 'react';
import { Heart, X, Search, Settings, Plus, Mail, Calendar, Music, Video, ShoppingCart, Image, Globe, Compass, Bell, BookOpen, Activity, Zap, Layout, Send, Download, TrendingUp, ChevronRight, Clock, Star, MoreHorizontal, Bookmark, User, ArrowDownLeft, ArrowUpRight, Sparkles, Package, Trophy, Headphones, Palette, Sunrise, Coffee, FileText, Briefcase, Wifi, Cpu, Archive, Layers, Play, Gamepad2, CheckSquare } from 'lucide-react';
import { ProfileCard } from '@/components/apps/ProfileCard';
import { FavoritesGrid } from '@/components/apps/FavoritesGrid';
import { apps } from '@/components/apps/data/appsData';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { QuickActionsGrid, QuickAction } from '@/components/apps/QuickActionsGrid';
import { SuggestedAppsSection, SuggestedApp } from '@/components/apps/SuggestedAppsSection';
import { NotificationsSection, Notification } from '@/components/apps/NotificationsSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RecentActivitySection, RecentApp, Transaction, ActivityItem } from '@/components/apps/RecentActivitySection';

export function HomeTab() {
  const [favoriteApps, setFavoriteApps] = useState(() => {
    return apps.slice(0, 12).map((app, index) => ({
      id: index + 1,
      name: app.name,
      color: app.color,
      letter: app.name.charAt(0),
      favorite: true,
    }));
  });

  const { toast } = useToast();
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showRecentlyUsed, setShowRecentlyUsed] = useState(true);
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

  const toggleFavorite = (id) => {
    setFavoriteApps(favoriteApps.map(app => 
      app.id === id ? { ...app, favorite: !app.favorite } : app
    ));

    const app = favoriteApps.find(app => app.id === id);
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

  const handleAppLongPress = (id) => {
    setActiveAppId(id);
    setTimeout(() => {
      setEditMode(true);
      setActiveAppId(null);
    }, 500);
  }

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
    { id: 'all', label: 'All' },
    { id: 'recent', label: 'Recent' },
    { id: 'social', label: 'Social' },
    { id: 'productivity', label: 'Work' },
    { id: 'entertainment', label: 'Media' },
  ];

  const recentApps: RecentApp[] = [
    { id: 101, name: 'Modish', color: 'bg-purple-500', letter: 'M', time: '2 mins ago', type: 'app-usage' },
    { id: 102, name: 'Maps', color: 'bg-blue-500', letter: 'M', time: '1 hour ago', type: 'app-usage' },
    { id: 103, name: 'Chat', color: 'bg-green-500', letter: 'C', time: '3 hours ago', type: 'app-usage' },
  ];

  const getSuggestedApps = (): SuggestedApp[] => {
    const hour = currentTime.getHours();
    
    if (hour >= 6 && hour < 10) {
      return [
        { id: 201, name: 'News', color: 'bg-amber-500', letter: 'N', reason: '' },
        { id: 202, name: 'Coffee', icon: Coffee, color: 'bg-yellow-700', letter: 'C', reason: '' },
        { id: 203, name: 'Journal', icon: FileText, color: 'bg-blue-600', letter: 'J', reason: '' },
        { id: 204, name: 'Weather', icon: Sunrise, color: 'bg-cyan-500', letter: 'W', reason: '' },
      ];
    } else if (hour >= 12 && hour < 14) {
      return [
        { id: 203, name: 'Food', color: 'bg-orange-500', letter: 'F', reason: '' },
        { id: 204, name: 'Wallet', color: 'bg-green-500', letter: 'W', reason: '' },
        { id: 205, name: 'Break', icon: Coffee, color: 'bg-indigo-500', letter: 'B', reason: '' },
        { id: 206, name: 'Social', icon: Globe, color: 'bg-blue-500', letter: 'S', reason: '' },
      ];
    } else if (hour >= 18 && hour < 22) {
      return [
        { id: 205, name: 'Music', icon: Music, color: 'bg-pink-500', letter: 'M', reason: '' },
        { id: 206, name: 'Video', icon: Video, color: 'bg-red-500', letter: 'V', reason: '' },
        { id: 207, name: 'Games', icon: Gamepad2, color: 'bg-violet-500', letter: 'G', reason: '' },
        { id: 208, name: 'Social', icon: Globe, color: 'bg-blue-500', letter: 'S', reason: '' },
      ];
    } else {
      return [
        { id: 207, name: 'Calendar', icon: Calendar, color: 'bg-blue-500', letter: 'C', reason: '' },
        { id: 208, name: 'Social', color: 'bg-purple-500', letter: 'S', reason: '' },
        { id: 209, name: 'Tasks', icon: CheckSquare, color: 'bg-emerald-500', letter: 'T', reason: '' },
        { id: 210, name: 'Notes', icon: FileText, color: 'bg-yellow-500', letter: 'N', reason: '' },
      ];
    }
  };

  const suggestedApps = getSuggestedApps();

  const notifications: Notification[] = [
    { id: 301, app: 'Email', message: '3 new messages', time: '10 min ago', color: 'bg-blue-500' },
    { id: 302, app: 'Calendar', message: 'Meeting in 30 minutes', time: '25 min ago', color: 'bg-red-500' },
    { id: 303, app: 'Updates', message: '2 apps need updating', time: '1 hour ago', color: 'bg-green-500' },
  ];

  const recentTransactions: Transaction[] = [
    { id: 1, type: 'transaction', subtype: "sent", amount: 230, recipient: "John Doe", date: "Today", time: "14:32" },
    { id: 2, type: 'transaction', subtype: "received", amount: 1250, sender: "PayRoll Inc", date: "Yesterday", time: "09:15" },
    { id: 3, type: 'transaction', subtype: "sent", amount: 45, recipient: "Coffee Shop", date: "Today", time: "08:30" },
  ];

  const recentActivities: ActivityItem[] = [
    ...recentTransactions.map(t => ({
      id: `tx-${t.id}`,
      type: 'transaction' as const,
      data: t,
      time: new Date(currentTime.setHours(parseInt(t.time.split(':')[0]), parseInt(t.time.split(':')[1]))).getTime()
    })),
    ...recentApps.map(a => ({
      id: `app-${a.id}`,
      type: 'app-usage' as const,
      data: a,
      time: Date.now() - (a.time.includes('mins') ? parseInt(a.time) * 60 * 1000 : (a.time.includes('hour') ? parseInt(a.time) * 60 * 60 * 1000 : 24 * 60 * 60 * 1000))
    }))
  ].sort((a, b) => b.time - a.time);

  const pinnedApps = [
    { id: 301, name: 'Messages', icon: Mail, color: 'bg-blue-500', notification: 3 },
    { id: 302, name: 'Photos', icon: Image, color: 'bg-pink-500', notification: 0 },
    { id: 303, name: 'Files', icon: FileText, color: 'bg-amber-500', notification: 2 },
    { id: 304, name: 'Work', icon: Briefcase, color: 'bg-purple-500', notification: 0 },
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
        {suggestedApps.length > 0 && (
          <SuggestedAppsSection 
            title={`Good ${currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}`}
            description=""
            apps={suggestedApps}
            className="mb-4 px-2"
          />
        )}

        <div className="mb-4 px-2">
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
                  <div className={`${app.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-md mb-1`}>
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
                    className="py-1 px-3 text-xs rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white flex-1"
                  >
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

        <div className="px-2">
          <FavoritesGrid 
            apps={filteredApps}
            editMode={editMode}
            onToggleFavorite={toggleFavorite}
            onAppTap={handleAppTap}
            onAppLongPress={handleAppLongPress}
            activeAppId={activeAppId}
          />
        </div>
      </motion.div>
      
      <div className="fixed bottom-0 left-0 right-0 px-3 pt-2 pb-safe bg-white border-t border-gray-200 shadow-lg z-20">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-16 w-16">
            <Bookmark className="h-5 w-5 mb-1 text-blue-500" />
            <span className="text-xs">Favorites</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-16 w-16">
            <Clock className="h-5 w-5 mb-1 text-green-500" />
            <span className="text-xs">Recent</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-16 w-16">
            <Star className="h-5 w-5 mb-1 text-amber-500" />
            <span className="text-xs">Popular</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center h-16 w-16">
            <User className="h-5 w-5 mb-1 text-purple-500" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
