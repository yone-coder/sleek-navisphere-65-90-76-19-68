
import React, { useState } from 'react';
import { Heart, X, Search, Settings, Plus, Sun, Cloud, CloudRain, Zap, Wind, Layout, Mail, Calendar, Music, Video, ShoppingCart, Image, Globe, Compass } from 'lucide-react';
import { ProfileCard } from '@/components/apps/ProfileCard';
import { apps } from '@/components/apps/data/appsData';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickActions } from '@/components/apps/QuickActions';

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

  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

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

  // Quick actions for the home screen
  const quickActions = [
    { name: 'Wi-Fi', icon: Zap, color: 'bg-blue-600', description: 'Connect' },
    { name: 'Files', icon: Layout, color: 'bg-green-600', description: 'Browse & Share' },
    { name: 'Email', icon: Mail, color: 'bg-purple-600', description: 'Check Mail' },
    { name: 'Calendar', icon: Calendar, color: 'bg-red-500', description: 'Appointments' },
  ];

  // Weather data (mock)
  const weather = {
    temp: 72,
    condition: 'Partly Cloudy',
    icon: Cloud,
    high: 75,
    low: 65,
    location: 'New York',
  };

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

  return (
    <div className="flex flex-col h-full bg-white w-full overflow-hidden">
      {/* Use ProfileCard component */}
      <ProfileCard />

      {/* Weather widget */}
      <div className="mx-3 mb-4 mt-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-4 text-white shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{weather.location}</h3>
            <p className="text-3xl font-bold">{weather.temp}°</p>
            <p className="text-sm opacity-90">{weather.condition}</p>
          </div>
          <div className="flex flex-col items-center">
            <weather.icon size={40} className="mb-1" />
            <div className="flex space-x-2 text-xs">
              <span>H: {weather.high}°</span>
              <span>L: {weather.low}°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-3 mb-4">
        <h2 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h2>
        <QuickActions actions={quickActions} />
      </div>

      {/* Favorites Header */}
      <div className="border-b border-gray-200 mx-2">
        <div className="flex justify-between items-center px-3 py-2">
          <h1 className="text-xl font-semibold text-gray-800">Favorites</h1>
          <div className="flex space-x-4">
            {searchMode ? (
              <button 
                onClick={clearSearch}
                className="text-blue-500"
              >
                <X size={20} />
              </button>
            ) : (
              <button 
                onClick={() => setSearchMode(true)}
                className="text-blue-500"
              >
                <Search size={20} />
              </button>
            )}
            <button 
              onClick={() => setEditMode(!editMode)}
              className={`${editMode ? 'text-red-500' : 'text-blue-500'} text-sm font-medium`}
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
                  className="py-1 px-3 text-xs"
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
            <h2 className="text-sm font-medium text-gray-700 px-2 mb-2">Recently Used</h2>
            <div className="bg-gray-50 rounded-xl p-2">
              {recentApps.map(app => (
                <div key={app.id} className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
                  <div className={`${app.color} w-10 h-10 rounded-xl flex items-center justify-center mr-3`}>
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

        {/* Favorites Grid */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-4 gap-3">
            {filteredApps.map(app => (
              <div key={app.id} className="relative flex flex-col items-center">
                <div className={`${app.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-md`}>
                  <span className="text-white text-xl font-bold">{app.letter}</span>
                </div>
                <span className="mt-1 text-xs text-center truncate w-full">{app.name}</span>
                
                {/* Edit mode buttons */}
                {editMode && (
                  <button 
                    onClick={() => toggleFavorite(app.id)}
                    className="absolute -top-1 -left-1 bg-red-500 rounded-full p-1 shadow-md"
                  >
                    <X size={10} className="text-white" />
                  </button>
                )}
              </div>
            ))}
            
            {/* Add button (only in edit mode) */}
            {editMode && (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <Plus size={20} className="text-gray-400" />
                </div>
                <span className="mt-1 text-xs text-gray-500">Add</span>
              </div>
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
    </div>
  );
}
