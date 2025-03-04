
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const pricingOptions = [
    {
      title: 'Basic Pass',
      price: isAnnual ? 199 : 29,
      description: 'All the basics for starting your web development journey',
      features: [
        'Access to main sessions',
        'Digital workshop materials',
        'Certificate of attendance',
        'Community forum access'
      ],
      recommended: false,
      ctaText: 'Get Started'
    },
    {
      title: 'Pro Pass',
      price: isAnnual ? 499 : 79,
      description: 'Everything you need for professional development',
      features: [
        'All Basic Pass features',
        'Hands-on workshop sessions',
        '1 month mentorship access',
        'Exclusive dev resources',
        'Project feedback session'
      ],
      recommended: true,
      ctaText: 'Get Pro Access'
    },
    {
      title: 'Enterprise',
      price: isAnnual ? 1299 : 199,
      description: 'Advanced training for teams and businesses',
      features: [
        'All Pro Pass features',
        'Team collaboration tools',
        'Private Q&A sessions',
        'Customizable curriculum',
        'Project consultation',
        'Lifetime updates'
      ],
      recommended: false,
      ctaText: 'Contact Sales'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Learning Path</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Invest in your future with our flexible pricing options. Choose the plan that fits your learning goals.
          </p>
          
          <div className="flex items-center justify-center space-x-2 mb-8">
            <span className={`text-sm ${!isAnnual ? 'font-medium text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <Switch 
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-purple-600"
            />
            <span className={`text-sm ${isAnnual ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
              Annual
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">Save 20%</Badge>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingOptions.map((option, index) => (
            <Card key={index} className={`relative border rounded-xl shadow-sm hover:shadow-md transition-shadow ${
              option.recommended ? 'border-purple-200 shadow-purple-100' : ''
            }`}>
              {option.recommended && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-purple-600 text-white">Recommended</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{option.title}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">${option.price}</span>
                  <span className="text-gray-500 ml-1">{isAnnual ? '/year' : '/month'}</span>
                </div>
                <p className="text-gray-600 mt-2">{option.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${option.recommended ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                  variant={option.recommended ? 'default' : 'outline'}
                >
                  {option.ctaText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>All prices are in USD. VAT may apply. By purchasing you agree to our Terms of Service.</p>
        </div>
      </div>
    </section>
  );
};
