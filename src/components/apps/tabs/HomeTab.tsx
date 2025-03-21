
import React, { useState } from 'react';
import { Heart, X, Search, Settings, Plus } from 'lucide-react';
import { ProfileCard } from '@/components/apps/ProfileCard';
import { apps } from '@/components/apps/data/appsData';

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

  return (
    <div className="flex flex-col h-full bg-white w-full overflow-hidden">
      {/* Use ProfileCard component */}
      <ProfileCard />

      {/* Header - Clean, no card */}
      <div className="border-b border-gray-200">
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
