import React, { useState, useEffect, useRef } from 'react';
import { Play, User, Clock, MessageCircle, Bell, Award, Users, Edit3, Star, Calendar, BadgeCheck, Eye, Zap, Tv, Sparkles, Flame, TrendingUp, BarChart2, BookOpen, ChevronRight, HelpCircle, ThumbsUp, ThumbsDown, Share2, MessageSquare, BookmarkPlus, Menu, Bookmark, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WebinarComponent from '../components/seminar/WebinarComponent';
import WebinarInfoComponent from '../components/seminar/WebinarInfoComponent';
import EventCard from '../components/seminar/EventCard';
import { useLanguage } from '../contexts/LanguageContext';
import WebinarSchedule from '../components/seminar/WebinarSchedule';
import TikTokCommentsPanel from '../components/comments/TikTokCommentsPanel';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const SeminarHomepage = () => {
  // Get language context
  const { t, language, setLanguage } = useLanguage();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState(0);
  const [bottomPadding, setBottomPadding] = useState(0);
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);
  const [activeCommentsTab, setActiveCommentsTab] = useState('comments');
  const [showDescription, setShowDescription] = useState(false);
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
        setBottomPadding(height + 16); // Reduced padding since follow button is now at top
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
  
  const handleTestimonialsClick = () => {
    setActiveCommentsTab('testimonials');
    setIsCommentsPanelOpen(true);
  };

  const handleFAQsClick = () => {
    setActiveCommentsTab('faqs');
    setIsCommentsPanelOpen(true);
  };

  const handleCommentsClick = () => {
    setActiveCommentsTab('comments');
    setIsCommentsPanelOpen(true);
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
      
      {/* YouTube-Style Video Page */}
      {activeTab === 0 && (
        <div className="bg-white">
          {/* Video Player Section */}
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="w-full h-full bg-gray-800 flex items-center justify-center cursor-pointer">
                <Play size={64} className="text-white opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
          
          {/* Video Info and Actions Section */}
          <div className="p-4">
            {/* Title and Views */}
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              Maîtriser le Développement Web Moderne : Des Bases aux Techniques Avancées
            </h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>125K vues</span>
              <span className="mx-1">•</span>
              <span>Diffusé il y a 2 jours</span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 py-2 border-t border-b border-gray-100">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <ThumbsUp size={16} />
                <span>12K</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <ThumbsDown size={16} />
                <span>243</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={handleCommentsClick}>
                <MessageSquare size={16} />
                <span>Commentaires</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Share2 size={16} />
                <span>Partager</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Bookmark size={16} />
                <span>Enregistrer</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center">
                <MoreVertical size={16} />
              </Button>
            </div>
          </div>
          
          {/* Channel Info with WebinarInfoComponent - Only include this profile section, remove duplicates */}
          <WebinarInfoComponent />
          
          {/* Video Description Section */}
          <div className="p-4 border-b border-gray-100">
            <div className={`${showDescription ? '' : 'max-h-20 overflow-hidden'} relative`}>
              <div className="text-sm text-gray-700 whitespace-pre-line">
                <p className="mb-2"><strong>Découvrez les dernières avancées en développement web dans ce séminaire intensif</strong></p>
                <p className="mb-2">Dans ce séminaire, nous aborderons les technologies modernes du développement web, de la conception responsive aux frameworks JavaScript avancés. Idéal pour les débutants comme pour les professionnels souhaitant mettre à jour leurs compétences.</p>
                <p className="mb-2">🔹 React et l'écosystème moderne<br />🔹 Optimisation des performances<br />🔹 TypeScript pour des applications robustes<br />🔹 Architecture microservices<br />🔹 Tests automatisés et déploiement continu</p>
                <p className="mb-2">Rejoignez-nous pour approfondir vos compétences et rester à la pointe de l'innovation web.</p>
                <p className="text-xs text-gray-500 mt-4">Publié le 15 avril 2023 • #développement #web #javascript #react</p>
              </div>
              
              {!showDescription && (
                <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-1 w-full justify-center"
              onClick={() => setShowDescription(!showDescription)}
            >
              {showDescription ? "Afficher moins" : "... Plus"}
            </Button>
          </div>
          
          {/* Comments Preview */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Commentaires <span className="text-gray-500 text-sm">8.2K</span></h3>
              <Button variant="ghost" size="sm" onClick={handleCommentsClick}>
                Voir tous
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">@user1</span>
                    <span className="text-xs text-gray-500">il y a 2 jours</span>
                  </div>
                  <p className="text-sm text-gray-700">Ce séminaire a changé ma carrière ! J'ai pu décrocher un emploi en tant que développeur juste après l'avoir terminé.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>DP</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">@devpro</span>
                    <BadgeCheck className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-gray-500">il y a 1 jour</span>
                  </div>
                  <p className="text-sm text-gray-700">L'instructeur connaît parfaitement le sujet. Très impressionné par la qualité du contenu !</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Up Next / Related Videos */}
          <div className="p-4">
            <h3 className="font-medium mb-4">À suivre</h3>
            
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative rounded overflow-hidden w-40 h-20 flex-shrink-0">
                    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                      <Play size={24} className="text-white" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                      45:12
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">Les bases de TypeScript pour le développement web moderne</h4>
                    <p className="text-xs text-gray-500 mt-1">Académie Byte</p>
                    <p className="text-xs text-gray-500">89K vues • il y a 3 semaines</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Subjects Tab - Making it full width */}
      {activeTab === 1 && (
        <div className="w-full p-4">
          <WebinarSchedule />
        </div>
      )}
      
      {/* Other Tab Contents - Keep Unchanged */}
      {activeTab === 2 && (
        <div className="p-4 border border-gray-200 rounded-lg text-center text-gray-500">
          {t('seminar.highlights')}
        </div>
      )}
      
      {activeTab === 3 && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('seminar.tabs.testimonials')}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestimonialsClick}
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              {t('seminar.viewAllTestimonials')}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {/* Sample testimonials - we're showing just a few here */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex-shrink-0 flex items-center justify-center mr-3">
                  <span className="text-xs font-bold text-white">LE</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-sm">@learner1</h4>
                    <span className="ml-2 flex items-center text-yellow-500">
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                    </span>
                  </div>
                  <p className="text-sm mt-1">This seminar changed my career! I was able to get a job as a developer right after completing it.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex-shrink-0 flex items-center justify-center mr-3">
                  <span className="text-xs font-bold text-white">DP</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-sm">@devpro</h4>
                    <span className="inline-block rounded-full bg-blue-500 p-0.5 text-white ml-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className="ml-2 flex items-center text-yellow-500">
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                      <Star size={14} className="fill-current" />
                    </span>
                  </div>
                  <p className="text-sm mt-1">The instructor knows the subject matter deeply. Very impressed with the quality of content!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 4 && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('seminar.register')}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleFAQsClick}
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              <HelpCircle className="mr-1 h-4 w-4" />
              {t('seminar.viewFAQs')}
            </Button>
          </div>
          <div className="border border-gray-200 rounded-lg text-center text-gray-500 p-4">
            {t('seminar.register')}
          </div>
        </div>
      )}
      
      {/* Fixed WebinarComponent at the bottom only for video tab - fully transparent without border */}
      {activeTab === 0 && (
        <div ref={webinarRef} className="fixed bottom-0 left-0 right-0 bg-transparent py-2 px-2 z-40">
          <WebinarComponent onOpenComments={() => setIsCommentsPanelOpen(true)} />
        </div>
      )}
      
      {/* TikTok Comments Panel */}
      <TikTokCommentsPanel 
        isOpen={isCommentsPanelOpen} 
        onClose={() => setIsCommentsPanelOpen(false)}
        initialTab={activeCommentsTab} 
      />
    </div>
  );
};

export default SeminarHomepage;
