
import React, { useState, useEffect } from 'react';
import { ArrowRight, Lock } from 'lucide-react';

const RegisterNowSection = () => {
  // State for hover effect on button
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation state for progress bar
  const [isAnimating, setIsAnimating] = useState(false);

  // Effect for progress bar animation
  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setIsAnimating(true);
    }, 500);
    
    return () => clearTimeout(animationTimeout);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-6">
      <div className="p-6">
        {/* Register Button */}
        <button 
          className={`w-full py-4 rounded-lg font-bold text-white text-lg relative overflow-hidden transition-all duration-300 ${isHovered ? 'bg-blue-700 shadow-lg' : 'bg-blue-600 shadow-md'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative z-10 flex items-center justify-center">
            <span>Register Now</span>
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
  );
};

export default RegisterNowSection;
