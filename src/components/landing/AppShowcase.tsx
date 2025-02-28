
import React from 'react';
import { ArrowRight } from 'lucide-react';

const AppShowcase = () => {
  const apps = [
    {
      name: "Shopr",
      type: "E-Commerce",
      description: "Revolutionize your shopping experience with Shopr, the ultimate platform for discovering unique, handpicked products from local artisans and global brands.",
      logo: "S",
      color: "#FF6B6B",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Boltz",
      type: "Delivery Services",
      description: "Need it fast? Boltz delivers. From groceries to gadgets, Boltz offers lightning-fast, reliable delivery services that fit seamlessly into your busy lifestyle.",
      logo: "B",
      color: "#4ECDC4",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Winnr",
      type: "Contests & Gaming",
      description: "Turn your skills into rewards with Winnr, the ultimate platform for competitive gaming and contests. Compete in thrilling tournaments and win exciting prizes.",
      logo: "W",
      color: "#FFD166",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Druck",
      type: "E-Commerce",
      description: "Unleash your creativity with Druck, the go-to platform for designing and selling custom-printed products. Turn your ideas into profit with ease.",
      logo: "D",
      color: "#6A0572",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "LernX",
      type: "E-Learning",
      description: "Master new skills and advance your career with LernX, the interactive e-learning platform offering expert-led courses in tech, business, design, and more.",
      logo: "L",
      color: "#1A936F",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Careo",
      type: "Nonprofit",
      description: "Make a difference with Careo, the all-in-one platform for nonprofit fundraising and management. Streamline donations and track impact.",
      logo: "C",
      color: "#3D5A80",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Zendy",
      type: "Finance",
      description: "Send money globally in seconds with Zendy, the secure and hassle-free money transfer app. Your funds arrive quickly and safely, every time.",
      logo: "Z",
      color: "#457B9D",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "GoTix",
      type: "Ticketing",
      description: "Never miss out on your favorite events again with GoTix, the seamless ticketing platform for concerts, sports, and shows. Book your tickets in seconds.",
      logo: "G",
      color: "#F72585",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Evnto",
      type: "Event Management",
      description: "Plan, promote, and host unforgettable events with Evnto, the ultimate event management platform. From conferences to concerts, Evnto simplifies every step.",
      logo: "E",
      color: "#7209B7",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Morpion",
      type: "Gaming",
      description: "Rediscover the classic game you love with Morpion, a modern twist on Tic-Tac-Toe. Perfect for quick entertainment for players of all ages.",
      logo: "M",
      color: "#F94144",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Munch",
      type: "Food Delivery",
      description: "Satisfy your cravings with Munch, the food delivery app that brings your favorite meals from top restaurants straight to your door. Discover new flavors.",
      logo: "M",
      color: "#F8961E",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Stash",
      type: "Education",
      description: "Ace your exams with Stash, the marketplace for high-quality study notes and resources. Buy, sell, and share materials to help you excel academically.",
      logo: "S",
      color: "#577590",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Rise",
      type: "Investment",
      description: "Grow your wealth effortlessly with Rise, the smart investment platform designed for everyone. Makes investing simple, accessible, and rewarding.",
      logo: "R",
      color: "#43AA8B",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Vocar",
      type: "Job Search",
      description: "Land your dream job with Vocar, the intuitive job search platform that connects you to top employers. Tailored recommendations and easy applications.",
      logo: "V",
      color: "#F79D65",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Skilt",
      type: "Freelance",
      description: "Find the perfect freelancer or project with Skilt, the global platform connecting businesses with skilled professionals. Makes collaboration seamless.",
      logo: "S",
      color: "#4361EE",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "TrdeX",
      type: "Cryptocurrency",
      description: "Dive into the world of crypto with TrdeX, the secure and user-friendly platform for trading cryptocurrencies. Trade with confidence.",
      logo: "T",
      color: "#3A0CA3",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Domus",
      type: "Real Estate",
      description: "Find your dream home with Domus, the real estate app that simplifies property search and rental processes. From cozy apartments to luxury homes.",
      logo: "D",
      color: "#4F772D",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Flora",
      type: "E-Commerce",
      description: "Brighten someone's day with Flora, the app for ordering fresh flowers and cakes for delivery. Perfect for celebrations, brings joy to every occasion.",
      logo: "F",
      color: "#FF85A1",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "FundX",
      type: "Crowdfunding",
      description: "Bring your ideas to life with FundX, the crowdfunding platform for innovative projects. Connect with backers, raise funds, and turn your vision into reality.",
      logo: "F",
      color: "#7678ED",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Novus",
      type: "Content",
      description: "Stay informed and inspired with Novus, the premium newsletter platform delivering high-quality content on topics you care about. Elevate your reading experience.",
      logo: "N",
      color: "#0077B6",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Resby",
      type: "Scheduling",
      description: "Simplify your life with Resby, the easy-to-use scheduling and booking app. From appointments to meetings, keeps you organized and on track.",
      logo: "R",
      color: "#9E0059",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "Tribr",
      type: "Community Building",
      description: "Build and grow your community with Tribr, the platform for fostering connections and engagement. Makes community management effortless.",
      logo: "T",
      color: "#FF9E00",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "GreenEats",
      type: "Food & Sustainability",
      description: "Eat sustainably with GreenEats, the app that helps you find eco-friendly restaurants and sustainable food options. Make dining choices good for you and the planet.",
      logo: "G",
      color: "#38B000",
      images: [1, 2, 3, 4, 5]
    },
    {
      name: "TechFix",
      type: "Tech Support",
      description: "Solve tech troubles in minutes with TechFix, the on-demand tech support app. From software glitches to hardware issues, connects you with experts.",
      logo: "T",
      color: "#0466C8",
      images: [1, 2, 3, 4, 5]
    }
  ];

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">App Showcase</h1>
        
        <div className="flex flex-col gap-8">
          {apps.map((app, index) => (
            <div key={index} className="border rounded-xl overflow-hidden shadow-sm">
              {/* App Header with Logo and Name in one horizontal line */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-4">
                  <div 
                    className="flex items-center justify-center w-12 h-12 rounded-lg text-white text-xl font-bold" 
                    style={{ backgroundColor: app.color }}
                  >
                    {app.logo}
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900">{app.name}</h2>
                  
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                    {app.type}
                  </span>
                </div>
                
                {/* Description below the name and logo */}
                <p className="text-gray-600 mt-3">{app.description}</p>
              </div>
              
              {/* App Screenshots - No arrows */}
              <div className="p-4 bg-gray-50">
                <div className="flex overflow-x-auto gap-3 pb-2">
                  {app.images.map((img, imgIndex) => (
                    <div key={imgIndex} className="flex-shrink-0 w-64 h-36 rounded-lg overflow-hidden shadow-sm">
                      <div 
                        className="w-full h-full flex items-center justify-center text-white"
                        style={{ 
                          backgroundColor: `${app.color}${imgIndex % 2 === 0 ? 'dd' : 'aa'}`,
                          backgroundImage: `linear-gradient(45deg, ${app.color}${imgIndex % 2 === 0 ? 'aa' : '88'} 0%, ${app.color} 100%)`
                        }}
                      >
                        <span className="text-sm font-medium">Screenshot {imgIndex + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tour Button */}
              <div className="p-4 flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <span>Take a tour</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
