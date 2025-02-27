
import React from 'react';
import { Check, Award, Shield, MapPin } from 'lucide-react';

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
    <div className="w-full text-white">
      <div className="flex items-center p-2 pt-3 pl-2 pr-4">
        {/* Profile Image Container */}
        <div className="relative w-12 h-12 rounded-full bg-white mr-3 flex items-center justify-center overflow-hidden flex-shrink-0 aspect-square shadow-md shadow-purple-800/20">
          <img 
            src={creatorImage}
            alt={`Profile image of ${creatorName}`}
            className="w-full h-full object-cover min-w-full min-h-full"
          />
          <div className="absolute -bottom-1 -right-1 bg-[#9b87f5] rounded-full w-4 h-4 flex items-center justify-center border border-white">
            <Shield className="text-white w-2 h-2" />
          </div>
        </div>
        
        {/* Text Content */}
        <div>
          <div className="flex items-center">
            <span className="font-medium text-sm text-white">{creatorName}</span>
            <div className="ml-2 flex items-center">
              <div className="px-1.5 py-0.5 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-full flex items-center gap-1 shadow-md group transition-all duration-300 hover:shadow-purple-500/30 hover:scale-105">
                <Check className="text-white h-2.5 w-2.5" />
                <span className="text-[10px] text-white font-medium">Verified</span>
                <Award className="h-2.5 w-2.5 text-white hidden group-hover:block transition-all" />
              </div>
              <div className="ml-2 px-1.5 py-0.5 bg-black/40 backdrop-blur-sm rounded-full flex items-center text-[10px] text-gray-300">
                <MapPin className="text-[#9b87f5] h-2.5 w-2.5 mr-1" />
                Desarmes, AR, Haïti
              </div>
            </div>
          </div>
          <p className="text-xs mt-1 text-gray-300 max-w-xs">
            Investment Holding Company
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="px-1.5 py-0.5 bg-black/40 backdrop-blur-sm rounded-full flex items-center text-[10px] text-gray-300">
              <span className="text-[#9b87f5] mr-1">•</span>
              Investment Holding Company
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
