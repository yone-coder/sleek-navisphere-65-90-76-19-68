
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface FAQSectionProps {
  id: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "When and where is the seminar taking place?",
    answer: "The seminar will be held on June 15-16, 2023, at the San Francisco Convention Center, located at 747 Howard St, San Francisco, CA 94103."
  },
  {
    question: "What's included in the registration fee?",
    answer: "Your registration includes access to all sessions and workshops (depending on your pass type), conference materials, lunch and refreshments on both days, and networking opportunities. VIP passes include additional benefits such as reserved seating, exclusive networking events, and one-on-one mentoring sessions."
  },
  {
    question: "Are there any prerequisites for attending?",
    answer: "The seminar is designed for web developers of all skill levels. While some sessions are more advanced and may require prior knowledge, there are plenty of sessions for beginners and intermediate developers. We'll provide information about the technical level of each session in the program."
  },
  {
    question: "Will presentations be recorded?",
    answer: "Yes, most sessions will be recorded and made available to attendees with Full and VIP passes after the event. Basic pass holders can upgrade to access the recordings."
  },
  {
    question: "What should I bring to the seminar?",
    answer: "We recommend bringing your laptop for the hands-on workshops, a charger, business cards for networking, and a notebook if you prefer taking notes by hand. The venue provides free Wi-Fi."
  },
  {
    question: "Is there a cancellation policy?",
    answer: "Yes, cancellations made more than 30 days before the event are eligible for a full refund. Cancellations made 15-30 days before the event will receive a 50% refund. No refunds will be issued for cancellations less than 15 days before the event, but you may transfer your registration to another person."
  },
  {
    question: "Are there group discounts available?",
    answer: "Yes, we offer a 15% discount for groups of 3 or more from the same organization. Please contact our team for details on how to register as a group."
  },
  {
    question: "Will there be networking opportunities?",
    answer: "Absolutely! The seminar includes dedicated networking breaks, a networking lunch, and an evening reception on the first day. These are great opportunities to meet speakers, sponsors, and fellow attendees."
  }
];

const FAQSection = ({ id }: FAQSectionProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simulate form submission
    toast.success("Message sent!", {
      description: "We'll get back to you as soon as possible."
    });
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };
  
  return (
    <section id={id} className="py-24 bg-white">
      <div className="container px-4 sm:px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-indigo-300 bg-indigo-50 text-indigo-600 mb-4"
          >
            <HelpCircle className="mr-1 h-3 w-3" /> Support
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Have questions? We've got answers. If you don't see your question here, please reach out.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <div className="md:col-span-3">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <AccordionItem value={`faq-${index}`} className="border border-slate-200 rounded-lg overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-slate-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
          
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-50 rounded-xl p-6 border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Still have questions?</h3>
              </div>
              
              <p className="text-slate-600 mb-6">
                Send us a message and our team will get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      Name
                    </label>
                    <Input id="name" name="name" required placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email
                    </label>
                    <Input id="email" name="email" type="email" required placeholder="your.email@example.com" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                    Subject
                  </label>
                  <Input id="subject" name="subject" required placeholder="How can we help you?" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    required 
                    placeholder="Your message" 
                    className="resize-none min-h-[120px]" 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Send Message
                </Button>
                
                <p className="text-xs text-slate-500 text-center">
                  We'll get back to you within 24 hours.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
