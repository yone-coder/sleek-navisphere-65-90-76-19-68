import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import BookChapters from '@/components/story/BookChapters';
import TikTokCommentsPanel from '@/components/comments/TikTokCommentsPanel';
import { storyContent } from './storyContent';
import { StoryHeader } from './StoryHeader';
import { StoryContent } from './StoryContent';
import { StoryFooter } from './StoryFooter';
import { StoryFontSizeControl } from './StoryFontSizeControl';
import { StorySkeletonLoader } from './StorySkeletonLoader';
import { StoryAnimations } from './StoryAnimations';
import { useStoryNavigation } from './hooks/useStoryNavigation';
import { useStoryInteractions } from './hooks/useStoryInteractions';
import { useStorySettings } from './hooks/useStorySettings';

const StoryPage = () => {
  const [isShowingChapters, setIsShowingChapters] = useState(false);
  const [totalPages, setTotalPages] = useState(15);
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    currentPage,
    isPageAnimating,
    handleNextPage,
    handlePrevPage,
    navigateToPage,
    getAnimationClasses,
    getEnterAnimationClasses
  } = useStoryNavigation(totalPages);
  
  const {
    likes,
    comments,
    shares,
    liked,
    isCommentsPanelOpen,
    handleLike,
    openCommentsPanel,
    closeCommentsPanel,
    formatNumber
  } = useStoryInteractions();
  
  const {
    fontSize,
    fontSizeControlOpen,
    setFontSizeControlOpen,
    fontSizeOptions,
    handleSetFontSize,
    getFontSizePercentage,
    languageMenuOpen,
    setLanguageMenuOpen,
    currentLanguage,
    languages,
    handleLanguageChange
  } = useStorySettings();

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
  
  const handleChapterSelect = (chapterId: number) => {
    navigateToPage(chapterId);
    setIsShowingChapters(false);
  };
  
  const progressPercentage = (currentPage / totalPages) * 100;
  
  const currentContent = storyContent[currentPage - 1];
  
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
      <StoryAnimations />
      
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
        currentPage={currentPage}
        chapterTitle={currentContent.chapter}
      />
      
      <main className="container mx-auto px-4 py-8 pb-32 max-w-3xl relative overflow-hidden">
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
