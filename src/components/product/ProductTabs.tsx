
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StarIcon, ThumbsUp, ThumbsDown, MessageCircle, ImageIcon, Filter, Search, SortAsc, SortDesc, ChevronDown } from "lucide-react";

type ProductTabsProps = {
  description: string;
  highlights: string[];
  rating: number;
  reviews: number;
};

export function ProductTabs({
  description,
  highlights,
  rating,
  reviews,
}: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full h-12 bg-transparent border-b border-gray-100 p-0 gap-8">
        <TabsTrigger 
          value="description"
          className="relative h-full px-0 data-[state=active]:text-[#0FA0CE] data-[state=active]:shadow-none rounded-none bg-transparent"
        >
          <span>Description</span>
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0FA0CE] opacity-0 transition-all duration-300 data-[state=active]:opacity-100" />
        </TabsTrigger>
        <TabsTrigger 
          value="reviews"
          className="relative h-full px-0 data-[state=active]:text-[#0FA0CE] data-[state=active]:shadow-none rounded-none bg-transparent"
        >
          <span>Reviews</span>
          <span className="ml-2 inline-flex items-center justify-center rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600">
            {reviews}
          </span>
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0FA0CE] opacity-0 transition-all duration-300 data-[state=active]:opacity-100" />
        </TabsTrigger>
        <TabsTrigger 
          value="faqs"
          className="relative h-full px-0 data-[state=active]:text-[#0FA0CE] data-[state=active]:shadow-none rounded-none bg-transparent"
        >
          <span>FAQs</span>
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0FA0CE] opacity-0 transition-all duration-300 data-[state=active]:opacity-100" />
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        <div className="space-y-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
          <ul className="grid grid-cols-1 gap-3">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-600" />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Care Instructions</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>Clean with damp cloth</li>
                <li>Avoid direct sunlight</li>
                <li>Regular maintenance required</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Environmental Impact</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li>Eco-friendly materials</li>
                <li>Recyclable packaging</li>
                <li>Low carbon footprint</li>
              </ul>
            </div>
          </div>
        </div>
      </TabsContent>

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

      <TabsContent value="faqs" className="mt-6">
        <div className="space-y-6">
          {/* FAQ Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search frequently asked questions..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0FA0CE] focus:border-transparent"
            />
          </div>

          {/* FAQ Categories */}
          <div className="flex items-center gap-2 pb-2 overflow-x-auto scrollbar-hide">
            {['All Questions', 'Shipping', 'Product', 'Warranty', 'Assembly', 'Returns'].map((category) => (
              <button
                key={category}
                className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                  category === 'All Questions'
                    ? 'bg-[#0FA0CE] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
              <button className="w-full flex items-center justify-between p-4 text-left">
                <h3 className="font-medium text-gray-900">What is the warranty period?</h3>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              <div className="px-4 pb-4">
                <p className="text-sm text-gray-600">Our gaming chairs come with a 2-year warranty covering manufacturing defects and material issues.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
              <button className="w-full flex items-center justify-between p-4 text-left">
                <h3 className="font-medium text-gray-900">How long does assembly take?</h3>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              <div className="px-4 pb-4">
                <p className="text-sm text-gray-600">Assembly typically takes 20-30 minutes with the included tools and instructions.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
              <button className="w-full flex items-center justify-between p-4 text-left">
                <h3 className="font-medium text-gray-900">What's the weight capacity?</h3>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              <div className="px-4 pb-4">
                <p className="text-sm text-gray-600">Our gaming chairs support up to 150kg (330lbs) of weight.</p>
              </div>
            </div>
          </div>

          {/* FAQ Help */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600">Still have questions?</div>
            <button className="px-4 py-2 text-sm font-medium text-[#0FA0CE] hover:text-[#0F8CBE] bg-white rounded-lg transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
