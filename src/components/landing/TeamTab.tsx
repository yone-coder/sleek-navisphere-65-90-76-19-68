
import React from 'react';
import { Twitter, Linkedin, Globe } from 'lucide-react';

export function TeamTab() {
  const teamMembers = [
    {
      name: "Jean-Pierre Desarmes",
      role: "Founder & CEO",
      image: "/lovable-uploads/7b6dfa3b-fe97-4083-8e4a-0640871dbc3f.png",
      bio: "Visionary entrepreneur with 15+ years of experience in digital product development and investment strategy."
    },
    {
      name: "Marie Laurent",
      role: "Chief Operations Officer",
      image: "/lovable-uploads/7751a0aa-bb1f-47c5-b434-e63e68dbc0d0.png",
      bio: "Operations expert specialized in scaling digital businesses across international markets."
    },
    {
      name: "Robert Francois",
      role: "Chief Technology Officer",
      image: "/lovable-uploads/9e449bdb-9bc8-4c07-833d-aba77900c9c6.png",
      bio: "Full-stack developer and systems architect with particular focus on secure, scalable infrastructure."
    },
    {
      name: "Claudette Bernard",
      role: "Creative Director",
      image: "/lovable-uploads/44c5c93d-ace1-4feb-a49b-db4a8a02f987.png",
      bio: "Award-winning designer with background in UX/UI, branding and digital product design."
    }
  ];

  return (
    <div className="py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className="aspect-[3/2] bg-gray-100 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm font-medium text-[#9b87f5] mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm flex-1">{member.bio}</p>
                <div className="flex gap-3 mt-4">
                  <button className="text-gray-400 hover:text-[#9b87f5] transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-[#9b87f5] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-[#9b87f5] transition-colors">
                    <Globe className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
