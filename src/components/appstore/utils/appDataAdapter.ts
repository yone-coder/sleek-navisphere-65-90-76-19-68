
import { App as AppStoreApp } from "../types";
import { App as PlatformApp } from "@/components/apps/types";
import { Store, Gamepad2, BookOpen, Wallet, PiggyBank, Briefcase, Search, 
  Ticket, Calendar, Bitcoin, Globe, Heart, Building, Presentation, 
  UserPlus, Shirt } from "lucide-react";

/**
 * Maps Lucide icon components to appropriate image colors
 */
const getIconColor = (iconName: string): string => {
  const colorMap: Record<string, string> = {
    Store: "bg-blue-500",
    Gamepad2: "bg-purple-500",
    BookOpen: "bg-green-500",
    Wallet: "bg-amber-500",
    PiggyBank: "bg-pink-500",
    Briefcase: "bg-indigo-500",
    Search: "bg-cyan-500",
    Ticket: "bg-rose-500",
    Calendar: "bg-teal-500",
    Bitcoin: "bg-yellow-500",
    Globe: "bg-sky-500",
    Heart: "bg-red-500",
    Building: "bg-gray-600",
    Presentation: "bg-violet-500",
    UserPlus: "bg-emerald-500",
    Shirt: "bg-orange-500"
  };
  
  return colorMap[iconName] || "bg-blue-500";
};

/**
 * Converts platform app data format to app store format
 */
export const convertPlatformAppToAppStore = (platformApp: PlatformApp): AppStoreApp => {
  // Map category to most appropriate app store category
  let category = platformApp.category;
  
  // Get icon as string - using the app's color for better visualization
  const getIconUrl = (iconComponent: any): string => {
    // Convert icon component name to string
    const iconName = iconComponent.name || "Store";
    
    // Use the app color to generate a gradient background
    const appColor = platformApp.color.replace('bg-', '') || "blue-500";
    
    // Return placeholder with color parameter
    return `/placeholder.svg?color=${appColor}`;
  };
  
  // Determine app type based on category
  const getAppType = (category: string): "app" | "game" | "arcade" => {
    if (category === "Gaming") return "game";
    if (category === "Entertainment" && platformApp.name.includes("Game")) return "game";
    return "app";
  };
  
  // Convert rating scale if needed
  const rating = platformApp.rating || 4.5;
  
  // Generate random but realistic values for the app store data
  const randomReviews = Math.floor(Math.random() * 900000) + 100000;
  const randomSize = `${(Math.random() * 500 + 50).toFixed(1)} MB`;
  const randomAge = ["4+", "9+", "12+", "17+"][Math.floor(Math.random() * 4)];
  const randomDownloads = platformApp.users
    ? platformApp.users.includes("K")
      ? `${parseInt(platformApp.users) * 10}K+`
      : `${parseInt(platformApp.users.replace("K+", "")) / 100}M+`
    : `${Math.floor(Math.random() * 900) + 100}K+`;

  // Generate colorful app icon based on the app's color
  const iconUrl = getIconUrl(platformApp.icon);
  
  return {
    id: platformApp.name.toLowerCase().replace(/\s+/g, '-'),
    name: platformApp.name,
    icon: iconUrl,
    category: category,
    description: platformApp.description,
    rating: rating,
    reviews: randomReviews,
    size: randomSize,
    age: randomAge,
    price: Math.random() > 0.7 ? parseFloat((Math.random() * 5 + 0.99).toFixed(2)) : 0,
    developer: "Lovable Studio",
    type: getAppType(category),
    downloads: randomDownloads,
    inAppPurchases: Math.random() > 0.5
  };
};

/**
 * Converts an array of platform apps to app store format
 */
export const convertPlatformAppsToAppStore = (platformApps: PlatformApp[]): AppStoreApp[] => {
  return platformApps.map(app => convertPlatformAppToAppStore(app));
};
