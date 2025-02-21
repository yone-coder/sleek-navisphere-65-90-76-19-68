
import { type FC } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Search, ChevronDown } from "lucide-react";

export const FAQsTab: FC = () => {
  return (
    <TabsContent value="faqs" className="mt-6">
      <div className="space-y-6">
        {/* FAQ Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search frequently asked questions..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0FA0CE] focus:border-transparent"
          />
        </div>

        {/* FAQ Categories */}
        <div className="flex items-center gap-2 pb-2 overflow-x-auto scrollbar-hide">
          {['All Questions', 'Shipping', 'Product', 'Warranty', 'Assembly', 'Returns'].map((category) => (
            <button
              key={category}
              className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                category === 'All Questions'
                  ? 'bg-[#0FA0CE] text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
            <button className="w-full flex items-center justify-between p-4 text-left">
              <h3 className="font-medium text-gray-900">What is the warranty period?</h3>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600">Our gaming chairs come with a 2-year warranty covering manufacturing defects and material issues.</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
            <button className="w-full flex items-center justify-between p-4 text-left">
              <h3 className="font-medium text-gray-900">How long does assembly take?</h3>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600">Assembly typically takes 20-30 minutes with the included tools and instructions.</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100">
            <button className="w-full flex items-center justify-between p-4 text-left">
              <h3 className="font-medium text-gray-900">What's the weight capacity?</h3>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600">Our gaming chairs support up to 150kg (330lbs) of weight.</p>
            </div>
          </div>
        </div>

        {/* FAQ Help */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-gray-600">Still have questions?</div>
          <button className="px-4 py-2 text-sm font-medium text-[#0FA0CE] hover:text-[#0F8CBE] bg-white rounded-lg transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </TabsContent>
  );
};
