
import React, { useState } from 'react';
import { Download, Star, ChevronRight, Heart, ChevronDown, Store, Gamepad2, BookOpen, Wallet, Ticket } from 'lucide-react';

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
      marketSize: "$4.9T global e-commerce market",
      targetUsers: "Mobile shoppers aged 25-45",
      revenueModel: "Platform fees and premium seller subscriptions",
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
      marketSize: "$240B remittance market",
      targetUsers: "International workers and businesses",
      revenueModel: "Transaction fees and currency exchange margins",
      features: ["Multi-currency wallets", "Near-instant transfers", "Bank-grade security"],
      tags: ["Finance", "International", "Essential"]
    }
  ];

  // State for active app details and favorites
  const [activeAppId, setActiveAppId] = useState<number | null>(1);
  const [favoriteApps, setFavoriteApps] = useState<number[]>([1]);

  // Generate placeholder screenshots (3 per app)
  const getScreenshots = (appId: number) => {
    return [1, 2, 3];
  };

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
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ) : i === fullStars && hasHalfStar ? (
              <div className="relative w-5 h-5">
                <Star className="absolute w-5 h-5 text-gray-300" />
                <div className="absolute w-2.5 h-5 overflow-hidden">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            ) : (
              <Star className="w-5 h-5 text-gray-300" />
            )}
          </div>
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Progress bar for development status
  const ProgressBar = ({ percentage }: { percentage: number }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-black text-white min-h-screen pb-16">
      {/* App listings */}
      <div className="max-w-3xl mx-auto">
        {apps.map(app => (
          <div key={app.id} className="pt-6 pb-6 bg-gray-900 mb-6 rounded-xl">
            {/* App header section */}
            <div className="flex items-start px-6 mb-4">
              <div 
                className="w-24 h-24 rounded-xl flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: app.color }}
              >
                {app.icon && <app.icon className="w-12 h-12" />}
              </div>
              
              <div className="flex-1 ml-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-xl">{app.name}</h3>
                      <div className="text-xs px-2 py-1 rounded-full bg-blue-800 text-white">
                        {app.status}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{app.type}</p>
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
                        className={`w-6 h-6 ${
                          favoriteApps.includes(app.id) 
                            ? "fill-red-500 text-red-500" 
                            : "text-gray-400"
                        }`} 
                      />
                    </button>
                    <button className="mt-2 px-6 py-2 rounded-full text-sm font-medium bg-blue-600 text-white">
                      {app.price}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Development progress */}
            <div className="px-6 mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-base font-medium text-white">Development Progress</span>
                <span className="text-base text-gray-300">{app.completionPercentage}%</span>
              </div>
              <ProgressBar percentage={app.completionPercentage} />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-400">Phase: Beta Testing</span>
                <span className="text-xs text-gray-400">Target Launch: {app.launchDate}</span>
              </div>
            </div>
            
            {/* Key metrics */}
            <div className="grid grid-cols-3 gap-2 px-6 py-4 mb-6 bg-gray-800 mx-4 rounded-lg">
              <div className="text-center">
                <p className="text-xs text-gray-400">Market Size</p>
                <p className="text-sm font-medium text-white">{app.marketSize.split(' ')[0]}</p>
                <p className="text-xs text-gray-400">
                  {app.marketSize.split(' ').slice(1).join(' ')}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Target Users</p>
                <p className="text-sm font-medium text-white">
                  {app.targetUsers.split(' ').slice(0, 2).join(' ')}
                </p>
                <p className="text-xs text-gray-400">
                  {app.targetUsers.split(' ').slice(2).join(' ')}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Revenue Model</p>
                <p className="text-sm font-medium text-white">{app.revenueModel.split(' ')[0]}</p>
              </div>
            </div>
            
            {/* Tags */}
            <div className="px-6 mb-4">
              <div className="flex flex-wrap gap-2">
                {app.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Scrollable screenshots */}
            <div className="relative">
              <div className="overflow-x-auto -mx-6 px-6">
                <div className="flex gap-3 pl-6 pr-16" style={{ width: 'max-content' }}>
                  {getScreenshots(app.id).map(num => (
                    <div 
                      key={num} 
                      className="flex-shrink-0 rounded-xl overflow-hidden bg-gray-800 w-72 h-48 flex items-center justify-center shadow-sm"
                    >
                      <img 
                        src={`/api/placeholder/288/192?text=${app.name}+Prototype+${num}`}
                        alt={`${app.name} prototype ${num}`} 
                        className="w-full"
                      />
                    </div>
                  ))}
                  <div className="flex-shrink-0 w-4"></div>
                </div>
              </div>
            </div>
            
            {/* Description below the images */}
            <div className="px-6 mt-4 mb-3">
              <p className="text-sm text-gray-400">{app.description}</p>
            </div>
            
            {/* Expandable details section */}
            <div className="px-6">
              <button 
                className="w-full flex items-center justify-between py-2 border-t border-gray-700 text-sm text-blue-400"
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
                <div className="py-3 border-t border-gray-700 text-sm">
                  <h4 className="font-medium mb-2 text-white">Key Differentiators</h4>
                  <ul className="ml-4 list-disc space-y-1 text-gray-400">
                    {app.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 pt-2 border-t border-gray-700">
                    <h4 className="font-medium mb-2 text-white">Current Milestones</h4>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300">Core functionality completed</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300">Beta testing with 100+ users</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                        <span className="text-gray-500">Full market launch (In Progress)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <button className="text-blue-400 flex items-center">
                      View Demo <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                    <button className="text-blue-400 flex items-center">
                      Financial Projections <ChevronRight className="w-4 h-4 ml-1" />
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

export default AppStore;
