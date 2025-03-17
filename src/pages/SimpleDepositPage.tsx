
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle, CheckCircle, DollarSign, CreditCard, ArrowRight, Shield, Sparkles, Clock, ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const SimpleDepositPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string>('');
  const [hoveredAmount, setHoveredAmount] = useState<string | null>(null);
  const { toast } = useToast();

  const predefinedAmounts = ['50', '100', '200', '500', '1000'];

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

  const setAmountWithAnimation = (value: string) => {
    setHoveredAmount(value);
    setTimeout(() => {
      setAmount(value);
      setHoveredAmount(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Deposit Funds
          </h1>
          <p className="mt-3 text-gray-400">Securely add funds to your account using MonCash</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-500" />
            
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <CreditCard className="h-5 w-5 text-purple-400" />
                <span>Make a Payment with MonCash</span>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill in the amount you wish to deposit
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-6">
              {error && (
                <Alert variant="destructive" className="mb-6 bg-red-900/40 border border-red-800 text-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {predefinedAmounts.map((presetAmount) => (
                    <motion.div 
                      key={presetAmount}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        type="button" 
                        onClick={() => setAmountWithAnimation(presetAmount)}
                        variant="outline"
                        className={`w-full relative overflow-hidden ${
                          amount === presetAmount ? 'bg-purple-900/30 border-purple-500 text-purple-300' : 'bg-gray-800 border-gray-700 text-gray-300'
                        }`}
                      >
                        {hoveredAmount === presetAmount && (
                          <motion.div 
                            className="absolute inset-0 bg-purple-600/20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                        {presetAmount}
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm font-medium text-gray-300">Custom Amount (HTG)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
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
                  className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
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
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity hover:opacity-100"></div>
                </Button>
              </form>
              
              <AnimatePresence>
                {paymentUrl && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 overflow-hidden"
                  >
                    <div className="bg-gray-800/80 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-green-400 text-sm">Payment URL Generated</h4>
                          <p className="text-xs text-gray-400 mt-1">Your payment has been prepared. A new tab should have opened to complete your transaction.</p>
                          <div className="mt-2 bg-black/50 p-2 rounded border border-gray-700">
                            <a 
                              href={paymentUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs break-all text-blue-400 hover:text-blue-300 hover:underline"
                            >
                              {paymentUrl}
                            </a>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 text-xs bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                            onClick={() => window.open(paymentUrl, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" /> Open Payment Page Again
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
            
            <Separator className="bg-gray-800" />
            
            <CardFooter className="bg-gray-900/80 pt-4 flex flex-col space-y-3">
              <div className="grid grid-cols-2 gap-2 w-full">
                <div className="flex items-center text-xs text-gray-500 bg-gray-800/50 rounded-md p-2">
                  <Shield className="h-3 w-3 mr-1 text-purple-400" />
                  Secure encryption
                </div>
                <div className="flex items-center text-xs text-gray-500 bg-gray-800/50 rounded-md p-2">
                  <Clock className="h-3 w-3 mr-1 text-purple-400" />
                  Quick processing
                </div>
              </div>
              <div className="w-full text-center pt-2">
                <p className="text-xs text-gray-500 flex items-center justify-center">
                  <Sparkles className="h-3 w-3 mr-1 text-purple-400" />
                  Powered by MonCash Payment Gateway
                </p>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SimpleDepositPage;
