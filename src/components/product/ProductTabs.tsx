
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
      <ScrollArea className="w-full border-b border-gray-100">
        <TabsList className="inline-flex w-max h-14 bg-transparent p-0">
          <TabsTrigger 
            value="description"
            className="relative h-full px-6 text-gray-500 data-[state=active]:text-[#9b87f5] data-[state=active]:shadow-none rounded-none bg-transparent transition-all duration-300 hover:text-[#9b87f5]"
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-medium">Description</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9b87f5] scale-x-0 transition-transform duration-300 data-[state=active]:scale-x-100" />
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="warranty"
            className="relative h-full px-6 text-gray-500 data-[state=active]:text-[#9b87f5] data-[state=active]:shadow-none rounded-none bg-transparent transition-all duration-300 hover:text-[#9b87f5]"
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-medium">Warranty & Support</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9b87f5] scale-x-0 transition-transform duration-300 data-[state=active]:scale-x-100" />
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="reviews"
            className="relative h-full px-6 text-gray-500 data-[state=active]:text-[#9b87f5] data-[state=active]:shadow-none rounded-none bg-transparent transition-all duration-300 hover:text-[#9b87f5]"
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-medium">Reviews</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 transition-colors data-[state=active]:bg-[#9b87f5]/10 data-[state=active]:text-[#9b87f5]">
                  {reviews}
                </span>
              </div>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9b87f5] scale-x-0 transition-transform duration-300 data-[state=active]:scale-x-100" />
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="faqs"
            className="relative h-full px-6 text-gray-500 data-[state=active]:text-[#9b87f5] data-[state=active]:shadow-none rounded-none bg-transparent transition-all duration-300 hover:text-[#9b87f5]"
          >
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-medium">FAQs</span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9b87f5] scale-x-0 transition-transform duration-300 data-[state=active]:scale-x-100" />
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
