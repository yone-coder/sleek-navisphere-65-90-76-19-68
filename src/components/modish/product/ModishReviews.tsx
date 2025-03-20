
import React, { useState } from 'react';
import { Star, ThumbsUp, Search, Filter, Video, CheckCircle, Clock, ChevronDown, ChevronUp, User, Camera } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export function ModishReviews() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  
  const reviews = [
    {
      id: "1",
      author: "Sarah J.",
      rating: 5,
      date: "August 23, 2023",
      title: "Perfect addition to my collection!",
      content: "I absolutely love this product. The quality is outstanding and it looks even better in person than in the photos. Shipping was quick and the packaging was eco-friendly which I really appreciate. I've been using it daily for the past month and it shows no signs of wear and tear. The sound quality is amazing and the battery life exceeds what was advertised. Definitely worth every penny!",
      helpful: 24,
      verified: true,
      images: ['/api/placeholder/120/120', '/api/placeholder/120/120'],
      hasVideo: true,
    },
    {
      id: "2",
      author: "Michael T.",
      rating: 4,
      date: "July 15, 2023",
      title: "Great quality, small design flaw",
      content: "Overall this is an excellent product. The materials and build quality are top-notch. My only complaint is a small design issue that could be improved, but it doesn't affect the functionality. Would recommend!",
      helpful: 12,
      verified: true,
      images: [],
      hasVideo: false,
    },
    {
      id: "3",
      author: "Emma L.",
      rating: 5,
      date: "June 30, 2023",
      title: "Exceeded my expectations",
      content: "I was hesitant to order this at first, but I'm so glad I did! The product arrived ahead of schedule and was exactly as described. The attention to detail is impressive and it fits perfectly with my existing items.",
      helpful: 8,
      verified: true,
      images: ['/api/placeholder/120/120'],
      hasVideo: false,
    },
    {
      id: "4",
      author: "James B.",
      rating: 3,
      date: "May 12, 2023",
      title: "Good but not great",
      content: "The product works as described but I've found a few minor issues. The battery life is shorter than advertised and the build quality could be better for the price point. That said, it does the job adequately.",
      helpful: 15,
      verified: true,
      images: [],
      hasVideo: false,
    },
    {
      id: "5",
      author: "Alexandra R.",
      rating: 5,
      date: "April 28, 2023",
      title: "Best purchase I've made this year!",
      content: "I can't say enough good things about this product! It has completely transformed my daily routine. The sound quality is crystal clear and the connection is stable. I use it for hours every day and the battery lasts well over 10 hours. Highly recommend!",
      helpful: 32,
      verified: true,
      images: ['/api/placeholder/120/120', '/api/placeholder/120/120', '/api/placeholder/120/120'],
      hasVideo: true,
    }
  ];

  const toggleExpandReview = (reviewId: string) => {
    setExpandedReview(expandedReview === reviewId ? null : reviewId);
  };

  const handleMarkHelpful = (reviewId: string) => {
    toast({
      title: "Marked as helpful",
      description: "Thank you for your feedback",
      duration: 2000,
    });
  };

  const handleWriteReview = () => {
    toast({
      title: "Write a review",
      description: "Opening review form",
      duration: 2000,
    });
  };

  const filteredReviews = reviews.filter(review => {
    // Filter by search query
    if (searchQuery && !review.content.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !review.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by tab (all, positive, with media)
    if (activeTab === 'photos' && review.images.length === 0 && !review.hasVideo) {
      return false;
    }
    if (activeTab === 'video' && !review.hasVideo) {
      return false;
    }
    if (activeTab === 'positive' && review.rating < 4) {
      return false;
    }
    if (activeTab === 'critical' && review.rating >= 4) {
      return false;
    }
    
    // Filter by sidebar filters
    if (activeFilter === 'positive' && review.rating < 4) {
      return false;
    }
    if (activeFilter === 'photos' && review.images.length === 0 && !review.hasVideo) {
      return false;
    }
    
    return true;
  });
  
  // Calculate rating summary
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const ratingCounts = [0, 0, 0, 0, 0]; // Index 0 for 1 star, etc.
  reviews.forEach(review => {
    ratingCounts[review.rating - 1]++;
  });
  const ratingPercentages = ratingCounts.map(count => (count / reviews.length) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              <h4 className="text-3xl font-bold">{averageRating.toFixed(1)}</h4>
              <div className="flex justify-center my-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-4 h-4 ${star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} />
                ))}
              </div>
              <p className="text-sm text-gray-500">Based on {reviews.length} reviews</p>
            </div>
            
            <div className="mt-4 space-y-2">
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-2">{rating}</span>
                  <Star className="w-3.5 h-3.5 text-gray-400" />
                  <Progress 
                    value={ratingPercentages[rating - 1]} 
                    className="h-2 flex-1"
                  />
                  <span className="text-sm text-gray-600 w-10">
                    {ratingPercentages[rating - 1].toFixed(0)}%
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleWriteReview}
          >
            Write a Review
          </Button>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="positive">Positive</TabsTrigger>
              <TabsTrigger value="critical">Critical</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {filteredReviews.length > 0 ? (
                <div className="space-y-6">
                  {filteredReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">{review.author}</h4>
                            <div className="flex items-center text-xs text-gray-500">
                              <span>{review.date}</span>
                              {review.verified && (
                                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200 text-[10px]">
                                  <CheckCircle className="mr-1 h-2.5 w-2.5" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      
                      <h5 className="font-medium mt-3">{review.title}</h5>
                      <p className={`text-gray-600 mt-1 mb-3 text-sm ${review.content.length > 150 && expandedReview !== review.id ? 'line-clamp-3' : ''}`}>
                        {review.content}
                      </p>
                      
                      {review.content.length > 150 && (
                        <button 
                          className="text-blue-600 text-sm flex items-center mb-3"
                          onClick={() => toggleExpandReview(review.id)}
                        >
                          {expandedReview === review.id ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1" />
                              Show less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1" />
                              Read more
                            </>
                          )}
                        </button>
                      )}
                      
                      {(review.images.length > 0 || review.hasVideo) && (
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                          {review.hasVideo && (
                            <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Video className="w-6 h-6 text-gray-400" />
                              </div>
                              <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded">
                                0:32
                              </span>
                            </div>
                          )}
                          
                          {review.images.map((image, index) => (
                            <div key={index} className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                              <img src={image} alt={`Review ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {review.helpful} people found this helpful
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600"
                          onClick={() => handleMarkHelpful(review.id)}
                        >
                          <ThumbsUp className="w-3.5 h-3.5 mr-1" />
                          Helpful
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center">
                    <Button variant="outline" className="w-full md:w-auto">Load More Reviews</Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    {activeTab === 'photos' ? (
                      <Camera className="w-6 h-6 text-gray-400" />
                    ) : activeTab === 'video' ? (
                      <Video className="w-6 h-6 text-gray-400" />
                    ) : (
                      <Star className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No reviews found</h3>
                  <p className="text-gray-500 text-sm max-w-md">
                    We couldn't find any reviews matching your current filters. Try adjusting your filters or be the first to add a review.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
