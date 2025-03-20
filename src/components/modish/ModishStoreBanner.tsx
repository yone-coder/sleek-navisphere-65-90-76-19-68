
import React, { useState } from 'react';
import { ShoppingBag, Star, ThumbsUp, Users, Medal, Clock, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function ModishStoreBanner() {
  const { toast } = useToast();
  const [following, setFollowing] = useState(false);
  
  // Mock store data
  const store = {
    name: 'AudioTech Official Store',
    avatar: '/api/placeholder/50/50',
    rating: 97.8,
    followers: '15.2K',
    products: 342,
    responseRate: '98%',
    joinedYear: 2019,
    isTopRated: true,
    badges: ['Top Brand', 'Fast Shipper', 'Trusted Seller']
  };
  
  const handleFollowStore = () => {
    setFollowing(!following);
    toast({
      title: following ? "Unfollowed store" : "Following store",
      description: following 
        ? "You will no longer receive updates from this store" 
        : "You will now receive updates for new products and promotions",
      duration: 2000
    });
  };
  
  const handleViewStore = () => {
    toast({
      title: "Navigating to store",
      description: "Full store functionality coming soon",
      duration: 2000
    });
  };
  
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Store Banner */}
      <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-500 relative">
        <div className="absolute -bottom-8 left-3 w-16 h-16 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white text-xl font-bold">
            {store.name.charAt(0)}
          </div>
        </div>
        
        {/* Top Brand Badge */}
        {store.isTopRated && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-yellow-500 text-white border-0 font-medium text-xs px-2 py-0.5">
              <Medal className="w-3 h-3 mr-1" />
              Top Rated
            </Badge>
          </div>
        )}
      </div>
      
      {/* Store Info */}
      <div className="pt-10 pb-3 px-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">{store.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-700">{store.rating}% Positive</span>
            </div>
          </div>
          
          <Button
            variant={following ? "outline" : "default"}
            size="sm"
            className={`text-xs px-3 h-8 rounded-full ${
              following 
                ? "border-gray-300 text-gray-700" 
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            onClick={handleFollowStore}
          >
            {following ? "Following" : "Follow"}
          </Button>
        </div>
        
        {/* Store Badges */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {store.badges.map((badge, index) => (
            <Badge 
              key={index} 
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 text-[10px]"
            >
              {badge}
            </Badge>
          ))}
        </div>
        
        {/* Store Stats */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-md py-2">
            <div className="flex items-center text-gray-600">
              <Users className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">{store.followers}</span>
            </div>
            <span className="text-[10px] text-gray-500 mt-0.5">Followers</span>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-md py-2">
            <div className="flex items-center text-gray-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">{store.products}</span>
            </div>
            <span className="text-[10px] text-gray-500 mt-0.5">Products</span>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-md py-2">
            <div className="flex items-center text-gray-600">
              <Clock className="w-3 h-3 mr-1" />
              <span className="text-xs font-medium">{store.responseRate}</span>
            </div>
            <span className="text-[10px] text-gray-500 mt-0.5">Response</span>
          </div>
        </div>
        
        {/* View Store Button */}
        <button 
          className="w-full mt-3 py-1.5 border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50"
          onClick={handleViewStore}
        >
          View Store
        </button>
      </div>
    </div>
  );
}
