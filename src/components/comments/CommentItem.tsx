
import React from 'react';
import { Heart, MessageCircle, MoreHorizontal, Trash2, Edit, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Comment, Reply } from './types';
import ReplyItem from './ReplyItem';

interface CommentItemProps {
  comment: Comment;
  isEditing: boolean;
  commentText: string;
  commentMenuOpen: number | null;
  activeTab: string;
  menuRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  isOwnContent: (userId?: string) => boolean;
  setCommentMenuOpen: (id: number | null) => void;
  setCommentText: (text: string) => void;
  toggleLike: (id: number, isReply?: boolean, parentId?: number | null) => void;
  startReply: (id: number) => void;
  cancelEdit: () => void;
  saveEditComment: () => void;
  startEditComment: (comment: Comment) => void;
  deleteComment: (id: number) => void;
  pinComment: (id: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  isEditing,
  commentText,
  commentMenuOpen,
  activeTab,
  menuRef,
  inputRef,
  isOwnContent,
  setCommentMenuOpen,
  setCommentText,
  toggleLike,
  startReply,
  cancelEdit,
  saveEditComment,
  startEditComment,
  deleteComment,
  pinComment
}) => {
  // State for reply menu and editing replies
  const [replyMenuOpen, setReplyMenuOpen] = React.useState<number | null>(null);
  const [editingReply, setEditingReply] = React.useState<{ commentId: number, replyId: number } | null>(null);

  // Start editing a reply
  const handleStartEditReply = (commentId: number, reply: Reply) => {
    setEditingReply({ commentId, replyId: reply.id });
    setCommentText(reply.text);
    setReplyMenuOpen(null);
  };

  // Save an edited reply
  const handleSaveEditReply = () => {
    if (editingReply) {
      // The parent component handles the actual saving
      saveEditComment();
      setEditingReply(null);
    }
  };

  // Delete a reply
  const handleDeleteReply = (commentId: number, replyId: number) => {
    deleteComment(replyId);
    setReplyMenuOpen(null);
  };

  return (
    <div className="space-y-4">
      <div className={`flex space-x-3 relative ${comment.pinned ? "p-3 border border-gray-200 rounded-lg bg-pink-50 bg-opacity-10" : ""}`}>
        {comment.pinned && (
          <div className="absolute top-0 left-0 px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full transform -translate-y-1/2">
            Pinned
          </div>
        )}
        <div className={`w-10 h-10 rounded-full ${
          comment.username === '@creator' 
            ? 'bg-gradient-to-br from-red-500 to-pink-600' 
            : comment.username === '@me' || isOwnContent(comment.userId)
              ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
              : 'bg-gradient-to-br from-purple-400 to-pink-500'
          } flex-shrink-0 flex items-center justify-center`}>
          <span className="text-xs font-bold text-white">
            {comment.username.startsWith('@') 
              ? comment.username.substring(1, 3).toUpperCase() 
              : comment.username.substring(0, 2).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-sm">{comment.username}</h4>
              {comment.verified && (
                <span className="inline-block rounded-full bg-blue-500 p-0.5 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              )}
              {comment.donation && (
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  ${comment.donation}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{comment.timestamp}</span>
              
              <div className="relative">
                <Button 
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setCommentMenuOpen(commentMenuOpen === comment.id ? null : comment.id)}
                >
                  <MoreHorizontal size={14} />
                </Button>
                
                {commentMenuOpen === comment.id && (
                  <div ref={menuRef} className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <ul>
                      {(isOwnContent(comment.userId) || comment.username === '@me') && (
                        <>
                          <li 
                            className="px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => startEditComment(comment)}
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </li>
                          <li 
                            className="px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer text-red-500"
                            onClick={() => deleteComment(comment.id)}
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </li>
                        </>
                      )}
                      {(comment.username === '@creator' || isOwnContent(comment.userId)) && (
                        <li 
                          className="px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => pinComment(comment.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M18 11H6M4 7h16"/>
                          </svg>
                          <span>{comment.pinned ? 'Unpin' : 'Pin'}</span>
                        </li>
                      )}
                      <li 
                        className="px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <Flag size={14} />
                        <span>Report</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {isEditing ? (
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
                  onClick={saveEditComment}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm mt-1">{comment.text}</p>
          )}
          
          <div className="mt-2 flex space-x-4">
            <Button 
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-xs text-gray-500 h-6 px-1"
              onClick={() => toggleLike(comment.id)}
            >
              <Heart size={14} fill={comment.isLiked ? "#ff2d55" : "none"} stroke={comment.isLiked ? "#ff2d55" : "currentColor"} />
              <span className={comment.isLiked ? "text-pink-500" : ""}>{comment.likes}</span>
            </Button>
            
            <Button 
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1 text-xs text-gray-500 h-6 px-1"
              onClick={() => startReply(comment.id)}
            >
              <MessageCircle size={14} />
              <span>{(comment.replies?.length || 0) > 0 ? comment.replies.length : "Reply"}</span>
            </Button>
          </div>
          
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 pl-4 border-l-2 border-gray-100 space-y-3">
              {comment.replies.map(reply => (
                <ReplyItem 
                  key={reply.id}
                  reply={reply}
                  comment={comment}
                  replyMenuOpen={replyMenuOpen}
                  editingReply={editingReply}
                  isEditing={editingReply?.replyId === reply.id}
                  commentText={commentText}
                  commentId={comment.id}
                  menuRef={menuRef}
                  inputRef={inputRef}
                  isOwnContent={isOwnContent}
                  setReplyMenuOpen={setReplyMenuOpen}
                  toggleLike={toggleLike}
                  deleteReply={handleDeleteReply}
                  startEditReply={handleStartEditReply}
                  setCommentText={setCommentText}
                  cancelEdit={cancelEdit}
                  saveEditReply={handleSaveEditReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
