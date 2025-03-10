
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CommentPanelHeaderProps {
  activeTab: string;
  replyingTo: number | null;
  editingComment: number | null;
  editingReply: { commentId: number, replyId: number } | null;
  showFilterMenu: boolean;
  filter: string;
  setActiveTab: (value: string) => void;
  cancelReply: () => void;
  cancelEdit: () => void;
  setShowFilterMenu: (show: boolean) => void;
  setFilter: (filter: string) => void;
  menuRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

const CommentPanelHeader: React.FC<CommentPanelHeaderProps> = ({
  activeTab,
  replyingTo,
  editingComment,
  editingReply,
  showFilterMenu,
  filter,
  setActiveTab,
  cancelReply,
  cancelEdit,
  setShowFilterMenu,
  setFilter,
  menuRef,
  onClose
}) => {
  if (replyingTo) {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Button 
            variant="ghost"
            size="icon"
            className="h-7 w-7 mr-2"
            onClick={cancelReply}
          >
            <ArrowLeft size={16} />
          </Button>
          <span className="font-medium">Reply</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gray-100"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      </div>
    );
  } else if (editingComment) {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Button 
            variant="ghost"
            size="icon"
            className="h-7 w-7 mr-2"
            onClick={cancelEdit}
          >
            <ArrowLeft size={16} />
          </Button>
          <span className="font-medium">Edit {activeTab === 'testimonials' ? 'Testimonial' : 'Comment'}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gray-100"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      </div>
    );
  } else if (editingReply) {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Button 
            variant="ghost"
            size="icon"
            className="h-7 w-7 mr-2"
            onClick={cancelEdit}
          >
            <ArrowLeft size={16} />
          </Button>
          <span className="font-medium">Edit Reply</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gray-100"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <h3 className="font-medium text-base capitalize">{activeTab}</h3>
          {(activeTab === 'comments' || activeTab === 'testimonials') && (
            <div className="relative ml-4" ref={menuRef}>
              <Button 
                variant="ghost"
                className="flex items-center space-x-1 text-xs text-gray-500 hover:text-black p-1 h-7"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
              >
                <span>
                  {filter === 'all' ? 'All' : 
                  filter === 'verified' ? 'Verified' : 
                  filter === 'liked' ? 'Liked' : 'Donations'}
                </span>
                <ChevronDown size={14} />
              </Button>
              
              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <ul>
                    <li 
                      className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs"
                      onClick={() => { setFilter('all'); setShowFilterMenu(false); }}
                    >
                      All {activeTab}
                    </li>
                    <li 
                      className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs"
                      onClick={() => { setFilter('verified'); setShowFilterMenu(false); }}
                    >
                      Verified only
                    </li>
                    <li 
                      className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs"
                      onClick={() => { setFilter('liked'); setShowFilterMenu(false); }}
                    >
                      Liked by me
                    </li>
                    <li 
                      className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-xs"
                      onClick={() => { setFilter('donations'); setShowFilterMenu(false); }}
                    >
                      Donations
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gray-100"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      </div>
    );
  }
};

export default CommentPanelHeader;
