
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Shield, Award, CheckCircle2 } from "lucide-react";

interface SellerCardProps {
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
    premium: boolean;
    productsCount: number;
    reviewsCount: number;
    badgeColor?: string;
  };
}

export const SellerCard = ({ seller }: SellerCardProps) => {
  return (
    <Card className="relative w-[280px] group overflow-hidden border-0 bg-white/80 backdrop-blur-xl hover:bg-white/90 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/10 to-[#1EAEDB]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="p-5 relative">
        {/* Top Section with Avatar and Badges */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20 ring-offset-2">
              <AvatarImage src={seller.avatar} alt={seller.name} />
              <AvatarFallback>{seller.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-medium text-gray-900">{seller.name}</h3>
                {seller.verified && (
                  <CheckCircle2 className="w-4 h-4 text-[#0EA5E9]" />
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span>{seller.rating.toFixed(1)}</span>
                <span className="text-gray-400">•</span>
                <span>{seller.reviewsCount} reviews</span>
              </div>
            </div>
          </div>
          
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" />
        </div>

        {/* Stats and Badges */}
        <div className="flex items-center gap-2 mb-4">
          {seller.premium && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
              <Award className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
          <Badge variant="secondary" className="gap-1">
            <Shield className="w-3 h-3" />
            Verified Seller
          </Badge>
        </div>

        {/* Products Count */}
        <div className="text-sm text-gray-600">
          {seller.productsCount} products listed
        </div>

        {/* Interaction Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-[#1EAEDB] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </Card>
  );
};
