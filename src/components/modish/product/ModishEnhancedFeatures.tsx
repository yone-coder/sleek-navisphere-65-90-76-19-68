
import React, { useState } from 'react';
import { Battery, Bluetooth, Zap, Volume2, Waves, Shield, Droplet, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Feature = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

type ModishEnhancedFeaturesProps = {
  productId: string;
};

export function ModishEnhancedFeatures({ productId }: ModishEnhancedFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Mock product features
  const features: Feature[] = [
    {
      id: 'battery',
      icon: <Battery className="h-5 w-5" />,
      title: '10-hr Battery',
      description: 'Long-lasting rechargeable battery with up to 10 hours of continuous playback.',
      color: 'bg-green-500'
    },
    {
      id: 'bluetooth',
      icon: <Bluetooth className="h-5 w-5" />,
      title: 'Bluetooth 5.0',
      description: 'Latest Bluetooth technology for stable connection up to 30 feet away.',
      color: 'bg-blue-500'
    },
    {
      id: 'power',
      icon: <Zap className="h-5 w-5" />,
      title: 'Fast Charge',
      description: 'Quick 15-minute charge provides up to 3 hours of playback time.',
      color: 'bg-yellow-500'
    },
    {
      id: 'sound',
      icon: <Volume2 className="h-5 w-5" />,
      title: 'HD Sound',
      description: 'Premium audio quality with deep bass and crystal clear highs.',
      color: 'bg-purple-500'
    },
    {
      id: 'water',
      icon: <Droplet className="h-5 w-5" />,
      title: 'Water Resistant',
      description: 'IPX7 water resistance rating protects against splashes and rain.',
      color: 'bg-cyan-500'
    },
    {
      id: 'app',
      icon: <Smartphone className="h-5 w-5" />,
      title: 'Smart App',
      description: 'Companion app for custom EQ settings and firmware updates.',
      color: 'bg-orange-500'
    }
  ];
  
  const handleFeatureClick = (featureId: string) => {
    if (activeFeature === featureId) {
      setActiveFeature(null);
    } else {
      setActiveFeature(featureId);
      
      // Simulate analytics tracking
      toast({
        title: `Feature: ${features.find(f => f.id === featureId)?.title}`,
        description: "Feature details expanded",
        duration: 1500,
      });
    }
  };
  
  return (
    <div className="mt-4 px-3">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Key Features</h3>
      
      <div className="grid grid-cols-3 gap-2">
        {features.map((feature) => (
          <div 
            key={feature.id}
            className={cn(
              "relative rounded-lg overflow-hidden transition-all duration-300 border",
              activeFeature === feature.id 
                ? "col-span-3 border-gray-300 shadow-sm" 
                : "border-gray-200"
            )}
          >
            <button
              onClick={() => handleFeatureClick(feature.id)}
              className="w-full text-left"
            >
              <div className={cn(
                "absolute top-0 left-0 w-1 h-full",
                feature.color
              )} />
              
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white",
                    feature.color
                  )}>
                    {feature.icon}
                  </div>
                  <span className="font-medium text-sm">{feature.title}</span>
                </div>
                
                {activeFeature === feature.id && (
                  <div className="mt-2 text-sm text-gray-600 animate-fade-in">
                    {feature.description}
                  </div>
                )}
              </div>
            </button>
          </div>
        ))}
      </div>
      
      {/* Interactive feature comparison */}
      <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-800">Compare with similar products</h4>
          <button 
            className="text-xs text-blue-600"
            onClick={() => toast({
              title: "Compare Products",
              description: "Product comparison feature coming soon",
              duration: 2000
            })}
          >
            View all
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px] text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left pb-2 font-medium">Feature</th>
                <th className="text-center pb-2 font-medium">This Product</th>
                <th className="text-center pb-2 font-medium">Premium Model</th>
                <th className="text-center pb-2 font-medium">Basic Model</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2">Battery Life</td>
                <td className="text-center">10 hours</td>
                <td className="text-center text-green-600">15 hours</td>
                <td className="text-center text-red-600">6 hours</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2">Water Resistance</td>
                <td className="text-center">IPX7</td>
                <td className="text-center text-green-600">IPX8</td>
                <td className="text-center text-red-600">IPX4</td>
              </tr>
              <tr>
                <td className="py-2">Bluetooth Version</td>
                <td className="text-center">5.0</td>
                <td className="text-center">5.2</td>
                <td className="text-center text-red-600">4.2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
