
import { type FC } from "react";
import { TabsContent } from "@/components/ui/tabs";

interface DescriptionTabProps {
  description: string;
  highlights: string[];
}

export const DescriptionTab: FC<DescriptionTabProps> = ({ description, highlights }) => {
  return (
    <TabsContent value="description" className="mt-6">
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      <div className="space-y-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
        <ul className="grid grid-cols-1 gap-3">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-600" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Care Instructions</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>Clean with damp cloth</li>
              <li>Avoid direct sunlight</li>
              <li>Regular maintenance required</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">Environmental Impact</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>Eco-friendly materials</li>
              <li>Recyclable packaging</li>
              <li>Low carbon footprint</li>
            </ul>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};
