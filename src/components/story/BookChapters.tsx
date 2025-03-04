
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Star, StarHalf, Clock, CheckCircle } from 'lucide-react';

type BookChaptersProps = {
  onSelectChapter: (chapterId: number) => void;
  currentChapterId: number;
};

const BookChapters = ({ onSelectChapter, currentChapterId }: BookChaptersProps) => {
  // Track expanded chapters in simple view
  const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({});
  
  // Reading progress
  const [readingProgress, setReadingProgress] = useState({
    1: 'completed',
    2: 'completed',
    3: 'in-progress',
    4: 'not-started',
    5: 'not-started',
    6: 'not-started',
    7: 'not-started',
    8: 'not-started',
    9: 'not-started',
    10: 'not-started',
    11: 'not-started',
    12: 'not-started',
    13: 'not-started',
    14: 'not-started',
    15: 'not-started'
  });
  
  // Chapter ratings
  const [chapterRatings, setChapterRatings] = useState({
    1: 4.5,
    2: 4.0,
    3: 5.0,
    4: 4.2,
    5: 4.8,
    6: 4.3,
    7: 4.6,
    8: 4.9,
    9: 4.7,
    10: 4.5,
    11: 4.2,
    12: 4.4,
    13: 4.3,
    14: 4.6,
    15: 4.8
  });
  
  // Estimated reading times (in minutes)
  const readingTimes: Record<number, number> = {
    1: 3,
    2: 2,
    3: 2,
    4: 2,
    5: 4,
    6: 2,
    7: 3,
    8: 2,
    9: 2,
    10: 2,
    11: 2,
    12: 3,
    13: 2,
    14: 2,
    15: 2
  };
  
  // Chapters data
  const chapters = [
    { 
      id: 1, 
      title: "A Vision is Born", 
      description: "Port-au-Prince was a city of both hope and hardship. I was one of the lucky ones—Plante Lavi covered my tuition, rent, and living expenses. But outside my small apartment, I saw a different reality: students struggling to afford education, businesses barely surviving, and talented people with no platform to showcase their skills.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 2, 
      title: "Staring Death in the Face", 
      description: "One morning, on my way to school, my reality shattered. Gunshots rang out. I barely escaped with my life. That day, I understood something deeper—survival in Haiti was not guaranteed.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 3, 
      title: "When Universities Closed Their Doors", 
      description: "As insecurity worsened, universities across the city shut down—including mine. For more than half a year, I was stranded. My education was paused, my dreams put on hold. But instead of waiting, I made a decision.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 4, 
      title: "Leaving Port-au-Prince", 
      description: "With no school and the city growing more dangerous, I had no choice but to return to my home village, Désarmes, in the last days of March 2024. It felt like a defeat. But soon, I realized something: If I could build this platform from anywhere, why not from here?",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 5, 
      title: "A Harsh Reality Hits Home", 
      description: "Back in Désarmes, I saw how much my friends and others from my generation were struggling. They weren't just worried about careers—they were struggling to survive. Many couldn't afford to go to university. Some had already given up on education entirely.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 6, 
      title: "The Deep Dive into Creation", 
      description: "With nothing but time on my hands, I threw myself into coding. I learned everything—databases, front-end, back-end. In just two years, I transformed from a dreamer into a builder. But my dedication came at a heavy price.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 7, 
      title: "The Cost of Obsession", 
      description: "I worked so hard that I lost track of the world. Some days I forgot to eat. Other days, I simply couldn't afford to. I poured everything into the platform, ignoring my health, my social life—everything. At times, I had no money left for food.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 8, 
      title: "The First Working Prototype", 
      description: "After months of relentless work, I finally had something tangible: an online marketplace for Haitian businesses. It was just a starting point, but it proved one thing—this wasn't just an idea anymore. It was happening.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 9, 
      title: "Expanding the Ecosystem", 
      description: "One feature at a time, my platform grew: a marketplace for Haitian entrepreneurs, an online learning hub for students and professionals, a contests platform for artists, musicians, and developers, and a digital wallet for seamless transactions.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 10, 
      title: "The Nonprofit Foundation", 
      description: "Building a digital future for Haiti was one thing. But what about those struggling to survive right now? So, I launched a nonprofit foundation to help those in need—supporting students, small businesses, and families who, like me, had no safety net.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 11, 
      title: "Finding Support", 
      description: "I started sharing my vision with anyone who would listen—investors, entrepreneurs, even strangers who believed in Haiti's potential. Some saw the vision. Others doubted it. But one thing was clear: we weren't waiting for change anymore—we were creating it.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 12, 
      title: "Building an Agency", 
      description: "Through this journey, I had gained something invaluable: mastery in coding. Now, I wanted to help others bring their ideas to life. So, I decided to launch an agency to help people build their dream websites and apps.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 13, 
      title: "The University Question", 
      description: "Despite everything, I still want to return to university. I will return—but I don't know when. The truth is, it doesn't matter if it's soon or later. Education is important, but my return doesn't financially depend on me.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 14, 
      title: "A Crossroads—Stay or Escape?", 
      description: "At one point, I seriously considered leaving Haiti. Insecurity was rising. Everything felt uncertain. I looked for opportunities to escape, but a mix of confusion, doubts, and conflicting encouragements left me unsure.",
      thumbnail: "/api/placeholder/600/400"
    },
    { 
      id: 15, 
      title: "The Future of Haiti's Digital Renaissance", 
      description: "This was never just about an app. It was about freedom. Haitians have been held back for too long. But now, we're building our own future. This platform is more than a business. It's a movement. A revolution. A space where Haitians can thrive—safely, freely, together.",
      thumbnail: "/api/placeholder/600/400"
    }
  ];
  
  // Toggle expansion of individual chapter in simple view
  const toggleChapterExpansion = (chapterId: number, e: React.MouseEvent) => {
    // Stop propagation to prevent triggering navigation when clicking the expand button
    e.stopPropagation();
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };
  
  // Handle chapter click
  const handleChapterClick = (chapterId: number) => {
    // Update reading progress when clicking on a new chapter
    setReadingProgress(prev => {
      const newProgress = {...prev};
      
      // Mark previous chapters as completed
      for (let i = 1; i < chapterId; i++) {
        newProgress[i] = 'completed';
      }
      
      // Mark current chapter as in-progress
      newProgress[chapterId] = 'in-progress';
      
      return newProgress;
    });
    
    // Call the parent's onSelectChapter function
    onSelectChapter(chapterId);
  };
  
  // Render stars for ratings
  const renderRating = (rating: number) => {
    if (rating === 0) return <span className="text-gray-400 text-xs">Not rated</span>;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
        ))}
        {hasHalfStar && <StarHalf size={14} className="text-yellow-500 fill-yellow-500" />}
        <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  // Render reading status icon
  const renderReadingStatus = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'in-progress':
        return <Clock size={16} className="text-blue-500" />;
      default:
        return <BookOpen size={16} className="text-gray-400" />;
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden 
                    animate-slide-up-in">
      {/* Header with title */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">The Digital Renaissance of Haiti</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500">15 chapters • Approximately 35 minutes of reading</p>
      </div>
      
      {/* Chapters section */}
      <div className="max-h-96 overflow-y-auto">
        {chapters.map((chapter) => (
          <div 
            key={chapter.id}
            className={`${
              chapter.id === currentChapterId ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50 border-l-4 border-transparent'
            } transition-colors`}
          >
            {/* Chapter header (always visible) */}
            <div 
              className="flex items-center p-4 cursor-pointer"
              onClick={() => handleChapterClick(chapter.id)}
            >
              <div className="mr-3 flex-shrink-0">
                {renderReadingStatus(readingProgress[chapter.id])}
              </div>
              
              <div className="mr-3 w-6 text-center font-mono text-sm text-gray-500">
                {chapter.id}
              </div>
              
              <div className="flex-grow">
                <h3 className={`font-medium ${chapter.id === currentChapterId ? 'text-blue-700' : 'text-gray-800'}`}>
                  {chapter.title}
                </h3>
                
                <div className="flex items-center mt-1 text-xs text-gray-500 space-x-3">
                  <span><Clock size={12} className="inline mr-1" /> {readingTimes[chapter.id]} min</span>
                  <span>{renderRating(chapterRatings[chapter.id])}</span>
                </div>
              </div>
              
              <div 
                className="ml-2 text-gray-400" 
                onClick={(e) => toggleChapterExpansion(chapter.id, e)}
              >
                {expandedChapters[chapter.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
            
            {/* Chapter description (visible only when expanded) */}
            {expandedChapters[chapter.id] && (
              <div className="px-4 pb-4 ml-12 mr-4 text-sm text-gray-600 border-t border-gray-100 pt-2 animate-fade-in">
                <p>{chapter.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookChapters;
