
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Github, Twitter, Facebook, Mail, Apple } from "lucide-react";

export default function Login() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    toast({
      title: t('auth.social_login_attempt'),
      description: `${t('auth.attempting_login_with')} ${provider}`,
    });
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast({
      title: t('auth.login_attempt'),
      description: t('auth.checking_credentials'),
    });
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{t('auth.welcome_back')}</h2>
          <p className="mt-2 text-muted-foreground">{t('auth.login_description')}</p>
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
                {t('auth.or_continue_with')}
              </span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">
                <Mail className="h-4 w-4 inline mr-2" />
                {t('auth.email')}
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
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {t('auth.forgot_password')}
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
                {t('auth.remember_me')}
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? t('auth.signing_in') : t('auth.sign_in')}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {t('auth.no_account')}{' '}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              {t('auth.sign_up')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
