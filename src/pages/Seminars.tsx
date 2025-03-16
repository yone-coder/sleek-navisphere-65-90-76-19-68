
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SeminarCard } from '@/components/seminar/SeminarCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  ChevronDown, 
  Filter, 
  Flame, 
  Globe, 
  Info, 
  Search, 
  Star, 
  Tag,
  Users,
  Edit,
  Zap,
  RotateCcw,
  BarChart2,
  Smartphone as Mobile,
  Link as LinkIcon,
  TrendingUp,
  Clock,
  MapPin,
  Bookmark,
  SlidersHorizontal,
  PlusCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

const SEMINARS_DATA = [
  {
    id: '1',
    title: 'Modern Web Development Summit',
    date: 'June 15-17, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Virtual + San Francisco',
    image: '/api/placeholder/300/180',
    price: 299,
    category: 'Development',
    speakersCount: 24,
    duration: '3 days',
    rating: 4.9,
    attendees: 1250,
    maxAttendees: 2000,
    featured: true,
    topic: 'Web Development',
    speakerImages: ['/api/placeholder/32/32', '/api/placeholder/32/32', '/api/placeholder/32/32'],
    isLive: false,
    isCertified: true,
    language: 'English',
    difficultyLevel: 'Intermediate' as DifficultyLevel,
    popularity: 85,
  },
  {
    id: '2',
    title: 'AI and Machine Learning Conference',
    date: 'July 22-23, 2024',
    time: '10:00 AM - 6:00 PM',
    location: 'New York + Online',
    image: '/api/placeholder/300/180',
    price: 349,
    category: 'AI',
    speakersCount: 18,
    duration: '2 days',
    rating: 4.8,
    attendees: 950,
    maxAttendees: 1500,
    topic: 'Artificial Intelligence',
    speakerImages: ['/api/placeholder/32/32', '/api/placeholder/32/32'],
    difficultyLevel: 'Advanced' as DifficultyLevel,
  },
  {
    id: '3',
    title: 'UX Design Workshop Series',
    date: 'August 5-7, 2024',
    time: '1:00 PM - 4:00 PM',
    location: 'Virtual',
    image: '/api/placeholder/300/180',
    price: 199,
    category: 'Design',
    speakersCount: 6,
    duration: '3 half-days',
    rating: 4.7,
    attendees: 300,
    maxAttendees: 500,
    topic: 'User Experience',
    speakerImages: ['/api/placeholder/32/32'],
    difficultyLevel: 'Beginner' as DifficultyLevel,
  },
  {
    id: '4',
    title: 'Cybersecurity in the Digital Age',
    date: 'September 12-14, 2024',
    time: '9:00 AM - 5:30 PM',
    location: 'London + Virtual',
    image: '/api/placeholder/300/180',
    price: 449,
    category: 'Security',
    speakersCount: 15,
    duration: '3 days',
    rating: 4.6,
    attendees: 800,
    maxAttendees: 1200,
    topic: 'Cybersecurity',
    speakerImages: ['/api/placeholder/32/32', '/api/placeholder/32/32'],
    difficultyLevel: 'Intermediate' as DifficultyLevel,
  },
  {
    id: '5',
    title: 'DevOps Transformation Workshop',
    date: 'October 7-8, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'Virtual',
    image: '/api/placeholder/300/180',
    price: 249,
    category: 'DevOps',
    speakersCount: 8,
    duration: '2 days',
    rating: 4.5,
    attendees: 450,
    maxAttendees: 600,
    topic: 'DevOps',
    speakerImages: ['/api/placeholder/32/32'],
    difficultyLevel: 'Advanced' as DifficultyLevel,
  },
  {
    id: '6',
    title: 'Product Management Masterclass',
    date: 'November 15, 2024',
    time: '9:00 AM - 6:00 PM',
    location: 'Seattle + Virtual',
    image: '/api/placeholder/300/180',
    price: 399,
    category: 'Management',
    speakersCount: 5,
    duration: '1 day',
    rating: 4.9,
    attendees: 180,
    maxAttendees: 200,
    featured: true,
    topic: 'Product Management',
    speakerImages: ['/api/placeholder/32/32'],
    difficultyLevel: 'Intermediate' as DifficultyLevel,
  },
  {
    id: '7',
    title: 'Data Analytics Conference',
    date: 'December 5-6, 2024',
    time: '10:00 AM - 5:00 PM',
    location: 'Chicago + Virtual',
    image: '/api/placeholder/300/180',
    price: 299,
    category: 'Data',
    speakersCount: 12,
    duration: '2 days',
    rating: 4.7,
    attendees: 600,
    maxAttendees: 800,
    topic: 'Data Science',
    speakerImages: ['/api/placeholder/32/32', '/api/placeholder/32/32'],
    difficultyLevel: 'Intermediate' as DifficultyLevel,
  },
  {
    id: '8',
    title: 'Free JavaScript Workshop',
    date: 'July 10, 2024',
    time: '1:00 PM - 5:00 PM',
    location: 'Virtual',
    image: '/api/placeholder/300/180',
    price: 0,
    category: 'Development',
    speakersCount: 2,
    duration: '4 hours',
    rating: 4.6,
    attendees: 250,
    maxAttendees: 500,
    topic: 'JavaScript',
    speakerImages: ['/api/placeholder/32/32'],
    difficultyLevel: 'Beginner' as DifficultyLevel,
  },
  {
    id: '9',
    title: 'Blockchain Technology Summit',
    date: 'August 25-26, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Miami + Virtual',
    image: '/api/placeholder/300/180',
    price: 499,
    category: 'Blockchain',
    speakersCount: 20,
    duration: '2 days',
    rating: 4.8,
    attendees: 700,
    maxAttendees: 1000,
    topic: 'Blockchain',
    speakerImages: ['/api/placeholder/32/32', '/api/placeholder/32/32', '/api/placeholder/32/32'],
    difficultyLevel: 'Advanced' as DifficultyLevel,
  },
  {
    id: '10',
    title: 'Cloud Computing Conference',
    date: 'September 20-22, 2024',
    time: '10:00 AM - 6:00 PM',
    location: 'Austin + Virtual',
    image: '/api/placeholder/300/180',
    price: 349,
    category: 'Cloud',
    speakersCount: 16,
    duration: '3 days',
    rating: 4.7,
    attendees: 850,
    maxAttendees: 1200,
    topic: 'Cloud Computing',
    speakerImages: ['/api/placeholder/32/32', '/api/placeholder/32/32'],
    difficultyLevel: 'Intermediate' as DifficultyLevel,
  },
  {
    id: '11',
    title: 'Mobile App Development Bootcamp',
    date: 'October 15-19, 2024',
    time: '9:00 AM - 4:00 PM',
    location: 'Virtual',
    image: '/api/placeholder/300/180',
    price: 599,
    category: 'Development',
    speakersCount: 10,
    duration: '5 days',
    rating: 4.9,
    attendees: 150,
    maxAttendees: 200,
    featured: true,
    topic: 'Mobile Development',
    speakerImages: ['/api/placeholder/32/32', '/api/placeholder/32/32'],
    difficultyLevel: 'Advanced' as DifficultyLevel,
  },
  {
    id: '12',
    title: 'Future of AI Ethics Forum',
    date: 'November 8, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'Boston + Virtual',
    image: '/api/placeholder/300/180',
    price: 199,
    category: 'AI',
    speakersCount: 8,
    duration: '1 day',
    rating: 4.8,
    attendees: 300,
    maxAttendees: 400,
    topic: 'AI Ethics',
    speakerImages: ['/api/placeholder/32/32'],
    difficultyLevel: 'All Levels' as DifficultyLevel,
  }
];

