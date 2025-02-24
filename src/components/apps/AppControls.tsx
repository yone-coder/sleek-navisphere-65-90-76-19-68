
import { ListFilter, TrendingUp, LayoutGrid, Grid2X2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppControlsProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export const AppControls = ({
  viewMode,
  onViewModeChange,
}: AppControlsProps) => {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 min-w-max">
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2"
          onClick={() => onViewModeChange(viewMode === "grid" ? "list" : "grid")}
        >
          {viewMode === "grid" ? (
            <LayoutGrid className="w-4 h-4" />
          ) : (
            <Grid2X2 className="w-4 h-4" />
          )}
          View
        </Button>
      </div>
    </div>
  );
};
