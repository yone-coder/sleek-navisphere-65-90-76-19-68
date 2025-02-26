
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Shield,
  Users,
  Star,
  Clock,
  Heart,
  CheckCircle,
  Lock,
  MessageCircle,
  DollarSign,
  Trophy,
  Globe,
  ChevronDown,
  Github,
  Twitter,
  Linkedin,
  Building,
  Rocket,
  Target
} from 'lucide-react';

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(65);
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 6,
    minutes: 45
  });
  const [backers, setBackers] = useState(1342);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rewardTiers = [
    {
      name: "Early Bird",
      price: 99,
      description: "Get early access to our platform",
      perks: [
        "1 year premium subscription",
        "Priority support",
        "Early access to new features",
        "Exclusive community access"
      ],
      available: 50,
      delivery: "January 2024"
    },
    {
      name: "Business Pro",
      price: 499,
      description: "Perfect for small businesses",
      perks: [
        "5 user licenses",
        "Custom branding",
        "API access",
        "Dedicated support",
        "Training sessions"
      ],
      available: 100,
      delivery: "February 2024",
      popular: true
    },
    {
      name: "Enterprise",
      price: 999,
      description: "Full-scale deployment",
      perks: [
        "Unlimited users",
        "White-label solution",
        "Custom development",
        "24/7 support",
        "On-site training",
        "Data migration"
      ],
      available: 20,
      delivery: "March 2024"
    }
  ];

  const testimonials = [
    {
      quote: "This platform is exactly what Haiti's digital economy needs. Revolutionary!",
      author: "Jean-Paul Michel",
      role: "Tech Entrepreneur",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
    },
    {
      quote: "The marketplace feature will transform how we do business locally and internationally.",
      author: "Marie Claire Baptiste",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
    },
    {
      quote: "Finally, a platform that understands and addresses our local needs.",
      author: "Pierre Louis",
      role: "Community Leader",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
    }
  ];

  const stats = [
    { label: "Backers", value: backers, icon: Users },
    { label: "Days Left", value: timeLeft.days, icon: Clock },
    { label: "Progress", value: `${progress}%`, icon: Target },
    { label: "Countries", value: "150+", icon: Globe }
  ];

  const faqs = [
    {
      question: "How will the funds be used?",
      answer: "The funds will be allocated across platform development (40%), security infrastructure (25%), marketing and community building (20%), and operational costs (15%)."
    },
    {
      question: "When will the platform launch?",
      answer: "We plan to launch the beta version in Q1 2024, with the full platform release scheduled for Q2 2024."
    },
    {
      question: "Is my investment secure?",
      answer: "Yes, all investments are processed through secure payment gateways and are backed by our platform's security guarantees."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              HaitiHub
            </span>
            <div className="hidden md:flex items-center space-x-8">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Roadmap</Button>
              <Button variant="ghost">Team</Button>
              <Button variant="ghost">FAQ</Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
              >
                Back the Project
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Building Haiti's Digital Future
              <br />
              One Platform at a Time
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              A revolutionary digital hub connecting Haitian businesses, creators, and communities 
              through an innovative marketplace, online contests, and rental platform.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 w-full sm:w-auto"
              >
                Back Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
              >
                Watch Demo <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Funding Progress */}
            <div className="mt-16 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="font-bold text-2xl text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              <Progress value={progress} className="h-4" />
              <div className="mt-4 flex justify-between text-sm text-gray-600">
                <span>${(875000 * progress / 100).toLocaleString()} raised</span>
                <span>$875,000 goal</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why HaitiHub Matters</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Building className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Digital Infrastructure</h3>
                    <p className="text-gray-600">
                      Building the foundation for Haiti's digital economy with secure, 
                      scalable, and accessible technology.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Rocket className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Economic Growth</h3>
                    <p className="text-gray-600">
                      Empowering local businesses and entrepreneurs with tools to reach 
                      global markets and expand their operations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Community Building</h3>
                    <p className="text-gray-600">
                      Creating a vibrant digital community that celebrates Haitian culture, 
                      creativity, and commerce.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1590341328520-63256eb32bc3?w=800" 
                alt="Platform preview" 
                className="relative rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reward Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Choose Your Impact Level</h2>
            <p className="mt-4 text-xl text-gray-600">
              Join us in building Haiti's digital future with exclusive rewards
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rewardTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`relative overflow-hidden ${
                  tier.popular ? 'border-purple-600 shadow-lg' : ''
                }`}>
                  {tier.popular && (
                    <div className="absolute top-0 right-0 -mt-1 -mr-1 px-3 py-1 bg-purple-600 text-white text-xs font-medium transform rotate-12">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-4xl font-bold">${tier.price}</span>
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.perks.map((perk, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{perk}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Available</span>
                        <span>{tier.available} spots</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Estimated Delivery</span>
                        <span>{tier.delivery}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${
                        tier.popular 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90'
                          : 'bg-white text-gray-900 border-2 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Select {tier.name}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">What People Are Saying</h2>
            <p className="mt-4 text-xl text-gray-600">
              Hear from our early supporters and community members
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg">{testimonial.author}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to know about the project
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Shape Haiti's Digital Future?
          </h2>
          <p className="mt-4 text-xl text-white/90">
            Join us in building a platform that will transform how Haitians connect, 
            create, and conduct business in the digital age.
          </p>
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-white/90"
            >
              Back the Project
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10"
            >
              Join Community
            </Button>
          </motion.div>
          
          <div className="mt-8 flex justify-center gap-4">
            <div className="flex items-center gap-2 text-white/90">
              <Lock className="h-4 w-4" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Protected Funds</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
