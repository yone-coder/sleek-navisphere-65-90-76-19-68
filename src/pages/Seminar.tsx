
import React, { useState, useEffect, useRef } from 'react';
import { Play, User, Clock, MessageCircle, Bell, Award, Users, Edit3, Star, Calendar, BadgeCheck, Eye, Zap, Tv, Sparkles, Flame, TrendingUp, BarChart2, BookOpen, ChevronRight, HelpCircle, Search, Filter, Grid, List, CheckCircle, XCircle, MessageSquare, Mail, Calendar as CalendarIcon, UserPlus, ChevronsUpDown } from 'lucide-react';
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
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Participant type definition
interface Participant {
  id: number;
  name: string;
  role: string;
  company?: string;
  title?: string;
  bio?: string;
  expertise?: string[];
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  status: 'online' | 'offline' | 'away' | 'busy';
  isPresentator: boolean;
  joinedAt: string;
  lastActive?: string;
  following?: boolean;
}

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
  
  // Participants tab states
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      name: "Jean Dupont",
      role: "Développeur Senior",
      company: "TechFrance",
      title: "Architecte Frontend",
      bio: "Spécialiste React avec 8 ans d'expérience dans le développement d'applications web à grande échelle.",
      expertise: ["React", "TypeScript", "Architecture Frontend"],
      status: "online",
      isPresentator: true,
      joinedAt: "Il y a 2 heures",
      lastActive: "Actuellement actif",
      following: true
    },
    {
      id: 2,
      name: "Marie Laurent",
      role: "Designer UX",
      company: "DesignHub",
      title: "Lead Designer",
      bio: "Créatrice d'expériences utilisateur intuitives et accessibles pour des applications web et mobiles.",
      expertise: ["UI/UX", "Figma", "Design System"],
      status: "online",
      isPresentator: true,
      joinedAt: "Il y a 1 heure",
      lastActive: "Actuellement actif"
    },
    {
      id: 3,
      name: "Thomas Moreau",
      role: "Développeur Backend",
      company: "ServeLogic",
      title: "Ingénieur Cloud",
      bio: "Expert en architecture cloud et microservices avec une forte expérience en environnements distribués.",
      expertise: ["Node.js", "AWS", "Microservices"],
      status: "away",
      isPresentator: false,
      joinedAt: "Il y a 30 minutes",
      lastActive: "Actif il y a 5 minutes"
    },
    {
      id: 4,
      name: "Sophie Dubois",
      role: "Product Manager",
      company: "ProductFirst",
      title: "Senior PM",
      bio: "Stratège produit avec une approche centrée sur l'utilisateur et un historique de livraison de produits réussis.",
      expertise: ["Product Strategy", "User Research", "Agile"],
      status: "offline",
      isPresentator: false,
      joinedAt: "Il y a 3 heures",
      lastActive: "Actif il y a 45 minutes"
    },
    {
      id: 5,
      name: "Lucas Bernard",
      role: "DevOps Engineer",
      company: "InfraCloud",
      title: "Lead Infrastructure",
      bio: "Spécialiste de l'automatisation et des infrastructures cloud, avec un focus sur la sécurité et la scalabilité.",
      expertise: ["Docker", "Kubernetes", "CI/CD"],
      status: "busy",
      isPresentator: false,
      joinedAt: "Il y a 20 minutes",
      lastActive: "Actif il y a 2 minutes"
    },
    {
      id: 6,
      name: "Emma Martin",
      role: "Data Scientist",
      company: "DataInsight",
      title: "Senior Analyst",
      bio: "Analyste de données expérimentée spécialisée dans l'apprentissage automatique et la visualisation de données.",
      expertise: ["Python", "Machine Learning", "Data Visualization"],
      status: "online",
      isPresentator: false,
      joinedAt: "Il y a 1 heure",
      lastActive: "Actuellement actif"
    },
    {
      id: 7,
      name: "Nicolas Petit",
      role: "CTO",
      company: "TechInnovate",
      title: "Directeur Technique",
      bio: "Visionnaire technologique avec une solide expérience dans le leadership d'équipes techniques.",
      expertise: ["Leadership", "Architecture", "Innovation"],
      status: "away",
      isPresentator: false,
      joinedAt: "Il y a 45 minutes",
      lastActive: "Actif il y a 10 minutes"
    },
    {
      id: 8,
      name: "Clara Rousseau",
      role: "QA Engineer",
      company: "QualityFirst",
      title: "Lead Tester",
      bio: "Experte en assurance qualité avec une passion pour l'amélioration continue des processus de test.",
      expertise: ["Test Automation", "Test Strategy", "QA Processes"],
      status: "online",
      isPresentator: false,
      joinedAt: "Il y a 2 heures",
      lastActive: "Actuellement actif"
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'name' | 'role' | 'status' | 'joined'>('name');
  
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

  // Participant filtering and handling functions
  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          participant.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (participant.company && participant.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = roleFilter === "all" || 
                        (roleFilter === "presentator" && participant.isPresentator) ||
                        participant.role.toLowerCase().includes(roleFilter.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || participant.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  }).sort((a, b) => {
    switch (sortOrder) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'role':
        return a.role.localeCompare(b.role);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'joined':
        return a.joinedAt.localeCompare(b.joinedAt);
      default:
        return 0;
    }
  });

  const toggleFollowParticipant = (id: number) => {
    setParticipants(participants.map(participant => 
      participant.id === id 
        ? { ...participant, following: !participant.following } 
        : participant
    ));
    
    const participant = participants.find(p => p.id === id);
    if (participant) {
      toast({
        title: participant.following ? `Vous ne suivez plus ${participant.name}` : `Vous suivez maintenant ${participant.name}`,
        description: participant.following 
          ? "Vous ne recevrez plus de notifications concernant ce participant" 
          : "Vous recevrez des notifications lorsque ce participant est actif",
      });
    }
  };

  const sendMessage = (participant: Participant) => {
    toast({
      title: `Message à ${participant.name}`,
      description: "La messagerie directe sera disponible prochainement",
    });
  };

  const getStatusColor = (status: Participant['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status: Participant['status']) => {
    switch (status) {
      case 'online':
        return 'En ligne';
      case 'away':
        return 'Absent';
      case 'busy':
        return 'Occupé';
      case 'offline':
        return 'Hors ligne';
      default:
        return 'Inconnu';
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
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-bold">Participants ({filteredParticipants.length})</h2>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-60">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      type="text"
                      placeholder="Rechercher un participant..." 
                      className="pl-10 h-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-[130px] h-9">
                        <SelectValue placeholder="Filtrer par rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les rôles</SelectItem>
                        <SelectItem value="presentator">Présentateurs</SelectItem>
                        <SelectItem value="Développeur">Développeurs</SelectItem>
                        <SelectItem value="Designer">Designers</SelectItem>
                        <SelectItem value="Product">Product Manager</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[130px] h-9">
                        <SelectValue placeholder="Filtrer par statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="online">En ligne</SelectItem>
                        <SelectItem value="away">Absent</SelectItem>
                        <SelectItem value="busy">Occupé</SelectItem>
                        <SelectItem value="offline">Hors ligne</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex bg-gray-100 rounded-md p-0.5">
                      <Button 
                        variant={viewMode === 'grid' ? "secondary" : "ghost"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant={viewMode === 'list' ? "secondary" : "ghost"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {filteredParticipants.length} participants affichés
                </p>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      <span>Trier par</span>
                      <ChevronsUpDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortOrder('name')}>
                      Nom
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder('role')}>
                      Rôle
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder('status')}>
                      Statut
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder('joined')}>
                      Date d'arrivée
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {filteredParticipants.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Users className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium">Aucun participant trouvé</h3>
                  <p className="text-gray-500 max-w-md mt-2">
                    Essayez de modifier vos critères de recherche ou de filtrage pour voir plus de résultats.
                  </p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredParticipants.map((participant) => (
                    <div 
                      key={participant.id} 
                      className="flex flex-col p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12 border border-gray-200">
                              {participant.avatar ? (
                                <AvatarImage src={participant.avatar} alt={participant.name} />
                              ) : (
                                <AvatarFallback className={`bg-gradient-to-br ${
                                  participant.isPresentator 
                                    ? 'from-blue-500 to-indigo-600'
                                    : 'from-purple-500 to-pink-600'
                                } text-white`}>
                                  {participant.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(participant.status)}`} />
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-medium text-sm">{participant.name}</h3>
                              {participant.isPresentator && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 text-[10px] px-1 py-0 border-blue-200">
                                  Présentateur
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600">{participant.role}</p>
                            <p className="text-xs text-gray-500">{participant.company}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-7 w-7 text-gray-400 hover:text-gray-800"
                            onClick={() => sendMessage(participant)}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className={`h-7 w-7 ${
                              participant.following 
                                ? 'text-pink-500 hover:text-pink-700' 
                                : 'text-gray-400 hover:text-gray-800'
                            }`}
                            onClick={() => toggleFollowParticipant(participant.id)}
                          >
                            {participant.following ? (
                              <CheckCircle className="h-4 w-4 fill-current" />
                            ) : (
                              <UserPlus className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      {participant.expertise && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {participant.expertise.map((skill, index) => (
                            <Badge 
                              key={index}
                              variant="secondary" 
                              className="text-[10px] px-1.5 py-0 bg-gray-100"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-3 text-xs text-gray-500 flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        <span>Rejoint {participant.joinedAt}</span>
                      </div>
                      
                      <div className="mt-1 text-xs flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-1.5 ${getStatusColor(participant.status)}`} />
                        <span className="text-gray-600">{getStatusText(participant.status)}</span>
                        {participant.lastActive && (
                          <span className="text-gray-500 ml-1.5">• {participant.lastActive}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg divide-y">
                  {filteredParticipants.map((participant) => (
                    <div 
                      key={participant.id} 
                      className="flex items-center justify-between p-3 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10 border border-gray-200">
                            {participant.avatar ? (
                              <AvatarImage src={participant.avatar} alt={participant.name} />
                            ) : (
                              <AvatarFallback className={`bg-gradient-to-br ${
                                participant.isPresentator 
                                  ? 'from-blue-500 to-indigo-600'
                                  : 'from-purple-500 to-pink-600'
                              } text-white text-xs`}>
                                {participant.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${getStatusColor(participant.status)}`} />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-medium text-sm">{participant.name}</h3>
                            {participant.isPresentator && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-[10px] px-1 py-0 border-blue-200">
                                Présentateur
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-gray-600">{participant.role}</span>
                            {participant.company && (
                              <>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600">{participant.company}</span>
                              </>
                            )}
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">Rejoint {participant.joinedAt}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center mr-2">
                          <div className={`h-2 w-2 rounded-full mr-1.5 ${getStatusColor(participant.status)}`} />
                          <span className="text-xs text-gray-600">{getStatusText(participant.status)}</span>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1.5 border-gray-200"
                          onClick={() => sendMessage(participant)}
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span className="text-xs">Message</span>
                        </Button>
                        
                        <Button
                          variant={participant.following ? "secondary" : "outline"}
                          size="sm"
                          className={`h-8 gap-1.5 ${participant.following 
                            ? 'bg-blue-50 text-blue-700 border-blue-200' 
                            : 'border-gray-200'}`}
                          onClick={() => toggleFollowParticipant(participant.id)}
                        >
                          {participant.following ? (
                            <>
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span className="text-xs">Suivi</span>
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-3.5 w-3.5" />
                              <span className="text-xs">Suivre</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
