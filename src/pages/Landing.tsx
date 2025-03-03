
import React, { useState, useRef, useEffect } from 'react';
import VideoDetailsPage from '../components/landing/VideoDetailsPage';
import { Navigation, ArrowRight, Sparkle } from 'lucide-react';
import ServicesTab from '../components/landing/ServicesTab';

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);
  
  // Tab data with names and content items
  const tabs = [
    {
      name: "Overview",
      content: <VideoDetailsPage />
    },
    {
      name: "Our story",
      items: [
        "Founded in 2020",
        "Started with 3 team members",
        "First major release in 2021",
        "Expanded to global markets in 2022",
        "Reached 1 million users in 2023",
        "Secured Series A funding",
        "Opened headquarters in San Francisco",
        "Expanded product line",
        "Won industry innovation award",
        "Launched partner program"
      ]
    },
    {
      name: "Services",
      content: <ServicesTab />
    },
    {
      name: "Timeline",
      items: [
        "2020 - Company founded",
        "2021 - First product launch",
        "2021 - Initial seed funding",
        "2022 - International expansion",
        "2022 - Partnership program started",
        "2023 - Reached 1M users milestone",
        "2023 - Series A funding secured",
        "2024 - New product line launched",
        "2024 - Industry innovation award",
        "2025 - IPO plans announced"
      ]
    },
    {
      name: "FAQs",
      items: [
        "How do I get started?",
        "Can I change plans later?",
        "Do you offer refunds?",
        "Is there a mobile app?",
        "How secure is my data?",
        "Can I export my data?",
        "How do I cancel?",
        "Do you offer support?",
        "Are there any hidden fees?",
        "What payment methods do you accept?"
      ]
    }
  ];

  // Handle manual tab switching
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      // Use 11/12 width to show hint of next tab
      const tabWidth = containerWidth * (11/12);
      scrollContainerRef.current.scrollTo({
        left: index * tabWidth,
        behavior: 'smooth'
      });
    }
    
    // Hide hint after user clicks a tab
    setShowHint(false);
  };

  // Handle scroll event to update active tab
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, offsetWidth } = scrollContainerRef.current;
      // Use 11/12 width to show hint of next tab
      const tabWidth = offsetWidth * (11/12);
      const tabIndex = Math.round(scrollLeft / tabWidth);
      if (tabIndex !== activeTab && tabIndex >= 0 && tabIndex < tabs.length) {
        setActiveTab(tabIndex);
      }
      
      // Hide hint after user starts scrolling
      if (scrollLeft > 10) {
        setShowHint(false);
      }
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeTab]);

  // Auto-hide hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden h-screen relative">
      {/* Ultra Modern Tab Header - Reduced size */}
      <div className="flex bg-gradient-to-r from-indigo-500 to-purple-600 p-0.5 rounded-t-lg sticky top-0 z-10">
        <div className="flex bg-white/5 backdrop-blur-sm w-full rounded-md p-0.5">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 py-1.5 px-2 text-center text-xs font-medium transition-all duration-300 rounded-md ${
                activeTab === index
                  ? 'bg-white text-indigo-600 shadow-md transform scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Visually Appealing, Non-Blinking Hint Message - now works on all tabs by positioning it absolutely */}
      {showHint && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-lg shadow-md border border-gray-100 transition-opacity duration-300">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
              <Sparkle size={18} className="text-indigo-400" />
              <span>Swipe to explore more tabs</span>
              <Navigation size={18} className="text-indigo-400" />
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Tab Content Container with reduced padding */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide flex-grow"
        style={{ 
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          fontSize: 0, // Remove whitespace between inline elements
          display: 'flex',
          width: '100%'
        }}
      >
        {tabs.map((tab, tabIndex) => (
          <div 
            key={tabIndex}
            className="flex-shrink-0 w-full snap-center h-full"
            style={{ 
              scrollSnapAlign: 'start', 
              fontSize: '1rem', // Reset font size for content
              margin: 0,
              padding: 0,
              flex: '0 0 95%'
            }}
          >
            <div className="h-full w-full overflow-y-auto bg-white">
              {tab.content ? (
                <div className="w-full">{tab.content}</div>
              ) : (
                <>
                  <h2 className="text-xl font-bold p-2 pb-1">{tab.name}</h2>
                  <ul className="px-2 pb-4 space-y-3">
                    {tab.items && tab.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex}
                        className="p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabSwitcher;
