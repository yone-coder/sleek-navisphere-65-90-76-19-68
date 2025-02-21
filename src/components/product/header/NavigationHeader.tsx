
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

type NavigationHeaderProps = {
  name: string;
  scrolled: boolean;
  scrollDirection: 'up' | 'down';
};

export function NavigationHeader({
  name,
  scrolled,
  scrollDirection
}: NavigationHeaderProps) {
  const navigate = useNavigate();

  return (
    <div 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-in-out
        ${scrolled 
          ? 'bg-white shadow-md' 
          : 'bg-gradient-to-b from-black/50 to-transparent'}
        ${scrollDirection === 'down' && scrolled 
          ? '-translate-y-full' 
          : 'translate-y-0'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className={`
              transition-colors duration-300
              ${scrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white bg-black/20 hover:bg-black/30'}
              backdrop-blur-sm rounded-full pointer-events-auto
            `}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex-1 max-w-[200px] mx-4 transition-opacity duration-300">
            {scrolled && (
              <h2 className="text-sm font-medium truncate text-gray-700 text-center">
                {name}
              </h2>
            )}
          </div>

          <div className="flex gap-2 pointer-events-auto">
            <Button 
              variant="ghost" 
              size="icon"
              className={`
                transition-colors duration-300
                ${scrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white bg-black/20 hover:bg-black/30'}
                backdrop-blur-sm rounded-full
              `}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={`
                transition-colors duration-300
                ${scrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white bg-black/20 hover:bg-black/30'}
                backdrop-blur-sm rounded-full
              `}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
