
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, MoreVertical, Send, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  replies: number;
  timestamp: Date;
  isLiked?: boolean;
}

const mockComments: Comment[] = [
  {
    id: "1",
    user: {
      name: "Sarah Wilson",
      avatar: "https://storage.googleapis.com/a1aa/image/u9QlGEQDPW0dq8Wric7AsU_j7PkzMnKLIgLMlSRCv5I.jpg"
    },
    content: "This tournament looks amazing! Can't wait to participate 🎮",
    likes: 234,
    replies: 12,
    timestamp: new Date("2024-02-28T10:00:00"),
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
    timestamp: new Date("2024-02-28T09:45:00"),
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[90vh] p-0 border-t-0 rounded-t-[10px] overflow-hidden"
      >
        <SheetHeader className="h-14 px-4 flex-row items-center justify-between border-b sticky top-0 bg-background/80 backdrop-blur-lg">
          <SheetTitle className="text-base">Comments ({comments.length})</SheetTitle>
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
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 group animate-fade-in">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.avatar} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{comment.user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(comment.timestamp), 'MMM d, h:mm a')}
                      </span>
                    </div>
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
