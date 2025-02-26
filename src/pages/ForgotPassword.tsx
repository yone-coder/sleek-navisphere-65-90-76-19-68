
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Reset link sent",
      description: "If an account exists with this email, you will receive a password reset link.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Reset Password</h1>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Forgot your password?</h2>
            <p className="mt-2 text-gray-600">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90">
              Send Reset Link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
