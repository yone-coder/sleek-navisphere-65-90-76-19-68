
import React, { useState, useRef } from 'react';
import { X, Heart, Send, SmilePlus } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ModishCommentPanelProps {
  onClose: () => void;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  replies?: Comment[];
}

const ModishCommentPanel: React.FC<ModishCommentPanelProps> = ({ onClose }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Jessica",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
      content: "The design is incredible, loving the ergonomic shape!",
      timestamp: "2h ago",
      likes: 24,
      liked: false,
      replies: [
        {
          id: 5,
          author: "Mark",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark",
          content: "Agreed! The back support is amazing.",
          timestamp: "1h ago",
          likes: 7,
          liked: false,
        }
      ]
    },
    {
      id: 2,
      author: "Michael",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      content: "Just got mine delivered, the quality is even better than expected!",
      timestamp: "5h ago",
      likes: 43,
      liked: true,
    },
    {
      id: 3,
      author: "Sarah",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content: "Does anyone know if the cream color gets dirty easily?",
      timestamp: "1d ago",
      likes: 12,
      liked: false,
      replies: [
        {
          id: 6,
          author: "Thomas",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
          content: "I've had mine for a month, still looks great!",
          timestamp: "23h ago",
          likes: 15,
          liked: false,
        }
      ]
    },
    {
      id: 4,
      author: "Emma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      content: "The walnut frame matches perfectly with my desk!",
      timestamp: "2d ago",
      likes: 19,
      liked: false,
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleLikeComment = (commentId: number, isReply: boolean = false, parentId?: number) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (!isReply && comment.id === commentId) {
          return { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 };
        } else if (isReply && parentId && comment.id === parentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply.id === commentId 
                ? { ...reply, liked: !reply.liked, likes: reply.liked ? reply.likes - 1 : reply.likes + 1 }
                : reply
            )
          };
        }
        return comment;
      })
    );
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: Date.now(),
      author: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      liked: false
    };
    
    setComments(prev => [newCommentObj, ...prev]);
    setNewComment('');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between p-4">
          <div className="text-lg font-semibold">{comments.length} comments</div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="w-9 h-9 flex-shrink-0">
                <img src={comment.avatar} alt={comment.author} />
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{comment.author}</div>
                <div className="text-sm mt-1">{comment.content}</div>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>{comment.timestamp}</span>
                  <button 
                    className="text-xs hover:text-gray-700"
                    onClick={() => inputRef.current?.focus()}
                  >
                    Reply
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => handleLikeComment(comment.id)}
                className="flex flex-col items-center ml-2"
              >
                <Heart 
                  className={cn(
                    "w-4 h-4", 
                    comment.liked ? "fill-red-500 text-red-500" : "text-gray-400"
                  )} 
                />
                <span className="text-xs mt-1 text-gray-500">{comment.likes}</span>
              </button>
            </div>
            
            {/* Comment replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-12 space-y-3">
                {comment.replies.map(reply => (
                  <div key={reply.id} className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <img src={reply.avatar} alt={reply.author} />
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{reply.author}</div>
                      <div className="text-sm mt-1">{reply.content}</div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>{reply.timestamp}</span>
                        <button 
                          className="text-xs hover:text-gray-700"
                          onClick={() => inputRef.current?.focus()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleLikeComment(reply.id, true, comment.id)}
                      className="flex flex-col items-center ml-2"
                    >
                      <Heart 
                        className={cn(
                          "w-4 h-4", 
                          reply.liked ? "fill-red-500 text-red-500" : "text-gray-400"
                        )} 
                      />
                      <span className="text-xs mt-1 text-gray-500">{reply.likes}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Comment input */}
      <div className="sticky bottom-0 border-t border-gray-100 bg-white p-3">
        <form onSubmit={handleAddComment} className="flex items-center gap-2">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="You" />
          </Avatar>
          
          <div className="flex-1 flex items-center bg-gray-100 rounded-full overflow-hidden pr-2">
            <Input
              ref={inputRef}
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="border-0 focus-visible:ring-0 bg-transparent flex-1"
            />
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
            >
              <SmilePlus className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
          
          <Button
            type="submit"
            size="icon"
            disabled={!newComment.trim()}
            className={cn(
              "rounded-full h-10 w-10",
              newComment.trim() 
                ? "bg-blue-500 hover:bg-blue-600" 
                : "bg-gray-200 text-gray-400"
            )}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModishCommentPanel;
