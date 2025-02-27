
import React from 'react';
import { Check } from 'lucide-react';

interface ProfileSectionProps {
  creatorName: string;
  creatorImage: string;
  creatorBio: string;
}

export function ProfileSection({
  creatorName,
  creatorImage,
  creatorBio
}: ProfileSectionProps) {
  return (
    <div className="w-full text-white">
      <div className="flex items-center p-2 px-4">
        {/* Profile Image Container */}
        <div className="w-12 h-12 rounded-full bg-white mr-2 flex items-center justify-center overflow-hidden flex-shrink-0 aspect-square">
          <img 
            src={creatorImage}
            alt={`Profile image of ${creatorName}`}
            className="w-full h-full object-cover min-w-full min-h-full"
          />
        </div>
        
        {/* Text Content */}
        <div>
          <div className="flex items-center">
            <span className="font-medium text-sm">{creatorName}</span>
            <Check className="text-[#9b87f5] ml-1 h-3 w-3" />
          </div>
          <p className="text-xs mt-1 text-gray-300">
            {creatorBio}
          </p>
        </div>
      </div>
    </div>
  );
}
