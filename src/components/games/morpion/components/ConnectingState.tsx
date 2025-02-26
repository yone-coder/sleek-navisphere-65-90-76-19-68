
import { Loader2, Gamepad2 } from "lucide-react";

export function ConnectingState() {
  return (
    <div className="space-y-4 text-center">
      <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
        <Gamepad2 className="w-12 h-12 text-blue-600" />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium">Connecting players...</p>
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <p className="text-sm text-muted-foreground">Establishing connection</p>
        </div>
      </div>
    </div>
  );
}
