
import React, { useState, useEffect } from 'react';
import { Heart, X, Search, Settings, Plus, Mail, Calendar, Music, Video, ShoppingCart, Image, Globe, Compass, Bell, BookOpen, Activity, Zap, Layout, Send, Download, TrendingUp, ChevronRight, Clock, Star, MoreHorizontal, Bookmark, User, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { ProfileCard } from '@/components/apps/ProfileCard';
import { apps } from '@/components/apps/data/appsData';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { QuickActionsGrid } from '@/components/apps/QuickActionsGrid';
import { SuggestedAppsSection } from '@/components/apps/SuggestedAppsSection';
import { NotificationsSection } from '@/components/apps/NotificationsSection';
import { FavoritesGrid } from '@/components/apps/FavoritesGrid';

export function HomeTab() {
  // Get actual apps from the appsData
  const [favoriteApps, setFavoriteApps] = useState(() => {
    // Take the first 12 apps from the data source
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

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter for favorites and by search term if active
  const filteredApps = favoriteApps.filter(app => 
    app.favorite && 
    (!searchMode || app.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setFavoriteApps(favoriteApps.map(app => 
      app.id === id ? { ...app, favorite: !app.favorite } : app
    ));

    // Show toast notification
    const app = favoriteApps.find(app => app.id === id);
    toast({
      title: `${app.name} removed from favorites`,
      description: "You can add it back anytime",
      duration: 2000,
    });
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Reset search
  const clearSearch = () => {
    setSearchTerm('');
    setSearchMode(false);
  };

  // Tap and hold to activate edit mode
  const handleAppLongPress = (id) => {
    setActiveAppId(id);
    setTimeout(() => {
      setEditMode(true);
      setActiveAppId(null);
    }, 500);
  }

  // Handle app tap
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

  // Quick actions with handlers
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
      icon: Layout, 
      label: 'Files', 
      color: 'bg-purple-500',
      action: () => {
        toast({
          title: "Files action",
          description: "Opening file manager...",
          duration: 1500,
        });
      }
    },
    { 
      icon: Calendar, 
      label: 'Calendar', 
      color: 'bg-amber-500',
      action: () => {
        toast({
          title: "Calendar action",
          description: "Opening calendar...",
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

  // App categories
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'recent', label: 'Recent' },
    { id: 'social', label: 'Social' },
    { id: 'productivity', label: 'Work' },
    { id: 'entertainment', label: 'Media' },
  ];

  // Recently used apps (mock)
  const recentApps = [
    { id: 101, name: 'Modish', color: 'bg-purple-500', letter: 'M', time: '2 mins ago' },
    { id: 102, name: 'Maps', color: 'bg-blue-500', letter: 'M', time: '1 hour ago' },
    { id: 103, name: 'Chat', color: 'bg-green-500', letter: 'C', time: '3 hours ago' },
  ];

  // Suggested apps based on current time and usage
  const getSuggestedApps = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 6 && hour < 10) {
      return [
        { id: 201, name: 'News', color: 'bg-amber-500', letter: 'N', reason: 'Morning briefing' },
        { id: 202, name: 'Coffee', icon: Activity, color: 'bg-yellow-700', letter: 'C', reason: 'Start your day' },
      ];
    } else if (hour >= 12 && hour < 14) {
      return [
        { id: 203, name: 'Food', color: 'bg-orange-500', letter: 'F', reason: 'Lunch time' },
        { id: 204, name: 'Wallet', color: 'bg-green-500', letter: 'W', reason: 'Check balance' },
      ];
    } else if (hour >= 18 && hour < 22) {
      return [
        { id: 205, name: 'Music', icon: Music, color: 'bg-pink-500', letter: 'M', reason: 'Evening relaxation' },
        { id: 206, name: 'Video', icon: Video, color: 'bg-red-500', letter: 'V', reason: 'Watch something' },
      ];
    } else {
      return [
        { id: 207, name: 'Calendar', icon: Calendar, color: 'bg-blue-500', letter: 'C', reason: 'Upcoming events' },
        { id: 208, name: 'Social', color: 'bg-purple-500', letter: 'S', reason: 'Connect with friends' },
      ];
    }
  };

  const suggestedApps = getSuggestedApps();

  // Notifications (mock)
  const notifications = [
    { id: 301, app: 'Email', message: '3 new messages', time: '10 min ago', color: 'bg-blue-500' },
    { id: 302, app: 'Calendar', message: 'Meeting in 30 minutes', time: '25 min ago', color: 'bg-red-500' },
  ];

  // Recent transactions (mock)
  const recentTransactions = [
    { id: 1, type: "sent", amount: 230, recipient: "John Doe", date: "Today", time: "14:32" },
    { id: 2, type: "received", amount: 1250, sender: "PayRoll Inc", date: "Yesterday", time: "09:15" },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 w-full overflow-hidden">
      {/* Use ProfileCard component */}
      <ProfileCard />

      {/* Main scrollable content */}
      <motion.div 
        className="flex-1 px-4 py-3 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Time-based suggestions */}
        {suggestedApps.length > 0 && (
          <SuggestedAppsSection 
            title={`Good ${currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}`}
            description="Apps you might need right now"
            apps={suggestedApps}
          />
        )}

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</h2>
          <QuickActionsGrid actions={quickActions} />
        </div>

        {/* Recent Transactions */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-gray-800">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-xs text-blue-500">
              View All <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>

          <div className="space-y-2">
            {recentTransactions.map(transaction => (
              <motion.div 
                key={transaction.id} 
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    transaction.type === "received" ? "bg-green-100" : "bg-red-100"
                  }`}>
                    {transaction.type === "received" ? (
                      <ArrowDownLeft className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {transaction.type === "received" ? transaction.sender : transaction.recipient}
                    </p>
                    <p className="text-xs text-gray-400">
                      {transaction.date} • {transaction.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === "received" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.type === "received" ? "+" : "-"}${transaction.amount}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notifications section */}
        <NotificationsSection notifications={notifications} />

        {/* Favorites Header */}
        <div className="sticky top-0 z-10 bg-gray-50 pt-2 pb-2">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-base font-semibold text-gray-800">Favorites</h1>
            <div className="flex space-x-4">
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

          {/* App Categories */}
          <div className="mb-3">
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-white rounded-full border border-gray-200 p-0.5 shadow-sm">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="py-1 px-3 text-xs rounded-full data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Search bar */}
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

        {/* App grid with Favorites component */}
        <div className="mb-20"> {/* Add bottom padding for the bottom nav */}
          {/* Recently Used Section (only show if not searching) */}
          {!searchMode && activeCategory === 'recent' && (
            <div className="mb-4">
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

          {/* Favorites Grid */}
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
      
      {/* App Actions Menu - Bottom Navbar */}
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
