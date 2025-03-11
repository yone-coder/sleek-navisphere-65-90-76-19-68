
import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronDown, ChevronUp, Users, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
  
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WebinarItem | null>(null);
  
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

  return (
    <div className="font-sans w-full bg-white text-black relative">
      {/* Stats Section */}
      <div className="p-4 bg-gray-50 border-t border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-700">
            <Users size={16} className="mr-1 text-gray-500" />
            <span>{stats.followers} {t('seminar.academy.followers')}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Calendar size={16} className="mr-1 text-gray-500" />
            <span>{stats.seminars} {t('seminar.academy.seminars')}</span>
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
