
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: any) => {
        render: (container: HTMLElement) => void;
      };
    };
  }
}

const ModishCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, selectedColor, quantity } = location.state || {};
  
  const [paymentStep, setPaymentStep] = useState(1);
  const [showPaypalButtons, setShowPaypalButtons] = useState(false);
  const paypalButtonsRef = useRef<HTMLDivElement>(null);
  
  // Redirect to product page if no product data is available
  useEffect(() => {
    if (!product) {
      navigate('/modish');
    }
  }, [product, navigate]);

  const loadPayPalScript = () => {
    // Check if PayPal script is already loaded
    if (window.paypal) {
      initializePayPalButtons();
      return;
    }

    // Create PayPal script element
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=test&currency=USD";
    script.async = true;
    script.onload = () => initializePayPalButtons();
    script.onerror = () => {
      toast.error('Failed to load PayPal');
      setShowPaypalButtons(false);
    };
    document.body.appendChild(script);
  };

  const initializePayPalButtons = () => {
    if (!paypalButtonsRef.current || !window.paypal) return;

    // Clear existing buttons if any
    paypalButtonsRef.current.innerHTML = '';
    
    window.paypal.Buttons({
      createOrder: (_data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            description: product.name,
            amount: {
              value: (product.discountPrice * quantity).toFixed(2)
            }
          }]
        });
      },
      onApprove: (_data: any, actions: any) => {
        return actions.order.capture().then(function() {
          toast.success('Payment successful!');
          navigate('/modish');
        });
      },
      onCancel: () => {
        toast.info('Payment cancelled');
        setShowPaypalButtons(false);
      },
      onError: () => {
        toast.error('Payment failed');
        setShowPaypalButtons(false);
      }
    }).render(paypalButtonsRef.current);
  };

  const handleNextStep = () => {
    if (paymentStep < 3) {
      setPaymentStep(prev => prev + 1);
    }
    
    if (paymentStep === 2) {
      setShowPaypalButtons(true);
      // Load PayPal script at the final step
      loadPayPalScript();
    }
  };

  const handlePrevStep = () => {
    if (paymentStep > 1) {
      setPaymentStep(prev => prev - 1);
      
      if (paymentStep === 3) {
        setShowPaypalButtons(false);
      }
    }
  };

  const handleCancel = () => {
    navigate('/modish');
  };

  // Cleanup PayPal script when component unmounts
  useEffect(() => {
    return () => {
      const paypalScript = document.querySelector('script[src*="paypal.com/sdk/js"]');
      if (paypalScript) {
        paypalScript.remove();
      }
    };
  }, []);

  if (!product) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Checkout header */}
      <div className="border-b p-4 flex items-center">
        <button 
          className="p-2 rounded-full hover:bg-gray-100" 
          onClick={paymentStep === 1 ? handleCancel : handlePrevStep}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 text-center font-medium">
          Order Details
        </div>
        <button 
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500" 
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
      
      {/* Payment progress */}
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              paymentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              {paymentStep > 1 ? <CheckCircle className="w-5 h-5" /> : 1}
            </div>
            <span className="text-xs mt-1">Order</span>
          </div>
          
          <div className={`h-1 flex-1 mx-2 ${paymentStep > 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              paymentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              {paymentStep > 2 ? <CheckCircle className="w-5 h-5" /> : 2}
            </div>
            <span className="text-xs mt-1">Delivery</span>
          </div>
          
          <div className={`h-1 flex-1 mx-2 ${paymentStep > 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              paymentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              3
            </div>
            <span className="text-xs mt-1">Payment</span>
          </div>
        </div>
      </div>
      
      {/* Payment content */}
      <div className="flex-1 px-4 overflow-auto">
        {paymentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Order Summary</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{product.name}</h4>
                  <p className="text-sm text-gray-500">Color: {selectedColor}</p>
                  <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                </div>
                <div className="font-medium">${(product.discountPrice * quantity).toFixed(2)}</div>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium">${(product.discountPrice * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm font-medium">Free</span>
                </div>
                <div className="flex justify-between font-medium mt-2">
                  <span>Total</span>
                  <span>${(product.discountPrice * quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {paymentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Delivery Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Address</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Street address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">City</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Zip Code</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      placeholder="Zip code"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Your phone number"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {paymentStep === 3 && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Payment Method</h3>
              {showPaypalButtons ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">Choose your payment method below:</p>
                  <div ref={paypalButtonsRef} className="paypal-button-container" />
                </div>
              ) : (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Payment footer */}
      <div className="border-t p-4">
        {paymentStep < 3 && (
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleNextStep}
          >
            Continue {paymentStep === 1 ? 'to Delivery' : 'to Payment'}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModishCheckout;
