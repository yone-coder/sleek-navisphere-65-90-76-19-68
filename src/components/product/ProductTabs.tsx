
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StarIcon } from "lucide-react";

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

        <div className="space-y-4 mt-8">
          <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
          <ul className="grid grid-cols-1 gap-3">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-600" />
                {highlight}
              </li>
            ))}
          </ul>
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
                <div key={star} className="flex items-center gap-2 mb-1">
                  <div className="text-sm text-gray-600 w-6">{star}★</div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ 
                        width: `${Math.round((star === Math.floor(rating) ? reviews : reviews / star) / reviews * 100)}%`
                      }}
                    />
                  </div>
                  <div className="text-sm text-gray-500 w-10">
                    {Math.round((star === Math.floor(rating) ? reviews : reviews / star))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Actions */}
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
            <div className="text-sm text-gray-600">Share your thoughts about this product</div>
            <button className="px-4 py-2 text-sm font-medium text-[#0FA0CE] hover:bg-blue-50 rounded-lg transition-colors">
              Write a Review
            </button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="faqs" className="mt-6">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">What is the warranty period?</h3>
            <p className="mt-2 text-sm text-gray-600">Our gaming chairs come with a 2-year warranty covering manufacturing defects and material issues.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">How long does assembly take?</h3>
            <p className="mt-2 text-sm text-gray-600">Assembly typically takes 20-30 minutes with the included tools and instructions.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900">What's the weight capacity?</h3>
            <p className="mt-2 text-sm text-gray-600">Our gaming chairs support up to 150kg (330lbs) of weight.</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
