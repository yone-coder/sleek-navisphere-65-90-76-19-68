
import React, { useState } from 'react';
import { Heart, X, Search, Settings, Plus } from 'lucide-react';
import { ProfileCard } from '@/components/apps/ProfileCard';

export function HomeTab() {
  // App data with name, icon color, and letter representation
  const [apps, setApps] = useState([
    { id: 1, name: 'Messages', color: 'bg-green-500', letter: 'M', favorite: true },
    { id: 2, name: 'Photos', color: 'bg-pink-500', letter: 'P', favorite: true },
    { id: 3, name: 'Maps', color: 'bg-blue-500', letter: 'M', favorite: true },
    { id: 4, name: 'Music', color: 'bg-red-500', letter: 'M', favorite: true },
    { id: 5, name: 'Weather', color: 'bg-yellow-500', letter: 'W', favorite: true },
    { id: 6, name: 'Notes', color: 'bg-amber-400', letter: 'N', favorite: true },
    { id: 7, name: 'Calendar', color: 'bg-purple-500', letter: 'C', favorite: true },
    { id: 8, name: 'Clock', color: 'bg-orange-500', letter: 'C', favorite: true },
    { id: 9, name: 'Camera', color: 'bg-gray-700', letter: 'C', favorite: true },
  ]);

  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Filter for favorites and by search term if active
  const filteredApps = apps.filter(app => 
    app.favorite && 
    (!searchMode || app.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setApps(apps.map(app => 
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
    <div className="flex flex-col h-full bg-white max-w-md mx-auto overflow-hidden">

      {/* Use ProfileCard component instead of the custom profile section */}
      <ProfileCard />

      {/* Header - Clean, no card */}
      <div className="border-b border-gray-200">
        <div className="flex justify-between items-center px-6 py-4">
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
          <div className="mt-3 relative">
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 bg-gray-200 rounded-lg pl-8 text-sm"
            />
            <Search size={16} className="absolute left-2 top-2.5 text-gray-500" />
          </div>
        )}
      </div>

      {/* App grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {filteredApps.map(app => (
              <div key={app.id} className="relative flex flex-col items-center">
                <div className={`${app.color} w-16 h-16 rounded-xl flex items-center justify-center shadow-md`}>
                  <span className="text-white text-2xl font-bold">{app.letter}</span>
                </div>
                <span className="mt-1 text-xs text-center">{app.name}</span>
                
                {/* Edit mode buttons */}
                {editMode && (
                  <button 
                    onClick={() => toggleFavorite(app.id)}
                    className="absolute -top-2 -left-2 bg-red-500 rounded-full p-1 shadow-md"
                  >
                    <X size={12} className="text-white" />
                  </button>
                )}
              </div>
            ))}
            
            {/* Add button (only in edit mode) */}
            {editMode && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <Plus size={24} className="text-gray-400" />
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
