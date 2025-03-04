
import React, { useState, useRef, useEffect } from 'react';
import VideoDetailsPage from '../components/landing/VideoDetailsPage';
import ServicesTab from '../components/landing/ServicesTab';
import TimelineTab from '../components/landing/TimelineTab';
import StoryPage from '../components/landing/StoryPage';
import { BottomNav } from '../components/BottomNav';
import { FloatingProgress } from '../components/campaign/FloatingProgress';

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const tabs = [
    {
      name: "Overview",
      content: (
        <div className="relative">
          <VideoDetailsPage />
          <FloatingProgress 
            backers={1250}
            progress={82}
            days={15}
            raised={82500}
            goal={100000}
          />
        </div>
      )
    },
    {
      name: "Our story",
      content: (
        <div className="h-full overflow-hidden">
          <StoryPage showBottomNav={true} />
        </div>
      )
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
      scrollContainerRef.current.scrollTo({
        left: index * containerWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, offsetWidth } = scrollContainerRef.current;
      const tabIndex = Math.round(scrollLeft / offsetWidth);
      if (tabIndex !== activeTab && tabIndex >= 0 && tabIndex < tabs.length) {
        setActiveTab(tabIndex);
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
              width: '100%',
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
