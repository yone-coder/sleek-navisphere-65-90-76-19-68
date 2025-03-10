
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Heart, MoreVertical, MessageCircle, SmilePlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import TikTokCommentsPanel from '../comments/TikTokCommentsPanel';

export function CommentsTab() {
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  const openCommentsPanel = () => {
    setIsCommentsPanelOpen(true);
  };

  const closeCommentsPanel = () => {
    setIsCommentsPanelOpen(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    // Handle comment submission
    setCommentText('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex gap-4 mb-8 sticky top-0 bg-transparent backdrop-blur-sm p-4 -mx-4 z-30">
        <div className="flex-1">
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 pr-2 rounded-full bg-gray-100 overflow-hidden">
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent resize-none min-h-0 h-10 py-2.5 px-4"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-gray-200"
              >
                <SmilePlus className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
            <Button
              type="submit"
              size="icon"
              className={`rounded-full ${commentText.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 text-gray-500'}`}
              disabled={!commentText.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </Button>
          </form>
        </div>
      </div>

      <div className="space-y-6 px-4 pb-20">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <motion.div 
            key={i} 
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Avatar className="h-9 w-9">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="user avatar" />
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium">User Name</h4>
                  <p className="text-sm text-gray-600 mt-1">This project looks amazing! Can't wait to see it come to life.</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span>2d ago</span>
                <button className="flex items-center gap-1 hover:text-gray-700">
                  <Heart className="h-4 w-4" />
                  <span>24</span>
                </button>
                <button 
                  className="hover:text-gray-700 flex items-center gap-1"
                  onClick={openCommentsPanel}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <TikTokCommentsPanel
        isOpen={isCommentsPanelOpen}
        onClose={closeCommentsPanel}
      />
    </div>
  );
}
