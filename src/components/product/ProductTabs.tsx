
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
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({reviews} reviews)</span>
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
