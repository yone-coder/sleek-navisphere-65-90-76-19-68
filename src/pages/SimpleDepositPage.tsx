
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle, CheckCircle, DollarSign, CreditCard, ArrowRight, Shield, Sparkles, Clock, ExternalLink, History, Copy, Wallet, Undo2, RefreshCw, Share, Info, MessageCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const SimpleDepositPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string>('');
  const [hoveredAmount, setHoveredAmount] = useState<string | null>(null);
  const [recentTransactions] = useState<Array<{date: string, amount: string, status: string}>>([
    {date: '2023-10-15', amount: '100', status: 'completed'},
    {date: '2023-10-10', amount: '200', status: 'completed'},
    {date: '2023-10-01', amount: '50', status: 'completed'},
  ]);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [autoRedirect, setAutoRedirect] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('deposit');
  const { toast } = useToast();

  const predefinedAmounts = ['50', '100', '200', '500', '1000', '2000'];
  
  // Simulate balance
  const [balance] = useState<string>('3450');

  useEffect(() => {
    // Simulate loading state for 1 second when component mounts
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPaymentUrl('');
    setShowReceipt(false);

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
      if (autoRedirect) {
        window.open(paymentData.paymentUrl, '_blank'); // Opens payment URL in a new tab
      }
      toast({
        title: "Payment Ready",
        description: autoRedirect ? "Payment window opened in a new tab" : "Click the button to complete your payment",
      });
      setShowReceipt(true);
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

  const copyPaymentUrl = () => {
    if (paymentUrl) {
      navigator.clipboard.writeText(paymentUrl);
      toast({
        title: "URL Copied",
        description: "Payment URL copied to clipboard",
      });
    }
  };

  const resetForm = () => {
    setAmount('');
    setError(null);
    setPaymentUrl('');
    setShowReceipt(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-black"></div>
      </div>

      {/* Top balance section */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-black/70 border-b border-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 py-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Wallet className="h-6 w-6 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Current Balance</p>
              <p className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {balance} HTG
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800">
                    <History className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Transaction History</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Help & Support</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-12 sm:px-6">
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Deposit Funds
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-gray-400"
          >
            Securely add funds to your account using MonCash
          </motion.p>
        </div>

        <Tabs 
          defaultValue="deposit" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full mb-10"
        >
          <TabsList className="grid grid-cols-2 max-w-md mx-auto bg-gray-900">
            <TabsTrigger value="deposit" className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-300">
              <DollarSign className="h-4 w-4 mr-2" />
              Deposit
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-300">
              <History className="h-4 w-4 mr-2" />
              Transaction History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="deposit" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              {/* Settings Row */}
              <div className="mb-8 bg-gray-900/70 border border-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-300">Auto-redirect to payment</span>
                  </div>
                  <Switch
                    checked={autoRedirect}
                    onCheckedChange={setAutoRedirect}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-6 bg-red-900/40 border border-red-800 text-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Preset amount buttons with gradient background */}
                <div>
                  <Label htmlFor="preset-amounts" className="text-sm font-medium text-gray-300 mb-3 block">
                    Quick Select Amount (HTG)
                  </Label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
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
                            amount === presetAmount 
                              ? 'bg-purple-900/50 border-purple-500 text-purple-300' 
                              : 'bg-gray-900/80 border-gray-800 text-gray-300 hover:bg-gray-800/80'
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
                      className="pl-10 bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                      required
                      min="1"
                      step="0.01"
                      disabled={loading}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enter the amount you want to deposit in Haitian Gourdes</p>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
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
                  
                  {(amount || paymentUrl) && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetForm}
                      className="bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800"
                    >
                      <Undo2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
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
                    <div className="bg-gray-900/80 border border-purple-900/50 rounded-lg p-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-medium text-green-400 text-sm">Payment URL Generated</h4>
                          <p className="text-xs text-gray-400 mt-1">Your payment has been prepared. {autoRedirect ? 'A new tab should have opened to complete your transaction.' : 'Click the button below to proceed with payment.'}</p>
                          <div className="mt-2 bg-black/50 p-2 rounded border border-gray-800 flex items-center">
                            <div className="flex-1 truncate">
                              <a 
                                href={paymentUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-400 hover:text-blue-300 hover:underline truncate block"
                              >
                                {paymentUrl.length > 50 ? `${paymentUrl.substring(0, 50)}...` : paymentUrl}
                              </a>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 ml-2 text-gray-400 hover:text-white hover:bg-gray-800"
                              onClick={copyPaymentUrl}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant="default"
                              size="sm"
                              className="text-xs bg-green-600 hover:bg-green-700 border-0"
                              onClick={() => window.open(paymentUrl, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" /> Complete Payment
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
                              onClick={sharePaymentLink}
                            >
                              <Share className="h-3 w-3 mr-1" /> Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Digital Receipt */}
              <AnimatePresence>
                {showReceipt && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mt-8"
                  >
                    <div className="bg-gray-900/60 border border-gray-800 rounded-lg overflow-hidden">
                      <div className="bg-purple-900/20 px-4 py-3 border-b border-gray-800">
                        <h3 className="font-medium text-purple-300 flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Payment Details
                        </h3>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Transaction ID</p>
                            <p className="text-white font-mono">MONC-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Date</p>
                            <p className="text-white">{new Date().toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Amount</p>
                            <p className="text-white font-bold">{amount} HTG</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Payment Method</p>
                            <p className="text-white">MonCash</p>
                          </div>
                        </div>
                        
                        <Separator className="bg-gray-800" />
                        
                        <div className="text-center text-xs text-gray-400">
                          <p>This receipt will be available in your transaction history</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-900/90 border-b border-gray-800 flex justify-between items-center">
                  <h3 className="font-medium text-white">Recent Transactions</h3>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-400 hover:text-white">
                    <RefreshCw className="h-3 w-3" />
                    <span className="text-xs">Refresh</span>
                  </Button>
                </div>
                
                <div className="divide-y divide-gray-800">
                  {recentTransactions.length > 0 ? (
                    recentTransactions.map((tx, index) => (
                      <div 
                        key={index} 
                        className="p-4 flex justify-between items-center hover:bg-gray-800/30 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-purple-900/30 h-8 w-8 rounded-full flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">Deposit</p>
                            <p className="text-gray-500 text-xs">{tx.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-medium">{tx.amount} HTG</p>
                          <p className="text-xs text-gray-500 capitalize">{tx.status}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">No transactions yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Help & Support Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Separator className="bg-gray-800 mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 hover:bg-gray-900/80 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Shield className="h-8 w-8 text-purple-500 mb-3" />
                <h3 className="font-medium text-white mb-1">Secure Payments</h3>
                <p className="text-gray-400 text-sm">All transactions are encrypted and secure</p>
              </div>
            </div>
            
            <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 hover:bg-gray-900/80 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Clock className="h-8 w-8 text-purple-500 mb-3" />
                <h3 className="font-medium text-white mb-1">Instant Processing</h3>
                <p className="text-gray-400 text-sm">Funds are credited to your account immediately</p>
              </div>
            </div>
            
            <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-4 hover:bg-gray-900/80 transition-colors">
              <div className="flex flex-col items-center text-center">
                <MessageCircle className="h-8 w-8 text-purple-500 mb-3" />
                <h3 className="font-medium text-white mb-1">24/7 Support</h3>
                <p className="text-gray-400 text-sm">Contact us anytime for assistance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-xs">
          <p>Powered by MonCash Payment Gateway</p>
          <p className="mt-1">© 2023 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

const sharePaymentLink = () => {
  // This is just a placeholder for the share functionality
  alert('Share functionality would go here');
};

export default SimpleDepositPage;
