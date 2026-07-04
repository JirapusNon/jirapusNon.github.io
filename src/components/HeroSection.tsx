import Image from 'next/image';
import Link from 'next/link';
import LineIcon from '@/components/LineIcon';
import { CONTACT } from '@/lib/constants';
import { formatPrice, type Product } from '@/lib/products';

const TRUST_POINTS = [
  'ส่งฟรีทั่วประเทศ',
  'รับประกันคุณภาพ',
  'มีสินค้าพร้อมส่ง',
] as const;

interface HeroSectionProps {
  products: Product[];
}

export default function HeroSection({ products }: HeroSectionProps) {
  return (
    <section className="hero-section relative overflow-hidden border-b border-border">
      <div className="hero-section-glow" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:px-8 lg:py-24">
        <div className="hero-content">
          <div className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50/80 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="spec-label !text-accent-700">หมึกและอุปกรณ์สำนักงาน</span>
          </div>

          <h1 className="font-heading mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            <span className="text-accent">หมึกตรงรุ่น</span>
            <br />
            สั่งง่าย ส่งไว
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-secondary sm:text-lg">
            ช่วย SME หาหมึกและอุปกรณ์ที่ตรงกับเครื่องพิมพ์ของคุณ
            สต็อกพร้อมส่ง ส่งฟรีเมื่อสั่งครบ 1,000 บาท
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#catalog" className="btn btn-primary px-6">
              ดูแคตตาล็อก
            </Link>
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line-solid shrink-0 px-6"
            >
              <LineIcon className="h-5 w-5 shrink-0" />
              สั่งซื้อ LINE
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2 sm:gap-3">
            {TRUST_POINTS.map((point) => (
              <li key={point}>
                <span className="hero-trust-chip inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-secondary shadow-xs backdrop-blur-sm sm:text-sm">
                  <CheckIcon className="h-3.5 w-3.5 shrink-0 text-accent" />
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {products.length > 0 && (
          <div className="hero-bento grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
            {products.map((product, index) => (
              <HeroProductCard
                key={product.id}
                product={product}
                featured={index === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function HeroProductCard({
  product,
  featured,
}: {
  product: Product;
  featured: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`hero-product-card group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-200 hover:border-accent-200 hover:shadow-md ${
        featured ? 'col-span-1 row-span-2 min-h-[280px] sm:min-h-[320px]' : 'aspect-square'
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br from-muted/40 via-card to-accent-50/30 transition duration-300 group-hover:from-accent-50/40 ${
          featured ? 'opacity-100' : 'opacity-80'
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
            className="object-contain p-2 transition duration-300 group-hover:scale-[1.03]"
            priority={featured}
          />
        </div>

        <div className="relative mt-auto space-y-1 pt-3">
          <p
            className={`font-medium leading-snug text-ink ${
              featured ? 'text-sm sm:text-base' : 'line-clamp-2 text-xs sm:text-sm'
            }`}
          >
            {product.name}
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-md bg-muted/80 px-2 py-0.5 text-[10px] font-medium text-graphite sm:text-xs">
              {product.brand}
            </span>
            <span className="text-sm font-semibold tabular-nums text-accent sm:text-base">
              ฿{formatPrice(product.price)}
            </span>
          </div>
        </div>

        {product.inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-accent-50 px-2 py-0.5 text-[10px] font-medium text-accent-800 ring-1 ring-accent-200 sm:text-xs">
            พร้อมส่ง
          </span>
        )}
      </div>
    </Link>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
