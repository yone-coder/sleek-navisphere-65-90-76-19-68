
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Store, 
  UserPlus, 
  PackageCheck, 
  BadgeDollarSign, 
  ShoppingBag,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

const sellerFormSchema = z.object({
  storeName: z.string().min(3, {
    message: "Store name must be at least 3 characters.",
  }),
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(8, {
    message: "Phone number must be at least 8 characters.",
  }),
  businessType: z.string().min(1, {
    message: "Please select a business type.",
  }),
});

const ShopSeller = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  const form = useForm<z.infer<typeof sellerFormSchema>>({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: {
      storeName: "",
      fullName: "",
      email: "",
      phone: "",
      businessType: "",
    },
  });

  const onSubmit = (values: z.infer<typeof sellerFormSchema>) => {
    console.log(values);
    toast({
      title: "Application submitted!",
      description: "We've received your seller application. We'll review it and get back to you soon.",
    });
    // Reset form and go back to step 1
    form.reset();
    setStep(1);
  };

  const benefits = [
    {
      icon: <Store className="h-6 w-6 text-emerald-500" />,
      title: "Your Own Shop",
      description: "Create and customize your online store with our easy-to-use tools."
    },
    {
      icon: <PackageCheck className="h-6 w-6 text-emerald-500" />,
      title: "Simplified Shipping",
      description: "Integrated shipping solutions with discounted rates across multiple carriers."
    },
    {
      icon: <BadgeDollarSign className="h-6 w-6 text-emerald-500" />,
      title: "Secure Payments",
      description: "Get paid quickly with our secure payment processing system."
    },
    {
      icon: <ShoppingBag className="h-6 w-6 text-emerald-500" />,
      title: "Wide Customer Base",
      description: "Access millions of active shoppers on the Shopr marketplace."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/")}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Shopr Seller</h1>
          </div>
          <Button onClick={() => navigate("/")}>
            Exit
          </Button>
        </div>
      </header>

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        {step === 1 ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Start Selling on Shopr
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of sellers who are growing their business on the Shopr marketplace. Sign up today and reach millions of customers.
              </p>
              <Button 
                size="lg" 
                className="mt-6"
                onClick={() => setStep(2)}
              >
                Apply to Sell <UserPlus className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Benefits Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Why Sell on Shopr?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="p-6 border-gray-200 hover:shadow-md transition-shadow">
                    <div className="mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-emerald-50 rounded-lg p-8 mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Hear from our Sellers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white p-6">
                  <p className="text-gray-600 mb-4">"Joining Shopr as a seller was the best business decision I've made. My sales have increased by 300% in just six months."</p>
                  <p className="font-medium text-gray-900">- Marie D., Fashion Accessories</p>
                </Card>
                <Card className="bg-white p-6">
                  <p className="text-gray-600 mb-4">"The seller tools are so intuitive and the support team is always there when I need help. Couldn't ask for more!"</p>
                  <p className="font-medium text-gray-900">- Jean P., Electronics</p>
                </Card>
                <Card className="bg-white p-6">
                  <p className="text-gray-600 mb-4">"I started as a side hustle and now my Shopr store is my full-time business. The exposure to customers is incredible."</p>
                  <p className="font-medium text-gray-900">- Robert L., Home Goods</p>
                </Card>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to grow your business?</h2>
              <p className="text-gray-600 mb-6">Join thousands of successful sellers on Shopr today.</p>
              <Button 
                size="lg" 
                onClick={() => setStep(2)}
              >
                Apply Now
              </Button>
            </div>
          </>
        ) : (
          <div className="max-w-xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Seller Application</h2>
              <p className="text-gray-600 mt-2">Fill out the form below to start selling on Shopr</p>
            </div>

            <Card className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="storeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your store name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is how customers will identify your store.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            {...field}
                          >
                            <option value="">Select business type</option>
                            <option value="individual">Individual</option>
                            <option value="registered_business">Registered Business</option>
                            <option value="partnership">Partnership</option>
                            <option value="corporation">Corporation</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button type="submit">Submit Application</Button>
                  </div>
                </form>
              </Form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopSeller;
