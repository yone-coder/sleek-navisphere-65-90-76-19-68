
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Images,
  Settings,
  Users,
  FileText,
  Database,
  Server,
} from "lucide-react";

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: Images,
    label: "Banners",
    href: "/admin/banners",
  },
  {
    icon: Users,
    label: "Users",
    href: "/admin/users",
  },
  {
    icon: FileText,
    label: "Content",
    href: "/admin/content",
  },
  {
    icon: Database,
    label: "Data",
    href: "/admin/data",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
  },
  {
    icon: Server,
    label: "System",
    href: "/admin/system",
  },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#1A1F2C] text-white p-4 space-y-4">
        <div className="p-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                location.pathname === item.href
                  ? "bg-[#9b87f5] text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#7E69AB]"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}
