
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  colorStart: string;
  colorEnd: string;
}

interface PaymentMethodsSheetProps {
  sheetTriggerRef: React.RefObject<HTMLButtonElement>;
}

export function PaymentMethodsSheet({ sheetTriggerRef }: PaymentMethodsSheetProps) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const paymentMethods = [
    {
      id: "western-union",
      name: "Western Union",
      icon: "💸",
      description: "Send money through Western Union's global network",
      colorStart: "#8B5CF6",
      colorEnd: "#7C3AED"
    },
    {
      id: "moneygram",
      name: "MoneyGram",
      icon: "💰",
      description: "Quick and secure transfers via MoneyGram",
      colorStart: "#9b87f5",
      colorEnd: "#7E69AB"
    },
    {
      id: "sendwave",
      name: "Sendwave",
      icon: "📱",
      description: "Fast mobile money transfers",
      colorStart: "#33C3F0",
      colorEnd: "#1EAEDB"
    },
    {
      id: "cam",
      name: "CAM",
      icon: "🏦",
      description: "Direct bank transfer through CAM",
      colorStart: "#D6BCFA",
      colorEnd: "#9b87f5"
    }
  ];

  const handlePaymentSelect = (id: string) => {
    setSelectedPayment(id === selectedPayment ? null : id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button ref={sheetTriggerRef} className="hidden">
          Open Payment Methods
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[65vh] rounded-t-3xl p-0 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Handle indicator */}
          <div className="pt-2 pb-1 flex justify-center">
            <div className="h-1 w-12 bg-gray-300 rounded-full" />
          </div>
          
          {/* Payment panel header */}
          <div className="text-center px-4 py-3">
            <h3 className="text-base font-bold text-gray-900">Back This Project</h3>
            <p className="text-xs text-gray-500">Select your preferred payment method</p>
          </div>

          {/* Payment methods */}
          <div className="flex-1 overflow-auto p-3 space-y-2">
            <div className="grid gap-2">
              {paymentMethods.map((method) => (
                <motion.div
                  key={method.id}
                  whileTap={{ scale: 0.98 }}
                  animate={{ 
                    scale: selectedPayment === method.id ? 1.02 : 1,
                    y: selectedPayment === method.id ? -3 : 0
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card 
                    className={`relative overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedPayment === method.id 
                        ? "border-[#9b87f5] shadow-lg shadow-[#9b87f5]/20" 
                        : "border-transparent hover:border-gray-200"
                    }`}
                    onClick={() => handlePaymentSelect(method.id)}
                  >
                    {/* Background gradient effect */}
                    {selectedPayment === method.id && (
                      <div 
                        className="absolute inset-0 opacity-10" 
                        style={{
                          background: `linear-gradient(135deg, ${method.colorStart}, ${method.colorEnd})`,
                        }}
                      />
                    )}
                    
                    <div className="p-3 flex items-center gap-3">
                      <div 
                        className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg text-xl"
                        style={{
                          background: `linear-gradient(135deg, ${method.colorStart}, ${method.colorEnd})`,
                          boxShadow: selectedPayment === method.id ? `0 8px 12px -3px ${method.colorEnd}30` : 'none'
                        }}
                      >
                        {method.icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900 break-words">{method.name}</div>
                        <div className="text-xs text-gray-500 break-words line-clamp-2">{method.description}</div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        {selectedPayment === method.id ? (
                          <div className="h-5 w-5 rounded-full bg-[#9b87f5] flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-200" />
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Amount input */}
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <label className="block text-xs font-medium text-gray-500 mb-1">Donation Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <Input
                  type="number"
                  name="amount"
                  id="amount"
                  defaultValue="50"
                  className="pl-7 pr-12 h-10 text-base font-bold bg-white"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="currency" className="sr-only">Currency</label>
                  <select
                    id="currency"
                    name="currency"
                    className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md focus:ring-0 focus:border-transparent"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment action button */}
          <div className="p-3 bg-white border-t">
            <Button 
              size="lg" 
              className="w-full h-12 bg-[#9b87f5] hover:bg-[#8B5CF6] rounded-xl text-sm font-medium flex items-center justify-center gap-2"
            >
              Continue to Payment <ChevronRight className="h-4 w-4" />
            </Button>
            <p className="text-center text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
              <Shield className="h-3 w-3 text-[#9b87f5]" />
              Secure and encrypted payment process
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
