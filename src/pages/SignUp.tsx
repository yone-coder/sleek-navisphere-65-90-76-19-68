
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, EyeOff, Mail, Apple, Info, ChevronLeft, Check, HelpCircle } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import zxcvbn from "zxcvbn";
import { supabase } from "@/integrations/supabase/client";

export default function SignUp() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [signupMethod, setSignupMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const passwordStrength = zxcvbn(password);
  const strengthColor = {
    0: "bg-red-500",
    1: "bg-orange-500",
    2: "bg-yellow-500",
    3: "bg-blue-500",
    4: "bg-green-500"
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendVerification = async () => {
    if (resendTimer > 0) {
      toast({
        title: "Please wait",
        description: `You can request another code in ${resendTimer} seconds.`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await supabase.functions.invoke('send-verification', {
        body: {
          method: signupMethod,
          email: signupMethod === 'email' ? email : undefined,
          phoneNumber: signupMethod === 'phone' ? phoneNumber : undefined,
        },
      });

      if (response.error) {
        // Check if error message contains rate limit information
        if (response.error.message?.toLowerCase().includes('rate limit')) {
          const waitSeconds = 42; // Default wait time
          setResendTimer(waitSeconds);
          throw new Error(`Please wait ${waitSeconds} seconds before requesting another code.`);
        }
        throw new Error(response.error.message || 'Failed to send verification code');
      }
      
      toast({
        title: "Verification code sent",
        description: `We've sent a verification code to ${signupMethod === 'email' ? email : phoneNumber}`,
      });
      
      setResendTimer(42);
      setStep(2);
    } catch (error: any) {
      console.error('Error sending verification:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    
    try {
      // Only verify the code with our edge function
      const verifyResponse = await supabase.functions.invoke('verify-code', {
        body: {
          method: signupMethod,
          contact: signupMethod === 'email' ? email : phoneNumber,
          code: verificationCode,
        },
      });

      if (verifyResponse.error) {
        throw new Error(verifyResponse.error.message || 'Verification failed');
      }

      console.log('Code verified successfully:', verifyResponse);

      toast({
        title: "Verification successful",
        description: "Your contact information has been verified.",
      });

      // Simply proceed to password step after verification
      setStep(3);
    } catch (error: any) {
      console.error('Verification error:', error);
      toast({
        title: "Verification failed",
        description: error.message || "Failed to verify code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    setIsLoading(true);
    
    try {
      // Sign up with email and password
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Success",
          description: "Your account has been created successfully.",
        });
        navigate('/');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'github' | 'google' | 'twitter' | 'facebook' | 'apple') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Social signup error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getPasswordStrengthText = () => {
    const texts = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    return texts[passwordStrength.score];
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => handleSocialSignUp("google")}
                disabled={isLoading}
              >
                <Mail className="h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => handleSocialSignUp("apple")}
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
                onClick={() => handleSocialSignUp("github")}
                disabled={isLoading}
              >
                <Github className="h-4 w-4" />
                Github
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => handleSocialSignUp("twitter")}
                disabled={isLoading}
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => handleSocialSignUp("facebook")}
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

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={signupMethod === 'email' ? 'default' : 'outline'}
                className="w-full gap-2"
                onClick={() => setSignupMethod('email')}
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
              <Button
                variant={signupMethod === 'phone' ? 'default' : 'outline'}
                className="w-full gap-2"
                onClick={() => setSignupMethod('phone')}
              >
                <svg 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone
              </Button>
            </div>

            {signupMethod === 'email' ? (
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="mt-1"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isLoading}
                  className="mt-1"
                />
              </div>
            )}

            <Button
              onClick={handleSendVerification}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
              disabled={(!email && !phoneNumber) || isLoading}
            >
              Send Verification Code
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-center block mb-4">
                Enter the verification code sent to {signupMethod === 'email' ? email : phoneNumber}
              </Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={setVerificationCode}
                  containerClassName="flex items-center gap-2"
                  className="flex items-center gap-2"
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-10 h-12 text-center text-lg border-2"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Didn't receive the code?{' '}
                {resendTimer > 0 ? (
                  <span className="text-muted-foreground">
                    Wait {resendTimer}s to resend
                  </span>
                ) : (
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-semibold" 
                    onClick={handleSendVerification}
                    disabled={isLoading || resendTimer > 0}
                  >
                    Resend
                  </Button>
                )}
              </p>
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
                onClick={handleVerifyCode}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
                disabled={verificationCode.length !== 6 || isLoading}
              >
                Verify
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="password">Create Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="pr-10"
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
                <div className="space-y-2 mt-2">
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

            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative mt-1">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="pr-10"
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

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
                disabled={!password || !confirmPassword || password !== confirmPassword || isLoading}
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="username">Choose Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="mt-1"
                placeholder="Enter your username"
              />
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

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep(3)}
                className="flex-1"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                onClick={handleEmailSignUp}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90"
                disabled={!username || !agreeToTerms || isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </div>
        );
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Get Started";
      case 2:
        return "Verify Your " + (signupMethod === 'email' ? 'Email' : 'Phone');
      case 3:
        return "Create Password";
      case 4:
        return "Complete Profile";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Join our community and start your journey";
      case 2:
        return "Enter the verification code we sent you";
      case 3:
        return "Choose a strong password to secure your account";
      case 4:
        return "Just a few more details to get started";
      default:
        return "";
    }
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
                <h1 className="text-lg font-semibold">Sign Up</h1>
                <p className="text-sm text-muted-foreground">Create your account</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  toast({
                    title: "Need help?",
                    description: "Contact our support team for assistance with creating your account.",
                  });
                }}
                className="hover:bg-gray-100 transition-colors rounded-full"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/login')}
                className="hidden sm:flex"
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 pb-24 pt-20">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              {getStepTitle()}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {getStepDescription()}
            </p>
          </div>

          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    s === step
                      ? "bg-primary text-primary-foreground"
                      : s < step
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {s < step ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    s
                  )}
                </div>
                {s < 4 && (
                  <div
                    className={`w-16 h-1 ${
                      s < step ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full gap-2 relative overflow-hidden group bg-white"
                  onClick={() => handleSocialSignUp('google')}
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
                  onClick={() => handleSocialSignUp('apple')}
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
                  onClick={() => handleSocialSignUp('twitter')}
                  disabled={isLoading}
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <span className="font-bold text-white">𝕏</span>
                    <span className="text-white font-medium">Sign up</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full gap-2 relative overflow-hidden group bg-[#1877f2] hover:bg-[#1877f2]/90 border-none"
                  onClick={() => handleSocialSignUp('facebook')}
                  disabled={isLoading}
                >
                  <div className="relative z-10 flex items-center gap-2">
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

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={signupMethod === 'email' ? 'default' : 'outline'}
                  className="w-full gap-2 relative overflow-hidden group"
                  onClick={() => setSignupMethod('email')}
                >
                  <Mail className="h-4 w-4" />
                  <span className="relative z-10">Email</span>
                  {signupMethod === 'email' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                  )}
                </Button>
                <Button
                  variant={signupMethod === 'phone' ? 'default' : 'outline'}
                  className="w-full gap-2 relative overflow-hidden group"
                  onClick={() => setSignupMethod('phone')}
                >
                  <svg 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="relative z-10">Phone</span>
                  {signupMethod === 'phone' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                  )}
                </Button>
              </div>

              {signupMethod === 'email' ? (
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="mt-1"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <svg 
                      className="h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isLoading}
                    className="mt-1"
                  />
                </div>
              )}

              <Button
                onClick={handleSendVerification}
                className="w-full relative overflow-hidden group"
                disabled={(!email && !phoneNumber) || isLoading}
              >
                <span className="relative z-10">
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="text-center block mb-4">
                  Enter the verification code sent to {signupMethod === 'email' ? email : phoneNumber}
                </Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={setVerificationCode}
                    containerClassName="flex items-center gap-2"
                    className="flex items-center gap-2"
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="w-10 h-12 text-center text-lg border-2"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Didn't receive the code?{' '}
                  {resendTimer > 0 ? (
                    <span className="text-muted-foreground">
                      Wait {resendTimer}s to resend
                    </span>
                  ) : (
                    <Button 
                      variant="link" 
                      className="p-0 h-auto font-semibold" 
                      onClick={handleSendVerification}
                      disabled={isLoading || resendTimer > 0}
                    >
                      Resend
                    </Button>
                  )}
                </p>
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
                  onClick={handleVerifyCode}
                  className="flex-1 relative overflow-hidden group"
                  disabled={verificationCode.length !== 6 || isLoading}
                >
                  <span className="relative z-10">
                    {isLoading ? "Verifying..." : "Verify"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="password">Create Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
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
                {password && (
                  <div className="space-y-2 mt-2">
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

              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  className="flex-1 relative overflow-hidden group"
                  disabled={!password || !confirmPassword || password !== confirmPassword || isLoading}
                >
                  <span className="relative z-10">Continue</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="username">Choose Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="mt-1"
                  placeholder="Enter your username"
                />
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

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(3)}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  onClick={handleEmailSignUp}
                  className="flex-1 relative overflow-hidden group"
                  disabled={!username || !agreeToTerms || isLoading}
                >
                  <span className="relative z-10">
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
