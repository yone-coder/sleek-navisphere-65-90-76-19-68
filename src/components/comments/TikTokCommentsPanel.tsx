import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import CommentAuthModal from './CommentAuthModal';
import { toast } from "@/hooks/use-toast";
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import FAQsList from './FAQsList';
import CommentPanelHeader from './CommentPanelHeader';
import { Comment, Reply, FAQ } from './types';
import ModernTabs from './ModernTabs';
import { motion, PanInfo, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface TikTokCommentsPanelProps {
  onClose: () => void;
  isOpen: boolean;
  initialTab?: string;
}

const TikTokCommentsPanel: React.FC<TikTokCommentsPanelProps> = ({ onClose, isOpen, initialTab = 'comments' }) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // State for panel height
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [prevHeight, setPrevHeight] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  // Motion values for dragging
  const y = useMotionValue(0);
  const panelHeight = useMotionValue('95vh');
  const opacity = useTransform(y, [0, 200], [1, 0]);
  
  // Original comment state
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
  
  // Testimonials data
  const [testimonials, setTestimonials] = useState<Comment[]>([
    { id: 101, username: '@dev_expert', text: 'This seminar completely changed my approach to web development. The instructor explains complex concepts in such an accessible way!', likes: 542, isLiked: false, timestamp: '3d', verified: true, pinned: true, replies: [], userId: 'dev_expert' },
    { id: 102, username: '@newcoder', text: 'As a beginner, I was worried the content would be too advanced, but the instructor breaks everything down perfectly. Highly recommend!', likes: 328, isLiked: false, timestamp: '2d', verified: false, pinned: false, replies: [], userId: 'newcoder' },
    { id: 103, username: '@tech_lead', text: 'I\'ve been in the industry for 10 years, and I still learned so many new techniques from this seminar. Worth every penny!', likes: 406, isLiked: true, timestamp: '1d', verified: true, pinned: false, donation: 50, replies: [], userId: 'tech_lead' },
    { id: 104, username: '@career_switcher', text: 'This seminar helped me transition from marketing to tech. I just landed my first developer job!', likes: 289, isLiked: false, timestamp: '5d', verified: false, pinned: false, replies: [], userId: 'career_switcher' },
  ]);
  
  // FAQs data
  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: 1, question: "What prior knowledge is required for this seminar?", answer: "This seminar is designed for all levels. Beginners will find the fundamentals easy to follow, while experienced developers will benefit from advanced techniques covered in later sections." },
    { id: 2, question: "Will recordings be available after the live session?", answer: "Yes, all participants will receive access to the full recording for 6 months after the event." },
    { id: 3, question: "Is there a certificate of completion?", answer: "Yes, you'll receive a certificate once you complete the seminar and the follow-up assessment." },
    { id: 4, question: "What software or tools do I need to install beforehand?", answer: "You'll need a code editor (VS Code recommended), Node.js, and Git installed. A detailed setup guide will be sent after registration." },
    { id: 5, question: "Can I ask questions during the seminar?", answer: "Absolutely! There will be dedicated Q&A sessions throughout the seminar." },
    { id: 6, question: "Is there a refund policy?", answer: "We offer full refunds up to 7 days before the event. Partial refunds are available up to 48 hours before." },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<{name: string; userId: string; isAnonymous: boolean} | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLDivElement>(null);
  
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
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (isOpen && commentInputRef.current) {
      setTimeout(() => {
        commentInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (editingComment || replyingTo || editingReply) {
      inputRef.current?.focus();
    }
  }, [editingComment, replyingTo, editingReply]);
  
  const handleDragStart = () => {
    setIsDragging(true);
    if (!prevHeight) {
      const currentHeight = panelHeight.get();
      if (typeof currentHeight === 'string') {
        setPrevHeight(parseInt(currentHeight));
      }
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentY = y.get();
    const deltaY = info.delta.y;

    if (currentY + deltaY < 0) {
      const newHeight = Math.min(100, parseInt(panelHeight.get() as string) - deltaY / 10);
      panelHeight.set(`${newHeight}vh`);
      
      if (newHeight >= 90) {
        setIsFullscreen(true);
      }
    } else {
      const newHeight = Math.max(30, parseInt(panelHeight.get() as string) - deltaY / 10);
      panelHeight.set(`${newHeight}vh`);
      
      if (newHeight < 90) {
        setIsFullscreen(false);
      }
      
      if (newHeight <= 10) {
        onClose();
      }
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const currentHeight = parseInt(panelHeight.get() as string);
    
    if (info.velocity.y > 500) {
      onClose();
    } else if (info.velocity.y < -500) {
      setIsFullscreen(true);
      panelHeight.set('95vh');
    } else if (currentHeight < 40) {
      onClose();
    } else if (currentHeight > 80) {
      setIsFullscreen(true);
      panelHeight.set('95vh');
    } else {
      setIsFullscreen(false);
      panelHeight.set('60vh');
    }
    
    y.set(0);
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      setIsFullscreen(false);
      if (prevHeight) {
        panelHeight.set(`${prevHeight}vh`);
      } else {
        panelHeight.set('60vh');
      }
    } else {
      setPrevHeight(parseInt(panelHeight.get() as string));
      setIsFullscreen(true);
      panelHeight.set('95vh');
    }
  };

  const handleInputFocus = () => {
    if (!isAuthenticated && !currentUser) {
      setShowAuthModal(true);
    }
  };
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    if (!isAuthenticated && !currentUser) {
      setShowAuthModal(true);
      return;
    }

    setIsSubmitting(true);

    try {
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
        
        const dataToUpdate = activeTab === 'testimonials' ? testimonials : comments;
        const pinnedItems = dataToUpdate.filter(c => c.pinned);
        const unpinnedItems = dataToUpdate.filter(c => !c.pinned);
        
        if (activeTab === 'testimonials') {
          setTestimonials([...pinnedItems, newComment, ...unpinnedItems]);
        } else {
          setComments([...pinnedItems, newComment, ...unpinnedItems]);
        }
      }
      
      setCommentText('');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGuestComment = (name: string | null) => {
    if (name) {
      if (name.startsWith('user')) {
        setCurrentUser({ name: 'Anonymous', userId: name, isAnonymous: true });
      } else {
        setCurrentUser({ name, userId: `guest_${Date.now()}`, isAnonymous: false });
      }
    }
  };
  
  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentUser({ name: 'User', userId: 'user_authenticated', isAnonymous: false });
  };
  
  const handleSignup = () => {
    setIsAuthenticated(true);
    setCurrentUser({ name: 'NewUser', userId: 'newuser_authenticated', isAnonymous: false });
  };
  
  const toggleLike = (id: number, isReply = false, parentId: number | null = null) => {
    const dataToUpdate = activeTab === 'testimonials' ? testimonials : comments;
    
    if (isReply && parentId !== null) {
      const updatedData = dataToUpdate.map(comment => {
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
      });
      
      if (activeTab === 'testimonials') {
        setTestimonials(updatedData);
      } else {
        setComments(updatedData);
      }
    } else {
      const updatedData = dataToUpdate.map(comment => {
        if (comment.id === id) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
        return comment;
      });
      
      if (activeTab === 'testimonials') {
        setTestimonials(updatedData);
      } else {
        setComments(updatedData);
      }
    }
  };
  
  const deleteComment = (id: number) => {
    for (const comment of (activeTab === 'testimonials' ? testimonials : comments)) {
      if (comment.replies?.some(reply => reply.id === id)) {
        if (activeTab === 'testimonials') {
          setTestimonials(testimonials.map(c => ({
            ...c,
            replies: c.replies.filter(r => r.id !== id)
          })));
        } else {
          setComments(comments.map(c => ({
            ...c,
            replies: c.replies.filter(r => r.id !== id)
          })));
        }
        
        toast({
          title: "Reply deleted",
          description: "Your reply has been removed",
          duration: 3000,
        });
        
        return;
      }
    }
    
    if (activeTab === 'testimonials') {
      const updatedTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
      setTestimonials(updatedTestimonials);
    } else {
      const updatedComments = comments.filter(comment => comment.id !== id);
      setComments(updatedComments);
    }
    
    setCommentMenuOpen(null);
    
    toast({
      title: activeTab === 'testimonials' ? "Testimonial deleted" : "Comment deleted",
      description: `Your ${activeTab === 'testimonials' ? 'testimonial' : 'comment'} has been removed`,
      duration: 3000,
    });
  };
  
  const deleteReply = (commentId: number, replyId: number) => {
    const updatedData = (activeTab === 'testimonials' ? testimonials : comments).map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.filter(reply => reply.id !== replyId)
        };
      }
      return comment;
    });
    
    if (activeTab === 'testimonials') {
      setTestimonials(updatedData);
    } else {
      setComments(updatedData);
    }
    
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
    if (commentText.trim()) {
      if (editingComment) {
        const updatedData = (activeTab === 'testimonials' ? testimonials : comments).map(comment => {
          if (comment.id === editingComment) {
            return { ...comment, text: commentText };
          }
          return comment;
        });
        
        if (activeTab === 'testimonials') {
          setTestimonials(updatedData);
        } else {
          setComments(updatedData);
        }
        
        toast({
          title: activeTab === 'testimonials' ? "Testimonial updated" : "Comment updated", 
          description: "Your changes have been saved",
          duration: 3000,
        });
        
        setEditingComment(null);
      } else if (editingReply) {
        const updatedData = (activeTab === 'testimonials' ? testimonials : comments).map(comment => {
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
        });
        
        if (activeTab === 'testimonials') {
          setTestimonials(updatedData);
        } else {
          setComments(updatedData);
        }
        
        toast({
          title: "Reply updated",
          description: "Your changes have been saved",
          duration: 3000,
        });
        
        setEditingReply(null);
      }
      
      setCommentText('');
    }
  };
  
  const saveEditReply = () => {
    if (commentText.trim() && editingReply) {
      const updatedData = (activeTab === 'testimonials' ? testimonials : comments).map(comment => {
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
      });
      
      if (activeTab === 'testimonials') {
        setTestimonials(updatedData);
      } else {
        setComments(updatedData);
      }
      
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
    const updatedData = (activeTab === 'testimonials' ? testimonials : comments).map(comment => {
      if (comment.id === id) {
        return { ...comment, pinned: !comment.pinned };
      }
      return comment;
    });
    
    if (activeTab === 'testimonials') {
      setTestimonials(updatedData);
    } else {
      setComments(updatedData);
    }
    
    setCommentMenuOpen(null);
  };
  
  const startReply = (commentId: number) => {
    if (!isAuthenticated && !currentUser) {
      setShowAuthModal(true);
      return;
    }
    
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
  
  const getFilteredData = () => {
    const dataToFilter = activeTab === 'testimonials' ? testimonials : comments;
    
    return dataToFilter.filter(item => {
      if (filter === 'verified' && !item.verified) return false;
      if (filter === 'liked' && !item.isLiked) return false;
      if (filter === 'donations' && !item.donation) return false;
      return true;
    });
  };
  
  const sortedComments = [...getFilteredData()].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const tabItems = [
    { id: 'comments', label: 'Comments' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faqs', label: 'FAQs' },
  ];
  
  const panelVariants = {
    hidden: { y: "100%" },
    visible: { y: 0, transition: { type: "spring", damping: 20, stiffness: 300 } },
    exit: { y: "100%", transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            className="fixed bottom-0 inset-x-0 bg-white rounded-t-2xl shadow-lg z-50 flex flex-col"
            style={{ 
              height: panelHeight, 
              maxHeight: '95vh',
              opacity: opacity 
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <div className="w-full flex justify-center cursor-grab active:cursor-grabbing shrink-0">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full my-2"></div>
            </div>
            
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-30 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isFullscreen ? "rotate-180" : ""}
                  >
                    {isFullscreen ? (
                      <>
                        <polyline points="4 14 10 14 10 20"></polyline>
                        <polyline points="20 10 14 10 14 4"></polyline>
                        <line x1="14" y1="10" x2="21" y2="3"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </>
                    ) : (
                      <>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </>
                    )}
                  </svg>
                </button>
                
                <CommentPanelHeader 
                  activeTab={activeTab}
                  replyingTo={replyingTo}
                  editingComment={editingComment}
                  editingReply={editingReply}
                  showFilterMenu={showFilterMenu}
                  filter={filter}
                  setActiveTab={setActiveTab}
                  cancelReply={cancelReply}
                  cancelEdit={cancelEdit}
                  setShowFilterMenu={setShowFilterMenu}
                  setFilter={setFilter}
                  menuRef={menuRef}
                  onClose={onClose}
                />
              </div>
              
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close panel"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <ModernTabs 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                tabs={tabItems}
              >
                <div className={`h-full overflow-y-auto flex-1 ${activeTab === 'comments' ? 'block' : 'hidden'}`}>
                  <div className="p-4 pb-20 space-y-4">
                    <CommentsList 
                      comments={sortedComments}
                      activeTab={activeTab}
                      editingComment={editingComment}
                      commentMenuOpen={commentMenuOpen}
                      commentText={commentText}
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
                  </div>
                </div>
                
                <div className={`h-full overflow-y-auto flex-1 ${activeTab === 'testimonials' ? 'block' : 'hidden'}`}>
                  <div className="p-4 pb-20 space-y-4">
                    <CommentsList 
                      comments={sortedComments}
                      activeTab={activeTab}
                      editingComment={editingComment}
                      commentMenuOpen={commentMenuOpen}
                      commentText={commentText}
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
                  </div>
                </div>
                
                <div className={`h-full overflow-y-auto flex-1 ${activeTab === 'faqs' ? 'block' : 'hidden'}`}>
                  <div className="p-4 pb-20 space-y-4">
                    <FAQsList faqs={faqs} />
                  </div>
                </div>
              </ModernTabs>
              
              {(replyingTo || editingComment || editingReply) && (
                <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                  {replyingTo && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-700">
                        {comments.find(c => c.id === replyingTo)?.text}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab !== 'faqs' && (
                <div 
                  ref={commentInputRef} 
                  className="p-4 border-t border-gray-200 bg-white sticky bottom-0 shrink-0 z-10"
                >
                  <CommentForm 
                    commentText={commentText}
                    setCommentText={setCommentText}
                    handleCommentSubmit={handleCommentSubmit}
                    replyingTo={replyingTo}
                    editingComment={editingComment}
                    editingReply={editingReply}
                    cancelReply={cancelReply}
                    cancelEdit={cancelEdit}
                    inputRef={inputRef}
                    isSubmitting={isSubmitting}
                    isAuthenticated={isAuthenticated || !!currentUser}
                    onFocus={handleInputFocus}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
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
