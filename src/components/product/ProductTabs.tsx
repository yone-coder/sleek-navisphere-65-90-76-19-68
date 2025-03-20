
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DescriptionTab } from "./tabs/DescriptionTab";
import { WarrantyTab } from "./tabs/WarrantyTab";
import { ReviewsTab } from "./tabs/ReviewsTab";
import { FAQsTab } from "./tabs/FAQsTab";
import { FileText, Shield, MessageSquare, HelpCircle, Settings, Clipboard } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("description");
  
  // Scroll to active tab when changed
  useEffect(() => {
    if (scrollRef.current) {
      const tabElement = document.querySelector(`[data-value="${activeTab}"]`);
      if (tabElement) {
        const scrollLeft = tabElement.getBoundingClientRect().left + 
                          scrollRef.current.scrollLeft - 
                          scrollRef.current.getBoundingClientRect().left - 
                          20; // Add some padding
        scrollRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <Tabs 
      defaultValue="description" 
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <div className="sticky top-0 z-10 bg-white pb-2">
        <div 
          ref={scrollRef} 
          className="scrollbar-none overflow-x-auto pb-1"
        >
          <TabsList className="flex w-max h-12 bg-gradient-to-b from-gray-50/50 to-white p-2 rounded-2xl">
            <TabsTrigger 
              value="description"
              data-value="description"
              className="relative h-full px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-300 hover:text-gray-600"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="font-medium text-sm whitespace-nowrap">Description</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="specifications"
              data-value="specifications"
              className="relative h-full px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-300 hover:text-gray-600"
            >
              <div className="flex items-center gap-2">
                <Clipboard className="w-4 h-4" />
                <span className="font-medium text-sm whitespace-nowrap">Specifications</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="reviews"
              data-value="reviews"
              className="relative h-full px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-300 hover:text-gray-600"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="font-medium text-sm whitespace-nowrap">Reviews</span>
                <div className="inline-flex ml-1">
                  <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 text-xs font-medium bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-full shadow-sm">
                    {reviews}
                  </span>
                </div>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="faqs"
              data-value="faqs"
              className="relative h-full px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-300 hover:text-gray-600"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span className="font-medium text-sm whitespace-nowrap">Q&A</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="warranty"
              data-value="warranty"
              className="relative h-full px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-300 hover:text-gray-600"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="font-medium text-sm whitespace-nowrap">Warranty & Support</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Fading edge indicators for scroll */}
        <div className="hidden md:block absolute top-0 right-0 h-12 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        <div className="hidden md:block absolute top-0 left-0 h-12 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      </div>

      <div className="mt-4">
        <TabsContent value="description" className="animate-in fade-in-50 duration-300">
          <DescriptionTab description={description} highlights={highlights} />
        </TabsContent>
        
        <TabsContent value="specifications" className="animate-in fade-in-50 duration-300">
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-3">Product Specifications</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Brand</span>
                <span className="text-sm font-medium">Modish</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Material</span>
                <span className="text-sm font-medium">Premium Cotton</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Size</span>
                <span className="text-sm font-medium">S, M, L, XL</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Color Options</span>
                <span className="text-sm font-medium">Black, White, Red, Blue</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-2 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Weight</span>
                <span className="text-sm font-medium">0.5 kg</span>
              </div>
              <div className="grid grid-cols-2 gap-2 py-2">
                <span className="text-gray-500 text-sm">Origin</span>
                <span className="text-sm font-medium">USA</span>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="warranty" className="animate-in fade-in-50 duration-300">
          <WarrantyTab />
        </TabsContent>
        
        <TabsContent value="reviews" className="animate-in fade-in-50 duration-300">
          <ReviewsTab rating={rating} reviews={reviews} />
        </TabsContent>
        
        <TabsContent value="faqs" className="animate-in fade-in-50 duration-300">
          <FAQsTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
