
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export function FoundState() {
  return (
    <div className="space-y-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center mx-auto"
      >
        <Users className="w-12 h-12 text-green-600" />
      </motion.div>
      <p className="text-lg font-medium text-green-600">Opponent Found!</p>
    </div>
  );
}
