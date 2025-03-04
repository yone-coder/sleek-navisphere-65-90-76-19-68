
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Heart, MoreVertical, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import TikTokCommentsPanel from '../comments/TikTokCommentsPanel';

export function CommentsTab() {
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);

  const openCommentsPanel = () => {
    setIsCommentsPanelOpen(true);
  };

  const closeCommentsPanel = () => {
    setIsCommentsPanelOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex gap-4 mb-8 sticky top-0 bg-white/95 backdrop-blur-sm p-4 -mx-4 z-30">
        <div className="flex-1">
          <Textarea 
            className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm h-[80px]"
            placeholder="Add a comment..."
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <Button size="sm">Post</Button>
          </div>
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

      {/* TikTokCommentsPanel with fixed z-index to appear above all content */}
      <TikTokCommentsPanel
        isOpen={isCommentsPanelOpen}
        onClose={closeCommentsPanel}
      />
    </div>
  );
}
