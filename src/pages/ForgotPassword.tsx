
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  ChevronLeft, 
  HelpCircle, 
  ShieldQuestion,
  Check,
  AlertCircle,
  RefreshCw,
  Lock,
  Phone,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

type RecoveryMethod = "email" | "phone";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"method" | "sent">("method");
  const [recoveryMethod, setRecoveryMethod] = useState<RecoveryMethod>("email");
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(regex.test(email));
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^\+?[1-9]\d{1,14}$/;
    setPhoneValid(regex.test(phone));
    return regex.test(phone);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    validatePhone(newPhone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (recoveryMethod === "email" && !validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (recoveryMethod === "phone" && !validatePhone(phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (recoveryMethod === "email") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
      } else {
        // Here we would integrate with SMS service
        // For now, we'll simulate success
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setStep("sent");
      toast({
        title: `Recovery ${recoveryMethod === 'email' ? 'link' : 'code'} sent!`,
        description: `Check your ${recoveryMethod} for the recovery ${recoveryMethod === 'email' ? 'link' : 'code'}.`,
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
                <h1 className="text-lg font-semibold">Reset Password</h1>
                <p className="text-sm text-muted-foreground">Recover your account</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  toast({
                    title: "Need help?",
                    description: "Contact our support team for assistance with password recovery.",
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
                Back to login
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 pb-24 pt-20">
        <div className="max-w-md w-full space-y-8">
          {step === "method" ? (
            <>
              <div className="text-center space-y-2">
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShieldQuestion className="h-8 w-8 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  Forgot Your Password?
                </h2>
                <p className="text-muted-foreground">
                  No worries! Choose how you want to reset your password.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button
                  variant={recoveryMethod === 'email' ? 'default' : 'outline'}
                  className={`w-full gap-2 relative overflow-hidden group ${
                    recoveryMethod === 'email' ? 'text-white' : ''
                  }`}
                  onClick={() => setRecoveryMethod('email')}
                >
                  {recoveryMethod === 'email' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                </Button>
                <Button
                  variant={recoveryMethod === 'phone' ? 'default' : 'outline'}
                  className={`w-full gap-2 relative overflow-hidden group ${
                    recoveryMethod === 'phone' ? 'text-white' : ''
                  }`}
                  onClick={() => setRecoveryMethod('phone')}
                >
                  {recoveryMethod === 'phone' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Phone</span>
                  </div>
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {recoveryMethod === "email" ? (
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={handleEmailChange}
                        className={cn(
                          "pr-10 transition-all duration-200",
                          emailValid && "border-green-500 focus-visible:ring-green-500"
                        )}
                        disabled={isLoading}
                      />
                      {email && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {emailValid ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={handlePhoneChange}
                        className={cn(
                          "pr-10 transition-all duration-200",
                          phoneValid && "border-green-500 focus-visible:ring-green-500"
                        )}
                        disabled={isLoading}
                      />
                      {phone && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {phoneValid ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full relative overflow-hidden group"
                  disabled={!(recoveryMethod === "email" ? emailValid : phoneValid) || isLoading}
                >
                  <div className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Sending Recovery {recoveryMethod === 'email' ? 'Link' : 'Code'}...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        <span>Reset Password</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>

                <div className="text-center">
                  <Button
                    variant="link"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => navigate('/login')}
                  >
                    Back to login
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
                  Check Your {recoveryMethod === 'email' ? 'Email' : 'Phone'}
                </h2>
                <p className="text-muted-foreground">
                  We've sent recovery instructions to <br />
                  <span className="font-medium text-foreground">
                    {recoveryMethod === 'email' ? email : phone}
                  </span>
                </p>
              </div>

              <div className="space-y-4">
                {recoveryMethod === 'email' && (
                  <Button 
                    onClick={() => window.open("https://mail.google.com", "_blank")}
                    className="w-full"
                    variant="outline"
                  >
                    Open Gmail
                  </Button>
                )}
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the {recoveryMethod === 'email' ? 'email' : 'SMS'}?
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setStep("method")}
                    className="text-sm"
                  >
                    Try another {recoveryMethod}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
