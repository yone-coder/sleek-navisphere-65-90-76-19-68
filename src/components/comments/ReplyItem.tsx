
import React from 'react';
import { Heart, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Comment, Reply } from './types';

interface ReplyItemProps {
  reply: Reply;
  comment: Comment;
  replyMenuOpen: number | null;
  editingReply: { commentId: number, replyId: number } | null;
  isEditing: boolean;
  commentText: string;
  commentId: number;
  menuRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  isOwnContent: (userId?: string) => boolean;
  setReplyMenuOpen: (id: number | null) => void;
  toggleLike: (id: number, isReply: boolean, parentId: number | null) => void;
  deleteReply: (commentId: number, replyId: number) => void;
  startEditReply: (commentId: number, reply: Reply) => void;
  setCommentText: (text: string) => void;
  cancelEdit: () => void;
  saveEditReply: () => void;
}

const ReplyItem: React.FC<ReplyItemProps> = ({
  reply,
  comment,
  replyMenuOpen,
  editingReply,
  isEditing,
  commentText,
  commentId,
  menuRef,
  inputRef,
  isOwnContent,
  setReplyMenuOpen,
  toggleLike,
  deleteReply,
  startEditReply,
  setCommentText,
  cancelEdit,
  saveEditReply
}) => {
  return (
    <div key={reply.id} className="flex space-x-3">
      <div className={`w-8 h-8 rounded-full ${
        reply.username === '@creator' 
          ? 'bg-gradient-to-br from-red-500 to-pink-600' 
          : reply.username === '@me' || isOwnContent(reply.userId)
            ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
            : 'bg-gradient-to-br from-purple-400 to-pink-500'
        } flex-shrink-0 flex items-center justify-center`}>
        <span className="text-xs font-bold text-white">
          {reply.username.startsWith('@') 
            ? reply.username.substring(1, 3).toUpperCase() 
            : reply.username.substring(0, 2).toUpperCase()}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h4 className="font-medium text-sm">{reply.username}</h4>
            {reply.verified && (
              <span className="inline-block rounded-full bg-blue-500 p-0.5 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            )}
            <span className="text-xs text-gray-500">{reply.timestamp}</span>
          </div>
          
          {(isOwnContent(reply.userId) || reply.username === '@me') && (
            <div className="relative">
              <Button 
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setReplyMenuOpen(replyMenuOpen === reply.id ? null : reply.id)}
              >
                <MoreHorizontal size={14} />
              </Button>
              
              {replyMenuOpen === reply.id && (
                <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <ul>
                    <li 
                      className="px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => startEditReply(comment.id, reply)}
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </li>
                    <li 
                      className="px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer text-red-500"
                      onClick={() => deleteReply(comment.id, reply.id)}
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        
        {editingReply && editingReply.replyId === reply.id ? (
          <div className="mt-1">
            <Input
              ref={inputRef}
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full bg-gray-100 text-sm"
            />
            <div className="flex justify-end space-x-2 mt-2">
              <Button 
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-gray-500 hover:text-black font-medium"
                onClick={cancelEdit}
              >
                Cancel
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-pink-500 font-medium"
                onClick={saveEditReply}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm mt-1">{reply.text}</p>
        )}
        
        <div className="mt-2">
          <Button 
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-xs text-gray-500 h-6 px-1"
            onClick={() => toggleLike(reply.id, true, commentId)}
          >
            <Heart size={12} fill={reply.isLiked ? "#ff2d55" : "none"} stroke={reply.isLiked ? "#ff2d55" : "currentColor"} />
            <span className={reply.isLiked ? "text-pink-500" : ""}>{reply.likes}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReplyItem;
