
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

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
    <div className="space-y-4">
      {featuredApps.map((app) => (
        <Card key={app.id} className="overflow-hidden rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow">
          <div className={`bg-gradient-to-r ${app.color} p-4 text-white`}>
            <span className="text-xs font-medium">{app.title}</span>
          </div>
          <div className="p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
              <img src={app.image} alt={app.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900">{app.name}</h3>
              <p className="text-sm text-gray-500">{app.description}</p>
            </div>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
