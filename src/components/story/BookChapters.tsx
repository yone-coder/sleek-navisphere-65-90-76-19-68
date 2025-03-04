
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Star, StarHalf, Clock, CheckCircle } from 'lucide-react';

const BookChapters = () => {
  // Currently selected chapter
  const [currentChapterId, setCurrentChapterId] = useState(3);
  
  // Track expanded chapters in simple view
  const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({});
  
  // Reading progress
  const [readingProgress, setReadingProgress] = useState({
    1: 'completed',
    2: 'completed',
    3: 'in-progress',
    4: 'not-started',
    5: 'not-started',
    6: 'not-started'
  });
  
  // Chapter ratings
  const [chapterRatings, setChapterRatings] = useState({
    1: 4.5,
    2: 4.0,
    3: 5.0,
    4: 0,
    5: 0,
    6: 0
  });
  
  // Estimated reading times (in minutes)
  const readingTimes: Record<number, number> = {
    1: 15,
    2: 25,
    3: 40,
    4: 35,
    5: 30,
    6: 20
  };
  
  // Chapters data with thumbnails and descriptions
  const chapters = [
    { 
      id: 1, 
      title: 'Introduction', 
      description: 'Overview of the book content and key topics. This chapter sets the stage for the entire book, introducing the main concepts and providing context for the reader.',
      keyPoints: [
        'Historical background of the topic',
        'Introduction to key terminology',
        'Overview of major challenges'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop'
    },
    { 
      id: 2, 
      title: 'Problem Statement', 
      description: 'Defining the problem we are trying to solve in detail. This chapter breaks down the complex issues at hand and explains why they matter in both theoretical and practical contexts.',
      keyPoints: [
        'Definition of the core problem',
        'Analysis of existing approaches',
        'Identification of knowledge gaps'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&auto=format&fit=crop' 
    },
    { 
      id: 3, 
      title: 'Methodology', 
      description: 'The approach and techniques used to address the problem. This chapter outlines the research methods, theoretical frameworks, and analytical approaches that form the foundation of our investigation.',
      keyPoints: [
        'Research design and rationale',
        'Data collection methods',
        'Analytical framework development'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop' 
    },
    { 
      id: 4, 
      title: 'Results', 
      description: 'Findings and comprehensive data analysis from our research. This chapter presents the outcomes of our methodology and provides detailed evidence for our conclusions.',
      keyPoints: [
        'Primary findings and statistics',
        'Pattern analysis and correlations',
        'Comparative results across segments'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop' 
    },
    { 
      id: 5, 
      title: 'Discussion', 
      description: 'Interpretation of results and their broader implications. This chapter contextualizes our findings within the larger field and explores their significance for theory and practice.',
      keyPoints: [
        'Theoretical implications of findings',
        'Practical applications in real-world contexts',
        'Limitations and alternative interpretations'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop' 
    },
    { 
      id: 6, 
      title: 'Conclusion', 
      description: 'Summary of key insights and directions for future work. This chapter synthesizes the entire book and points toward new avenues for exploration and application.',
      keyPoints: [
        'Synthesis of main arguments',
        'Recommendations for implementation',
        'Future research directions'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&auto=format&fit=crop' 
    }
  ];
  
  // Toggle expansion of individual chapter in simple view
  const toggleChapterExpansion = (chapterId: number) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };
  
  // Handle chapter click
  const handleChapterClick = (chapterId: number) => {
    setCurrentChapterId(chapterId);
    
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
          <h2 className="text-xl font-semibold text-gray-800">Book Contents</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500">6 chapters • Approximately 2.5 hours of reading</p>
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
              onClick={() => toggleChapterExpansion(chapter.id)}
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
              
              <div className="ml-2 text-gray-400">
                {expandedChapters[chapter.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
            
            {/* Chapter details (conditional) */}
            {expandedChapters[chapter.id] && (
              <div className="px-4 pb-4 pt-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex-shrink-0 mb-3 md:mb-0 md:pr-4">
                    <img 
                      src={chapter.thumbnail} 
                      alt={chapter.title}
                      className="w-full rounded-md shadow-sm object-cover"
                    />
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={14} className="mr-1" />
                        <span>{readingTimes[chapter.id]} min read</span>
                      </div>
                      <div>
                        {renderRating(chapterRatings[chapter.id])}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <p className="text-gray-700 text-sm mb-4">
                      {chapter.description}
                    </p>
                    
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Key Points</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {chapter.keyPoints.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <button 
                      className={`mt-2 px-3 py-1 text-sm rounded-md transition-colors ${
                        chapter.id === currentChapterId
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => handleChapterClick(chapter.id)}
                    >
                      {readingProgress[chapter.id] === 'completed' 
                        ? 'Review Chapter' 
                        : readingProgress[chapter.id] === 'in-progress' 
                          ? 'Continue Reading' 
                          : 'Start Reading'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookChapters;
