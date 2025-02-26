
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { formatTime } from "../utils/timeUtils";

interface SearchingStateProps {
  searchTime: number;
}

export function SearchingState({ searchTime }: SearchingStateProps) {
  return (
    <>
      <div className="relative">
        <motion.div
          className="w-32 h-32 rounded-full border-2 border-blue-500/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 w-32 h-32 rounded-full border-2 border-blue-500/40"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Users className="w-12 h-12 text-blue-500" />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-lg font-medium">Searching for opponents...</p>
        <p className="text-sm text-muted-foreground">Time elapsed: {formatTime(searchTime)}</p>
      </div>
    </>
  );
}
