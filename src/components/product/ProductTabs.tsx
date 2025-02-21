
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DescriptionTab } from "./tabs/DescriptionTab";
import { WarrantyTab } from "./tabs/WarrantyTab";
import { ReviewsTab } from "./tabs/ReviewsTab";
import { FAQsTab } from "./tabs/FAQsTab";
import { FileText, Shield, MessageSquare, HelpCircle } from "lucide-react";

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
      <ScrollArea className="w-full px-0 -mx-6">
        <div className="px-6 w-full whitespace-nowrap">
          <TabsList className="w-full h-12 bg-gradient-to-b from-gray-50/50 to-white p-2 rounded-2xl">
            <TabsTrigger 
              value="description"
              className="relative h-full px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="font-medium text-sm">Description</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="warranty"
              className="relative h-full px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="font-medium text-sm">Warranty & Support</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="relative h-full px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="font-medium text-sm">Reviews</span>
                <div className="inline-flex ml-1">
                  <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 text-xs font-medium bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-full shadow-sm">
                    {reviews}
                  </span>
                </div>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="faqs"
              className="relative h-full px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span className="font-medium text-sm">FAQs</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        <ScrollBar 
          orientation="horizontal" 
          className="h-2.5 bg-transparent"
        />
      </ScrollArea>

      <div className="mt-6">
        <DescriptionTab description={description} highlights={highlights} />
        <WarrantyTab />
        <ReviewsTab rating={rating} reviews={reviews} />
        <FAQsTab />
      </div>
    </Tabs>
  );
}
