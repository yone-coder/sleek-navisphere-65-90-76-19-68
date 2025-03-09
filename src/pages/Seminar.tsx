
import React, { useState, useEffect, useRef } from 'react';
import { Play, User, Clock, MessageCircle, Bell, Award, Users, Edit3, Star, Calendar, BadgeCheck, Eye, Zap, Tv, Sparkles, Flame, TrendingUp, BarChart2, BookOpen, ChevronRight } from 'lucide-react';
import WebinarComponent from '../components/seminar/WebinarComponent';
import WebinarInfoComponent from '../components/seminar/WebinarInfoComponent';
import EventCard from '../components/seminar/EventCard';
import { useLanguage } from '../contexts/LanguageContext';
import WebinarSchedule from '../components/seminar/WebinarSchedule';
import SeminarCommentsPanel from '../components/seminar/SeminarCommentsPanel';

const SeminarHomepage = () => {
  // Get language context
  const { t, language, setLanguage } = useLanguage();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState(0);
  // State for follow button
  const [isFollowing, setIsFollowing] = useState(false);
  // State for bottom padding
  const [bottomPadding, setBottomPadding] = useState(0);
  // State for views hover
  const [viewsHovered, setViewsHovered] = useState(false);
  // State for comments panel
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);
  // State for showing expanded instructor details
  const [showInstructorDetails, setShowInstructorDetails] = useState(false);
  
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
  
  // Tabs configuration - using the correct translation key for subjects
  const tabs = [
    { id: 0, name: t('seminar.tabs.video'), icon: <Play size={18} /> },
    { id: 1, name: t('seminar.tabs.subjects'), icon: <BookOpen size={18} /> },
    { id: 2, name: t('seminar.tabs.highlights'), icon: <Award size={18} /> },
    { id: 3, name: t('seminar.tabs.testimonials'), icon: <Users size={18} /> },
    { id: 4, name: t('seminar.tabs.register'), icon: <Edit3 size={18} /> }
  ];

  // Sample instructor data
  const instructors = [
    {
      name: "Jean Dupont",
      title: "Développeur Web Senior",
      bio: "Expert en développement frontend avec plus de 10 ans d'expérience. Passionné par React et l'écosystème JavaScript moderne.",
      social: {
        twitter: "https://twitter.com/jeandupont",
        linkedin: "https://linkedin.com/in/jeandupont",
        github: "https://github.com/jeandupont"
      }
    },
    {
      name: "Marie Laurent",
      title: "Architecte Logiciel",
      bio: "Spécialiste en architecture d'applications web scalables. Conférencière régulière sur les sujets de performance et d'optimisation.",
      social: {
        twitter: "https://twitter.com/marielaurent",
        linkedin: "https://linkedin.com/in/marielaurent"
      }
    }
  ];
  
  // Toggle comments panel
  const openCommentsPanel = () => {
    setIsCommentsPanelOpen(true);
  };

  const closeCommentsPanel = () => {
    setIsCommentsPanelOpen(false);
  };
  
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
            
            {/* Stat badges with improved layout */}
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
              {/* Views badge - adjusted size and responsive layout */}
              <div 
                className="flex items-center flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2.5 py-1 rounded-full shadow-sm group hover:shadow-md transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setViewsHovered(true)}
                onMouseLeave={() => setViewsHovered(false)}
              >
                <Eye size={14} className={`mr-1 ${viewsHovered ? 'animate-pulse' : ''}`} />
                <span className="font-bold tracking-wide">125K</span>
                <span className="ml-0.5 text-xs">{t('seminar.video.views')}</span>
                
                {/* Conditional expanded content */}
                {viewsHovered && (
                  <div className="ml-1.5 flex items-center animate-fade-in">
                    <TrendingUp size={12} className="text-green-200 mr-0.5" />
                    <span className="text-xs">+12%</span>
                  </div>
                )}
                
                {/* Hover expanded content */}
                <div className="ml-1.5 pl-1.5 border-l border-blue-300 hidden group-hover:flex items-center">
                  <BarChart2 size={10} className="mr-0.5 text-blue-200" />
                  <span className="text-xs font-medium">Top 5%</span>
                </div>
              </div>
              
              {/* Interactions badge - adjusted size and responsive layout */}
              <div className="flex items-center flex-shrink-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2.5 py-1 rounded-full shadow-sm group hover:shadow-md transition-all duration-300">
                <Zap size={14} className="mr-1 group-hover:animate-ping" />
                <span className="font-semibold tracking-wide">8.2K</span>
                <span className="ml-0.5">interactions</span>
                
                {/* Hover icons */}
                <div className="hidden group-hover:flex items-center ml-1">
                  <Flame size={10} className="text-yellow-200 animate-pulse" />
                  <Sparkles size={10} className="ml-0.5 text-yellow-100" />
                </div>
              </div>
              
              {/* 4K badge - adjusted size and responsive layout */}
              <div className="flex items-center flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs px-2.5 py-1 rounded-full shadow-sm hover:from-blue-700 hover:to-blue-900 transition-all group">
                <Tv size={14} className="mr-1 group-hover:animate-pulse" />
                <span className="font-semibold tracking-wide">4K</span>
                <span className="ml-0.5 text-blue-200 hidden group-hover:inline">Ultra HD</span>
              </div>
              
              {/* Comments button - opens the comments panel */}
              <button 
                onClick={openCommentsPanel}
                className="flex items-center flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2.5 py-1 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
              >
                <MessageCircle size={14} className="mr-1" />
                <span className="font-semibold tracking-wide">Commentaires</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Profile Section - Only shown for first tab */}
      {activeTab === 0 && (
        <div className="bg-white px-4 md:px-6 py-3 border-b border-gray-200">
          {/* "Qui sommes-nous" heading and "Voir plus" button at the top */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Qui sommes-nous</h3>
            <button 
              className="flex items-center text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors"
              onClick={() => setShowInstructorDetails(!showInstructorDetails)}
            >
              {showInstructorDetails ? "Voir moins" : "Voir plus"}
              <ChevronRight className={`w-3 h-3 ml-0.5 transition-transform duration-300 ${showInstructorDetails ? 'rotate-90' : ''}`} />
            </button>
          </div>
          
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
              <p className="text-sm text-gray-500">{t('seminar.academy.description')}</p>
            </div>
          </div>
          
          {/* Instructor details - conditionally shown */}
          <div 
            className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
              showInstructorDetails ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-200">
              <h4 className="font-medium text-gray-800">Nos instructeurs</h4>
              
              <div className="space-y-4">
                {instructors.map((instructor, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium">{instructor.name}</h5>
                      <p className="text-sm text-blue-600">{instructor.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{instructor.bio}</p>
                      
                      <div className="flex gap-2 mt-2">
                        {instructor.social.twitter && (
                          <a href={instructor.social.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                        )}
                        {instructor.social.linkedin && (
                          <a href={instructor.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        )}
                        {instructor.social.github && (
                          <a href={instructor.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-2 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">Liens utiles</h4>
                <div className="grid grid-cols-2 gap-2">
                  <a href="https://www.byteacademy.fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
                    <Globe size={14} className="mr-1" /> Site Web
                  </a>
                  <a href="https://www.facebook.com/byteacademy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
                    <Facebook size={14} className="mr-1" /> Facebook
                  </a>
                  <a href="https://www.youtube.com/byteacademy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
                    <Youtube size={14} className="mr-1" /> YouTube
                  </a>
                  <a href="https://www.instagram.com/byteacademy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
                    <Instagram size={14} className="mr-1" /> Instagram
                  </a>
                </div>
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
      <div className="flex-grow bg-white">
        {/* Each tab has an empty container */}
        {activeTab === 0 && (
          <div style={{ paddingBottom: `${bottomPadding}px` }}>
            {/* EventCard component - full width with no padding */}
            <div className="w-full">
              <EventCard />
            </div>
            
            {/* WebinarInfoComponent - also full width */}
            <div className="w-full">
              <WebinarInfoComponent />
            </div>
          </div>
        )}
        
        {activeTab === 1 && (
          <div className="w-full p-4">
            <WebinarSchedule />
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
            <div className="mt-4">
              <button 
                onClick={openCommentsPanel}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Voir les témoignages
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 4 && (
          <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            {t('seminar.register')}
          </div>
        )}
      </div>
      
      {/* Comments Panel */}
      <SeminarCommentsPanel 
        isOpen={isCommentsPanelOpen}
        onClose={closeCommentsPanel}
      />
      
      {/* Fixed WebinarComponent at the bottom only for video tab - adjusted positioning and size */}
      {activeTab === 0 && (
        <div ref={webinarRef} className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-2 px-2 z-40">
          <WebinarComponent />
        </div>
      )}
    </div>
  );
};

// Add missing icon imports
const Globe = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const Facebook = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Youtube = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const Instagram = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default SeminarHomepage;
