import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { callEdgeFunction } from '@/utils/supabaseEdgeFunctions';

const MonCashTest: React.FC = () => {
  const [amount, setAmount] = useState<string>("10");
  const [accessToken, setAccessToken] = useState<string>("");
  const [paymentUrl, setPaymentUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const getToken = async () => {
    setIsLoading(true);
    try {
      const data = await callEdgeFunction<{ accessToken: string }>('get-token');
      setAccessToken(data.accessToken);
      toast({
        title: "Success",
        description: "Access token obtained successfully",
      });
    } catch (error) {
      console.error('Error getting token:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to get access token",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createPayment = async () => {
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

    setIsPaymentLoading(true);
    try {
      const data = await callEdgeFunction<{ paymentUrl: string }>('create-payment', { 
        accessToken, 
        amount 
      });
      
      if (data.paymentUrl) {
        setPaymentUrl(data.paymentUrl);
        toast({
          title: "Success",
          description: "Payment URL generated successfully",
        });
      } else {
        throw new Error('No payment URL returned');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create payment",
        variant: "destructive",
      });
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>MonCash Payment Test</CardTitle>
          <CardDescription>Test your MonCash Supabase Edge Functions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Step 1: Get Access Token</h3>
            <Button 
              onClick={getToken} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Token...
                </>
              ) : "Get Access Token"}
            </Button>
            
            {accessToken && (
              <div className="mt-2 p-2 bg-gray-100 rounded text-xs truncate">
                <span className="font-bold">Token:</span> {accessToken}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Step 2: Create Payment</h3>
            <div className="flex gap-2">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                min="1"
                className="flex-1"
              />
              <Button 
                onClick={createPayment} 
                disabled={!accessToken || isPaymentLoading}
                className="whitespace-nowrap"
              >
                {isPaymentLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : "Create Payment"}
              </Button>
            </div>
            
            {paymentUrl && (
              <div className="mt-4 space-y-2">
                <div className="p-2 bg-gray-100 rounded text-xs break-all">
                  <span className="font-bold">Payment URL:</span> {paymentUrl}
                </div>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.open(paymentUrl, '_blank')}
                >
                  Open Payment Page
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 text-xs text-gray-500">
          Note: You need valid CLIENT_ID and CLIENT_SECRET environment variables set in your Supabase project.
        </CardFooter>
      </Card>
    </div>
  );
};

export default MonCashTest;
