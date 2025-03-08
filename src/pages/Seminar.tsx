import React, { useState, useEffect, useRef } from 'react';
import { Play, User, Clock, MessageCircle, Bell, Award, Users, Edit3, Star, Calendar, BadgeCheck, Eye, Zap } from 'lucide-react';
import WebinarComponent from '../components/seminar/WebinarComponent';
import WebinarInfoComponent from '../components/seminar/WebinarInfoComponent';
import { useLanguage } from '../contexts/LanguageContext';

const SeminarHomepage = () => {
  // Get language context
  const { t, language, setLanguage } = useLanguage();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState(0);
  // State for follow button
  const [isFollowing, setIsFollowing] = useState(false);
  // State for bottom padding
  const [bottomPadding, setBottomPadding] = useState(0);
  // Ref for the WebinarComponent
  const webinarRef = useRef<HTMLDivElement>(null);
  
  // Effect to set language to French
  useEffect(() => {
    setLanguage('fr');
  }, [setLanguage]);
  
  // Effect to measure and set the bottom padding based on WebinarComponent height
  useEffect(() => {
    if (activeTab === 0 && webinarRef.current) {
      const updatePadding = () => {
        const height = webinarRef.current?.offsetHeight || 0;
        setBottomPadding(height + 16); // Add 16px extra for spacing
      };
      
      // Initial measurement
      updatePadding();
      
      // Update on resize
      window.addEventListener('resize', updatePadding);
      
      return () => {
        window.removeEventListener('resize', updatePadding);
      };
    }
  }, [activeTab]);
  
  // Tabs configuration
  const tabs = [
    { id: 0, name: t('seminar.tabs.video'), icon: <Play size={18} /> },
    { id: 1, name: t('seminar.tabs.speakers'), icon: <User size={18} /> },
    { id: 2, name: t('seminar.tabs.highlights'), icon: <Award size={18} /> },
    { id: 3, name: t('seminar.tabs.testimonials'), icon: <Users size={18} /> },
    { id: 4, name: t('seminar.tabs.register'), icon: <Edit3 size={18} /> }
  ];
  
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto bg-gray-50 shadow-xl rounded-xl overflow-hidden">
      {/* Tab Navigation - Properly fixed to the top with higher z-index */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-md">
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
      
      {/* Video Section - Replaces the Hero Banner */}
      {activeTab === 0 && (
        <div className="bg-black">
          {/* Video Player */}
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <Play size={64} className="text-white opacity-80" />
              </div>
            </div>
          </div>
          
          {/* Video Title and Stats - YouTube-like */}
          <div className="bg-white p-4">
            <h2 className="text-xl font-medium text-gray-900">
              Maîtriser le Développement Web Moderne : Des Bases aux Techniques Avancées
            </h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">4K</span>
              <div className="flex items-center">
                <Eye size={16} className="mr-1" />
                <span>125K {t('seminar.video.views')}</span>
              </div>
              <div className="flex items-center">
                <Zap size={16} className="mr-1 text-yellow-500" />
                <span>8.2K interactions</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Profile Section - Only shown for first tab */}
      {activeTab === 0 && (
        <div className="bg-white px-4 md:px-6 py-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <img 
                src="/api/placeholder/64/64" 
                alt="Byte Academy Logo" 
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
              />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-lg font-bold text-gray-900 truncate">{t('seminar.academy.name')}</h2>
                  <BadgeCheck className="w-4 h-4 text-blue-500" />
                </div>
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-full transition ${
                    isFollowing 
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isFollowing ? t('seminar.academy.following') : t('seminar.academy.follow')}
                </button>
              </div>
              
              <div className="text-sm text-gray-500 mt-0.5">
                <p>{t('seminar.academy.description')}</p>
              </div>
            </div>
          </div>
          
          {/* Stats section */}
          <div className="mt-3 -mx-4 md:-mx-6 px-4 md:px-6 py-3 bg-gray-50 border-t border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-700">
                <Users size={16} className="mr-1 text-gray-500" />
                <span>126.5K {t('seminar.academy.followers')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Calendar size={16} className="mr-1 text-gray-500" />
                <span>87 {t('seminar.academy.seminars')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Star size={16} className="mr-1 text-yellow-500" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-700">
            {t('seminar.description')}
          </div>
        </div>
      )}
      
      {/* Tab Content Container */}
      <div className="flex-grow bg-white p-6">
        {/* Each tab has an empty container */}
        {activeTab === 0 && (
          <div style={{ paddingBottom: `${bottomPadding}px` }}>
            {/* Add WebinarInfoComponent at the end of the video tab - now truly full width */}
            <div className="mt-8 -mx-6 w-[calc(100%+3rem)]">
              <WebinarInfoComponent />
            </div>
          </div>
        )}
        
        {activeTab === 1 && (
          <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            {t('seminar.speakers')}
          </div>
        )}
        
        {activeTab === 2 && (
          <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            {t('seminar.highlights')}
          </div>
        )}
        
        {activeTab === 3 && (
          <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            {t('seminar.testimonials')}
          </div>
        )}
        
        {activeTab === 4 && (
          <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            {t('seminar.register')}
          </div>
        )}
      </div>
      
      {/* Fixed WebinarComponent at the bottom only for video tab - adjusted positioning and size */}
      {activeTab === 0 && (
        <div ref={webinarRef} className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-2 px-2 z-40">
          <WebinarComponent />
        </div>
      )}
    </div>
  );
};

export default SeminarHomepage;
