
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, X, Eye, EyeOff, Github, Twitter, Facebook, Apple, Info, User } from "lucide-react";
import zxcvbn from "zxcvbn";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [signupMethod, setSignupMethod] = useState<'email' | 'username'>('email');
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const passwordStrength = zxcvbn(password);
  const strengthColor = {
    0: "bg-red-500",
    1: "bg-orange-500",
    2: "bg-yellow-500",
    3: "bg-blue-500",
    4: "bg-green-500"
  };

  const handleSocialSignUp = (provider: string) => {
    setIsLoading(true);
    toast({
      title: "Connecting to " + provider,
      description: "Redirecting to " + provider + " authentication...",
    });
    // TODO: Implement actual social auth
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleEmailSignUp = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // TODO: Implement actual signup logic
    toast({
      title: "Verification email sent",
      description: "Please check your inbox to verify your email address.",
    });
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  const getPasswordStrengthText = () => {
    const texts = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    return texts[passwordStrength.score];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] gap-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            {step === 1 ? "Create Account" : "Complete Profile"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {step === 1 
              ? "Join our community and start your journey"
              : "Just a few more details to get started"
            }
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => handleSocialSignUp("Google")}
                  disabled={isLoading}
                >
                  <Github className="h-4 w-4" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => handleSocialSignUp("Apple")}
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
                  onClick={() => handleSocialSignUp("Github")}
                  disabled={isLoading}
                >
                  <Github className="h-4 w-4" />
                  Github
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => handleSocialSignUp("Twitter")}
                  disabled={isLoading}
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => handleSocialSignUp("Facebook")}
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
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <Button
                  variant={signupMethod === 'email' ? 'default' : 'outline'}
                  className={`w-full gap-2 relative overflow-hidden group ${
                    signupMethod === 'email' ? 'text-white' : ''
                  }`}
                  onClick={() => setSignupMethod('email')}
                  disabled={isLoading}
                >
                  {signupMethod === 'email' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>Email</span>
                  </div>
                </Button>
                <Button
                  variant={signupMethod === 'username' ? 'default' : 'outline'}
                  className={`w-full gap-2 relative overflow-hidden group ${
                    signupMethod === 'username' ? 'text-white' : ''
                  }`}
                  onClick={() => setSignupMethod('username')}
                  disabled={isLoading}
                >
                  {signupMethod === 'username' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Username</span>
                  </div>
                </Button>
              </div>

              <div className="space-y-4">
                {signupMethod === 'email' ? (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="bg-background"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="usernameInput">Username</Label>
                    <Input
                      id="usernameInput"
                      type="text"
                      placeholder="Choose a unique username"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      disabled={isLoading}
                      className="bg-background"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="pr-10 bg-background"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {password && (
                    <div className="space-y-2">
                      <Progress 
                        value={(passwordStrength.score + 1) * 20} 
                        className={`h-1 ${strengthColor[passwordStrength.score as keyof typeof strengthColor]}`}
                      />
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        Password strength: {getPasswordStrengthText()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      className="pr-10 bg-background"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    disabled={isLoading}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
                disabled={
                  (signupMethod === 'email' && !email) || 
                  (signupMethod === 'username' && !usernameInput) || 
                  !password || 
                  !confirmPassword || 
                  !agreeToTerms || 
                  isLoading
                }
              >
                Continue
              </Button>
            </div>

            <DialogFooter className="sm:justify-center">
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{' '}
                <Button variant="link" className="px-0" onClick={onClose} disabled={isLoading}>
                  Sign in
                </Button>
              </p>
            </DialogFooter>
          </>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                onClick={handleEmailSignUp}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
                disabled={!username || isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
