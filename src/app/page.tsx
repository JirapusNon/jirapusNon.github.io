import { Suspense } from 'react';
import Link from 'next/link';
import { Check, Printer, Star } from 'lucide-react';
import BrandLogoCard from '@/components/BrandLogoCard';
import ProductCarousel from '@/components/ProductCarousel';
import ProductsClient from '@/components/ProductsClient';
import ProductGridSkeleton from '@/components/ProductSkeleton';
import TrustStats from '@/components/TrustStats';
import { CONTACT } from '@/lib/constants';
import { brands, getFeatured } from '@/lib/products';
import { getBrandLogoStyle } from '@/lib/brandLogo';
import LineIcon from '@/components/LineIcon';

const trustItems = ['ส่งฟรีทั่วประเทศ', 'รับประกันคุณภาพ', 'มีสินค้าพร้อมส่ง'];

export default function Home() {
  const featured = getFeatured().slice(0, 8);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary via-navy-700 to-accent-900 text-white">
        <div className="pointer-events-none absolute -top-16 right-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-accent-200">
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              ครบ จบ ในที่เดียว
            </span>
            <h1 className="font-heading mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              หมึกพิมพ์ทุกรุ่น ทุกยี่ห้อ
              <br />
              <span className="text-accent-300">ส่งตรงถึงมือคุณ</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm text-accent-100 sm:text-base">
              จำหน่ายหมึกแท้และเทียบเท่าคุณภาพสูง ราคาโรงงาน
              ส่งฟรีทั่วประเทศเมื่อสั่งครบ 1,000 บาท
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#catalog"
                className="cursor-pointer rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg transition duration-200 hover:bg-accent-50"
              >
                ดูสินค้าทั้งหมด
              </Link>
              <a
                href={CONTACT.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden shrink-0 cursor-pointer items-center gap-2 rounded-full bg-line px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-line-hover sm:flex"
              >
                <LineIcon className="h-5 w-5 shrink-0" />
                ติดต่อสั่งซื้อ
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-accent-100 sm:text-sm">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 shrink-0 text-accent-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative mx-auto max-w-sm rounded-3xl border border-white/15 bg-white/10 p-8">
              <span className="absolute -left-4 -top-4 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-primary shadow-lg">
                ส่งด่วน
                <br />
                <span className="text-sm">24 ชม.</span>
              </span>

              <div className="rounded-2xl bg-white p-5 shadow-xl">
                <div className="h-2 w-2/3 rounded-full bg-accent-400" />
                <div className="mt-4 h-2 w-full rounded-full bg-navy-100" />
                <div className="mt-2 h-2 w-5/6 rounded-full bg-navy-100" />
                <div className="mt-2 h-2 w-3/4 rounded-full bg-navy-100" />
                <div className="mt-4 h-8 w-1/3 rounded-lg bg-primary" />
              </div>

              <div className="mt-4 flex justify-center gap-3">
                <div className="h-16 w-9 rounded-t-lg bg-blue-400" />
                <div className="h-16 w-9 rounded-t-lg bg-emerald-400" />
                <div className="h-16 w-9 rounded-t-lg bg-accent-400" />
                <div className="h-16 w-9 rounded-t-lg bg-sky-400" />
              </div>

              <span className="absolute -bottom-4 -right-4 flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-primary shadow-lg">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span>
                  4.9
                  <br />
                  ลูกค้าพึงพอใจ
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <TrustStats />

      <section
        id="brands"
        className="scroll-mt-20 bg-card py-16 sm:py-20"
      >
        <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            แบรนด์พาร์ทเนอร์
          </p>
          <h2 className="font-heading mt-2 text-xl font-bold tracking-tight text-primary sm:text-2xl">
            ยี่ห้อที่เราจำหน่าย
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            ครอบคลุมเครื่องพิมพ์ทุกยี่ห้อดังในไทย ทั้งหมึกแท้และเทียบเท่า
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
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

          <p className="mt-10 text-sm text-muted-foreground">
            ไม่พบแบรนด์ที่ต้องการ?{' '}
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer font-medium text-accent transition duration-200 hover:text-accent-hover"
            >
              ติดต่อทีมงานเพื่อสอบถาม
            </a>
          </p>
        </div>
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="font-heading text-lg font-bold text-primary sm:text-xl">
              สินค้าแนะนำ / ขายดี
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              รุ่นยอดนิยมที่ลูกค้าเลือกซื้อมากที่สุด
            </p>
          </div>
          <ProductCarousel products={featured} />
        </div>
      </section>

      <section id="catalog" className="scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl rounded-2xl bg-card p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-primary sm:text-xl">
              แคตตาล็อกสินค้า
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              เลือกหมึกพิมพ์ตรงรุ่นเครื่องพิมพ์ที่คุณใช้งาน
            </p>
          </div>
          <Link
            href="/products"
            className="hidden shrink-0 cursor-pointer text-sm font-medium text-accent transition duration-200 hover:text-accent-hover sm:block"
          >
            ดูสินค้าทั้งหมด →
          </Link>
        </div>
        <div className="mt-6">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductsClient />
          </Suspense>
        </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-lg font-bold text-primary sm:text-xl">
          ยังหาสินค้าที่ต้องการไม่เจอ?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          ทักแชทหรือโทรสอบถามทีมงานของเรา
          ยินดีให้คำแนะนำหมึกที่เหมาะกับเครื่องพิมพ์ของคุณ
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href={CONTACT.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer rounded-full bg-line px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-line-hover"
          >
            แชท LINE
          </a>
          <a
            href={CONTACT.phoneHref}
            className="cursor-pointer rounded-lg bg-muted px-5 py-2.5 text-sm font-semibold text-secondary shadow-xs transition duration-200 hover:bg-muted/80 hover:text-accent"
          >
            โทร {CONTACT.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
