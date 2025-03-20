
import { App as AppStoreApp } from "../types";
import { App as PlatformApp } from "@/components/apps/types";
import { Store, Gamepad2, BookOpen, Wallet, PiggyBank, Briefcase, Search, 
  Ticket, Calendar, Bitcoin, Globe, Heart, Building, Presentation, 
  UserPlus, Shirt } from "lucide-react";

/**
 * Converts platform app data format to app store format
 */
export const convertPlatformAppToAppStore = (platformApp: PlatformApp): AppStoreApp => {
  // Map category to most appropriate app store category
  let category = platformApp.category;
  
  // Get icon as string
  const getIconUrl = (iconComponent: any): string => {
    // Since we can't directly convert Lucide icons to image URLs,
    // we'll use placeholder images with different colors based on the app's color
    return "/placeholder.svg";
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
  
  return {
    id: platformApp.name.toLowerCase().replace(/\s+/g, '-'),
    name: platformApp.name,
    icon: getIconUrl(platformApp.icon),
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
