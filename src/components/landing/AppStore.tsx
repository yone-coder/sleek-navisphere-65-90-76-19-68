import React, { useState } from 'react';
import { Star, ChevronRight, Heart, ChevronDown, Store, Wallet } from 'lucide-react';

const AppStore = () => {
  // App data with all the details - focused on 2 high-potential apps
  const apps = [
    {
      id: 1,
      name: "Shopr",
      type: "E-Commerce",
      status: "In Development",
      description: "A revolutionary platform for discovering and purchasing unique products from local and global sellers, with integrated AI-powered product recommendations.",
      color: "#FF6B6B",
      icon: Store,
      rating: 4.2,
      downloads: "2.3M",
      price: "Free",
      completionPercentage: 80,
      launchDate: "Q2 2025",
      marketSize: "$4.9T",
      targetUsers: "Everyone",
      revenueModel: "Fees",
      features: ["AI-powered product suggestions", "Cross-platform synchronization", "30+ language support"],
      tags: ["Shopping", "Marketplace", "Trending"]
    },
    {
      id: 7,
      name: "Zendy",
      type: "Finance",
      status: "In Development",
      description: "Secure blockchain-based money transfer platform with industry-leading fees and speed, targeting underserved international payment corridors.",
      color: "#073B4C",
      icon: Wallet,
      rating: 4.6,
      downloads: "7.8M",
      price: "Free",
      completionPercentage: 65,
      launchDate: "Q3 2025",
      marketSize: "$240B",
      targetUsers: "18+",
      revenueModel: "Fees",
      features: ["Multi-currency wallets", "Near-instant transfers", "Bank-grade security"],
      tags: ["Finance", "International", "Essential"]
    }
  ];

  // State for active app details and favorites
  const [activeAppId, setActiveAppId] = useState(1);
  const [favoriteApps, setFavoriteApps] = useState([1]);

  // Generate placeholder screenshots (3 per app)
  const getScreenshots = (appId) => {
    return [1, 2, 3];
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setFavoriteApps(prev => 
      prev.includes(id) ? prev.filter(appId => appId !== id) : [...prev, id]
    );
  };

  // Calculate star display based on rating
  const StarRating = ({ rating }) => {
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

  // Progress bar for development status
  const ProgressBar = ({ percentage }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  // App logo component - adjusted size to match Apps page
  const AppLogo = ({ app }) => {
    const IconComponent = app.icon;
    return (
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0"
        style={{ backgroundColor: app.color }}
      >
        {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Investor Showcase Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg px-6 py-6 mb-6">
        <h1 className="text-2xl font-bold text-center">Our App Portfolio</h1>
        <p className="text-center text-blue-100 mt-2 max-w-lg mx-auto">
          A showcase of our high-potential applications currently in development, targeting growing markets with innovative solutions.
        </p>
        <div className="flex justify-center mt-4">
          <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
            <span className="font-medium">Portfolio Highlights:</span> 2 flagship products • $5.1T combined market size • Q2-Q3 2025 launch window
          </div>
        </div>
      </div>
      
      {/* App listings */}
      <div className="max-w-3xl mx-auto">
        {apps.map(app => (
          <div key={app.id} className="pt-6 pb-6 bg-white mb-6 rounded-xl shadow-md">
            {/* App header section */}
            <div className="flex items-start px-6 mb-4">
              <AppLogo app={app} />
              
              <div className="flex-1 ml-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{app.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{app.type}</p>
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
                    <button className="mt-2 px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-white">
                      {app.price}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Development progress */}
            <div className="px-6 mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Development Progress</span>
                <span className="text-sm text-gray-600">{app.completionPercentage}%</span>
              </div>
              <ProgressBar percentage={app.completionPercentage} />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">Phase: Beta Testing</span>
                <span className="text-xs text-gray-500">Target Launch: {app.launchDate}</span>
              </div>
            </div>
            
            {/* Key metrics */}
            <div className="grid grid-cols-3 gap-2 px-6 py-3 mb-4 bg-gray-50">
              <div className="text-center">
                <p className="text-xs text-gray-500">Market Size</p>
                <p className="text-sm font-medium">{app.marketSize}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Target Users</p>
                <p className="text-sm font-medium">{app.targetUsers}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Revenue Model</p>
                <p className="text-sm font-medium">{app.revenueModel.split(" ")[0]}</p>
              </div>
            </div>
            
            {/* Tags */}
            <div className="px-6 mb-4">
              <div className="flex flex-wrap gap-1">
                {app.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Scrollable screenshots */}
            <div className="relative">
              <div className="overflow-x-auto px-6">
                <div className="flex gap-3 pb-4">
                  {getScreenshots(app.id).map(num => (
                    <div 
                      key={num} 
                      className="flex-shrink-0 rounded-xl overflow-hidden bg-gray-200 w-72 h-48 flex items-center justify-center shadow-sm"
                    >
                      <img 
                        src={`/api/placeholder/288/192?text=${app.name}+Prototype+${num}`}
                        alt={`${app.name} prototype ${num}`} 
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Description below the images */}
            <div className="px-6 mt-4 mb-3">
              <p className="text-sm text-gray-600">{app.description}</p>
            </div>
            
            {/* Expandable details section */}
            <div className="px-6">
              <button 
                className="w-full flex items-center justify-between py-2 border-t border-gray-100 text-sm text-blue-600"
                onClick={() => setActiveAppId(activeAppId === app.id ? null : app.id)}
              >
                <span>Investment Highlights</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeAppId === app.id ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              {activeAppId === app.id && (
                <div className="py-3 border-t border-gray-100 text-sm">
                  <h4 className="font-medium mb-2">Key Differentiators</h4>
                  <ul className="ml-4 list-disc space-y-1 text-gray-600">
                    {app.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 pt-2 border-t border-gray-100">
                    <h4 className="font-medium mb-2">Current Milestones</h4>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                        <span className="text-blue-800">Core functionality completed</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mr-2"></div>
                        <span className="text-blue-800">Beta testing with 100+ users</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 rounded-full bg-gray-300 mr-2"></div>
                        <span className="text-gray-500">Full market launch (In Progress)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <button className="text-blue-600 flex items-center">
                      View Demo <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                    <button className="text-blue-600 flex items-center">
                      Financial Projections <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Investment CTA */}
      <div className="max-w-3xl mx-auto px-6 py-4 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
        <h3 className="font-medium text-blue-800 text-center">Seeking Series A Investment to Accelerate Launch Timeline</h3>
        <p className="text-sm text-center text-gray-600 mt-2">Contact our investment relations team for detailed financial projections and market analysis</p>
      </div>
    </div>
  );
};

export default AppStore;
