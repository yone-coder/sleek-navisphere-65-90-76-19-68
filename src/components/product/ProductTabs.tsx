
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DescriptionTab } from "./tabs/DescriptionTab";
import { WarrantyTab } from "./tabs/WarrantyTab";
import { ReviewsTab } from "./tabs/ReviewsTab";
import { FAQsTab } from "./tabs/FAQsTab";

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
      <ScrollArea className="w-full">
        <TabsList className="inline-flex w-max h-16 bg-gradient-to-b from-gray-50/50 to-white p-2 rounded-2xl">
          <TabsTrigger 
            value="description"
            className="relative h-full px-6 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="font-medium">Description</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="warranty"
            className="relative h-full px-6 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="font-medium">Warranty & Support</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="reviews"
            className="relative h-full px-6 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="font-medium">Reviews</span>
              <div className="absolute -top-2 -right-1">
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 text-xs font-medium bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-full">
                  {reviews}
                </span>
              </div>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="faqs"
            className="relative h-full px-6 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
          >
            <div className="flex flex-col items-center gap-1">
              <span className="font-medium">FAQs</span>
            </div>
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>

      <DescriptionTab description={description} highlights={highlights} />
      <WarrantyTab />
      <ReviewsTab rating={rating} reviews={reviews} />
      <FAQsTab />
    </Tabs>
  );
}
