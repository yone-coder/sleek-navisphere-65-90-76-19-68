
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DescriptionTab } from "./tabs/DescriptionTab";
import { WarrantyTab } from "./tabs/WarrantyTab";
import { ReviewsTab } from "./tabs/ReviewsTab";
import { FAQsTab } from "./tabs/FAQsTab";
import { FileText, Shield, MessageSquare, HelpCircle, Settings } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  return (
    <Tabs defaultValue="description" className="w-full max-w-full">
      {/* Tab navigation */}
      <div className="relative border-b border-gray-100">
        <ScrollArea className="pb-4 w-full scrollbar-thin">
          <div className="px-2 md:px-6 flex justify-start w-max">
            <TabsList className="flex w-max h-12 bg-gradient-to-b from-gray-50/50 to-white p-2 rounded-2xl mb-2 overflow-visible">
              <TabsTrigger 
                value="description"
                className="relative h-full px-3 md:px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium text-sm">Description</span>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="specifications"
                className="relative h-full px-3 md:px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="font-medium text-sm">{isMobile ? "Specs" : "Specifications"}</span>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="warranty"
                className="relative h-full px-3 md:px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium text-sm">{isMobile ? "Support" : "Warranty & Support"}</span>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="reviews"
                className="relative h-full px-3 md:px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-medium text-sm">Reviews</span>
                  <div className="inline-flex">
                    <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 text-xs font-medium bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-full shadow-sm">
                      {reviews}
                    </span>
                  </div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="faqs"
                className="relative h-full px-3 md:px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span className="font-medium text-sm">Q&A</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
        </ScrollArea>
      </div>

      {/* Tab content - contained within fixed width to prevent overflow */}
      <div className="mt-6 w-full max-w-full overflow-hidden">
        <TabsContent value="description" className="w-full max-w-full">
          <DescriptionTab description={description} highlights={highlights} />
        </TabsContent>
        
        <TabsContent value="specifications" className="w-full max-w-full">
          <div className="space-y-4 p-4 bg-gray-50/50 rounded-lg">
            <h3 className="font-medium text-lg">Product Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm font-medium text-gray-500">Material</p>
                <p className="font-medium">Premium Cotton Blend</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm font-medium text-gray-500">Weight</p>
                <p className="font-medium">0.3 kg</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm font-medium text-gray-500">Dimensions</p>
                <p className="font-medium">24 × 12 × 3 cm</p>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm">
                <p className="text-sm font-medium text-gray-500">Care Instructions</p>
                <p className="font-medium">Machine wash cold</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="warranty" className="w-full max-w-full">
          <WarrantyTab />
        </TabsContent>
        
        <TabsContent value="reviews" className="w-full max-w-full">
          <ReviewsTab rating={rating} reviews={reviews} />
        </TabsContent>
        
        <TabsContent value="faqs" className="w-full max-w-full">
          <FAQsTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
