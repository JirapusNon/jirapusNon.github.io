import HeroSection from '@/components/HeroSection';
import { Suspense } from 'react';
import BrandsSection from '@/components/BrandsSection';
import CatalogSection from '@/components/CatalogSection';
import FeaturedSection from '@/components/FeaturedSection';
import ProductsClient from '@/components/ProductsClient';
import ProductGridSkeleton from '@/components/ProductSkeleton';
import TrustStats from '@/components/TrustStats';
import { CONTACT } from '@/lib/constants';
import { getFeatured } from '@/lib/products';

export default function Home() {
  const featured = getFeatured().slice(0, 8);
  return (
    <div className="flex flex-col">
      <HeroSection />

      <TrustStats />

      <BrandsSection />

      <FeaturedSection products={featured} />

      <CatalogSection>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsClient />
        </Suspense>
      </CatalogSection>

      <section className="catalog-section section-cta">
        <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="spec-label">ต้องการความช่วยเหลือ?</p>
          <h2 className="font-heading mt-2 text-xl font-semibold sm:text-2xl">
            บอกรุ่นเครื่องพิมพ์ เราหาให้
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm">
            ไม่แน่ใจว่าหมึกรุ่นไหนใช้ได้? ส่งรุ่นเครื่องพิมพ์มา
            ทีมงานช่วยเช็กสต็อกและราคาให้
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line-solid"
            >
              แชท LINE
            </a>
            <a href={CONTACT.phoneHref} className="btn btn-secondary-on-dark">
              โทร {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
