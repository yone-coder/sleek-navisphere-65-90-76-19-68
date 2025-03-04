
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const pricingPlans = [
    {
      name: "Basic",
      description: "Perfect for individual developers",
      price: isAnnual ? 399 : 499,
      features: [
        { name: "Access to all presentations", included: true },
        { name: "Virtual attendance", included: true },
        { name: "Event recordings (30 days)", included: true },
        { name: "Workshop materials", included: true },
        { name: "Certificate of completion", included: true },
        { name: "Live Q&A sessions", included: false },
        { name: "Exclusive networking events", included: false },
        { name: "1-on-1 sessions with speakers", included: false },
        { name: "Private discussion group", included: false },
      ],
      highlight: false,
      cta: "Get Started"
    },
    {
      name: "Professional",
      description: "For serious developers looking to level up",
      price: isAnnual ? 699 : 899,
      features: [
        { name: "Access to all presentations", included: true },
        { name: "In-person or virtual attendance", included: true },
        { name: "Event recordings (lifetime)", included: true },
        { name: "Workshop materials", included: true },
        { name: "Certificate of completion", included: true },
        { name: "Live Q&A sessions", included: true },
        { name: "Exclusive networking events", included: true },
        { name: "1-on-1 sessions with speakers", included: false },
        { name: "Private discussion group", included: true },
      ],
      highlight: true,
      cta: "Recommended"
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      price: isAnnual ? 1799 : 2299,
      features: [
        { name: "Access to all presentations", included: true },
        { name: "In-person or virtual attendance", included: true },
        { name: "Event recordings (lifetime)", included: true },
        { name: "Workshop materials", included: true },
        { name: "Certificate of completion", included: true },
        { name: "Live Q&A sessions", included: true },
        { name: "Exclusive networking events", included: true },
        { name: "1-on-1 sessions with speakers", included: true },
        { name: "Private discussion group", included: true },
      ],
      highlight: false,
      cta: "Contact Sales"
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
          <span className="text-purple-600 font-semibold mb-2 inline-block">Pricing Options</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Experience</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the package that best fits your learning goals and budget. All plans include access to our world-class seminar content.
          </p>
        </motion.div>
      </div>

      <div className="flex justify-center items-center space-x-4 mb-12">
        <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
          Single Event
        </span>
        <div className="flex items-center space-x-2">
          <Switch 
            id="pricing-switch" 
            checked={isAnnual} 
            onCheckedChange={setIsAnnual} 
          />
          <Label htmlFor="pricing-switch" className="sr-only">Toggle annual pricing</Label>
        </div>
        <div className="flex items-center">
          <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Annual Pass
          </span>
          <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
            Save 20%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`rounded-xl overflow-hidden transition-all ${
              plan.highlight 
                ? 'shadow-xl border-2 border-purple-500 relative -mt-6 mb-6' 
                : 'shadow-lg border border-gray-200'
            }`}
          >
            {plan.highlight && (
              <div className="bg-purple-500 text-white text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            
            <div className="bg-white p-8">
              <h3 className="font-bold text-xl mb-1">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-500 ml-2">{isAnnual ? '/year' : '/event'}</span>
              </div>
              
              <button 
                className={`w-full py-3 rounded-md font-medium mb-8 flex items-center justify-center gap-2 ${
                  plan.highlight 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } transition-colors`}
              >
                {plan.cta} <ArrowRight className="h-4 w-4" />
              </button>
              
              <div className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="mr-3 mt-1">
                      {feature.included ? (
                        <div className="rounded-full bg-green-100 p-1">
                          <Check className="h-3 w-3 text-green-600" />
                        </div>
                      ) : (
                        <div className="rounded-full bg-gray-100 p-1">
                          <X className="h-3 w-3 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 mx-auto max-w-4xl bg-gray-50 rounded-xl p-8 border border-gray-200">
        <h3 className="font-bold text-xl mb-4 text-center">Team Discount Available</h3>
        <p className="text-gray-600 text-center mb-6">
          Looking to register 5 or more team members? Contact us for special group rates and custom packages.
        </p>
        <div className="flex justify-center">
          <button className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
            Contact for Group Rates
          </button>
        </div>
      </div>
    </div>
  );
};
