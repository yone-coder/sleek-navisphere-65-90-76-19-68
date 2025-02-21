
import { type FC } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { StarIcon, ThumbsUp, MessageCircle, ImageIcon, Filter, Search, SortAsc } from "lucide-react";

interface ReviewsTabProps {
  rating: number;
  reviews: number;
}

export const ReviewsTab: FC<ReviewsTabProps> = ({ rating, reviews }) => {
  return (
    <TabsContent value="reviews" className="mt-6">
      <div className="space-y-6">
        {/* Summary */}
        <div className="flex items-start gap-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-gray-900">{rating}</div>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-1">{reviews} reviews</div>
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((star) => (
              <button 
                key={star} 
                className="flex items-center gap-2 mb-1 w-full group hover:bg-gray-100 p-1 rounded transition-colors"
              >
                <div className="text-sm text-gray-600 w-6">{star}★</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full group-hover:bg-yellow-500 transition-colors"
                    style={{ 
                      width: `${Math.round((star === Math.floor(rating) ? reviews : reviews / star) / reviews * 100)}%`
                    }}
                  />
                </div>
                <div className="text-sm text-gray-500 w-10">
                  {Math.round((star === Math.floor(rating) ? reviews : reviews / star))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Review Filters */}
        <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search reviews..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0FA0CE] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <SortAsc className="w-4 h-4" />
              Sort
            </button>
          </div>
        </div>

        {/* Review Actions */}
        <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-blue-50/50">
          <div className="text-sm text-gray-600">Share your thoughts about this product</div>
          <button className="px-4 py-2 text-sm font-medium text-white bg-[#0FA0CE] hover:bg-[#0F8CBE] rounded-lg transition-colors">
            Write a Review
          </button>
        </div>

        {/* Sample Reviews */}
        <div className="space-y-4">
          {[
            { 
              author: "Sarah M.", 
              rating: 5, 
              date: "2 days ago",
              verified: true,
              helpful: 24,
              content: "Absolutely love this chair! The comfort level is amazing and it's helped my posture significantly.",
              images: 2
            },
            { 
              author: "Mike R.", 
              rating: 4, 
              date: "1 week ago",
              verified: true,
              helpful: 15,
              content: "Great chair overall, but assembly was a bit tricky. Once set up though, it's very comfortable.",
              images: 0
            }
          ].map((review, index) => (
            <div key={index} className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                    {review.author[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{review.author}</span>
                      {review.verified && (
                        <span className="text-[10px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{review.date}</span>
                      <span>•</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="text-xs text-gray-500 hover:text-gray-700">
                  Report
                </button>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {review.content}
              </p>
              {review.images > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <button className="flex items-center gap-1.5 text-xs text-[#0FA0CE] hover:text-[#0F8CBE]">
                    <ImageIcon className="w-3.5 h-3.5" />
                    View {review.images} photos
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Helpful ({review.helpful})
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Reply
                  </button>
                </div>
                <button className="text-xs text-gray-500 hover:text-gray-700">
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-3 text-sm text-[#0FA0CE] hover:text-[#0F8CBE] border border-dashed border-gray-200 rounded-lg hover:border-[#0FA0CE] transition-colors">
          Load more reviews
        </button>
      </div>
    </TabsContent>
  );
};
