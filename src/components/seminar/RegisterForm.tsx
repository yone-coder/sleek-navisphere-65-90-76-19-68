
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const FormSchema = z.object({
  step1: z.object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }).optional(),
  }),
  step2: z.object({
    companyName: z.string().optional(),
    jobTitle: z.string().optional(),
    experience: z.enum(['beginner', 'intermediate', 'advanced'], {
      required_error: 'Please select your experience level.',
    }),
    hearAbout: z.string().optional(),
  }),
  step3: z.object({
    interests: z.array(z.string()).min(1, { message: 'Please select at least one interest.' }),
    specialRequirements: z.string().optional(),
    agreeTerms: z.boolean().refine(val => val === true, {
      message: 'You must agree to the terms and conditions.',
    }),
    receiveUpdates: z.boolean().optional(),
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormValues>>({
    step1: { firstName: '', lastName: '', email: '', phone: '' },
    step2: { companyName: '', jobTitle: '', experience: 'intermediate', hearAbout: '' },
    step3: { interests: [], specialRequirements: '', agreeTerms: false, receiveUpdates: false },
  });
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: formData,
    mode: 'onChange',
  });

  const nextStep = async () => {
    const stepKey = `step${step}` as keyof FormValues;
    const isValid = await form.trigger(stepKey as any);
    
    if (isValid) {
      const currentStepData = form.getValues(stepKey as any);
      setFormData(prev => ({ ...prev, [stepKey]: currentStepData }));
      
      if (step < 3) {
        setStep(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // In a real application, you'd submit to an API here
    console.log('Form submitted:', form.getValues());
    setCompleted(true);
    toast({
      title: "Registration successful!",
      description: "We'll send you more details via email soon.",
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="step1.firstName"
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
                name="step1.lastName"
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
              <FormField
                control={form.control}
                name="step1.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="step1.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="step2.companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="step2.jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="step2.experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="beginner" />
                          </FormControl>
                          <FormLabel className="font-normal">Beginner</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="intermediate" />
                          </FormControl>
                          <FormLabel className="font-normal">Intermediate</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="advanced" />
                          </FormControl>
                          <FormLabel className="font-normal">Advanced</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="step2.hearAbout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you hear about us?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="friend">Friend or Colleague</SelectItem>
                        <SelectItem value="email">Email Newsletter</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="step3.interests"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">What topics are you interested in?</FormLabel>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {['HTML & CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python', 'UI/UX Design'].map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="step3.interests"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      const updatedInterests = checked
                                        ? [...(field.value || []), item]
                                        : field.value?.filter((value) => value !== item) || [];
                                      field.onChange(updatedInterests);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="step3.specialRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requirements (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any dietary, accessibility, or other requirements we should know about..."
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
                name="step3.agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the <a href="#" className="text-purple-600 hover:underline">terms of service</a> and <a href="#" className="text-purple-600 hover:underline">privacy policy</a>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="step3.receiveUpdates"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I'd like to receive updates about future events and courses
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (completed) {
    return (
      <div className="text-center py-12 max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Registration Complete!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for registering for our Web Development Seminar. We've sent a confirmation to your email.
        </p>
        <Button className="w-full">Download Calendar Invite</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === stepNumber 
                    ? 'bg-purple-600 text-white' 
                    : step > stepNumber 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
              </div>
              <span className="text-xs mt-1 text-gray-600">{
                stepNumber === 1 ? 'Contact' : stepNumber === 2 ? 'Professional' : 'Preferences'
              }</span>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="absolute top-0 h-1 bg-gray-200 w-full">
            <div 
              className="absolute top-0 h-1 bg-purple-600 transition-all" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <Form {...form}>
        <form className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">{
            step === 1 ? 'Your Contact Information' : 
            step === 2 ? 'Professional Background' : 
            'Interests & Preferences'
          }</h3>
          
          {renderStepContent()}
          
          <div className="flex justify-between mt-8">
            <Button 
              type="button" 
              onClick={prevStep} 
              variant="outline" 
              disabled={step === 1}
              className="w-1/3"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button 
              type="button" 
              onClick={nextStep} 
              className="w-1/3 bg-purple-600 hover:bg-purple-700"
            >
              {step === 3 ? 'Submit' : 'Next'} {step !== 3 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
