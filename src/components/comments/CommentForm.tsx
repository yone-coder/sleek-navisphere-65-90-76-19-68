
import React, { FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, SmilePlus, ArrowLeft } from 'lucide-react';

interface CommentFormProps {
  commentText: string;
  setCommentText: (text: string) => void;
  handleCommentSubmit: (e: FormEvent) => void;
  replyingTo: number | null;
  editingComment: number | null;
  editingReply: { commentId: number, replyId: number } | null;
  cancelReply: () => void;
  cancelEdit: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isSubmitting?: boolean;
  isAuthenticated?: boolean;
  onFocus?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  commentText,
  setCommentText,
  handleCommentSubmit,
  replyingTo,
  editingComment,
  editingReply,
  cancelReply,
  cancelEdit,
  inputRef,
  isSubmitting = false,
  isAuthenticated = false,
  onFocus
}) => {
  const getPlaceholderText = () => {
    if (replyingTo) {
      return "Add a reply...";
    } else if (editingComment || editingReply) {
      return "Edit your message...";
    } else {
      return "Add a comment...";
    }
  };

  const handleInputFocus = () => {
    if (!isAuthenticated && onFocus) {
      onFocus();
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className="flex space-x-2 items-center w-full">
      {(replyingTo || editingComment || editingReply) && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={replyingTo ? cancelReply : cancelEdit}
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </Button>
      )}
      <Input
        ref={inputRef}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onFocus={handleInputFocus}
        placeholder={getPlaceholderText()}
        className="flex-grow rounded-full bg-gray-100 border-0 focus:ring-1 focus:ring-pink-500 py-6 px-4 text-base"
        autoFocus={replyingTo !== null || editingComment !== null || editingReply !== null}
      />
      <Button 
        type="button" 
        variant="ghost"
        size="icon"
        className="rounded-full"
      >
        <SmilePlus size={18} className="text-gray-500" />
      </Button>
      <Button 
        type="submit" 
        disabled={!commentText.trim() || isSubmitting}
        className={`rounded-full px-3 aspect-square ${
          commentText.trim() 
            ? "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700" 
            : "bg-muted text-muted-foreground"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Send size={18} className="text-white" />
      </Button>
    </form>
  );
};

export default CommentForm;
