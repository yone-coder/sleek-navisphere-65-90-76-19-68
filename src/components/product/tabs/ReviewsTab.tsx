
import { TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Filter, ThumbsUp, MessageSquare, Camera, CheckCircle, Award, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type ReviewsTabProps = {
  rating: number;
  reviews: number;
};

export function ReviewsTab({ rating, reviews }: ReviewsTabProps) {
  const { isMobile } = useIsMobile();
  
  // Sample data for rating breakdown
  const ratingBreakdown = [
    { rating: 5, percentage: 70 },
    { rating: 4, percentage: 20 },
    { rating: 3, percentage: 5 },
    { rating: 2, percentage: 3 },
    { rating: 1, percentage: 2 },
  ];
  
  // Sample data for featured reviews
  const featuredReviews = [
    {
      id: 1,
      user: "Sarah J.",
      date: "August 10, 2023",
      rating: 5,
      title: "Exceeded my expectations!",
      content: "This product has completely transformed my daily routine. The quality is exceptional and it's so easy to use. I've recommended it to all my friends and family.",
      helpful: 28,
      verified: true,
      hasImages: true,
      images: ['/api/placeholder/100/100', '/api/placeholder/100/100'],
      isTopReviewer: true
    },
    {
      id: 2,
      user: "Michael T.",
      date: "July 25, 2023",
      rating: 4,
      title: "Great product with minor issues",
      content: "Overall, I'm very satisfied with this purchase. The product works as described and the quality is good. The only drawback is that the battery life could be better. Still, I would recommend it.",
      helpful: 15,
      verified: true,
      hasImages: false,
      isPurchaseVerified: true
    },
    {
      id: 3,
      user: "Emily R.",
      date: "June 18, 2023",
      rating: 5,
      title: "Absolutely perfect!",
      content: "I've been using this for a month now and I'm extremely impressed. The design is sleek, it's durable, and it performs exactly as advertised. Definitely worth the investment!",
      helpful: 42,
      verified: true,
      hasImages: true,
      images: ['/api/placeholder/100/100'],
      isEarlyReviewer: true
    }
  ];
  
  // Sample data for review filters
  const reviewFilters = [
    { name: "All Reviews", count: reviews },
    { name: "5 Star", count: Math.round(reviews * 0.7) },
    { name: "4 Star", count: Math.round(reviews * 0.2) },
    { name: "With Photos", count: Math.round(reviews * 0.15) },
    { name: "Verified Purchases", count: Math.round(reviews * 0.9) },
  ];

  return (
    <TabsContent value="reviews" className="space-y-8 mt-6 animate-in fade-in">
      {/* Reviews Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="md:flex">
          {/* Left Section - Rating Summary */}
          <div className="md:w-1/3 bg-gradient-to-br from-purple-50 to-indigo-50 p-6 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Overall Rating</h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-4xl font-bold text-indigo-600">{rating.toFixed(1)}</span>
              <div className="flex flex-col">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{reviews} reviews</span>
              </div>
            </div>
            
            <div className="w-full space-y-2">
              {ratingBreakdown.map((item) => (
                <div key={item.rating} className="flex items-center gap-2">
                  <span className="text-sm text-gray-700 w-8">{item.rating} ★</span>
                  <Progress value={item.percentage} className="h-2 flex-1" />
                  <span className="text-xs text-gray-500 w-8">{item.percentage}%</span>
                </div>
              ))}
            </div>

            <Button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700">Write a Review</Button>
          </div>
          
          {/* Right Section - Review Highlights */}
          <div className="md:w-2/3 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Review Highlights</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="text-sm border border-gray-200 rounded px-2 py-1">
                  <option>Most Recent</option>
                  <option>Highest Rated</option>
                  <option>Lowest Rated</option>
                  <option>Most Helpful</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Filter</span>
              </Button>
              {reviewFilters.map((filter, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="py-1 px-3 bg-gray-50 hover:bg-gray-100"
                >
                  {filter.name} ({filter.count})
                </Badge>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Most Mentioned Positives</h4>
                <div className="space-y-2">
                  {['Quality', 'Easy to use', 'Value for money', 'Design'].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Areas for Improvement</h4>
                <div className="space-y-2">
                  {['Battery life', 'Size', 'Price'].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-red-500 rotate-180" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="flex flex-col items-center">
            <CheckCircle className="w-6 h-6 text-blue-600 mb-2" />
            <span className="text-xl font-bold text-blue-800">{Math.round(reviews * 0.9)}</span>
            <span className="text-xs text-blue-600">Verified Purchases</span>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="flex flex-col items-center">
            <Camera className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-xl font-bold text-purple-800">{Math.round(reviews * 0.15)}</span>
            <span className="text-xs text-purple-600">With Photos</span>
          </div>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 text-center">
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-amber-600 mb-2" />
            <span className="text-xl font-bold text-amber-800">{Math.round(reviews * 0.07)}</span>
            <span className="text-xs text-amber-600">Top Reviewers</span>
          </div>
        </div>
      </div>
      
      {/* Featured Reviews */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">Featured Reviews</h3>
          <Button variant="ghost" className="text-blue-600">See All Reviews</Button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {featuredReviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                    {review.user.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{review.user}</span>
                      {review.isTopReviewer && (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                          Top Reviewer
                        </Badge>
                      )}
                      {review.isEarlyReviewer && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          Early Reviewer
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{review.date}</span>
                      {review.verified && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-700 text-sm mb-4">{review.content}</p>
              
              {review.hasImages && (
                <div className="flex gap-2 mb-4">
                  {review.images?.map((img, idx) => (
                    <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <img src={img} alt={`Review image ${idx+1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful})</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                    <span>Comment</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  Report
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="text-center mb-4">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900">Join the conversation</h4>
            <p className="text-sm text-gray-600">Share your experience with this product</p>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Write a Review</Button>
        </div>
      </div>
      
      {/* Community Rating Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Rating Trends</h3>
        <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Rating trend chart placeholder</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Quality', rating: 4.8 },
            { label: 'Value', rating: 4.2 },
            { label: 'Durability', rating: 4.5 },
            { label: 'Design', rating: 4.9 }
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="text-center">
                <span className="block text-gray-600 text-sm mb-1">{item.label}</span>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="block text-gray-900 font-medium mt-1">{item.rating.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Review Guidelines */}
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <h4 className="font-medium text-gray-900 mb-2">Our Review Guidelines</h4>
        <p className="text-sm text-gray-600 mb-4">
          We value authentic opinions and reviews from our customers. All reviews are subject to our community guidelines.
        </p>
        <Button variant="outline" className="text-blue-600 border-blue-200">
          Read Guidelines
        </Button>
      </div>
    </TabsContent>
  );
}
