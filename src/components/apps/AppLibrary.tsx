
import React, { useState } from 'react';
import { Search, Grid, List, ChevronDown, X, Plus, Settings } from 'lucide-react';

const AppLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [activeCategory, setActiveCategory] = useState(null);
  const [showAlphabetical, setShowAlphabetical] = useState(false);
  const [focusedApp, setFocusedApp] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  // App categories with their respective apps
  const categories = [
    {
      name: 'Productivity & Finance',
      apps: [
        { name: 'Mail', color: 'bg-blue-500', icon: '✉️' },
        { name: 'Calendar', color: 'bg-white', icon: '📅' },
        { name: 'Notes', color: 'bg-yellow-200', icon: '📝' },
        { name: 'Wallet', color: 'bg-black', icon: '💳' }
      ]
    },
    {
      name: 'Social',
      apps: [
        { name: 'Messages', color: 'bg-green-500', icon: '💬' },
        { name: 'Instagram', color: 'bg-gradient-to-tr from-purple-600 to-pink-400', icon: '📷' },
        { name: 'Twitter', color: 'bg-blue-400', icon: '🐦' },
        { name: 'WhatsApp', color: 'bg-green-600', icon: '📱' }
      ]
    },
    {
      name: 'Entertainment',
      apps: [
        { name: 'Music', color: 'bg-red-500', icon: '🎵' },
        { name: 'TV', color: 'bg-blue-800', icon: '📺' },
        { name: 'Podcasts', color: 'bg-purple-500', icon: '🎙️' },
        { name: 'YouTube', color: 'bg-red-600', icon: '▶️' }
      ]
    },
    {
      name: 'Utilities',
      apps: [
        { name: 'Settings', color: 'bg-gray-600', icon: '⚙️' },
        { name: 'Camera', color: 'bg-black', icon: '📸' },
        { name: 'Clock', color: 'bg-black', icon: '🕒' },
        { name: 'Calculator', color: 'bg-orange-500', icon: '🔢' }
      ]
    },
    {
      name: 'Health & Fitness',
      apps: [
        { name: 'Health', color: 'bg-red-400', icon: '❤️' },
        { name: 'Fitness', color: 'bg-green-400', icon: '🏃‍♂️' },
        { name: 'Meditation', color: 'bg-blue-300', icon: '🧘‍♀️' },
        { name: 'Sleep', color: 'bg-indigo-600', icon: '😴' }
      ]
    },
    {
      name: 'Games',
      apps: [
        { name: 'Arcade', color: 'bg-red-600', icon: '🎮' },
        { name: 'Minecraft', color: 'bg-green-800', icon: '⛏️' },
        { name: 'Roblox', color: 'bg-red-500', icon: '🟥' },
        { name: 'Sudoku', color: 'bg-blue-600', icon: '🧩' }
      ]
    },
    {
      name: 'Recently Added',
      apps: [
        { name: 'Weather', color: 'bg-gradient-to-b from-blue-400 to-blue-600', icon: '☀️' },
        { name: 'Maps', color: 'bg-green-200', icon: '🗺️' },
        { name: 'Books', color: 'bg-orange-400', icon: '📚' },
        { name: 'Files', color: 'bg-blue-700', icon: '📁' }
      ]
    },
    {
      name: 'Suggestions',
      apps: [
        { name: 'App Store', color: 'bg-blue-500', icon: '🅰️' },
        { name: 'Photos', color: 'bg-gradient-to-b from-pink-400 to-purple-600', icon: '🖼️' },
        { name: 'Shortcuts', color: 'bg-gradient-to-r from-red-500 to-purple-500', icon: '⚡' },
        { name: 'Safari', color: 'bg-gradient-to-r from-blue-400 to-blue-600', icon: '🧭' }
      ]
    }
  ];
  
  // Filter apps based on search query
  const filteredApps = searchQuery ? 
    categories.flatMap(category => 
      category.apps.filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).map(app => ({ ...app, category: category.name }))
    ) : [];
  
  // Get all apps for alphabetical view
  const allApps = categories.flatMap(category => 
    category.apps.map(app => ({ ...app, category: category.name }))
  ).sort((a, b) => a.name.localeCompare(b.name));
  
  // Group apps alphabetically
  const alphabeticalGroups = allApps.reduce((groups, app) => {
    const firstLetter = app.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(app);
    return groups;
  }, {});
  
  // Get unique first letters for alphabetical section headers
  const letters = Object.keys(alphabeticalGroups).sort();
  
  // Handle long press on app icon
  const handleAppLongPress = (app) => {
    setFocusedApp(app);
    setEditMode(true);
  };
  
  // Close app details modal
  const closeAppDetails = () => {
    setFocusedApp(null);
    setEditMode(false);
  };
  
  // Render app icon with optional edit mode
  const AppIcon = ({ app, showCategory = false }) => (
    <div 
      className="flex flex-col items-center relative"
      onClick={() => editMode ? handleAppLongPress(app) : null}
    >
      {editMode && (
        <div className="absolute -top-1 -left-1 z-10 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <X className="w-3 h-3 text-white" />
        </div>
      )}
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-1 ${app.color} ${editMode ? 'animate-pulse' : ''}`}>
        <span className="text-lg">{app.icon}</span>
      </div>
      <span className="text-xs">{app.name}</span>
      {showCategory && (
        <span className="text-xs text-gray-500">{app.category}</span>
      )}
    </div>
  );
  
  // Render category folder
  const CategoryFolder = ({ category }) => (
    <div 
      className="flex flex-col items-center"
      onClick={() => setActiveCategory(category)}
    >
      <div className="w-full aspect-square rounded-2xl bg-black bg-opacity-5 p-2 mb-1 relative overflow-hidden hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer">
        <div className="grid grid-cols-2 gap-1 h-full">
          {category.apps.slice(0, 4).map((app, index) => (
            <div key={index} className={`flex items-center justify-center ${app.color} rounded-lg`}>
              <span>{app.icon}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-20 text-white text-xs py-1 px-2 truncate text-center">
          {category.name}
        </div>
      </div>
    </div>
  );
  
  // Render category detail view
  const CategoryDetail = ({ category }) => (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <button 
          className="text-blue-500 text-sm flex items-center" 
          onClick={() => setActiveCategory(null)}
        >
          <ChevronDown className="h-4 w-4 mr-1" />
          Back
        </button>
        <h2 className="text-base font-medium">{category.name}</h2>
        <div className="w-16"></div> {/* Empty space for balance */}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <div className="grid grid-cols-4 gap-6">
          {category.apps.map((app, index) => (
            <AppIcon key={index} app={app} />
          ))}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-1 bg-gray-200 text-gray-500">
              <Plus className="h-6 w-6" />
            </div>
            <span className="text-xs">Add App</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render app detail modal
  const AppDetailModal = ({ app }) => (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-64 overflow-hidden">
        <div className="p-4 flex items-center">
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl mr-3 ${app.color}`}>
            <span className="text-lg">{app.icon}</span>
          </div>
          <div>
            <h3 className="font-medium">{app.name}</h3>
            <p className="text-xs text-gray-500">{app.category}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200">
          <button className="w-full py-3 text-center text-blue-500 hover:bg-blue-50">
            Open
          </button>
        </div>
        
        <div className="border-t border-gray-200">
          <button className="w-full py-3 text-center text-red-500 hover:bg-red-50">
            Remove from Library
          </button>
        </div>
        
        <div className="border-t border-gray-200">
          <button 
            className="w-full py-3 text-center text-gray-500 hover:bg-gray-50"
            onClick={closeAppDetails}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-md mx-auto bg-gray-100 rounded-2xl overflow-hidden shadow-lg h-full min-h-96 max-h-screen flex flex-col relative">
      {focusedApp && <AppDetailModal app={focusedApp} />}
      
      {/* Top bar with search and toggle views */}
      <div className="px-4 pt-6 pb-2 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <button 
            className={`px-2 py-1 rounded-lg ${showAlphabetical ? 'bg-gray-200' : 'bg-transparent'}`}
            onClick={() => setShowAlphabetical(!showAlphabetical)}
          >
            {showAlphabetical ? 'Category View' : 'A-Z View'}
          </button>
          
          <div className="flex space-x-2">
            <button 
              className={`p-1 rounded-lg ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-transparent'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              className={`p-1 rounded-lg ${viewMode === 'list' ? 'bg-gray-200' : 'bg-transparent'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              className={`p-1 rounded-lg ${editMode ? 'bg-blue-500 text-white' : 'bg-transparent'}`}
              onClick={() => setEditMode(!editMode)}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 bg-gray-200 rounded-xl text-sm focus:outline-none"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* App grid or search results */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {searchQuery ? (
          <div>
            <h3 className="text-xs font-medium text-gray-500 mb-2">Search Results</h3>
            <div className={viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'space-y-2'}>
              {filteredApps.length > 0 ? (
                viewMode === 'grid' ? (
                  filteredApps.map((app, index) => (
                    <AppIcon key={index} app={app} showCategory={true} />
                  ))
                ) : (
                  filteredApps.map((app, index) => (
                    <div key={index} className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl mr-3 ${app.color}`}>
                        <span>{app.icon}</span>
                      </div>
                      <div>
                        <div className="text-sm">{app.name}</div>
                        <div className="text-xs text-gray-500">{app.category}</div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                <div className="col-span-4 text-center py-4 text-gray-500">
                  No apps found
                </div>
              )}
            </div>
          </div>
        ) : activeCategory ? (
          <CategoryDetail category={activeCategory} />
        ) : showAlphabetical ? (
          <div className="space-y-4">
            {letters.map(letter => (
              <div key={letter}>
                <h3 className="text-lg font-medium sticky top-0 bg-gray-100 py-1">{letter}</h3>
                <div className={viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'space-y-2'}>
                  {alphabeticalGroups[letter].map((app, index) => (
                    viewMode === 'grid' ? (
                      <AppIcon key={index} app={app} />
                    ) : (
                      <div key={index} className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl mr-3 ${app.color}`}>
                          <span>{app.icon}</span>
                        </div>
                        <div>
                          <div className="text-sm">{app.name}</div>
                          <div className="text-xs text-gray-500">{app.category}</div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-2'}>
            {viewMode === 'grid' ? (
              categories.map((category, index) => (
                <CategoryFolder key={index} category={category} />
              ))
            ) : (
              categories.map((category, index) => (
                <div 
                  key={index} 
                  className="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
                  onClick={() => setActiveCategory(category)}
                >
                  <div className="w-10 h-10 mr-3 rounded-lg bg-gray-200 grid grid-cols-2 gap-1 p-1 overflow-hidden">
                    {category.apps.slice(0, 4).map((app, idx) => (
                      <div key={idx} className={`flex items-center justify-center ${app.color} rounded-sm`}>
                        <span className="text-xs">{app.icon}</span>
                      </div>
                    ))}
                  </div>
                  <span>{category.name}</span>
                  <ChevronDown className="h-4 w-4 ml-auto text-gray-400" />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppLibrary;
