import HeroSection from '@/components/HeroSection';
import { Suspense } from 'react';
import Link from 'next/link';
import BrandsSection from '@/components/BrandsSection';
import ProductCarousel from '@/components/ProductCarousel';
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

      <section className="catalog-section section-surface-accent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="spec-label">สินค้าแนะนำ</p>
          <h2 className="font-heading mt-2 text-xl font-semibold text-ink sm:text-2xl">
            รุ่นที่ SME สั่งบ่อย
          </h2>
          <p className="mt-1 text-sm text-graphite">
            หมึกและอุปกรณ์ที่ลูกค้าเลือกซื้อมากที่สุด
          </p>
          <div className="mt-8">
            <ProductCarousel products={featured} />
          </div>
        </div>
      </section>

      <section id="catalog" className="catalog-section scroll-mt-20 section-surface-canvas">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="spec-label">แคตตาล็อก</p>
              <h2 className="font-heading mt-2 text-xl font-semibold text-ink sm:text-2xl">
                เลือกหมึกตรงรุ่นเครื่องพิมพ์
              </h2>
              <p className="mt-1 text-sm text-graphite">
                ค้นหาด้วยรุ่นเครื่องพิมพ์ ยี่ห้อ หรือรหัสสินค้า
              </p>
            </div>
            <Link
              href="/products"
              className="hidden shrink-0 cursor-pointer text-sm font-medium text-accent underline-offset-2 hover:underline sm:block"
            >
              ดูทั้งหมด
            </Link>
          </div>
          <div className="mt-8">
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductsClient />
            </Suspense>
          </div>
        </div>
      </section>

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
