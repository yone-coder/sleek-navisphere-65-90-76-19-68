
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DescriptionTab } from "./tabs/DescriptionTab";
import { FAQsTab } from "./tabs/FAQsTab";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Truck,
  Package,
  Award,
  BarChart4, 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Search,
  Filter
} from "lucide-react";
import { useState } from "react";

type ProductTabsProps = {
  description: string;
  specifications?: { name: string; value: string }[];
};

export function ProductTabs({ description, specifications = [] }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <Tabs 
      defaultValue="description" 
      className="w-full mt-8"
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="grid grid-cols-5 h-auto p-0 bg-transparent">
        <TabsTrigger 
          value="description" 
          className={`flex flex-col items-center justify-center py-3 rounded-none border-b-2 ${
            activeTab === "description" ? "border-primary text-primary" : "border-transparent"
          } transition-colors hover:text-primary data-[state=active]:bg-transparent data-[state=active]:text-primary`}
        >
          Description
        </TabsTrigger>
        <TabsTrigger 
          value="specs" 
          className={`flex flex-col items-center justify-center py-3 rounded-none border-b-2 ${
            activeTab === "specs" ? "border-primary text-primary" : "border-transparent"
          } transition-colors hover:text-primary data-[state=active]:bg-transparent data-[state=active]:text-primary`}
        >
          Specs
        </TabsTrigger>
        <TabsTrigger 
          value="shipping" 
          className={`flex flex-col items-center justify-center py-3 rounded-none border-b-2 ${
            activeTab === "shipping" ? "border-primary text-primary" : "border-transparent"
          } transition-colors hover:text-primary data-[state=active]:bg-transparent data-[state=active]:text-primary`}
        >
          Shipping
        </TabsTrigger>
        <TabsTrigger 
          value="reviews" 
          className={`flex flex-col items-center justify-center py-3 rounded-none border-b-2 ${
            activeTab === "reviews" ? "border-primary text-primary" : "border-transparent"
          } transition-colors hover:text-primary data-[state=active]:bg-transparent data-[state=active]:text-primary`}
        >
          Reviews
        </TabsTrigger>
        <TabsTrigger 
          value="faqs" 
          className={`flex flex-col items-center justify-center py-3 rounded-none border-b-2 ${
            activeTab === "faqs" ? "border-primary text-primary" : "border-transparent"
          } transition-colors hover:text-primary data-[state=active]:bg-transparent data-[state=active]:text-primary`}
        >
          FAQs
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-6">
        <TabsContent value="description" className="mt-0">
          <DescriptionTab description={description} />
        </TabsContent>
        
        <TabsContent value="specs" className="mt-0">
          <div className="space-y-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Product Specifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex border-b border-gray-100 pb-3">
                  <span className="w-1/2 text-gray-500">{spec.name}</span>
                  <span className="w-1/2 font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
            
            <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
              <h4 className="font-medium mb-2">Product Dimensions</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="block text-gray-500 text-sm">Height</span>
                  <span className="font-medium">12 cm</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm">Width</span>
                  <span className="font-medium">36 cm</span>
                </div>
                <div>
                  <span className="block text-gray-500 text-sm">Depth</span>
                  <span className="font-medium">8 cm</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-gray-50">ISO 9001</Badge>
                <Badge variant="outline" className="bg-gray-50">CE Certified</Badge>
                <Badge variant="outline" className="bg-gray-50">RoHS Compliant</Badge>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="shipping" className="mt-0">
          <div className="space-y-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Shipping Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Delivery Options</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded-lg hover:border-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Standard Shipping</p>
                        <p className="text-sm text-gray-500">4-7 business days</p>
                      </div>
                    </div>
                    <p className="font-medium">$4.99</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg hover:border-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Express Delivery</p>
                        <p className="text-sm text-gray-500">2-3 business days</p>
                      </div>
                    </div>
                    <p className="font-medium">$12.99</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg hover:border-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Free Shipping</p>
                        <p className="text-sm text-gray-500">On orders over $75</p>
                      </div>
                    </div>
                    <Badge>Free</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">International Shipping</h4>
                <p className="text-gray-600">We ship to over 100 countries worldwide. International shipping rates vary based on location and order size.</p>
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-2">Region</th>
                      <th className="text-left py-2">Delivery Time</th>
                      <th className="text-right py-2">Starting Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Europe</td>
                      <td className="py-2">7-10 days</td>
                      <td className="text-right py-2">$15.99</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Asia</td>
                      <td className="py-2">10-14 days</td>
                      <td className="text-right py-2">$18.99</td>
                    </tr>
                    <tr>
                      <td className="py-2">Other regions</td>
                      <td className="py-2">14-21 days</td>
                      <td className="text-right py-2">$24.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Order Tracking</h4>
              <p className="text-gray-600">Once your order ships, you will receive a confirmation email with a tracking number and link to monitor your shipment's progress.</p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h5 className="font-medium mb-3">Shipping FAQs</h5>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium">Do you ship to P.O. boxes?</p>
                    <p className="text-sm text-gray-600">Yes, we do ship to P.O. boxes for standard shipping only.</p>
                  </div>
                  <div>
                    <p className="font-medium">What if my package is damaged?</p>
                    <p className="text-sm text-gray-600">Please contact customer service within 48 hours of delivery with photos of the damage.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-0">
          <div className="space-y-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Customer Reviews
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-center">
                    <h4 className="text-3xl font-bold">4.8</h4>
                    <div className="flex justify-center my-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Based on 128 reviews</p>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 w-2">{rating}</span>
                        <Star className="w-3.5 h-3.5 text-gray-400" />
                        <Progress 
                          value={rating === 5 ? 75 : rating === 4 ? 18 : rating === 3 ? 5 : rating === 2 ? 2 : 0} 
                          max={100} 
                          className="h-2 flex-1"
                          background="bg-gray-200"
                          fill={rating >= 4 ? "bg-green-500" : rating === 3 ? "bg-yellow-500" : "bg-red-500"}
                        />
                        <span className="text-sm text-gray-600 w-8">
                          {rating === 5 ? '75%' : rating === 4 ? '18%' : rating === 3 ? '5%' : rating === 2 ? '2%' : '0%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Review Filters</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Filter className="w-4 h-4 mr-2" />
                      All Reviews
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Positive Only
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                      With Photos
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Search Reviews</h4>
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search in reviews..."
                      className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                {[
                  {
                    author: "Sarah J.",
                    rating: 5,
                    date: "August 23, 2023",
                    title: "Perfect addition to my collection!",
                    content: "I absolutely love this product. The quality is outstanding and it looks even better in person than in the photos. Shipping was quick and the packaging was eco-friendly which I really appreciate.",
                    helpful: 24
                  },
                  {
                    author: "Michael T.",
                    rating: 4,
                    date: "July 15, 2023",
                    title: "Great quality, small design flaw",
                    content: "Overall this is an excellent product. The materials and build quality are top-notch. My only complaint is a small design issue that could be improved, but it doesn't affect the functionality. Would recommend!",
                    helpful: 12
                  },
                  {
                    author: "Emma L.",
                    rating: 5,
                    date: "June 30, 2023",
                    title: "Exceeded my expectations",
                    content: "I was hesitant to order this at first, but I'm so glad I did! The product arrived ahead of schedule and was exactly as described. The attention to detail is impressive and it fits perfectly with my existing items.",
                    helpful: 8
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{review.author}</h4>
                        <div className="flex items-center my-1 gap-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">• {review.date}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-gray-50">Verified Purchase</Badge>
                    </div>
                    
                    <h5 className="font-medium mt-2">{review.title}</h5>
                    <p className="text-gray-600 mt-1 mb-3 text-sm">{review.content}</p>
                    
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
          </div>
        </TabsContent>
        
        <TabsContent value="faqs" className="mt-0">
          <FAQsTab />
        </TabsContent>
      </div>
    </Tabs>
  );
}
