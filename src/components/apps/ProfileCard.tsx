
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Shield, User } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  subtitle: string;
  avatar: string;
  verificationStatus?: "verified" | "non_verified";
}

export const ProfileCard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setIsAuthenticated(true);
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser({
          name: profile?.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          subtitle: "Apple Account, iCloud, and more",
          avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || "https://github.com/shadcn.png",
          verificationStatus: "verified" // Mock status
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUser({
          name: session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          subtitle: "Apple Account, iCloud, and more",
          avatar: session.user.user_metadata?.avatar_url || "https://github.com/shadcn.png",
          verificationStatus: "verified" // Mock status
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const getVerificationBadge = (status: UserProfile["verificationStatus"]) => {
    switch (status) {
      case "verified":
        return (
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-xs">Verified</span>
          </div>
        );
      case "non_verified":
        return (
          <div className="flex items-center gap-1 text-muted-foreground/70">
            <Shield className="h-3.5 w-3.5" />
            <span className="text-xs">Not Verified</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container px-4 py-2">
      <button 
        onClick={handleClick}
        className="group flex items-center gap-3 w-full py-2 hover:bg-muted/60 transition-all duration-200 rounded-lg"
      >
        <Avatar className="h-10 w-10 ring-2 ring-primary/5">
          {isAuthenticated && user ? (
            <AvatarImage src={user.avatar} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-muted-foreground/10">
              <User className="h-5 w-5 text-muted-foreground/60" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col items-start min-w-0">
          <div className="flex items-center gap-2 w-full">
            <span className="text-sm font-medium truncate">{isAuthenticated && user ? user.name : "Sign in"}</span>
            {isAuthenticated && user?.verificationStatus && (
              getVerificationBadge(user.verificationStatus)
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {isAuthenticated && user ? user.subtitle : "Access your account and data"}
          </span>
        </div>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-muted-foreground/70"
            >
              <path 
                d="M9 18L15 12L9 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </button>
    </div>
  );
};
