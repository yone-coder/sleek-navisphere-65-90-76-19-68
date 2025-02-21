
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
        <TabsList className="inline-flex w-max h-12 bg-transparent border-b border-gray-100 p-0 gap-8">
          <TabsTrigger 
            value="description"
            className="relative h-full px-0 data-[state=active]:text-[#0FA0CE] data-[state=active]:shadow-none rounded-none bg-transparent"
          >
            <span>Description</span>
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0FA0CE] opacity-0 transition-all duration-300 data-[state=active]:opacity-100" />
          </TabsTrigger>
          <TabsTrigger 
            value="warranty"
            className="relative h-full px-0 data-[state=active]:text-[#0FA0CE] data-[state=active]:shadow-none rounded-none bg-transparent"
          >
            <span>Warranty & Support</span>
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
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>

      <DescriptionTab description={description} highlights={highlights} />
      <WarrantyTab />
      <ReviewsTab rating={rating} reviews={reviews} />
      <FAQsTab />
    </Tabs>
  );
}
