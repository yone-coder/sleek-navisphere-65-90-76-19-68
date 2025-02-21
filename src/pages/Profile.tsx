
import { useLanguage } from "@/contexts/LanguageContext";
import { UserCircle, Settings, CreditCard, Heart, Package, ShoppingBag, Contact, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const { t } = useLanguage();

  const menuItems = [
    { icon: ShoppingBag, label: "My Orders", badge: "2" },
    { icon: Heart, label: "Wishlist", badge: "5" },
    { icon: CreditCard, label: "Payment Methods" },
    { icon: Package, label: "Shipping Addresses" },
    { icon: Contact, label: "Contact Support" },
    { icon: Bell, label: "Notifications", badge: "3" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 animate-fade-in">
      {/* Profile Header */}
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="w-20 h-20 border-2 border-primary">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" />
            <AvatarFallback>
              <UserCircle className="w-12 h-12" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">Sarah Johnson</h1>
            <p className="text-sm text-muted-foreground">@sarahjohnson</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="font-medium">
                Pro Member
              </Badge>
              <Badge variant="outline" className="font-medium">
                Verified
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-muted-foreground">Orders</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">1.2k</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">5</div>
            <div className="text-xs text-muted-foreground">Reviews</div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-14"
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-2">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </nav>

        {/* Version Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
