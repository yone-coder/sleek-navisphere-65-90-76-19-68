
import React, { useState, useRef, useEffect } from 'react';
import { Heart, X, Send, Flag, ChevronDown, MoreHorizontal, Trash2, Edit, MessageCircle, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CommentAuthModal from './CommentAuthModal';
import { toast } from "@/hooks/use-toast";

interface Reply {
  id: number;
  username: string;
  text: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
  verified: boolean;
  userId?: string; // Add userId for permission checking
}

interface Comment {
  id: number;
  username: string;
  text: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
  verified: boolean;
  pinned: boolean;
  donation?: number;
  replies: Reply[];
  userId?: string; // Add userId for permission checking
}

interface TikTokCommentsPanelProps {
  onClose: () => void;
  isOpen: boolean;
}

const TikTokCommentsPanel: React.FC<TikTokCommentsPanelProps> = ({ onClose, isOpen }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, username: '@user1', text: 'This is amazing! 🔥', likes: 342, isLiked: false, timestamp: '2d', verified: true, pinned: false, donation: 5, replies: [], userId: 'user1' },
    { id: 2, username: '@user2', text: 'I need to try this ASAP 😍', likes: 128, isLiked: false, timestamp: '1d', verified: false, pinned: false, replies: [], userId: 'user2' },
    { id: 3, username: '@user3', text: 'Nice content as always!', likes: 86, isLiked: false, timestamp: '5h', verified: false, pinned: false, donation: 20, replies: [], userId: 'user3' },
    { id: 4, username: '@creator', text: 'Thank you all for watching! New video coming tomorrow 🎬', likes: 954, isLiked: true, timestamp: '6h', verified: true, pinned: true, replies: [], userId: 'creator' },
    { id: 5, username: '@techguru', text: 'The transition at 0:24 is so smooth. What editing software did you use?', likes: 217, isLiked: false, timestamp: '1h', verified: true, pinned: false, donation: 50, replies: [
      { id: 51, username: '@creator', text: 'I used Final Cut Pro X with some custom transitions!', likes: 45, isLiked: false, timestamp: '1h', verified: true, userId: 'creator' }
    ], userId: 'techguru' },
    { id: 6, username: '@creativeminds', text: 'This inspired me to start my own project! Thanks for sharing your process.', likes: 189, isLiked: false, timestamp: '2h', verified: false, pinned: false, replies: [], userId: 'creativeminds' },
    { id: 7, username: '@musiclover', text: 'The song choice is perfect! What\'s the name of this track?', likes: 94, isLiked: false, timestamp: '4h', verified: false, pinned: false, donation: 10, replies: [
      { id: 71, username: '@creator', text: 'It\'s "Electric Dreams" by SynthWave - glad you liked it!', likes: 32, isLiked: true, timestamp: '3h', verified: true, userId: 'creator' }
    ], userId: 'musiclover' }
  ]);
  
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filter, setFilter] = useState('all');
  const [commentMenuOpen, setCommentMenuOpen] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyMenuOpen, setReplyMenuOpen] = useState<number | null>(null);
  const [editingReply, setEditingReply] = useState<{commentId: number, replyId: number} | null>(null);
  const [editReplyText, setEditReplyText] = useState('');
  
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<{name: string; userId: string; isAnonymous: boolean} | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
        setCommentMenuOpen(null);
        setReplyMenuOpen(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (editingComment || replyingTo || editingReply) {
      inputRef.current?.focus();
    }
  }, [editingComment, replyingTo, editingReply]);
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    // Check if user is authenticated or has provided guest info
    if (!isAuthenticated && !currentUser) {
      setShowAuthModal(true);
      return;
    }

    if (replyingTo) {
      const newReply: Reply = {
        id: Date.now(),
        username: currentUser ? 
          (currentUser.isAnonymous ? currentUser.userId : `@${currentUser.name}`) : 
          '@me',
        text: commentText,
        likes: 0,
        isLiked: false,
        timestamp: 'Just now',
        verified: false,
        userId: currentUser?.userId || 'me'
      };
      
      setComments(comments.map(comment => {
        if (comment.id === replyingTo) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        return comment;
      }));
      
      setReplyingTo(null);
    } else if (editingComment) {
      saveEditComment();
    } else if (editingReply) {
      saveEditReply();
    } else {
      const newComment: Comment = {
        id: Date.now(),
        username: currentUser ? 
          (currentUser.isAnonymous ? currentUser.userId : `@${currentUser.name}`) : 
          '@me',
        text: commentText,
        likes: 0,
        isLiked: false,
        timestamp: 'Just now',
        verified: false,
        pinned: false,
        replies: [],
        userId: currentUser?.userId || 'me'
      };
      
      const pinnedComments = comments.filter(c => c.pinned);
      const unpinnedComments = comments.filter(c => !c.pinned);
      setComments([...pinnedComments, newComment, ...unpinnedComments]);
    }
    
    setCommentText('');
  };
  
  // Handler for guest comment
  const handleGuestComment = (name: string | null) => {
    if (name) {
      if (name.startsWith('user')) {
        // Anonymous user with generated ID
        setCurrentUser({ name: 'Anonymous', userId: name, isAnonymous: true });
      } else {
        // Guest with name
        setCurrentUser({ name, userId: `guest_${Date.now()}`, isAnonymous: false });
      }
    }
  };
  
  // Handlers for login/signup
  const handleLogin = () => {
    // This would typically redirect to login page or open login modal
    console.log('Login clicked');
    // For demo, let's just set the user as authenticated
    setIsAuthenticated(true);
    setCurrentUser({ name: 'User', userId: 'user_authenticated', isAnonymous: false });
  };
  
  const handleSignup = () => {
    // This would typically redirect to signup page or open signup modal
    console.log('Signup clicked');
    // For demo, let's just set the user as authenticated
    setIsAuthenticated(true);
    setCurrentUser({ name: 'NewUser', userId: 'newuser_authenticated', isAnonymous: false });
  };
  
  const toggleLike = (id: number, isReply = false, parentId: number | null = null) => {
    if (isReply && parentId !== null) {
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === id) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked
                };
              }
              return reply;
            })
          };
        }
        return comment;
      }));
    } else {
      setComments(comments.map(comment => {
        if (comment.id === id) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
        return comment;
      }));
    }
  };
  
  const deleteComment = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));
    setCommentMenuOpen(null);
    toast({
      title: "Comment deleted",
      description: "Your comment has been removed",
      duration: 3000,
    });
  };
  
  const deleteReply = (commentId: number, replyId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.filter(reply => reply.id !== replyId)
        };
      }
      return comment;
    }));
    setReplyMenuOpen(null);
    toast({
      title: "Reply deleted",
      description: "Your reply has been removed",
      duration: 3000,
    });
  };
  
  const startEditComment = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditText(comment.text);
    setCommentText(comment.text);
    setCommentMenuOpen(null);
  };
  
  const startEditReply = (commentId: number, reply: Reply) => {
    setEditingReply({ commentId, replyId: reply.id });
    setEditReplyText(reply.text);
    setCommentText(reply.text);
    setReplyMenuOpen(null);
  };
  
  const cancelEdit = () => {
    setEditingComment(null);
    setEditingReply(null);
    setEditText('');
    setEditReplyText('');
    setCommentText('');
  };
  
  const saveEditComment = () => {
    if (commentText.trim() && editingComment) {
      setComments(comments.map(comment => {
        if (comment.id === editingComment) {
          return { ...comment, text: commentText };
        }
        return comment;
      }));
      
      toast({
        title: "Comment updated",
        description: "Your changes have been saved",
        duration: 3000,
      });
    }
    setEditingComment(null);
    setCommentText('');
  };
  
  const saveEditReply = () => {
    if (commentText.trim() && editingReply) {
      setComments(comments.map(comment => {
        if (comment.id === editingReply.commentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === editingReply.replyId) {
                return { ...reply, text: commentText };
              }
              return reply;
            })
          };
        }
        return comment;
      }));
      
      toast({
        title: "Reply updated",
        description: "Your changes have been saved",
        duration: 3000,
      });
    }
    setEditingReply(null);
    setCommentText('');
  };
  
  const pinComment = (id: number) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, pinned: !comment.pinned };
      }
      return comment;
    }));
    setCommentMenuOpen(null);
  };
  
  const startReply = (commentId: number) => {
    setReplyingTo(commentId);
    setCommentText('');
  };
  
  const cancelReply = () => {
    setReplyingTo(null);
    setCommentText('');
  };
  
  // Check if a comment or reply belongs to the current user
  const isOwnContent = (userId?: string) => {
    if (!currentUser) return false;
    if (userId === 'me' || userId === currentUser.userId) return true;
    return false;
  };
  
  const filteredComments = comments.filter(comment => {
    if (filter === 'verified' && !comment.verified) return false;
    if (filter === 'liked' && !comment.isLiked) return false;
    if (filter === 'donations' && !comment.donation) return false;
    return true;
  });
  
  const sortedComments = [...filteredComments].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
  
  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className={`absolute bottom-0 left-0 right-0 h-[80vh] bg-white rounded-t-3xl transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-1"></div>
          
          <div className="w-full h-[calc(100%-20px)] flex flex-col overflow-hidden">
            <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <div className="flex items-center">
                {replyingTo ? (
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
                ) : editingComment ? (
                  <div className="flex items-center">
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 mr-2"
                      onClick={cancelEdit}
                    >
                      <ArrowLeft size={16} />
                    </Button>
                    <span className="font-medium">Edit Comment</span>
                  </div>
                ) : editingReply ? (
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
                ) : (
                  <>
                    <h3 className="font-medium text-base">Comments</h3>
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
                              All comments
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
                  </>
                )}
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7"
                onClick={onClose}
              >
                <X size={16} />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {sortedComments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32">
                  <p className="text-sm text-gray-500">
                    No comments to display.
                  </p>
                </div>
              ) : (
                sortedComments.map((comment) => (
                  <div key={comment.id} className="space-y-4">
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
                            
                            <div className="relative" ref={menuRef}>
                              <Button 
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => setCommentMenuOpen(commentMenuOpen === comment.id ? null : comment.id)}
                              >
                                <MoreHorizontal size={14} />
                              </Button>
                              
                              {commentMenuOpen === comment.id && (
                                <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
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
                                          className="px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer"
                                          onClick={() => deleteComment(comment.id)}
                                        >
                                          <Trash2 size={14} />
                                          <span>Delete</span>
                                        </li>
                                      </>
                                    )}
                                    {comment.username === '@creator' && (
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
                        
                        {editingComment === comment.id ? (
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
                                                className="px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer"
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
                                  
                                  <div className="mt-1">
                                    <Button
                                      variant="ghost"
                                      size="sm" 
                                      className="flex items-center space-x-1 text-xs text-gray-500 h-6 px-1"
                                      onClick={() => toggleLike(reply.id, true, comment.id)}
                                    >
                                      <Heart size={12} fill={reply.isLiked ? "#ff2d55" : "none"} stroke={reply.isLiked ? "#ff2d55" : "currentColor"} />
                                      <span className={reply.isLiked ? "text-pink-500" : ""}>{reply.likes}</span>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-3 border-t border-gray-200 bg-white">
              <form onSubmit={handleCommentSubmit} className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {currentUser ? (currentUser.isAnonymous ? 'A' : currentUser.name[0].toUpperCase()) : 'G'}
                  </span>
                </div>
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={
                    editingComment 
                      ? "Edit your comment..." 
                      : editingReply 
                        ? "Edit your reply..." 
                        : replyingTo 
                          ? `Reply to ${comments.find(c => c.id === replyingTo)?.username}...` 
                          : "Add comment..."
                  }
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-gray-100 rounded-full h-9 text-sm border-0"
                  onClick={() => {
                    if (!isAuthenticated && !currentUser && !editingComment && !editingReply && !replyingTo) {
                      setShowAuthModal(true);
                    }
                  }}
                />
                <Button 
                  type="submit" 
                  variant="ghost"
                  size="icon"
                  disabled={!commentText.trim()}
                  className={`h-8 w-8 ${commentText.trim() ? "text-pink-500" : "text-gray-300"}`}
                >
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Authentication Modal */}
      <CommentAuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onGuestComment={handleGuestComment}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </>
  );
};

export default TikTokCommentsPanel;
