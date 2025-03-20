
import { type FC } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Check, Info, ExternalLink } from "lucide-react";

interface DescriptionTabProps {
  description: string;
  highlights: string[];
}

export const DescriptionTab: FC<DescriptionTabProps> = ({ description, highlights }) => {
  return (
    <TabsContent value="description" className="mt-6">
      {/* Product Summary */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-blue-100 text-blue-700 border-none hover:bg-blue-200">Official Store</Badge>
          <Badge className="bg-purple-100 text-purple-700 border-none hover:bg-purple-200">Best Seller</Badge>
          <Badge className="bg-green-100 text-green-700 border-none hover:bg-green-200">In Stock</Badge>
        </div>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Product Highlights */}
      <div className="space-y-6 mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
          <span className="text-sm text-gray-500">(What makes this product special)</span>
        </div>
        <ul className="grid grid-cols-1 gap-3">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-600" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Classifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Care Instructions
          </h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" />
              Clean with damp cloth
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" />
              Avoid direct sunlight
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" />
              Regular maintenance required
            </li>
          </ul>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium text-green-900 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Environmental Impact
          </h3>
          <ul className="space-y-2 text-sm text-green-700">
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" />
              Eco-friendly materials
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" />
              Recyclable packaging
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" />
              Low carbon footprint
            </li>
          </ul>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Product Applications
          </h3>
          <ul className="space-y-2 text-sm text-purple-700">
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" />
              Home use
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" />
              Professional settings
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3" />
              Outdoor activities
            </li>
          </ul>
        </div>
      </div>

      {/* Awards and Recognition */}
      <div className="mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-100">
        <h3 className="text-amber-900 font-medium mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Awards & Recognition
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-lg p-3 text-center border border-amber-100">
            <div className="flex items-center justify-center h-8 mb-2">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            </div>
            <h4 className="text-xs font-medium text-gray-900">Product of the Year</h4>
            <p className="text-[10px] text-gray-500">TechAwards 2023</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center border border-amber-100">
            <div className="flex items-center justify-center h-8 mb-2">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            </div>
            <h4 className="text-xs font-medium text-gray-900">Best in Class</h4>
            <p className="text-[10px] text-gray-500">Consumer Choice</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center border border-amber-100">
            <div className="flex items-center justify-center h-8 mb-2">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            </div>
            <h4 className="text-xs font-medium text-gray-900">Innovation Award</h4>
            <p className="text-[10px] text-gray-500">Design Excellence</p>
          </div>
          <div className="bg-white rounded-lg p-3 text-center border border-amber-100">
            <div className="flex items-center justify-center h-8 mb-2">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            </div>
            <h4 className="text-xs font-medium text-gray-900">Editor's Choice</h4>
            <p className="text-[10px] text-gray-500">Tech Magazine</p>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-8">
        <h3 className="text-gray-900 font-medium mb-3">Certifications</h3>
        <div className="flex flex-wrap gap-3">
          {['ISO 9001', 'CE Certified', 'RoHS Compliant', 'Energy Star'].map((cert, index) => (
            <div key={index} className="bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700 flex items-center gap-1">
              <Check className="w-3 h-3 text-green-600" />
              {cert}
            </div>
          ))}
        </div>
      </div>

      {/* Technical Documents */}
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <h3 className="text-gray-900 font-medium mb-3 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Technical Documentation
        </h3>
        <div className="space-y-2">
          {['User Manual', 'Quick Start Guide', 'Warranty Information', 'Technical Specifications'].map((doc, index) => (
            <a 
              key={index} 
              href="#" 
              className="flex items-center justify-between p-2 bg-white rounded border border-gray-200 text-sm hover:bg-blue-50"
            >
              <span>{doc}</span>
              <ExternalLink className="w-4 h-4 text-blue-600" />
            </a>
          ))}
        </div>
      </div>

      {/* Related Videos */}
      <div className="mb-8">
        <h3 className="text-gray-900 font-medium mb-3">Product Videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Product Overview</p>
              <p className="text-gray-400 text-xs">(Video Placeholder)</p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 text-sm">How-to Guide</p>
              <p className="text-gray-400 text-xs">(Video Placeholder)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Dimensions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-gray-900 font-medium mb-3">Product Dimensions</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white p-2 rounded border border-gray-200">
            <span className="block text-xs text-gray-500">Width</span>
            <span className="block text-sm font-medium">10.5 cm</span>
          </div>
          <div className="bg-white p-2 rounded border border-gray-200">
            <span className="block text-xs text-gray-500">Height</span>
            <span className="block text-sm font-medium">15.2 cm</span>
          </div>
          <div className="bg-white p-2 rounded border border-gray-200">
            <span className="block text-xs text-gray-500">Depth</span>
            <span className="block text-sm font-medium">5.8 cm</span>
          </div>
          <div className="bg-white p-2 rounded border border-gray-200">
            <span className="block text-xs text-gray-500">Weight</span>
            <span className="block text-sm font-medium">320g</span>
          </div>
          <div className="bg-white p-2 rounded border border-gray-200">
            <span className="block text-xs text-gray-500">Package Weight</span>
            <span className="block text-sm font-medium">450g</span>
          </div>
          <div className="bg-white p-2 rounded border border-gray-200">
            <span className="block text-xs text-gray-500">Box Dimensions</span>
            <span className="block text-sm font-medium">20 × 12 × 8 cm</span>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};
