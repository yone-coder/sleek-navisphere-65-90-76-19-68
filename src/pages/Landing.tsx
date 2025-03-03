import React, { useState, useRef, useEffect } from 'react';
import VideoDetailsPage from '../components/landing/VideoDetailsPage';
import ServicesTab from '../components/landing/ServicesTab';
import TimelineTab from '../components/landing/TimelineTab';
import StoryPage from '../components/landing/StoryPage';
import { Navigation, ArrowRight, Sparkle } from 'lucide-react';

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);
  
  const tabs = [
    {
      name: "Overview",
      content: <VideoDetailsPage />
    },
    {
      name: "Our story",
      content: <div className="h-full overflow-hidden"><StoryPage /></div>
    },
    {
      name: "Services",
      content: <div className="h-full overflow-auto"><ServicesTab /></div>
    },
    {
      name: "Timeline",
      content: <div className="h-full overflow-auto"><TimelineTab /></div>
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

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const tabWidth = containerWidth * (0.96); // Increased to 96% to show smaller hint
      scrollContainerRef.current.scrollTo({
        left: index * tabWidth,
        behavior: 'smooth'
      });
    }
    
    setShowHint(false);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, offsetWidth } = scrollContainerRef.current;
      const tabWidth = offsetWidth * (0.96); // Increased to 96% to show smaller hint
      const tabIndex = Math.round(scrollLeft / tabWidth);
      if (tabIndex !== activeTab && tabIndex >= 0 && tabIndex < tabs.length) {
        setActiveTab(tabIndex);
      }
      
      if (scrollLeft > 10) {
        setShowHint(false);
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden h-screen relative">
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

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide flex-grow"
        style={{ 
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          fontSize: 0,
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
              fontSize: '1rem',
              margin: 0,
              padding: 0,
              width: '96%', // Increased from 91.67% to 96% to show smaller hint
              flex: 'none'
            }}
          >
            <div className="h-full w-full overflow-hidden bg-white">
              {tab.content ? (
                <div className="w-full h-full overflow-auto">
                  {tab.content}
                </div>
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
