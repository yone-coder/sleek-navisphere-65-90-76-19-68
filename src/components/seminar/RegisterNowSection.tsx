
import React, { useState, useEffect } from 'react';
import { ArrowRight, Lock, Check, X, FileText, Award, BookOpen, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const RegisterNowSection = () => {
  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 8,
    minutes: 45,
    seconds: 30
  });

  // State for hover effect on button
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation state for progress bar
  const [isAnimating, setIsAnimating] = useState(false);
  
  // State for packages dialog
  const [isPackagesDialogOpen, setIsPackagesDialogOpen] = useState(false);
  
  // State for selected package
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  const { toast } = useToast();

  // Effect for countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Effect for progress bar animation
  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setIsAnimating(true);
    }, 500);
    
    return () => clearTimeout(animationTimeout);
  }, []);

  // Format time unit with leading zero
  const formatTimeUnit = (unit: number) => {
    return unit < 10 ? `0${unit}` : unit;
  };
  
  // Function to handle package selection
  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
  };
  
  // Function to handle registration
  const handleRegister = () => {
    if (!selectedPackage) {
      toast({
        title: "Attention",
        description: "Veuillez sélectionner un forfait avant de continuer.",
        variant: "destructive"
      });
      return;
    }
    
    let packageName = "";
    let price = "";
    
    switch (selectedPackage) {
      case "basic":
        packageName = "Essentiel";
        price = "1000 GDS";
        break;
      case "standard":
        packageName = "Standard";
        price = "1500 GDS";
        break;
      case "premium":
        packageName = "Premium";
        price = "2000 GDS";
        break;
    }
    
    toast({
      title: "Inscription réussie !",
      description: `Vous êtes inscrit au forfait ${packageName} pour ${price}.`,
    });
    
    setIsPackagesDialogOpen(false);
    setSelectedPackage(null);
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-6">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Limited Time Offer</h2>
            <p className="text-gray-600 mt-1">Register now to secure your spot</p>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Registration Progress</span>
              <span className="font-medium">23/100 spots</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out ${isAnimating ? 'w-[23%]' : 'w-0'}`}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">77 spots remaining</p>
          </div>
          
          {/* Countdown Timer */}
          <div className="mb-6">
            <p className="text-center text-sm text-gray-600 mb-2">Offer ends in:</p>
            <div className="flex justify-center space-x-4">
              {/* Days */}
              <div className="text-center">
                <div className="bg-gray-800 text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {formatTimeUnit(timeLeft.days)}
                </div>
                <p className="text-xs text-gray-600 mt-1">Days</p>
              </div>
              
              {/* Hours */}
              <div className="text-center">
                <div className="bg-gray-800 text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {formatTimeUnit(timeLeft.hours)}
                </div>
                <p className="text-xs text-gray-600 mt-1">Hours</p>
              </div>
              
              {/* Minutes */}
              <div className="text-center">
                <div className="bg-gray-800 text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {formatTimeUnit(timeLeft.minutes)}
                </div>
                <p className="text-xs text-gray-600 mt-1">Minutes</p>
              </div>
              
              {/* Seconds */}
              <div className="text-center">
                <div className="bg-gray-800 text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  {formatTimeUnit(timeLeft.seconds)}
                </div>
                <p className="text-xs text-gray-600 mt-1">Seconds</p>
              </div>
            </div>
          </div>
          
          {/* Register Button */}
          <button 
            className={`w-full py-4 rounded-lg font-bold text-white text-lg relative overflow-hidden transition-all duration-300 ${isHovered ? 'bg-blue-700 shadow-lg' : 'bg-blue-600 shadow-md'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsPackagesDialogOpen(true)}
          >
            <div className="relative z-10 flex items-center justify-center">
              <span>S'inscrire maintenant</span>
              <ArrowRight 
                className="ml-2 transform transition-transform duration-300 ease-in-out" 
                style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}
                size={20}
              />
            </div>
            <div 
              className={`absolute inset-0 bg-blue-500 transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
            ></div>
          </button>
          
          {/* Secure Info */}
          <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
            <Lock size={16} className="mr-1" />
            <span>Secure payment • 100% money-back guarantee</span>
          </div>
        </div>
      </div>
      
      {/* Packages Dialog */}
      <Dialog open={isPackagesDialogOpen} onOpenChange={setIsPackagesDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Choisissez votre forfait</DialogTitle>
            <DialogDescription className="text-center">
              Sélectionnez le forfait qui correspond le mieux à vos besoins
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            {/* Basic Package */}
            <div 
              className={`border rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${
                selectedPackage === "basic" 
                  ? "border-blue-500 bg-blue-50 shadow-md" 
                  : "border-gray-200"
              }`}
              onClick={() => handleSelectPackage("basic")}
            >
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg">Essentiel</h3>
                <div className="text-2xl font-bold my-2">1000 GDS</div>
                <p className="text-sm text-gray-500">Accès de base</p>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Accès au séminaire</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Certificat de participation</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-400">Guide PDF</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-400">Ressources supplémentaires</span>
                </li>
              </ul>
            </div>
            
            {/* Standard Package */}
            <div 
              className={`border rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${
                selectedPackage === "standard" 
                  ? "border-blue-500 bg-blue-50 shadow-md" 
                  : "border-gray-200"
              }`}
              onClick={() => handleSelectPackage("standard")}
            >
              <div className="text-center mb-4">
                <div className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-2">
                  Populaire
                </div>
                <h3 className="font-bold text-lg">Standard</h3>
                <div className="text-2xl font-bold my-2">1500 GDS</div>
                <p className="text-sm text-gray-500">Accès intermédiaire</p>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Accès au séminaire</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Certificat de participation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Guide PDF</span>
                </li>
                <li className="flex items-start">
                  <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-400">Ressources supplémentaires</span>
                </li>
              </ul>
            </div>
            
            {/* Premium Package */}
            <div 
              className={`border rounded-lg p-4 transition-all cursor-pointer hover:shadow-md ${
                selectedPackage === "premium" 
                  ? "border-blue-500 bg-blue-50 shadow-md" 
                  : "border-gray-200"
              }`}
              onClick={() => handleSelectPackage("premium")}
            >
              <div className="text-center mb-4">
                <div className="inline-block px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium mb-2">
                  Premium
                </div>
                <h3 className="font-bold text-lg">Premium</h3>
                <div className="text-2xl font-bold my-2">2000 GDS</div>
                <p className="text-sm text-gray-500">Accès complet</p>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Accès au séminaire</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Certificat de participation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Guide PDF</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Ressources supplémentaires</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Features Comparison */}
          <div className="border-t pt-4 mb-6">
            <h4 className="font-medium mb-3">Caractéristiques des forfaits :</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-blue-500" />
                <span>Certificat numérique officiel</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-500" />
                <span>Guide PDF (Standard et Premium)</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <span>Accès aux présentations</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-blue-500" />
                <span>Ressources téléchargeables (Premium)</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPackagesDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleRegister}>
              Confirmer l'inscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisterNowSection;
