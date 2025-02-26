
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Shield, Search } from 'lucide-react';
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

export default function Landing() {
  const [progress, setProgress] = useState(65);
  const [backers, setBackers] = useState(824);
  const [days, setDays] = useState(14);
  const [raised, setRaised] = useState(32500);
  const [goal, setGoal] = useState(50000);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

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
      name: "Western Union",
      icon: "💸",
      description: "Send money through Western Union's global network"
    },
    {
      name: "MoneyGram",
      icon: "💰",
      description: "Quick and secure transfers via MoneyGram"
    },
    {
      name: "Sendwave",
      icon: "📱",
      description: "Fast mobile money transfers"
    },
    {
      name: "CAM",
      icon: "🏦",
      description: "Direct bank transfer through CAM"
    }
  ];

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
        />
      )}
      
      {/* Payment Methods Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/10 to-transparent">
            <Button 
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-14"
            >
              Back This Project
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
          <div className="space-y-6 pt-6">
            <div className="text-center">
              <div className="h-1 w-12 bg-gray-300 rounded-full mx-auto mb-6" />
              <h3 className="text-lg font-semibold">Choose Payment Method</h3>
              <p className="text-sm text-gray-500 mt-1">Select your preferred way to back this project</p>
            </div>
            
            <div className="grid gap-4">
              {paymentMethods.map((method, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex items-start text-left"
                >
                  <div className="flex gap-4 items-center w-full">
                    <div className="text-3xl">{method.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
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
