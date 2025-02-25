
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Twitter, Facebook, Mail, Apple, ChevronLeft, HelpCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider.toLowerCase() as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      toast({
        title: "Redirecting to provider",
        description: `Please complete the ${provider} login process.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "You have been logged in successfully.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Sign In</h1>
                <p className="text-sm text-muted-foreground">Access your account</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  toast({
                    title: "Need help?",
                    description: "Contact our support team for assistance with signing in.",
                  });
                }}
                className="hover:bg-gray-100 transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/signup')}
                className="hidden sm:flex"
              >
                Create account
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 pb-24 pt-20">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="mt-2 text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
              >
                <Mail className="h-4 w-4" />
                Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => handleSocialLogin('Apple')}
                disabled={isLoading}
              >
                <Apple className="h-4 w-4" />
                Apple
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => handleSocialLogin('Github')}
                disabled={isLoading}
              >
                <Github className="h-4 w-4" />
                Github
              </Button>
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => handleSocialLogin('Twitter')}
                disabled={isLoading}
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => handleSocialLogin('Facebook')}
                disabled={isLoading}
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div>
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  disabled={isLoading}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  disabled={isLoading}
                />
                <Label htmlFor="remember" className="ml-2 text-sm">
                  Remember me
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
