
import React, { useState } from 'react';
import { Play, User, Clock, MessageCircle, Bell, Award, Users, Edit3, Star, Calendar, ThumbsUp } from 'lucide-react';

const SeminarHomepage = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState(0);
  // State for follow button
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Tabs configuration
  const tabs = [
    { id: 0, name: "Video", icon: <Play size={18} /> },
    { id: 1, name: "Speakers", icon: <User size={18} /> },
    { id: 2, name: "Highlights", icon: <Award size={18} /> },
    { id: 3, name: "Testimonials", icon: <Users size={18} /> },
    { id: 4, name: "Register", icon: <Edit3 size={18} /> }
  ];
  
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto bg-gray-50 shadow-xl rounded-xl overflow-hidden">
      {/* Tab Navigation - Fixed and sticky */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="flex overflow-x-auto py-2 px-4 gap-1 no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center whitespace-nowrap px-5 py-2 rounded-lg font-medium transition ${
                activeTab === tab.id 
                ? "bg-blue-100 text-blue-800" 
                : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Hero Section (Banner) - Only shown for first tab */}
      {activeTab === 0 && (
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/api/placeholder/1200/400" 
              alt="Seminar background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/60"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center px-8">
            <h1 className="text-3xl font-medium text-white">Future of Innovation Seminar 2025</h1>
          </div>
        </div>
      )}
      
      {/* Enhanced Profile Section - Only shown for first tab */}
      {activeTab === 0 && (
        <div className="bg-white px-4 md:px-6 py-4 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img 
                src="/api/placeholder/64/64" 
                alt="Byte Academy Logo" 
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
              />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 truncate">Byte Academy</h2>
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-5 py-2 text-sm font-semibold rounded-full transition ${
                    isFollowing 
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
              
              <div className="text-sm text-gray-500 mt-1">
                <p className="font-medium">Future of Innovation Seminar 2025</p>
              </div>
            </div>
          </div>
          
          {/* Full width stats section */}
          <div className="mt-3 -mx-4 md:-mx-6 px-4 md:px-6 py-3 bg-gray-50 border-t border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-700">
                <Users size={16} className="mr-1 text-gray-500" />
                <span>126.5K foll.</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Calendar size={16} className="mr-1 text-gray-500" />
                <span>87 sémi.</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Star size={16} className="mr-1 text-yellow-500" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-700">
            Join industry leaders for this exclusive 3-day event focused on emerging technologies, innovation strategies, and future business trends. March 15-17, 2025.
          </div>
        </div>
      )}
      
      {/* Tab Content Container - Empty content areas for each tab */}
      <div className="flex-grow bg-white p-6">
        {/* Each tab has an empty container */}
        {activeTab === 0 && (
          <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            Video content area
          </div>
        )}
        
        {activeTab === 1 && (
          <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            Speakers content area
          </div>
        )}
        
        {activeTab === 2 && (
          <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            Highlights content area
          </div>
        )}
        
        {activeTab === 3 && (
          <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            Testimonials content area
          </div>
        )}
        
        {activeTab === 4 && (
          <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            Registration content area
          </div>
        )}
      </div>
    </div>
  );
};

export default SeminarHomepage;
