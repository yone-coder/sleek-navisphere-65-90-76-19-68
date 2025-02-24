
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageSquare, 
  MoreVertical, 
  Send, 
  Share2,
  Flag,
  Bookmark,
  Copy,
  SmilePlus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: string;
  likes: number;
  replies: number;
  timestamp: Date;
  isLiked?: boolean;
  isSaved?: boolean;
  isPinned?: boolean;
}

const mockComments: Comment[] = [
  {
    id: "1",
    user: {
      name: "Sarah Wilson",
      avatar: "https://storage.googleapis.com/a1aa/image/u9QlGEQDPW0dq8Wric7AsU_j7PkzMnKLIgLMlSRCv5I.jpg",
      isVerified: true
    },
    content: "This tournament looks amazing! Can't wait to participate 🎮",
    likes: 234,
    replies: 12,
    timestamp: new Date("2024-02-28T10:00:00"),
    isPinned: true
  },
  {
    id: "2",
    user: {
      name: "Alex Chen",
      avatar: "https://storage.googleapis.com/a1aa/image/iG3N08MIvjY6mNComFBnnpKsPY-e90lt6EILTZH3NF8.jpg"
    },
    content: "The prize pool is insane! Good luck everyone 🏆",
    likes: 156,
    replies: 8,
    timestamp: new Date("2024-02-28T09:45:00")
  }
];

interface TournamentCommentsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TournamentCommentsPanel({ open, onOpenChange }: TournamentCommentsPanelProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");
  const { toast } = useToast();

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const isLiked = !comment.isLiked;
        return {
          ...comment,
          likes: isLiked ? comment.likes + 1 : comment.likes - 1,
          isLiked
        };
      }
      return comment;
    }));
  };

  const handleSaveComment = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const isSaved = !comment.isSaved;
        toast({
          title: isSaved ? "Comment saved" : "Comment unsaved",
          duration: 2000,
        });
        return { ...comment, isSaved };
      }
      return comment;
    }));
  };

  const handleCopyComment = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Comment copied to clipboard",
      duration: 2000,
    });
  };

  const handleReportComment = (commentId: string) => {
    toast({
      title: "Comment reported",
      description: "We'll review this comment soon",
      duration: 2000,
    });
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const newCommentObj: Comment = {
        id: Date.now().toString(),
        user: {
          name: "You",
          avatar: "https://github.com/shadcn.png"
        },
        content: newComment,
        likes: 0,
        replies: 0,
        timestamp: new Date(),
        isLiked: false
      };

      setComments(prev => [newCommentObj, ...prev]);
      setNewComment("");
      toast({
        title: "Comment posted successfully",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "newest") {
      return b.timestamp.getTime() - a.timestamp.getTime();
    }
    return b.likes - a.likes;
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[90vh] p-0 border-t-0 rounded-t-[10px] overflow-hidden"
      >
        <SheetHeader className="h-14 px-4 flex-row items-center justify-between border-b sticky top-0 bg-background/80 backdrop-blur-lg z-10">
          <div className="flex items-center gap-4">
            <SheetTitle className="text-base">Comments ({comments.length})</SheetTitle>
            <div className="flex gap-2">
              {["newest", "popular"].map((option) => (
                <Button
                  key={option}
                  variant="ghost"
                  size="sm"
                  onClick={() => setSortBy(option as "newest" | "popular")}
                  className={cn(
                    "text-xs rounded-full px-3",
                    sortBy === option && "bg-primary text-primary-foreground"
                  )}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </SheetHeader>

        <div className="flex flex-col h-[calc(90vh-3.5rem)]">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 py-4">
              {sortedComments.map((comment) => (
                <div key={comment.id} className="flex gap-3 group animate-fade-in">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{comment.user.name}</span>
                      {comment.user.isVerified && (
                        <Badge variant="secondary" className="h-4 px-1 bg-blue-500/10 text-blue-500">
                          <span className="text-[10px]">Verified</span>
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(comment.timestamp), 'MMM d, h:mm a')}
                      </span>
                    </div>
                    {comment.isPinned && (
                      <Badge variant="secondary" className="mb-1">
                        Pinned by moderator
                      </Badge>
                    )}
                    <p className="text-sm leading-relaxed">{comment.content}</p>
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                          "px-0 h-auto font-normal",
                          comment.isLiked && "text-pink-500"
                        )}
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <Heart className={cn(
                          "h-4 w-4 mr-1",
                          comment.isLiked && "fill-current"
                        )} />
                        {comment.likes}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="px-0 h-auto font-normal"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {comment.replies}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "px-0 h-auto font-normal",
                          comment.isSaved && "text-blue-500"
                        )}
                        onClick={() => handleSaveComment(comment.id)}
                      >
                        <Bookmark className={cn(
                          "h-4 w-4",
                          comment.isSaved && "fill-current"
                        )} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-0 h-auto font-normal"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleCopyComment(comment.content)}>
                            <Copy className="h-4 w-4 mr-2" /> Copy text
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReportComment(comment.id)}>
                            <Flag className="h-4 w-4 mr-2" /> Report comment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="sticky bottom-0 p-4 border-t bg-background/80 backdrop-blur-lg">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center gap-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="min-h-0 h-10 resize-none py-2.5"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:bg-muted"
                >
                  <SmilePlus className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  size="icon"
                  disabled={!newComment.trim() || isSubmitting}
                  onClick={handleSubmitComment}
                  className={cn(
                    "rounded-full transition-colors",
                    newComment.trim() 
                      ? "bg-blue-500 hover:bg-blue-600" 
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
