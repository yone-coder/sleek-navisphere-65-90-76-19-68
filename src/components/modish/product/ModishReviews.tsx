
import React, { useState } from 'react';
import { Star, ThumbsUp, Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function ModishReviews() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              <h4 className="text-3xl font-bold">4.8</h4>
              <div className="flex justify-center my-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} />
                ))}
              </div>
              <p className="text-sm text-gray-500">Based on 128 reviews</p>
            </div>
            
            <div className="mt-4 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-2">{rating}</span>
                  <Star className="w-3.5 h-3.5 text-gray-400" />
                  <Progress 
                    value={rating === 5 ? 75 : rating === 4 ? 18 : rating === 3 ? 5 : rating === 2 ? 2 : 0} 
                    className="h-2 flex-1"
                  />
                  <span className="text-sm text-gray-600 w-8">
                    {rating === 5 ? '75%' : rating === 4 ? '18%' : rating === 3 ? '5%' : rating === 2 ? '2%' : '0%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Review Filters</h4>
            <div className="space-y-2">
              <Button 
                variant={activeFilter === 'all' ? "default" : "outline"} 
                size="sm" 
                className="w-full justify-start"
                onClick={() => setActiveFilter('all')}
              >
                <Filter className="w-4 h-4 mr-2" />
                All Reviews
              </Button>
              <Button 
                variant={activeFilter === 'positive' ? "default" : "outline"} 
                size="sm" 
                className="w-full justify-start"
                onClick={() => setActiveFilter('positive')}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Positive Only
              </Button>
              <Button 
                variant={activeFilter === 'photos' ? "default" : "outline"} 
                size="sm" 
                className="w-full justify-start"
                onClick={() => setActiveFilter('photos')}
              >
                <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                With Photos
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Search Reviews</h4>
            <div className="relative">
              <input
                type="search"
                placeholder="Search in reviews..."
                className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {[
            {
              author: "Sarah J.",
              rating: 5,
              date: "August 23, 2023",
              title: "Perfect addition to my collection!",
              content: "I absolutely love this product. The quality is outstanding and it looks even better in person than in the photos. Shipping was quick and the packaging was eco-friendly which I really appreciate.",
              helpful: 24
            },
            {
              author: "Michael T.",
              rating: 4,
              date: "July 15, 2023",
              title: "Great quality, small design flaw",
              content: "Overall this is an excellent product. The materials and build quality are top-notch. My only complaint is a small design issue that could be improved, but it doesn't affect the functionality. Would recommend!",
              helpful: 12
            },
            {
              author: "Emma L.",
              rating: 5,
              date: "June 30, 2023",
              title: "Exceeded my expectations",
              content: "I was hesitant to order this at first, but I'm so glad I did! The product arrived ahead of schedule and was exactly as described. The attention to detail is impressive and it fits perfectly with my existing items.",
              helpful: 8
            }
          ].map((review, index) => (
            <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{review.author}</h4>
                  <div className="flex items-center my-1 gap-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">• {review.date}</span>
                  </div>
                </div>
                <Badge variant="outline" className="bg-gray-50">Verified Purchase</Badge>
              </div>
              
              <h5 className="font-medium mt-2">{review.title}</h5>
              <p className="text-gray-600 mt-1 mb-3 text-sm">{review.content}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  {review.helpful} people found this helpful
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600">Helpful</Button>
              </div>
            </div>
          ))}
          
          <div className="text-center">
            <Button variant="outline" className="w-full md:w-auto">Load More Reviews</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
