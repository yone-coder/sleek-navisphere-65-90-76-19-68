import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Globe, 
  BookOpen, 
  ShoppingBag, 
  Award, 
  Wallet,
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const ImpactStory = () => {
  const [animatedCount, setAnimatedCount] = useState(0);
  const statsRef = useRef(null);
  
  const stats = [
    { value: 15000, label: "Community Members" },
    { value: 450, label: "Businesses Supported" },
    { value: 2500, label: "Students Enrolled" },
    { value: 75, label: "Countries Reached" }
  ];

  // Public images
  const founderImage = "/lovable-uploads/7751a0aa-bb1f-47c5-b434-e63e68dbc0d0.png";
  const challengeImage = "/lovable-uploads/44c5c93d-ace1-4feb-a49b-db4a8a02f987.png";
  const impactImage = "/lovable-uploads/7b6dfa3b-fe97-4083-8e4a-0640871dbc3f.png";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCountAnimation();
        }
      },
      { threshold: 0.1 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);
  
  const startCountAnimation = () => {
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      
      setAnimatedCount(easeOutProgress);
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  };

  return (
    <div className="w-full bg-white overflow-hidden">
      {/* Centered title with green round background */}
      <div className="py-6 px-4 flex items-center justify-center">
        <div className="bg-green-500 rounded-full px-6 py-2">
          <h1 className="text-2xl font-semibold text-white">Our Story & Mission</h1>
        </div>
      </div>

      {/* Main content area with minimal padding */}
      <div className="px-4 md:px-6 lg:px-8">
        {/* Introduction Section with Single Image */}
        <div className="mb-16 flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-indigo-800 mb-2">A Vision Born from Necessity</h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              Haitians have endured hardship for far too long. Despite our resilience, creativity, and determination, we've lacked a true digital space designed for us—a place where we can unite, support each other, and thrive together.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              Our platform emerged from a critical need: to provide safe, accessible opportunities for connection and growth amidst challenging circumstances. We've witnessed how isolation compounds the difficulties our communities face, both within Haiti and across the diaspora.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              When traditional institutions falter, it becomes necessary to forge new paths. Our founding team—composed of technologists, educators, and community leaders—came together with a shared vision: to build a digital bridge that connects Haitians worldwide, empowering us to support one another regardless of physical boundaries.
            </p>
            <div className="pt-4">
              <button className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition">
                Learn about our founding <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 h-64 md:h-80 rounded-lg shadow-md overflow-hidden">
            <img 
              src={founderImage} 
              alt="Our founding team" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Current Challenge Section with Single Image */}
        <div className="mb-16 flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-indigo-800 mb-2">The Challenge We Face</h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              As insecurity grips our country, the daily realities of life have become increasingly challenging. Educational institutions have been forced to close their doors, leaving students without access to vital learning resources. Businesses struggle to maintain operations, with entrepreneurs unable to safely reach customers or suppliers.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              The psychological impact of this prolonged crisis compounds the material difficulties. Isolation, uncertainty, and fear have become constant companions for many Haitians, eroding the social connections that traditionally sustain our resilient communities.
            </p>
            <ul className="space-y-3 mt-4">
              {[
                "Students struggle to access their schools and universities",
                "Businesses suffer due to limited physical opportunities",
                "People live in fear, unable to move freely",
                "Many Haitians are disconnected and isolated from vital resources"
              ].map((challenge, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-800">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 h-64 md:h-80 rounded-lg shadow-md overflow-hidden">
            <img 
              src={challengeImage} 
              alt="Challenges facing our community" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Our Solution Section - Replacing Impact Areas with Text-Focused Content */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-indigo-800 mb-8 text-center">Our Solution: A Digital Ecosystem</h2>
          
          <div className="space-y-8">
            <p className="text-lg text-gray-800 leading-relaxed">
              We're building more than just a website or app—we're creating an integrated digital ecosystem where Haitians can connect, learn, earn, and celebrate their culture. Our platform addresses multiple critical needs simultaneously, providing practical solutions to the challenges our community faces.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-indigo-600" />
                  <h3 className="text-xl font-bold text-indigo-800">Digital Community</h3>
                </div>
                <p className="text-gray-800">
                  Our secure platform connects Haitians worldwide, overcoming geographical barriers that have fragmented our community. Members build meaningful relationships through shared interests, skills, and aspirations, fostering a sense of belonging that transcends physical isolation.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-indigo-600" />
                  <h3 className="text-xl font-bold text-indigo-800">Education Access</h3>
                </div>
                <p className="text-gray-800">
                  When schools must close their doors, ours remain open. Our educational resources—developed in collaboration with Haitian educators and cultural experts—provide accessible, quality learning experiences that honor Haitian perspectives and knowledge systems.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-8 h-8 text-indigo-600" />
                  <h3 className="text-xl font-bold text-indigo-800">Economic Empowerment</h3>
                </div>
                <p className="text-gray-800">
                  Our digital marketplace empowers Haitian entrepreneurs to reach global audiences, enabling sustainable business operations despite local security challenges. Artisans, food producers, service providers, and creators can showcase their offerings to customers worldwide.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-indigo-600" />
                  <h3 className="text-xl font-bold text-indigo-800">Talent Showcase</h3>
                </div>
                <p className="text-gray-800">
                  Haiti's artistic and creative brilliance deserves global recognition. Our platform hosts competitions, exhibitions, and showcases that spotlight Haitian talent across disciplines—from visual arts and music to literature and technology innovation.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Wallet className="w-8 h-8 text-indigo-600" />
                  <h3 className="text-xl font-bold text-indigo-800">Financial Access</h3>
                </div>
                <p className="text-gray-800">
                  Traditional banking infrastructure often fails to reach all Haitians. Our integrated financial tools facilitate secure transactions, enable remittances, and provide microlending opportunities, creating financial inclusion for underserved populations.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8 text-indigo-600" />
                  <h3 className="text-xl font-bold text-indigo-800">Cultural Preservation</h3>
                </div>
                <p className="text-gray-800">
                  Our platform serves as a living archive of Haitian heritage, documenting traditions, languages, and cultural practices. Through collaborative digital preservation, we ensure that our rich cultural legacy endures for future generations, regardless of physical disruptions.
                </p>
              </div>
            </div>
            
            <p className="text-lg text-gray-800 leading-relaxed pt-4">
              By integrating these elements into a cohesive platform, we create a self-reinforcing ecosystem where educational opportunities lead to economic empowerment, cultural celebration strengthens community bonds, and financial inclusion facilitates broader participation across all aspects of the platform.
            </p>
          </div>
        </div>

        {/* Animated Stats Section */}
        <div className="mb-16" ref={statsRef}>
          <h2 className="text-2xl font-bold text-indigo-800 mb-8 text-center">Our Impact by the Numbers</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <h3 className="text-3xl font-bold text-indigo-700 mb-2">
                  {Math.round(stat.value * animatedCount).toLocaleString()}+
                </h3>
                <p className="text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 space-y-4">
            <p className="text-lg text-gray-800 leading-relaxed">
              Behind these numbers are real stories of transformation—students who have continued their education despite school closures, entrepreneurs who have maintained their livelihoods during economic uncertainty, and disconnected community members who have found belonging and purpose.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              Each statistic represents countless hours of collaboration, innovation, and determination from our growing community. Together, we're demonstrating that digital solutions, thoughtfully designed with Haitian needs at the center, can create meaningful impact even amid challenging circumstances.
            </p>
          </div>
        </div>

        {/* Impact Statement with Single Image */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">More Than a Platform</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 space-y-4">
              <p className="text-lg text-gray-800 leading-relaxed">
                This isn't just a platform; it's a movement. A way to reclaim our potential, despite the barriers we face. A way to bring Haitians together, no matter where they are in the world.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed">
                When physical infrastructure falters, digital connections become lifelines. Our platform serves as both a practical resource and a symbol of Haitian resilience—a testament to our ability to innovate and adapt in the face of adversity.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed">
                By creating this digital ecosystem, we're not merely responding to current challenges; we're building sustainable infrastructure for Haiti's future. The skills developed, connections formed, and opportunities created today will continue to yield benefits long after the current crisis subsides.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed">
                We are building the future of the Haitian digital community, but we can't do it alone. The strength of our platform lies in its community—in the diverse perspectives, talents, and commitments that each member brings.
              </p>
            </div>
            <div className="md:w-1/2 rounded-lg shadow-md overflow-hidden h-72 md:h-96">
              <img 
                src={impactImage} 
                alt="Our impact in the community" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-indigo-100 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Join Our Movement</h2>
          <p className="text-lg text-gray-800 leading-relaxed mb-4">
            Join us in creating a space where Haitians can thrive—safely, freely, and together. Your support will help make this vision a reality. Let's build something lasting, something powerful. Let's build this for us, by us.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mb-6">
            Whether you're a student seeking educational resources, an entrepreneur looking to expand your reach, a creative wanting to showcase your talents, or simply someone who believes in the power of connection—there's a place for you in our community. Together, we can transform challenges into opportunities and build a digital home that honors the richness of Haitian identity while opening new possibilities for our future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" /> Support Our Mission
            </button>
            <button className="bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-full font-medium hover:bg-indigo-50 transition flex items-center justify-center gap-2">
              <Users className="w-5 h-5" /> Join The Community
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-indigo-200">
            <h3 className="font-medium text-indigo-800 mb-3">Stay Connected</h3>
            <div className="flex justify-center gap-4">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social, index) => (
                <button 
                  key={index}
                  className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition"
                >
                  {social.charAt(0)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function StoryMissionsTab() {
  return (
    <div className="w-full">
      <ImpactStory />
    </div>
  );
}

export default ImpactStory;
