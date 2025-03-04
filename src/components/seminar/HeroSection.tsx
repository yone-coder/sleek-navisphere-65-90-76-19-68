
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Code, Globe, Layout } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-white -z-10">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 max-w-lg">
            <div className="inline-block py-2 px-4 rounded-full bg-purple-100 text-purple-800 font-medium text-sm mb-2">
              June 15-17, 2024 • Virtual + San Francisco
            </div>
            <h1 className="text-5xl font-bold text-gray-900 md:text-6xl lg:text-7xl leading-tight">
              Modern Web Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Summit</span>
            </h1>
            <p className="text-xl text-gray-600">
              Join the world's top developers and designers for three days of workshops, talks, and networking on the future of web development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6 px-8"
                onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
              >
                Register Now
              </Button>
              <Button 
                variant="outline" 
                className="text-lg py-6 px-8"
                onClick={() => document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Schedule
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:scale-105">
              <Code className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Advanced Frameworks</h3>
              <p className="text-gray-600">Learn the latest in React, Vue, Angular and more</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:scale-105">
              <Layout className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Modern UI/UX</h3>
              <p className="text-gray-600">Design principles for the modern web</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:scale-105">
              <Globe className="w-10 h-10 text-teal-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Web Performance</h3>
              <p className="text-gray-600">Optimize your site for speed and efficiency</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:scale-105">
              <Calendar className="w-10 h-10 text-pink-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Networking Events</h3>
              <p className="text-gray-600">Connect with industry leaders and peers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
