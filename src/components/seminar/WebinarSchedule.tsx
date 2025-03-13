
import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, Globe, Search, Filter, ChevronDown, ChevronRight, Check, X, FileText, Download, Star, MessageCircle, Plus, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from 'framer-motion';

// Types for the schedule data
interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

interface Session {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
  track?: string;
  room?: string;
  speakers: Speaker[];
  type: 'keynote' | 'workshop' | 'presentation' | 'panel' | 'networking' | 'break';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  materials?: {
    slides?: string;
    repo?: string;
    resources?: string;
  };
  isInteractive?: boolean;
  isFavorite?: boolean;
  capacity?: number;
  registered?: number;
}

interface Day {
  date: string;
  sessions: Session[];
}

const WebinarSchedule: React.FC = () => {
  const { toast } = useToast();

  // State for filtering and view options
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'timeline' | 'compact'>('timeline');
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
  const [currentDay, setCurrentDay] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Mock schedule data
  const scheduleData: Day[] = [
    {
      date: "15 Juin 2023",
      sessions: [
        {
          id: "1",
          title: "Ouverture du Séminaire",
          description: "Session d'accueil et introduction aux objectifs du séminaire sur le développement web moderne.",
          startTime: "09:00",
          endTime: "09:30",
          date: "15 Juin 2023",
          speakers: [
            {
              id: "s1",
              name: "Jean Dupont",
              role: "Développeur Senior",
              company: "TechFrance",
            }
          ],
          type: "keynote",
          tags: ["introduction", "bienvenue"],
          isInteractive: false,
          capacity: 500,
          registered: 478
        },
        {
          id: "2",
          title: "Les Fondamentaux du Développement Web Moderne",
          description: "Un aperçu des technologies essentielles pour le développement web d'aujourd'hui, incluant HTML5, CSS3 et JavaScript moderne.",
          startTime: "09:45",
          endTime: "11:15",
          date: "15 Juin 2023",
          room: "Salle A",
          track: "Fondamentaux",
          speakers: [
            {
              id: "s2",
              name: "Marie Laurent",
              role: "Designer UX",
              company: "DesignHub",
            }
          ],
          type: "presentation",
          difficulty: "beginner",
          tags: ["HTML5", "CSS3", "JavaScript"],
          materials: {
            slides: "https://example.com/slides",
            resources: "https://example.com/resources"
          },
          isInteractive: true,
          capacity: 200,
          registered: 189
        },
        {
          id: "3",
          title: "Pause Café",
          description: "Profitez d'une pause pour réseauter avec les autres participants et échanger sur les sujets abordés.",
          startTime: "11:15",
          endTime: "11:45",
          date: "15 Juin 2023",
          speakers: [],
          type: "break",
          tags: ["pause", "réseautage"],
          isInteractive: true
        },
        {
          id: "4",
          title: "Atelier React Avancé",
          description: "Plongez dans les concepts avancés de React avec des exercices pratiques sur les hooks, le contexte et les performances.",
          startTime: "11:45",
          endTime: "13:15",
          date: "15 Juin 2023",
          room: "Salle B",
          track: "Frontend",
          speakers: [
            {
              id: "s3",
              name: "Thomas Moreau",
              role: "Développeur Backend",
              company: "ServeLogic",
            }
          ],
          type: "workshop",
          difficulty: "advanced",
          tags: ["React", "Hooks", "Performance"],
          materials: {
            slides: "https://example.com/slides",
            repo: "https://github.com/example/react-workshop"
          },
          isInteractive: true,
          capacity: 100,
          registered: 98
        },
        {
          id: "5",
          title: "Déjeuner Networking",
          description: "Déjeuner avec les présentateurs et les autres participants pour discuter des technologies web.",
          startTime: "13:15",
          endTime: "14:30",
          date: "15 Juin 2023",
          speakers: [],
          type: "networking",
          tags: ["déjeuner", "réseautage"],
          isInteractive: true
        },
        {
          id: "6",
          title: "Panel: L'Avenir du Développement Web",
          description: "Discussion avec des experts de l'industrie sur les tendances futures et les technologies émergentes dans le développement web.",
          startTime: "14:30",
          endTime: "16:00",
          date: "15 Juin 2023",
          room: "Amphithéâtre",
          track: "Tendances",
          speakers: [
            {
              id: "s1",
              name: "Jean Dupont",
              role: "Développeur Senior",
              company: "TechFrance",
            },
            {
              id: "s4",
              name: "Sophie Dubois",
              role: "Product Manager",
              company: "ProductFirst",
            },
            {
              id: "s5",
              name: "Lucas Bernard",
              role: "DevOps Engineer",
              company: "InfraCloud",
            }
          ],
          type: "panel",
          difficulty: "intermediate",
          tags: ["tendances", "futur", "discussion"],
          isInteractive: true,
          capacity: 300,
          registered: 287
        }
      ]
    },
    {
      date: "16 Juin 2023",
      sessions: [
        {
          id: "7",
          title: "Keynote: Architecture Microservices",
          description: "Exploration des principes d'architecture microservices et comment ils transforment le développement d'applications web modernes.",
          startTime: "09:00",
          endTime: "10:00",
          date: "16 Juin 2023",
          speakers: [
            {
              id: "s7",
              name: "Nicolas Petit",
              role: "CTO",
              company: "TechInnovate",
            }
          ],
          type: "keynote",
          tags: ["architecture", "microservices"],
          isInteractive: false,
          capacity: 500,
          registered: 456
        },
        {
          id: "8",
          title: "Workshop: CI/CD pour Applications Web",
          description: "Apprenez à mettre en place un pipeline CI/CD complet pour vos applications web avec des outils modernes.",
          startTime: "10:15",
          endTime: "12:15",
          date: "16 Juin 2023",
          room: "Salle C",
          track: "DevOps",
          speakers: [
            {
              id: "s5",
              name: "Lucas Bernard",
              role: "DevOps Engineer",
              company: "InfraCloud",
            }
          ],
          type: "workshop",
          difficulty: "intermediate",
          tags: ["CI/CD", "DevOps", "Automatisation"],
          materials: {
            slides: "https://example.com/slides",
            repo: "https://github.com/example/cicd-workshop"
          },
          isInteractive: true,
          capacity: 80,
          registered: 76
        },
        {
          id: "9",
          title: "Pause Café",
          description: "Une courte pause pour se rafraîchir et réseauter.",
          startTime: "12:15",
          endTime: "12:45",
          date: "16 Juin 2023",
          speakers: [],
          type: "break",
          tags: ["pause", "réseautage"],
          isInteractive: true
        },
        {
          id: "10",
          title: "Sécurité Web: Meilleures Pratiques",
          description: "Découvrez les meilleures pratiques pour sécuriser vos applications web contre les menaces courantes.",
          startTime: "12:45",
          endTime: "14:15",
          date: "16 Juin 2023",
          room: "Salle A",
          track: "Sécurité",
          speakers: [
            {
              id: "s8",
              name: "Clara Rousseau",
              role: "QA Engineer",
              company: "QualityFirst",
            }
          ],
          type: "presentation",
          difficulty: "intermediate",
          tags: ["sécurité", "OWASP", "authentification"],
          materials: {
            slides: "https://example.com/slides",
            resources: "https://example.com/resources"
          },
          isInteractive: false,
          capacity: 150,
          registered: 132
        },
        {
          id: "11",
          title: "Déjeuner",
          description: "Pause déjeuner.",
          startTime: "14:15",
          endTime: "15:30",
          date: "16 Juin 2023",
          speakers: [],
          type: "break",
          tags: ["déjeuner"],
          isInteractive: true
        },
        {
          id: "12",
          title: "Clôture du Séminaire et Prochaines Étapes",
          description: "Récapitulatif des sujets abordés et discussion sur les prochaines étapes pour continuer votre apprentissage.",
          startTime: "15:30",
          endTime: "16:30",
          date: "16 Juin 2023",
          speakers: [
            {
              id: "s1",
              name: "Jean Dupont",
              role: "Développeur Senior",
              company: "TechFrance",
            },
            {
              id: "s4",
              name: "Sophie Dubois",
              role: "Product Manager",
              company: "ProductFirst",
            }
          ],
          type: "keynote",
          tags: ["conclusion", "résumé"],
          isInteractive: true,
          capacity: 500,
          registered: 423
        }
      ]
    }
  ];

  // Function to toggle session expansion
  const toggleSessionExpansion = (sessionId: string) => {
    const newSet = new Set(expandedSessions);
    if (newSet.has(sessionId)) {
      newSet.delete(sessionId);
    } else {
      newSet.add(sessionId);
    }
    setExpandedSessions(newSet);
  };

  // Filter sessions based on search and filters
  const getFilteredSessions = (day: Day) => {
    return day.sessions.filter(session => {
      // Search in title and description
      const searchMatch = searchQuery === '' || 
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.speakers.some(speaker => 
          speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          speaker.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          speaker.company.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        session.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Type filter
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(session.type);

      // Track filter
      const trackMatch = selectedTracks.length === 0 || 
        (session.track && selectedTracks.includes(session.track));

      // Difficulty filter
      const difficultyMatch = selectedDifficulties.length === 0 || 
        (session.difficulty && selectedDifficulties.includes(session.difficulty));

      return searchMatch && typeMatch && trackMatch && difficultyMatch;
    });
  };

  // Toggle selection in a filter array
  const toggleFilter = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    } else {
      return [...array, item];
    }
  };

  // Handle toggling session types in filter
  const toggleSessionType = (type: string) => {
    setSelectedTypes(prev => toggleFilter(prev, type));
  };

  // Handle toggling tracks in filter
  const toggleTrack = (track: string) => {
    setSelectedTracks(prev => toggleFilter(prev, track));
  };

  // Handle toggling difficulty levels in filter
  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties(prev => toggleFilter(prev, difficulty));
  };

  // Get all unique tracks
  const allTracks = Array.from(new Set(
    scheduleData.flatMap(day => 
      day.sessions
        .filter(session => session.track)
        .map(session => session.track as string)
    )
  ));

  // Handle adding session to favorites
  const toggleFavorite = (sessionId: string) => {
    // In a real app, this would save to state or database
    toast({
      title: "Favori mis à jour",
      description: "Vos sessions favorites ont été mises à jour",
    });
  };

  // Handle registering for a session
  const registerForSession = (sessionId: string) => {
    toast({
      title: "Inscription confirmée",
      description: "Vous êtes inscrit à cette session",
    });
  };

  // Handle downloading materials
  const downloadMaterials = (type: string, url: string) => {
    window.open(url, '_blank');
    toast({
      title: `${type} téléchargé`,
      description: "Le téléchargement a commencé",
    });
  };

  // Scroll timeline to current time
  useEffect(() => {
    if (viewMode === 'timeline' && timelineRef.current) {
      // In a real app, this would scroll to the current time
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timePosition = (hours * 60 + minutes - 9 * 60) * 2; // 2px per minute, starting from 9AM
      
      if (timePosition > 0) {
        timelineRef.current.scrollTop = timePosition - 100; // Center current time with some offset
      }
    }
  }, [viewMode]);

  // Get session color based on type
  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'keynote':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'workshop':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'presentation':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'panel':
        return 'bg-amber-100 border-amber-300 text-amber-800';
      case 'networking':
        return 'bg-pink-100 border-pink-300 text-pink-800';
      case 'break':
        return 'bg-gray-100 border-gray-300 text-gray-600';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  // Get session width and position for timeline view
  const getSessionStyles = (session: Session) => {
    const startParts = session.startTime.split(':');
    const endParts = session.endTime.split(':');
    
    const startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
    const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
    const durationMinutes = endMinutes - startMinutes;
    
    // Start from 9:00 as reference point (9 * 60 = 540 minutes)
    const startPosition = startMinutes - 9 * 60;
    
    return {
      height: `${durationMinutes * 2}px`, // 2px per minute
      top: `${startPosition * 2}px`, // 2px per minute
    };
  };

  // Get difficulty badge
  const getDifficultyBadge = (difficulty: string | undefined) => {
    if (!difficulty) return null;
    
    const colors: Record<string, string> = {
      'beginner': 'bg-green-100 text-green-800 border-green-200',
      'intermediate': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'advanced': 'bg-red-100 text-red-800 border-red-200'
    };
    
    const labels: Record<string, string> = {
      'beginner': 'Débutant',
      'intermediate': 'Intermédiaire',
      'advanced': 'Avancé'
    };
    
    return (
      <Badge variant="outline" className={`text-xs ${colors[difficulty]}`}>
        {labels[difficulty]}
      </Badge>
    );
  };

  // Get time slot label
  const getTimeSlotLabel = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  // Session type labels in French
  const sessionTypeLabels: Record<string, string> = {
    'keynote': 'Keynote',
    'workshop': 'Atelier',
    'presentation': 'Présentation',
    'panel': 'Panel',
    'networking': 'Réseautage',
    'break': 'Pause'
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedTracks([]);
    setSelectedDifficulties([]);
  };

  return (
    <div className="w-full">
      {/* Header section with filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold">Programme du séminaire</h2>

          {/* View mode toggle */}
          <div className="flex gap-2">
            <Button 
              variant={viewMode === 'timeline' ? 'default' : 'outline'} 
              className="h-9"
              onClick={() => setViewMode('timeline')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Timeline
            </Button>
            <Button 
              variant={viewMode === 'compact' ? 'default' : 'outline'} 
              className="h-9"
              onClick={() => setViewMode('compact')}
            >
              <List className="w-4 h-4 mr-2" />
              Compact
            </Button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher des sessions, intervenants ou sujets..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filtres
            <Badge variant="secondary" className="ml-1">
              {selectedTypes.length + selectedTracks.length + selectedDifficulties.length}
            </Badge>
          </Button>
        </div>

        {/* Expanded filters section */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex flex-wrap gap-6">
                  {/* Session type filters */}
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="text-sm font-semibold mb-2">Type de session</h3>
                    <div className="space-y-2">
                      {Object.entries(sessionTypeLabels).map(([type, label]) => (
                        <div key={type} className="flex items-center">
                          <button
                            className={`p-1 rounded mr-2 ${
                              selectedTypes.includes(type) 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}
                            onClick={() => toggleSessionType(type)}
                          >
                            {selectedTypes.includes(type) ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </button>
                          <span className="text-sm">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracks filters */}
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="text-sm font-semibold mb-2">Parcours</h3>
                    <div className="space-y-2">
                      {allTracks.map(track => (
                        <div key={track} className="flex items-center">
                          <button
                            className={`p-1 rounded mr-2 ${
                              selectedTracks.includes(track) 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}
                            onClick={() => toggleTrack(track)}
                          >
                            {selectedTracks.includes(track) ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </button>
                          <span className="text-sm">{track}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty filters */}
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="text-sm font-semibold mb-2">Niveau</h3>
                    <div className="space-y-2">
                      {['beginner', 'intermediate', 'advanced'].map(difficulty => (
                        <div key={difficulty} className="flex items-center">
                          <button
                            className={`p-1 rounded mr-2 ${
                              selectedDifficulties.includes(difficulty) 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}
                            onClick={() => toggleDifficulty(difficulty)}
                          >
                            {selectedDifficulties.includes(difficulty) ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </button>
                          <span className="text-sm">
                            {difficulty === 'beginner' ? 'Débutant' : 
                             difficulty === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Day tabs */}
        <div className="flex space-x-2 mt-4">
          {scheduleData.map((day, index) => (
            <Button
              key={day.date}
              variant={currentDay === index ? 'default' : 'outline'}
              className="flex items-center gap-2"
              onClick={() => setCurrentDay(index)}
            >
              <Calendar className="h-4 w-4" />
              <span>{day.date}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Schedule display - Timeline View */}
      {viewMode === 'timeline' && (
        <div className="relative">
          {/* Time indicators on the left */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-white z-10 border-r">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute text-xs text-gray-500 font-medium"
                style={{ top: `${i * 120}px` }}
              >
                {`${i + 9}:00`}
              </div>
            ))}
          </div>

          {/* Timeline tracks */}
          <div 
            ref={timelineRef}
            className="ml-16 overflow-y-auto"
            style={{ height: '600px' }}
          >
            {/* Current time indicator */}
            <div className="sticky top-0 z-20 w-full">
              <div className="absolute left-0 right-0 h-0.5 bg-red-500"></div>
              <div className="absolute -left-4 -top-2 rounded-full bg-red-500 p-1">
                <Clock className="h-3 w-3 text-white" />
              </div>
            </div>

            {/* Session cards in timeline view */}
            <div className="relative">
              {getFilteredSessions(scheduleData[currentDay]).map(session => (
                <div
                  key={session.id}
                  className={`absolute left-4 right-4 md:right-8 p-3 rounded-lg border ${getSessionTypeColor(session.type)} shadow-sm transition-all hover:shadow z-10`}
                  style={getSessionStyles(session)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-medium mb-1">
                        {getTimeSlotLabel(session.startTime)} - {getTimeSlotLabel(session.endTime)}
                        {session.room && <span className="ml-2">• {session.room}</span>}
                      </div>
                      <h3 className="font-medium text-sm">{session.title}</h3>
                      
                      {session.speakers.length > 0 && (
                        <div className="flex items-center mt-1 space-x-1">
                          {session.speakers.map((speaker, i) => (
                            <span key={speaker.id} className="text-xs">
                              {i > 0 && ", "}
                              {speaker.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-1">
                      {session.difficulty && getDifficultyBadge(session.difficulty)}
                      <Badge variant="outline" className={`text-xs ${getSessionTypeColor(session.type)}`}>
                        {sessionTypeLabels[session.type]}
                      </Badge>
                    </div>
                  </div>
                  
                  {session.track && (
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {session.track}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schedule display - Compact View */}
      {viewMode === 'compact' && (
        <div className="space-y-4">
          {getFilteredSessions(scheduleData[currentDay]).length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="text-gray-400 mb-2">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">Aucune session trouvée</h3>
              <p className="text-gray-500 mt-1">Essayez d'ajuster vos filtres de recherche</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            getFilteredSessions(scheduleData[currentDay]).map(session => (
              <Collapsible
                key={session.id}
                open={expandedSessions.has(session.id)}
                onOpenChange={() => toggleSessionExpansion(session.id)}
                className={`rounded-lg border ${
                  expandedSessions.has(session.id) 
                    ? 'bg-white border-gray-200 shadow-sm' 
                    : `${getSessionTypeColor(session.type)} border-opacity-70`
                }`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={`text-xs ${getSessionTypeColor(session.type)}`}>
                          {sessionTypeLabels[session.type]}
                        </Badge>
                        {session.difficulty && getDifficultyBadge(session.difficulty)}
                        {session.track && (
                          <Badge variant="secondary" className="text-xs">
                            {session.track}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-base">{session.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {session.startTime} - {session.endTime}
                        </div>
                        {session.room && (
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            {session.room}
                          </div>
                        )}
                        {session.capacity && (
                          <div className="flex items-center">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            {session.registered}/{session.capacity}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(session.id);
                        }}
                      >
                        <Star className={`h-4 w-4 ${session.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                      </Button>
                      
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          {expandedSessions.has(session.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </div>
                  
                  {session.speakers.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {session.speakers.map(speaker => (
                        <div 
                          key={speaker.id}
                          className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-800"
                        >
                          <span className="font-medium">{speaker.name}</span>
                          <span className="mx-1">•</span>
                          <span className="text-gray-600">{speaker.role}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <CollapsibleContent>
                  <div className="px-4 pb-4">
                    <Separator className="mb-4" />
                    
                    <div className="text-sm text-gray-700 mb-4">
                      {session.description}
                    </div>
                    
                    {session.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {session.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {session.materials && Object.keys(session.materials).length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Ressources</h4>
                        <div className="flex flex-wrap gap-2">
                          {session.materials.slides && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => downloadMaterials('Slides', session.materials!.slides!)}
                            >
                              <FileText className="h-3.5 w-3.5 mr-1.5" />
                              Slides
                            </Button>
                          )}
                          {session.materials.repo && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => downloadMaterials('Code Repository', session.materials!.repo!)}
                            >
                              <Download className="h-3.5 w-3.5 mr-1.5" />
                              Repository
                            </Button>
                          )}
                          {session.materials.resources && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => downloadMaterials('Resources', session.materials!.resources!)}
                            >
                              <Download className="h-3.5 w-3.5 mr-1.5" />
                              Resources
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button 
                        variant="default" 
                        size="sm"
                        className="h-9"
                        onClick={() => registerForSession(session.id)}
                      >
                        {session.registered === session.capacity ? 'Rejoindre liste d\'attente' : 'S\'inscrire'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-9"
                        onClick={() => {
                          // Open comments section
                        }}
                      >
                        <MessageCircle className="h-4 w-4 mr-1.5" />
                        Commentaires
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default WebinarSchedule;
