
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle, CheckCircle, DollarSign, CreditCard, ArrowRight, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

const SimpleDepositPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPaymentUrl('');

    try {
      // Validate amount
      if (!amount || isNaN(Number(amount)) || parseFloat(amount) <= 0) {
        throw new Error('Please enter a valid amount');
      }

      // Step 1: Get access token
      const tokenResponse = await fetch('https://moncash-backend.onrender.com/api/get-token', {
        method: 'POST',
      });
      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok || !tokenData.accessToken) {
        throw new Error(tokenData.error || 'Failed to get access token');
      }
      const accessToken = tokenData.accessToken;

      // Step 2: Create payment
      const paymentResponse = await fetch('https://moncash-backend.onrender.com/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          amount: parseFloat(amount),
        }),
      });
      const paymentData = await paymentResponse.json();
      if (!paymentResponse.ok || !paymentData.paymentUrl) {
        throw new Error(paymentData.error || 'Failed to create payment');
      }

      // Step 3: Set payment URL and redirect
      setPaymentUrl(paymentData.paymentUrl);
      window.open(paymentData.paymentUrl, '_blank'); // Opens payment URL in a new tab
      toast({
        title: "Payment Window Opened",
        description: "Please complete your payment in the new tab",
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred while processing the payment');
      toast({
        title: "Error",
        description: err.message || "An error occurred while processing the payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Deposit Funds</h1>
          <p className="mt-2 text-gray-600">Securely add funds to your account using MonCash</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg border-0 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-500" />
            
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                <span>Make a Payment with MonCash</span>
              </CardTitle>
              <CardDescription>
                Fill in the amount you wish to deposit
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-6">
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm font-medium">Amount (HTG)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="pl-10"
                      required
                      min="1"
                      step="0.01"
                      disabled={loading}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enter the amount you want to deposit in Haitian Gourdes</p>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay Now <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
              
              {paymentUrl && (
                <div className="mt-6 bg-green-50 border border-green-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-800 text-sm">Payment URL Generated</h4>
                      <p className="text-xs text-green-700 mt-1">Your payment has been prepared. A new tab should have opened to complete your transaction.</p>
                      <div className="mt-2 bg-white p-2 rounded border border-green-200">
                        <a 
                          href={paymentUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs break-all text-blue-600 hover:underline"
                        >
                          {paymentUrl}
                        </a>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 text-xs"
                        onClick={() => window.open(paymentUrl, '_blank')}
                      >
                        Open Payment Page Again
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="bg-gray-50 border-t pt-4 flex items-center text-xs text-gray-500">
              <Shield className="h-3 w-3 mr-1 text-purple-600" />
              Secure and encrypted payment process
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SimpleDepositPage;
