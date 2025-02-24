
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mic, Camera, Settings, Command } from "lucide-react";

interface AppsHeaderProps {
  onOpenSearch: () => void;
}

export const AppsHeader = ({ onOpenSearch }: AppsHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/70">
      <div className="container flex flex-col py-3">
        <div className="flex items-center gap-2 w-full max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-muted-foreground/60" />
            <Input
              placeholder="Search apps, documents, and more..."
              className="pl-8 pr-28 bg-transparent hover:bg-muted/10 transition-colors duration-200 cursor-pointer border-none h-9 text-sm rounded-full shadow-sm"
              onClick={onOpenSearch}
              readOnly
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-muted/60"
                title="Voice search"
              >
                <Mic className="h-4 w-4 text-muted-foreground/70" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-muted/60"
                title="Image search"
              >
                <Camera className="h-4 w-4 text-muted-foreground/70" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-muted/60"
                title="Search settings"
              >
                <Settings className="h-4 w-4 text-muted-foreground/70" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground/70">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 gap-1.5 text-xs font-normal hover:bg-muted/40"
          >
            <Command className="h-3 w-3" />
            Press
            <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              ⌘
            </kbd>
            <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              K
            </kbd>
            to search
          </Button>
        </div>
      </div>
    </header>
  );
};
