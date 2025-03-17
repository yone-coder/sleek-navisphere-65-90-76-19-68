
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle, CheckCircle, DollarSign, CreditCard, ArrowRight, Shield, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { callEdgeFunction } from '@/utils/supabaseEdgeFunctions';

const DepositPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('10');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const { toast } = useToast();

  const handleGetToken = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await callEdgeFunction<{ accessToken: string }>('get-token');
      setAccessToken(data.accessToken);
      setStep(2);
      toast({
        title: "Success",
        description: "Access token obtained successfully",
      });
    } catch (error: any) {
      console.error('Error getting token:', error);
      setError(`Failed to get access token: ${error.message}`);
      toast({
        title: "Error",
        description: error.message || "Failed to get access token",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePayment = async () => {
    if (!accessToken) {
      toast({
        title: "Error",
        description: "Please get an access token first",
        variant: "destructive",
      });
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await callEdgeFunction<{ paymentUrl: string }>('create-payment', { 
        accessToken, 
        amount 
      });
      
      if (data.paymentUrl) {
        setPaymentUrl(data.paymentUrl);
        setStep(3);
        toast({
          title: "Success",
          description: "Payment URL generated successfully",
        });
      } else {
        throw new Error('No payment URL returned');
      }
    } catch (error: any) {
      console.error('Error creating payment:', error);
      setError(`Failed to create payment: ${error.message}`);
      toast({
        title: "Error",
        description: error.message || "Failed to create payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPayment = () => {
    if (paymentUrl) {
      window.open(paymentUrl, '_blank');
      toast({
        title: "Payment Window Opened",
        description: "Please complete your payment in the new tab",
      });
    }
  };

  const resetProcess = () => {
    setStep(1);
    setAccessToken('');
    setPaymentUrl('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Deposit Funds</h1>
          <p className="mt-2 text-gray-600">Securely add funds to your account using MonCash</p>
        </div>

        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    step === i ? 'bg-purple-600 text-white scale-110' : 
                    step > i ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > i ? <CheckCircle className="h-5 w-5" /> : i}
                </div>
                <span className={`text-xs ${step === i ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
                  {i === 1 ? 'Authentication' : i === 2 ? 'Amount' : 'Payment'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="h-1 w-full bg-gray-200 rounded-full"></div>
            <motion.div 
              className="absolute top-0 h-1 bg-purple-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(step - 1) * 50}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
                <span>{step === 1 ? 'Authentication' : step === 2 ? 'Enter Amount' : 'Complete Payment'}</span>
              </CardTitle>
              <CardDescription>
                {step === 1 
                  ? 'First, authenticate with the MonCash API' 
                  : step === 2 
                  ? 'Enter the amount you wish to deposit' 
                  : 'Your payment is ready to be processed'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-6">
              {step === 1 && (
                <div>
                  <div className="rounded-lg bg-gray-50 p-4 mb-4 border border-gray-100">
                    <p className="text-sm text-gray-600">
                      To make a deposit, we need to authenticate with MonCash. Click the button below to get started.
                    </p>
                  </div>
                  <Button 
                    onClick={handleGetToken} 
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        Start Deposit Process <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-4">
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
                        min="1"
                        disabled={loading}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Enter the amount you want to deposit in Haitian Gourdes</p>
                  </div>
                  
                  <Button 
                    onClick={handleCreatePayment} 
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
                        Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-800 text-sm">Payment Ready</h4>
                      <p className="text-xs text-green-700 mt-1">Your payment has been prepared. Click the button below to complete your transaction.</p>
                    </div>
                  </div>
                  
                  {paymentUrl && (
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-100 overflow-hidden">
                      <p className="text-xs text-gray-500 mb-1">Payment URL:</p>
                      <p className="text-xs text-gray-600 break-all">{paymentUrl}</p>
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleOpenPayment} 
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Complete Payment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="bg-gray-50 border-t pt-4 flex flex-col items-start space-y-3">
              <div className="flex items-center text-xs text-gray-500">
                <Shield className="h-3 w-3 mr-1 text-purple-600" />
                Secure and encrypted payment process
              </div>
              
              {step > 1 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={resetProcess}
                >
                  <RefreshCw className="h-3 w-3 mr-1" /> Start Over
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DepositPage;
