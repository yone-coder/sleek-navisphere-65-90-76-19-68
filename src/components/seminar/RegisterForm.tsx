
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle, ChevronRight, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

interface RegisterFormProps {
  id: string;
}

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters."
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  company: z.string().optional(),
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters."
  }),
  passType: z.enum(["basic", "full", "vip"], {
    required_error: "Please select a pass type."
  }),
  dietaryRestrictions: z.string().optional(),
  hearAbout: z.string().optional(),
  specialRequirements: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const RegisterForm = ({ id }: RegisterFormProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      jobTitle: "",
      passType: "full",
      dietaryRestrictions: "",
      hearAbout: "",
      specialRequirements: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', data);
      setIsSubmitting(false);
      setIsComplete(true);
      toast.success("Registration complete!", {
        description: "You'll receive a confirmation email shortly."
      });
    }, 1500);
  };

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await form.trigger(['firstName', 'lastName', 'email']);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await form.trigger(['company', 'jobTitle', 'passType']);
      if (isValid) setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const steps = [
    { title: "Personal Info", description: "Your contact information" },
    { title: "Professional Info", description: "Your work details" },
    { title: "Additional Info", description: "Help us make your experience better" }
  ];

  return (
    <section id={id} className="py-24 bg-slate-50">
      <div className="container px-4 sm:px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-purple-300 bg-purple-50 text-purple-600 mb-4"
          >
            <UserPlus className="mr-1 h-3 w-3" /> Join Us
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            Register for the Seminar
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Secure your spot for the web development event of the year.
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200/50 overflow-hidden">
          {/* Steps Indicator */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex justify-between">
              {steps.map((s, i) => (
                <div key={i} className="flex flex-col items-center relative">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      i + 1 < step ? "bg-green-100 text-green-600" :
                      i + 1 === step ? "bg-purple-600 text-white" :
                      "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {i + 1 < step ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </div>
                  
                  <div className="text-xs text-center mt-2">
                    <div className={i + 1 === step ? "font-medium text-purple-600" : "text-slate-500"}>
                      {s.title}
                    </div>
                    <div className="text-slate-400 hidden sm:block">{s.description}</div>
                  </div>
                  
                  {i < steps.length - 1 && (
                    <div className={`absolute top-5 left-[calc(100%_-_10px)] w-[calc(100%_-_20px)] h-[2px] ${
                      i + 1 < step ? "bg-green-500" : "bg-slate-200"
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Form Content */}
          <div className="p-6 md:p-8">
            {isComplete ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Registration Complete!</h3>
                <p className="text-slate-600 mb-8">
                  Thank you for registering for WebDevCon 2023. We've sent a confirmation to your email with all the details.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Download Calendar Invite
                </Button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                  
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Company name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="jobTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Software Engineer" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="passType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Pass Type</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2 p-4 rounded border border-slate-200 hover:border-purple-200 hover:bg-purple-50/30 transition-colors">
                                  <RadioGroupItem value="basic" id="basic" />
                                  <div className="grid gap-1.5 leading-none ml-2">
                                    <label htmlFor="basic" className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                      Basic Pass - $299
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      Access to all main stage talks and panel discussions.
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2 p-4 rounded border-2 border-purple-600 bg-purple-50/30">
                                  <RadioGroupItem value="full" id="full" />
                                  <div className="grid gap-1.5 leading-none ml-2">
                                    <label htmlFor="full" className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                      Full Pass - $499
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      Complete access to all sessions, workshops, and special events.
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2 p-4 rounded border border-slate-200 hover:border-purple-200 hover:bg-purple-50/30 transition-colors">
                                  <RadioGroupItem value="vip" id="vip" />
                                  <div className="grid gap-1.5 leading-none ml-2">
                                    <label htmlFor="vip" className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                      VIP Pass - $799
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                      Premium experience with exclusive benefits and personalized attention.
                                    </p>
                                  </div>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                  
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="dietaryRestrictions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dietary Restrictions</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please let us know if you have any dietary restrictions" 
                                className="resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="hearAbout"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How did you hear about us?</FormLabel>
                            <FormControl>
                              <Input placeholder="Social media, colleague, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="specialRequirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requirements</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any accessibility needs or other special requirements" 
                                className="resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}
                  
                  <div className="flex justify-between pt-4">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                      >
                        Back
                      </Button>
                    ) : <div></div>}
                    
                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Continue <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Complete Registration"}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
