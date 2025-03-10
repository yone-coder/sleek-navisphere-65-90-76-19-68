import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import CommentAuthModal from './CommentAuthModal';
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import FAQsList from './FAQsList';
import CommentPanelHeader from './CommentPanelHeader';
import { Comment, Reply, FAQ } from './types';

interface TikTokCommentsPanelProps {
  onClose: () => void;
  isOpen: boolean;
  initialTab?: string;
}

const TikTokCommentsPanel: React.FC<TikTokCommentsPanelProps> = ({ onClose, isOpen, initialTab = 'comments' }) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState(initialTab);
  
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
  
  // Effect for handling click outside
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

  // Set active tab from prop when it changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Effect to focus input when editing
  useEffect(() => {
    if (editingComment || replyingTo || editingReply) {
      inputRef.current?.focus();
    }
  }, [editingComment, replyingTo, editingReply]);
  
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
    if (commentText.trim() && editingComment) {
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
    }
    setEditingComment(null);
    setCommentText('');
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
  
  // Filter and sort functions
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
  
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <div
        className={`fixed bottom-0 inset-x-0 bg-white rounded-t-2xl shadow-lg z-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '90vh' }}
      >
        {/* Header with title and close button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
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
        
        {/* Main content */}
        <div className="h-full overflow-hidden flex flex-col">
          {/* Tabs for different content types */}
          {!replyingTo && !editingComment && !editingReply && (
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b">
                <TabsList className="w-full justify-center bg-transparent px-4 py-1 gap-1 h-auto relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gray-200">
                  <TabsTrigger 
                    value="comments" 
                    className="flex-1 px-4 py-2.5 data-[state=active]:text-pink-500 data-[state=active]:font-medium data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-pink-500 data-[state=active]:after:rounded-t-full relative data-[state=active]:shadow-none rounded-none text-sm transition-all"
                  >
                    Comments
                  </TabsTrigger>
                  <TabsTrigger 
                    value="testimonials" 
                    className="flex-1 px-4 py-2.5 data-[state=active]:text-pink-500 data-[state=active]:font-medium data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-pink-500 data-[state=active]:after:rounded-t-full relative data-[state=active]:shadow-none rounded-none text-sm transition-all"
                  >
                    Testimonials
                  </TabsTrigger>
                  <TabsTrigger 
                    value="faqs" 
                    className="flex-1 px-4 py-2.5 data-[state=active]:text-pink-500 data-[state=active]:font-medium data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-pink-500 data-[state=active]:after:rounded-t-full relative data-[state=active]:shadow-none rounded-none text-sm transition-all"
                  >
                    FAQs
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(70vh - 8rem)' }}>
                <TabsContent value="comments" className="p-4 space-y-4 m-0">
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
                </TabsContent>
                
                <TabsContent value="testimonials" className="p-4 space-y-4 m-0">
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
                </TabsContent>
                
                <TabsContent value="faqs" className="p-4 space-y-4 m-0">
                  <FAQsList faqs={faqs} />
                </TabsContent>
              </div>
            </Tabs>
          )}
          
          {/* When replying or editing, show content */}
          {(replyingTo || editingComment || editingReply) && (
            <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(70vh - 8rem)' }}>
              {replyingTo && (
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-700">
                    {comments.find(c => c.id === replyingTo)?.text}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Comment input - not shown for FAQs */}
          {activeTab !== 'faqs' && (
            <div className="p-4 border-t border-gray-200 bg-white mt-auto">
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
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Auth modal for guest comments */}
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
