
import { useState } from 'react';
import { MarketplaceHeader, locations } from '@/components/marketplace/MarketplaceHeader';
import { CategoryTabs } from '@/components/marketplace/CategoryTabs';
import { CategorySlider } from '@/components/marketplace/CategorySlider';
import { categorySlides } from '@/data/categorySlides';
import { SellersList } from "@/components/marketplace/SellersList";
import { LightningDeals } from "@/components/marketplace/LightningDeals";
import { FeaturedProducts } from "@/components/marketplace/FeaturedProducts";

const Marketplace = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const currentSlides = categorySlides[selectedCategory as keyof typeof categorySlides];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <MarketplaceHeader
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <CategoryTabs
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <CategorySlider slides={currentSlides} />
        <LightningDeals />
        <SellersList />
        <FeaturedProducts />
      </main>
    </div>
  );
};

export default Marketplace;
