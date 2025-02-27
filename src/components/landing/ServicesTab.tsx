
import React from 'react';
import { Monitor, Smartphone, Globe, TrendingUp, Shield, PieChart } from 'lucide-react';

export function ServicesTab() {
  const services = [
    {
      icon: <Monitor className="w-10 h-10 text-[#9b87f5]" />,
      title: "Web Development",
      description: "Custom web applications and platforms built with the latest technologies and best practices."
    },
    {
      icon: <Smartphone className="w-10 h-10 text-[#9b87f5]" />,
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps designed for optimal user experience and performance."
    },
    {
      icon: <Globe className="w-10 h-10 text-[#9b87f5]" />,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your online presence and reach your target audience."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[#9b87f5]" />,
      title: "Business Consulting",
      description: "Strategic business advice to help you navigate the digital landscape and achieve your goals."
    },
    {
      icon: <Shield className="w-10 h-10 text-[#9b87f5]" />,
      title: "Cybersecurity",
      description: "Protecting your digital assets with industry-leading security solutions and practices."
    },
    {
      icon: <PieChart className="w-10 h-10 text-[#9b87f5]" />,
      title: "Data Analytics",
      description: "Turning your data into actionable insights to drive business decisions and growth."
    }
  ];

  return (
    <div className="py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
