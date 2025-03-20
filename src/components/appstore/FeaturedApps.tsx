
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export function FeaturedApps() {
  const featuredApps = [
    {
      id: 1,
      title: "GAME OF THE DAY",
      name: "Genshin Impact",
      description: "Enter a vast magical world of adventure",
      image: "/placeholder.svg",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "APP OF THE DAY",
      name: "Procreate Dreams",
      description: "Create animation with intuitive tools",
      image: "/placeholder.svg",
      color: "from-pink-500 to-orange-500"
    }
  ];

  return (
    <div className="space-y-3">
      {featuredApps.map((app, index) => (
        <motion.div
          key={app.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow border-0">
            <div className={`bg-gradient-to-r ${app.color} p-3 text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
              <span className="text-xs font-medium relative z-10 bg-white/30 px-2 py-1 rounded-full">{app.title}</span>
            </div>
            <div className="p-3 flex items-center gap-3">
              <div className="w-16 h-16 rounded-[22%] bg-gray-100 overflow-hidden flex-shrink-0 shadow-md">
                <img src={app.image} alt={app.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-gray-900">{app.name}</h3>
                <p className="text-sm text-gray-500">{app.description}</p>
              </div>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition flex-shrink-0">
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
