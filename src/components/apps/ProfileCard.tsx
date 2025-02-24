
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface UserProfile {
  name: string;
  email: string;
  subtitle: string;
  avatar: string;
  unreadNotifications?: number;
  lastSeen?: string;
  status?: "online" | "offline" | "away";
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
        // Get user profile data from auth metadata or user table
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser({
          name: profile?.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          subtitle: "Tap to view your profile",
          avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || "https://github.com/shadcn.png",
          unreadNotifications: 3, // Mock data
          lastSeen: "Just now",
          status: "online"
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUser({
          name: session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          subtitle: "Tap to view your profile",
          avatar: session.user.user_metadata?.avatar_url || "https://github.com/shadcn.png",
          unreadNotifications: 3, // Mock data
          lastSeen: "Just now",
          status: "online"
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

  const getStatusColor = (status: UserProfile["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container px-4 py-2">
      <button 
        onClick={handleClick}
        className="group relative flex items-center w-full p-4 hover:bg-muted/60 transition-colors duration-200 rounded-lg border border-border/50 hover:border-border"
      >
        <div className="relative">
          <Avatar className="h-12 w-12 ring-2 ring-primary/10">
            {isAuthenticated && user ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-muted-foreground/10">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted-foreground/60"
                >
                  <path 
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </AvatarFallback>
            )}
            {isAuthenticated && user?.status && (
              <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(user.status)} ring-2 ring-background`} />
            )}
          </Avatar>
          {isAuthenticated && user?.unreadNotifications ? (
            <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 min-w-[20px] flex items-center justify-center">
              {user.unreadNotifications}
            </Badge>
          ) : null}
        </div>

        <div className="flex flex-col items-start ml-4 flex-1 min-w-0">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-2 w-full">
                <span className="text-sm font-medium truncate">{user.name}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">• {user.lastSeen}</span>
              </div>
              <span className="text-xs text-muted-foreground">{user.subtitle}</span>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">Sign in</span>
              <span className="text-xs text-muted-foreground">Access your account and data</span>
            </>
          )}
        </div>

        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="h-8 w-8 group-hover:translate-x-0.5 transition-transform duration-300">
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
