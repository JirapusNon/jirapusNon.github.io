import HeroSection from '@/components/HeroSection';
import { Suspense } from 'react';
import BrandsSection from '@/components/BrandsSection';
import CatalogSection from '@/components/CatalogSection';
import FeaturedSection from '@/components/FeaturedSection';
import ProductsClient from '@/components/ProductsClient';
import ProductGridSkeleton from '@/components/ProductSkeleton';
import TrustStats from '@/components/TrustStats';
import { getFeatured } from '@/lib/products';

export default function Home() {
  const featured = getFeatured().slice(0, 8);
  return (
    <div className="flex flex-col">
      <HeroSection />

      <BrandsSection />

      <FeaturedSection products={featured} />

      <CatalogSection>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsClient />
        </Suspense>
      </CatalogSection>

      <TrustStats />
    </div>
  );
}
