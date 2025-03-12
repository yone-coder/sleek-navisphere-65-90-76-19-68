
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const WebinarInfoComponent = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [isFollowing, setIsFollowing] = useState(false);

  // Statistics data
  const stats = {
    followers: "126.5K",
  };

  const toggleFollow = () => {
    const newFollowState = !isFollowing;
    setIsFollowing(newFollowState);
    
    if (newFollowState) {
      toast({
        title: t('seminar.notifications.followed'),
        description: t('seminar.notifications.followedDescription') || "You'll receive updates from Académie Byte",
      });
    } else {
      toast({
        title: t('seminar.notifications.unfollowed'),
        description: t('seminar.notifications.unfollowedDescription') || "You won't receive updates from Académie Byte anymore",
      });
    }
  };

  return (
    <div className="px-0 py-2">
      {/* YouTube-style channel section */}
      <div className="flex flex-col">
        {/* Channel info with follow button moved to the right */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-full flex-shrink-0">
              <AvatarImage src="/api/placeholder/48/48" alt="Académie Byte" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center">
                <h3 className="font-bold text-gray-900 text-base">{t('seminar.academy.name')}</h3>
                <Badge variant="outline" className="ml-2 bg-transparent border-none p-0">
                  <svg className="h-4 w-4 text-gray-500 fill-gray-500" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                  </svg>
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{stats.followers} abonnés</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button
              onClick={toggleFollow}
              variant="outline"
              size="sm"
              className={`h-9 transition-all duration-300 flex-shrink-0 ${isFollowing 
                ? "bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-200" 
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-transparent shadow-md hover:shadow-lg"}`}
            >
              {isFollowing ? t('seminar.academy.following') : t('seminar.academy.follow')}
            </Button>
          </div>
        </div>
      </div>
      
      <Separator className="my-4" />
    </div>
  );
};

export default WebinarInfoComponent;
