import React, { useState, useEffect } from 'react';
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
  Clock, 
  Users, 
  DollarSign, 
  Share2, 
  MessageCircle, 
  Check, 
  Heart, 
  Award,
  Shield,
  ChevronDown,
  ChevronUp,
  Facebook,
  Twitter
} from 'lucide-react';

export default function Landing() {
  // State for funding progress
  const [progress, setProgress] = useState(65);
  const [backers, setBackers] = useState(824);
  const [days, setDays] = useState(14);
  const [raised, setRaised] = useState(32500);
  const [goal, setGoal] = useState(50000);
  
  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Sample reward tiers
  const rewards = [
    {
      title: "Early Bird",
      price: 25,
      description: "Get early access to our product and a special thank you in our digital booklet.",
      claimed: 342,
      limit: 500
    },
    {
      title: "Premium Supporter",
      price: 75,
      description: "Receive the product with exclusive features and a mention on our website.",
      claimed: 215,
      limit: 300
    },
    {
      title: "VIP Backer",
      price: 150,
      description: "Get our limited edition product, a signed thank you card, and join our virtual launch party.",
      claimed: 98,
      limit: 150
    },
    {
      title: "Founding Member",
      price: 500,
      description: "Everything in VIP plus a consultation call with our team and your name engraved on our 'Founders Wall'.",
      claimed: 12,
      limit: 20
    }
  ];
  
  // Sample FAQ items
  const faqItems = [
    {
      question: "When will I receive my rewards?",
      answer: "We anticipate shipping all rewards within 3 months after our campaign ends. We'll keep you updated on production timelines through regular project updates."
    },
    {
      question: "Is my payment secure?",
      answer: "Absolutely. All payments are processed securely through the platform's payment system using industry-standard encryption and security protocols."
    },
    {
      question: "What happens if you don't reach your funding goal?",
      answer: "This campaign follows an all-or-nothing model. If we don't reach our funding goal, you won't be charged and no rewards will be distributed."
    },
    {
      question: "Can I change or upgrade my pledge later?",
      answer: "Yes! You can modify your pledge amount or reward tier any time before the campaign closes."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide. International shipping costs will be calculated at checkout based on your location."
    }
  ];
  
  // Team members
  const team = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "Former tech executive with 10+ years experience in product development."
    },
    {
      name: "Jamie Chen",
      role: "Lead Designer",
      bio: "Award-winning designer who previously worked at top design agencies."
    },
    {
      name: "Taylor Washington",
      role: "Marketing Director",
      bio: "Launched 3 successful crowdfunding campaigns raising over $1M combined."
    }
  ];
  
  // Testimonials
  const testimonials = [
    {
      quote: "This is exactly what our industry has been waiting for. A game-changer!",
      author: "Chris Lee, Industry Expert"
    },
    {
      quote: "I've seen the prototype in action and can't wait for everyone to experience it.",
      author: "Pat Johnson, Early Tester"
    },
    {
      quote: "The team behind this project is incredibly talented and dedicated.",
      author: "Sam Rivera, Tech Blogger"
    }
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="text-gray-900 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Building Haiti's Digital Future</h1>
            <h2 className="text-xl md:text-2xl mb-6 text-gray-600">A revolutionary platform connecting Haitian businesses, creators, and communities</h2>
            <p className="mb-8 text-gray-600">Join {backers}+ backers who are already supporting this innovative platform</p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg h-64 md:h-96 mb-8 relative overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1590341328520-63256eb32bc3?w=800" 
                alt="Platform preview" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Progress Bar */}
      <section className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 py-4">
        <div className="container mx-auto px-4">
          <div className="space-y-4">
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500 ease-in-out"
                style={{ width: `${(raised / goal) * 100}%` }}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-emerald-500">
                    ${raised.toLocaleString()}
                  </span>
                  <div className="bg-gray-100 rounded-full p-1">
                    <DollarSign className="h-3.5 w-3.5 text-gray-500" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-0.5">
                  pledged of ${goal.toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-baseline justify-end">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    {backers}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-0.5">
                  backers
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-baseline justify-end">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    {days}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-0.5">
                  days to go
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                size="default"
                className="bg-emerald-500 hover:bg-emerald-600 text-white flex-1"
              >
                Back This Project
              </Button>
              <Button 
                size="icon"
                variant="outline"
                className="shrink-0"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add padding at the bottom of the page to prevent content from being hidden behind the fixed bar */}
      <div className="pb-48" />

      {/* Project Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Project</h2>
            <p className="text-lg text-gray-600 mb-6">
              We're creating an innovative solution that helps people streamline their daily tasks, 
              reduce wasteful spending, and minimize environmental impact. All in one simple, 
              beautifully designed product that fits seamlessly into your life.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <Check size={16} className="inline mr-1" /> Eco-friendly
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Check size={16} className="inline mr-1" /> Time-saving
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                <Check size={16} className="inline mr-1" /> Cost-effective
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                <Check size={16} className="inline mr-1" /> User-friendly
              </span>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-200 rounded-lg h-48 md:h-64 w-full max-w-lg flex items-center justify-center">
                <span className="text-gray-500">Project Demo Image/Video</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Rewards Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Back This Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                    <CardTitle>{reward.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-2xl font-bold mb-2">${reward.price}</p>
                    <p className="text-gray-600 mb-4">{reward.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{reward.claimed} backers</span>
                        <span>{Math.round((reward.claimed / reward.limit) * 100)}% claimed</span>
                      </div>
                      <Progress 
                        value={(reward.claimed / reward.limit) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Select Reward</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Story & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our Story & Mission</h2>
            <div className="prose max-w-none">
              <p className="text-lg mb-4">
                It all started when we noticed a common problem affecting millions of people. 
                Daily tasks were becoming increasingly complicated, time-consuming, and expensive.
              </p>
              <p className="text-lg mb-4">
                Our team of innovators, designers, and engineers came together with a shared vision: 
                to create a solution that simplifies life, saves money, and reduces environmental impact.
              </p>
              <p className="text-lg mb-6">
                After 18 months of research, development, and testing, we're ready to bring our 
                product to the world. But we need your help to make it happen.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">How We'll Use the Funds</h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span>Manufacturing</span>
                  <span className="font-medium">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '40%' }}></div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span>Tooling & Equipment</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '25%' }}></div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span>Fulfillment & Shipping</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '20%' }}></div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span>Marketing & Operations</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                  <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-indigo-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="opacity-20">
                    <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                <p className="font-medium text-indigo-700">{testimonial.author}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-6">Featured In</h3>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="bg-white h-12 w-32 rounded shadow-sm flex items-center justify-center text-gray-400">
                TechCrunch
              </div>
              <div className="bg-white h-12 w-32 rounded shadow-sm flex items-center justify-center text-gray-400">
                Forbes
              </div>
              <div className="bg-white h-12 w-32 rounded shadow-sm flex items-center justify-center text-gray-400">
                Product Hunt
              </div>
              <div className="bg-white h-12 w-32 rounded shadow-sm flex items-center justify-center text-gray-400">
                The Verge
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-200 h-48 w-48 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-indigo-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="divide-y">
              {faqItems.map((item, index) => (
                <Card key={index} className="border-0 shadow-none">
                  <CardHeader className="cursor-pointer hover:bg-gray-50" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                      {openFaq === index ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </CardHeader>
                  {openFaq === index && (
                    <CardContent>
                      <p className="text-gray-600">{item.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action & Social */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Back our project today and be part of Haiti's digital transformation.
            Together, we can build a more connected future.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-purple-600 hover:bg-gray-100 mb-8"
          >
            Back This Project
          </Button>
          
          <div>
            <p className="font-medium mb-4">Share with your friends:</p>
            <div className="flex justify-center gap-4">
              <Button size="icon" variant="secondary" className="rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <div className="fixed bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg flex items-center text-sm">
        <Shield className="text-green-600 mr-2 h-5 w-5" />
        <span>Secure Payments</span>
      </div>
    </div>
  );
}
