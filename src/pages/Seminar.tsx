
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Calendar, MapPin, Clock, Users, Check, ArrowRight, Code, Laptop, Brain, Zap, Award, Share2 } from "lucide-react";
import { HeroSection } from "@/components/seminar/HeroSection";
import { SpeakersSection } from "@/components/seminar/SpeakersSection";
import { AgendaSection } from "@/components/seminar/AgendaSection";
import { TestimonialsSection } from "@/components/seminar/TestimonialsSection";
import { PricingSection } from "@/components/seminar/PricingSection";
import { RegisterForm } from "@/components/seminar/RegisterForm";
import { FAQSection } from "@/components/seminar/FAQSection";
import { Toaster } from "@/components/ui/sonner";

const Seminar = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Toaster position="top-right" />
      
      {/* Sticky Navigation */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-purple-600" />
              <span className="font-bold text-xl">WebDevPro</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {["hero", "speakers", "agenda", "testimonials", "pricing", "register", "faq"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section 
                      ? "text-purple-600 border-b-2 border-purple-600" 
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => scrollToSection("register")}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              Register Now <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-30 bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg cursor-pointer"
        style={{ opacity }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollToSection("speakers")}
      >
        <ChevronDown className="h-6 w-6 text-purple-600 animate-bounce" />
      </motion.div>

      {/* Main Content */}
      <div className="pb-20">
        <section id="hero">
          <HeroSection />
        </section>
        
        <section id="speakers" className="py-20">
          <SpeakersSection />
        </section>
        
        <section id="agenda" className="py-20 bg-gray-50">
          <AgendaSection />
        </section>
        
        <section id="testimonials" className="py-20">
          <TestimonialsSection />
        </section>
        
        <section id="pricing" className="py-20 bg-gray-50">
          <PricingSection />
        </section>
        
        <section id="register" className="py-20">
          <RegisterForm />
        </section>
        
        <section id="faq" className="py-20 bg-gray-50">
          <FAQSection />
        </section>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code className="h-6 w-6 text-purple-400" />
                <span className="font-bold text-xl">WebDevPro</span>
              </div>
              <p className="text-gray-400 text-sm">
                Join our exclusive web development seminar and take your skills to the next level.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                {["About", "Speakers", "Schedule", "Pricing", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-purple-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> 123 Tech Street, Dev City
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> June 15-17, 2023
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="bg-gray-800 hover:bg-purple-600 transition-colors p-2 rounded-full"
                  >
                    <Share2 className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2023 WebDevPro Seminar. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Seminar;
