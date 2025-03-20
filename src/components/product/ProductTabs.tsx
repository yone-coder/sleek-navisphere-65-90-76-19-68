
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DescriptionTab } from "./tabs/DescriptionTab";
import { WarrantyTab } from "./tabs/WarrantyTab";
import { ReviewsTab } from "./tabs/ReviewsTab";
import { FAQsTab } from "./tabs/FAQsTab";
import { 
  FileText, Shield, MessageSquare, HelpCircle, Settings, 
  Truck, Star, BarChart3, Calendar, Award, Tag
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ProductTabsProps = {
  description: string;
  highlights: string[];
  rating: number;
  reviews: number;
};

export function ProductTabs({
  description,
  highlights,
  rating,
  reviews,
}: ProductTabsProps) {
  const { isMobile } = useIsMobile();

  return (
    <Tabs defaultValue="description" className="w-full max-w-full">
      {/* Tab navigation */}
      <div className="relative border-b border-gray-100 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin pb-4 w-full">
          <div className="px-2 md:px-6 flex justify-start min-w-max">
            <TabsList className="flex w-max h-12 bg-gradient-to-b from-gray-50/50 to-white p-2 rounded-2xl mb-2 overflow-visible">
              <TabsTrigger 
                value="description"
                className="relative h-full px-3 md:px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium text-sm">Description</span>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="specifications"
                className="relative h-full px-3 md:px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="font-medium text-sm">{isMobile ? "Specs" : "Specifications"}</span>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="shipping"
                className="relative h-full px-3 md:px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span className="font-medium text-sm">{isMobile ? "Shipping" : "Shipping & Delivery"}</span>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="warranty"
                className="relative h-full px-3 md:px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium text-sm">{isMobile ? "Support" : "Warranty & Support"}</span>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="reviews"
                className="relative h-full px-3 md:px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-medium text-sm">Reviews</span>
                  <div className="inline-flex">
                    <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 text-xs font-medium bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-full shadow-sm">
                      {reviews}
                    </span>
                  </div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="faqs"
                className="relative h-full px-3 md:px-4 text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-xl bg-transparent data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50 transition-all duration-500 hover:text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span className="font-medium text-sm">Q&A</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
      </div>

      {/* Tab content - contained within fixed width to prevent overflow */}
      <div className="mt-6 w-full max-w-full overflow-hidden">
        <DescriptionTab description={description} highlights={highlights} />
        
        <TabsContent value="specifications" className="w-full max-w-full">
          <div className="space-y-6">
            <div className="bg-gray-50/50 rounded-lg p-6">
              <h3 className="font-medium text-lg mb-4">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                  <p className="text-sm font-medium text-gray-500">Material</p>
                  <p className="font-medium text-gray-900">Premium Cotton Blend</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                  <p className="text-sm font-medium text-gray-500">Weight</p>
                  <p className="font-medium text-gray-900">0.3 kg</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                  <p className="text-sm font-medium text-gray-500">Dimensions</p>
                  <p className="font-medium text-gray-900">24 × 12 × 3 cm</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                  <p className="text-sm font-medium text-gray-500">Care Instructions</p>
                  <p className="font-medium text-gray-900">Machine wash cold</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Technical Details</h4>
                <div className="space-y-2">
                  {[
                    { label: "Product ID", value: "BT-583-2023-X" },
                    { label: "Manufacturer", value: "AudioTech Industries" },
                    { label: "Country of Origin", value: "Japan" },
                    { label: "Production Date", value: "2023" },
                    { label: "Warranty", value: "2 Years Limited" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Performance Metrics</h4>
                <div className="space-y-2">
                  {[
                    { label: "Battery Life", value: "Up to 15 hours" },
                    { label: "Charging Time", value: "2.5 hours" },
                    { label: "Bluetooth Range", value: "10 meters" },
                    { label: "Water Resistance", value: "IPX7 Rating" },
                    { label: "Audio Output", value: "20W RMS" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-medium text-blue-900 mb-3">What's in the Box</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  "1 x Main Product Unit",
                  "1 x USB-C Charging Cable",
                  "1 x User Manual",
                  "1 x Quick Start Guide",
                  "1 x Warranty Card",
                  "1 x Travel Pouch"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-blue-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="w-full max-w-full">
          <div className="space-y-8">
            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-100 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="h-5 w-5 text-green-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Free Shipping</h4>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Fast Delivery</h4>
                <p className="text-xs text-gray-500">2-5 business days</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Guaranteed</h4>
                <p className="text-xs text-gray-500">100% secure shipping</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Tag className="h-5 w-5 text-amber-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Track Orders</h4>
                <p className="text-xs text-gray-500">Real-time updates</p>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Options</h3>
              <div className="space-y-4">
                <div className="flex items-start border-b border-gray-100 pb-4">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-medium text-green-600">1</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">Standard Shipping</h4>
                    <p className="text-xs text-gray-500 mt-1">Delivery in 3-5 business days</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="bg-gray-50 text-gray-700">Free over $50</Badge>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700">$4.99 standard</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start border-b border-gray-100 pb-4">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-medium text-blue-600">2</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">Express Shipping</h4>
                    <p className="text-xs text-gray-500 mt-1">Delivery in 1-2 business days</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-gray-50 text-gray-700">$12.99</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-medium text-purple-600">3</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">Same Day Delivery</h4>
                    <p className="text-xs text-gray-500 mt-1">Available in select cities for orders placed before 11am</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-gray-50 text-gray-700">$19.99</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Estimator */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Estimator</h3>
              <div className="flex items-center gap-2 mb-4">
                <input 
                  type="text" 
                  placeholder="Enter ZIP/Postal Code" 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm flex-1"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">Check</Button>
              </div>
              <div className="text-xs text-blue-700 italic">
                Enter your ZIP/Postal code to check delivery options and estimated arrival dates
              </div>
            </div>

            {/* International Shipping */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">International Shipping</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <span className="text-sm text-gray-900">North America</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">$12.99 - $24.99</div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <span className="text-sm text-gray-900">Europe</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">$19.99 - $29.99</div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <span className="text-sm text-gray-900">Asia-Pacific</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">$24.99 - $39.99</div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <span className="text-sm text-gray-900">Rest of World</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">$29.99 - $49.99</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Note: International shipping times may vary. Customs duties and taxes may apply and are the responsibility of the customer.
              </div>
            </div>

            {/* Order Tracking */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Track Your Order</h3>
              <div className="flex items-center gap-2 mb-4">
                <input 
                  type="text" 
                  placeholder="Enter Order Number" 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm flex-1"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">Track</Button>
              </div>
              <div className="flex items-center justify-center gap-3 py-6 border-t border-b border-gray-100">
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 mx-auto flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-xs mt-2">Order Placed</div>
                </div>
                <div className="flex-1 h-1 bg-green-500"></div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 mx-auto flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-xs mt-2">Processing</div>
                </div>
                <div className="flex-1 h-1 bg-gray-300"></div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 mx-auto flex items-center justify-center">
                    <span className="text-xs text-gray-600">3</span>
                  </div>
                  <div className="text-xs mt-2">Shipped</div>
                </div>
                <div className="flex-1 h-1 bg-gray-300"></div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 mx-auto flex items-center justify-center">
                    <span className="text-xs text-gray-600">4</span>
                  </div>
                  <div className="text-xs mt-2">Delivered</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-center text-gray-500">
                Example tracking visualization. Enter your order number to see actual status.
              </div>
            </div>

            {/* Shipping FAQ */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping FAQ</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">How long will it take to receive my order?</h4>
                  <p className="text-xs text-gray-600">Standard shipping takes 3-5 business days within the continental US. Express shipping is 1-2 business days. International shipping varies by region.</p>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Do you ship to PO boxes?</h4>
                  <p className="text-xs text-gray-600">Yes, we ship to PO boxes, but express shipping and same-day delivery options are not available for these addresses.</p>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">What happens if my package is lost?</h4>
                  <p className="text-xs text-gray-600">If your package is lost during shipping, please contact our customer service team within 14 days of the expected delivery date for assistance.</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Can I change my shipping address after placing an order?</h4>
                  <p className="text-xs text-gray-600">Address changes can be made if the order has not yet been processed. Please contact customer service immediately with your order number to request an address change.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <WarrantyTab />
        
        <TabsContent value="reviews" className="mt-6 animate-in fade-in">
          <div className="space-y-8">
            {/* Reviews Summary */}
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-gray-900">{rating}</div>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Based on {reviews} reviews</div>
                </div>
                
                <div className="flex-[2] space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    // Calculate percentage based on star rating (mock data)
                    const percentage = star === 5 ? 65 : 
                                      star === 4 ? 20 : 
                                      star === 3 ? 10 : 
                                      star === 2 ? 3 : 2;
                    
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <div className="flex items-center w-24">
                          <span className="text-sm text-gray-600">{star}</span>
                          <Star className="w-3.5 h-3.5 ml-1 text-yellow-400 fill-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <Progress value={percentage} className="h-2" />
                        </div>
                        <div className="w-12 text-xs text-gray-500 text-right">{percentage}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
                <Button className="bg-blue-600 hover:bg-blue-700">Write a Review</Button>
                <Button variant="outline">See All Reviews</Button>
              </div>
            </div>
            
            {/* Review Filters */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 cursor-pointer">
                All Reviews
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 cursor-pointer">
                5 Star
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 cursor-pointer">
                4 Star
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 cursor-pointer">
                3 Star
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 cursor-pointer">
                2 Star
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 cursor-pointer">
                1 Star
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 cursor-pointer">
                With Photos
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 cursor-pointer">
                Most Recent
              </Badge>
            </div>
            
            {/* Reviews List */}
            <div className="space-y-6">
              {[
                {
                  name: "Sarah Johnson",
                  date: "Aug 15, 2023",
                  rating: 5,
                  title: "Amazing quality and sound!",
                  comment: "This speaker exceeded my expectations! The sound quality is crystal clear, and the bass is incredible. Battery life is as advertised, and it easily connects to all my devices. Highly recommend this to anyone looking for premium audio quality.",
                  helpful: 24,
                  images: ["/api/placeholder/100/100", "/api/placeholder/100/100"]
                },
                {
                  name: "Michael Chen",
                  date: "Jul 28, 2023",
                  rating: 4,
                  title: "Great speaker with minor flaws",
                  comment: "The sound quality and battery life are excellent. The only downside is that the Bluetooth connection sometimes drops when I move more than 8 meters away. Otherwise, it's a fantastic speaker for the price.",
                  helpful: 18,
                  images: []
                },
                {
                  name: "Emma Williams",
                  date: "Jun 12, 2023",
                  rating: 5,
                  title: "Perfect for outdoor use!",
                  comment: "I've taken this speaker to the beach, pool, and camping - it holds up perfectly! The water resistance works as advertised, and the sound is loud enough for outdoor gatherings. Couldn't be happier with my purchase.",
                  helpful: 32,
                  images: ["/api/placeholder/100/100"]
                }
              ].map((review, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{review.name}</div>
                        <div className="text-xs text-gray-500">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{review.comment}</p>
                  
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.map((img, i) => (
                        <div key={i} className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                          <img src={img} alt="Review" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {review.helpful} people found this helpful
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600">Helpful</Button>
                  </div>
                </div>
              ))}
              
              <div className="text-center">
                <Button variant="outline" className="w-full md:w-auto">Load More Reviews</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <FAQsTab />
      </div>
    </Tabs>
  );
}
