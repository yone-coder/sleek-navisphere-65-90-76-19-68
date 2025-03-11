
import React, { useState, useEffect } from 'react';

const RegistrationCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Set the target date (April 10, 2025, 7:59 PM)
  const targetDate = new Date('2025-04-10T19:59:00');
  
  useEffect(() => {
    // Define the calculation function inside useEffect
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Registration closed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    // Initial calculation
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Cleanup
    return () => {
      clearInterval(timer);
    };
  }, [targetDate]); // Add targetDate as a dependency to ensure the effect runs only when targetDate changes
  
  // Format with leading zeros
  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };
  
  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg shadow-sm">
        <div className="text-3xl font-bold text-blue-700">{formatNumber(timeLeft.days)}</div>
        <div className="text-sm text-gray-500">days</div>
      </div>
      <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg shadow-sm">
        <div className="text-3xl font-bold text-blue-700">{formatNumber(timeLeft.hours)}</div>
        <div className="text-sm text-gray-500">hours</div>
      </div>
      <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg shadow-sm">
        <div className="text-3xl font-bold text-blue-700">{formatNumber(timeLeft.minutes)}</div>
        <div className="text-sm text-gray-500">minutes</div>
      </div>
      <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg shadow-sm">
        <div className="text-3xl font-bold text-blue-700">{formatNumber(timeLeft.seconds)}</div>
        <div className="text-sm text-gray-500">seconds</div>
      </div>
    </div>
  );
};

export default RegistrationCountdown;
