
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Shield } from 'lucide-react';
import { FloatingProgress } from '@/components/campaign/FloatingProgress';
import { FAQsTab } from '@/components/product/tabs/FAQsTab';
import { HeroSection } from '@/components/landing/HeroSection';
import { RewardsSection } from '@/components/landing/RewardsSection';
import { TabNav } from '@/components/landing/TabNav';
import { UpdatesTab } from '@/components/landing/UpdatesTab';
import { CommentsTab } from '@/components/landing/CommentsTab';
import { VideoSection } from '@/components/landing/VideoSection';
import { ProfileSection } from '@/components/landing/ProfileSection';
import { TitleSection } from '@/components/landing/TitleSection';
import { SearchBar } from '@/components/landing/SearchBar';
import { PaymentMethodsSheet } from '@/components/landing/PaymentMethodsSheet';
import { TrustIndicator } from '@/components/landing/TrustIndicator';
import { SecondaryTabNav } from '@/components/landing/SecondaryTabNav';
import { StoryTab } from '@/components/landing/StoryTab';
import { ServicesTab } from '@/components/landing/ServicesTab';
import { TeamTab } from '@/components/landing/TeamTab';

export default function Landing() {
  const [progress, setProgress] = useState(65);
  const [backers, setBackers] = useState(824);
  const [days, setDays] = useState(14);
  const [raised, setRaised] = useState(32500);
  const [goal, setGoal] = useState(50000);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSecondaryTab, setActiveSecondaryTab] = useState("story");
  const [searchQuery, setSearchQuery] = useState("");
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

  // Creator profile data - simplified
  const creatorProfile = {
    creatorName: "Mima Group",
    creatorImage: "/lovable-uploads/7b6dfa3b-fe97-4083-8e4a-0640871dbc3f.png",
    creatorBio: "Digital design studio specializing in UI/UX and branding."
  };

  const handleBackProjectClick = () => {
    // Programmatically click the sheet trigger when FloatingProgress back button is clicked
    if (sheetTriggerRef.current) {
      sheetTriggerRef.current.click();
    }
  };

  const renderSecondaryTabContent = () => {
    switch (activeSecondaryTab) {
      case "story":
        return <StoryTab />;
      case "services":
        return <ServicesTab />;
      case "team":
        return <TeamTab />;
      default:
        return <StoryTab />;
    }
  };

  return (
    <div className="font-sans">
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        {/* Search Bar and Tabs Navigation - Sticky Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm">
          {/* Search Bar */}
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
                <ProfileSection {...creatorProfile} />
                <TitleSection />
                
                {/* Secondary Tabs Navigation */}
                <SecondaryTabNav 
                  activeTab={activeSecondaryTab} 
                  onTabChange={setActiveSecondaryTab} 
                />
                
                {/* Secondary Tabs Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSecondaryTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderSecondaryTabContent()}
                  </motion.div>
                </AnimatePresence>
                
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
      <PaymentMethodsSheet sheetTriggerRef={sheetTriggerRef} />

      {/* Trust Indicators */}
      <TrustIndicator />
    </div>
  );
}
