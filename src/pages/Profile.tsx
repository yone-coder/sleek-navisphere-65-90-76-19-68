
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfile {
  full_name: string | null;
  avatar_url: string | null;
  email: string;
}

export default function Profile() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      setProfile({
        full_name: data?.full_name || session.user.email?.split('@')[0] || 'User',
        avatar_url: data?.avatar_url || session.user.user_metadata?.avatar_url || "https://github.com/shadcn.png",
        email: session.user.email || '',
      });
    };

    checkAuth();
  }, [navigate]);

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen px-6 py-8 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar_url} alt={profile.full_name || ''} />
            <AvatarFallback>{profile.full_name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{profile.full_name}</h1>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">{t('profile.settings')}</h2>
          {/* Add more profile settings here */}
        </div>
      </div>
    </div>
  );
}
