
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Badge, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface PricingSectionProps {
  id: string;
}

interface PricingTier {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  features: {
    text: string;
    included: boolean;
  }[];
  highlighted?: boolean;
  buttonText: string;
}

const tiers: PricingTier[] = [
  {
    id: "basic",
    name: "Basic Pass",
    description: "Access to all main stage talks and panel discussions.",
    priceMonthly: 299,
    priceAnnual: 2990,
    features: [
      { text: "All keynote presentations", included: true },
      { text: "Main stage sessions", included: true },
      { text: "Conference materials", included: true },
      { text: "Lunch and refreshments", included: true },
      { text: "Workshops", included: false },
      { text: "Networking dinner", included: false },
      { text: "1-on-1 mentoring", included: false },
      { text: "Video recordings", included: false }
    ],
    buttonText: "Get Basic Pass"
  },
  {
    id: "pro",
    name: "Full Pass",
    description: "Complete access to all sessions, workshops, and special events.",
    priceMonthly: 499,
    priceAnnual: 4990,
    features: [
      { text: "All keynote presentations", included: true },
      { text: "Main stage sessions", included: true },
      { text: "Conference materials", included: true },
      { text: "Lunch and refreshments", included: true },
      { text: "Workshops", included: true },
      { text: "Networking dinner", included: true },
      { text: "1-on-1 mentoring", included: false },
      { text: "Video recordings", included: true }
    ],
    highlighted: true,
    buttonText: "Get Full Pass"
  },
  {
    id: "enterprise",
    name: "VIP Pass",
    description: "Premium experience with exclusive benefits and personalized attention.",
    priceMonthly: 799,
    priceAnnual: 7990,
    features: [
      { text: "All keynote presentations", included: true },
      { text: "Main stage sessions", included: true },
      { text: "Conference materials", included: true },
      { text: "Lunch and refreshments", included: true },
      { text: "Workshops", included: true },
      { text: "Networking dinner", included: true },
      { text: "1-on-1 mentoring", included: true },
      { text: "Video recordings", included: true }
    ],
    buttonText: "Get VIP Pass"
  }
];

const PricingSection = ({ id }: PricingSectionProps) => {
  const [annual, setAnnual] = useState(false);
  
  return (
    <section id={id} className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container px-4 sm:px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-purple-300 bg-purple-50 text-purple-600 mb-4"
          >
            <CreditCard className="mr-1 h-3 w-3" /> Pricing Options
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Choose Your Experience
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Flexible options to fit your learning needs and budget.
          </motion.p>
          
          <div className="mt-8 flex justify-center items-center space-x-3">
            <span className={`text-sm ${!annual ? "font-medium text-purple-900" : "text-slate-500"}`}>
              Single Event
            </span>
            <Switch
              checked={annual}
              onCheckedChange={setAnnual}
              className="data-[state=checked]:bg-purple-600"
            />
            <span className={`text-sm flex items-center ${annual ? "font-medium text-purple-900" : "text-slate-500"}`}>
              Annual Pass
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                Save 20%
              </span>
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative rounded-2xl shadow-lg overflow-hidden ${
                tier.highlighted 
                  ? "border-2 border-purple-600 transform md:-translate-y-4 md:scale-105" 
                  : "border border-slate-200"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 w-full text-center py-2 bg-purple-600 text-white text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${tier.highlighted ? "pt-12" : ""}`}>
                <h3 className="text-2xl font-bold text-slate-900">{tier.name}</h3>
                <p className="mt-2 text-slate-600 h-12">{tier.description}</p>
                <p className="mt-6">
                  <span className="text-4xl font-bold text-slate-900">
                    ${annual ? tier.priceAnnual : tier.priceMonthly}
                  </span>
                  <span className="text-sm text-slate-500 ml-1">
                    {annual ? "/year" : ""}
                  </span>
                </p>
                
                <Button 
                  className={`mt-6 w-full ${
                    tier.highlighted 
                      ? "bg-purple-600 hover:bg-purple-700" 
                      : "bg-slate-900 hover:bg-slate-800"
                  }`}
                >
                  {tier.buttonText}
                </Button>
                
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-start"
                    >
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-3" />
                      ) : (
                        <X className="h-5 w-5 text-red-300 flex-shrink-0 mr-3" />
                      )}
                      <span className={feature.included ? "text-slate-700" : "text-slate-500"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-50 border border-slate-200 rounded-xl p-6 max-w-3xl mx-auto"
          >
            <Badge className="h-10 w-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Group Discounts Available</h3>
            <p className="text-slate-600 mb-4">
              Bringing your team? Get 15% off when registering 3+ people from the same organization.
            </p>
            <Button variant="outline">Contact for Group Rates</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
