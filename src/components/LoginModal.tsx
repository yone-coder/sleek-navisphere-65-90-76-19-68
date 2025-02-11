
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Twitter, Facebook, Linkedin, Mail, Google, Apple } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState<'login' | 'forgot' | 'register'>('login');

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // TODO: Implement actual social login logic
    toast({
      title: t('auth.social_login_attempt'),
      description: `${t('auth.attempting_login_with')} ${provider}`,
    });
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual login logic
    toast({
      title: t('auth.login_attempt'),
      description: t('auth.checking_credentials'),
    });
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: t('auth.error'),
        description: t('auth.email_required'),
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    // TODO: Implement actual password reset logic
    toast({
      title: t('auth.reset_email_sent'),
      description: t('auth.check_email_instructions'),
    });
    setTimeout(() => {
      setIsLoading(false);
      setView('login');
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] gap-6 p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {view === 'login' && t('auth.welcome_back')}
            {view === 'forgot' && t('auth.reset_password')}
            {view === 'register' && t('auth.create_account')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {view === 'login' && t('auth.login_description')}
            {view === 'forgot' && t('auth.reset_description')}
            {view === 'register' && t('auth.register_description')}
          </DialogDescription>
        </DialogHeader>

        {view === 'login' && (
          <>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => handleSocialLogin('Google')}
                  disabled={isLoading}
                >
                  <Google className="h-4 w-4" />
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

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
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
                    className="w-full"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t('auth.password')}</Label>
                    <Button
                      variant="link"
                      className="px-0 font-normal text-xs"
                      onClick={() => setView('forgot')}
                      type="button"
                      disabled={isLoading}
                    >
                      {t('auth.forgot_password')}
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pr-10"
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

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="text-sm">
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
            </div>

            <DialogFooter className="sm:justify-center">
              <p className="text-sm text-center text-muted-foreground">
                {t('auth.no_account')}{' '}
                <Button 
                  variant="link" 
                  className="px-0"
                  onClick={() => setView('register')}
                  disabled={isLoading}
                >
                  {t('auth.sign_up')}
                </Button>
              </p>
            </DialogFooter>
          </>
        )}

        {view === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">{t('auth.email')}</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? t('auth.sending') : t('auth.send_reset_link')}
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-full"
              onClick={() => setView('login')}
              disabled={isLoading}
            >
              {t('auth.back_to_login')}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
