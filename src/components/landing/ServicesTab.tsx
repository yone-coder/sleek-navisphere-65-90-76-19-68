
import React, { useState } from 'react';
import { Download, Star, ChevronRight, Heart, ChevronDown, Store, Gamepad2, Calendar, BookOpen, Bitcoin, Globe, Building, PiggyBank, Briefcase, Search, Ticket, Heart as HeartIcon, Wallet, Folder, AppWindow, Bird, Fish, Leaf, Egg, Tractor } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// App data with all the details
const apps = [
  {
    id: 1,
    name: "Shopr",
    type: "E-Commerce",
    status: "Live",
    description: "A platform for discovering and purchasing unique products from local and global sellers.",
    color: "#FF6B6B",
    icon: Store,
    rating: 4.2,
    downloads: "2.3M",
    price: "Free",
    features: ["In-app purchases", "Cross-platform", "Language support"],
    tags: ["Shopping", "Marketplace", "Trending"]
  },
  {
    id: 2,
    name: "Boltz",
    type: "Delivery Services",
    status: "In Development",
    description: "Fast and reliable delivery services for everyday needs.",
    color: "#4ECDC4",
    icon: Store,
    rating: 3.9,
    downloads: "1.5M",
    price: "Free",
    features: ["Real-time tracking", "Scheduled deliveries", "24/7 support"],
    tags: ["Delivery", "Local", "Essential"]
  },
  {
    id: 3,
    name: "Winnr",
    type: "Contests & Gaming",
    status: "Coming Soon",
    description: "Compete in tournaments and win prizes in a competitive gaming environment.",
    color: "#FFD166",
    icon: Gamepad2,
    rating: 4.5,
    downloads: "5.8M",
    price: "Free",
    features: ["Live tournaments", "Prize pool", "Leaderboards"],
    tags: ["Gaming", "Competitive", "Rewards"]
  },
  {
    id: 4,
    name: "Druck",
    type: "E-Commerce",
    status: "Live",
    description: "Create and sell custom printed products.",
    color: "#06D6A0",
    icon: Store,
    rating: 4.0,
    downloads: "1.2M",
    price: "$3.99",
    features: ["Custom templates", "Print on demand", "Design studio"],
    tags: ["Creative", "Merchandise", "Design"]
  },
  {
    id: 5,
    name: "LernX",
    type: "E-Learning",
    status: "In Development",
    description: "Learn new skills with interactive online courses.",
    color: "#118AB2",
    icon: BookOpen,
    rating: 4.7,
    downloads: "3.4M",
    price: "Free",
    features: ["Offline learning", "Progress tracking", "Certifications"],
    tags: ["Education", "Skills", "Popular"]
  },
  {
    id: 6,
    name: "Careo",
    type: "Nonprofit",
    status: "Coming Soon",
    description: "Support and manage nonprofit fundraising efforts.",
    color: "#EF476F",
    icon: HeartIcon,
    rating: 4.3,
    downloads: "950K",
    price: "Free",
    features: ["Donation tools", "Campaign creation", "Analytics"],
    tags: ["Social Impact", "Fundraising", "Community"]
  }
];

