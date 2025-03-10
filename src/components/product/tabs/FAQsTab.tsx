
import { TabsContent } from "@/components/ui/tabs";
import { HelpCircle } from "lucide-react";
import FAQsList from "@/components/comments/FAQsList";
import { FAQ } from "@/components/comments/types";

export function FAQsTab() {
  // Sample FAQs data
  const faqs: FAQ[] = [
    { 
      id: 1, 
      question: "How long does shipping take?", 
      answer: "Shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders. Expedited shipping options are available at checkout." 
    },
    { 
      id: 2, 
      question: "What is your return policy?", 
      answer: "We accept returns within 30 days of delivery. Items must be in original condition with tags attached. Return shipping is free for defective items." 
    },
    { 
      id: 3, 
      question: "Is this product waterproof?", 
      answer: "This product has a water-resistant rating of IPX7, which means it can withstand immersion in water up to 1 meter for 30 minutes. However, it is not recommended for swimming or diving." 
    },
    { 
      id: 4, 
      question: "Does this come with a warranty?", 
      answer: "Yes, all our products include a 1-year limited manufacturer's warranty that covers defects in materials and workmanship. Extended warranty options are available for purchase." 
    },
  ];

  return (
    <TabsContent value="faqs" className="space-y-6 mt-6 animate-in fade-in">
      <FAQsList faqs={faqs} />
    </TabsContent>
  );
}
