import React, { useState, useEffect, useRef } from 'react';
import { Play, User, Clock, MessageCircle, Bell, Award, Users, Edit3, Star, Calendar, BadgeCheck, Eye, Zap, Tv, Sparkles, Flame, TrendingUp, BarChart2, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';
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
import { useToast } from "@/hooks/use-toast";

const SeminarHomepage = () => {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState(0);
  const [bottomPadding, setBottomPadding] = useState(0);
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);
  const [activeCommentsTab, setActiveCommentsTab] = useState('comments');
  const [showDescription, setShowDescription] = useState(false);
  const webinarRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [videoHeight, setVideoHeight] = useState(0);
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  
  useEffect(() => {
    setLanguage('fr');
  }, [setLanguage]);
  
  useEffect(() => {
    if (videoContainerRef.current) {
      setVideoHeight(videoContainerRef.current.offsetHeight);
    }
    
    const handleResize = () => {
      if (videoContainerRef.current) {
        setVideoHeight(videoContainerRef.current.offsetHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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
    { id: 1, name: "Programme", icon: <Calendar size={18} /> },
    { id: 2, name: "Participants", icon: <Users size={18} /> }
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
  
  const toggleRegister = () => {
    const newRegisteredState = !isRegistered;
    setIsRegistered(newRegisteredState);
    
    if (newRegisteredState) {
      toast({
        title: t('seminar.notifications.registered') || "Registered!",
        description: t('seminar.notifications.registeredDescription') || "You've successfully registered for this seminar",
      });
    } else {
      toast({
        title: t('seminar.notifications.unregistered') || "Unregistered",
        description: t('seminar.notifications.unregisteredDescription') || "You've unregistered from this seminar",
      });
    }
  };
  
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto bg-gray-50 shadow-xl rounded-xl">
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
      
      <div className="flex-1">
        {activeTab === 0 && (
          <div className="relative">
            <div 
              ref={videoContainerRef}
              className="sticky top-14 z-40 w-full bg-black"
            >
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            
            <div className="bg-white">
              <div className="p-4">
                <h1 className="text-xl font-bold text-gray-900 mb-1">
                  Maîtriser le Développement Web Moderne : Des Bases aux Techniques Avancées
                </h1>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>125K vues</span>
                  <span className="mx-1">•</span>
                  <span>Diffusé il y a 2 jours</span>
                </div>
                
                <WebinarInfoComponent />
                
                <div ref={webinarRef} className="mb-4">
                  <WebinarComponent onOpenComments={() => setIsCommentsPanelOpen(true)} />
                </div>
                
                <div className="mt-2 mb-4">
                  <Button
                    onClick={toggleRegister}
                    className={`w-full ${isRegistered 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-red-600 hover:bg-red-700 text-white"}`}
                    size="lg"
                  >
                    {isRegistered ? "Inscrit" : "S'inscrire maintenant"}
                  </Button>
                </div>
              </div>
              
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
                  className="mt-1 w-full justify-center bg-gray-100"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  {showDescription ? "Afficher moins" : "Afficher plus"}
                </Button>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium mb-4">À suivre</h3>
                
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
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
          </div>
        )}
        
        {activeTab === 1 && (
          <div className="w-full px-0 py-4">
            <WebinarSchedule />
          </div>
        )}
        
        {activeTab === 2 && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Participants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <Avatar className="h-12 w-12 border border-gray-200">
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                      {String.fromCharCode(64 + index)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">Participant {index}</h3>
                    <p className="text-sm text-gray-500">Rôle: {index % 2 === 0 ? 'Développeur' : 'Designer'}</p>
                  </div>
                  <Badge className="ml-auto">{index % 3 === 0 ? 'Présentateur' : 'Participant'}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <TikTokCommentsPanel 
        isOpen={isCommentsPanelOpen} 
        onClose={() => setIsCommentsPanelOpen(false)}
        initialTab={activeCommentsTab} 
      />
    </div>
  );
};

export default SeminarHomepage;
