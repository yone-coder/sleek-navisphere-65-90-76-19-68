
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';

interface TestimonialsSectionProps {
  id: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David Wang",
    role: "Frontend Developer",
    company: "StartupX",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial1",
    quote: "This seminar completely changed how I approach frontend development. The speakers were world-class, and I left with practical skills I could apply immediately.",
    rating: 5
  },
  {
    id: 2,
    name: "Lisa Johnson",
    role: "UX Designer",
    company: "DesignLab",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial2",
    quote: "As someone who works at the intersection of design and development, this event was perfect. I learned so much about modern workflows and collaboration.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Torres",
    role: "CTO",
    company: "WebTech",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial3",
    quote: "The technical depth was impressive. My team implemented several of the architectural patterns we learned, and it's made a huge difference in our development speed.",
    rating: 4
  },
  {
    id: 4,
    name: "Sophia Chen",
    role: "Full Stack Developer",
    company: "TechCorp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial4",
    quote: "The workshops were hands-on and practical. I appreciated how the instructors helped when we got stuck and made complex concepts accessible.",
    rating: 5
  },
  {
    id: 5,
    name: "Raj Patel",
    role: "Engineering Manager",
    company: "DevFirm",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial5",
    quote: "Sending my team to this seminar was one of the best professional development investments I've made. They came back energized and with valuable new skills.",
    rating: 4
  },
  {
    id: 6,
    name: "Emma Wilson",
    role: "Junior Developer",
    company: "CodeAcademy",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial6",
    quote: "As someone early in their career, this seminar was incredibly valuable. The speakers were approachable, and I made great connections with other developers.",
    rating: 5
  }
];

const TestimonialsSection = ({ id }: TestimonialsSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section id={id} className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container px-4 sm:px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-purple-300 bg-purple-50 text-purple-600 mb-4"
          >
            <MessageSquare className="mr-1 h-3 w-3" /> Testimonials
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            What Attendees Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Hear from developers who've attended our previous events.
          </motion.p>
        </div>
        
        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md border border-slate-200/50 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-slate-900">{testimonial.name}</h3>
                  <p className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} 
                  />
                ))}
              </div>
              
              <blockquote className="text-slate-600 italic">
                "{testimonial.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200/50">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-slate-900">{testimonial.name}</h3>
                        <p className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} 
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-slate-600 italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel navigation */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-purple-600' : 'bg-slate-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
