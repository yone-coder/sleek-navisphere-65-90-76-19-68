
import { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { SendIcon } from 'lucide-react';

const faqs = [
  {
    question: "When and where will the seminar take place?",
    answer: "The seminar will take place on October 15-17, 2023, at the Tech Innovation Center in San Francisco. We also offer virtual attendance options for those who cannot join in person."
  },
  {
    question: "Is this seminar suitable for beginners?",
    answer: "Yes, we have tracks for all experience levels. The beginner track covers fundamentals and is perfect for those just starting their web development journey. We also have intermediate and advanced tracks for more experienced developers."
  },
  {
    question: "What should I bring to the seminar?",
    answer: "You should bring a laptop with your preferred code editor installed. We'll provide detailed setup instructions before the event to ensure you have all necessary software and tools ready."
  },
  {
    question: "Will recordings be available after the seminar?",
    answer: "Yes, all sessions will be recorded and made available to registered participants for 6 months after the event. This allows you to revisit any session or catch up on sessions you couldn't attend live."
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes, we offer full refunds up to 30 days before the event. After that, you can receive a 50% refund up to 7 days before the event or transfer your ticket to another person at no cost."
  },
  {
    question: "Do you offer group discounts?",
    answer: "Yes, we offer discounts for groups of 3 or more people from the same organization. Please contact our sales team at sales@webdevseminar.com for more information on group rates."
  },
  {
    question: "Will there be networking opportunities?",
    answer: "Absolutely! We have scheduled networking sessions, a welcome reception, and a closing party. These events are great opportunities to connect with speakers, sponsors, and fellow attendees."
  },
  {
    question: "How can I become a sponsor?",
    answer: "We offer various sponsorship packages to showcase your brand to our community of web developers. Please email sponsors@webdevseminar.com for our sponsorship prospectus and details."
  }
];

export const FAQSection = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the form data to a server here
    console.log('Contact form submitted:', contactForm);
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about the seminar? Check out our most common questions below or contact us directly.
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <div className="md:col-span-3">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6">
                If you couldn't find the answer to your question, please reach out to us directly and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input 
                    placeholder="Your Name" 
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your Question" 
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  <SendIcon className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
