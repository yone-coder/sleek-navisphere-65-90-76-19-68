
import React from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

export type ModishReviewsProps = {
  productId: string;
};

export function ModishReviews({ productId }: ModishReviewsProps) {
  // This is just a placeholder component - in a real app we would fetch reviews
  const reviews = [
    {
      id: '1',
      user: 'John D.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      rating: 5,
      date: '2023-08-15',
      content: 'Great product, exactly as described. Fast shipping too!',
      images: ['/api/placeholder/80/80', '/api/placeholder/80/80'],
      helpful: 42,
      replies: 3
    },
    {
      id: '2',
      user: 'Sarah M.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      rating: 4,
      date: '2023-08-10',
      content: 'Good quality for the price. Would recommend.',
      images: [],
      helpful: 15,
      replies: 1
    },
    {
      id: '3',
      user: 'Robert K.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
      rating: 5,
      date: '2023-08-01',
      content: 'Absolutely love it! Will be ordering again soon.',
      images: ['/api/placeholder/80/80'],
      helpful: 27,
      replies: 0
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Customer Reviews</h3>
        <button className="text-sm text-red-500 font-medium">Write a Review</button>
      </div>
      
      {/* Rating summary */}
      <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">4.8</span>
          <div className="flex">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">Based on {productId ? '1,245' : '0'} reviews</span>
      </div>
      
      {/* Reviews list */}
      <div className="space-y-4 mt-4">
        {reviews.map(review => (
          <div key={review.id} className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={review.avatar} alt={review.user} className="w-8 h-8 rounded-full" />
                <span className="font-medium">{review.user}</span>
              </div>
              <span className="text-xs text-gray-500">{review.date}</span>
            </div>
            
            <div className="flex mt-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className={`w-4 h-4 ${i <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            
            <p className="mt-2 text-sm text-gray-700">{review.content}</p>
            
            {review.images.length > 0 && (
              <div className="flex gap-2 mt-2">
                {review.images.map((img, i) => (
                  <img key={i} src={img} alt="Review" className="w-16 h-16 object-cover rounded-md" />
                ))}
              </div>
            )}
            
            <div className="flex gap-4 mt-3">
              <button className="flex items-center gap-1 text-xs text-gray-500">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-500">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Reply ({review.replies})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 mt-2">
        Load More Reviews
      </button>
    </div>
  );
}
