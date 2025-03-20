
import React, { useState } from 'react';
import { Ruler, Info, ChevronDown, ChevronUp, HelpCircle, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export function ModishSizeGuide() {
  const [showDetails, setShowDetails] = useState(false);
  const [currentUnit, setCurrentUnit] = useState<'cm' | 'inches'>('cm');
  const [openAccordion, setOpenAccordion] = useState<string | null>('howToMeasure');
  const [userHeight, setUserHeight] = useState<number>(170);
  const [userWeight, setUserWeight] = useState<number>(70);
  const { toast } = useToast();
  
  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const toggleUnit = () => {
    setCurrentUnit(currentUnit === 'cm' ? 'inches' : 'cm');
  };

  const handleHeightChange = (value: number) => {
    setUserHeight(value);
  };

  const handleWeightChange = (value: number) => {
    setUserWeight(value);
  };

  const getSizeRecommendation = () => {
    // Basic algorithm for size recommendation
    if (userHeight < 165) return 'S';
    if (userHeight < 175) return 'M';
    if (userHeight < 185) return 'L';
    return 'XL';
  };

  const getSizeConfidence = () => {
    // Simple confidence rating based on height/weight ratio
    const bmi = userWeight / Math.pow(userHeight / 100, 2);
    
    if (bmi < 18.5 || bmi > 30) return 70; // Less confident
    if (bmi >= 18.5 && bmi < 25) return 95; // More confident
    return 85; // Moderately confident
  };
  
  const recommendedSize = getSizeRecommendation();
  const sizeConfidence = getSizeConfidence();

  const sizeChartData = [
    { size: 'S', chest: currentUnit === 'cm' ? '88-94' : '34.5-37', waist: currentUnit === 'cm' ? '74-80' : '29-31.5', hips: currentUnit === 'cm' ? '88-94' : '34.5-37' },
    { size: 'M', chest: currentUnit === 'cm' ? '95-102' : '37.5-40', waist: currentUnit === 'cm' ? '81-88' : '32-34.5', hips: currentUnit === 'cm' ? '95-102' : '37.5-40' },
    { size: 'L', chest: currentUnit === 'cm' ? '103-110' : '40.5-43.5', waist: currentUnit === 'cm' ? '89-97' : '35-38', hips: currentUnit === 'cm' ? '103-110' : '40.5-43.5' },
    { size: 'XL', chest: currentUnit === 'cm' ? '111-118' : '43.5-46.5', waist: currentUnit === 'cm' ? '98-106' : '38.5-41.5', hips: currentUnit === 'cm' ? '111-118' : '43.5-46.5' },
    { size: '2XL', chest: currentUnit === 'cm' ? '119-126' : '47-49.5', waist: currentUnit === 'cm' ? '107-114' : '42-45', hips: currentUnit === 'cm' ? '119-126' : '47-49.5' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Ruler className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Size Guide</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
          {showDetails ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
        </Button>
      </div>

      {showDetails && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-5 duration-300">
          {/* Size recommendation section */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-3">Your Size Recommendation</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Your Height ({currentUnit})</label>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleHeightChange(Math.max(150, userHeight - 1))}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <div className="flex-1 h-8 bg-white border border-gray-200 rounded-md flex items-center justify-center">
                      <span className="font-medium">
                        {currentUnit === 'cm' ? userHeight : Math.round(userHeight / 2.54)}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleHeightChange(Math.min(210, userHeight + 1))}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Your Weight (kg)</label>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleWeightChange(Math.max(40, userWeight - 1))}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <div className="flex-1 h-8 bg-white border border-gray-200 rounded-md flex items-center justify-center">
                      <span className="font-medium">{userWeight}</span>
                    </div>
                    <button 
                      onClick={() => handleWeightChange(Math.min(150, userWeight + 1))}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="text-center space-y-2">
                  <div className="text-sm text-gray-500">Our recommendation for you</div>
                  <div className="text-3xl font-bold text-blue-600">{recommendedSize}</div>
                  <div className="text-sm">Based on your measurements</div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Recommendation confidence</span>
                      <span>{sizeConfidence}%</span>
                    </div>
                    <Progress value={sizeConfidence} className="h-1.5" />
                  </div>
                  
                  <div className="pt-1 text-xs text-gray-500">
                    <Info className="inline h-3 w-3 mr-1" />
                    {sizeConfidence > 90 
                      ? "This size should fit you perfectly." 
                      : sizeConfidence > 75 
                      ? "This size should fit you well." 
                      : "This size might fit you, but consider checking the detailed measurements."}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Size chart section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">Size Chart</h4>
              <Button variant="outline" size="sm" onClick={toggleUnit}>
                Switch to {currentUnit === 'cm' ? 'inches' : 'cm'}
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chest
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Waist
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hips
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sizeChartData.map((row, i) => (
                    <tr key={i} className={row.size === recommendedSize ? 'bg-blue-50' : ''}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{row.size}</span>
                          {row.size === recommendedSize && (
                            <Badge className="ml-2 bg-blue-100 text-blue-800 border-none">
                              Recommended
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {row.chest} {currentUnit}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {row.waist} {currentUnit}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {row.hips} {currentUnit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* How to measure section */}
          <div>
            <div 
              className="flex justify-between items-center cursor-pointer py-3"
              onClick={() => toggleAccordion('howToMeasure')}
            >
              <h4 className="font-medium text-gray-900 flex items-center">
                <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                How to Measure Yourself
              </h4>
              {openAccordion === 'howToMeasure' ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
            
            {openAccordion === 'howToMeasure' && (
              <div className="p-4 bg-gray-50 rounded-lg mt-2 text-sm text-gray-700 space-y-3">
                <div>
                  <strong className="text-gray-900">Chest:</strong> Measure around the fullest part of your chest, keeping the measuring tape under your armpits and around your shoulder blades.
                </div>
                <div>
                  <strong className="text-gray-900">Waist:</strong> Measure around your natural waistline, which is the narrowest part of your waist, typically above your belly button.
                </div>
                <div>
                  <strong className="text-gray-900">Hips:</strong> Measure around the fullest part of your hips, approximately 8 inches below your natural waistline.
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-xs">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      For the most accurate measurements, use a flexible tape measure and have someone help you. Stand straight with your feet together while taking measurements.
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <Separator className="my-3" />
            
            <div 
              className="flex justify-between items-center cursor-pointer py-3"
              onClick={() => toggleAccordion('fitTips')}
            >
              <h4 className="font-medium text-gray-900 flex items-center">
                <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                Fit Tips
              </h4>
              {openAccordion === 'fitTips' ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
            
            {openAccordion === 'fitTips' && (
              <div className="p-4 bg-gray-50 rounded-lg mt-2 text-sm text-gray-700 space-y-3">
                <div>
                  <strong className="text-gray-900">If you're between sizes:</strong> For a looser fit, choose the larger size. For a more fitted look, choose the smaller size.
                </div>
                <div>
                  <strong className="text-gray-900">For tops:</strong> If you have broader shoulders or a larger chest, consider sizing up.
                </div>
                <div>
                  <strong className="text-gray-900">For bottoms:</strong> If you have wider hips compared to your waist, consider sizing based on your hip measurement.
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-xs">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      This product runs slightly small. If you prefer a more relaxed fit, we recommend sizing up.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
