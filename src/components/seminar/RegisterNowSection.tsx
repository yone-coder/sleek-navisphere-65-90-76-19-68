
import React, { useState, useEffect } from 'react';
import { ArrowRight, Lock } from 'lucide-react';

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

  return (
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
