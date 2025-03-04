
import { useRef, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "TechCorp",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Sarah",
    quote: "This seminar completely transformed my approach to web development. The practical workshops and networking opportunities were invaluable for my career growth.",
    rating: 5,
    year: "2022"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "UX Designer",
    company: "DesignHub",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Michael",
    quote: "The perfect blend of theory and practice. I left with new skills I could immediately apply to my projects and a network of fellow professionals.",
    rating: 5,
    year: "2022"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Full Stack Developer",
    company: "StartupX",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Emily",
    quote: "I was skeptical at first, but this seminar exceeded all my expectations. The instructors were world-class and the content was cutting-edge.",
    rating: 4,
    year: "2021"
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO",
    company: "InnovateTech",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=David",
    quote: "We sent our entire development team to this seminar and the ROI has been incredible. The team is now more aligned, productive, and innovative.",
    rating: 5,
    year: "2021"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Software Engineer",
    company: "TechGiant",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Lisa",
    quote: "The seminar's focus on current industry best practices and emerging technologies helped me stay ahead in my field. Highly recommended for any web developer.",
    rating: 5,
    year: "2020"
  }
];

export const TestimonialsSection = () => {
  const [activePage, setActivePage] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextPage = () => {
    if (activePage < totalPages - 1) {
      setDirection(1);
      setActivePage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (activePage > 0) {
      setDirection(-1);
      setActivePage(prev => prev - 1);
    }
  };

  const currentTestimonials = testimonials.slice(
    activePage * itemsPerPage,
    (activePage + 1) * itemsPerPage
  );

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Attendees Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what previous attendees have to say about their experience.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="overflow-hidden" ref={containerRef}>
              <motion.div
                key={activePage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="grid md:grid-cols-3 gap-6"
              >
                {currentTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <CardContent className="p-6">
                      <div className="relative z-10 mb-6">
                        <Quote size={64} className="absolute -top-2 -left-2 text-purple-100 z-0" />
                        <p className="text-gray-700 relative z-10 leading-relaxed">"{testimonial.quote}"</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                            <p className="text-xs text-gray-500">
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-xs text-gray-500">{testimonial.year}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
            
            <div className="flex justify-center mt-10 space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={prevPage} 
                disabled={activePage === 0}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-1 items-center">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === activePage ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                    onClick={() => {
                      setDirection(i > activePage ? 1 : -1);
                      setActivePage(i);
                    }}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextPage} 
                disabled={activePage === totalPages - 1}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-16 bg-purple-50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold mb-3">Become a Success Story</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who have advanced their careers through our web development seminars.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
