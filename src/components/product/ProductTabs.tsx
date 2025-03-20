
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
  const { isMobile } = useIsMobile();

  return (
    <Tabs defaultValue="description" className="w-full max-w-full">
      {/* Tab navigation */}
      <div className="relative border-b border-gray-100 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin pb-4 w-full">
          <div className="px-2 md:px-6 flex justify-start min-w-max">
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
        </div>
      </div>

      {/* Tab content - contained within fixed width to prevent overflow */}
      <div className="mt-6 w-full max-w-full overflow-hidden">
        <DescriptionTab description={description} highlights={highlights} />
        
        <TabsContent value="specifications" className="w-full max-w-full">
          <div className="space-y-6">
            <div className="bg-gray-50/50 rounded-lg p-6">
              <h3 className="font-medium text-lg mb-4">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                  <p className="text-sm font-medium text-gray-500">Material</p>
                  <p className="font-medium text-gray-900">Premium Cotton Blend</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                  <p className="text-sm font-medium text-gray-500">Weight</p>
                  <p className="font-medium text-gray-900">0.3 kg</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                  <p className="text-sm font-medium text-gray-500">Dimensions</p>
                  <p className="font-medium text-gray-900">24 × 12 × 3 cm</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                  <p className="text-sm font-medium text-gray-500">Care Instructions</p>
                  <p className="font-medium text-gray-900">Machine wash cold</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Technical Details</h4>
                <div className="space-y-2">
                  {[
                    { label: "Product ID", value: "BT-583-2023-X" },
                    { label: "Manufacturer", value: "AudioTech Industries" },
                    { label: "Country of Origin", value: "Japan" },
                    { label: "Production Date", value: "2023" },
                    { label: "Warranty", value: "2 Years Limited" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Performance Metrics</h4>
                <div className="space-y-2">
                  {[
                    { label: "Battery Life", value: "Up to 15 hours" },
                    { label: "Charging Time", value: "2.5 hours" },
                    { label: "Bluetooth Range", value: "10 meters" },
                    { label: "Water Resistance", value: "IPX7 Rating" },
                    { label: "Audio Output", value: "20W RMS" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-medium text-blue-900 mb-3">What's in the Box</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "1 x Main Product Unit",
                  "1 x USB-C Charging Cable",
                  "1 x User Manual",
                  "1 x Quick Start Guide",
                  "1 x Warranty Card",
                  "1 x Travel Pouch"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-blue-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <WarrantyTab />
        <ReviewsTab rating={rating} reviews={reviews} />
        <FAQsTab />
      </div>
    </Tabs>
  );
}
