
import { TabsContent } from "@/components/ui/tabs";
import FAQsList from "@/components/comments/FAQsList";
import { FAQ } from "@/components/comments/types";
import { Info, MessageSquare, ThumbsUp, ThumbsDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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

  // Community Q&A data
  const communityQuestions = [
    {
      id: 101,
      user: "Alex S.",
      date: "June 15, 2023",
      question: "Can this product be used outdoors?",
      answer: "Yes, this product is designed for both indoor and outdoor use. It has an IPX7 rating making it suitable for outdoor conditions.",
      helpful: 24,
      unhelpful: 2,
      verified: true
    },
    {
      id: 102,
      user: "Jordan M.",
      date: "July 3, 2023",
      question: "Does it work with Android devices?",
      answer: "Yes, it's compatible with both iOS and Android devices. You'll need to download our companion app from the respective app store.",
      helpful: 18,
      unhelpful: 1,
      verified: true
    },
    {
      id: 103,
      user: "Taylor B.",
      date: "August 12, 2023",
      question: "How long does the battery last?",
      answer: "The battery lasts approximately 10 hours on medium volume. At maximum volume, expect around 6-7 hours of continuous playback.",
      helpful: 35,
      unhelpful: 3,
      verified: false
    },
  ];

  // Top questions data
  const topQuestions = [
    "How do I connect to Bluetooth?",
    "Is there a mobile app?",
    "What's included in the box?",
    "How to reset the device?",
    "What colors are available?"
  ];

  return (
    <TabsContent value="faqs" className="space-y-8 mt-6 animate-in fade-in">
      {/* Search Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Find Answers Fast</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input 
            className="pl-10" 
            placeholder="Type your question here..." 
          />
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {["shipping", "warranty", "return", "discount", "battery"].map((term, index) => (
              <Badge key={index} variant="outline" className="hover:bg-gray-100 cursor-pointer">
                {term}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <Info className="text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">Top Questions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topQuestions.map((question, index) => (
            <div key={index} className="flex gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <span className="text-blue-500 font-medium">Q:</span>
              <span className="text-sm text-gray-700">{question}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Official FAQs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Official FAQs</h3>
          <p className="text-sm text-gray-600">Answers from our product team</p>
        </div>
        <div className="px-4 py-2">
          <FAQsList faqs={faqs} />
        </div>
      </div>

      {/* Community Q&A */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Community Q&A</h3>
            <p className="text-sm text-gray-600">Questions and answers from our customers</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Ask a Question</Button>
        </div>
        <div className="divide-y divide-gray-200">
          {communityQuestions.map((item) => (
            <div key={item.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <h4 className="font-medium text-gray-900">{item.question}</h4>
                    {item.verified && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 text-xs text-gray-500 mt-1">
                    <span>Asked by {item.user}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <p className="text-sm text-gray-700">{item.answer}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <ThumbsUp className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{item.helpful}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <ThumbsDown className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{item.unhelpful}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600">Reply</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 text-center">
          <Button variant="outline" className="w-full">Load More Questions</Button>
        </div>
      </div>

      {/* Ask a Question Form */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Still have questions?</h3>
        <p className="text-sm text-gray-600 mb-4">Our product experts are ready to help you with any questions you might have.</p>
        <div className="space-y-3">
          <Input placeholder="Your name" />
          <Input placeholder="Your email" type="email" />
          <textarea 
            className="w-full p-3 border border-gray-300 rounded-md" 
            rows={3} 
            placeholder="Type your question here..."
          ></textarea>
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">Submit Question</Button>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};
