
import React from 'react';
import CommentItem from './CommentItem';
import { Comment } from './types';

interface CommentsListProps {
  comments: Comment[];
  activeTab: string;
  editingComment: number | null;
  commentMenuOpen: number | null;
  commentText: string;
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

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  activeTab,
  editingComment,
  commentMenuOpen,
  commentText,
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
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32">
        <p className="text-sm text-gray-500">
          No {activeTab} to display.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isEditing={editingComment === comment.id}
          commentText={commentText}
          commentMenuOpen={commentMenuOpen}
          activeTab={activeTab}
          menuRef={menuRef}
          inputRef={inputRef}
          isOwnContent={isOwnContent}
          setCommentMenuOpen={setCommentMenuOpen}
          setCommentText={setCommentText}
          toggleLike={toggleLike}
          startReply={startReply}
          cancelEdit={cancelEdit}
          saveEditComment={saveEditComment}
          startEditComment={startEditComment}
          deleteComment={deleteComment}
          pinComment={pinComment}
        />
      ))}
    </div>
  );
};

export default CommentsList;
