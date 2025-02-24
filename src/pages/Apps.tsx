
import { useState } from "react";
import { BannerSlider } from "@/components/BannerSlider";
import { AppsHeader } from "@/components/apps/AppsHeader";
import { ProfileCard } from "@/components/apps/ProfileCard";
import { SearchOverlay } from "@/components/search/SearchOverlay";

export default function Apps() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppsHeader onOpenSearch={() => setIsSearchOpen(true)} />
      <ProfileCard />
      <BannerSlider />
      
      {/* Search Overlay */}
      {isSearchOpen && (
        <SearchOverlay onClose={() => setIsSearchOpen(false)} />
      )}
    </div>
  );
}
