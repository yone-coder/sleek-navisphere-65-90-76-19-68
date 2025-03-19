
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, Layers, Armchair, ThumbsUp, Star, ShieldCheck, Check, Pencil, Settings, LayoutPanelTop } from 'lucide-react';
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
  Design: LayoutPanelTop,
  Layers: Layers,
  Armchair: Armchair,
  Sofa: Settings,
  ThumbsUp: ThumbsUp,
  Star: Star,
  ShieldCheck: ShieldCheck,
  Check: Check,
  Pencil: Pencil,
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
  
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
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
        className={`relative overflow-hidden transition-all duration-300 ${showFeatureDetails ? 'min-h-[130px]' : 'min-h-[90px]'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`absolute top-0 left-0 right-0 h-1 ${colors.accent} transition-all duration-300`}></div>
        
        {/* Info/Details toggle button */}
        <button 
          onClick={toggleFeatureDetails}
          className={`absolute top-2 left-2 z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:bg-white transition-colors ${showFeatureDetails ? 'bg-gray-100' : 'bg-white/90'}`}
          aria-label={showFeatureDetails ? "Hide details" : "Show details"}
        >
          <Info className="w-3.5 h-3.5" />
        </button>
        
        <div className="absolute top-2 right-2 text-xs font-medium bg-white/90 rounded-full px-2 py-0.5 shadow-sm border border-gray-100">
          {currentFeatureIndex + 1}/{features.length}
        </div>
        
        <CardContent className={`p-0 ${colors.bg} transition-all duration-300`}>
          <div className="p-4 pb-10 text-center">
            {/* Redesigned - Icon and title on the same horizontal line */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className={`w-7 h-7 rounded-full ${colors.iconBg} flex items-center justify-center`}>
                <IconComponent className={`w-4 h-4 ${colors.icon}`} />
              </div>
              <h3 className={`text-base font-semibold ${colors.text}`}>{currentFeature.title}</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-1">{currentFeature.description}</p>
            
            {showFeatureDetails && (
              <div className="animate-fade-in mt-1">
                <p className="text-xs text-gray-700 mb-1.5">{currentFeature.details}</p>
                <button 
                  onClick={handleLearnMore}
                  className={`text-xs font-medium ${colors.text} underline`}
                >
                  Learn More
                </button>
              </div>
            )}
          </div>
          
          {/* Navigation buttons at bottom right */}
          <div className="absolute bottom-2 right-2 flex gap-1 z-10">
            <button 
              onClick={goToPrevFeature} 
              className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-all duration-200"
              aria-label="Previous feature"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            
            <button 
              onClick={goToNextFeature} 
              className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-all duration-200"
              aria-label="Next feature"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="w-full h-1 bg-gray-200 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${colors.accent}`} 
              style={{ width: `${((currentFeatureIndex + 1) / features.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
