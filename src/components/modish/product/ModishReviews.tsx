
import React from 'react';
import { Star, ChevronRight, MessageCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

type ModishReviewsProps = {
  rating: number;
  reviewCount: number;
};

export function ModishReviews({ rating, reviewCount }: ModishReviewsProps) {
  // Mock review data
  const ratingBreakdown = [
    { stars: 5, percentage: 72 },
    { stars: 4, percentage: 18 },
    { stars: 3, percentage: 7 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 },
  ];
  
  const reviewPreviews = [
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
  ];

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Reviews ({reviewCount})</h3>
        <button className="text-sm font-medium text-blue-600 flex items-center gap-1">
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="md:w-56 p-4 bg-gray-50 rounded-lg flex flex-col items-center">
          <div className="text-3xl font-bold text-gray-900">{rating.toFixed(1)}</div>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, index) => (
              <Star 
                key={index}
                className={`w-4 h-4 ${index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-1">Based on {reviewCount} reviews</div>
          
          <div className="w-full space-y-2 mt-4">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-2">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-xs text-gray-700">{item.stars}</span>
                  <Star className="w-3 h-3 text-yellow-400" />
                </div>
                <Progress value={item.percentage} className="flex-1 h-2" />
                <span className="text-xs text-gray-500 w-7 text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 border border-gray-300 text-gray-700 h-10 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Write a Review
          </button>
        </div>
        
        <div className="flex-1 space-y-4">
          {reviewPreviews.map((review) => (
            <div key={review.id} className="p-4 border border-gray-100 rounded-lg">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border border-gray-200">
                  <AvatarImage src={review.avatar} alt={review.author} />
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{review.author}</h4>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, index) => (
                      <Star 
                        key={index}
                        className={`w-3.5 h-3.5 ${index < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-700 mt-2 line-clamp-3">{review.content}</p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      Helpful ({review.helpful})
                    </button>
                    
                    <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-700">
                      <MessageCircle className="w-4 h-4" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
