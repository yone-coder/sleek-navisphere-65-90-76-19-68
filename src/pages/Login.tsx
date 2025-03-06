
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Github, 
  Twitter, 
  Facebook, 
  Mail, 
  Apple, 
  ChevronLeft, 
  HelpCircle, 
  Eye,
  EyeOff,
  Lock,
  User,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [lastEmail, setLastEmail] = useState("");
  const [loginType, setLoginType] = useState<'email' | 'username'>('email');

  useEffect(() => {
    const savedEmail = localStorage.getItem("lastLoginEmail");
    if (savedEmail) {
      setLastEmail(savedEmail);
      setLoginIdentifier(savedEmail);
      setLoginType('email');
    }
  }, []);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginIdentifier || !password) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      if (loginType === 'email') {
        // Normal email login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginIdentifier,
          password,
        });

        if (error) throw error;

        if (rememberMe) {
          localStorage.setItem("lastLoginEmail", loginIdentifier);
        } else {
          localStorage.removeItem("lastLoginEmail");
        }

        toast({
          title: "Success",
          description: "You have been logged in successfully.",
        });
        navigate('/');
      } else {
        // Username login
        // For username login, we need to construct the email based on username
        // This should match the pattern used during signup
        const email = `${loginIdentifier.toLowerCase()}@example.com`;
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
      }
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

  const toggleLoginType = () => {
    setLoginType(loginType === 'email' ? 'username' : 'email');
    setLoginIdentifier(''); // Clear the input when switching types
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="px-2">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="hover:bg-gray-100 transition-colors rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
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
                className="hover:bg-gray-100 transition-colors rounded-full"
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
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="mt-2 text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {lastEmail && loginType === 'email' && (
              <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3 animate-fade-in">
                <User className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Welcome back!</p>
                  <p className="text-xs text-muted-foreground">{lastEmail}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setLastEmail("");
                    setLoginIdentifier("");
                    localStorage.removeItem("lastLoginEmail");
                  }}
                >
                  Change
                </Button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="w-full gap-2 relative overflow-hidden group bg-white"
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-red-500" />
                  <span className="bg-gradient-to-r from-blue-500 via-green-500 to-red-500 bg-clip-text text-transparent font-medium">
                    Google
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-green-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full gap-2 relative overflow-hidden group bg-white"
                onClick={() => handleSocialLogin('Apple')}
                disabled={isLoading}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <Apple className="h-4 w-4" />
                  <span className="font-medium">Apple</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="w-full gap-2 relative overflow-hidden group bg-black hover:bg-black/90"
                onClick={() => handleSocialLogin('Twitter')}
                disabled={isLoading}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <span className="font-bold text-white">𝕏</span>
                  <span className="text-white font-medium">Sign in</span>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full gap-2 relative overflow-hidden group bg-[#1877f2] hover:bg-[#1877f2]/90 border-none"
                onClick={() => handleSocialLogin('Facebook')}
                disabled={isLoading}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-white" />
                  <span className="text-white font-medium">Facebook</span>
                </div>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Button
                variant={loginType === 'email' ? 'default' : 'outline'}
                className={`w-full gap-2 relative overflow-hidden group ${
                  loginType === 'email' ? 'text-white' : ''
                }`}
                onClick={() => setLoginType('email')}
                disabled={isLoading}
              >
                {loginType === 'email' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                )}
                <div className="relative z-10 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </div>
              </Button>
              <Button
                variant={loginType === 'username' ? 'default' : 'outline'}
                className={`w-full gap-2 relative overflow-hidden group ${
                  loginType === 'username' ? 'text-white' : ''
                }`}
                onClick={() => setLoginType('username')}
                disabled={isLoading}
              >
                {loginType === 'username' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                )}
                <div className="relative z-10 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Username</span>
                </div>
              </Button>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loginIdentifier" className="flex items-center gap-2">
                    {loginType === 'email' ? (
                      <>
                        <Mail className="h-4 w-4" />
                        Email Address
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4" />
                        Username
                      </>
                    )}
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="loginIdentifier"
                      type={loginType === 'email' ? "email" : "text"}
                      placeholder={loginType === 'email' ? "name@example.com" : "Enter your username"}
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      required
                      className="pr-10"
                      disabled={isLoading}
                    />
                    {loginType === 'email' && loginIdentifier && !loginIdentifier.includes('@') && (
                      <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
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
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
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
                className="w-full relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10">
                  {isLoading ? "Signing in..." : "Sign in"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
