
import React from 'react';
import { Sparkles, Target, BookOpen } from 'lucide-react';

export function StoryTab() {
  return (
    <div className="py-6 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#9b87f5]" />
            Our Story
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2018, Mima Group started as a small digital design studio with a passion for creating meaningful digital experiences. From our humble beginnings, we've grown into a dynamic investment holding company that spans multiple sectors while maintaining our core vision of building community-centered digital spaces.
          </p>
          <div className="pt-4 pl-3 border-l-2 border-[#9b87f5]/20">
            <p className="text-gray-500 italic">
              "We believe in the power of digital platforms to bring people together, facilitate commerce, and create healthy competition that drives innovation."
            </p>
            <p className="text-sm text-gray-400 mt-2">— Jean-Pierre Desarmes, Founder</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#9b87f5]" />
            Our Mission
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-2">Community Building</h4>
              <p className="text-gray-600 text-sm">Creating digital spaces where like-minded individuals can connect, share ideas, and grow together.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-2">Innovative Commerce</h4>
              <p className="text-gray-600 text-sm">Developing platforms that enable seamless and secure transactions between community members.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-2">Healthy Competition</h4>
              <p className="text-gray-600 text-sm">Fostering environments where friendly competition leads to personal and collective growth.</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-900 mb-2">Global Reach</h4>
              <p className="text-gray-600 text-sm">Connecting individuals across borders through technology while respecting cultural differences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
