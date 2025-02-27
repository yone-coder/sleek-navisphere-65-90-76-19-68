
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink, Heart, MessageCircle, Share2, Star, User } from 'lucide-react';

interface ProfileSectionProps {
  creatorName: string;
  creatorImage: string;
  creatorBio: string;
  projectsCount: number;
  followersCount: number;
  isVerified: boolean;
  joinDate: string;
  socialLinks: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
}

export function ProfileSection({
  creatorName,
  creatorImage,
  creatorBio,
  projectsCount,
  followersCount,
  isVerified,
  joinDate,
  socialLinks
}: ProfileSectionProps) {
  return (
    <div className="bg-black text-white py-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4">
          {/* Creator Avatar */}
          <div className="relative">
            <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-[#9b87f5]/30">
              <AvatarImage src={creatorImage} alt={creatorName} />
              <AvatarFallback className="bg-[#9b87f5]/20 text-white">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-[#9b87f5] rounded-full p-1">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          
          {/* Creator Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base md:text-xl font-bold">Created by</h2>
              <h1 className="text-xl md:text-2xl font-bold">{creatorName}</h1>
              {isVerified && (
                <Badge variant="outline" className="bg-[#9b87f5]/10 text-[#9b87f5] border-[#9b87f5]/20">
                  <Check className="h-3 w-3 mr-1" /> Verified Creator
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-gray-300 mt-1 mb-2 max-w-xl">{creatorBio}</p>
            
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1 text-sm text-gray-300">
                <Star className="h-4 w-4 fill-[#9b87f5] text-[#9b87f5]" />
                <span>{projectsCount} Projects</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-300">
                <Heart className="h-4 w-4 text-[#9b87f5]" />
                <span>{followersCount} Followers</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-300">
                <span>Joined {joinDate}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button className="bg-[#9b87f5] hover:bg-[#8B5CF6] text-white">
              <Heart className="h-4 w-4 mr-2" />
              Follow
            </Button>
            <Button variant="outline" size="icon" className="text-white border-white/20 hover:bg-white/10 hover:text-white">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="border-t border-white/10 mt-2 pt-3 px-4">
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-[#9b87f5] transition-colors"
                >
                  {link.icon}
                  <span>{link.name}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
