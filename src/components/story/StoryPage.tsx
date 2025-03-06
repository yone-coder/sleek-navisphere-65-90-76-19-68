import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, MessageCircle, Share2, Type } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import BookChapters from '@/components/story/BookChapters';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import TikTokCommentsPanel from '@/components/comments/TikTokCommentsPanel';
import { storyContent } from './storyContent';
import { StoryHeader } from './StoryHeader';
import { StoryContent } from './StoryContent';
import { StoryFooter } from './StoryFooter';
import { StoryFontSizeControl } from './StoryFontSizeControl';
import { StorySkeletonLoader } from './StorySkeletonLoader';

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNextPage();
    } else if (e.key === 'ArrowLeft') {
      handlePrevPage();
    }
  };

  return (
    <div 
      className="min-h-screen bg-white text-gray-800 transition-colors duration-300"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
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
      
      <StoryHeader 
        isShowingChapters={isShowingChapters}
        setIsShowingChapters={setIsShowingChapters}
        currentLanguage={currentLanguage}
        languageMenuOpen={languageMenuOpen}
        setLanguageMenuOpen={setLanguageMenuOpen}
        handleLanguageChange={handleLanguageChange}
        languages={languages}
        progressPercentage={progressPercentage}
      />
      
      <main className="container mx-auto px-4 py-8 pb-32 max-w-3xl relative overflow-hidden pt-[132px]">
        {isLoading ? (
          <StorySkeletonLoader />
        ) : (
          <StoryContent 
            currentContent={currentContent}
            currentPage={currentPage}
            fontSize={fontSize}
            getAnimationClasses={getAnimationClasses}
            getEnterAnimationClasses={getEnterAnimationClasses}
            isPageAnimating={isPageAnimating}
          />
        )}
      </main>
      
      <StoryFontSizeControl 
        fontSizeControlOpen={fontSizeControlOpen}
        setFontSizeControlOpen={setFontSizeControlOpen}
        fontSizeOptions={fontSizeOptions}
        fontSize={fontSize}
        handleSetFontSize={handleSetFontSize}
        getFontSizePercentage={getFontSizePercentage}
      />
      
      <StoryFooter 
        currentPage={currentPage}
        totalPages={totalPages}
        isPageAnimating={isPageAnimating}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        setIsShowingChapters={setIsShowingChapters}
        liked={liked}
        likes={likes}
        comments={comments}
        shares={shares}
        handleLike={handleLike}
        openCommentsPanel={openCommentsPanel}
        formatNumber={formatNumber}
      />

      <TikTokCommentsPanel 
        isOpen={isCommentsPanelOpen} 
        onClose={closeCommentsPanel} 
      />
    </div>
  );
};

export default StoryPage;
