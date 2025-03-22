
import { useState } from 'react';
import { MarketplaceHeader, locations } from '@/components/marketplace/MarketplaceHeader';
import { CategoryTabs } from '@/components/marketplace/CategoryTabs';
import { CategorySlider } from '@/components/marketplace/CategorySlider';
import { categorySlides } from '@/data/categorySlides';
import { SellersList } from "@/components/marketplace/SellersList";
import { LightningDeals } from "@/components/marketplace/LightningDeals";
import { FeaturedProducts } from "@/components/marketplace/FeaturedProducts";
import { RecentProducts } from "@/components/marketplace/RecentProducts";
import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { MarketplaceNav } from '@/components/marketplace/MarketplaceNav';

const newsItems = [
  "🎮 New Gaming Laptops Coming Soon - Pre-order Now!",
  "🔥 Flash Sale: 50% Off on Gaming Accessories",
  "🏆 Join Our Gaming Tournament and Win Exclusive Prizes",
  "💫 Limited Edition Gaming Collectibles Available Now"
];

const Marketplace = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Ensure the category exists in the slides data, otherwise default to 'all'
  const categoryKey = selectedCategory in categorySlides ? selectedCategory : 'all';
  const currentSlides = categorySlides[categoryKey as keyof typeof categorySlides];

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

      <main className="pt-24 pb-20">
        {currentSlides && <CategorySlider slides={currentSlides} />}
          
        <div className="w-full bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="relative overflow-hidden py-2">
              <div className="flex items-center gap-3 animate-marquee whitespace-nowrap">
                {newsItems.map((news, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span>{news}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300 last:hidden" />
                  </div>
                ))}
                {newsItems.map((news, index) => (
                  <div
                    key={`repeat-${index}`}
                    className="inline-flex items-center gap-2 text-sm text-gray-700"
                  >
                    <span>{news}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300 last:hidden" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <LightningDeals />
        <RecentProducts />
        <SellersList />
        <FeaturedProducts />
        <ProductGrid />
      </main>

      <MarketplaceNav />

      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Marketplace;