// Farm/Non-tech projects data
const farmProjects = [
  {
    id: 1,
    name: "Sunrise Poultry Farm",
    type: "Livestock",
    status: "Operational",
    description: "A modern poultry farm specializing in organic egg production with over 5,000 free-range chickens.",
    color: "#FFC300",
    icon: Bird,
    size: "15 acres",
    established: "2018",
    yearlyOutput: "1.5M eggs",
    features: ["Free-range housing", "Organic feed", "Solar powered facilities"],
    tags: ["Poultry", "Organic", "Sustainable"]
  },
  {
    id: 2,
    name: "Green Hills Pig Farm",
    type: "Livestock",
    status: "Operational",
    description: "Ethical pig farming with a focus on heritage breeds and sustainable farming practices.",
    color: "#FF5733",
    icon: PiggyBank,
    size: "25 acres",
    established: "2019",
    yearlyOutput: "200 heads",
    features: ["Humane certification", "Heritage breeds", "Farm-to-table program"],
    tags: ["Pork", "Ethical", "Heritage"]
  },
  {
    id: 3,
    name: "Mountain View Goat Farm",
    type: "Livestock & Dairy",
    status: "Expanding",
    description: "High-quality goat dairy products produced through traditional methods with modern standards.",
    color: "#C70039",
    icon: PiggyBank,
    size: "12 acres",
    established: "2020",
    yearlyOutput: "10,000 gallons of milk",
    features: ["Artisanal cheese production", "Farm tours", "Breeding program"],
    tags: ["Dairy", "Goat Cheese", "Traditional"]
  },
  {
    id: 4,
    name: "Blue Creek Fish Farm",
    type: "Aquaculture",
    status: "In Development",
    description: "Sustainable freshwater fish farming using recirculating aquaculture systems.",
    color: "#2471A3",
    icon: Fish,
    size: "8 acres",
    established: "2022",
    yearlyOutput: "Projected 15 tons",
    features: ["Low-impact systems", "Water conservation", "Local distribution"],
    tags: ["Aquaculture", "Sustainable", "Fish"]
  },
  {
    id: 5,
    name: "Evergreen Agricultural Project",
    type: "Crop Production",
    status: "Operational",
    description: "Multi-crop organic farm producing seasonal vegetables and fruits for local markets.",
    color: "#229954",
    icon: Leaf,
    size: "30 acres",
    established: "2017",
    yearlyOutput: "50 tons of produce",
    features: ["Crop rotation", "No pesticides", "Community supported agriculture"],
    tags: ["Organic", "Vegetables", "Local"]
  },
  {
    id: 6,
    name: "Sunrise Dairy Collective",
    type: "Cattle & Dairy",
    status: "Expanding",
    description: "Cooperative dairy farm supporting small local producers with modern facilities and distribution.",
    color: "#3498DB",
    icon: Egg,
    size: "50 acres combined",
    established: "2016",
    yearlyOutput: "500,000 gallons of milk",
    features: ["Cooperative model", "Small farmer support", "Shared processing"],
    tags: ["Dairy", "Cooperative", "Community"]
  }
];

