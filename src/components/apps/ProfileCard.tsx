
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { UserRound } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  subtitle: string;
  avatar: string;
  unreadNotifications?: number;
  lastSeen?: string;
  status?: "online" | "away" | "offline";
  role?: string;
  recentActivity?: string;
}

export const ProfileCard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
          subtitle: "Tap to manage your profile",
          avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || "https://github.com/shadcn.png",
          unreadNotifications: 3,
          lastSeen: "Just now",
          status: "online",
          role: "Premium Member",
          recentActivity: "Updated profile 2m ago"
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
          subtitle: "Tap to manage your profile",
          avatar: session.user.user_metadata?.avatar_url || "https://github.com/shadcn.png",
          unreadNotifications: 3,
          lastSeen: "Just now",
          status: "online",
          role: "Premium Member",
          recentActivity: "Updated profile 2m ago"
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center w-full py-2 hover:bg-muted/60 transition-all duration-300 rounded-lg"
      >
        <div className="relative flex-shrink-0">
          <Avatar className={`h-12 w-12 transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}>
            {isAuthenticated && user ? (
              <AvatarImage 
                src={user.avatar} 
                alt={user.name}
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="bg-muted-foreground/10">
                <UserRound className="h-6 w-6 text-muted-foreground/60" />
              </AvatarFallback>
            )}
            {isAuthenticated && user?.status && (
              <span 
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusColor(user.status)} ring-2 ring-background transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} 
              />
            )}
          </Avatar>
          {isAuthenticated && user?.unreadNotifications ? (
            <Badge 
              variant="secondary" 
              className={`absolute -top-2 -right-2 h-5 min-w-[20px] flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-110 bg-primary text-primary-foreground' : ''}`}
            >
              {user.unreadNotifications}
            </Badge>
          ) : null}
        </div>

        <div className="flex flex-col items-start ml-4 flex-1 min-w-0">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-2 w-full">
                <span className="text-sm font-medium truncate">{user.name}</span>
                {user.role && (
                  <Badge 
                    variant="secondary" 
                    className={`text-[10px] transition-colors duration-300 ${isHovered ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    {user.role}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="truncate">{user.subtitle}</span>
                {user.lastSeen && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                    <span className="whitespace-nowrap">{user.lastSeen}</span>
                  </>
                )}
              </div>
              {user.recentActivity && (
                <span className="text-[10px] text-muted-foreground/70 mt-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  {user.recentActivity}
                </span>
              )}
            </>
          ) : (
            <>
              <span className="text-sm font-medium">Sign in</span>
              <span className="text-xs text-muted-foreground">Access your account and data</span>
            </>
          )}
        </div>

        <div className="ml-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
          >
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
