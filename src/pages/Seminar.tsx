
import React, { useState, useEffect } from "react";
import { HeroSection } from "@/components/seminar/HeroSection";
import { SpeakersSection } from "@/components/seminar/SpeakersSection";
import { AgendaSection } from "@/components/seminar/AgendaSection";
import { TestimonialsSection } from "@/components/seminar/TestimonialsSection";
import { PricingSection } from "@/components/seminar/PricingSection";
import { RegisterForm } from "@/components/seminar/RegisterForm";
import { FAQSection } from "@/components/seminar/FAQSection";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Seminar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 py-4 px-6 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-xl text-gray-900">WebDev Summit 2024</div>
          <div className="hidden md:flex space-x-6">
            <a href="#speakers" className="text-gray-600 hover:text-purple-600 transition-colors">Speakers</a>
            <a href="#agenda" className="text-gray-600 hover:text-purple-600 transition-colors">Agenda</a>
            <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
            <a href="#register" className="text-gray-600 hover:text-purple-600 transition-colors">Register</a>
            <a href="#faq" className="text-gray-600 hover:text-purple-600 transition-colors">FAQ</a>
          </div>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
          >
            Register Now
          </Button>
        </div>
      </nav>

      {/* Main Content with padding for fixed nav */}
      <main className="pt-20">
        <HeroSection />
        <section id="speakers">
          <SpeakersSection />
        </section>
        <section id="agenda">
          <AgendaSection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <section id="pricing">
          <PricingSection />
        </section>
        <section id="register">
          <RegisterForm />
        </section>
        <section id="faq">
          <FAQSection />
        </section>
      </main>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-8 right-8 rounded-full shadow-md bg-white/80 backdrop-blur-md border border-gray-200 z-40"
          onClick={scrollToTop}
        >
          <ArrowUp size={20} />
        </Button>
      )}
    </div>
  );
};

export default Seminar;
