import Image from 'next/image';
import Link from 'next/link';
import LineIcon from '@/components/LineIcon';
import { CONTACT } from '@/lib/constants';
import { formatPrice, type Product } from '@/lib/products';

const TRUST_POINTS = [
  {
    label: 'ส่งฟรีทั่วประเทศ',
    variant: 'shipping' as const,
    Icon: ShippingIcon,
  },
  {
    label: 'รับประกันคุณภาพ',
    variant: 'warranty' as const,
    Icon: ShieldIcon,
  },
  {
    label: 'มีสินค้าพร้อมส่ง',
    variant: 'stock' as const,
    Icon: StockIcon,
  },
] as const;

const INK_VARIANTS = ['ink-c', 'ink-m', 'ink-y', 'ink-k'] as const;

interface HeroSectionProps {
  products: Product[];
}

export default function HeroSection({ products }: HeroSectionProps) {
  return (
    <section className="hero-section relative overflow-hidden border-b border-border">
      <div className="cmyk-strip relative z-10" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="hero-section-mesh" aria-hidden="true" />
      <div className="hero-section-glow" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:px-8 lg:py-24">
        <div className="hero-content">
          <div className="hero-animate hero-animate-1 hero-eyebrow inline-flex items-center gap-2 rounded-full border border-accent-200/80 bg-card/90 px-3 py-1">
            <span className="hero-eyebrow-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="spec-label !text-accent-700">หมึกและอุปกรณ์สำนักงาน</span>
          </div>

          <h1 className="font-heading mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            <span className="hero-animate hero-animate-2 hero-headline-accent inline-block text-accent">
              หมึกตรงรุ่น
            </span>
            <br />
            <span className="hero-animate hero-animate-3 inline-block text-navy-800">
              สั่งง่าย ส่งไว
            </span>
          </h1>

          <p className="hero-animate hero-animate-4 mt-5 max-w-lg text-base leading-relaxed text-secondary sm:text-lg">
            ช่วย SME หาหมึกและอุปกรณ์ที่ตรงกับเครื่องพิมพ์ของคุณ
            สต็อกพร้อมส่ง ส่งฟรีเมื่อสั่งครบ 1,000 บาท
          </p>

          <div className="hero-animate hero-animate-5 mt-8 flex flex-wrap gap-3">
            <Link href="#catalog" className="btn btn-primary px-6 shadow-sm hover:shadow-md">
              ดูแคตตาล็อก
            </Link>
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line-solid shrink-0 px-6 shadow-sm hover:shadow-md"
            >
              <LineIcon className="h-5 w-5 shrink-0" />
              สั่งซื้อ LINE
            </a>
          </div>

          <ul className="hero-trust-list mt-8 flex flex-wrap gap-2.5 sm:gap-3">
            {TRUST_POINTS.map((point, index) => (
              <li
                key={point.label}
                className={`hero-animate hero-trust-item hero-trust-item-${index + 1}`}
              >
                <span className={`hero-trust-chip hero-trust-chip--${point.variant}`}>
                  <span className={`hero-trust-chip__icon hero-trust-chip__icon--${point.variant}`}>
                    <point.Icon className="h-4 w-4" />
                  </span>
                  <span className="hero-trust-chip__label">{point.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {products.length > 0 && (
          <div className="hero-bento-frame hero-animate hero-animate-3">
            <div className="hero-bento grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
              {products.map((product, index) => (
                <HeroProductCard
                  key={product.id}
                  product={product}
                  featured={index === 0}
                  index={index}
                  inkVariant={INK_VARIANTS[index] ?? 'ink-k'}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function HeroProductCard({
  product,
  featured,
  index,
  inkVariant,
}: {
  product: Product;
  featured: boolean;
  index: number;
  inkVariant: (typeof INK_VARIANTS)[number];
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`hero-product-card hero-product-card--${inkVariant} hero-bento-item hero-bento-item-${index + 1} group relative cursor-pointer overflow-hidden rounded-2xl border bg-card transition duration-200 hover:-translate-y-1 ${
        featured ? 'hero-product-card--featured col-span-1 row-span-2 min-h-[280px] sm:min-h-[320px]' : 'aspect-square'
      }`}
      style={{ borderColor: 'var(--hero-ink-border, var(--color-border))' }}
    >
      {featured && (
        <div className="hero-product-card__strip" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      )}

      <div
        className={`hero-product-card__wash absolute inset-0 transition duration-300 group-hover:opacity-100 ${
          featured ? 'opacity-100' : 'opacity-90'
        }`}
        aria-hidden="true"
      />

      <div className={`relative flex h-full flex-col ${featured ? 'p-5 sm:p-6' : 'p-4'}`}>
        <div className={`relative flex-1 ${featured ? 'min-h-[160px] sm:min-h-[200px]' : ''}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={featured ? '(max-width: 1024px) 50vw, 30vw' : '(max-width: 1024px) 25vw, 15vw'}
            className="object-contain p-2 transition duration-300 group-hover:scale-[1.04]"
            priority={featured}
          />
        </div>

        <div className="relative mt-auto space-y-1 pt-3">
          <p
            className={`font-medium leading-snug text-ink transition duration-200 group-hover:text-accent-800 ${
              featured ? 'text-sm sm:text-base' : 'line-clamp-2 text-xs sm:text-sm'
            }`}
          >
            {product.name}
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-md bg-card/90 px-2 py-0.5 text-[10px] font-medium text-graphite shadow-xs sm:text-xs">
              {product.brand}
            </span>
            <span className="text-sm font-semibold tabular-nums text-accent sm:text-base">
              ฿{formatPrice(product.price)}
            </span>
          </div>
        </div>

        {product.inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-on-primary shadow-sm sm:text-xs">
            พร้อมส่ง
          </span>
        )}
      </div>
    </Link>
  );
}

function ShippingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m8 0a2 2 0 104 0" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function StockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