const AppStore = () => {
  // State for active app details and favorites
  const [activeAppId, setActiveAppId] = useState<number | null>(null);
  const [favoriteApps, setFavoriteApps] = useState<number[]>([]);

  // Generate placeholder screenshots (3-5 per app)
  const getScreenshots = (appId: number) => {
    const count = 3 + (appId % 3); // 3-5 screenshots per app
    return Array.from({ length: count }, (_, i) => i + 1);
  };

  // Use all apps for display
  const filteredApps = apps;

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setFavoriteApps(prev => 
      prev.includes(id) ? prev.filter(appId => appId !== id) : [...prev, id]
    );
  };

  // Calculate star display based on rating
  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="text-lg">
            {i < fullStars ? (
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ) : i === fullStars && hasHalfStar ? (
              <div className="relative w-4 h-4">
                <Star className="absolute w-4 h-4 text-gray-300" />
                <div className="absolute w-2 h-4 overflow-hidden">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            ) : (
              <Star className="w-4 h-4 text-gray-300" />
            )}
          </div>
        ))}
        <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* App listings */}
      <div>
        {filteredApps.map(app => (
          <div key={app.id} className="pt-4 pb-6 bg-white mb-3 shadow-sm">
            {/* App header section */}
            <div className="flex items-start px-4 mb-3">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: app.color }}
              >
                {app.icon && <app.icon className="w-8 h-8" />}
              </div>
              
              <div className="flex-1 ml-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{app.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        app.status === "Live" ? "bg-green-100 text-green-800" :
                        app.status === "In Development" ? "bg-blue-100 text-blue-800" :
                        "bg-orange-100 text-orange-800"
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{app.type}</p>
                    <div className="mt-1">
                      <StarRating rating={app.rating} />
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <button 
                      className="p-1 rounded-full"
                      onClick={() => toggleFavorite(app.id)}
                    >
                      <Heart 
                        className={`w-5 h-5 ${
                          favoriteApps.includes(app.id) 
                            ? "fill-red-500 text-red-500" 
                            : "text-gray-400"
                        }`} 
                      />
                    </button>
                    <button className={`mt-2 px-4 py-1.5 rounded-full text-sm font-medium ${
                      app.price === "Free" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-200 text-gray-800"
                    }`}>
                      {app.price === "Free" ? "Get" : app.price}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Key metrics */}
            <div className="flex justify-between px-4 py-2 mb-3 bg-gray-50">
              <div className="text-center">
                <p className="text-xs text-gray-500">Downloads</p>
                <p className="text-sm font-medium flex items-center justify-center">
                  <Download className="w-3 h-3 mr-1" /> {app.downloads}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Rating</p>
                <p className="text-sm font-medium flex items-center justify-center">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /> {app.rating.toFixed(1)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-sm font-medium">{app.price}</p>
              </div>
            </div>
            
            {/* Tags */}
            <div className="px-4 mb-3">
              <div className="flex flex-wrap gap-1">
                {app.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Scrollable screenshots with edge-to-edge scrolling and gaps on both ends */}
            <div className="relative">
              {/* This creates a full-width scrollable area */}
              <div className="overflow-x-auto -mx-4 px-4">
                {/* This inner container holds all images with gaps */}
                <div className="flex gap-3 pl-4 pr-16" style={{ width: 'max-content' }}>
                  {getScreenshots(app.id).map(num => (
                    <div 
                      key={num} 
                      className="flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 w-64 h-40 flex items-center justify-center shadow-sm"
                    >
                      <img 
                        src={`https://placehold.co/256x160?text=${app.name}`}
                        alt={`${app.name} screenshot ${num}`} 
                        className="w-full"
                      />
                    </div>
                  ))}
                  {/* This creates the gap at the end */}
                  <div className="flex-shrink-0 w-4"></div>
                </div>
              </div>
            </div>
            
            {/* Description below the images */}
            <div className="px-4 mt-3 mb-2">
              <p className="text-sm text-gray-600">{app.description}</p>
            </div>
            
            {/* Expandable details section */}
            <div className="px-4">
              <button 
                className="w-full flex items-center justify-between py-2 border-t border-gray-100 text-sm text-blue-600"
                onClick={() => setActiveAppId(activeAppId === app.id ? null : app.id)}
              >
                <span>View more details</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeAppId === app.id ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              {activeAppId === app.id && (
                <div className="py-3 border-t border-gray-100 text-sm">
                  <h4 className="font-medium mb-2">Key Features</h4>
                  <ul className="ml-4 list-disc space-y-1 text-gray-600">
                    {app.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 flex justify-between">
                    <button className="text-blue-600 flex items-center">
                      View in App Store <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                    <button className="text-blue-600 flex items-center">
                      Share <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FarmProjects = () => {
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [favoriteProjects, setFavoriteProjects] = useState<number[]>([]);

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    setFavoriteProjects(prev => 
      prev.includes(id) ? prev.filter(projectId => projectId !== id) : [...prev, id]
    );
  };

  // Generate placeholder images for each farm
  const getFarmImages = (farmId: number) => {
    const count = 2 + (farmId % 3); // 2-4 images per farm
    return Array.from({ length: count }, (_, i) => i + 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Farm projects listings */}
      <div>
        {farmProjects.map(project => (
          <div key={project.id} className="pt-4 pb-6 bg-white mb-3 shadow-sm">
            {/* Project header section */}
            <div className="flex items-start px-4 mb-3">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: project.color }}
              >
                {project.icon && <project.icon className="w-8 h-8" />}
              </div>
              
              <div className="flex-1 ml-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{project.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        project.status === "Operational" ? "bg-green-100 text-green-800" :
                        project.status === "In Development" ? "bg-blue-100 text-blue-800" :
                        "bg-purple-100 text-purple-800"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{project.type}</p>
                    <p className="text-xs text-gray-500 mt-1">Est. {project.established} • {project.size}</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <button 
                      className="p-1 rounded-full"
                      onClick={() => toggleFavorite(project.id)}
                    >
                      <Heart 
                        className={`w-5 h-5 ${
                          favoriteProjects.includes(project.id) 
                            ? "fill-red-500 text-red-500" 
                            : "text-gray-400"
                        }`} 
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Key metrics */}
            <div className="flex justify-between px-4 py-2 mb-3 bg-gray-50">
              <div className="text-center">
                <p className="text-xs text-gray-500">Yearly Output</p>
                <p className="text-sm font-medium flex items-center justify-center">
                  <Tractor className="w-3 h-3 mr-1" /> {project.yearlyOutput}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Size</p>
                <p className="text-sm font-medium">{project.size}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Established</p>
                <p className="text-sm font-medium">{project.established}</p>
              </div>
            </div>
            
            {/* Tags */}
            <div className="px-4 mb-3">
              <div className="flex flex-wrap gap-1">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Scrollable images with edge-to-edge scrolling */}
            <div className="relative">
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="flex gap-3 pl-4 pr-16" style={{ width: 'max-content' }}>
                  {getFarmImages(project.id).map(num => (
                    <div 
                      key={num} 
                      className="flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 w-64 h-40 flex items-center justify-center shadow-sm"
                    >
                      <img 
                        src={`https://placehold.co/256x160?text=${project.name}`}
                        alt={`${project.name} image ${num}`} 
                        className="w-full"
                      />
                    </div>
                  ))}
                  <div className="flex-shrink-0 w-4"></div>
                </div>
              </div>
            </div>
            
            {/* Description below the images */}
            <div className="px-4 mt-3 mb-2">
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
            
            {/* Expandable details section */}
            <div className="px-4">
              <button 
                className="w-full flex items-center justify-between py-2 border-t border-gray-100 text-sm text-blue-600"
                onClick={() => setActiveProjectId(activeProjectId === project.id ? null : project.id)}
              >
                <span>View more details</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeProjectId === project.id ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              {activeProjectId === project.id && (
                <div className="py-3 border-t border-gray-100 text-sm">
                  <h4 className="font-medium mb-2">Key Features</h4>
                  <ul className="ml-4 list-disc space-y-1 text-gray-600">
                    {project.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 flex justify-between">
                    <button className="text-blue-600 flex items-center">
                      Contact Farm <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                    <button className="text-blue-600 flex items-center">
                      Share <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function ServicesTab() {
  return (
    <div className="w-full bg-gray-50">
      <div className="bg-white shadow-sm px-6 py-4 mb-3">
        <h1 className="text-xl font-bold text-center">Our Projects</h1>
        <p className="text-center text-gray-600 text-sm mt-1">Explore our tech and non-tech ventures</p>
      </div>
      
      <Tabs defaultValue="apps" className="w-full px-4">
        <TabsList className="w-full mb-4 grid grid-cols-2">
          <TabsTrigger value="apps" className="flex items-center gap-2">
            <AppWindow className="w-4 h-4" />
            <span>Apps</span>
          </TabsTrigger>
          <TabsTrigger value="farms" className="flex items-center gap-2">
            <Folder className="w-4 h-4" />
            <span>Non-Tech Projects</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="apps" className="mt-0">
          <AppStore />
        </TabsContent>
        
        <TabsContent value="farms" className="mt-0">
          <FarmProjects />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ServicesTab;
