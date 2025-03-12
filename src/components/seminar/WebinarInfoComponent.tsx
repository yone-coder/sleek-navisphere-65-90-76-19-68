import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronDown, ChevronUp, Users, Calendar, Bell, BellDot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface WebinarItem {
  title: string;
  description: string;
  icon: string;
  details: string;
}

interface WebinarSection {
  title: string;
  items: WebinarItem[];
}

const WebinarInfoComponent = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WebinarItem | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  const openDetailsPanel = (item: WebinarItem) => {
    setSelectedItem(item);
    setDetailsPanelOpen(true);
  };

  const closeDetailsPanel = () => {
    setDetailsPanelOpen(false);
  };

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
    <div className="font-sans w-full bg-white text-black relative">
      {/* Academy Header Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <img 
                src="/api/placeholder/48/48" 
                alt="Académie Byte Logo" 
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
              />
            </div>
            <div>
              <div className="flex items-center">
                <h2 className="text-lg font-bold text-gray-900">{t('seminar.academy.name')}</h2>
                <span className="inline-block rounded-full bg-blue-500 p-0.5 text-white ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <Button
            onClick={toggleFollow}
            className="bg-red-500 hover:bg-red-600 text-white"
            size="sm"
          >
            {isFollowing ? t('seminar.academy.following') : t('seminar.academy.follow')}
          </Button>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="p-4 bg-gray-50 border-t border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-700">
            <Users size={16} className="mr-1 text-gray-500" />
            <span>{stats.followers} {t('seminar.academy.followers')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-gray-700">
              <Calendar size={16} className="mr-1 text-gray-500" />
              <span>{stats.seminars} {t('seminar.academy.seminars')}</span>
            </div>
            <Button
              onClick={toggleNotifications}
              variant="outline"
              size="icon"
              className={`${notificationsEnabled ? 'text-red-500 border-red-300' : 'text-gray-500 border-gray-300'}`}
            >
              {notificationsEnabled ? <BellDot size={16} /> : <Bell size={16} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Details Panel (TikTok-style) - Increased z-index to 60 */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 rounded-t-3xl shadow-lg transition-transform duration-300 transform z-60 ${
          detailsPanelOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        {selectedItem && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{selectedItem.icon}</span>
                <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
              </div>
              <button 
                onClick={closeDetailsPanel}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close details"
              >
                <ChevronUp className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Overview</h4>
              <p className="text-gray-700">{selectedItem.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Details</h4>
              <p className="text-gray-700">{selectedItem.details}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay for when panel is open - Increased z-index to 55 */}
      {detailsPanelOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-55"
          onClick={closeDetailsPanel}
        />
      )}
    </div>
  );
};

export default WebinarInfoComponent;
