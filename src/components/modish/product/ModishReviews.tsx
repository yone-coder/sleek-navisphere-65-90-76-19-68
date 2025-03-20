
import React, { useState, useEffect } from 'react';
import { Star, ChevronRight, MessageCircle, ThumbsUp, ChevronLeft, Info } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ModishReviewsProps = {
  productId: string;
};

type Review = {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
};

export function ModishReviews({ productId }: ModishReviewsProps) {
  // Mock review data
  const reviewsData = [
    {
      id: 1,
      author: 'Sarah J.',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      date: 'Aug 12, 2023',
      content: 'Absolute game changer for my home office setup. The comfort is unmatched, and the quality is apparent in every detail.',
      helpful: 24,
    },
    {
      id: 2,
      author: 'Michael T.',
      avatar: 'https://i.pravatar.cc/150?img=4',
      rating: 4,
      date: 'Jul 29, 2023',
      content: 'Very comfortable and well-built chair. The materials are premium and it was easy to assemble. Taking off one star because the armrests could be more adjustable.',
      helpful: 16,
    },
    {
      id: 3,
      author: 'Emily R.',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      date: 'Sep 3, 2023',
      content: 'I spend 8+ hours a day in this chair and my back pain has completely disappeared. The leather is buttery soft and the walnut frame matches my desk perfectly.',
      helpful: 32,
    },
    {
      id: 4,
      author: 'David L.',
      avatar: 'https://i.pravatar.cc/150?img=8',
      rating: 5,
      date: 'Aug 5, 2023',
      content: 'Worth every penny. The build quality is exceptional and it looks even better in person than in the photos. Highly recommend!',
      helpful: 19,
    },
    {
      id: 5,
      author: 'Jessica M.',
      avatar: 'https://i.pravatar.cc/150?img=9',
      rating: 3,
      date: 'Jul 15, 2023',
      content: 'The chair looks beautiful and is well-made, but I found it a bit too firm for my liking. Still, the craftsmanship is excellent.',
      helpful: 11,
    },
  ];

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showMoreContent, setShowMoreContent] = useState(false);
  
  const currentReview = reviewsData[currentReviewIndex];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
        setShowMoreContent(false);
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [reviewsData.length, isPaused]);
  
  const handleMouseEnter = () => {
    setIsPaused(true);
  };
  
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const goToNextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
    setShowMoreContent(false);
  };

  const goToPrevReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviewsData.length) % reviewsData.length);
    setShowMoreContent(false);
  };

  const toggleMoreContent = () => {
    setShowMoreContent(prev => !prev);
    if (!showMoreContent) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
      </div>
      
      <div className="flex gap-6 flex-col">
        <div className="flex-1">
          <Card 
            className="relative overflow-hidden transition-all duration-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-300"></div>
            
            <button 
              onClick={goToPrevReview} 
              className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md z-10 hover:bg-white transition-all duration-200"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button 
              onClick={goToNextReview} 
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md z-10 hover:bg-white transition-all duration-200"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <CardContent className="p-5">
              <div className="absolute top-2 right-2 text-xs font-medium bg-white/90 rounded-full px-2 py-0.5 shadow-sm border border-gray-100">
                {currentReviewIndex + 1}/{reviewsData.length}
              </div>
              
              <button 
                onClick={toggleMoreContent}
                className={`absolute top-2 left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:bg-white transition-colors ${showMoreContent ? 'bg-gray-100' : 'bg-white/90'}`}
                aria-label={showMoreContent ? "Show less" : "Show more"}
              >
                <Info className="w-3.5 h-3.5" />
              </button>
              
              <div className="flex items-start gap-3 pt-2">
                <Avatar className="h-12 w-12 border border-gray-200">
                  <AvatarImage src={currentReview.avatar} alt={currentReview.author} />
                  <AvatarFallback>{currentReview.author.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{currentReview.author}</h4>
                    <span className="text-xs text-gray-500">{currentReview.date}</span>
                  </div>
                  
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, index) => (
                      <Star 
                        key={index}
                        className={`w-3.5 h-3.5 ${index < currentReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  
                  <p className={cn(
                    "text-sm text-gray-700 mt-2",
                    showMoreContent ? "" : "line-clamp-3"
                  )}>
                    {currentReview.content}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-700">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Helpful ({currentReview.helpful})
                    </button>
                    
                    <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-700">
                      <MessageCircle className="w-3.5 h-3.5" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <div className="w-full h-1 bg-gray-200 overflow-hidden">
              <div 
                className="h-full transition-all duration-300 bg-yellow-300" 
                style={{ width: `${((currentReviewIndex + 1) / reviewsData.length) * 100}%` }}
              />
            </div>
          </Card>
          
          <div className="flex justify-center mt-4 gap-2">
            {reviewsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentReviewIndex(index);
                  setShowMoreContent(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentReviewIndex === index 
                    ? 'bg-yellow-400 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
