
import { useState, useEffect } from "react";
import { ProductGallery } from "./header/ProductGallery";
import { NavigationHeader } from "./header/NavigationHeader";

type ProductHeaderProps = {
  images: string[];
  name: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isWishlisted: boolean;
  onWishlistToggle: () => void;
};

export function ProductHeader({
  images,
  name,
  stockStatus,
  isWishlisted,
  onWishlistToggle
}: ProductHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <ProductGallery
        images={images}
        name={name}
        stockStatus={stockStatus}
        isWishlisted={isWishlisted}
        onWishlistToggle={onWishlistToggle}
        scrolled={scrolled}
        scrollDirection={scrollDirection}
      />
      <NavigationHeader
        name={name}
        scrolled={scrolled}
        scrollDirection={scrollDirection}
      />
    </>
  );
}
