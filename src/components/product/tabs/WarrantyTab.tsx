
import { type FC } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ShieldCheck, CalendarClock, ScrollText, Info, CheckCircle, XCircle, Phone, RefreshCw, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const WarrantyTab: FC = () => {
  return (
    <TabsContent value="warranty" className="mt-6">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#0FA0CE]/5 to-[#0FA0CE]/10 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <ShieldCheck className="w-8 h-8 text-[#0FA0CE]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Premium Protection Plan</h3>
              <p className="text-sm text-gray-600">Comprehensive coverage for your peace of mind</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-medium text-[#0FA0CE] bg-[#0FA0CE]/10 rounded-full">
              Active
            </span>
          </div>
        </div>

        {/* Coverage Period */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <CalendarClock className="w-5 h-5 text-[#0FA0CE]" />
              <h4 className="font-medium text-gray-900">Coverage Period</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Start Date</span>
                <span className="text-sm font-medium text-gray-900">Upon Delivery</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Duration</span>
                <span className="text-sm font-medium text-gray-900">24 Months</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">End Date</span>
                <span className="text-sm font-medium text-gray-900">August 15, 2026</span>
              </div>
              <div className="pt-3">
                <div className="flex justify-between mb-2 text-xs">
                  <span className="text-gray-600">Warranty used:</span>
                  <span className="font-medium">25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
            </div>
          </div>

          {/* Coverage Details */}
          <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <ScrollText className="w-5 h-5 text-[#0FA0CE]" />
              <h4 className="font-medium text-gray-900">Coverage Details</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-gray-900">Parts & Labor</span>
                  <p className="text-xs text-gray-600 mt-1">Covers all manufacturer defects in materials and workmanship</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-gray-900">Free Shipping</span>
                  <p className="text-xs text-gray-600 mt-1">Two-way shipping included for all warranty repairs</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-gray-900">Not Covered</span>
                  <p className="text-xs text-gray-600 mt-1">Accidental damage, water damage, normal wear and tear</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Options */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <Phone className="w-5 h-5 text-[#0FA0CE]" />
            <h4 className="font-medium text-gray-900">Contact Support</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-100 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
              <div className="mx-auto w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full mb-3">
                <Phone className="w-5 h-5 text-purple-600" />
              </div>
              <h5 className="font-medium text-gray-900 mb-1">Phone Support</h5>
              <p className="text-xs text-gray-600 mb-3">24/7 Premium Support</p>
              <a href="tel:+18005551234" className="text-sm text-purple-600 font-medium">1-800-555-1234</a>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
              <div className="mx-auto w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mb-3">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <h5 className="font-medium text-gray-900 mb-1">Email Support</h5>
              <p className="text-xs text-gray-600 mb-3">Response within 24 hours</p>
              <a href="mailto:support@example.com" className="text-sm text-blue-600 font-medium">support@example.com</a>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
              <div className="mx-auto w-10 h-10 flex items-center justify-center bg-green-100 rounded-full mb-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h5 className="font-medium text-gray-900 mb-1">Live Chat</h5>
              <p className="text-xs text-gray-600 mb-3">Available 9am-6pm EST</p>
              <button className="text-sm text-green-600 font-medium">Start Chat</button>
            </div>
          </div>
        </div>
        
        {/* Extended Warranty */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Extended Protection</h3>
                <p className="text-sm text-gray-600">Add 2 more years of complete coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-purple-600">$29.99</span>
              <Button className="bg-purple-600 hover:bg-purple-700">Add to Cart</Button>
            </div>
          </div>
          
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span className="text-xs text-gray-700">Covers all manufacturer defects</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span className="text-xs text-gray-700">Free two-way shipping</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span className="text-xs text-gray-700">Priority support queue</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span className="text-xs text-gray-700">One-time accidental damage protection</span>
            </div>
          </div>
        </div>
        
        {/* Registration Form */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <RefreshCw className="w-5 h-5 text-[#0FA0CE]" />
            <h4 className="font-medium text-gray-900">Product Registration</h4>
          </div>
          
          <p className="text-sm text-gray-600 mb-5">Register your product to activate your warranty and receive important product updates.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Serial Number</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" placeholder="XXX-XXXX-XXXX-XXX" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Purchase Date</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
            </div>
          </div>
          
          <div className="flex items-center justify-end">
            <Button>Register Product</Button>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <Info className="w-5 h-5 text-[#0FA0CE]" />
            <h4 className="font-medium text-gray-900">Warranty FAQ</h4>
          </div>
          
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <h5 className="font-medium text-gray-900 mb-2">How do I make a warranty claim?</h5>
              <p className="text-sm text-gray-600">To make a warranty claim, contact our support team with your order number and a description of the issue. Our team will guide you through the process.</p>
            </div>
            
            <div className="border-b border-gray-100 pb-4">
              <h5 className="font-medium text-gray-900 mb-2">What's the difference between standard and extended warranty?</h5>
              <p className="text-sm text-gray-600">The standard warranty covers manufacturer defects for 2 years. The extended warranty adds 2 more years of coverage plus one-time accidental damage protection.</p>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Is the warranty transferable?</h5>
              <p className="text-sm text-gray-600">No, our warranty is non-transferable and applies only to the original purchaser with proof of purchase.</p>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};
