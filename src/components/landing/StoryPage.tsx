
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X, Clock, MessageSquare, Share2, Type } from 'lucide-react';

// Define animations as a CSS-in-JS object
const animationStyles = `
  @keyframes pageExitToLeft {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-10%); opacity: 0; }
  }
  
  @keyframes pageExitToRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(10%); opacity: 0; }
  }
  
  @keyframes pageEnterFromRight {
    from { transform: translateX(10%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes pageEnterFromLeft {
    from { transform: translateX(-10%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  .animate-page-exit-to-left {
    animation: pageExitToLeft 0.5s ease-in-out forwards;
  }
  
  .animate-page-exit-to-right {
    animation: pageExitToRight 0.5s ease-in-out forwards;
  }
  
  .animate-page-enter-from-right {
    animation: pageEnterFromRight 0.5s ease-in-out forwards;
  }
  
  .animate-page-enter-from-left {
    animation: pageEnterFromLeft 0.5s ease-in-out forwards;
  }
`;

const StoryPage = () => {
  const [fontSize, setFontSize] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(2);
  const [tocOpen, setTocOpen] = useState(false);
  const [isPageAnimating, setIsPageAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('next');
  const [likes, setLikes] = useState(1243);
  const [comments] = useState(85);
  const [shares] = useState(32);
  const [liked, setLiked] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({ name: 'English', code: 'en', flag: '🇬🇧' });
  const [fontSizeControlOpen, setFontSizeControlOpen] = useState(false);
  
  // Available languages
  const languages = [
    { name: 'English', code: 'en', flag: '🇬🇧' },
    { name: 'Español', code: 'es', flag: '🇪🇸' },
    { name: 'Français', code: 'fr', flag: '🇫🇷' },
    { name: 'Deutsch', code: 'de', flag: '🇩🇪' },
    { name: 'Italiano', code: 'it', flag: '🇮🇹' }
  ];
  
  // Font size options
  const fontSizeOptions = [12, 14, 16, 18, 20, 22, 24];
  
  // Sample story content with placeholder images and chapters
  const storyContent = [
    {
      title: "The Silent Echo",
      author: "Alex Rivers",
      chapter: "Chapter 1: The Misty Valley",
      content: "The morning fog rolled through the valley, enveloping everything in its ethereal embrace. Maya stood at the edge of the cliff, her silhouette barely visible through the dense mist. She had been coming to this spot for years, but today felt different. The ancient forest below seemed to whisper secrets that only she could hear. Legends spoke of echoes that weren't just reflections of sound, but glimpses into parallel worlds. Maya had always dismissed these as nothing more than local folklore designed to attract tourists.",
      image: "/api/placeholder/600/400",
      readingTime: "3 min"
    },
    {
      chapter: "Chapter 2: Whispers in the Forest",
      content: "Her research team had been studying the unusual acoustic properties of the valley for months. The readings were unlike anything they had ever encountered - sound waves that seemed to exist in quantum superposition, neither here nor there. As she adjusted her recording equipment, a soft melody drifted through the fog. It wasn't coming from the village below, nor from any direction she could identify. It seemed to emanate from the very air around her, as if the fog itself was singing.",
      image: "/api/placeholder/600/400",
      readingTime: "4 min"
    }
  ];

  const handleNextPage = () => {
    if (currentPage < totalPages && !isPageAnimating) {
      setAnimationDirection('next');
      setIsPageAnimating(true);
      
      // Delay actual page change to allow animation to complete
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        
        // Allow animation out to complete before resetting
        setTimeout(() => {
          setIsPageAnimating(false);
        }, 500);
      }, 500);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1 && !isPageAnimating) {
      setAnimationDirection('prev');
      setIsPageAnimating(true);
      
      // Delay actual page change to allow animation to complete
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        
        // Allow animation out to complete before resetting
        setTimeout(() => {
          setIsPageAnimating(false);
        }, 500);
      }, 500);
    }
  };
  
  const navigateToPage = (pageNumber) => {
    if (!isPageAnimating && pageNumber !== currentPage) {
      setAnimationDirection(pageNumber > currentPage ? 'next' : 'prev');
      setIsPageAnimating(true);
      
      setTimeout(() => {
        setCurrentPage(pageNumber);
        setTocOpen(false);
        
        setTimeout(() => {
          setIsPageAnimating(false);
        }, 500);
      }, 500);
    } else {
      setTocOpen(false);
    }
  };
  
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    setLanguageMenuOpen(false);
  };
  
  const handleSetFontSize = (size) => {
    setFontSize(size);
  };
  
  // Format numbers with k/m suffix
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'm';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };
  
  // Progress bar calculation
  const progressPercentage = (currentPage / totalPages) * 100;
  
  const currentContent = storyContent[currentPage - 1];
  
  // Close font size control when clicking outside
  useEffect(() => {
    if (fontSizeControlOpen) {
      const handleClickOutside = (e) => {
        if (!e.target.closest('.font-size-control') && !e.target.closest('.font-size-toggle')) {
          setFontSizeControlOpen(false);
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [fontSizeControlOpen]);
  
  // Animation classes based on direction and state
  const getAnimationClasses = () => {
    if (!isPageAnimating) return "";
    
    if (animationDirection === 'next') {
      return "animate-page-exit-to-left";
    } else {
      return "animate-page-exit-to-right";
    }
  };
  
  const getEnterAnimationClasses = () => {
    if (!isPageAnimating) return "";
    
    return animationDirection === 'next' 
      ? "animate-page-enter-from-right" 
      : "animate-page-enter-from-left";
  };
  
  // Calculate font size percentage for the slider
  const getFontSizePercentage = () => {
    const min = fontSizeOptions[0];
    const max = fontSizeOptions[fontSizeOptions.length - 1];
    return ((fontSize - min) / (max - min)) * 100;
  };
  
  // Effect to inject animation styles once on component mount
  useEffect(() => {
    // Add the animation styles to the document head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = animationStyles;
    document.head.appendChild(styleElement);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white text-gray-800 transition-colors duration-300">
      {/* Side Table of Contents */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 z-50 transform ${tocOpen ? 'translate-x-0' : '-translate-x-full'} 
        bg-white shadow-xl transition-transform duration-300 overflow-y-auto`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Contents</h2>
            <button 
              onClick={() => setTocOpen(false)}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <ul className="space-y-4">
            {storyContent.map((content, index) => (
              <li key={index} className="border-b pb-2 last:border-0">
                <button
                  onClick={() => navigateToPage(index + 1)}
                  className={`text-left w-full py-2 px-2 rounded-lg transition-colors
                  ${currentPage === index + 1 ? 
                    'bg-blue-100 font-medium' : 
                    'hover:bg-gray-100'}`}
                >
                  <div className="font-medium">{content.chapter}</div>
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <Clock size={14} className="mr-1" />
                    {content.readingTime}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Top Navigation Bar with Sticky Progress Bar */}
      <div className="sticky top-0 z-10">
        <header className="bg-white shadow-md transition-colors duration-300">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            {/* Chapters Toggle with light green background */}
            <button
              onClick={() => setTocOpen(!tocOpen)} 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-100 hover:bg-green-200 transition-all duration-200"
            >
              <span className="font-medium">Chapters</span>
              {tocOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            {/* Language Selector with light pink background */}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-pink-100 hover:bg-pink-200 transition-all duration-200"
              >
                <span className="mr-2">{currentLanguage.flag}</span>
                <span>{currentLanguage.name}</span>
                <ChevronDown size={16} className={`transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Language Dropdown */}
              {languageMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLanguageMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 py-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language)}
                        className={`flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 ${
                          currentLanguage.code === language.code ? 'bg-pink-50 text-pink-600' : ''
                        }`}
                      >
                        <span className="mr-3 text-lg">{language.flag}</span>
                        <span>{language.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        
        {/* Reading Progress Bar - Now sticky with header */}
        <div className="w-full h-1 bg-gray-300">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      {/* Story Container - Adjust padding bottom to account for footer */}
      <main className="container mx-auto px-4 py-8 pb-32 max-w-3xl relative overflow-hidden">
        {/* Current content with animation */}
        <div className={`transition-all duration-500 ${getAnimationClasses()}`}>
          {/* Title and Author - Only on first page */}
          {currentPage === 1 && (
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2">{currentContent.title}</h2>
              <p className="text-lg text-gray-600">by {currentContent.author}</p>
            </div>
          )}
          
          {/* Chapter title and reading time */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">{currentContent.chapter}</h3>
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-2" />
              <span>Reading time: {currentContent.readingTime}</span>
            </div>
          </div>
          
          {/* Story Content */}
          <div 
            className="prose max-w-none mb-8 relative" 
            style={{ fontSize: `${fontSize}px` }}
          >
            <p className="leading-relaxed mb-6">{currentContent.content}</p>
            
            {/* Conditional Image */}
            {currentContent.image && (
              <div className="my-8 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={currentContent.image} 
                  alt="Story illustration" 
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Page turning transition overlay */}
        {isPageAnimating && (
          <div className={`absolute inset-0 pointer-events-none ${getEnterAnimationClasses()}`}>
            <div className="h-full opacity-0">Transition placeholder</div>
          </div>
        )}
      </main>
      
      {/* Floating Font Size Control Button - moved higher up */}
      <div className="fixed bottom-40 right-4 z-30 flex flex-col items-end">
        {/* Font Size Toggle Button */}
        <button 
          onClick={() => setFontSizeControlOpen(!fontSizeControlOpen)}
          className="font-size-toggle bg-black bg-opacity-70 hover:bg-opacity-80 text-white rounded-full p-3 shadow-lg transition-all duration-200"
        >
          <Type size={20} />
        </button>
      </div>
      
      {/* Glassmorphic Horizontal Font Size Control */}
      {fontSizeControlOpen && (
        <div className="fixed bottom-40 left-0 right-0 z-20 flex justify-center">
          <div className="font-size-control mx-4 w-full max-w-xl bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-xl p-4 border border-white border-opacity-30">
            <div className="text-sm font-medium mb-2 text-gray-700 text-center">Text Size</div>
            
            {/* Horizontal Slider Area */}
            <div className="relative h-12 mb-2">
              {/* Horizontal Track */}
              <div className="absolute left-8 right-8 top-1/2 h-2 -mt-1 bg-gray-200 rounded-full" />
              
              {/* Filled Track */}
              <div 
                className="absolute left-8 top-1/2 h-2 -mt-1 bg-blue-500 rounded-full"
                style={{ width: `${getFontSizePercentage()}%`, maxWidth: 'calc(100% - 64px)' }}
              />
              
              {/* Font Size Buttons */}
              <div className="absolute left-8 right-8 top-0 h-full flex items-center justify-between">
                {fontSizeOptions.map((size) => {
                  const isActive = size === fontSize;
                  return (
                    <button
                      key={size}
                      onClick={() => handleSetFontSize(size)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                        ${isActive ? 'bg-blue-500 text-white shadow-md scale-110' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <span className="text-xs font-medium">{size}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Current Size Display */}
            <div className="text-sm font-bold text-center text-blue-600">Current: {fontSize}px</div>
          </div>
        </div>
      )}
      
      {/* Overlay for Table of Contents */}
      {tocOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setTocOpen(false)}
        />
      )}
      
      {/* Social Buttons Footer */}
      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-md z-20">
        <div className="w-full px-2 py-3">
          {/* Navigation row */}
          <div className="flex justify-between items-center mb-3">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1 || isPageAnimating}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all duration-200 
                ${(currentPage === 1 || isPageAnimating) ? 
                'opacity-50 cursor-not-allowed' : 
                'hover:bg-gray-200 bg-green-50'}`}
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>
            
            <div className="text-center">
              <button 
                onClick={() => setTocOpen(true)}
                className="font-mono hover:bg-gray-200 px-3 py-1 rounded bg-green-50"
              >
                {currentPage} / {totalPages}
              </button>
            </div>
            
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages || isPageAnimating}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all duration-200
                ${(currentPage === totalPages || isPageAnimating) ? 
                'opacity-50 cursor-not-allowed' : 
                'hover:bg-gray-200 bg-green-50'}`}
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
          
          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-2 w-full">
            {/* Like Button */}
            <button 
              onClick={handleLike}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg w-full transition-all duration-200 ${
                liked 
                  ? 'bg-red-50 text-red-600' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">❤️</span>
              <span className="font-medium">{formatNumber(likes)}</span>
            </button>
            
            {/* Comment Button */}
            <button 
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg w-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-200"
            >
              <MessageSquare size={18} />
              <span className="font-medium">{formatNumber(comments)}</span>
            </button>
            
            {/* Share Button */}
            <button 
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg w-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-200"
            >
              <Share2 size={18} />
              <span className="font-medium">{formatNumber(shares)}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoryPage;
