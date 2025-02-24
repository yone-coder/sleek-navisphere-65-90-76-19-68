
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mic, Camera, Settings } from "lucide-react";

interface AppsHeaderProps {
  onOpenSearch: () => void;
}

export const AppsHeader = ({ onOpenSearch }: AppsHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/30 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] border-b border-gray-100/20">
      <div className="container flex flex-col py-3">
        <div className="flex items-center gap-2 w-full max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground/60" />
            <Input
              placeholder="Search apps, documents, and more..."
              className="pl-8 pr-28 bg-white/40 hover:bg-white/50 transition-colors duration-200 cursor-pointer border-none h-9 text-sm rounded-full shadow-[0_2px_4px_0_rgba(0,0,0,0.02)]"
              onClick={onOpenSearch}
              readOnly
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-white/50"
                title="Voice search"
              >
                <Mic className="h-4 w-4 text-muted-foreground/70" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-white/50"
                title="Image search"
              >
                <Camera className="h-4 w-4 text-muted-foreground/70" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-white/50"
                title="Search settings"
              >
                <Settings className="h-4 w-4 text-muted-foreground/70" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
