
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogClose 
} from '@/components/ui/dialog';
import { Linkedin, Twitter, Globe, X } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Speaker {
  id: number;
  name: string;
  role: string;
  company: string;
  bio: string;
  longBio?: string;
  expertise: string[];
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

const speakers: Speaker[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Chief Technology Officer",
    company: "WebTech Inc.",
    bio: "Expert in web architecture and performance optimization.",
    longBio: "Dr. Sarah Johnson has over 15 years of experience in web development and architecture. She previously led engineering teams at Google and Amazon before joining WebTech Inc. as CTO. She holds a Ph.D. in Computer Science from MIT and has published numerous papers on web performance optimization and scalable architectures. Sarah is passionate about mentoring the next generation of web developers and regularly speaks at conferences worldwide.",
    expertise: ["Web Performance", "Architecture", "Leadership"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Sarah",
    social: {
      twitter: "sarahjtech",
      linkedin: "sarahjohnson",
      website: "sarahjohnson.tech"
    }
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Senior Frontend Developer",
    company: "UX Masters",
    bio: "Specializes in modern UI frameworks and responsive design.",
    longBio: "Michael has been building beautiful, responsive web interfaces for over a decade. He's contributed to major open-source projects including React and Vue.js, and has helped dozens of startups build scalable frontend architectures. Michael is the author of 'Modern UI Architecture' and 'React Patterns for Scale', both bestsellers in web development literature. He's known for his practical, no-nonsense approach to teaching complex concepts in accessible ways.",
    expertise: ["React", "Vue.js", "CSS Architecture"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Michael",
    social: {
      twitter: "michaelr_dev",
      linkedin: "michaelrodriguez",
    }
  },
  {
    id: 3,
    name: "Emma Chen",
    role: "Accessibility Advocate",
    company: "InclusiveTech",
    bio: "Champion for inclusive web experiences and accessibility standards.",
    longBio: "Emma is a renowned accessibility expert who has consulted for Fortune 500 companies on making their digital products more inclusive. She serves on the W3C Accessibility Guidelines Working Group and has influenced web standards adoption across the industry. With a background in both design and development, Emma brings a holistic perspective to creating truly accessible experiences. She's the founder of the annual AccessibilityCon and has received numerous awards for her advocacy work.",
    expertise: ["WCAG Standards", "Assistive Technology", "Inclusive Design"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Emma",
    social: {
      twitter: "emmachen_a11y",
      linkedin: "emmachen",
      website: "emmachen.dev"
    }
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Performance Engineer",
    company: "SpeedMetrics",
    bio: "Expert in optimizing web applications for maximum performance.",
    longBio: "James has been obsessed with making websites faster since the early 2000s. He's pioneered techniques for JavaScript optimization that are now industry standards and created popular performance auditing tools used by thousands of developers. At SpeedMetrics, he leads a team dedicated to helping companies achieve sub-second load times across their web properties. James has a background in low-level systems programming which gives him unique insights into browser rendering engines and JavaScript runtime optimization.",
    expertise: ["Core Web Vitals", "JavaScript Optimization", "Performance Tooling"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=James",
    social: {
      twitter: "jameswilsonperf",
      linkedin: "jameswilson",
    }
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Senior Frontend Developer",
    company: "TechGiants",
    bio: "TypeScript expert and advocate for strongly-typed frontend development.",
    longBio: "Lisa is a TypeScript evangelist who has helped numerous organizations transition from JavaScript to type-safe codebases. Before joining TechGiants, she worked at Microsoft on the TypeScript compiler team. Lisa has created several popular TypeScript utility libraries and teaches advanced TypeScript courses online. Her methodology for gradual TypeScript adoption has been implemented by companies like Airbnb and Shopify. Lisa holds patents related to static analysis of JavaScript codebases.",
    expertise: ["TypeScript", "Static Analysis", "Build Tooling"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Lisa",
    social: {
      twitter: "lisapark_ts",
      linkedin: "lisapark",
      website: "lisapark.dev"
    }
  },
  {
    id: 6,
    name: "Alex Thompson",
    role: "API Architect",
    company: "DataFlow Systems",
    bio: "Designs elegant, developer-friendly APIs and backend systems.",
    longBio: "Alex has architected APIs for some of the world's largest platforms, serving millions of requests per second. He specializes in creating developer experiences that delight API consumers while maintaining scalability and security. Alex is the author of the REST API Design Rulebook and has pioneered methodologies for GraphQL adoption in enterprise environments. He's a regular contributor to open source projects focused on API tooling and documentation generation.",
    expertise: ["RESTful Design", "GraphQL", "API Documentation"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Alex",
    social: {
      twitter: "alexthompsonapi",
      linkedin: "alexthompson",
    }
  },
  {
    id: 7,
    name: "Nicole Summers",
    role: "Security Specialist",
    company: "SecureWeb Consultancy",
    bio: "Expert in web application security and secure coding practices.",
    longBio: "Nicole is a certified ethical hacker and web security consultant who has identified critical vulnerabilities in systems used by millions. She previously worked in the cybersecurity division of the Department of Defense before founding SecureWeb Consultancy. Nicole regularly conducts security audits for Fortune 500 companies and has developed secure coding frameworks adopted by major financial institutions. She's a frequent speaker at BlackHat and DEF CON on topics related to web security.",
    expertise: ["OWASP Standards", "Penetration Testing", "Secure Authentication"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Nicole",
    social: {
      twitter: "nicolesec",
      linkedin: "nicolesummers",
      website: "securewebconsult.com"
    }
  },
  {
    id: 8,
    name: "Dr. Monica Taylor",
    role: "Career Coach & Tech Educator",
    company: "DevPathways",
    bio: "Helps developers navigate career transitions and growth opportunities.",
    longBio: "Dr. Taylor combines her background in psychology with 12 years of experience in tech recruitment to help developers plan and execute successful career strategies. As the founder of DevPathways, she's guided over 5,000 developers through career transitions, salary negotiations, and professional development. Monica holds a Ph.D. in Organizational Psychology and has published research on burnout prevention in tech industries. Her coaching methodology emphasizes sustainable growth and work-life harmony.",
    expertise: ["Career Planning", "Technical Interview Prep", "Professional Growth"],
    image: "https://api.dicebear.com/7.x/personas/svg?seed=Monica",
    social: {
      twitter: "drmonicatech",
      linkedin: "drmonicataylor",
      website: "devpathways.com"
    }
  }
];

export const SpeakersSection = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSpeakerClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setIsDialogOpen(true);
  };

  return (
    <section id="speakers" className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Speakers</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Experts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn from industry leaders with decades of combined experience in web development, design, and technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {speakers.map((speaker) => (
            <Card 
              key={speaker.id}
              className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSpeakerClick(speaker)}
            >
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={speaker.image} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{speaker.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{speaker.role} at {speaker.company}</p>
                <p className="text-gray-500 text-xs mb-3">{speaker.bio}</p>
                <div className="flex flex-wrap gap-1">
                  {speaker.expertise.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-gray-100">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedSpeaker && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedSpeaker.name}</DialogTitle>
                <DialogDescription>
                  {selectedSpeaker.role} at {selectedSpeaker.company}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-[100px_1fr] gap-4 my-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={selectedSpeaker.image} alt={selectedSpeaker.name} />
                  <AvatarFallback>{selectedSpeaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div>
                  <p className="text-gray-700 mb-4">{selectedSpeaker.longBio || selectedSpeaker.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Areas of Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpeaker.expertise.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-100">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {selectedSpeaker.social.twitter && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={`https://twitter.com/${selectedSpeaker.social.twitter}`} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {selectedSpeaker.social.linkedin && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={`https://linkedin.com/in/${selectedSpeaker.social.linkedin}`} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {selectedSpeaker.social.website && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={`https://${selectedSpeaker.social.website}`} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <DialogClose asChild>
                  <Button variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Close
                  </Button>
                </DialogClose>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
