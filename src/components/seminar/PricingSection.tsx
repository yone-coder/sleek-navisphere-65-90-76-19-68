
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    single: number;
    annual: number;
  };
  features: Array<{
    text: string;
    included: boolean;
    tooltip?: string;
  }>;
  popular?: boolean;
  cta: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic Pass",
    description: "Perfect for individuals exploring web development",
    price: {
      single: 299,
      annual: 499,
    },
    features: [
      { text: "All general sessions", included: true },
      { text: "Limited workshop access (2 workshops)", included: true },
      { text: "Conference materials", included: true },
      { text: "Networking events", included: true },
      { text: "Video recordings", included: false, tooltip: "Video recordings of sessions are not included in the Basic Pass" },
      { text: "1-on-1 expert sessions", included: false },
      { text: "Priority registration next year", included: false },
    ],
    cta: "Get Basic Pass",
  },
  {
    id: "professional",
    name: "Professional Pass",
    description: "Full experience for dedicated developers",
    price: {
      single: 599,
      annual: 999,
    },
    features: [
      { text: "All general sessions", included: true },
      { text: "Full workshop access", included: true },
      { text: "Conference materials", included: true },
      { text: "Networking events", included: true },
      { text: "Video recordings", included: true },
      { text: "1-on-1 expert sessions (1 session)", included: true },
      { text: "Priority registration next year", included: true },
    ],
    popular: true,
    cta: "Get Professional Pass",
  },
  {
    id: "team",
    name: "Team Pass",
    description: "Group discounts for 3+ team members",
    price: {
      single: 499,
      annual: 899,
    },
    features: [
      { text: "All general sessions", included: true },
      { text: "Full workshop access", included: true },
      { text: "Conference materials", included: true },
      { text: "Networking events", included: true },
      { text: "Video recordings", included: true },
      { text: "1-on-1 expert sessions", included: false, tooltip: "Available as an add-on for an additional fee" },
      { text: "Team collaboration session", included: true, tooltip: "Special session focused on implementing learnings as a team" },
    ],
    cta: "Contact for Team Pricing",
  },
];

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Pass</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the option that best fits your learning goals and budget
          </p>

          <div className="flex items-center justify-center mt-8 mb-12">
            <span className={`mr-3 text-sm ${!isAnnual ? "font-medium text-gray-900" : "text-gray-500"}`}>
              Single Event
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              id="annual-pricing"
            />
            <Label
              htmlFor="annual-pricing"
              className={`ml-3 text-sm ${isAnnual ? "font-medium text-gray-900" : "text-gray-500"}`}
            >
              Annual Pass <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded ml-2">Save up to 30%</span>
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`border ${plan.popular ? "border-purple-200 shadow-lg relative" : "border-gray-200"} h-full flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/3">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs py-1 px-4 rounded-full font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <p className="text-4xl font-bold text-gray-900">
                    ${isAnnual ? plan.price.annual : plan.price.single}
                    <span className="text-base font-normal text-gray-500 ml-1">
                      {isAnnual ? "/year" : ""}
                    </span>
                  </p>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={`flex-shrink-0 h-5 w-5 ${feature.included ? "text-green-500" : "text-gray-300"}`}>
                        <Check className="h-5 w-5" />
                      </div>
                      <span className={`ml-3 text-sm ${feature.included ? "text-gray-700" : "text-gray-400 line-through"}`}>
                        {feature.text}
                      </span>
                      {feature.tooltip && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs w-48">{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.popular ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4">Need Something Custom?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact us for enterprise pricing, on-site training, or customized event packages tailored to your organization's needs.
          </p>
          <Button variant="outline" onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}>
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};
