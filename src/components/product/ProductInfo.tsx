
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users } from "lucide-react";

type ProductInfoProps = {
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  isFollowing: boolean;
  onFollowToggle: () => void;
};

export function ProductInfo({
  name,
  price,
  originalPrice,
  discount,
  isFollowing,
  onFollowToggle
}: ProductInfoProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-base font-medium text-gray-900 truncate pr-4 flex-1">{name}</h1>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-[#0FA0CE] whitespace-nowrap">{Math.round(price)} G</span>
          <span className="text-xs text-red-500 line-through whitespace-nowrap">{Math.round(originalPrice)} G</span>
          <Badge className="text-[10px] px-1.5 py-0.5 bg-[#FEF7CD] text-yellow-700 border-yellow-200">
            {discount}% OFF
          </Badge>
        </div>
      </div>

      <div className="mt-2 mb-4 px-3 py-2 bg-[#F1F0FB] rounded-lg border border-[#E5DEFF]">
        <p className="text-xs leading-relaxed text-gray-600">
          Experience premium gaming comfort with ergonomic design, 4D adjustable armrests, and memory foam padding. Perfect for extended gaming sessions
          <button
            className="shrink-0 ml-1 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-medium tracking-wide whitespace-nowrap hover:bg-green-500/15 transition-all duration-300"
          >
            specifications
          </button>
        </p>
      </div>

      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-gray-200">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" />
            <AvatarFallback>PG</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-900">Pro Gaming Store</span>
              <CheckCircle className="h-4 w-4 text-blue-500 fill-current" />
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Users className="h-3 w-3" />
              <span>23.4k followers</span>
            </div>
          </div>
        </div>
        <Button 
          variant="outline"
          size="sm"
          className={`text-xs transition-all duration-300 ${
            isFollowing 
              ? 'bg-gray-50 text-gray-700' 
              : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]'
          }`}
          onClick={onFollowToggle}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </div>
    </>
  );
}
