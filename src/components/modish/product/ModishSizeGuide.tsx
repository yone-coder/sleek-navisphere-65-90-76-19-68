
import React, { useState } from 'react';
import { Info, Ruler, ArrowRight } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ModishSizeGuide() {
  const [selectedRegion, setSelectedRegion] = useState('us');
  const [userHeight, setUserHeight] = useState('170');
  const [userWeight, setUserWeight] = useState('70');
  const [recommendedSize, setRecommendedSize] = useState('M');
  
  const handleFindMySize = () => {
    // Simple logic to determine size based on height and weight
    const height = parseInt(userHeight);
    const weight = parseInt(userWeight);
    
    if (height < 165 || weight < 60) {
      setRecommendedSize('S');
    } else if (height < 180 || weight < 80) {
      setRecommendedSize('M');
    } else {
      setRecommendedSize('L');
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Size Guide</h3>
        <div>
          <select 
            className="text-xs border rounded p-1"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="us">US Sizes</option>
            <option value="eu">EU Sizes</option>
            <option value="uk">UK Sizes</option>
            <option value="cm">CM</option>
          </select>
        </div>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-md border border-blue-100 flex items-start">
        <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="ml-2 text-xs text-blue-700">
          This product has a unisex fit. For a looser fit, we recommend sizing up.
        </p>
      </div>
      
      <Tabs defaultValue="measurements" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-gray-100 rounded-md">
          <TabsTrigger value="measurements" className="text-xs py-1.5 rounded-md">Measurements</TabsTrigger>
          <TabsTrigger value="comparison" className="text-xs py-1.5 rounded-md">Size Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="measurements" className="mt-3">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border">Size</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border">Head Circumference</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border">Ear Cup Height</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border">Ear Cup Width</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 border text-xs">One Size</td>
                  <td className="px-3 py-2 border text-xs">19-24 inches (48-61 cm)</td>
                  <td className="px-3 py-2 border text-xs">4 inches (10 cm)</td>
                  <td className="px-3 py-2 border text-xs">3.5 inches (9 cm)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison" className="mt-3">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border">Brand</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border">Comparable Size</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-2 border text-xs">Sony</td>
                  <td className="px-3 py-2 border text-xs">WH-1000XM4</td>
                  <td className="px-3 py-2 border text-xs">Similar fit, slightly smaller ear cups</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border text-xs">Bose</td>
                  <td className="px-3 py-2 border text-xs">QuietComfort 45</td>
                  <td className="px-3 py-2 border text-xs">Similar fit, comparable ear cups</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 border text-xs">Apple</td>
                  <td className="px-3 py-2 border text-xs">AirPods Max</td>
                  <td className="px-3 py-2 border text-xs">Slightly larger ear cups</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mt-4">
        <h4 className="font-medium text-sm flex items-center">
          <Ruler className="w-3.5 h-3.5 mr-1.5" />
          Find Your Perfect Size
        </h4>
        
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <label className="text-xs text-gray-600 block mb-1">Your Height (cm)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md text-sm h-9"
              value={userHeight}
              onChange={(e) => setUserHeight(e.target.value)}
              min="140"
              max="220"
            />
          </div>
          
          <div>
            <label className="text-xs text-gray-600 block mb-1">Your Weight (kg)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md text-sm h-9"
              value={userWeight}
              onChange={(e) => setUserWeight(e.target.value)}
              min="40"
              max="150"
            />
          </div>
        </div>
        
        <Button 
          className="w-full mt-3 h-9 text-sm"
          onClick={handleFindMySize}
        >
          Find My Size
        </Button>
        
        {recommendedSize && (
          <div className="mt-3 text-center">
            <div className="text-xs text-gray-600">Your recommended size:</div>
            <div className="flex items-center justify-center mt-1.5">
              <Badge className="px-4 py-1.5 text-base bg-green-100 text-green-800 hover:bg-green-100 h-auto font-medium">
                {recommendedSize}
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
