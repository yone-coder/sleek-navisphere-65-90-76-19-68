
import React, { useState } from 'react';
import { Bell, BellDot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const WebinarInfoComponent = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Statistics data
  const stats = {
    followers: "126.5K",
    seminars: "87"
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
      setNotificationsEnabled(false);
      toast({
        title: t('seminar.notifications.unfollowed'),
        description: t('seminar.notifications.unfollowedDescription') || "You won't receive updates from Académie Byte anymore",
      });
    }
  };

  const toggleRegister = () => {
    const newRegisteredState = !isRegistered;
    setIsRegistered(newRegisteredState);
    
    if (newRegisteredState) {
      toast({
        title: t('seminar.notifications.registered') || "Registered!",
        description: t('seminar.notifications.registeredDescription') || "You've successfully registered for this seminar",
      });
    } else {
      toast({
        title: t('seminar.notifications.unregistered') || "Unregistered",
        description: t('seminar.notifications.unregisteredDescription') || "You've unregistered from this seminar",
      });
    }
  };

  const toggleNotifications = () => {
    if (!isFollowing) {
      setIsFollowing(true);
      setNotificationsEnabled(true);
      toast({
        title: t('seminar.notifications.enabled'),
        description: t('seminar.notifications.enabledDescription') || "You'll receive notifications for new seminars",
      });
    } else {
      const newNotificationState = !notificationsEnabled;
      setNotificationsEnabled(newNotificationState);
      
      if (newNotificationState) {
        toast({
          title: t('seminar.notifications.enabled'),
          description: t('seminar.notifications.enabledDescription') || "You'll receive notifications for new seminars",
        });
      } else {
        toast({
          title: t('seminar.notifications.disabled'),
          description: t('seminar.notifications.disabledDescription') || "You won't receive notifications for new seminars",
        });
      }
    }
  };

  return (
    <div className="px-2 py-3">
      {/* YouTube-style channel section */}
      <div className="flex flex-col">
        {/* Channel info and notification button */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 rounded-full flex-shrink-0">
              <AvatarImage src="/api/placeholder/48/48" alt="Académie Byte" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center">
                <h3 className="font-bold text-gray-900 text-base">{t('seminar.academy.name')}</h3>
                <Badge variant="outline" className="ml-2 bg-transparent border-none p-0">
                  <svg className="h-4 w-4 text-gray-500 fill-gray-500" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                  </svg>
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{stats.followers} {t('seminar.academy.followers')} • {stats.seminars} {t('seminar.academy.seminars')}</p>
            </div>
          </div>
          
          {/* Only notification button in the top section */}
          {isFollowing && (
            <Button
              onClick={toggleNotifications}
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full"
            >
              {notificationsEnabled ? <BellDot className="h-5 w-5 text-gray-700" /> : <Bell className="h-5 w-5 text-gray-700" />}
            </Button>
          )}
        </div>
        
        {/* Two buttons: Follow and Register - side by side */}
        <div className="mt-3 flex gap-2">
          <Button
            onClick={toggleFollow}
            className={`flex-1 ${isFollowing 
              ? "bg-gray-100 hover:bg-gray-200 text-gray-900" 
              : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            size="sm"
          >
            {isFollowing ? t('seminar.academy.following') : t('seminar.academy.follow')}
          </Button>
          
          <Button
            onClick={toggleRegister}
            className={`flex-1 ${isRegistered 
              ? "bg-green-500 hover:bg-green-600 text-white" 
              : "bg-red-600 hover:bg-red-700 text-white"}`}
            size="sm"
          >
            {isRegistered ? t('seminar.registered') || "Registered" : t('seminar.register') || "Register"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebinarInfoComponent;
