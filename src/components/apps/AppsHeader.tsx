
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppsHeaderProps {
  onOpenSearch?: () => void;
}

export const AppsHeader = ({ onOpenSearch }: AppsHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/30 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] border-b border-gray-100/20">
      <div className="container flex flex-col py-3">
        <div className="flex items-center justify-end gap-2 w-full max-w-3xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-white/50"
            title="Settings"
          >
            <Settings className="h-5 w-5 text-muted-foreground/70" />
          </Button>
        </div>
      </div>
    </header>
  );
};
