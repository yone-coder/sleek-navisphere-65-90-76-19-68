import React, { useState, useEffect, useRef } from 'react';
import { Play, User, Clock, MessageCircle, Bell, Award, Users, Edit3, Star, Calendar, BadgeCheck, Eye, Zap, Tv, Sparkles, Flame, TrendingUp, BarChart2, BookOpen, ChevronRight } from 'lucide-react';
import WebinarComponent from '../components/seminar/WebinarComponent';
import WebinarInfoComponent from '../components/seminar/WebinarInfoComponent';
import EventCard from '../components/seminar/EventCard';
import { useLanguage } from '../contexts/LanguageContext';
import WebinarSchedule from '../components/seminar/WebinarSchedule';
import SeminarCommentsPanel from '../components/seminar/SeminarCommentsPanel';
import { Button } from '@/components/ui/button';

const SeminarHomepage = () => {
  const { t, language, setLanguage } = useLanguage();
  
  const [activeTab, setActiveTab] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [bottomPadding, setBottomPadding] = useState(0);
  const [viewsHovered, setViewsHovered] = useState(false);
  const [instructorDetailsExpanded, setInstructorDetailsExpanded] = useState(false);
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);
  const webinarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setLanguage('fr');
  }, [setLanguage]);
  
  useEffect(() => {
    if (activeTab === 0 && webinarRef.current) {
      const updatePadding = () => {
        const height = webinarRef.current?.offsetHeight || 0;
        setBottomPadding(height + 16);
      };
      
      updatePadding();
      
      window.addEventListener('resize', updatePadding);
      
      return () => {
        window.removeEventListener('resize', updatePadding);
      };
    }
  }, [activeTab]);
  
  const tabs = [
    { id: 0, name: t('seminar.tabs.video'), icon: <Play size={18} /> },
    { id: 1, name: t('seminar.tabs.subjects'), icon: <BookOpen size={18} /> },
    { id: 2, name: t('seminar.tabs.highlights'), icon: <Award size={18} /> },
    { id: 3, name: t('seminar.tabs.testimonials'), icon: <Users size={18} /> },
    { id: 4, name: t('seminar.tabs.register'), icon: <Edit3 size={18} /> }
  ];

  const toggleInstructorDetails = () => {
    setInstructorDetailsExpanded(!instructorDetailsExpanded);
  };

  const openCommentsPanel = () => {
    setIsCommentsPanelOpen(true);
  };

  const closeCommentsPanel = () => {
    setIsCommentsPanelOpen(false);
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto bg-gray-50 shadow-xl rounded-xl overflow-hidden">
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
      
      {activeTab === 0 && (
        <div className="bg-black">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <Play size={64} className="text-white opacity-80" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4">
            <h2 className="text-xl font-medium text-gray-900">
              Maîtriser le Développement Web Moderne : Des Bases aux Techniques Avancées
            </h2>
            
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
              <div 
                className="flex items-center flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2.5 py-1 rounded-full shadow-sm group hover:shadow-md transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setViewsHovered(true)}
                onMouseLeave={() => setViewsHovered(false)}
              >
                <Eye size={14} className={`mr-1 ${viewsHovered ? 'animate-pulse' : ''}`} />
                <span className="font-bold tracking-wide">125K</span>
                <span className="ml-0.5 text-xs">{t('seminar.video.views')}</span>
                
                {viewsHovered && (
                  <div className="ml-1.5 flex items-center animate-fade-in">
                    <TrendingUp size={12} className="text-green-200 mr-0.5" />
                    <span className="text-xs">+12%</span>
                  </div>
                )}
                
                <div className="ml-1.5 pl-1.5 border-l border-blue-300 hidden group-hover:flex items-center">
                  <BarChart2 size={10} className="mr-0.5 text-blue-200" />
                  <span className="text-xs font-medium">Top 5%</span>
                </div>
              </div>
              
              <div className="flex items-center flex-shrink-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2.5 py-1 rounded-full shadow-sm group hover:shadow-md transition-all duration-300">
                <Zap size={14} className="mr-1 group-hover:animate-ping" />
                <span className="font-semibold tracking-wide">8.2K</span>
                <span className="ml-0.5">interactions</span>
                
                <div className="hidden group-hover:flex items-center ml-1">
                  <Flame size={10} className="text-yellow-200 animate-pulse" />
                  <Sparkles size={10} className="ml-0.5 text-yellow-100" />
                </div>
              </div>
              
              <div className="flex items-center flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs px-2.5 py-1 rounded-full shadow-sm hover:from-blue-700 hover:to-blue-900 transition-all group">
                <Tv size={14} className="mr-1 group-hover:animate-pulse" />
                <span className="font-semibold tracking-wide">4K</span>
                <span className="ml-0.5 text-blue-200 hidden group-hover:inline">Ultra HD</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 0 && (
        <div className="bg-white px-4 md:px-6 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Qui sommes-nous</h3>
            <button 
              className="flex items-center text-blue-600 text-xs font-medium hover:text-blue-800 transition-colors"
              onClick={toggleInstructorDetails}
            >
              {instructorDetailsExpanded ? "Voir moins" : "Voir plus"}
              <ChevronRight className={`w-3 h-3 ml-0.5 transition-transform duration-300 ${instructorDetailsExpanded ? "rotate-90" : ""}`} />
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
          
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
            instructorDetailsExpanded ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-800 mb-3">Formateurs</h4>
              
              <div className="mb-4 flex items-start gap-3">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre" 
                  alt="Photo du formateur" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <h5 className="font-medium">Alexandre Martin</h5>
                  <p className="text-sm text-gray-600">Développeur senior avec 12 ans d'expérience dans le développement web. Expert en React, Node.js et architectures cloud.</p>
                  
                  <div className="flex gap-2 mt-2">
                    <a href="#" className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">LinkedIn</a>
                    <a href="#" className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Portfolio</a>
                  </div>
                </div>
              </div>
              
              <div className="mb-4 flex items-start gap-3">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie" 
                  alt="Photo de la formatrice" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <h5 className="font-medium">Sophie Dubois</h5>
                  <p className="text-sm text-gray-600">UX/UI Designer et développeuse frontend. Spécialisée dans les interfaces utilisateur modernes et l'expérience utilisateur.</p>
                  
                  <div className="flex gap-2 mt-2">
                    <a href="#" className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">Dribbble</a>
                    <a href="#" className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Twitter</a>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-3 mt-3">
                <h4 className="text-sm font-medium text-gray-800 mb-2">Nos liens</h4>
                <div className="flex flex-wrap gap-2">
                  <a href="#" className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Site Web</a>
                  <a href="#" className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">Instagram</a>
                  <a href="#" className="text-xs bg-blue-400 text-white px-2 py-1 rounded-full">Twitter</a>
                  <a href="#" className="text-xs bg-red-600 text-white px-2 py-1 rounded-full">YouTube</a>
                  <a href="#" className="text-xs bg-blue-800 text-white px-2 py-1 rounded-full">Facebook</a>
                </div>
              </div>
            </div>
          </div>
          
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
      
      <div className="flex-grow bg-white">
        {activeTab === 0 && (
          <div style={{ paddingBottom: `${bottomPadding}px` }}>
            <div className="w-full">
              <EventCard />
            </div>
            
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
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Témoignages de nos participants</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marie" alt="Marie" className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="font-medium">Marie Dubois</h4>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">Cette formation a complètement transformé ma façon d'aborder le développement web. Les techniques enseignées sont immédiatement applicables et m'ont permis d'améliorer significativement mes projets professionnels.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas" alt="Thomas" className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="font-medium">Thomas Martin</h4>
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                      {[5].map((star) => (
                        <Star key={star} size={14} className="text-gray-300" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">Excellente formation, à la fois théorique et pratique. J'apprécie particulièrement la qualité des supports pédagogiques et la disponibilité des formateurs pour répondre à nos questions spécifiques.</p>
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button 
                  onClick={openCommentsPanel}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <MessageCircle size={18} />
                  Voir tous les témoignages
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 4 && (
          <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            {t('seminar.register')}
          </div>
        )}
      </div>
      
      {activeTab === 0 && (
        <div ref={webinarRef} className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-2 px-2 z-40">
          <WebinarComponent openCommentsPanel={openCommentsPanel} />
        </div>
      )}
      
      <SeminarCommentsPanel isOpen={isCommentsPanelOpen} onClose={closeCommentsPanel} />
    </div>
  );
};

export default SeminarHomepage;
