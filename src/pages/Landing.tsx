
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Shield, Search, Check, ChevronRight } from 'lucide-react';
import { FloatingProgress } from '@/components/campaign/FloatingProgress';
import { FAQsTab } from '@/components/product/tabs/FAQsTab';
import { HeroSection } from '@/components/landing/HeroSection';
import { RewardsSection } from '@/components/landing/RewardsSection';
import { TabNav } from '@/components/landing/TabNav';
import { UpdatesTab } from '@/components/landing/UpdatesTab';
import { CommentsTab } from '@/components/landing/CommentsTab';
import { Input } from "@/components/ui/input";
import { VideoSection } from '@/components/landing/VideoSection';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

export default function Landing() {
  const [progress, setProgress] = useState(65);
  const [backers, setBackers] = useState(824);
  const [days, setDays] = useState(14);
  const [raised, setRaised] = useState(32500);
  const [goal, setGoal] = useState(50000);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const sheetTriggerRef = useRef<HTMLButtonElement>(null);

  const rewards = [
    {
      title: "Early Bird",
      price: 25,
      description: "Get early access to our product and a special thank you in our digital booklet.",
      claimed: 342,
      limit: 500
    },
    {
      title: "Premium Supporter",
      price: 75,
      description: "Receive the product with exclusive features and a mention on our website.",
      claimed: 215,
      limit: 300
    },
    {
      title: "VIP Backer",
      price: 150,
      description: "Get our limited edition product, a signed thank you card, and join our virtual launch party.",
      claimed: 98,
      limit: 150
    },
    {
      title: "Founding Member",
      price: 500,
      description: "Everything in VIP plus a consultation call with our team and your name engraved on our 'Founders Wall'.",
      claimed: 12,
      limit: 20
    }
  ];

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

  const handleBackProjectClick = () => {
    // Programmatically click the sheet trigger when FloatingProgress back button is clicked
    if (sheetTriggerRef.current) {
      sheetTriggerRef.current.click();
    }
  };

  const handlePaymentSelect = (id: string) => {
    setSelectedPayment(id === selectedPayment ? null : id);
  };

  return (
    <div className="font-sans">
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        {/* Search Bar and Tabs Navigation - Sticky Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm">
          {/* Search Bar */}
          <div className="px-4 py-2">
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                type="search"
                placeholder="Search updates, comments, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 h-9 bg-gray-50/50 border-0 focus:bg-white transition-colors text-sm"
              />
            </div>
          </div>

          {/* Tabs Navigation */}
          <TabNav activeTab={activeTab} />
        </div>

        {/* Content Sections */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="overview" className="mt-0">
                <VideoSection />
                <div className="container mx-auto">
                  <HeroSection backers={backers} />
                  <RewardsSection rewards={rewards} />
                </div>
              </TabsContent>

              <TabsContent value="updates" className="mt-6 container mx-auto">
                <UpdatesTab />
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <CommentsTab />
              </TabsContent>

              <TabsContent value="faqs" className="mt-6 container mx-auto">
                <FAQsTab />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </div>
      </Tabs>

      {/* Progress Bar - Only show on overview tab */}
      {activeTab === "overview" && (
        <FloatingProgress
          backers={backers}
          progress={progress}
          days={days}
          raised={raised}
          goal={goal}
          onBackProjectClick={handleBackProjectClick}
        />
      )}
      
      {/* Payment Methods Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <button ref={sheetTriggerRef} className="hidden">
            Open Payment Methods
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl p-0 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Handle indicator */}
            <div className="pt-4 pb-2 flex justify-center">
              <div className="h-1 w-12 bg-gray-300 rounded-full" />
            </div>
            
            {/* Payment panel header */}
            <div className="text-center px-6 py-4 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white">
              <h3 className="text-lg font-bold">Back This Project</h3>
              <p className="text-sm text-white/80 mt-1">Select your preferred payment method</p>
            </div>

            {/* Payment methods */}
            <div className="flex-1 overflow-auto p-5 space-y-4">
              <div className="grid gap-3">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileTap={{ scale: 0.98 }}
                    animate={{ 
                      scale: selectedPayment === method.id ? 1.02 : 1,
                      y: selectedPayment === method.id ? -5 : 0
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
                      
                      <div className="p-4 flex items-center gap-4">
                        <div 
                          className="h-12 w-12 flex items-center justify-center rounded-xl text-2xl"
                          style={{
                            background: `linear-gradient(135deg, ${method.colorStart}, ${method.colorEnd})`,
                            boxShadow: selectedPayment === method.id ? `0 10px 15px -3px ${method.colorEnd}30` : 'none'
                          }}
                        >
                          {method.icon}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900">{method.name}</div>
                          <div className="text-xs text-gray-500 truncate">{method.description}</div>
                        </div>
                        
                        <div className="flex-shrink-0">
                          {selectedPayment === method.id ? (
                            <div className="h-6 w-6 rounded-full bg-[#9b87f5] flex items-center justify-center">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                          ) : (
                            <div className="h-6 w-6 rounded-full border-2 border-gray-200" />
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Amount input */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <label className="block text-xs font-medium text-gray-500 mb-2">Donation Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    type="number"
                    name="amount"
                    id="amount"
                    defaultValue="50"
                    className="pl-7 pr-12 h-12 text-lg font-bold bg-white"
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
            <div className="p-5 bg-white border-t">
              <Button 
                size="lg" 
                className="w-full h-14 bg-[#9b87f5] hover:bg-[#8B5CF6] rounded-xl text-base font-medium flex items-center justify-center gap-2"
              >
                Continue to Payment <ChevronRight className="h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                <Shield className="h-3.5 w-3.5 text-[#9b87f5]" />
                Secure and encrypted payment process
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Trust Indicators */}
      <div className="fixed bottom-24 left-4 bg-white p-3 rounded-lg shadow-lg flex items-center text-sm">
        <Shield className="text-green-600 mr-2 h-5 w-5" />
        <span>Secure Payments</span>
      </div>
    </div>
  );
}
