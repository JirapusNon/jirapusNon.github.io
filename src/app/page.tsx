import Image from 'next/image';
import { Suspense } from 'react';
import Link from 'next/link';
import BrandLogoCard from '@/components/BrandLogoCard';
import ProductCarousel from '@/components/ProductCarousel';
import ProductsClient from '@/components/ProductsClient';
import ProductGridSkeleton from '@/components/ProductSkeleton';
import TrustStats from '@/components/TrustStats';
import { CONTACT } from '@/lib/constants';
import { brands, getFeatured } from '@/lib/products';
import { getBrandLogoStyle } from '@/lib/brandLogo';
import LineIcon from '@/components/LineIcon';

export default function Home() {
  const featured = getFeatured().slice(0, 8);
  const heroProducts = featured.slice(0, 4);

  return (
    <div className="flex flex-col">
      <section className="border-b border-rule bg-card">
        <div className="cmyk-strip" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="spec-label">หมึกและอุปกรณ์สำนักงาน</p>
            <h1 className="font-heading mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              หมึกตรงรุ่น
              <br />
              สั่งง่าย ส่งไว
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-graphite sm:text-base">
              ช่วย SME หาหมึกและอุปกรณ์ที่ตรงกับเครื่องพิมพ์ของคุณ
              สต็อกพร้อมส่ง ส่งฟรีเมื่อสั่งครบ 1,000 บาท
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#catalog"
                className="cursor-pointer bg-ink px-6 py-3 text-sm font-medium text-paper transition duration-200 hover:bg-navy-700"
              >
                ดูแคตตาล็อก
              </Link>
              <a
                href={CONTACT.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 cursor-pointer items-center gap-2 bg-line px-5 py-3 text-sm font-medium text-white transition duration-200 hover:bg-line-hover"
              >
                <LineIcon className="h-5 w-5 shrink-0" />
                สั่งซื้อ LINE
              </a>
            </div>

            <p className="mt-6 text-xs text-graphite sm:text-sm">
              ส่งฟรีทั่วประเทศ · รับประกันคุณภาพ · มีสินค้าพร้อมส่ง
            </p>
          </div>

          {heroProducts.length > 0 && (
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {heroProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group relative aspect-square cursor-pointer border border-rule bg-muted/30 p-4 transition duration-200 hover:border-accent"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-2 transition duration-300 group-hover:scale-[1.02]"
                  />
                  <span className="absolute bottom-2 left-2 bg-card/90 px-2 py-0.5 text-[10px] font-medium text-graphite">
                    {product.brand}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <TrustStats />

      <section
        id="brands"
        className="catalog-section scroll-mt-20 bg-background"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="spec-label">แบรนด์ที่จำหน่าย</p>
          <h2 className="font-heading mt-2 text-xl font-semibold text-ink sm:text-2xl">
            ยี่ห้อเครื่องพิมพ์ที่เรารองรับ
          </h2>
          <p className="mt-2 max-w-lg text-sm text-graphite">
            ครอบคลุมเครื่องพิมพ์ทุกยี่ห้อดังในไทย ทั้งหมึกแท้และเทียบเท่า
          </p>

          <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
            {brands.map((brand) => {
              const logo = getBrandLogoStyle(brand);
              return (
                <BrandLogoCard
                  key={brand}
                  href={`/?brand=${encodeURIComponent(brand)}#catalog`}
                  label={brand}
                  logoSrc={logo.image}
                  monogram={logo.monogram}
                  monogramBg={logo.bg}
                />
              );
            })}
          </div>

          <p className="mt-8 text-sm text-graphite">
            ไม่พบแบรนด์ที่ต้องการ?{' '}
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer font-medium text-accent underline-offset-2 hover:underline"
            >
              ติดต่อทีมงานเพื่อสอบถาม
            </a>
          </p>
        </div>
      </section>

      <section className="catalog-section bg-card">
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

      <section id="catalog" className="catalog-section scroll-mt-20 bg-background">
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

      <section className="catalog-section border-b border-rule bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl font-semibold text-ink sm:text-2xl">
            บอกรุ่นเครื่องพิมพ์ เราหาให้
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-graphite">
            ไม่แน่ใจว่าหมึกรุ่นไหนใช้ได้? ส่งรุ่นเครื่องพิมพ์มา
            ทีมงานช่วยเช็กสต็อกและราคาให้
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer bg-line px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-line-hover"
            >
              แชท LINE
            </a>
            <a
              href={CONTACT.phoneHref}
              className="cursor-pointer border border-rule px-5 py-2.5 text-sm font-medium text-secondary transition duration-200 hover:border-accent hover:text-accent"
            >
              โทร {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
