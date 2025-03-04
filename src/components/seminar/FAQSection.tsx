
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Mail, MessageSquare, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const FAQSection = () => {
  const faqs = [
    {
      question: "What experience level is required to attend?",
      answer: "Our seminar is designed for all experience levels from beginners to experts. We have sessions tailored for different skill levels, and all attendees will find valuable content regardless of their experience. Many workshops and sessions are labeled with the recommended experience level."
    },
    {
      question: "Is the seminar in-person or virtual?",
      answer: "We offer both in-person and virtual attendance options. The in-person experience includes additional networking opportunities, while virtual attendees have access to all presentations and workshops through our interactive streaming platform. All sessions are recorded and available to both types of attendees."
    },
    {
      question: "What is included in the registration fee?",
      answer: "Registration includes access to all seminar sessions, workshops, networking events, and materials. In-person attendees also receive meals and refreshments throughout the event. All attendees receive recordings of the sessions and a certificate of completion."
    },
    {
      question: "Can I get a refund if I can't attend?",
      answer: "Refunds are available up to 30 days before the event with a 15% processing fee. Within 30 days of the event, you can transfer your registration to another person or convert to virtual attendance if you originally registered for in-person."
    },
    {
      question: "Will I receive a certificate after completion?",
      answer: "Yes, all attendees who participate in the seminar will receive a digital certificate of completion. Additionally, attendees who complete specific workshop tracks may receive specialized certificates recognizing their achievements."
    },
    {
      question: "Are there team or group discounts available?",
      answer: "Yes, we offer discounts for teams of 5 or more people from the same organization. Please contact our sales team for specific pricing and package options tailored to your team's needs."
    },
    {
      question: "What should I bring to the seminar?",
      answer: "In-person attendees should bring a laptop for the hands-on workshops, chargers, and any personal items they may need. Virtual attendees should ensure they have a stable internet connection and a comfortable setup for participating in the interactive sessions."
    },
    {
      question: "Will the sessions be recorded?",
      answer: "Yes, all sessions will be recorded and available to registered attendees after the event. Access to recordings is included in all registration packages, with differing durations of access depending on your package tier."
    }
  ];
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const email = new FormData(form).get("email") as string;
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed", {
        description: "You're now signed up to receive updates about the seminar.",
      });
      form.reset();
    }, 1000);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-purple-600 font-semibold mb-2 inline-block">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our web development seminar. If you don't see your question here, feel free to contact us.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AccordionItem value={`item-${index}`} className="border rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                    <span className="text-left font-medium text-gray-900">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
        
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 sticky top-24"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-6 text-white">
              <h3 className="font-bold text-xl mb-2">Still Have Questions?</h3>
              <p className="text-purple-100 text-sm">
                We're here to help. Reach out to us through any of these channels.
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-md">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Email Us</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Send us an email and we'll get back to you within 24 hours.
                  </p>
                  <a href="mailto:info@webdevseminar.com" className="text-sm text-purple-600 mt-1 inline-block hover:underline">
                    info@webdevseminar.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-md">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Live Chat</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Chat with our support team during business hours.
                  </p>
                  <button className="text-sm text-purple-600 mt-1 inline-block hover:underline">
                    Start a conversation
                  </button>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-md">
                  <HelpCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">FAQs</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Browse our comprehensive knowledge base.
                  </p>
                  <a href="#" className="text-sm text-purple-600 mt-1 inline-block hover:underline">
                    Visit Knowledge Base
                  </a>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium mb-3">Stay Updated</h4>
                <form onSubmit={handleSubscribe}>
                  <div className="flex gap-2">
                    <Input 
                      name="email"
                      type="email" 
                      placeholder="Your email" 
                      className="flex-1"
                    />
                    <Button type="submit">Subscribe</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Subscribe to receive updates about the seminar and exclusive content.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
