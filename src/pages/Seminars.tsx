
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
  Link as LinkIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { HeroSection } from '@/components/seminar/HeroSection';

// Sample data for seminars
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
  }
];

// Categorization of seminars
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
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    featured: true,
    upcoming: true,
    free: true,
    virtual: true,
    byTopic: true
  });

  const handleToggleSave = (id: string) => {
    setSavedSeminars(prev => 
      prev.includes(id) 
        ? prev.filter(seminarId => seminarId !== id) 
        : [...prev, id]
    );
  };

  const toggleSectionVisibility = (section: string) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <HeroSection />
      
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 mr-1" /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter Seminars</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Calendar className="h-4 w-4 mr-2" /> Upcoming Events
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Globe className="h-4 w-4 mr-2" /> Online Only
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Tag className="h-4 w-4 mr-2" /> Free Events
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Info className="h-4 w-4 mr-2" /> With Certificate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Star className="h-4 w-4 mr-2" /> Highest Rated
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="h-4 w-4 mr-2" /> Most Popular
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        
        {/* Featured Seminars Section */}
        {visibleSections.featured && (
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
                Hide Section
              </Button>
            </div>
            
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
          </div>
        )}
        
        {/* Upcoming Seminars Section */}
        {visibleSections.upcoming && (
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
                  Hide Section
                </Button>
                <Link to="/seminars/all">
                  <Button variant="outline" size="sm" className="text-sm">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
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
          </div>
        )}
        
        {/* Development Seminars Section */}
        {visibleSections.byTopic && (
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
                  Hide Section
                </Button>
                <Link to="/seminars/development">
                  <Button variant="outline" size="sm" className="text-sm">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
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
          </div>
        )}
        
        {/* Free Seminars Section */}
        {visibleSections.free && (
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
                  Hide Section
                </Button>
                <Link to="/seminars/free">
                  <Button variant="outline" size="sm" className="text-sm">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
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
          </div>
        )}
        
        {/* Virtual Seminars Section */}
        {visibleSections.virtual && (
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
                  Hide Section
                </Button>
                <Link to="/seminars/virtual">
                  <Button variant="outline" size="sm" className="text-sm">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
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
          </div>
        )}
        
        {/* Categories Explorer */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <Tag className="h-5 w-5 text-gray-700 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Browse by Category</h2>
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
      </div>
    </div>
  );
};

export default SeminarsPage;
