
import React from 'react';
import { Check, MapPin } from 'lucide-react';

interface ProfileSectionProps {
  creatorName: string;
  creatorImage: string;
  creatorBio: string;
}

export function ProfileSection({
  creatorName,
  creatorImage,
  creatorBio = "Investment Holding Company"
}: ProfileSectionProps) {
  return (
    <div className="w-full">
      <div className="max-w-md mx-auto rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
        <div className="flex items-start gap-3">
          {/* Profile Image and Badge */}
          <div className="relative">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
              <img 
                src={creatorImage}
                alt={`Profile image of ${creatorName}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 rounded-full bg-[#9b87f5] p-0.5">
              <Check className="h-3 w-3 text-white" />
            </div>
          </div>
          
          {/* Company Information */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">{creatorName}</h1>
              <div className="ml-2">
                <button className="rounded-md bg-[#9b87f5] px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-[#7E69AB] transition-colors duration-200">Contact</button>
              </div>
            </div>
            
            <p className="text-gray-600">{creatorBio}</p>
            
            <div className="mt-1 flex items-center text-gray-500">
              <MapPin className="mr-1 h-4 w-4" />
              <span className="text-sm">Désarmes, AR, Haiti</span>
            </div>
          </div>
        </div>
        
        {/* Metrics Section - Reduced size */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {/* AUM */}
          <div className="flex items-center justify-center space-x-1">
            <span className="text-lg font-bold text-gray-900">$52M</span>
            <span className="text-xs text-gray-500">AUM</span>
          </div>
          
          {/* ROI */}
          <div className="flex items-center justify-center space-x-1">
            <span className="text-lg font-bold text-gray-900">94%</span>
            <span className="text-xs text-gray-500">ROI</span>
          </div>
          
          {/* YTD */}
          <div className="flex items-center justify-center space-x-1">
            <span className="text-base font-medium text-green-500">+24.5%</span>
            <span className="text-xs text-gray-500">YTD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
