import { Mail, Settings, Users, FileText, ShoppingBag, DollarSign, Play, Gamepad } from "lucide-react";
import type { App } from "@/components/apps/types";

const mockApps: App[] = [
  {
    name: "Media Player",
    description: "Watch your favorite content",
    icon: Play,
    color: "bg-blue-500",
    category: "Entertainment",
    route: "/media",
    rating: 4.8,
    updates: 0
  },
  {
    name: "Games",
    description: "Play exciting games",
    icon: Gamepad,
    color: "bg-purple-500",
    category: "Gaming",
    route: "/games",
    rating: 4.9,
    updates: 2
  },
  {
    name: "Mail",
    description: "Send and receive emails",
    icon: Mail,
    color: "bg-indigo-500",
    category: "Communication",
    route: "/mail",
    rating: 4.7,
    updates: 1
  },
  {
    name: "Settings",
    description: "System preferences",
    icon: Settings,
    color: "bg-gray-500",
    category: "System",
    route: "/settings",
    rating: 4.5,
    updates: 0
  },
  {
    name: "Social",
    description: "Connect with friends",
    icon: Users,
    color: "bg-pink-500",
    category: "Social",
    route: "/social",
    rating: 4.6,
    updates: 3
  },
  {
    name: "Documents",
    description: "Manage your files",
    icon: FileText,
    color: "bg-yellow-500",
    category: "Work",
    route: "/documents",
    rating: 4.4,
    updates: 0
  },
  {
    name: "Store",
    description: "Shop online",
    icon: ShoppingBag,
    color: "bg-green-500",
    category: "Shopping",
    route: "/store",
    rating: 4.8,
    updates: 5
  },
  {
    name: "Finance",
    description: "Track your expenses",
    icon: DollarSign,
    color: "bg-emerald-500",
    category: "Finance",
    route: "/finance",
    rating: 4.7,
    updates: 1
  }
];

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Featured Apps</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockApps.map((app) => (
          <div
            key={app.name}
            className="p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${app.color}`}>
                <app.icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-semibold">{app.name}</h2>
            </div>
            <p className="text-sm text-gray-600">{app.description}</p>
            {app.updates > 0 && (
              <div className="mt-3 text-xs text-green-600">
                {app.updates} new updates available
              </div>
            )}
            <div className="mt-3 text-sm text-gray-500">
              Rating: {app.rating}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
