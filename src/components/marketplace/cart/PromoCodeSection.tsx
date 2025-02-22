
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface PromoCodeSectionProps {
  promoCode: string;
  isPromoApplied: boolean;
  onPromoCodeChange: (value: string) => void;
  onApplyPromo: () => void;
}

export const PromoCodeSection = ({
  promoCode,
  isPromoApplied,
  onPromoCodeChange,
  onApplyPromo,
}: PromoCodeSectionProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline"
          size="sm"
          onClick={onApplyPromo}
          disabled={isPromoApplied}
        >
          {isPromoApplied ? "Applied" : "Apply"}
        </Button>
      </div>
      {isPromoApplied && (
        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
          <Badge className="h-4 bg-green-100 text-green-600 hover:bg-green-100">10% OFF</Badge>
          Promo code applied successfully!
        </p>
      )}
    </div>
  );
};
