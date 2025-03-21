
import React, { useState, useEffect } from 'react';
import { Heart, X, Search, Settings, Plus, Mail, Calendar, Music, Video, ShoppingCart, Image, Globe, Compass, Bell, BookOpen, Activity, Zap, Layout, Send, Download, TrendingUp, ChevronRight, Clock, Star, MoreHorizontal, Bookmark, User } from 'lucide-react';
import { ProfileCard } from '@/components/apps/ProfileCard';
import { apps } from '@/components/apps/data/appsData';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

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

  // Quick actions for the home screen
  const quickActions = [
    { name: 'Wi-Fi', icon: Zap, color: 'bg-blue-600', description: 'Connect' },
    { name: 'Files', icon: Layout, color: 'bg-green-600', description: 'Browse & Share' },
    { name: 'Email', icon: Mail, color: 'bg-purple-600', description: 'Check Mail' },
    { name: 'Calendar', icon: Calendar, color: 'bg-red-500', description: 'Appointments' },
    { name: 'Music', icon: Music, color: 'bg-pink-500', description: 'Play Tunes' },
    { name: 'News', icon: BookOpen, color: 'bg-amber-500', description: 'Latest Updates' },
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

  return (
    <div className="flex flex-col h-full bg-white w-full overflow-hidden">
      {/* Use ProfileCard component */}
      <ProfileCard />

      {/* Time-based suggestions */}
      {suggestedApps.length > 0 && (
        <div className="px-3 mb-2">
          <h2 className="text-xs font-medium text-gray-600 mb-2">Suggested for {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}</h2>
          <div className="flex space-x-2">
            {suggestedApps.map(app => (
              <div key={app.id} className="flex-1 bg-gray-50 rounded-lg p-2 hover:bg-gray-100">
                <div className="flex items-center">
                  <div className={`${app.color} w-9 h-9 rounded-lg flex items-center justify-center mr-2`}>
                    {app.icon ? <app.icon size={18} className="text-white" /> : <span className="text-white text-lg font-bold">{app.letter}</span>}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{app.name}</p>
                    <p className="text-xs text-gray-500">{app.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions with Animation */}
      <div className="px-3 mb-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xs font-medium text-gray-600">Quick Actions</h2>
          <Button variant="ghost" size="sm" className="text-xs text-blue-500 h-6 px-2">
            Edit <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`${action.color} w-10 h-10 rounded-full flex items-center justify-center shadow-sm`}>
                <action.icon size={18} className="text-white" />
              </div>
              <span className="mt-1 text-xs text-center">{action.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notifications section with Animation */}
      {notifications.length > 0 && (
        <div className="px-3 mb-3">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs font-medium text-gray-600">Notifications</h2>
            <span className="text-xs text-blue-500">See all</span>
          </div>
          <div className="space-y-2">
            {notifications.map((notification, index) => (
              <motion.div 
                key={notification.id} 
                className="bg-gray-50 rounded-lg p-2 flex items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`${notification.color} w-8 h-8 rounded-lg flex items-center justify-center mr-2`}>
                  <Bell size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium">{notification.app}</p>
                  <p className="text-xs text-gray-500">{notification.message}</p>
                </div>
                <span className="text-xs text-gray-400">{notification.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Most Used (Enhanced) */}
      {showRecentlyUsed && (
        <div className="px-3 mb-3">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs font-medium text-gray-600">Most Used</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-blue-500 h-6 px-2"
              onClick={() => setShowRecentlyUsed(false)}
            >
              Hide <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          <div className="flex space-x-2">
            {recentApps.map((app, index) => (
              <motion.div 
                key={app.id} 
                className="flex-1 bg-gray-50 rounded-lg p-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center">
                  <div className={`${app.color} w-12 h-12 rounded-xl flex items-center justify-center mb-1`}>
                    <span className="text-white text-lg font-bold">{app.letter}</span>
                  </div>
                  <p className="text-xs font-medium">{app.name}</p>
                  <p className="text-[10px] text-gray-500">{app.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Favorites Header */}
      <div className="border-b border-gray-200 mx-2">
        <div className="flex justify-between items-center px-3 py-2">
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
        <div className="px-3 pb-2">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-gray-100 p-0.5">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="py-1 px-2 text-xs"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Search bar */}
        {searchMode && (
          <div className="px-3 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search favorites..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 bg-gray-200 rounded-lg pl-8 text-sm"
                autoFocus
              />
              <Search size={16} className="absolute left-2 top-2.5 text-gray-500" />
            </div>
          </div>
        )}
      </div>

      {/* App grid - 4 items per row with minimal padding */}
      <div className="flex-1 px-2 py-2 overflow-y-auto">
        {/* Recently Used Section (only show if not searching) */}
        {!searchMode && activeCategory === 'recent' && (
          <div className="mb-4">
            <h2 className="text-xs font-medium text-gray-600 px-2 mb-2">Recently Used</h2>
            <div className="bg-gray-50 rounded-xl p-2">
              {recentApps.map(app => (
                <div key={app.id} className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
                  <div className={`${app.color} w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-sm`}>
                    <span className="text-white text-lg font-bold">{app.letter}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{app.name}</p>
                    <p className="text-xs text-gray-500">{app.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs bg-gray-100">Open</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favorites Grid with Animations */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-4 gap-3">
            {filteredApps.map(app => (
              <motion.div 
                key={app.id} 
                className="relative flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  scale: activeAppId === app.id ? 1.1 : 1,
                  boxShadow: activeAppId === app.id ? "0 10px 25px rgba(0,0,0,0.2)" : "none" 
                }}
                onTapStart={() => handleAppLongPress(app.id)}
                onTap={() => handleAppTap(app.id)}
              >
                <div className={`${app.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 active:scale-95`}>
                  <span className="text-white text-xl font-bold">{app.letter}</span>
                </div>
                <span className="mt-1 text-xs text-center truncate w-full">{app.name}</span>
                
                {/* Edit mode buttons with animations */}
                <AnimatePresence>
                  {editMode && (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      onClick={() => toggleFavorite(app.id)}
                      className="absolute -top-1 -left-1 bg-red-500 rounded-full p-1 shadow-md transition-transform hover:scale-110"
                    >
                      <X size={10} className="text-white" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            
            {/* Add button (only in edit mode) */}
            {editMode && (
              <motion.div 
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all duration-200">
                  <Plus size={20} className="text-gray-400" />
                </div>
                <span className="mt-1 text-xs text-gray-500">Add</span>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <Heart size={48} />
            <p className="mt-4 text-center">No favorite apps found</p>
            {searchMode && (
              <p className="text-sm text-center mt-2">Try adjusting your search</p>
            )}
          </div>
        )}
      </div>
      
      {/* App Actions Menu */}
      <div className="px-3 pt-2 pb-3 bg-gray-50 border-t border-gray-200">
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
