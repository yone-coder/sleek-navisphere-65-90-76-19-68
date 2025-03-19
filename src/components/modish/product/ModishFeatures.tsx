
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, Design, Layers, Armchair, Sofa, ThumbsUp, Star, ShieldCheck, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Feature = {
  title: string;
  description: string;
  icon: string;
  color: string;
  details: string;
};

type ModishFeaturesProps = {
  features: Feature[];
};

const iconMap = {
  Design: Design,
  Layers: Layers,
  Armchair: Armchair,
  Sofa: Sofa,
  ThumbsUp: ThumbsUp,
  Star: Star,
  ShieldCheck: ShieldCheck,
  Check: Check,
};

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    accent: 'border-blue-300',
    text: 'text-blue-700',
    iconBg: 'bg-blue-100',
    icon: 'text-blue-600',
  },
  green: {
    bg: 'bg-green-50',
    accent: 'border-green-300',
    text: 'text-green-700',
    iconBg: 'bg-green-100',
    icon: 'text-green-600',
  },
  amber: {
    bg: 'bg-amber-50',
    accent: 'border-amber-300',
    text: 'text-amber-700',
    iconBg: 'bg-amber-100',
    icon: 'text-amber-600',
  },
  purple: {
    bg: 'bg-purple-50',
    accent: 'border-purple-300',
    text: 'text-purple-700',
    iconBg: 'bg-purple-100',
    icon: 'text-purple-600',
  },
  brown: {
    bg: 'bg-orange-50',
    accent: 'border-orange-300',
    text: 'text-orange-700',
    iconBg: 'bg-orange-100',
    icon: 'text-orange-600',
  },
};

export function ModishFeatures({ features }: ModishFeaturesProps) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [showFeatureDetails, setShowFeatureDetails] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const currentFeature = features[currentFeatureIndex];
  const colors = colorMap[currentFeature.color as keyof typeof colorMap] || colorMap.blue;
  const IconComponent = iconMap[currentFeature.icon as keyof typeof iconMap] || Check;
  
  // Effect to cycle through features every 5 seconds if not paused
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
        // Auto-hide details when switching features
        setShowFeatureDetails(false);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [features.length, isPaused]);
  
  const handleMouseEnter = () => {
    setIsPaused(true);
  };
  
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const goToNextFeature = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
    setShowFeatureDetails(false);
  };

  const goToPrevFeature = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length);
    setShowFeatureDetails(false);
  };

  const toggleFeatureDetails = () => {
    setShowFeatureDetails(prev => !prev);
    if (!showFeatureDetails) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  };
  
  const handleLearnMore = () => {
    toast.info(`More about ${currentFeature.title}`, {
      description: "This would link to detailed feature information in a real application."
    });
  };

  return (
    <div className="space-y-3 pt-4">
      <h3 className="text-lg font-medium text-gray-900">Key Features</h3>
      
      <Card 
        className={`relative overflow-hidden transition-all duration-300 ${showFeatureDetails ? 'min-h-[220px]' : 'min-h-[160px]'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`absolute top-0 left-0 right-0 h-1 ${colors.accent} transition-all duration-300`}></div>
        
        {/* Navigation arrows */}
        <button 
          onClick={goToPrevFeature} 
          className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center shadow-md z-10 hover:bg-white transition-all duration-200"
          aria-label="Previous feature"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <button 
          onClick={goToNextFeature} 
          className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center shadow-md z-10 hover:bg-white transition-all duration-200"
          aria-label="Next feature"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        
        <CardContent className={`p-0 ${colors.bg} transition-all duration-300`}>
          <div className="p-6 text-center">
            {/* Feature counter indicator */}
            <div className="absolute top-2 right-2 text-xs font-medium bg-white/90 rounded-full px-2 py-0.5 shadow-sm border border-gray-100">
              {currentFeatureIndex + 1}/{features.length}
            </div>
            
            {/* Info/Details toggle button */}
            <button 
              onClick={toggleFeatureDetails}
              className={`absolute top-2 left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:bg-white transition-colors ${showFeatureDetails ? 'bg-gray-100' : 'bg-white/90'}`}
              aria-label={showFeatureDetails ? "Hide details" : "Show details"}
            >
              <Info className="w-3.5 h-3.5" />
            </button>
            
            {/* Icon with background */}
            <div className={`mx-auto w-16 h-16 rounded-full ${colors.iconBg} flex items-center justify-center mb-3`}>
              <IconComponent className={`w-8 h-8 ${colors.icon}`} />
            </div>
            
            <h3 className={`text-lg font-semibold ${colors.text} mb-1`}>{currentFeature.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{currentFeature.description}</p>
            
            {/* Expanded content */}
            {showFeatureDetails && (
              <div className="animate-fade-in mt-3">
                <p className="text-sm text-gray-700 mb-3">{currentFeature.details}</p>
                <button 
                  onClick={handleLearnMore}
                  className={`text-xs font-medium ${colors.text} underline`}
                >
                  Learn More
                </button>
              </div>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-200 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${colors.accent}`} 
              style={{ width: `${((currentFeatureIndex + 1) / features.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Smaller feature list below the card for quick reference */}
      <div className="mt-4 space-y-1">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentFeatureIndex(index);
              setShowFeatureDetails(true);
              setIsPaused(true);
            }}
            className={cn(
              "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
              currentFeatureIndex === index 
                ? `${colorMap[feature.color as keyof typeof colorMap]?.bg} ${colorMap[feature.color as keyof typeof colorMap]?.text} font-medium`
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <div className="flex items-center">
              <span className="mr-2">{index + 1}.</span>
              {feature.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
