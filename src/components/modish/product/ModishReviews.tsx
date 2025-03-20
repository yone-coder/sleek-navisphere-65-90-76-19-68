
import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, Filter, ThumbsUp, ThumbsDown, MessageSquare, Image, MoreVertical, User, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Review = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title?: string;
  content: string;
  images?: string[];
  likes: number;
  dislikes: number;
  isVerifiedPurchase: boolean;
  isHelpful?: boolean;
  isNotHelpful?: boolean;
  color?: string;
  size?: string;
};

type ModishReviewsProps = {
  productId: string;
};

export function ModishReviews({ productId }: ModishReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('recent');
  const [showImageReviews, setShowImageReviews] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Rating distribution
  const ratingDistribution = {
    5: 65,
    4: 22,
    3: 8,
    2: 3,
    1: 2
  };
  
  // Calculate average rating
  const averageRating = (
    (5 * ratingDistribution[5] + 
     4 * ratingDistribution[4] + 
     3 * ratingDistribution[3] + 
     2 * ratingDistribution[2] + 
     1 * ratingDistribution[1]) / 100
  ).toFixed(1);

  useEffect(() => {
    // Mock API call to fetch reviews
    const fetchReviews = async () => {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock reviews data
      const mockReviews: Review[] = [
        {
          id: '1',
          userId: 'user1',
          userName: 'John Smith',
          userAvatar: '/api/placeholder/30/30',
          rating: 5,
          date: '2023-09-15',
          title: 'Excellent sound quality!',
          content: 'I was skeptical at first due to the price point, but this speaker exceeded my expectations! The sound is incredibly clear with deep bass, and it gets plenty loud for outdoor gatherings.',
          images: ['/api/placeholder/200/200', '/api/placeholder/200/200'],
          likes: 24,
          dislikes: 2,
          isVerifiedPurchase: true,
          color: 'Black',
          size: 'Medium'
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Sarah Johnson',
          rating: 4,
          date: '2023-08-22',
          content: 'Great speaker with amazing battery life. I took it on a weekend camping trip and it lasted the entire time. The only downside is that it takes a bit long to charge fully.',
          likes: 18,
          dislikes: 1,
          isVerifiedPurchase: true,
          color: 'Blue'
        },
        {
          id: '3',
          userId: 'user3',
          userName: 'Michael Wong',
          rating: 3,
          date: '2023-09-03',
          title: 'Good but not great',
          content: 'Sound quality is decent for the price, but I was expecting better bass response. The build quality feels durable though, and the water resistance works as advertised.',
          likes: 7,
          dislikes: 3,
          isVerifiedPurchase: false,
          size: 'Large'
        },
        {
          id: '4',
          userId: 'user4',
          userName: 'Emily Davis',
          userAvatar: '/api/placeholder/30/30',
          rating: 5,
          date: '2023-07-15',
          content: 'Perfect size for my kitchen counter! I use it every day while cooking and the sound quality is excellent. The bluetooth connection is stable even when I move around the house with my phone.',
          images: ['/api/placeholder/200/200'],
          likes: 32,
          dislikes: 0,
          isVerifiedPurchase: true,
          color: 'White',
          size: 'Small'
        },
        {
          id: '5',
          userId: 'user5',
          userName: 'Robert Chen',
          rating: 2,
          date: '2023-08-10',
          title: 'Disappointing battery life',
          content: 'The speaker sounds good, but the battery life is nowhere near the advertised 10 hours. I barely get 5-6 hours even at medium volume. Customer service wasn\'t very helpful either.',
          likes: 14,
          dislikes: 8,
          isVerifiedPurchase: true,
          color: 'Black',
          size: 'Medium'
        },
      ];
      
      setReviews(mockReviews);
      setLoading(false);
    };
    
    fetchReviews();
  }, [productId]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const toggleReviewExpand = (reviewId: string) => {
    if (expandedReview === reviewId) {
      setExpandedReview(null);
    } else {
      setExpandedReview(reviewId);
    }
  };

  const handleReviewHelpful = (reviewId: string, isHelpful: boolean) => {
    setReviews(prevReviews => 
      prevReviews.map(review => {
        if (review.id === reviewId) {
          if (isHelpful) {
            // If already marked as helpful, remove the mark
            if (review.isHelpful) {
              return { 
                ...review, 
                isHelpful: false, 
                likes: review.likes - 1 
              };
            }
            // If marked as not helpful before, switch
            else if (review.isNotHelpful) {
              return { 
                ...review, 
                isHelpful: true, 
                isNotHelpful: false, 
                likes: review.likes + 1, 
                dislikes: review.dislikes - 1 
              };
            }
            // Fresh helpful mark
            else {
              return { 
                ...review, 
                isHelpful: true, 
                likes: review.likes + 1 
              };
            }
          } else {
            // If already marked as not helpful, remove the mark
            if (review.isNotHelpful) {
              return { 
                ...review, 
                isNotHelpful: false, 
                dislikes: review.dislikes - 1 
              };
            }
            // If marked as helpful before, switch
            else if (review.isHelpful) {
              return { 
                ...review, 
                isNotHelpful: true, 
                isHelpful: false, 
                dislikes: review.dislikes + 1, 
                likes: review.likes - 1 
              };
            }
            // Fresh not helpful mark
            else {
              return { 
                ...review, 
                isNotHelpful: true, 
                dislikes: review.dislikes + 1 
              };
            }
          }
        }
        return review;
      })
    );
  };

  // Apply filters and sorting
  let filteredReviews = [...reviews];
  
  if (activeFilter === 'positive') {
    filteredReviews = filteredReviews.filter(review => review.rating >= 4);
  } else if (activeFilter === 'critical') {
    filteredReviews = filteredReviews.filter(review => review.rating <= 3);
  } else if (activeFilter === 'verified') {
    filteredReviews = filteredReviews.filter(review => review.isVerifiedPurchase);
  } else if (activeFilter === 'images') {
    filteredReviews = filteredReviews.filter(review => review.images && review.images.length > 0);
  }
  
  if (sortBy === 'recent') {
    filteredReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } else if (sortBy === 'helpful') {
    filteredReviews.sort((a, b) => b.likes - a.likes);
  } else if (sortBy === 'highest') {
    filteredReviews.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'lowest') {
    filteredReviews.sort((a, b) => a.rating - b.rating);
  }

  // Get reviews with images
  const reviewsWithImages = reviews.filter(review => review.images && review.images.length > 0);

  return (
    <div className="space-y-4">
      {/* Reviews summary */}
      <div className="bg-white rounded-lg p-3 border border-gray-200 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{averageRating}</div>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-4 w-4",
                    parseFloat(averageRating) >= star
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
              <span className="ml-1 text-xs text-gray-500">({reviews.length} reviews)</span>
            </div>
          </div>
          
          <Button 
            onClick={() => setShowWriteReview(true)}
            className="bg-red-500 hover:bg-red-600"
          >
            Write a Review
          </Button>
        </div>
        
        {/* Rating distribution */}
        <div className="space-y-1.5">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <div className="flex items-center gap-1 w-16">
                <span className="text-xs">{rating}</span>
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full",
                    rating >= 4 ? "bg-green-500" : rating === 3 ? "bg-yellow-500" : "bg-red-500"
                  )}
                  style={{ width: `${ratingDistribution[rating as keyof typeof ratingDistribution]}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 w-8 text-right">
                {ratingDistribution[rating as keyof typeof ratingDistribution]}%
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reviews with images section */}
      {reviewsWithImages.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Customer Images</h3>
            <button 
              className="text-xs text-blue-600"
              onClick={() => setShowImageReviews(true)}
            >
              View all
            </button>
          </div>
          
          <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
            {reviewsWithImages.flatMap(review => 
              review.images?.map((image, index) => (
                <div 
                  key={`${review.id}-${index}`}
                  className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden"
                  onClick={() => toggleReviewExpand(review.id)}
                >
                  <img 
                    src={image} 
                    alt={`Review by ${review.userName}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      {/* Filter controls */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'All Reviews' },
          { id: 'verified', label: 'Verified Purchases' },
          { id: 'positive', label: '4★ & Up' },
          { id: 'critical', label: 'Critical' },
          { id: 'images', label: 'With Images' },
        ].map((filter) => (
          <button
            key={filter.id}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-colors",
              activeFilter === filter.id
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
            onClick={() => handleFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-auto flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
              <Filter className="h-3 w-3" />
              <span>Sort</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem 
              className={sortBy === 'recent' ? "bg-gray-100" : ""}
              onClick={() => setSortBy('recent')}
            >
              Most Recent
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={sortBy === 'helpful' ? "bg-gray-100" : ""}
              onClick={() => setSortBy('helpful')}
            >
              Most Helpful
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className={sortBy === 'highest' ? "bg-gray-100" : ""}
              onClick={() => setSortBy('highest')}
            >
              Highest Rating
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={sortBy === 'lowest' ? "bg-gray-100" : ""}
              onClick={() => setSortBy('lowest')}
            >
              Lowest Rating
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Search reviews input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search in reviews"
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      {/* Loading state */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="animate-pulse h-4 bg-gray-200 rounded w-24 mb-1"></div>
                  <div className="animate-pulse h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="animate-pulse h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="animate-pulse h-3 bg-gray-200 rounded w-full mb-1.5"></div>
              <div className="animate-pulse h-3 bg-gray-200 rounded w-full mb-1.5"></div>
              <div className="animate-pulse h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        /* Reviews list */
        <div className="space-y-3">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div 
                key={review.id} 
                className={cn(
                  "bg-white rounded-lg border border-gray-200 overflow-hidden",
                  expandedReview === review.id ? "shadow-sm" : ""
                )}
              >
                <div className="p-3">
                  {/* Review header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {review.userAvatar ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img 
                            src={review.userAvatar} 
                            alt={review.userName} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium">{review.userName}</div>
                        <div className="text-xs text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {review.isVerifiedPurchase && (
                        <Badge variant="outline" className="mr-2 h-5 bg-green-50 border-green-200 text-green-700 text-[10px]">
                          Verified
                        </Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>Report Review</DropdownMenuItem>
                          <DropdownMenuItem>Share Review</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-4 w-4",
                            review.rating >= star
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    
                    {review.title && (
                      <h4 className="font-medium text-gray-900 mt-1 sm:mt-0">{review.title}</h4>
                    )}
                  </div>
                  
                  {/* Product attributes if available */}
                  {(review.color || review.size) && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {review.color && (
                        <Badge variant="outline" className="text-[10px] bg-gray-50 text-gray-600 border-gray-200">
                          Color: {review.color}
                        </Badge>
                      )}
                      {review.size && (
                        <Badge variant="outline" className="text-[10px] bg-gray-50 text-gray-600 border-gray-200">
                          Size: {review.size}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {/* Review content - truncated or expanded */}
                  <div 
                    className={cn(
                      "text-sm text-gray-700",
                      expandedReview !== review.id && review.content.length > 150 ? "line-clamp-3" : ""
                    )}
                  >
                    {review.content}
                  </div>
                  
                  {/* Show more/less button for long reviews */}
                  {review.content.length > 150 && (
                    <button 
                      className="text-xs text-blue-600 mt-1"
                      onClick={() => toggleReviewExpand(review.id)}
                    >
                      {expandedReview === review.id ? "Show less" : "Show more"}
                    </button>
                  )}
                  
                  {/* Review images if available */}
                  {review.images && review.images.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <Image className="h-3 w-3" />
                        <span>Customer images</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {review.images.map((image, index) => (
                          <div 
                            key={index}
                            className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden"
                          >
                            <img 
                              src={image} 
                              alt={`${review.userName}'s review attachment ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Review footer - helpful buttons */}
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <button 
                        className={cn(
                          "flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-100",
                          review.isHelpful ? "text-blue-600" : "text-gray-500"
                        )}
                        onClick={() => handleReviewHelpful(review.id, true)}
                      >
                        <ThumbsUp className="h-3 w-3" />
                        <span>Helpful ({review.likes})</span>
                      </button>
                      
                      <button 
                        className={cn(
                          "flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-100",
                          review.isNotHelpful ? "text-red-600" : "text-gray-500"
                        )}
                        onClick={() => handleReviewHelpful(review.id, false)}
                      >
                        <ThumbsDown className="h-3 w-3" />
                        <span>Not helpful ({review.dislikes})</span>
                      </button>
                    </div>
                    
                    <button className="text-xs text-blue-600 flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <MessageSquare className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-gray-500">No reviews found</p>
              <p className="text-sm text-gray-400">Try adjusting your filters or be the first to leave a review!</p>
            </div>
          )}
        </div>
      )}
      
      {/* Load more button */}
      {filteredReviews.length > 0 && filteredReviews.length < reviews.length && (
        <Button variant="outline" className="w-full">
          Load More Reviews
        </Button>
      )}
      
      {/* Write review form - conditionally shown */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Write a Review</h2>
                <button 
                  onClick={() => setShowWriteReview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-600">
                Share your thoughts with other customers
              </p>
              
              {/* Form fields would go here */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Overall Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className="text-gray-300 hover:text-yellow-400"
                      >
                        <Star className="h-8 w-8" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Review Title
                  </label>
                  <input
                    type="text"
                    placeholder="What's most important to know?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Review
                  </label>
                  <textarea
                    placeholder="What did you like or dislike? What did you use this product for?"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-4 flex justify-end">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => setShowWriteReview(false)}
              >
                Cancel
              </Button>
              <Button>Submit Review</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