const FEATURED_SEMINARS = SEMINARS_DATA.filter(seminar => seminar.featured);
const UPCOMING_SEMINARS = SEMINARS_DATA.slice(0, 8);
const BY_TOPIC = {
  'Development': SEMINARS_DATA.filter(s => s.category === 'Development' || s.topic?.includes('Development')),
  'AI': SEMINARS_DATA.filter(s => s.category === 'AI' || s.topic?.includes('AI')),
  'Design': SEMINARS_DATA.filter(s => s.category === 'Design' || s.topic?.includes('Design')),
  'Management': SEMINARS_DATA.filter(s => s.category === 'Management' || s.topic?.includes('Management')),
  'Data': SEMINARS_DATA.filter(s => s.category === 'Data' || s.topic?.includes('Data')),
};
const FREE_SEMINARS = SEMINARS_DATA.filter(seminar => seminar.price === 0);
const VIRTUAL_SEMINARS = SEMINARS_DATA.filter(seminar => seminar.location.toLowerCase().includes('virtual'));

const SeminarsPage = () => {
  const [savedSeminars, setSavedSeminars] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredSeminars, setFilteredSeminars] = useState<any[]>(SEMINARS_DATA);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    featured: true,
    upcoming: true,
    free: true,
    virtual: true,
    byTopic: true
  });
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<'all' | 'virtual' | 'in-person'>('all');
  const [sortOrder, setSortOrder] = useState<'popular' | 'recent' | 'price-low' | 'price-high'>('popular');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    let filtered = [...SEMINARS_DATA];
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        seminar => 
          seminar.title.toLowerCase().includes(lowercasedQuery) ||
          seminar.category.toLowerCase().includes(lowercasedQuery) ||
          (seminar.topic && seminar.topic.toLowerCase().includes(lowercasedQuery))
      );
    }
    
    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(
        seminar => 
          seminar.category.toLowerCase() === activeCategory.toLowerCase() ||
          (seminar.topic && seminar.topic.toLowerCase().includes(activeCategory.toLowerCase()))
      );
    }
    
    // Apply price filter
    if (priceFilter === 'free') {
      filtered = filtered.filter(seminar => seminar.price === 0);
    } else if (priceFilter === 'paid') {
      filtered = filtered.filter(seminar => seminar.price > 0);
    }
    
    // Apply difficulty filter
    if (difficultyFilter.length > 0) {
      filtered = filtered.filter(seminar => 
        difficultyFilter.includes(seminar.difficultyLevel || 'All Levels')
      );
    }
    
    // Apply location filter
    if (locationFilter === 'virtual') {
      filtered = filtered.filter(seminar => 
        seminar.location.toLowerCase().includes('virtual')
      );
    } else if (locationFilter === 'in-person') {
      filtered = filtered.filter(seminar => 
        !seminar.location.toLowerCase().includes('virtual')
      );
    }
    
    // Apply favorites filter
    if (showOnlyFavorites) {
      filtered = filtered.filter(seminar => 
        savedSeminars.includes(seminar.id)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOrder) {
        case 'recent':
          // This is a mock sorting based on dates
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
        default:
          return b.attendees - a.attendees;
      }
    });
    
    setFilteredSeminars(filtered);
  }, [searchQuery, activeCategory, priceFilter, difficultyFilter, locationFilter, savedSeminars, showOnlyFavorites, sortOrder]);

  const handleToggleSave = (id: string) => {
    setSavedSeminars(prev => {
      const newSavedSeminars = prev.includes(id) 
        ? prev.filter(seminarId => seminarId !== id) 
        : [...prev, id];
      
      toast({
        title: prev.includes(id) ? "Removed from saved" : "Added to saved",
        description: prev.includes(id) 
          ? "The seminar has been removed from your saved list." 
          : "The seminar has been added to your saved list.",
      });
      
      return newSavedSeminars;
    });
  };

  const toggleSectionVisibility = (section: string) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setPriceFilter('all');
    setDifficultyFilter([]);
    setLocationFilter('all');
    setShowOnlyFavorites(false);
    setSortOrder('popular');
    
    toast({
      title: "Filters reset",
      description: "All filters have been cleared.",
    });
  };

  const toggleDifficultyFilter = (difficulty: string) => {
    setDifficultyFilter(prev => 
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const categoryFilteredSeminars = filteredSeminars;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="my-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Explore Seminars & Workshops</h1>
          
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search seminars..."
                className="pl-9 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {(priceFilter !== 'all' || difficultyFilter.length > 0 || locationFilter !== 'all') && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1">
                      {(priceFilter !== 'all' ? 1 : 0) + 
                      (difficultyFilter.length > 0 ? 1 : 0) + 
                      (locationFilter !== 'all' ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4" align="end">
                <h3 className="font-medium mb-3">Filter Seminars</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Price</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant={priceFilter === 'all' ? "default" : "outline"} 
                        size="sm"
                        className="w-full text-xs h-8" 
                        onClick={() => setPriceFilter('all')}
                      >
                        All
                      </Button>
                      <Button 
                        variant={priceFilter === 'free' ? "default" : "outline"} 
                        size="sm"
                        className="w-full text-xs h-8" 
                        onClick={() => setPriceFilter('free')}
                      >
                        Free
                      </Button>
                      <Button 
                        variant={priceFilter === 'paid' ? "default" : "outline"} 
                        size="sm"
                        className="w-full text-xs h-8" 
                        onClick={() => setPriceFilter('paid')}
                      >
                        Paid
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Difficulty</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((level) => (
                        <Button 
                          key={level}
                          variant={difficultyFilter.includes(level) ? "default" : "outline"} 
                          size="sm"
                          className="w-full text-xs h-8" 
                          onClick={() => toggleDifficultyFilter(level)}
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Location</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant={locationFilter === 'all' ? "default" : "outline"} 
                        size="sm"
                        className="w-full text-xs h-8" 
                        onClick={() => setLocationFilter('all')}
                      >
                        All
                      </Button>
                      <Button 
                        variant={locationFilter === 'virtual' ? "default" : "outline"} 
                        size="sm"
                        className="w-full text-xs h-8" 
                        onClick={() => setLocationFilter('virtual')}
                      >
                        Virtual
                      </Button>
                      <Button 
                        variant={locationFilter === 'in-person' ? "default" : "outline"} 
                        size="sm"
                        className="w-full text-xs h-8" 
                        onClick={() => setLocationFilter('in-person')}
                      >
                        In-person
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="favorites-only" className="text-sm font-medium cursor-pointer">
                        Show favorites only
                      </Label>
                      <Switch 
                        id="favorites-only" 
                        checked={showOnlyFavorites}
                        onCheckedChange={setShowOnlyFavorites}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
                  <DropdownMenuRadioItem value="popular">
                    <Users className="h-4 w-4 mr-2" /> Most Popular
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="recent">
                    <Calendar className="h-4 w-4 mr-2" /> Most Recent
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-low">
                    <ArrowRight className="h-4 w-4 mr-2 rotate-90" /> Price: Low to High
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-high">
                    <ArrowRight className="h-4 w-4 mr-2 -rotate-90" /> Price: High to Low
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9"
                    onClick={() => setViewMode(viewMode === 'grid' ? 'compact' : 'grid')}
                  >
                    {viewMode === 'grid' ? (
                      <Tag className="h-4 w-4" />
                    ) : (
                      <LayoutGrid className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle {viewMode === 'grid' ? 'Compact' : 'Grid'} View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 overflow-x-auto flex py-2 w-full justify-start gap-1">
              <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>
                All Seminars
              </TabsTrigger>
              <TabsTrigger value="development" onClick={() => setActiveCategory('development')}>
                Development
              </TabsTrigger>
              <TabsTrigger value="design" onClick={() => setActiveCategory('design')}>
                Design
              </TabsTrigger>
              <TabsTrigger value="ai" onClick={() => setActiveCategory('ai')}>
                AI & Machine Learning
              </TabsTrigger>
              <TabsTrigger value="management" onClick={() => setActiveCategory('management')}>
                Management
              </TabsTrigger>
              <TabsTrigger value="data" onClick={() => setActiveCategory('data')}>
                Data Science
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {searchQuery.trim() !== '' || activeCategory !== 'all' || priceFilter !== 'all' || difficultyFilter.length > 0 || locationFilter !== 'all' || showOnlyFavorites ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Search Results</h2>
                <Badge variant="outline" className="ml-2 bg-gray-100 text-gray-700 border-gray-200">
                  {categoryFilteredSeminars.length}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200 px-3 gap-1">
                  <Filter className="h-3 w-3" />
                  <span className="text-xs">{getActiveFiltersText()}</span>
                </Badge>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear
                </Button>
              </div>
            </div>
            
            {categoryFilteredSeminars.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-lg">
                <Search className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">No seminars found</h3>
                <p className="text-gray-500 max-w-md mt-2">
                  We couldn't find any seminars matching your search criteria. Try different keywords or filters.
                </p>
                <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryFilteredSeminars.map(seminar => (
                  <SeminarCard
                    key={seminar.id}
                    {...seminar}
                    isSaved={savedSeminars.includes(seminar.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3 max-w-5xl mx-auto">
                {categoryFilteredSeminars.map(seminar => (
                  <CompactSeminarCard
                    key={seminar.id}
                    {...seminar}
                    isSaved={savedSeminars.includes(seminar.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Flame className="h-5 w-5 text-orange-500 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Featured Seminars</h2>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm"
                  onClick={() => toggleSectionVisibility('featured')}
                >
                  {visibleSections.featured ? 'Hide Section' : 'Show Section'}
                </Button>
              </div>
              
              {visibleSections.featured && (
                <ScrollArea className="w-full whitespace-nowrap pb-4">
                  <div className="flex space-x-4 pb-4">
                    {FEATURED_SEMINARS.map(seminar => (
                      <SeminarCard
                        key={seminar.id}
                        {...seminar}
                        isSaved={savedSeminars.includes(seminar.id)}
                        onToggleSave={handleToggleSave}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            </div>
            
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Upcoming Seminars</h2>
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                    {UPCOMING_SEMINARS.length}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm"
                    onClick={() => toggleSectionVisibility('upcoming')}
                  >
                    {visibleSections.upcoming ? 'Hide Section' : 'Show Section'}
                  </Button>
                  <Link to="/seminars/all">
                    <Button variant="outline" size="sm" className="text-sm">
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {visibleSections.upcoming && (
                <ScrollArea className="w-full whitespace-nowrap pb-4">
                  <div className="flex space-x-4 pb-4">
                    {UPCOMING_SEMINARS.map(seminar => (
                      <SeminarCard
                        key={seminar.id}
                        {...seminar}
                        isSaved={savedSeminars.includes(seminar.id)}
                        onToggleSave={handleToggleSave}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            </div>
            
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-indigo-500 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Development Seminars</h2>
                  <Badge variant="outline" className="ml-2 bg-indigo-50 text-indigo-700 border-indigo-200">
                    {BY_TOPIC['Development'].length}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm"
                    onClick={() => toggleSectionVisibility('byTopic')}
                  >
                    {visibleSections.byTopic ? 'Hide Section' : 'Show Section'}
                  </Button>
                  <Link to="/seminars/development">
                    <Button variant="outline" size="sm" className="text-sm">
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {visibleSections.byTopic && (
                <ScrollArea className="w-full whitespace-nowrap pb-4">
                  <div className="flex space-x-4 pb-4">
                    {BY_TOPIC['Development'].map(seminar => (
                      <SeminarCard
                        key={seminar.id}
                        {...seminar}
                        isSaved={savedSeminars.includes(seminar.id)}
                        onToggleSave={handleToggleSave}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            </div>
            
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-green-500 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Free Seminars</h2>
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                    {FREE_SEMINARS.length}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm"
                    onClick={() => toggleSectionVisibility('free')}
                  >
                    {visibleSections.free ? 'Hide Section' : 'Show Section'}
                  </Button>
                  <Link to="/seminars/free">
                    <Button variant="outline" size="sm" className="text-sm">
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {visibleSections.free && (
                <ScrollArea className="w-full whitespace-nowrap pb-4">
                  <div className="flex space-x-4 pb-4">
                    {FREE_SEMINARS.map(seminar => (
                      <SeminarCard
                        key={seminar.id}
                        {...seminar}
                        isSaved={savedSeminars.includes(seminar.id)}
                        onToggleSave={handleToggleSave}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            </div>
            
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-purple-500 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Virtual Seminars</h2>
                  <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-700 border-purple-200">
                    {VIRTUAL_SEMINARS.length}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm"
                    onClick={() => toggleSectionVisibility('virtual')}
                  >
                    {visibleSections.virtual ? 'Hide Section' : 'Show Section'}
                  </Button>
                  <Link to="/seminars/virtual">
                    <Button variant="outline" size="sm" className="text-sm">
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {visibleSections.virtual && (
                <ScrollArea className="w-full whitespace-nowrap pb-4">
                  <div className="flex space-x-4 pb-4">
                    {VIRTUAL_SEMINARS.map(seminar => (
                      <SeminarCard
                        key={seminar.id}
                        {...seminar}
                        isSaved={savedSeminars.includes(seminar.id)}
                        onToggleSave={handleToggleSave}
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              )}
            </div>
            
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-gray-700 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Browse by Category</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Object.entries({
                  'Development': { icon: <BookOpen className="h-5 w-5" />, color: 'bg-blue-500' },
                  'Design': { icon: <Edit className="h-5 w-5" />, color: 'bg-pink-500' },
                  'AI': { icon: <Zap className="h-5 w-5" />, color: 'bg-purple-500' },
                  'Cloud': { icon: <Globe className="h-5 w-5" />, color: 'bg-cyan-500' },
                  'Security': { icon: <Info className="h-5 w-5" />, color: 'bg-red-500' },
                  'DevOps': { icon: <RotateCcw className="h-5 w-5" />, color: 'bg-green-500' },
                  'Blockchain': { icon: <LinkIcon className="h-5 w-5" />, color: 'bg-yellow-500' },
                  'Management': { icon: <Users className="h-5 w-5" />, color: 'bg-indigo-500' },
                  'Data': { icon: <BarChart2 className="h-5 w-5" />, color: 'bg-orange-500' },
                  'Mobile': { icon: <Mobile className="h-5 w-5" />, color: 'bg-emerald-500' }
                }).map(([category, { icon, color }]) => (
                  <Link 
                    key={category} 
                    to={`/seminars/category/${category.toLowerCase()}`}
                    className="flex flex-col items-center p-4 border rounded-xl hover:shadow-md transition-shadow text-center gap-2"
                  >
                    <div className={`p-3 rounded-full ${color} text-white`}>
                      {icon}
                    </div>
                    <span className="font-medium text-sm">{category}</span>
                    <span className="text-xs text-gray-500">
                      {BY_TOPIC[category]?.length || Math.floor(Math.random() * 10) + 2} events
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
  function getActiveFiltersText() {
    const filters = [];
    
    if (activeCategory !== 'all') filters.push(activeCategory);
    if (priceFilter !== 'all') filters.push(priceFilter === 'free' ? 'Free' : 'Paid');
    if (difficultyFilter.length > 0) filters.push(`${difficultyFilter.length} difficulties`);
    if (locationFilter !== 'all') filters.push(locationFilter === 'virtual' ? 'Virtual' : 'In-person');
    if (showOnlyFavorites) filters.push('Favorites');
    
    return filters.length > 0 ? filters.join(', ') : 'No filters';
  }
};

export default SeminarsPage;

// Create a new component for the compact seminar card view
interface CompactSeminarCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  price: number;
  category: string;
  topic?: string;
  speakersCount: number;
  duration: string;
  rating: number;
  attendees: number;
  maxAttendees: number;
  speakerImages: string[];
  difficultyLevel?: DifficultyLevel;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

const CompactSeminarCard: React.FC<CompactSeminarCardProps> = ({
  id,
  title,
  date,
  time,
  location,
  price,
  category,
  topic,
  difficultyLevel,
  attendees,
  maxAttendees,
  duration,
  isSaved,
  onToggleSave,
}) => {
  return (
    <div className="border rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all max-w-5xl mx-auto bg-white">
      <div className="flex gap-4">
        <div className="flex items-start">
          <Link to={`/seminar/${id}`} className="w-full">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h3 className="font-medium text-gray-900 hover:text-blue-700 transition-colors line-clamp-1">{title}</h3>
                
                <div className="flex items-center text-sm text-gray-600 mt-1 gap-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-gray-400" />
                    <span>{time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    <span>{location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  {price === 0 ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Free</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">${price}</Badge>
                  )}
                  
                  <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">{category}</Badge>
                  
                  {difficultyLevel && (
                    <Badge variant="outline" className={`
                      ${difficultyLevel === 'Beginner' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : difficultyLevel === 'Intermediate'
                          ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }
                    `}>
                      {difficultyLevel}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="ml-auto flex items-center gap-3">
          <div className="text-xs text-gray-600 flex items-center">
            <Users className="h-3.5 w-3.5 mr-1 text-gray-400" />
            <span>
              {attendees}/{maxAttendees} <span className="hidden sm:inline">attendees</span>
            </span>
          </div>
          
          <div className="text-xs text-gray-600 flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onToggleSave(id);
              }}
            >
              {isSaved ? (
                <Bookmark className="h-5 w-5 fill-blue-600 text-blue-600" />
              ) : (
                <Bookmark className="h-5 w-5 text-gray-400" />
              )}
            </Button>
            
            <Link to={`/seminar/${id}`}>
              <Button variant="outline" size="sm" className="h-8">
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// For the missing LayoutGrid component
const LayoutGrid = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
};
