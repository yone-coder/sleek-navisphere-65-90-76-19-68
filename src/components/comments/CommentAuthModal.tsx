
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, UserRound, SmilePlus, LogIn, UserPlus } from "lucide-react";

interface CommentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGuestComment: (name: string | null) => void;
  onLogin: () => void;
  onSignup: () => void;
}

const CommentAuthModal: React.FC<CommentAuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onGuestComment,
  onLogin,
  onSignup
}) => {
  const [guestName, setGuestName] = useState("");
  const [activeTab, setActiveTab] = useState("guest");

  const handleGuestComment = (isAnonymous: boolean = false) => {
    if (isAnonymous) {
      onGuestComment(null);
    } else if (guestName.trim()) {
      onGuestComment(guestName);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Continue to comment</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="guest">Comment as Guest</TabsTrigger>
            <TabsTrigger value="account">Use Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guest" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer" 
                   onClick={() => setActiveTab("name")}>
                <div className="flex items-center">
                  <UserRound className="h-5 w-5 mr-3 text-blue-500" />
                  <span>Comment with your name</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                   onClick={() => handleGuestComment(true)}>
                <div className="flex items-center">
                  <SmilePlus className="h-5 w-5 mr-3 text-orange-500" />
                  <span>Comment anonymously</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="name" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <Input
                placeholder="Enter your name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
              <Button 
                onClick={() => handleGuestComment()}
                disabled={!guestName.trim()}
              >
                Continue
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab("guest")}
              >
                Back
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <Button 
                className="w-full justify-start" 
                onClick={onLogin}
              >
                <LogIn className="h-5 w-5 mr-2" />
                Sign in to comment
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={onSignup}
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Sign up for an account
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentAuthModal;
