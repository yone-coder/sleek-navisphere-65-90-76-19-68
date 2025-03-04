import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X, Clock, MessageCircle, Share2, Type } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import BookChapters from '@/components/story/BookChapters';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TikTokCommentsPanel from '../comments/TikTokCommentsPanel';

const StoryPage = () => {
  const [fontSize, setFontSize] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(15);
  const [isShowingChapters, setIsShowingChapters] = useState(false);
  const [isPageAnimating, setIsPageAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('next');
  const [likes, setLikes] = useState(1243);
  const [comments] = useState(85);
  const [shares] = useState(32);
  const [liked, setLiked] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({ name: 'English', code: 'en', flag: '🇬🇧' });
  const [fontSizeControlOpen, setFontSizeControlOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);
  
  const languages = [
    { name: 'English', code: 'en', flag: '🇬🇧' },
    { name: 'Español', code: 'es', flag: '🇪🇸' },
    { name: 'Français', code: 'fr', flag: '🇫🇷' },
    { name: 'Haitian Creole', code: 'ht', flag: '🇭🇹' },
    { name: 'Italiano', code: 'it', flag: '🇮🇹' }
  ];
  
  const fontSizeOptions = [12, 14, 16, 18, 20, 22, 24];
  
  const storyContent = [
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "A Vision is Born",
      content: "Port-au-Prince was a city of both hope and hardship. I was one of the lucky ones—Plante Lavi covered my tuition, rent, and living expenses. But outside my small apartment, I saw a different reality: students struggling to afford education, businesses barely surviving, and talented people with no platform to showcase their skills.\n\nI kept asking myself—why didn't we have a digital space designed for us?\n\nIt wasn't that we lacked talent or ideas. We lacked the infrastructure.\n\nIf no one was going to build it for us, I had to do it myself.\n\nBut the city had other plans for me.",
      image: "/api/placeholder/600/400",
      readingTime: "3 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "Staring Death in the Face",
      content: "One morning, on my way to school, my reality shattered. Gunshots rang out. I barely escaped with my life. That day, I understood something deeper—survival in Haiti was not guaranteed.\n\nI had always wanted to build something for my people. But now, it wasn't just about opportunity—it was about creating a safe future.\n\nBut survival wasn't the only challenge I faced.",
      image: "/api/placeholder/600/400",
      readingTime: "2 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "When Universities Closed Their Doors",
      content: "As insecurity worsened, universities across the city shut down—including mine.\n\nFor more than half a year, I was stranded. My education was paused, my dreams put on hold. But instead of waiting, I made a decision.\n\nI wasn't going to let this stop me.\n\nBut my journey was about to take an unexpected turn.",
      image: "/api/placeholder/600/400",
      readingTime: "2 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "Leaving Port-au-Prince",
      content: "With no school and the city growing more dangerous, I had no choice but to return to my home village, Désarmes, in the last days of March 2024. It felt like a defeat.\n\nBut soon, I realized something:\n\nIf I could build this platform from anywhere, why not from here?\n\nSo, I went all in.\n\nBut returning home opened my eyes to something even deeper.",
      image: "/api/placeholder/600/400",
      readingTime: "2 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "A Harsh Reality Hits Home",
      content: "Back in Désarmes, I saw how much my friends and others from my generation were struggling. They weren't just worried about careers—they were struggling to survive.\n\nMany couldn't afford to go to university. Some had already given up on education entirely.\n\nIt hit me hard.\n\nI realized how privileged I was to have even had a chance at higher education. I had endured hardships, but at least I had a way out—most didn't.\n\nThis gave me a new dream.\n\nI had to build something bigger than just a business.\n\nI had to create a foundation to help those in need.\n\nBecause I knew what it was to suffer in Haiti.\n\nAnd I knew that without help, many of them would never get the opportunities they deserved.",
      image: "/api/placeholder/600/400",
      readingTime: "4 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "The Deep Dive into Creation",
      content: "With nothing but time on my hands, I threw myself into coding. I learned everything—databases, front-end, back-end. In just two years, I transformed from a dreamer into a builder.\n\nBut my dedication came at a heavy price.",
      image: "/api/placeholder/600/400",
      readingTime: "2 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "The Cost of Obsession",
      content: "I worked so hard that I lost track of the world. Some days I forgot to eat. Other days, I simply couldn't afford to. I poured everything into the platform, ignoring my health, my social life—everything.\n\nAt times, I had no money left for food. I was struggling so much that I had to beg for survival. It was humiliating, but I had no choice.\n\nI hated it. But I refused to quit.\n\nAnd then, the first breakthrough happened.",
      image: "/api/placeholder/600/400",
      readingTime: "3 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "The First Working Prototype",
      content: "After months of relentless work, I finally had something tangible: an online marketplace for Haitian businesses. It was just a starting point, but it proved one thing—\n\nThis wasn't just an idea anymore. It was happening.\n\nAnd I wasn't stopping there.",
      image: "/api/placeholder/600/400",
      readingTime: "2 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "Expanding the Ecosystem",
      content: "One feature at a time, my platform grew:\n✅ A marketplace for Haitian entrepreneurs\n✅ An online learning hub for students and professionals\n✅ A contests platform for artists, musicians, and developers\n✅ A digital wallet for seamless transactions\n\nThis wasn't just an app. It was a movement.\n\nBut I realized something else was needed.",
      image: "/api/placeholder/600/400",
      readingTime: "2 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "The Nonprofit Foundation",
      content: "Building a digital future for Haiti was one thing. But what about those struggling to survive right now?\n\nSo, I launched a nonprofit foundation to help those in need—supporting students, small businesses, and families who, like me, had no safety net.\n\nThis was bigger than me.\n\nBut how was I going to fund it all?",
      image: "/api/placeholder/600/400",
      readingTime: "2 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "Finding Support",
      content: "I started sharing my vision with anyone who would listen—investors, entrepreneurs, even strangers who believed in Haiti's potential. Some saw the vision. Others doubted it.\n\nBut one thing was clear: we weren't waiting for change anymore—we were creating it.\n\nAnd we needed to think even bigger.",
      image: "/api/placeholder/600/400",
      readingTime: "2 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "Building an Agency",
      content: "Through this journey, I had gained something invaluable: mastery in coding.\n\nNow, I wanted to help others bring their ideas to life. So, I decided to launch an agency to help people build their dream websites and apps.\n\nOur portfolio now includes over 30 websites, apps, and real-life projects. But the most prominent ones remain:\n\nThe online marketplace\n\nThe online courses platform\n\nThe contests platform\n\nThe nonprofit foundation\n\nThis wasn't just about money—it was about empowerment.\n\nBut what about my own unfinished education?",
      image: "/api/placeholder/600/400",
      readingTime: "3 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "The University Question",
      content: "Despite everything, I still want to return to university. I will return—but I don't know when.\n\nThe truth is, it doesn't matter if it's soon or later. Education is important, but my return doesn't financially depend on me.\n\nWhen I go back, I'll be doing it on my own terms.\n\nBecause what I'm building now is just as important.",
      image: "/api/placeholder/600/400",
      readingTime: "2 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "A Crossroads—Stay or Escape?",
      content: "At one point, I seriously considered leaving Haiti. Insecurity was rising. Everything felt uncertain.\n\nI looked for opportunities to escape, but a mix of confusion, doubts, and conflicting encouragements left me unsure.\n\nThat's when I made my decision.\n\nI had no choice but to thrive in my home country.\n\nThere was no other way around it—either I built my future here, or I lost everything.\n\nAnd so, I chose to stay.",
      image: "/api/placeholder/600/400",
      readingTime: "2 min"
    },
    {
      title: "The Digital Renaissance of Haiti",
      author: "Haitian Visionary",
      chapter: "The Future of Haiti's Digital Renaissance",
      content: "This was never just about an app. It was about freedom.\n\nHaitians have been held back for too long.\n\nBut now, we're building our own future.\n\nThis platform is more than a business. It's a movement. A revolution. A space where Haitians can thrive—safely, freely, together.\n\nWill you be part of history?",
      image: "/api/placeholder/600/400",
      readingTime: "2 min"
    }
  ];

  useEffect(() => {
    setTotalPages(storyContent.length);
  }, [storyContent]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages && !isPageAnimating) {
      setAnimationDirection('next');
      setIsPageAnimating(true);
      
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        
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
      
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        
        setTimeout(() => {
          setIsPageAnimating(false);
        }, 500);
      }, 500);
    }
  };
  
  const navigateToPage = (pageNumber: number) => {
    if (!isPageAnimating && pageNumber !== currentPage) {
      setAnimationDirection(pageNumber > currentPage ? 'next' : 'prev');
      setIsPageAnimating(true);
      
      setTimeout(() => {
        setCurrentPage(pageNumber);
        setIsShowingChapters(false);
        
        setTimeout(() => {
          setIsPageAnimating(false);
        }, 500);
      }, 500);
    } else {
      setIsShowingChapters(false);
    }
  };
  
  const handleChapterSelect = (chapterId: number) => {
    navigateToPage(chapterId);
  };
  
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleLanguageChange = (language: {name: string, code: string, flag: string}) => {
    setCurrentLanguage(language);
    setLanguageMenuOpen(false);
  };
  
  const handleSetFontSize = (size: number) => {
    setFontSize(size);
  };
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'm';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const openCommentsPanel = () => {
    setIsCommentsPanelOpen(true);
  };

  const closeCommentsPanel = () => {
    setIsCommentsPanelOpen(false);
  };
  
  const progressPercentage = (currentPage / totalPages) * 100;
  
  const currentContent = storyContent[currentPage - 1];
  
  useEffect(() => {
    if (fontSizeControlOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          !e.target ||
          !(e.target as Element).closest('.font-size-control') && 
          !(e.target as Element).closest('.font-size-toggle')
        ) {
          setFontSizeControlOpen(false);
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [fontSizeControlOpen]);
  
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
  
  const getFontSizePercentage = () => {
    const min = fontSizeOptions[0];
    const max = fontSizeOptions[fontSizeOptions.length - 1];
    return ((fontSize - min) / (max - min)) * 100;
  };

  const StorySkeletonLoader = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/3 mx-auto" />
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  );

  const bottomToTopAnimation = `
    @keyframes slideUpIn {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .animate-slide-up-in {
      animation: slideUpIn 0.4s ease-out forwards;
    }
  `;

  return (
    <div className="min-h-screen bg-white text-gray-800 transition-colors duration-300">
      <style>{`
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
        
        @keyframes slideUpIn {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-slide-up-in {
          animation: slideUpIn 0.4s ease-out forwards;
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
      `}</style>
      
      <Sheet open={isShowingChapters} onOpenChange={setIsShowingChapters}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto p-0">
          <BookChapters 
            onSelectChapter={handleChapterSelect} 
            currentChapterId={currentPage}
          />
        </SheetContent>
      </Sheet>
      
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <header className="bg-white transition-colors duration-300">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <button
              onClick={() => setIsShowingChapters(true)} 
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-100 hover:bg-green-200 transition-all duration-200"
            >
              <span className="font-medium">Chapters</span>
              <ChevronDown size={18} />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-pink-100 hover:bg-pink-200 transition-all duration-200"
              >
                <span className="mr-2">{currentLanguage.flag}</span>
                <span>{currentLanguage.name}</span>
                <ChevronDown size={16} className={`transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
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
        
        <div className="w-full h-1 bg-gray-300">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8 pb-32 max-w-3xl relative overflow-hidden pt-[72px]">
        {isLoading ? (
          <StorySkeletonLoader />
        ) : (
          <>
            <div className={`transition-all duration-500 ${getAnimationClasses()}`}>
              {currentPage === 1 && (
                <div className="mb-12 text-center">
                  <h2 className="text-3xl font-bold mb-3">{currentContent.title}</h2>
                  <p className="text-lg text-gray-600">by {currentContent.author}</p>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3 text-center">{currentContent.chapter}</h3>
                <div className="flex items-center text-gray-600 mb-6 justify-center">
                  <Clock size={16} className="mr-2" />
                  <span>Reading time: {currentContent.readingTime}</span>
                </div>
              </div>
              
              <div 
                className="prose max-w-none mb-8 relative" 
                style={{ fontSize: `${fontSize}px` }}
              >
                {currentContent.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="leading-relaxed mb-6 tracking-wide">
                    {paragraph}
                  </p>
                ))}
                
                {currentContent.image && (
                  <div className="my-12 rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={currentContent.image} 
                      alt="Story illustration" 
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {isPageAnimating && (
              <div className={`absolute inset-0 pointer-events-none ${getEnterAnimationClasses()}`}>
                <div className="h-full opacity-0">Transition placeholder</div>
              </div>
            )}
          </>
        )}
      </main>
      
      <div className="fixed bottom-40 right-4 z-30 flex flex-col items-end">
        <button 
          onClick={() => setFontSizeControlOpen(!fontSizeControlOpen)}
          className="font-size-toggle bg-black bg-opacity-70 hover:bg-opacity-80 text-white rounded-full p-3 shadow-lg transition-all duration-200"
        >
          <Type size={20} />
        </button>
      </div>
      
      {fontSizeControlOpen && (
        <div className="fixed bottom-40 left-0 right-0 z-20 flex justify-center">
          <div className="font-size-control mx-4 w-full max-w-xl bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-xl p-4 border border-white border-opacity-30">
            <div className="text-sm font-medium mb-2 text-gray-700 text-center">Text Size</div>
            
            <div className="relative h-12 mb-2">
              <div className="absolute left-8 right-8 top-1/2 h-2 -mt-1 bg-gray-200 rounded-full" />
              
              <div 
                className="absolute left-8 top-1/2 h-2 -mt-1 bg-blue-500 rounded-full"
                style={{ width: `${getFontSizePercentage()}%`, maxWidth: 'calc(100% - 64px)' }}
              />
              
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
            
            <div className="text-sm font-bold text-center text-blue-600">Current: {fontSize}px</div>
          </div>
        </div>
      )}
      
      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-md z-20">
        <div className="w-full px-2 py-3">
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
                onClick={() => setIsShowingChapters(true)}
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
          
          <div className="grid grid-cols-3 gap-2 w-full">
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
            
            <button 
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg w-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-200"
              onClick={openCommentsPanel}
            >
              <MessageCircle size={18} />
              <span className="font-medium">{formatNumber(comments)}</span>
            </button>
            
            <button 
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg w-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-200"
            >
              <Share2 size={18} />
              <span className="font-medium">{formatNumber(shares)}</span>
            </button>
          </div>
        </div>
      </footer>

      <TikTokCommentsPanel 
        isOpen={isCommentsPanelOpen} 
        onClose={closeCommentsPanel} 
      />
    </div>
  );
};

export function StoryMissionsTab() {
  const [isTabLoading, setIsTabLoading] = useState(true);
  
  useEffect(() => {
    setIsTabLoading(true);
    const timer = setTimeout(() => {
      setIsTabLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isTabLoading) {
    return (
      <div className="w-full p-4 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
        
        <Skeleton className="h-1 w-full" />
        
        <div className="space-y-4 pt-4">
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-1/3 mx-auto" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          
          <div className="space-y-3 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          
          <Skeleton className="h-60 w-full rounded-lg mt-6" />
        </div>
        
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t">
          <div className="flex justify-between items-center mb-3">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-24" />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <StoryPage />
    </div>
  );
}

export default StoryPage;
