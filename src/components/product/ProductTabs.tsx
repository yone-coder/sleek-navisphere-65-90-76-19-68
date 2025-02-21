
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShieldCheck, Medal, CalendarClock, ScrollText, Info, CheckCircle2, XCircle } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductTabsProps {
  description: string;
  highlights: string[];
  rating: number;
  reviews: number;
}

export function ProductTabs({
  description,
  highlights,
  rating,
  reviews,
}: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="space-y-4">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="highlights">Highlights</TabsTrigger>
        <TabsTrigger value="warranty">Warranty & Support</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="p-6 bg-white rounded-lg border">
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </TabsContent>

      <TabsContent value="highlights" className="p-6 bg-white rounded-lg border">
        <ul className="space-y-2">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <span className="text-sm text-gray-600">{highlight}</span>
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="warranty" className="space-y-6 p-6 bg-white rounded-lg border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#9b87f5]" />
            <h3 className="text-lg font-semibold text-gray-900">Warranty & Support</h3>
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">Premium</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <Medal className="w-4 h-4 text-[#9b87f5]" />
              Elite Coverage
            </div>
            <button className="text-xs text-[#9b87f5] hover:text-[#8670e6] font-medium hover:underline underline-offset-4">
              View Full Terms
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-[#F1F0FB] rounded-xl p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#9b87f5] rounded-lg">
                    <CalendarClock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">Coverage Period</span>
                    <span className="text-xs text-gray-500">Starting from delivery</span>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-gray-400 hover:text-[#9b87f5] transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p className="text-xs">Premium warranty coverage begins from the product delivery date and includes all standard protections plus extended support options.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-3 pl-2">
                <div className="relative">
                  <div className="absolute left-1.5 top-2.5 w-px h-full bg-gray-200"></div>
                  <div className="space-y-3">
                    <div className="relative flex items-center gap-3 pl-4">
                      <div className="absolute left-0 w-3 h-3 rounded-full border-2 border-green-500 bg-white"></div>
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-none" />
                      <div>
                        <span className="text-sm font-medium block">2 Years Full Coverage</span>
                        <span className="text-xs text-gray-500">Complete protection plan</span>
                      </div>
                    </div>
                    <div className="relative flex items-center gap-3 pl-4">
                      <div className="absolute left-0 w-3 h-3 rounded-full border-2 border-blue-500 bg-white"></div>
                      <CheckCircle2 className="w-4 h-4 text-blue-500 flex-none" />
                      <div>
                        <span className="text-sm font-medium block">1 Year Extended Support</span>
                        <span className="text-xs text-gray-500">Additional coverage option</span>
                      </div>
                    </div>
                    <div className="relative flex items-center gap-3 pl-4 opacity-60">
                      <div className="absolute left-0 w-3 h-3 rounded-full border-2 border-gray-400 bg-white"></div>
                      <XCircle className="w-4 h-4 text-gray-400 flex-none" />
                      <div>
                        <span className="text-sm font-medium block">Water Damage Protection</span>
                        <span className="text-xs text-gray-500">Optional add-on available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#F1F0FB] rounded-xl p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#9b87f5] rounded-lg">
                    <ScrollText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">Coverage Terms</span>
                    <span className="text-xs text-gray-500">What's included</span>
                  </div>
                </div>
                <div className="px-2 py-1 bg-[#9b87f5]/10 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <Medal className="w-4 h-4 text-[#9b87f5]" />
                    <span className="text-xs font-medium text-[#9b87f5]">Premium</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="bg-white/50 rounded-lg p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Manufacturing</span>
                  </div>
                  <p className="text-xs text-gray-500 pl-6">All factory defects covered</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Parts & Labor</span>
                  </div>
                  <p className="text-xs text-gray-500 pl-6">Full repair coverage</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">24/7 Support</span>
                  </div>
                  <p className="text-xs text-gray-500 pl-6">Priority assistance</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Replacement</span>
                  </div>
                  <p className="text-xs text-gray-500 pl-6">If unrepairable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="space-y-4 p-6 bg-white rounded-lg border">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-gray-900">{rating}</div>
          <div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-sm text-gray-500">Based on {reviews} reviews</div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
