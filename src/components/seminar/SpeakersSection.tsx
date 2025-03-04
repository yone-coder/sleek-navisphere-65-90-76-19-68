
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Globe } from "lucide-react";

type Speaker = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  topics: string[];
};

const speakers: Speaker[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Lead Developer",
    company: "TechFlow",
    image: "/placeholder.svg",
    bio: "Alex has 15 years of experience in web development and has contributed to major open-source projects. Specializes in frontend architecture and performance optimization.",
    twitter: "alexmorgan",
    linkedin: "alexmorgan",
    website: "alexmorgan.dev",
    topics: ["React Architecture", "Performance Optimization", "State Management"]
  },
  {
    id: 2,
    name: "Jamie Chen",
    role: "UI/UX Director",
    company: "DesignLabs",
    image: "/placeholder.svg",
    bio: "Jamie leads design teams creating intuitive and accessible interfaces. Has worked with Fortune 500 companies to improve their digital products.",
    twitter: "jamiechen",
    linkedin: "jamiechen",
    topics: ["User Experience", "Design Systems", "Accessibility"]
  },
  {
    id: 3,
    name: "Sam Washington",
    role: "Engineering Manager",
    company: "StreamEdge",
    image: "/placeholder.svg",
    bio: "Sam oversees large-scale web applications used by millions. Expert in scalable architecture and team leadership.",
    linkedin: "samwashington",
    website: "samwashington.io",
    topics: ["Scalable Architecture", "Team Leadership", "System Design"]
  },
  {
    id: 4,
    name: "Taylor Rodriguez",
    role: "Full-Stack Developer",
    company: "CodeCraft",
    image: "/placeholder.svg",
    bio: "Taylor specializes in modern full-stack development with a focus on TypeScript, Node.js, and serverless architectures.",
    twitter: "taylorrodriguez",
    linkedin: "taylorrodriguez",
    topics: ["TypeScript", "Serverless Architecture", "API Design"]
  },
  {
    id: 5,
    name: "Jordan Smith",
    role: "DevOps Engineer",
    company: "CloudNative",
    image: "/placeholder.svg",
    bio: "Jordan is an expert in CI/CD pipelines, containerization, and cloud infrastructure for web applications.",
    linkedin: "jordansmith",
    website: "jordansmith.tech",
    topics: ["CI/CD", "Docker", "Kubernetes"]
  },
  {
    id: 6,
    name: "Morgan Lee",
    role: "Accessibility Advocate",
    company: "WebForAll",
    image: "/placeholder.svg",
    bio: "Morgan helps organizations build inclusive web experiences that work for everyone, regardless of ability.",
    twitter: "morganlee",
    linkedin: "morganlee",
    website: "morganlee.com",
    topics: ["WCAG Standards", "Inclusive Design", "Assistive Technology"]
  }
];

export const SpeakersSection = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <div className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Speakers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from industry leaders and experts who are shaping the future of web development
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker) => (
            <div 
              key={speaker.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedSpeaker(speaker)}
            >
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-2 border-purple-100">
                  <img src={speaker.image} alt={speaker.name} />
                </Avatar>
                <h3 className="text-xl font-semibold">{speaker.name}</h3>
                <p className="text-purple-600">{speaker.role}</p>
                <p className="text-gray-500 mb-4">{speaker.company}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {speaker.topics.slice(0, 2).map((topic, index) => (
                    <span key={index} className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                      {topic}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSpeaker(speaker);
                  }}
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedSpeaker} onOpenChange={(open) => !open && setSelectedSpeaker(null)}>
        {selectedSpeaker && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedSpeaker.name}</DialogTitle>
              <DialogDescription>
                {selectedSpeaker.role} at {selectedSpeaker.company}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar className="w-24 h-24 border-2 border-purple-100">
                <img src={selectedSpeaker.image} alt={selectedSpeaker.name} />
              </Avatar>
              <div className="space-y-4">
                <p className="text-gray-700">{selectedSpeaker.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSpeaker.topics.map((topic, index) => (
                    <span key={index} className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {selectedSpeaker.twitter && (
                    <a 
                      href={`https://twitter.com/${selectedSpeaker.twitter}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {selectedSpeaker.linkedin && (
                    <a 
                      href={`https://linkedin.com/in/${selectedSpeaker.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {selectedSpeaker.website && (
                    <a 
                      href={`https://${selectedSpeaker.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
