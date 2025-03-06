
import React from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Share2 } from 'lucide-react';

type StoryFooterProps = {
  currentPage: number;
  totalPages: number;
  isPageAnimating: boolean;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  setIsShowingChapters: (value: boolean) => void;
  liked: boolean;
  likes: number;
  comments: number;
  shares: number;
  handleLike: () => void;
  openCommentsPanel: () => void;
  formatNumber: (num: number) => string;
};

export function StoryFooter({
  currentPage,
  totalPages,
  isPageAnimating,
  handlePrevPage,
  handleNextPage,
  setIsShowingChapters,
  liked,
  likes,
  comments,
  shares,
  handleLike,
  openCommentsPanel,
  formatNumber
}: StoryFooterProps) {
  return (
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
  );
}
