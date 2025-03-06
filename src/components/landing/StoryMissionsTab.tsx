
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
      id: 1,
      title: "The Lost Artifact",
      author: "J.K. Rowling",
      chapter: "Chapter 1: The Mysterious Letter",
      content: "The morning sun filtered through the dusty blinds of Professor Harrington's office as he carefully unfolded the yellowed parchment. His hands trembled slightly—not from age, though he had seen sixty winters come and go—but from anticipation.\n\nThe letter had arrived in a peculiar fashion: delivered not by post, but discovered within the hollow of an ancient book he had purchased at an estate sale last weekend. The tome itself was unremarkable, a tattered collection of folkloric stories from the Carpathian Mountains, but the letter... the letter changed everything.\n\n\"Dear colleague,\" it began in faded ink, the handwriting precise yet somehow urgent. \"If you are reading this, then my fears have been realized, and I have not survived my expedition. The artifact is real, and far more dangerous than we imagined...\"\n\nThe professor adjusted his spectacles and leaned closer to the text, his academic curiosity fully awakened. According to the letter, an artifact of immense power had been discovered in a remote village in Eastern Europe—an object thought to be merely legend, a footnote in obscure medieval texts.\n\nHarrington reached for his phone, then hesitated. Who could he trust with this information? The letter explicitly warned against involving others, particularly anyone connected to the Herington Institute, where he had dedicated his academic career to the study of mythological objects and their historical significance.",
      readingTime: "5 min",
      image: "/api/placeholder/800/500"
    },
    {
      id: 2,
      title: "The Lost Artifact",
      author: "J.K. Rowling",
      chapter: "Chapter 2: The Decision",
      content: "Professor Harrington spent the entire day in his office, door locked, phone off, surrounded by open books and hastily scribbled notes. The letter had included coordinates—a remote location in the Carpathian Mountains—and a series of cryptic instructions.\n\n\"The artifact must be secured before the summer solstice,\" the letter had warned. \"After that, containment may become impossible.\"\n\nThe summer solstice was just two weeks away.\n\nHarrington ran a hand through his silver hair, his mind racing with possibilities. He was an academic, not an adventurer. His expeditions had been limited to well-funded archaeological digs with proper permissions and safety measures. This... this was madness.\n\nYet he couldn't ignore the letter. If the artifact truly existed, and if it was as dangerous as his mysterious correspondent claimed, the implications were staggering.\n\nHe made his decision as the sun was setting, casting long shadows across his cluttered office. He would go. He had enough savings for a plane ticket and basic supplies. He could request an emergency leave of absence—family matters, he would say.\n\nHarrington began to pack his most essential books and notes, his heart pounding with a mixture of fear and exhilaration he hadn't felt in decades. At sixty, he had thought his days of discovery were behind him, replaced by the comfortable routine of teaching and occasional publishing.\n\nHow wrong he had been.",
      readingTime: "6 min",
      image: null
    },
    {
      id: 3,
      title: "The Lost Artifact",
      author: "J.K. Rowling",
      chapter: "Chapter 3: The Journey Begins",
      content: "The small regional airport buzzed with activity as Professor Harrington checked his worn leather suitcase. He had packed light: a few changes of clothes, essential toiletries, his most relevant reference books, and the mysterious letter safely tucked into his inner jacket pocket.\n\n\"Purpose of your visit?\" asked the young woman at the check-in counter, not looking up from her computer.\n\n\"Academic research,\" Harrington replied, the half-truth coming easily to his lips. He had indeed published several papers on Eastern European folklore—his presence in the region would raise no eyebrows if anyone from the university happened to check.\n\nAs he settled into his seat on the small aircraft that would take him to Bucharest, Harrington's thoughts turned to the letter's author, Dr. Eleanor Webb. He had met her only once, at a conference in Vienna three years ago. She had been presenting a controversial paper on artifacts described in folklore that might have actual historical origins. The academic community had been skeptical, some openly dismissive. Harrington had been one of the few to approach her afterward with genuine interest rather than criticism.\n\nHad that single conversation been enough for her to trust him with this discovery? Or was he simply the last resort, a final hope to complete what she had started?\n\nThe aircraft rumbled down the runway, and Harrington felt a surge of doubt. At his age, with his comfortable position at the university, why risk everything on what might be a wild goose chase? Or worse—what if the artifact was real, but the danger was too?\n\nToo late for second thoughts now. The plane lifted off, banking toward the east, toward mountains that held secrets waiting to be uncovered.\n\nHarrington closed his eyes, not to sleep but to think. If the artifact was real, finding it would rewrite history. If the danger was real... well, he would cross that bridge when he came to it.",
      readingTime: "7 min",
      image: "/api/placeholder/800/500"
    },
    {
      id: 4,
      title: "The Lost Artifact",
      author: "J.K. Rowling",
      chapter: "Chapter 4: Arrival in Bucharest",
      content: "Bucharest greeted Professor Harrington with a relentless downpour. Rain cascaded from leaden skies as he navigated the bustling airport, his collar turned up against the damp chill that seemed to permeate everything.\n\nHe had arranged for a modest hotel room in the older part of the city, a place where questions wouldn't be asked and privacy would be respected. The taxi driver spoke little English but seemed to understand the address Harrington showed him on his phone.\n\nAs they drove through the rain-slicked streets, Harrington observed the curious blend of architectural styles that defined the Romanian capital—ornate Belle Époque buildings alongside stark Communist-era apartments, all beneath the shadow of more modern glass structures reaching toward the stormy sky.\n\n\"First time Romania?\" the driver asked, eyes meeting Harrington's in the rearview mirror.\n\n\"Yes,\" Harrington replied, deciding that simplicity was safer than elaboration.\n\nThe driver nodded. \"Beautiful country. Not just Bucharest. Mountains, forests...\" He made a sweeping gesture with one hand while expertly navigating a roundabout with the other. \"Why you come?\"\n\n\"I'm researching local folklore,\" Harrington said, the practiced explanation rolling off his tongue. \"Specifically from the Carpathian region.\"\n\nThe driver's eyes narrowed slightly, his expression shifting in a way Harrington couldn't quite interpret. \"Carpathians have many stories. Some better not to find.\"\n\nThe professor leaned forward slightly. \"What do you mean by that?\"\n\nBut the driver simply shrugged and turned up the radio, a clear signal that the conversation was over.\n\nHarrington settled back, watching raindrops race across the window, each absorbing others in their path as they descended. The driver's reaction troubled him. It suggested that even here, in the modern capital, old superstitions retained their power.\n\nThe taxi pulled up in front of a narrow building wedged between a small café and what appeared to be an antique shop. The Hotel Carpați was hardly impressive from the outside—just a weather-worn sign and a green door—but it would serve his purposes.\n\nHarrington paid the driver, adding a generous tip in hope of rekindling the conversation, but the man simply nodded his thanks and pulled away into the curtain of rain as soon as the professor had retrieved his suitcase.\n\nStanding in the downpour, looking up at his temporary lodging, Harrington felt a curious sensation—not quite fear, but a preternatural awareness that he had crossed some threshold. The familiar world of university halls and academic conferences seemed very far away indeed.",
      readingTime: "8 min",
      image: null
    },
    {
      id: 5,
      title: "The Lost Artifact",
      author: "J.K. Rowling",
      chapter: "Chapter 5: The Unexpected Visitor",
      content: "Professor Harrington spent his first day in Bucharest recovering from jet lag and organizing his research materials. His hotel room was small but clean, with a narrow bed, a worn desk, and a window overlooking a cobblestone courtyard. The rain continued unabated, drumming against the windowpane like impatient fingers.\n\nBy evening, he had established a makeshift workstation on the desk, his notes carefully arranged beside his laptop. The letter he kept in the inner pocket of his jacket, which hung on the back of the chair. The coordinates pointed to a location about 200 kilometers north, in a sparsely populated area of the Carpathian Mountains. According to his research, the nearest village was a small settlement called Valea Umbrelor—the Valley of Shadows, an ominously poetic name that did little to settle his nerves.\n\nHarrington was plotting his route on a detailed map when a knock came at his door.\n\nHe froze, instantly alert. He had spoken to no one since checking in, had given this address to no one back home. The knock came again, more insistent this time.\n\nSlowly, Harrington moved to the door. \"Who is it?\" he called, trying to keep his voice steady.\n\n\"Professor Harrington?\" A woman's voice, accented but her English clear. \"My name is Mirela Vasile. I need to speak with you about Dr. Webb.\"\n\nHarrington's breath caught. He hadn't mentioned Eleanor Webb to anyone. He hesitated, then unlatched the door, opening it just enough to see the visitor while keeping his foot wedged against the bottom.\n\nThe woman in the hallway was in her thirties, with dark hair pulled back in a practical ponytail and sharp, intelligent eyes that assessed him just as he was assessing her. She wore a practical raincoat, still beaded with moisture, and carried a leather messenger bag slung across her body.\n\n\"How do you know about Dr. Webb?\" Harrington demanded. \"And how did you find me?\"\n\n\"May I come in?\" She glanced down the empty hallway. \"It's not safe to talk here.\"\n\nAgainst his better judgment, Harrington stepped back, allowing her to enter. He did not close the door completely.\n\n\"I was Eleanor's research assistant,\" the woman said without preamble. \"For her final expedition. She told me if anything happened to her, I should watch for someone following her trail.\" She fixed him with a direct stare. \"When the university database showed someone accessing her old research notes, I tracked the IP address. Then I called hotels near the airport until I found one with an American professor checking in today.\"\n\nHarrington was impressed despite his suspicion. \"That still doesn't explain how you knew about me specifically.\"\n\nMirela reached into her bag and withdrew a small notebook with a weathered cover. \"Because Eleanor left instructions.\" She opened it to a page marked with a red ribbon and handed it to him. \"Read this.\"\n\nHarrington took the notebook, his hands not quite steady. There, in the same precise handwriting as the letter, was his name.",
      readingTime: "9 min",
      image: "/api/placeholder/800/500"
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
      
      <div className="fixed top-[60px] left-0 right-0 bg-white shadow-md z-20 border-t border-gray-100">
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
      
      <main className="container mx-auto px-4 py-8 pb-32 max-w-3xl relative overflow-hidden pt-[120px]">
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
