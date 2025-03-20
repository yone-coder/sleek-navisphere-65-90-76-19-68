
import React from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

interface DiscountBannerProps {
  title: string;
  subtitle: string;
  discount: string;
  expiresIn: string;
  background: string;
}

export function DiscountBanner({ 
  title, 
  subtitle, 
  discount, 
  expiresIn,
  background = "bg-gradient-to-r from-purple-500 to-indigo-600"
}: DiscountBannerProps) {
  return (
    <motion.div
      className={`rounded-xl ${background} p-4 text-white relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNiAzNGgxOHYxOEgzNnoiLz48cGF0aCBkPSJNMTggMThoMTh2MThoLTE4eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm opacity-90">{subtitle}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-white/20 text-white text-xs font-semibold px-2 py-1 rounded">
              {discount} OFF
            </span>
            <span className="text-xs">Expires in {expiresIn}</span>
          </div>
        </div>
        
        <div className="bg-white/30 backdrop-blur-sm rounded-full p-2.5">
          <Gift className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <button className="mt-3 bg-white text-indigo-600 px-4 py-1.5 rounded-full text-sm font-medium">
        Claim Offer
      </button>
    </motion.div>
  );
}
