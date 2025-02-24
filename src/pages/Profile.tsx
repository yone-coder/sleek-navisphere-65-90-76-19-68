
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Camera, ChevronRight, LogOut, Mail, Settings, Shield, User } from "lucide-react";

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen animate-fade-in bg-gradient-to-b from-background to-secondary/10">
      {/* Header Section */}
      <div className="relative h-48 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-xl">
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
              <AvatarImage src={profile.avatar_url} alt={profile.full_name || ''} />
              <AvatarFallback>{profile.full_name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-primary shadow-lg" variant="default">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl px-4 pt-20">
        {/* Profile Info */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-1">{profile.full_name}</h1>
          <p className="text-muted-foreground">{profile.email}</p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 gap-4 h-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={profile.full_name || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={profile.email} disabled />
                </div>
                <Button className="w-full">Save Changes</Button>
              </CardContent>
            </Card>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {[
                { icon: User, label: "Personal Information", href: "#" },
                { icon: Settings, label: "Preferences", href: "#" },
                { icon: Mail, label: "Email Settings", href: "#" },
                { icon: Shield, label: "Privacy", href: "#" },
              ].map((item, index) => (
                <Card key={index} className="group hover:shadow-md transition-all">
                  <button className="w-full" onClick={() => navigate(item.href)}>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    </CardContent>
                  </button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Two-Factor Authentication
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="mr-2 h-4 w-4" />
                    Push Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sign Out Button */}
        <div className="mt-8 pb-8">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
