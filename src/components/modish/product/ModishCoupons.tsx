
import React from 'react';
import { useToast } from '@/hooks/use-toast';

type ModishCouponsProps = {
  activeCoupon: string | null;
  onCouponSelect: (coupon: string) => void;
};

export function ModishCoupons({ activeCoupon, onCouponSelect }: ModishCouponsProps) {
  return (
    <div className="flex overflow-x-auto gap-2 pb-2 px-1 scrollbar-none">
      {[
        { code: 'EXTRA5', discount: '$5 OFF', min: '$50', color: 'bg-gradient-to-r from-red-500 to-orange-500' },
        { code: 'SAVE10', discount: '$10 OFF', min: '$100', color: 'bg-gradient-to-r from-blue-500 to-purple-500' },
        { code: 'NEW15', discount: '15% OFF', min: 'New Users', color: 'bg-gradient-to-r from-green-500 to-teal-500' },
      ].map((coupon, index) => (
        <div 
          key={index}
          className="relative flex-shrink-0 w-[130px] h-[70px] rounded-lg overflow-hidden"
        >
          <div className={`absolute inset-0 ${coupon.color}`}></div>
          <div className="absolute inset-0 flex flex-col justify-between p-2 text-white">
            <div className="text-xs font-medium">{coupon.discount}</div>
            <div className="text-[10px] opacity-90">Min. spend: {coupon.min}</div>
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-light">Code: {coupon.code}</div>
              <button 
                className="text-[10px] bg-white text-red-500 px-2 py-0.5 rounded-full font-medium"
                onClick={() => onCouponSelect(coupon.code)}
              >
                {activeCoupon === coupon.code ? 'Collected' : 'Collect'}
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-4 flex items-center">
            <div className="w-4 h-4 rounded-full bg-white"></div>
            <div className="w-4 h-4 rounded-full bg-white"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
