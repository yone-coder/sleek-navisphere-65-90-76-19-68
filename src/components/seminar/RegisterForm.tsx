
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    experience: "",
    interests: [] as string[],
    format: "",
    referral: "",
    agreed: false
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const experienceLevels = [
    "Beginner (0-1 years)",
    "Intermediate (2-3 years)",
    "Advanced (4-6 years)",
    "Expert (7+ years)"
  ];
  
  const interestOptions = [
    "Frontend Development",
    "Backend Development",
    "UI/UX Design",
    "Web Performance",
    "Accessibility",
    "Web Security",
    "DevOps & Deployment",
    "Database & API Design"
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const interests = [...prev.interests];
      
      if (interests.includes(interest)) {
        return { ...prev, interests: interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...interests, interest] };
      }
    });
    
    // Clear error when user selects
    if (errors.interests) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.interests;
        return newErrors;
      });
    }
  };
  
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    } else if (step === 2) {
      if (!formData.experience) newErrors.experience = "Please select your experience level";
      if (formData.interests.length === 0) newErrors.interests = "Please select at least one interest";
    } else if (step === 3) {
      if (!formData.format) newErrors.format = "Please select attendance format";
      if (!formData.agreed) newErrors.agreed = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const handlePrevious = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep(step)) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        toast.success("Registration successful!", {
          description: "You'll receive a confirmation email shortly.",
        });
        setIsSubmitting(false);
        setStep(4); // Success step
      }, 1500);
    }
  };
  
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-purple-600 font-semibold mb-2 inline-block">Join Us</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Register for the Seminar</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Secure your spot for our exclusive web development seminar. Limited seats available for in-person attendance.
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {step < 4 && (
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 flex items-center justify-center rounded-full mb-1 ${
                      s < step ? 'bg-green-100 text-green-600' : 
                      s === step ? 'bg-purple-600 text-white' : 
                      'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {s < step ? <Check className="h-5 w-5" /> : s}
                  </div>
                  <span className={`text-xs font-medium ${s === step ? 'text-purple-600' : 'text-gray-500'}`}>
                    {s === 1 ? 'Personal' : s === 2 ? 'Professional' : 'Preferences'}
                  </span>
                </div>
              ))}
              
              <div className="hidden sm:block absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-0">
                <div className="h-1 bg-gray-200 mx-auto max-w-lg">
                  <div 
                    className="h-1 bg-purple-600 transition-all duration-300"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-8">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-6">Personal Information</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? "border-red-300" : ""}
                    />
                    {errors.firstName && (
                      <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.firstName}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? "border-red-300" : ""}
                    />
                    {errors.lastName && (
                      <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-300" : ""}
                  />
                  {errors.email && (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.email}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="jobTitle">Job Title (Optional)</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-6">Professional Information</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="experience" className="mb-2 block">Experience Level</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => handleSelectChange("experience", value)}
                  >
                    <SelectTrigger className={errors.experience ? "border-red-300" : ""}>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.experience && (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.experience}
                    </div>
                  )}
                </div>
                
                <div>
                  <Label className="mb-2 block">Areas of Interest</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {interestOptions.map((interest) => (
                      <div 
                        key={interest}
                        className={`flex items-center gap-2 border rounded-md p-3 cursor-pointer transition-colors ${
                          formData.interests.includes(interest) 
                            ? 'bg-purple-50 border-purple-200' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleInterestToggle(interest)}
                      >
                        <div className={`w-5 h-5 flex-shrink-0 rounded-sm border ${
                          formData.interests.includes(interest) 
                            ? 'bg-purple-600 border-purple-600' 
                            : 'border-gray-300'
                        } flex items-center justify-center`}>
                          {formData.interests.includes(interest) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm">{interest}</span>
                      </div>
                    ))}
                  </div>
                  {errors.interests && (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.interests}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-6">Preferences & Confirmation</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="format" className="mb-2 block">Attendance Format</Label>
                  <Select
                    value={formData.format}
                    onValueChange={(value) => handleSelectChange("format", value)}
                  >
                    <SelectTrigger className={errors.format ? "border-red-300" : ""}>
                      <SelectValue placeholder="Select attendance format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-Person</SelectItem>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="hybrid">Hybrid (Both)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.format && (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.format}
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="referral">How did you hear about us? (Optional)</Label>
                  <Input
                    id="referral"
                    name="referral"
                    value={formData.referral}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="pt-4">
                  <div 
                    className={`flex items-start gap-2 cursor-pointer`}
                    onClick={() => setFormData(prev => ({ ...prev, agreed: !prev.agreed }))}
                  >
                    <div className={`w-5 h-5 flex-shrink-0 rounded-sm border mt-0.5 ${
                      formData.agreed 
                        ? 'bg-purple-600 border-purple-600' 
                        : errors.agreed ? 'border-red-300' : 'border-gray-300'
                    } flex items-center justify-center`}>
                      {formData.agreed && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-purple-600 underline">Terms & Conditions</a> and <a href="#" className="text-purple-600 underline">Privacy Policy</a>. I understand that my data will be processed as described in the Privacy Policy.
                      </p>
                      {errors.agreed && (
                        <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {errors.agreed}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Registration Successful!</h3>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Thank you, {formData.firstName}! Your registration for the Web Development Seminar has been confirmed. We've sent a confirmation email to {formData.email} with all the details.
              </p>
              
              <div className="space-y-4">
                <p className="font-medium">Next Steps:</p>
                <ol className="text-left max-w-md mx-auto space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>Check your email for a confirmation with detailed instructions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>Complete your profile to customize your seminar experience.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>Join our online community to connect with other attendees.</span>
                  </li>
                </ol>
              </div>
              
              <div className="mt-8">
                <button className="bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition-colors">
                  Complete Your Profile
                </button>
              </div>
            </motion.div>
          )}
        </div>
        
        {step < 4 && (
          <div className="p-6 border-t bg-gray-50 flex justify-between">
            {step > 1 ? (
              <button 
                onClick={handlePrevious}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button 
                onClick={handleNext}
                className="bg-purple-600 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`bg-purple-600 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors flex items-center ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
