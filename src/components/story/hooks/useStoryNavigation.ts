
import { useState, useEffect } from 'react';

export function useStoryNavigation(totalPages: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageAnimating, setIsPageAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('next');

  // Add effect to scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
        
        setTimeout(() => {
          setIsPageAnimating(false);
        }, 500);
      }, 500);
    }
  };

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

  return {
    currentPage,
    isPageAnimating,
    animationDirection,
    handleNextPage,
    handlePrevPage,
    navigateToPage,
    getAnimationClasses,
    getEnterAnimationClasses
  };
}
