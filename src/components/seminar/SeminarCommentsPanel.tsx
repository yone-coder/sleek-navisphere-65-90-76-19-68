
import React, { useState, useRef, useEffect } from 'react';
import { Heart, X, Send, Flag, ChevronDown, MoreHorizontal, Trash2, Edit, MessageCircle, ArrowLeft, Star, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  verified: boolean;
  image?: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface SeminarCommentsPanelProps {
  onClose: () => void;
  isOpen: boolean;
}

const SeminarCommentsPanel: React.FC<SeminarCommentsPanelProps> = ({ onClose, isOpen }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("comments");
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, username: '@user1', text: 'Ce séminaire est fantastique! J\'apprends beaucoup. 🔥', likes: 342, isLiked: false, timestamp: '2d', verified: true, pinned: false, donation: 5, replies: [], userId: 'user1' },
    { id: 2, username: '@user2', text: 'Je me suis inscrit immédiatement après avoir vu la présentation. Hâte de commencer! 😊', likes: 128, isLiked: false, timestamp: '1d', verified: false, pinned: false, replies: [], userId: 'user2' },
    { id: 3, username: '@user3', text: 'Quand est-ce que le prochain webinaire aura lieu?', likes: 86, isLiked: false, timestamp: '5h', verified: false, pinned: false, donation: 20, replies: [
      { id: 31, username: '@presentateur', text: 'Nous aurons un autre séminaire le mois prochain. Restez à l\'écoute!', likes: 45, isLiked: false, timestamp: '4h', verified: true, userId: 'presenter' }
    ], userId: 'user3' },
    { id: 4, username: '@presentateur', text: 'Merci à tous pour votre participation! N\'hésitez pas à poser vos questions. 👨‍💻', likes: 954, isLiked: true, timestamp: '6h', verified: true, pinned: true, replies: [], userId: 'presenter' }
  ]);
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Marie Dubois",
      role: "Développeuse Frontend",
      text: "Cette formation a complètement transformé ma façon d'aborder le développement web. Les techniques enseignées sont immédiatement applicables et m'ont permis d'améliorer significativement mes projets professionnels.",
      rating: 5,
      verified: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie"
    },
    {
      id: 2,
      name: "Thomas Martin",
      role: "Chef de Projet Digital",
      text: "Excellente formation, à la fois théorique et pratique. J'apprécie particulièrement la qualité des supports pédagogiques et la disponibilité des formateurs pour répondre à nos questions spécifiques.",
      rating: 4,
      verified: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas"
    },
    {
      id: 3,
      name: "Sophie Leroy",
      role: "Étudiante en Informatique",
      text: "Un contenu riche et bien structuré qui m'a permis de combler les lacunes de mon cursus universitaire. La section sur les frameworks modernes était particulièrement éclairante.",
      rating: 5,
      verified: false,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie"
    }
  ]);
  
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: 1,
      question: "Combien de temps ai-je accès au contenu après l'achat?",
      answer: "Vous avez un accès illimité au contenu après l'achat. Vous pouvez revoir les séminaires et télécharger les ressources à votre convenance."
    },
    {
      id: 2,
      question: "Les certificats délivrés sont-ils reconnus par l'industrie?",
      answer: "Oui, nos certificats sont reconnus par de nombreuses entreprises du secteur technologique. Nous mettons régulièrement à jour notre programme pour répondre aux exigences actuelles du marché."
    },
    {
      id: 3,
      question: "Y a-t-il un système de support pour les questions après le séminaire?",
      answer: "Absolument! Nous offrons un support technique par email pendant 30 jours après la fin du séminaire, et vous avez également accès à notre communauté d'apprenants où les formateurs interviennent régulièrement."
    },
    {
      id: 4,
      question: "Puis-je suivre cette formation sans connaissances préalables?",
      answer: "Ce séminaire est conçu pour des personnes ayant déjà des bases en développement web. Nous recommandons d'avoir au moins une expérience de 6 mois dans le domaine pour tirer le meilleur parti du contenu avancé."
    },
    {
      id: 5,
      question: "Est-ce que je recevrai une facture pour mon entreprise?",
      answer: "Oui, une facture détaillée vous sera automatiquement envoyée par email après votre achat. Si vous avez besoin d'informations spécifiques sur la facture, notre équipe administrative est à votre disposition."
    }
  ]);
  
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filter, setFilter] = useState('all');
  const [commentMenuOpen, setCommentMenuOpen] = useState<number | null>(null);
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState<{name: string; userId: string; isAnonymous: boolean}>({
    name: 'Participant',
    userId: 'participant_123',
    isAnonymous: false
  });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
        setCommentMenuOpen(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (editingComment || replyingTo) {
      inputRef.current?.focus();
    }
  }, [editingComment, replyingTo]);
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    if (replyingTo) {
      const newReply: Reply = {
        id: Date.now(),
        username: currentUser ? 
          (currentUser.isAnonymous ? currentUser.userId : `@${currentUser.name}`) : 
          '@participant',
        text: commentText,
        likes: 0,
        isLiked: false,
        timestamp: 'À l\'instant',
        verified: false,
        userId: currentUser?.userId || 'participant'
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
    } else {
      const newComment: Comment = {
        id: Date.now(),
        username: currentUser ? 
          (currentUser.isAnonymous ? currentUser.userId : `@${currentUser.name}`) : 
          '@participant',
        text: commentText,
        likes: 0,
        isLiked: false,
        timestamp: 'À l\'instant',
        verified: false,
        pinned: false,
        replies: [],
        userId: currentUser?.userId || 'participant'
      };
      
      const pinnedComments = comments.filter(c => c.pinned);
      const unpinnedComments = comments.filter(c => !c.pinned);
      setComments([...pinnedComments, newComment, ...unpinnedComments]);
    }
    
    setCommentText('');
    
    toast({
      title: "Commentaire ajouté",
      description: "Votre commentaire a été publié avec succès",
      duration: 3000,
    });
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
      title: "Commentaire supprimé",
      description: "Votre commentaire a été retiré",
      duration: 3000,
    });
  };
  
  const startEditComment = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditText(comment.text);
    setCommentText(comment.text);
    setCommentMenuOpen(null);
  };
  
  const cancelEdit = () => {
    setEditingComment(null);
    setEditText('');
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
        title: "Commentaire mis à jour",
        description: "Vos modifications ont été enregistrées",
        duration: 3000,
      });
    }
    setEditingComment(null);
    setCommentText('');
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
    if (userId === 'participant' || userId === currentUser.userId) return true;
    return false;
  };
  
  const filteredComments = comments.filter(comment => {
    if (filter === 'verified' && !comment.verified) return false;
    if (filter === 'liked' && !comment.isLiked) return false;
    return true;
  });
  
  const sortedComments = [...filteredComments].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
      />
    ));
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
                    <span className="font-medium">Répondre</span>
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
                    <span className="font-medium">Modifier le commentaire</span>
                  </div>
                ) : (
                  <h3 className="font-medium text-base">Séminaire - Discussions</h3>
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
            
            {/* Tabs for different sections */}
            <div className="px-4 pt-2 pb-1 border-b border-gray-200 bg-white">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="comments" className="text-xs py-1">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Commentaires
                  </TabsTrigger>
                  <TabsTrigger value="testimonials" className="text-xs py-1">
                    <Star className="h-4 w-4 mr-1" />
                    Témoignages
                  </TabsTrigger>
                  <TabsTrigger value="faqs" className="text-xs py-1">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    FAQ
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Comments Tab */}
            {activeTab === "comments" && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {sortedComments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32">
                      <p className="text-sm text-gray-500">
                        Aucun commentaire à afficher.
                      </p>
                    </div>
                  ) : (
                    sortedComments.map((comment) => (
                      <div key={comment.id} className="space-y-4">
                        <div className={`flex space-x-3 relative ${comment.pinned ? "p-3 border border-gray-200 rounded-lg bg-pink-50 bg-opacity-10" : ""}`}>
                          {comment.pinned && (
                            <div className="absolute top-0 left-0 px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full transform -translate-y-1/2">
                              Épinglé
                            </div>
                          )}
                          <div className={`w-10 h-10 rounded-full ${
                            comment.username === '@presentateur' 
                              ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                              : comment.username === '@participant' || isOwnContent(comment.userId)
                                ? 'bg-gradient-to-br from-green-400 to-blue-500' 
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
                                        {(isOwnContent(comment.userId) || comment.username === '@participant') && (
                                          <>
                                            <li 
                                              className="px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer"
                                              onClick={() => startEditComment(comment)}
                                            >
                                              <Edit size={14} />
                                              <span>Modifier</span>
                                            </li>
                                            <li 
                                              className="px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer text-red-500"
                                              onClick={() => deleteComment(comment.id)}
                                            >
                                              <Trash2 size={14} />
                                              <span>Supprimer</span>
                                            </li>
                                          </>
                                        )}
                                        <li 
                                          className="px-3 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                          <Flag size={14} />
                                          <span>Signaler</span>
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
                                    Annuler
                                  </Button>
                                  <Button 
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs text-blue-500 font-medium"
                                    onClick={saveEditComment}
                                  >
                                    Enregistrer
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
                                <span>{(comment.replies?.length || 0) > 0 ? comment.replies.length : "Répondre"}</span>
                              </Button>
                            </div>
                            
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="mt-3 pl-4 border-l-2 border-gray-100 space-y-3">
                                {comment.replies.map(reply => (
                                  <div key={reply.id} className="flex space-x-3">
                                    <div className={`w-8 h-8 rounded-full ${
                                      reply.username === '@presentateur' 
                                        ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                                        : reply.username === '@participant' || isOwnContent(reply.userId)
                                          ? 'bg-gradient-to-br from-green-400 to-blue-500' 
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
                                      </div>
                                      
                                      <p className="text-sm mt-1">{reply.text}</p>
                                      
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
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {currentUser ? (currentUser.isAnonymous ? 'A' : currentUser.name[0].toUpperCase()) : 'P'}
                      </span>
                    </div>
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder={
                        editingComment 
                          ? "Modifier votre commentaire..." 
                          : replyingTo 
                            ? `Répondre à ${comments.find(c => c.id === replyingTo)?.username}...` 
                            : "Ajouter un commentaire..."
                      }
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
              </>
            )}
            
            {/* Testimonials Tab */}
            {activeTab === "testimonials" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {testimonial.image ? (
                          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-lg font-bold text-white">
                            {testimonial.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{testimonial.name}</h4>
                              {testimonial.verified && (
                                <span className="inline-block rounded-full bg-blue-500 p-0.5 text-white">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                          <div className="flex mt-1 sm:mt-0">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                        <p className="mt-3 text-gray-700">{testimonial.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-2">Avez-vous participé à ce séminaire ?</p>
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    Ajouter votre témoignage
                  </Button>
                </div>
              </div>
            )}
            
            {/* FAQs Tab */}
            {activeTab === "faqs" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
                
                <div className="text-center py-4 mt-4 border-t border-gray-200">
                  <p className="text-gray-500 mb-2">Vous ne trouvez pas la réponse à votre question ?</p>
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    Contacter le support
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SeminarCommentsPanel;
