
import React, { useState, useRef, useEffect } from 'react';

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Tab data with names and content items
  const tabs = [
    {
      name: "Features",
      items: [
        "Responsive Design",
        "Dark Mode Support",
        "Offline Capability",
        "Push Notifications",
        "Cross-platform",
        "Customizable Theme",
        "Keyboard Shortcuts",
        "Multi-language Support",
        "Accessibility Features",
        "Real-time Updates"
      ]
    },
    {
      name: "Pricing",
      items: [
        "Free Plan - $0/month",
        "Starter - $9/month",
        "Professional - $19/month",
        "Business - $49/month",
        "Enterprise - Custom pricing",
        "Educational Discount",
        "Nonprofit Discount",
        "Annual Savings 20%",
        "30-day Free Trial",
        "Money-back Guarantee"
      ]
    },
    {
      name: "FAQ",
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

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden h-screen">
      {/* Ultra Modern Tab Header */}
      <div className="flex bg-gradient-to-r from-indigo-500 to-purple-600 p-1 rounded-t-lg sticky top-0 z-10">
        <div className="flex bg-white/5 backdrop-blur-sm w-full rounded-md p-1">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 py-2 px-3 text-center font-medium transition-all duration-300 rounded-md ${
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
            className="flex-shrink-0 w-11/12 snap-center h-full"
            style={{ 
              scrollSnapAlign: 'start', 
              fontSize: '1rem', // Reset font size for content
              margin: 0,
              padding: 0,
              flex: '0 0 91.666667%'
            }}
          >
            <div className="h-full w-full overflow-y-auto bg-white">
              <h2 className="text-xl font-bold p-2 pb-1">{tab.name}</h2>
              <ul className="px-2 pb-4 space-y-3">
                {tab.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className="p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabSwitcher;
