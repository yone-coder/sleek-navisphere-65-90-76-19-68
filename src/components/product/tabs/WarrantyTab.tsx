
import { type FC } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ShieldCheck, CalendarClock, ScrollText, Info, CheckCircle, XCircle } from "lucide-react";

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
                <span className="text-sm font-medium text-gray-900">24 Months from Delivery</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <ScrollText className="w-5 h-5 text-[#0FA0CE]" />
              <h4 className="font-medium text-gray-900">Support Terms</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="text-sm font-medium text-gray-900">Within 24 Hours</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Support Channels</span>
                <span className="text-sm font-medium text-gray-900">Email, Phone, Chat</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Priority Service</span>
                <span className="text-sm font-medium text-green-600">Included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coverage Details */}
        <div className="grid grid-cols-1 gap-6">
          <div className="p-6 bg-white rounded-xl border border-gray-100">
            <h4 className="font-medium text-gray-900 mb-4">What's Covered</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Manufacturing defects",
                "Material defects",
                "Mechanical failures",
                "Electrical components",
                "Structural integrity",
                "Moving parts",
                "Upholstery issues",
                "Assembly-related problems"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100">
            <h4 className="font-medium text-gray-900 mb-4">Exclusions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Unauthorized modifications",
                "Normal wear and tear",
                "Accidental damage",
                "Misuse or abuse"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-blue-50 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Additional Information</h4>
              <ul className="space-y-2">
                <li className="text-sm text-blue-700">• Warranty is transferable to new owners</li>
                <li className="text-sm text-blue-700">• Claims can be filed online or through customer service</li>
                <li className="text-sm text-blue-700">• Replacement parts shipped within 48 hours</li>
                <li className="text-sm text-blue-700">• On-site service available in select locations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};
