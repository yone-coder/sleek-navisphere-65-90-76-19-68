
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare } from "lucide-react";

const faqs = [
  {
    question: "What is included in my registration?",
    answer: "Your registration includes access to all general sessions, workshops (depending on your pass type), conference materials, meals during the event, and networking opportunities. Professional Pass holders also receive video recordings and a 1-on-1 expert session."
  },
  {
    question: "Is there a virtual attendance option?",
    answer: "Yes, we offer a virtual attendance option for those who cannot attend in person. Virtual attendees can watch livestreams of all general sessions and select workshops, participate in online networking, and access the same digital materials as in-person attendees."
  },
  {
    question: "Can I switch workshops after registering?",
    answer: "Yes, you can modify your workshop selections up to 14 days before the event through your attendee portal. After that, changes can be made on-site based on availability."
  },
  {
    question: "What is the refund policy?",
    answer: "We offer full refunds up to 30 days before the event. Between 30 and 14 days, you can receive a 50% refund. Within 14 days of the event, refunds are not available, but you can transfer your registration to a colleague at no additional cost."
  },
  {
    question: "Are meals provided during the event?",
    answer: "Yes, registration includes breakfast, lunch, and refreshments during breaks each day of the conference. The evening networking events also include appetizers and drinks."
  },
  {
    question: "Where should I stay during the conference?",
    answer: "We have negotiated special rates with several hotels near the venue. After registering, you'll receive information about booking accommodations with our discount code."
  },
  {
    question: "Will presentations be available after the event?",
    answer: "Yes, slide decks and session materials will be available to all attendees after the conference. Video recordings are included with Professional Pass registrations and available for purchase for Basic Pass holders."
  },
  {
    question: "How can I become a sponsor?",
    answer: "We offer various sponsorship opportunities to connect your brand with our community of web developers. Please contact our sponsorship team at sponsors@webdevsummit.com for more information."
  }
];

export const FAQSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers. If you don't see your question here, reach out to us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-gray-900">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <Card className="border border-purple-100 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-100">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  <span>Still have questions?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Your Email" />
                  </div>
                  <div>
                    <Textarea placeholder="Your Question" className="min-h-[120px]" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Or contact us directly:</p>
                  <p className="text-sm font-medium">info@webdevsummit.com</p>
                  <p className="text-sm font-medium">+1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
