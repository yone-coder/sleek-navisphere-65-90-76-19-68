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
  
  // Auto-expand the benefits section by default
  const [expandedSections, setExpandedSections] = useState([0]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [detailsPanelOpen, setDetailsPanelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WebinarItem | null>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  
  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const openDetailsPanel = (item: WebinarItem) => {
    setSelectedItem(item);
    setDetailsPanelOpen(true);
  };

  const closeDetailsPanel = () => {
    setDetailsPanelOpen(false);
  };

  // Merged items from both sections
  const sectionData: WebinarSection[] = [
    {
      title: "Benefits",
      items: [
        {
          title: "Master Modern Frontend",
          description: "Learn cutting-edge techniques for building responsive, accessible, and performant websites.",
          icon: "🚀",
          details: "Dive deep into HTML5, CSS3, and JavaScript ES6+. Explore modern frameworks like React, Vue, and Angular. Learn about state management, component architecture, and performance optimization techniques that will take your frontend skills to the next level."
        },
        {
          title: "Practical Approach",
          description: "Hands-on exercises and real-world projects to solidify your understanding of complex concepts.",
          icon: "🛠️",
          details: "Work on realistic projects like e-commerce platforms, social media interfaces, and dashboard applications. Each module includes practical challenges that reinforce theoretical concepts and help you build muscle memory for efficient coding practices."
        },
        {
          title: "Industry Standards",
          description: "Stay updated with the latest frameworks, libraries, and best practices used by top companies.",
          icon: "📈",
          details: "Learn what top tech companies expect from frontend developers. Explore current best practices for code organization, testing, deployment, and maintenance. Understand how to align your development workflow with industry standards."
        },
        {
          title: "Interactive Learning",
          description: "Live coding sessions with immediate feedback to accelerate your learning curve.",
          icon: "💻",
          details: "Participate in live coding sessions where instructors solve problems in real-time. Get immediate feedback on your code through code reviews and pair programming sessions. Experience the power of collaborative learning."
        },
        {
          title: "Career Advancement",
          description: "Acquire skills that make you stand out in the competitive job market.",
          icon: "🌟",
          details: "Learn exactly what hiring managers are looking for in frontend developers. Build a personal brand that showcases your expertise. Develop a strategy for continuous learning that keeps you relevant in the rapidly evolving tech landscape."
        },
        {
          title: "Portfolio Enhancement",
          description: "Build impressive projects to showcase your newly acquired skills to potential employers.",
          icon: "📁",
          details: "Create portfolio-worthy projects that demonstrate your technical abilities and creative problem-solving skills. Each project is designed to highlight different aspects of frontend development, giving you a well-rounded portfolio."
        },
        {
          title: "Community Access",
          description: "Join a network of like-minded developers for collaboration and support.",
          icon: "👥",
          details: "Connect with fellow participants through our dedicated community platform. Share resources, ask questions, and collaborate on projects. Build a professional network that extends beyond the duration of the webinar."
        },
        {
          title: "Personalized Feedback",
          description: "Receive expert advice on your code and implementation strategies.",
          icon: "📝",
          details: "Get detailed feedback on your coding assignments from experienced developers. Understand your strengths and areas for improvement. Receive tailored recommendations for advancing your skills based on your current level and career goals."
        },
        {
          title: "Certification",
          description: "Earn a recognized certificate upon successful completion of the webinar series.",
          icon: "🏆",
          details: "Receive a certificate that validates your frontend development skills. Add this credential to your resume and LinkedIn profile to enhance your professional credibility. Our certificates are recognized by many technology companies."
        },
        {
          title: "Lifetime Updates",
          description: "Access to future content refreshes as technologies and methodologies evolve.",
          icon: "♾️",
          details: "Enjoy lifetime access to course materials and future updates. As frontend technologies evolve, our content is regularly updated to reflect current trends and best practices, ensuring your knowledge remains relevant."
        }
      ]
    }
  ];

  const scrollToItem = (index: number) => {
    setActiveItemIndex(index);
    if (itemsContainerRef.current) {
      const containerWidth = itemsContainerRef.current.clientWidth;
      const itemWidth = 288; // 72 * 4
      const scrollPosition = index * itemWidth - (containerWidth / 2) + (itemWidth / 2);
      
      itemsContainerRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="font-sans w-full bg-white text-black relative">
      {sectionData.map((section, index) => (
        <div key={index} className="mb-6 last:mb-0 w-full">
          <div 
            className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-300 ${
              expandedSections.includes(index) 
                ? 'bg-gray-100 shadow-sm' 
                : 'bg-white hover:bg-gray-50'
            } border-b border-gray-200`}
            onClick={() => toggleSection(index)}
          >
            <h3 className="text-2xl font-semibold flex items-center">
              {expandedSections.includes(index) ? 
                <ChevronDown className="mr-2 h-6 w-6" /> : 
                <ChevronRight className="mr-2 h-6 w-6" />
              }
              {section.title}
            </h3>
            <div className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
              {section.items.length} items
            </div>
          </div>
          
          {expandedSections.includes(index) && (
            <div className="w-full">
              <div 
                ref={itemsContainerRef}
                className="flex gap-4 px-4 py-4 overflow-x-auto scrollbar-hide"
              >
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className={`flex-none w-72 bg-white border border-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col`}
                  >
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                    <div 
                      className="flex flex-col items-center text-black font-medium cursor-pointer self-center"
                      onClick={() => openDetailsPanel(item)}
                    >
                      <span>{t('webinar.learnmore')}</span>
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

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
