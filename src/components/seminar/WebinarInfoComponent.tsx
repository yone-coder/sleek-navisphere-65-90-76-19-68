
import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
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

  // We're removing the benefits section entirely, so the component will just render the details panel
  return (
    <div className="font-sans w-full bg-white text-black relative">
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
