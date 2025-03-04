
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

export const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Michael Roberts",
      role: "Frontend Developer",
      company: "TechStartup",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial1",
      quote: "This seminar completely changed my approach to building web applications. The speakers were incredible and the workshops were hands-on and practical. I implemented what I learned immediately at work.",
      rating: 5
    },
    {
      id: 2,
      name: "Jennifer Lee",
      role: "UX Designer",
      company: "DesignCo",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial2",
      quote: "As someone who bridges the gap between design and development, this seminar was perfect. I learned so much about modern web development practices and how to better collaborate with developers.",
      rating: 5
    },
    {
      id: 3,
      name: "Robert Chen",
      role: "Senior Developer",
      company: "EnterpriseInc",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial3",
      quote: "The networking opportunities alone were worth the price of admission. I connected with so many talented professionals and the technical content was cutting-edge and immediately applicable.",
      rating: 4
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Technical Lead",
      company: "WebSolutions",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial4",
      quote: "I sent my entire team to this seminar and it was the best investment I made all year. Everyone came back energized and full of new ideas that we've since implemented in our projects.",
      rating: 5
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-purple-600 font-semibold mb-2 inline-block">Success Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Past Attendees Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from professionals who have attended our previous seminars and transformed their web development skills.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 relative"
          >
            <div className="absolute -top-4 -left-4 bg-purple-100 rounded-full p-3">
              <Quote className="h-6 w-6 text-purple-600" />
            </div>
            
            <div className="mt-4">
              <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}, {testimonial.company}</p>
                </div>
                
                <div className="ml-auto flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 md:p-12 rounded-xl shadow-lg max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Join Hundreds of Satisfied Professionals</h3>
          <p className="mb-6">
            Our seminar consistently receives 4.8/5 stars from attendees. Join us and see why developers keep coming back.
          </p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Reserve Your Spot Today
          </button>
        </div>
      </motion.div>
    </div>
  );
};
