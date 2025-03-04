
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
  year: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Frontend Developer",
    company: "Webflow Solutions",
    image: "/placeholder.svg",
    quote: "This seminar completely transformed how I approach web development. The speakers were top-notch and the networking opportunities were invaluable.",
    rating: 5,
    year: "2023"
  },
  {
    id: 2,
    name: "David Lee",
    role: "UX Designer",
    company: "Creative Digital",
    image: "/placeholder.svg",
    quote: "I've attended many web dev conferences, but this one stands out for its perfect balance of technical depth and practical application.",
    rating: 5,
    year: "2023"
  },
  {
    id: 3,
    name: "Sarah Martinez",
    role: "Product Manager",
    company: "Tech Innovations",
    image: "/placeholder.svg",
    quote: "Even as a non-developer, I found tremendous value in understanding the latest web technologies and how they impact our product roadmap.",
    rating: 4,
    year: "2023"
  },
  {
    id: 4,
    name: "Michael Wong",
    role: "Full Stack Engineer",
    company: "DataStream",
    image: "/placeholder.svg",
    quote: "The workshops were hands-on and immediately applicable to my work. I implemented what I learned the very next week and saw real improvements.",
    rating: 5,
    year: "2022"
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "CTO",
    company: "StartUp Nexus",
    image: "/placeholder.svg",
    quote: "As someone who manages development teams, the insights on modern workflows and team collaboration were exactly what I needed.",
    rating: 4,
    year: "2022"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Web Developer",
    company: "Digital Creations",
    image: "/placeholder.svg",
    quote: "The community aspect was amazing. I connected with other developers facing similar challenges and we still keep in touch to share solutions.",
    rating: 5,
    year: "2022"
  }
];

export const TestimonialsSection = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Attendees Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover why developers and designers keep coming back year after year
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 italic mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
                <div className="flex items-center mt-4">
                  <Avatar className="h-12 w-12 mr-4 border border-gray-200">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </Avatar>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}, {testimonial.company}
                    </div>
                    <div className="text-xs text-purple-600">Attendee {testimonial.year}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
