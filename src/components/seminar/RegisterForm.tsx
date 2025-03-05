
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Mail, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const registrationSchema = z.object({
  step1: z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    company: z.string().optional(),
    jobTitle: z.string().optional(),
  }),
  step2: z.object({
    passType: z.enum(["basic", "professional", "team"], {
      required_error: "Please select a pass type.",
    }),
    attendeeCount: z.number().min(1).optional(),
    referralSource: z.string().optional(),
    specialRequirements: z.string().optional(),
  }),
  step3: z.object({
    workshops: z.array(z.string()).optional(),
    marketingConsent: z.boolean().refine((val) => val === true, {
      message: "You must agree to receive updates about the event.",
    }),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  }),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegistrationFormValues>>({
    step1: { firstName: "", lastName: "", email: "", company: "", jobTitle: "" },
    step2: { passType: "professional", attendeeCount: 1, referralSource: "", specialRequirements: "" },
    step3: { workshops: [], marketingConsent: false, termsAccepted: false },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const currentSchema = {
    1: registrationSchema.pick({ step1: true }),
    2: registrationSchema.pick({ step2: true }),
    3: registrationSchema.pick({ step3: true }),
  }[step];

  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    resolver: zodResolver(currentSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: any) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);

    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsComplete(true);
        toast({
          title: "Registration successful!",
          description: "Check your email for confirmation details.",
        });
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const workshopOptions = [
    { id: "workshop1", label: "Building Accessible Interfaces (Day 1)" },
    { id: "workshop2", label: "Design Systems in Practice (Day 2)" },
    { id: "workshop3", label: "Serverless Architectures (Day 2)" },
    { id: "workshop4", label: "Advanced CSS Techniques (Day 3)" },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Register Now</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Secure your spot at the premier web development summit of the year
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {!isComplete ? (
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6 pt-6">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <Tabs value={`${step}`} className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger 
                          value="1" 
                          className={`data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 ${step > 1 ? 'text-green-600' : ''}`}
                          disabled
                        >
                          {step > 1 && <Check className="w-4 h-4 mr-2" />}
                          Personal Info
                        </TabsTrigger>
                        <TabsTrigger 
                          value="2" 
                          className={`data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 ${step > 2 ? 'text-green-600' : ''}`}
                          disabled
                        >
                          {step > 2 && <Check className="w-4 h-4 mr-2" />}
                          Pass Selection
                        </TabsTrigger>
                        <TabsTrigger 
                          value="3" 
                          className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                          disabled
                        >
                          Preferences
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                          <Input
                            id="firstName"
                            placeholder="Enter your first name"
                            {...register("step1.firstName")}
                          />
                          {errors.step1 && errors.step1.firstName && (
                            <p className="text-red-500 text-sm">{String(errors.step1.firstName.message)}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                          <Input
                            id="lastName"
                            placeholder="Enter your last name"
                            {...register("step1.lastName")}
                          />
                          {errors.step1 && errors.step1.lastName && (
                            <p className="text-red-500 text-sm">{String(errors.step1.lastName.message)}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          {...register("step1.email")}
                        />
                        {errors.step1 && errors.step1.email && (
                          <p className="text-red-500 text-sm">{String(errors.step1.email.message)}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          placeholder="Your company name"
                          {...register("step1.company")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          placeholder="Your role"
                          {...register("step1.jobTitle")}
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Label>Select Pass Type <span className="text-red-500">*</span></Label>
                        <RadioGroup defaultValue={formData.step2?.passType} className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="basic" id="pass-basic" {...register("step2.passType")} />
                            <Label htmlFor="pass-basic" className="font-medium">Basic Pass - $299</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="professional" id="pass-professional" {...register("step2.passType")} />
                            <Label htmlFor="pass-professional" className="font-medium">Professional Pass - $599</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="team" id="pass-team" {...register("step2.passType")} />
                            <Label htmlFor="pass-team" className="font-medium">Team Pass - $499 per person (3+ attendees)</Label>
                          </div>
                        </RadioGroup>
                        {errors.step2 && errors.step2.passType && (
                          <p className="text-red-500 text-sm">{String(errors.step2.passType.message)}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="attendeeCount">Number of Attendees (for Team Pass)</Label>
                        <Input
                          id="attendeeCount"
                          type="number"
                          min="1"
                          placeholder="1"
                          {...register("step2.attendeeCount", { valueAsNumber: true })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="referralSource">How did you hear about us?</Label>
                        <Input
                          id="referralSource"
                          placeholder="Google, Social Media, Colleague, etc."
                          {...register("step2.referralSource")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialRequirements">Special Requirements or Accommodations</Label>
                        <Textarea
                          id="specialRequirements"
                          placeholder="Let us know if you have any dietary restrictions, accessibility needs, etc."
                          {...register("step2.specialRequirements")}
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <Label>Select Workshops You'd Like to Attend (Optional)</Label>
                        <div className="space-y-3">
                          {workshopOptions.map((workshop) => (
                            <div key={workshop.id} className="flex items-start space-x-2">
                              <Checkbox
                                id={workshop.id}
                                value={workshop.id}
                                {...register("step3.workshops")}
                              />
                              <Label htmlFor={workshop.id} className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {workshop.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="marketingConsent"
                            {...register("step3.marketingConsent")}
                          />
                          <Label htmlFor="marketingConsent" className="text-sm font-normal leading-normal">
                            I agree to receive updates about the event, including schedule changes, speaker announcements, and session reminders.
                          </Label>
                        </div>
                        {errors.step3 && errors.step3.marketingConsent && (
                          <p className="text-red-500 text-sm">{String(errors.step3.marketingConsent.message)}</p>
                        )}

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="termsAccepted"
                            {...register("step3.termsAccepted")}
                          />
                          <Label htmlFor="termsAccepted" className="text-sm font-normal leading-normal">
                            I agree to the <a href="#" className="text-purple-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>.
                          </Label>
                        </div>
                        {errors.step3 && errors.step3.termsAccepted && (
                          <p className="text-red-500 text-sm">{String(errors.step3.termsAccepted.message)}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    {step > 1 ? (
                      <Button type="button" variant="outline" onClick={handlePrevious}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    <Button 
                      type="submit" 
                      className={step === 3 ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" : ""}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Processing..."
                      ) : step < 3 ? (
                        <>
                          Continue <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        "Complete Registration"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-green-200 shadow-sm bg-green-50">
              <CardContent className="p-6 pt-6 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Complete!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for registering for the WebDev Summit 2024. We've sent a confirmation email to <span className="font-medium">{formData.step1?.email}</span> with all the details.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
                  </Button>
                  <Button variant="outline">
                    <User className="mr-2 h-4 w-4" /> Update Profile
                  </Button>
                </div>

                <div className="mt-8 p-4 border border-blue-200 rounded-lg bg-blue-50 inline-block">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-500 mr-2" />
                    <p className="text-sm text-blue-700">
                      Can't find our email? Check your spam folder or <a href="#" className="underline font-medium">contact support</a>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
