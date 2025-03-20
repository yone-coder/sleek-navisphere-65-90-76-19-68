
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  CheckCircle, 
  ArrowRight, 
  CreditCard, 
  Truck, 
  Tag, 
  Shield, 
  DollarSign, 
  Gift, 
  MapPin, 
  Clock, 
  Info,
  Heart, 
  MessagesSquare,
  AlertCircle,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const { product, selectedColor, quantity = 1 } = location.state || {};
  
  const [paymentStep, setPaymentStep] = useState(1);
  const [showPaypalButtons, setShowPaypalButtons] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
  const paypalButtonsRef = useRef<HTMLDivElement>(null);
  
  // Mock address options
  const addresses = [
    { id: 1, default: true, name: 'Home', recipient: 'John Doe', phone: '+1 234 567 8901', address: '123 Main St, Apt 4B', city: 'New York', state: 'NY', zip: '10001' },
    { id: 2, default: false, name: 'Work', recipient: 'John Doe', phone: '+1 234 567 8902', address: '456 Office Blvd, Suite 300', city: 'New York', state: 'NY', zip: '10002' },
  ];
  
  const [selectedAddress, setSelectedAddress] = useState(addresses.find(addr => addr.default) || addresses[0]);
  
  // Shipping options with time estimates and prices
  const shippingOptions = [
    { id: 'economy', name: 'Economy Shipping', price: 0.99, time: '15-30 days', icon: <Truck className="w-5 h-5 text-gray-500" /> },
    { id: 'standard', name: 'Standard Shipping', price: 3.99, time: '10-15 days', icon: <Truck className="w-5 h-5 text-blue-500" /> },
    { id: 'express', name: 'Express Shipping', price: 12.99, time: '5-8 days', icon: <Truck className="w-5 h-5 text-orange-500" /> },
  ];
  
  // Payment methods
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'paypal', name: 'PayPal', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'apple', name: 'Apple Pay', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 12.5C17.5 9.5 19.5 8 19.5 8C19.5 8 18 7 18 5C18 3 19.5 2 21 2C21 4 23 5 23 8.5C23 12 20 15 20 15M6.5 23C4.5 23 1 21 1 15.5C1 10 5 7 5 7C5 7 7 10.5 7 13.5M12 10C12 12.7614 9.76142 15 7 15C4.23858 15 2 12.7614 2 10C2 7.23858 4.23858 5 7 5C9.76142 5 12 7.23858 12 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { id: 'google', name: 'Google Pay', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 12.5C19.5 10.1472 17.8528 8.23081 16.0193 8.10604C16.0066 8.1041 16 8.0534 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 8.05341 7.99345 8.1041 7.98071 8.10604C6.14718 8.23081 4.5 10.1472 4.5 12.5C4.5 14.8528 6.14718 16.7692 7.98071 16.894C7.99345 16.8959 8 16.9466 8 17C8 19.2091 9.79086 21 12 21C14.2091 21 16 19.2091 16 17C16 16.9466 16.0066 16.8959 16.0193 16.894C17.8528 16.7692 19.5 14.8528 19.5 12.5Z" stroke="currentColor" strokeWidth="2"/></svg> },
  ];
  
  // Mock recommended items
  const recommendedItems = [
    { id: 1, name: 'Casual T-Shirt', price: 12.99, image: '/lovable-uploads/9e449bdb-9bc8-4c07-833d-aba77900c9c6.png' },
    { id: 2, name: 'Leather Watch', price: 49.99, image: '/lovable-uploads/44c5c93d-ace1-4feb-a49b-db4a8a02f987.png' },
    { id: 3, name: 'Sports Shoes', price: 59.99, image: '/lovable-uploads/7b6dfa3b-fe97-4083-8e4a-0640871dbc3f.png' },
  ];
  
  // Calculate order summary
  const getSelectedShipping = () => {
    return shippingOptions.find(option => option.id === selectedShipping) || shippingOptions[0];
  };
  
  const subtotal = product ? product.discountPrice * quantity : 0;
  const shipping = getSelectedShipping().price;
  const tax = subtotal * 0.05; // 5% tax
  const discount = couponApplied ? discountAmount : 0;
  const total = subtotal + shipping + tax - discount;
  
  // Redirect to product page if no product data is available
  useEffect(() => {
    if (!product) {
      navigate('/modish');
    }
  }, [product, navigate]);

  // Countdown timer for order reservation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.warning("Your order reservation has expired. Please restart the checkout process.");
          setTimeout(() => navigate('/modish'), 3000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);
  
  // Format countdown time as MM:SS
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
              value: total.toFixed(2)
            }
          }]
        });
      },
      onApprove: (_data: any, actions: any) => {
        return actions.order.capture().then(function() {
          handlePaymentSuccess();
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
      
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
    }
    
    if (paymentStep === 2) {
      if (selectedPaymentMethod === 'paypal') {
        setShowPaypalButtons(true);
        // Load PayPal script at the final step
        loadPayPalScript();
      }
    }
  };

  const handlePrevStep = () => {
    if (paymentStep > 1) {
      setPaymentStep(prev => prev - 1);
      
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
      
      if (paymentStep === 3) {
        setShowPaypalButtons(false);
      }
    }
  };

  const handleCancel = () => {
    // Show confirmation before canceling
    if (confirm('Are you sure you want to cancel your order?')) {
      navigate('/modish');
    }
  };
  
  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast.error('Please enter a coupon code');
      return;
    }
    
    // Simulate coupon validation
    if (couponCode.toUpperCase() === 'SAVE10') {
      const discount = subtotal * 0.1; // 10% discount
      setDiscountAmount(discount);
      setCouponApplied(true);
      toast.success('Coupon applied successfully! 10% discount');
    } else {
      toast.error('Invalid coupon code');
    }
  };
  
  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success('Payment successful!');
      
      // Navigate to success confirmation page
      // For now, we'll just go back to product page
      navigate('/modish');
    }, 2000);
  };
  
  // Mock credit card payment processing
  const handleCreditCardPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      handlePaymentSuccess();
    }, 2000);
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
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-64 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Checkout header */}
      <div className="bg-white border-b p-4 flex items-center sticky top-0 z-10 shadow-sm">
        <button 
          className="p-2 rounded-full hover:bg-gray-100" 
          onClick={paymentStep === 1 ? handleCancel : handlePrevStep}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 text-center font-medium">
          {paymentStep === 1 ? 'Order Details' : paymentStep === 2 ? 'Shipping & Delivery' : 'Payment'}
        </div>
        <button 
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500" 
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
      
      {/* Order reservation countdown */}
      <div className="bg-orange-50 border-b border-orange-100 py-2 px-4 flex items-center justify-center text-sm">
        <Clock className="w-4 h-4 text-orange-500 mr-1" />
        <span>Your order is reserved for</span>
        <span className="font-bold text-orange-600 mx-1">{formatCountdown(countdown)}</span>
        <span>minutes</span>
      </div>
      
      {/* Payment progress */}
      <div className="px-4 pt-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              paymentStep >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200'
            }`}>
              {paymentStep > 1 ? <CheckCircle className="w-4 h-4" /> : 1}
            </div>
            <span className="text-xs mt-1">Order</span>
          </div>
          
          <div className={`h-1 flex-1 mx-2 ${paymentStep > 1 ? 'bg-orange-500' : 'bg-gray-200'}`} />
          
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              paymentStep >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200'
            }`}>
              {paymentStep > 2 ? <CheckCircle className="w-4 h-4" /> : 2}
            </div>
            <span className="text-xs mt-1">Delivery</span>
          </div>
          
          <div className={`h-1 flex-1 mx-2 ${paymentStep > 2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
          
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              paymentStep >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-200'
            }`}>
              3
            </div>
            <span className="text-xs mt-1">Payment</span>
          </div>
        </div>
      </div>
      
      {/* Payment content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="max-w-3xl mx-auto pb-24">
          {paymentStep === 1 && (
            <div className="space-y-4 p-4">
              {/* Product review */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 border-b bg-white">
                    <h3 className="font-medium text-lg">Order Summary</h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start gap-3 pb-4 border-b">
                      <div className="w-20 h-20 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">Variant: {selectedColor}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <span className="text-sm font-medium text-orange-500">${product.discountPrice.toFixed(2)}</span>
                            {product.originalPrice > product.discountPrice && (
                              <span className="text-xs line-through text-gray-400 ml-1">${product.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                          <div className="text-sm">
                            Qty: {quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price breakdown */}
                    <div className="pt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Shipping</span>
                        <span>To be calculated</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Estimated tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      {couponApplied && (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600">Discount</span>
                          <span className="text-green-600">-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span className="text-orange-500">${(subtotal + tax - discount).toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Final price will be calculated after shipping selection</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Coupon code */}
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Tag className="w-5 h-5 text-orange-500" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Apply coupon code</div>
                    <div className="text-xs text-gray-500">Enter code to get discounts</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      className="w-32 h-9" 
                      placeholder="SAVE10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                    />
                    <Button 
                      size="sm" 
                      variant={couponApplied ? "outline" : "default"}
                      className={couponApplied ? "bg-green-50 text-green-600 border-green-200" : "bg-orange-500 hover:bg-orange-600"}
                      onClick={couponApplied ? () => {
                        setCouponApplied(false);
                        setCouponCode('');
                        setDiscountAmount(0);
                      } : handleApplyCoupon}
                    >
                      {couponApplied ? 'Remove' : 'Apply'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Buyer protection */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Buyer protection</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Get full refund if the item is not as described or if it is not delivered
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {paymentStep === 2 && (
            <div className="space-y-4 p-4">
              {/* Shipping address */}
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg">Shipping Address</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-orange-500"
                      >
                        Add New
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {addresses.map(address => (
                      <div 
                        key={address.id}
                        className={`border rounded-lg p-3 cursor-pointer ${
                          selectedAddress.id === address.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedAddress(address)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full border ${
                              selectedAddress.id === address.id ? 'border-orange-500 bg-orange-500' : 'border-gray-400'
                            }`}>
                              {selectedAddress.id === address.id && (
                                <div className="w-2 h-2 bg-white rounded-full m-auto mt-[3px]" />
                              )}
                            </div>
                            <div className="font-medium">{address.recipient}</div>
                            {address.default && (
                              <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200 text-[10px]">
                                Default
                              </Badge>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 text-xs text-gray-500"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="text-sm text-gray-600 mt-1 pl-6">
                          {address.address}, {address.city}, {address.state} {address.zip}
                        </div>
                        <div className="text-sm text-gray-600 mt-1 pl-6">
                          Phone: {address.phone}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Shipping options */}
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 border-b">
                    <h3 className="font-medium text-lg">Shipping Method</h3>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {shippingOptions.map(option => (
                      <div 
                        key={option.id}
                        className={`border rounded-lg p-3 cursor-pointer ${
                          selectedShipping === option.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedShipping(option.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full border ${
                              selectedShipping === option.id ? 'border-orange-500 bg-orange-500' : 'border-gray-400'
                            }`}>
                              {selectedShipping === option.id && (
                                <div className="w-2 h-2 bg-white rounded-full m-auto mt-[3px]" />
                              )}
                            </div>
                            <div className="flex items-center">
                              {option.icon}
                              <span className="font-medium ml-2">{option.name}</span>
                            </div>
                          </div>
                          <div className="font-medium text-orange-600">${option.price.toFixed(2)}</div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1 pl-6">
                          Estimated delivery: {option.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Order details for reference */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                      <div className="text-sm text-gray-500 mt-1">Qty: {quantity}</div>
                      <div className="mt-1">
                        <span className="font-medium text-orange-500">${product.discountPrice.toFixed(2)}</span>
                        {product.originalPrice > product.discountPrice && (
                          <span className="text-xs line-through text-gray-400 ml-1">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {paymentStep === 3 && (
            <div className="space-y-4 p-4">
              {/* Payment methods */}
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 border-b">
                    <h3 className="font-medium text-lg">Payment Method</h3>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {paymentMethods.map(method => (
                      <div 
                        key={method.id}
                        className={`border rounded-lg p-3 cursor-pointer ${
                          selectedPaymentMethod === method.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                        }`}
                        onClick={() => {
                          setSelectedPaymentMethod(method.id);
                          setShowPaypalButtons(method.id === 'paypal');
                          if (method.id === 'paypal') {
                            loadPayPalScript();
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border ${
                            selectedPaymentMethod === method.id ? 'border-orange-500 bg-orange-500' : 'border-gray-400'
                          }`}>
                            {selectedPaymentMethod === method.id && (
                              <div className="w-2 h-2 bg-white rounded-full m-auto mt-[3px]" />
                            )}
                          </div>
                          {method.icon}
                          <div className="font-medium">{method.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Credit card form */}
              {selectedPaymentMethod === 'card' && (
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input id="nameOnCard" placeholder="John Doe" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* PayPal buttons */}
              {selectedPaymentMethod === 'paypal' && (
                <Card>
                  <CardContent className="p-4">
                    {showPaypalButtons ? (
                      <div ref={paypalButtonsRef} className="paypal-button-container py-4" />
                    ) : (
                      <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {/* Digital Wallets */}
              {(selectedPaymentMethod === 'apple' || selectedPaymentMethod === 'google') && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="py-8">
                      <h3 className="font-medium mb-2">Continue with {selectedPaymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        You'll be redirected to complete your payment.
                      </p>
                      <Button 
                        className="bg-gray-800 hover:bg-gray-900 text-white" 
                        onClick={handlePaymentSuccess}
                      >
                        Continue to {selectedPaymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Order summary */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Discount</span>
                        <span className="text-green-600">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-orange-500">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Security assurance */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Secure Checkout</span>
                </div>
                <p className="text-xs text-gray-600">
                  Your payment information is encrypted and secure. We do not store your credit card details.
                </p>
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="p-4 mt-2">
            <h3 className="font-medium mb-3">You might also like</h3>
            <div className="grid grid-cols-3 gap-3">
              {recommendedItems.map(item => (
                <div key={item.id} className="border rounded-lg bg-white overflow-hidden">
                  <div className="aspect-square bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2">
                    <div className="text-xs line-clamp-2 min-h-[2.5rem]">{item.name}</div>
                    <div className="font-medium text-orange-500 mt-1">${item.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment footer */}
      <div className="border-t fixed bottom-0 left-0 right-0 p-4 bg-white z-10">
        {paymentStep < 3 ? (
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600"
            onClick={handleNextStep}
          >
            Continue {paymentStep === 1 ? 'to Shipping' : 'to Payment'}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600"
            onClick={selectedPaymentMethod === 'card' ? handleCreditCardPayment : handlePaymentSuccess}
            disabled={isProcessing || (selectedPaymentMethod === 'paypal' && showPaypalButtons)}
          >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                Pay ${total.toFixed(2)}
              </>
            )}
          </Button>
        )}
        
        <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
          <span>Need help?</span>
          <button className="ml-1 text-orange-500 flex items-center">
            <MessagesSquare className="w-3 h-3 mr-1" />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModishCheckout;
