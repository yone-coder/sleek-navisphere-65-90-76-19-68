
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, Settings, ShoppingBag, CreditCard, Bell, Shield, 
  ChevronRight, LogOut, Palette, Languages, Gift, History,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MarketplaceNav } from "@/components/marketplace/MarketplaceNav";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  description?: string;
  onClick?: () => void;
}

export default function MarketplaceAccount() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [editMode, setEditMode] = useState(false);

  // Mock user data - In a real app, this would come from your auth context/API
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96",
    memberSince: "2023",
    ordersCount: 12,
    savedItems: 5
  });

  const menuItems: MenuItem[] = [
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "My Orders",
      value: "12 orders",
      description: "View your order history",
      onClick: () => navigate("/marketplace/orders")
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Payment Methods",
      value: "2 cards saved",
      description: "Manage your payment options",
      onClick: () => navigate("/marketplace/payments")
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: "Security",
      value: "2FA enabled",
      description: "Protect your account",
      onClick: () => navigate("/marketplace/security")
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Notifications",
      value: "On",
      description: "Manage your alerts",
      onClick: () => navigate("/marketplace/notifications")
    },
    {
      icon: <Palette className="w-5 h-5" />,
      label: "Appearance",
      value: "Light mode",
      description: "Customize your experience",
      onClick: () => navigate("/marketplace/appearance")
    },
    {
      icon: <Languages className="w-5 h-5" />,
      label: "Language",
      value: "English",
      description: "Change language settings",
      onClick: () => navigate("/marketplace/language")
    }
  ];

  const handleSave = () => {
    setEditMode(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Account</h1>
        </div>
      </div>

      <div className="pt-[60px] px-4">
        {/* Profile Card */}
        <Card className="p-6 mt-4 border-none shadow-lg animate-fade-in">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              {editMode ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name"
                      value={userData.name}
                      onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full">
                    Save Changes
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold truncate">{userData.name}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{userData.email}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-destructive hover:text-destructive/90"
                      onClick={() => {
                        toast.success("Logged out successfully");
                        navigate("/login");
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-1" />
                      Sign Out
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card className="p-4 text-center border-none shadow-lg">
            <p className="text-2xl font-semibold">{userData.ordersCount}</p>
            <p className="text-xs text-gray-500 mt-1">Orders</p>
          </Card>
          <Card className="p-4 text-center border-none shadow-lg">
            <p className="text-2xl font-semibold">{userData.savedItems}</p>
            <p className="text-xs text-gray-500 mt-1">Saved</p>
          </Card>
          <Card className="p-4 text-center border-none shadow-lg">
            <p className="text-2xl font-semibold">{userData.memberSince}</p>
            <p className="text-xs text-gray-500 mt-1">Member Since</p>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="space-y-4 mt-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="flex items-center p-4 cursor-pointer border-none shadow-lg hover:bg-gray-50/50 transition-colors animate-fade-in"
              onClick={item.onClick}
            >
              <div className="flex items-center flex-1 gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{item.label}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{item.value}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Version Info */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Version 1.0.0
        </p>
      </div>

      <MarketplaceNav />
    </div>
  );
}
