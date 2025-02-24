
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell, ChevronRight, LogOut, Settings, Shield, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface UserProfile {
  name: string;
  email: string;
  subtitle: string;
  avatar: string;
  unreadNotifications?: number;
}

export const ProfileCard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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

        // Mock unread notifications count - replace with real data
        const unreadNotifications = 3;

        setUser({
          name: profile?.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          subtitle: "Manage your account",
          avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url || "https://github.com/shadcn.png",
          unreadNotifications,
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
          subtitle: "Manage your account",
          avatar: session.user.user_metadata?.avatar_url || "https://github.com/shadcn.png",
          unreadNotifications: 3, // Mock data
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

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Successfully signed out");
      navigate('/login');
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const menuItems = [
    { icon: User, label: "View Profile", onClick: () => navigate('/profile') },
    { icon: Settings, label: "Settings", onClick: () => navigate('/profile?tab=settings') },
    { icon: Bell, label: "Notifications", onClick: () => navigate('/profile?tab=notifications') },
    { icon: Shield, label: "Security", onClick: () => navigate('/profile?tab=security') },
  ];

  return (
    <div className="container px-4 py-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            className="flex items-center gap-3 w-full py-2 hover:bg-muted/60 transition-colors duration-200 rounded-lg group"
          >
            <div className="relative">
              <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                {isAuthenticated && user ? (
                  <AvatarImage src={user.avatar} alt={user.name} />
                ) : (
                  <AvatarFallback className="bg-muted-foreground/10">
                    <User className="h-5 w-5 text-muted-foreground/60" />
                  </AvatarFallback>
                )}
              </Avatar>
              {isAuthenticated && user?.unreadNotifications ? (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[11px] font-medium text-primary-foreground flex items-center justify-center ring-2 ring-background">
                  {user.unreadNotifications}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col items-start">
              {isAuthenticated && user ? (
                <>
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.subtitle}</span>
                </>
              ) : (
                <>
                  <span className="text-sm font-medium">Sign in</span>
                  <span className="text-xs text-muted-foreground">Access your account</span>
                </>
              )}
            </div>
            <div className="ml-auto">
              <ChevronRight className="h-5 w-5 text-muted-foreground/70 group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
          </button>
        </DropdownMenuTrigger>
        {isAuthenticated && (
          <DropdownMenuContent align="end" className="w-56">
            {menuItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={item.onClick}
                className="flex items-center gap-2 cursor-pointer"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
};
