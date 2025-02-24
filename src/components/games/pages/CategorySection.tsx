
import React from 'react';
import { Game } from '@/types/game';
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategorySectionProps {
  title: string;
  games: Game[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, games }) => {
  const navigate = useNavigate();

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-xl font-medium text-gray-900">{title}</h2>
        <Button variant="ghost" size="sm" className="text-blue-600 font-medium">
          More <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      
      <ScrollArea className="w-full" type="scroll">
        <div className="flex px-4 gap-4 pb-4">
          {games.map(game => (
            <div key={game.id} className="flex-none w-[280px]">
              <div 
                className="relative aspect-video rounded-xl overflow-hidden mb-3 cursor-pointer"
                onClick={() => game.route && navigate(game.route)}
              >
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex gap-3">
                <img
                  src={game.icon}
                  alt={`${game.title} icon`}
                  className="w-12 h-12 rounded-xl object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{game.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{game.category[0]}</span>
                    <span>•</span>
                    <span>{game.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderRating(game.rating)}
                    <span className="text-xs text-gray-500">{game.downloads}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CategorySection;
