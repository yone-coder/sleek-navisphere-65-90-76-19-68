
import React, { useState, useRef, useEffect } from 'react';
import { Heart, X, Send, Flag, ChevronDown, MoreHorizontal, Trash2, Edit, MessageCircle, ArrowLeft, MessageSquare, ThumbsUp, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';

interface Reply {
  id: number;
  username: string;
  text: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
  verified: boolean;
  userId?: string;
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
  userId?: string;
  tab?: string; // Add tab field to determine which tab the comment belongs to
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface SeminarCommentsPanelProps {
  onClose: () => void;
  isOpen: boolean;
  initialTab?: string;
}

const SeminarCommentsPanel: React.FC<SeminarCommentsPanelProps> = ({ onClose, isOpen, initialTab = "comments" }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, username: '@user1', text: 'This is amazing! 🔥', likes: 342, isLiked: false, timestamp: '2d', verified: true, pinned: false, donation: 5, replies: [], userId: 'user1', tab: 'comments' },
    { id: 2, username: '@user2', text: 'I need to try this ASAP 😍', likes: 128, isLiked: false, timestamp: '1d', verified: false, pinned: false, replies: [], userId: 'user2', tab: 'comments' },
    { id: 3, username: '@user3', text: 'Nice content as always!', likes: 86, isLiked: false, timestamp: '5h', verified: false, pinned: false, donation: 20, replies: [], userId: 'user3', tab: 'comments' },
    { id: 4, username: '@creator', text: 'Thank you all for watching! New video coming tomorrow 🎬', likes: 954, isLiked: true, timestamp: '6h', verified: true, pinned: true, replies: [], userId: 'creator', tab: 'comments' },
    { id: 5, username: '@techguru', text: 'The transition at 0:24 is so smooth. What editing software did you use?', likes: 217, isLiked: false, timestamp: '1h', verified: true, pinned: false, donation: 50, replies: [
      { id: 51, username: '@creator', text: 'I used Final Cut Pro X with some custom transitions!', likes: 45, isLiked: false, timestamp: '1h', verified: true, userId: 'creator' }
    ], userId: 'techguru', tab: 'comments' },
    { id: 10, username: '@learner1', text: 'This seminar changed my career! I was able to get a job as a developer right after completing it.', likes: 532, isLiked: false, timestamp: '3d', verified: false, pinned: true, replies: [], userId: 'learner1', tab: 'testimonials' },
    { id: 11, username: '@devpro', text: 'The instructor knows the subject matter deeply. Very impressed with the quality of content!', likes: 428, isLiked: false, timestamp: '5d', verified: true, pinned: false, replies: [], userId: 'devpro', tab: 'testimonials' },
    { id: 12, username: '@newcoder', text: 'As a beginner, I found this very approachable. The pace was perfect for me!', likes: 215, isLiked: false, timestamp: '2d', verified: false, pinned: false, replies: [], userId: 'newcoder', tab: 'testimonials' },
  ]);
  
  const [faqs, setFaqs] = useState<FAQ[]>([
    { 
      id: 1, 
      question: "Do I need prior experience to join this seminar?", 
      answer: "No, this seminar is designed for all levels. We start with the basics and gradually move to more advanced topics."
    },
    { 
      id: 2, 
      question: "Will I receive a certificate after completion?", 
      answer: "Yes, all participants who complete the seminar will receive a verified digital certificate that you can add to your portfolio."
    },
    { 
      id: 3, 
      question: "How long do I have access to the recorded sessions?", 
      answer: "You'll have lifetime access to all recordings, so you can revisit the content whenever you need to refresh your knowledge."
    },
    { 
      id: 4, 
      question: "Is there a payment plan available?", 
      answer: "Yes, we offer flexible payment options. You can pay in full or choose our 3-month installment plan."
    },
    { 
      id: 5, 
      question: "What if I miss a live session?", 
      answer: "All sessions are recorded and made available within 24 hours, so you won't miss anything if you can't attend live."
    }
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
  
  const [currentUser, setCurrentUser] = useState<{name: string; userId: string; isAnonymous: boolean} | null>({
    name: 'User',
    userId: 'user_authenticated',
    isAnonymous: false
  });
  
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
        userId: currentUser?.userId || 'me',
        tab: activeTab
      };
      
      const pinnedComments = comments.filter(c => c.pinned && c.tab === activeTab);
      const unpinnedComments = comments.filter(c => !c.pinned && c.tab === activeTab);
      setComments([...comments.filter(c => c.tab !== activeTab), ...pinnedComments, newComment, ...unpinnedComments]);
    }
    
    setCommentText('');
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
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
    setCommentMenuOpen(null);
    
    toast({
      title: "Comment deleted",
      description: "Your comment has been removed",
      duration: 3000,
    });
  };
  
  const deleteReply = (commentId: number, replyId: number) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.filter(reply => reply.id !== replyId)
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
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
  
  const isOwnContent = (userId?: string) => {
    if (!currentUser) return false;
    if (userId === 'me' || userId === currentUser.userId) return true;
    return false;
  };
  
  const getTabComments = () => {
    return comments.filter(comment => comment.tab === activeTab || (!comment.tab && activeTab === 'comments'));
  };
  
  const filteredComments = getTabComments().filter(comment => {
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

  const getPlaceholderText = () => {
    if (editingComment) {
      return "Edit your comment...";
    } else if (editingReply) {
      return "Edit your reply...";
    } else if (replyingTo) {
      return `Reply to ${comments.find(c => c.id === replyingTo)?.username}...`;
    } else if (activeTab === 'testimonials') {
      return "Share your experience...";
    } else if (activeTab === 'faqs') {
      return "Ask a question...";
    } else {
      return "Add comment...";
    }
  };
  
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
                  <h3 className="font-medium text-base">{t('seminar.commentsPanel.title')}</h3>
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
            
            {/* Tabs */}
            <Tabs
              defaultValue={initialTab}
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="px-4 py-2 border-b border-gray-100">
                <TabsList className="w-full">
                  <TabsTrigger value="comments" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {t('seminar.commentsPanel.comments')}
                  </TabsTrigger>
                  <TabsTrigger value="testimonials" className="flex-1">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {t('seminar.commentsPanel.testimonials')}
                  </TabsTrigger>
                  <TabsTrigger value="faqs" className="flex-1">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    {t('seminar.commentsPanel.faqs')}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="comments" className="flex-1 overflow-auto pt-0 mt-0">
                <div className="px-4 py-2 flex justify-between items-center border-b border-gray-100">
                  <div className="relative" ref={menuRef}>
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
                  <span className="text-xs text-gray-500">{sortedComments.length} comments</span>
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
                                              className="px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer text-red-500"
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
              </TabsContent>
              
              <TabsContent value="testimonials" className="flex-1 overflow-auto pt-0 mt-0">
                <div className="px-4 py-2 flex justify-between items-center border-b border-gray-100">
                  <span className="text-sm font-medium">{t('seminar.commentsPanel.testimonials')}</span>
                  <span className="text-xs text-gray-500">
                    {comments.filter(c => c.tab === 'testimonials').length} testimonials
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {sortedComments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32">
                      <p className="text-sm text-gray-500">
                        No testimonials to display yet. Be the first to share your experience!
                      </p>
                    </div>
                  ) : (
                    // Reuse the same comment rendering logic from the comments tab
                    sortedComments.map((comment) => (
                      <div key={comment.id} className="space-y-4">
                        <div className={`flex space-x-3 relative ${comment.pinned ? "p-3 border border-gray-200 rounded-lg bg-blue-50 bg-opacity-10" : ""}`}>
                          {/* ... same comment display structure as above */}
                          {comment.pinned && (
                            <div className="absolute top-0 left-0 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full transform -translate-y-1/2">
                              Featured
                            </div>
                          )}
                          <div className={`w-10 h-10 rounded-full ${
                            comment.username === '@creator' 
                              ? 'bg-gradient-to-br from-red-500 to-pink-600' 
                              : comment.username === '@me' || isOwnContent(comment.userId)
                                ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
                                : 'bg-gradient-to-br from-blue-400 to-indigo-500'
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
                              </div>
                              <span className="text-xs text-gray-500">{comment.timestamp}</span>
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
                                    className="h-7 text-xs text-blue-500 font-medium"
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
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="faqs" className="flex-1 overflow-auto pt-0 mt-0">
                <div className="px-4 py-2 flex justify-between items-center border-b border-gray-100">
                  <span className="text-sm font-medium">{t('seminar.commentsPanel.faqs')}</span>
                  <span className="text-xs text-gray-500">
                    {faqs.length} questions
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center mr-3">
                          <HelpCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900">{faq.question}</h4>
                          <p className="text-sm mt-2 text-gray-600">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
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
                  placeholder={getPlaceholderText()}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 bg-gray-100 rounded-full h-9 text-sm border-0"
                />
                <Button 
                  type="submit" 
                  variant="ghost"
                  size="icon"
                  disabled={!commentText.trim()}
                  className={`h-8 w-8 ${commentText.trim() ? "text-blue-500" : "text-gray-300"}`}
                >
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default SeminarCommentsPanel;
