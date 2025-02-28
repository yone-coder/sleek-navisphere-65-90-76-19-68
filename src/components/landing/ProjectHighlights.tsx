
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Truck, 
  Laptop, 
  Wallet, 
  Trophy, 
  Globe, 
  Home 
} from 'lucide-react';

interface HighlightCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ icon, title, description, isActive, onClick }) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-lg transition-all duration-300 cursor-pointer ${
        isActive 
          ? 'bg-indigo-600 text-white shadow-lg scale-102' 
          : 'bg-white text-gray-800 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className={`p-2 rounded-full ${isActive ? 'bg-white/20' : 'bg-indigo-50'}`}>
            {React.cloneElement(icon, { 
              size: 20, 
              className: isActive ? 'text-white' : 'text-indigo-600' 
            })}
          </div>
          <h3 className={`ml-3 font-medium ${isActive ? 'text-white' : 'text-gray-800'}`}>
            {title}
          </h3>
        </div>
        <p className={`text-sm ${isActive ? 'text-white/90' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>
      {isActive && (
        <div className="absolute bottom-0 right-0 w-12 h-12 -mb-6 -mr-6 rounded-full bg-white/10" />
      )}
    </div>
  );
};

const ProjectHighlights: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const highlights = [
    {
      icon: <Home />,
      title: "Digital Ecosystem",
      description: "A unified platform empowering Haitians with essential online services."
    },
    {
      icon: <ShoppingBag />,
      title: "Marketplace",
      description: "Buy, sell, and trade goods and services with ease."
    },
    {
      icon: <Truck />,
      title: "Delivery Service",
      description: "Connecting local businesses with customers through seamless logistics."
    },
    {
      icon: <Laptop />,
      title: "Online Education",
      description: "Learn new skills and access valuable knowledge anytime, anywhere."
    },
    {
      icon: <Wallet />,
      title: "Digital Wallet",
      description: "Send, receive, and manage money effortlessly."
    },
    {
      icon: <Trophy />,
      title: "Contests & Competitions",
      description: "Engage, compete, and win through interactive challenges."
    },
    {
      icon: <Globe />,
      title: "Haitian Community",
      description: "A platform designed to uplift and connect Haitians worldwide."
    }
  ];

  // Auto-rotate highlights every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % highlights.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Key Highlights
        </h2>
        <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {highlights.map((highlight, index) => (
          <HighlightCard
            key={index}
            icon={highlight.icon}
            title={highlight.title}
            description={highlight.description}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      
      <div className="flex justify-center mt-6">
        {highlights.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-indigo-600 w-4' : 'bg-gray-300'
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`View highlight ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectHighlights;
