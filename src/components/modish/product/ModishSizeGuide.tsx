
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Size Guide</h3>
        <div>
          <select 
            className="text-sm border rounded p-1"
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
        <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="ml-2 text-sm text-blue-700">
          This product has a unisex fit. For a looser fit, we recommend sizing up.
        </p>
      </div>
      
      <Tabs defaultValue="measurements">
        <TabsList className="w-full">
          <TabsTrigger value="measurements" className="flex-1">Measurements</TabsTrigger>
          <TabsTrigger value="comparison" className="flex-1">Size Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="measurements" className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border">Size</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border">Head Circumference</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border">Ear Cup Height</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border">Ear Cup Width</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border text-sm">One Size</td>
                  <td className="px-4 py-2 border text-sm">19-24 inches (48-61 cm)</td>
                  <td className="px-4 py-2 border text-sm">4 inches (10 cm)</td>
                  <td className="px-4 py-2 border text-sm">3.5 inches (9 cm)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison" className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border">Brand</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border">Comparable Size</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border text-sm">Sony</td>
                  <td className="px-4 py-2 border text-sm">WH-1000XM4</td>
                  <td className="px-4 py-2 border text-sm">Similar fit, slightly smaller ear cups</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border text-sm">Bose</td>
                  <td className="px-4 py-2 border text-sm">QuietComfort 45</td>
                  <td className="px-4 py-2 border text-sm">Similar fit, comparable ear cups</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border text-sm">Apple</td>
                  <td className="px-4 py-2 border text-sm">AirPods Max</td>
                  <td className="px-4 py-2 border text-sm">Slightly larger ear cups</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-6">
        <h4 className="font-medium flex items-center">
          <Ruler className="w-4 h-4 mr-2" />
          Find Your Perfect Size
        </h4>
        
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Your Height (cm)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={userHeight}
              onChange={(e) => setUserHeight(e.target.value)}
              min="140"
              max="220"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-600 block mb-1">Your Weight (kg)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={userWeight}
              onChange={(e) => setUserWeight(e.target.value)}
              min="40"
              max="150"
            />
          </div>
        </div>
        
        <Button 
          className="w-full mt-3"
          onClick={handleFindMySize}
        >
          Find My Size
        </Button>
        
        {recommendedSize && (
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-600">Your recommended size:</div>
            <div className="flex items-center justify-center mt-2">
              <Badge className="px-6 py-3 text-lg bg-green-100 text-green-800 hover:bg-green-100">{recommendedSize}</Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
