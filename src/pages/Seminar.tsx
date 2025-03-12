import React, { useState, useEffect, useRef } from 'react';
import { Play, User, Clock, MessageCircle, Bell, Award, Users, Edit3, Star, Calendar, BadgeCheck, Eye, Zap, Tv, Sparkles, Flame, TrendingUp, BarChart2, BookOpen, ChevronRight, HelpCircle, ThumbsUp, ThumbsDown, Share2, Download, Save, MoreVertical } from 'lucide-react';
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
import { cn } from "@/lib/utils";

const SeminarHomepage = () => {
  // Get language context
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  
  // State for active tab
  const [activeTab, setActiveTab] = useState(0);
  const [bottomPadding, setBottomPadding] = useState(0);
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);
  const [activeCommentsTab, setActiveCommentsTab] = useState('comments');
  const [showDescription, setShowDescription] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [miniPlayerMode, setMiniPlayerMode] = useState(false);
  const webinarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // State for interaction buttons
  const [isFollowing, setIsFollowing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(12453);
  
  // Effect to set language to French
  useEffect(() => {
    setLanguage('fr');
  }, [setLanguage]);
  
  // Effect to handle scroll for sticky video
  useEffect(() => {
    if (activeTab === 0) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const headerHeight = 150; // Approximate header height
        
        if (scrollPosition > headerHeight) {
          setIsScrolled(true);
          if (contentRef.current && webinarRef.current) {
            const contentTop = contentRef.current.getBoundingClientRect().top;
            // When content scrolls up to the point where it would overlap the video
            setMiniPlayerMode(contentTop < 400);
          }
        } else {
          setIsScrolled(false);
          setMiniPlayerMode(false);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
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
  
  const toggleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      if (isDisliked) {
        setIsDisliked(false);
      }
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };
  
  const toggleDislike = () => {
    if (isDisliked && isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    }
    setIsDisliked(!isDisliked);
  };
  
  const toggleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Retiré des favoris" : "Ajouté aux favoris",
      description: isSaved ? "La vidéo a été retirée de vos favoris" : "La vidéo a été ajoutée à vos favoris",
    });
  };
  
  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
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
          {/* Sticky Video Player Container */}
          <div 
            className={cn(
              "w-full transition-all duration-300 bg-black",
              miniPlayerMode ? "fixed bottom-4 right-4 z-50 w-72 rounded-lg shadow-xl" : 
              isScrolled ? "sticky top-14 z-30" : ""
            )}
            style={{ 
              aspectRatio: miniPlayerMode ? "16/9" : "auto",
              paddingTop: miniPlayerMode ? "0" : isScrolled ? "0" : "56.25%"
            }}
          >
            <div 
              ref={webinarRef}
              className={cn(
                "relative w-full overflow-hidden",
                !miniPlayerMode && !isScrolled && "absolute inset-0"
              )}
              style={{ 
                paddingTop: miniPlayerMode || isScrolled ? "56.25%" : "0",
                minHeight: miniPlayerMode ? "0" : isScrolled ? "0" : "400px"
              }}
            >
              {/* Video Player */}
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="w-full h-full bg-gray-800 flex items-center justify-center cursor-pointer">
                  <Play size={64} className="text-white opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              {/* Mini Player Close Button */}
              {miniPlayerMode && (
                <button 
                  className="absolute top-1 right-1 z-50 bg-gray-800 bg-opacity-70 text-white rounded-full p-1.5"
                  onClick={() => setMiniPlayerMode(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Main Content Area */}
          <div ref={contentRef} className="p-4">
            {/* Title and Views */}
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              Maîtriser le Développement Web Moderne : Des Bases aux Techniques Avancées
            </h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>125K vues</span>
              <span className="mx-1">•</span>
              <span>Diffusé il y a 2 jours</span>
            </div>
            
            {/* YouTube-style Action Bar with Like, Dislike, Share, etc. */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLike}
                  className={cn(
                    "flex items-center gap-1 rounded-full pl-2 pr-3", 
                    isLiked ? "text-blue-600" : "text-gray-700"
                  )}
                >
                  <ThumbsUp size={18} className={isLiked ? "fill-blue-600" : ""} />
                  <span>{formatCount(likeCount)}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDislike}
                  className="rounded-full px-2"
                >
                  <ThumbsDown size={18} className={isDisliked ? "fill-gray-700" : ""} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 rounded-full pl-2 pr-3"
                >
                  <Share2 size={18} />
                  <span>Partager</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 rounded-full pl-2 pr-3"
                >
                  <Download size={18} />
                  <span>Télécharger</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSave}
                  className={cn(
                    "flex items-center gap-1 rounded-full pl-2 pr-3",
                    isSaved ? "text-blue-600" : "text-gray-700"
                  )}
                >
                  <Save size={18} className={isSaved ? "fill-blue-600" : ""} />
                  <span>{isSaved ? "Enregistré" : "Enregistrer"}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full px-2"
                >
                  <MoreVertical size={18} />
                </Button>
              </div>
            </div>
            
            {/* Channel Info with WebinarInfoComponent */}
            <WebinarInfoComponent />
            
            {/* WebinarComponent - Keep after the WebinarInfoComponent */}
            <div className="mb-4">
              <WebinarComponent onOpenComments={() => setIsCommentsPanelOpen(true)} />
            </div>
            
            {/* Only Register button below WebinarComponent */}
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
          
          {/* Video Description Section */}
          <div className="p-4 border-t border-b border-gray-100 bg-gray-50">
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
            
            {/* Comment Input */}
            <div className="flex items-start gap-3 mb-4">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Ajouter un commentaire..."
                  className="w-full border-b border-gray-200 focus:border-blue-500 outline-none pb-1 text-sm"
                  onFocus={handleCommentsClick}
                />
              </div>
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
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <button className="flex items-center gap-1 hover:text-gray-700">
                      <ThumbsUp size={14} /> 124
                    </button>
                    <button className="flex items-center gap-1 hover:text-gray-700">
                      <ThumbsDown size={14} />
                    </button>
                    <button className="hover:text-gray-700" onClick={handleCommentsClick}>Répondre</button>
                  </div>
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
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <button className="flex items-center gap-1 hover:text-gray-700">
                      <ThumbsUp size={14} /> 87
                    </button>
                    <button className="flex items-center gap-1 hover:text-gray-700">
                      <ThumbsDown size={14} />
                    </button>
                    <button className="hover:text-gray-700" onClick={handleCommentsClick}>Répondre</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Up Next / Related Videos */}
          <div className="p-4">
            <h3 className="font-medium mb-4">À suivre</h3>
            
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
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
                    <p className="text-xs text-gray-500 flex items-center mt-0.5">
                      <Eye size={12} className="mr-1" /> 89K vues • il y a 3 semaines
                    </p>
                    <Badge 
                      variant="outline" 
                      className="mt-1 text-[10px] px-1.5 py-0 h-4 border-gray-300 text-gray-500 font-normal"
                    >
                      Recommandé
                    </Badge>
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
