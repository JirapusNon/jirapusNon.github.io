import { Printer, Phone, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';
import LineIcon from '@/components/LineIcon';
import ProductGrid from '@/components/ProductGrid';
import { BUSINESS, CONTACT } from '@/lib/constants';
import { formatPrice, getBySlug, getRelated, products } from '@/lib/products';
import { getBrandTheme, getStockBadge, getTypeBadge } from '@/lib/theme';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) return { title: 'ไม่พบสินค้า' };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: Readonly<ProductPageProps>) {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) notFound();

  const related = getRelated(product);
  const lineMessage = encodeURIComponent(
    `สอบถามสินค้า: ${product.name} (รหัส ${product.id})`
  );
  const typeBadge = getTypeBadge(product.type);
  const stockBadge = getStockBadge(product.inStock);
  const brandTheme = getBrandTheme(product.brand);
  const sku = `RNK-${product.id.padStart(3, '0')}`;

  return (
    <div className="detail-page-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="detail-toolbar-bar mb-6">
          <BackButton fallbackHref="/products" variant="navy" compact />
          <span className="detail-toolbar__divider" aria-hidden="true" />
          <nav className="min-w-0 truncate text-xs sm:text-sm">
            <Link
              href="/"
              className="cursor-pointer text-graphite underline-offset-2 hover:text-accent hover:underline"
            >
              หน้าแรก
            </Link>
            <span className="mx-2 text-graphite/50">/</span>
            <Link
              href="/products"
              className="cursor-pointer text-graphite underline-offset-2 hover:text-accent hover:underline"
            >
              แคตตาล็อกสินค้า
            </Link>
            <span className="mx-2 text-graphite/50">/</span>
            <span className="font-medium text-ink">{product.name}</span>
          </nav>
        </div>

        <div className="detail-card">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="detail-image-frame group relative aspect-square w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-medium tracking-wide shadow-xs ${typeBadge.bg} ${typeBadge.text}`}
                  >
                    {typeBadge.label}
                  </span>
                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-medium tracking-wide shadow-xs ${stockBadge.bg} ${stockBadge.text}`}
                  >
                    {stockBadge.label}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-graphite">
                {product.brand}
              </p>
              <h1 className="font-heading mt-2 text-2xl font-semibold text-ink sm:text-3xl">
                {product.name}
              </h1>

              {product.type === 'หมึกแท้' && (
                <span className="authenticity-badge mt-3">
                  <ShieldCheck
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="authenticity-badge__label">
                    ของแท้ 100% รับประกันจากศูนย์
                  </span>
                </span>
              )}

              <p className="mt-5 font-mono text-3xl font-semibold tabular-nums text-accent">
                ฿{formatPrice(product.price)}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-graphite">
                {product.description}
              </p>

              <dl className="mt-8 overflow-hidden rounded-xl border border-border">
                <SpecRow label="สี" value={product.color} mono />
                {product.volumeMl != null && (
                  <SpecRow
                    label="ปริมาณหมึก"
                    value={`${product.volumeMl} มล.`}
                    mono
                  />
                )}
                <SpecRow label="รหัสสินค้า" value={sku} mono highlight />
                <SpecRow label="ยี่ห้อ" value={product.brand} mono />
              </dl>

              <div className="mt-6">
                <p className="spec-label mb-2">รองรับเครื่องพิมพ์</p>
                <ul className="flex flex-wrap gap-2">
                  {product.compatiblePrinters.map((printer) => (
                    <li key={printer} className="printer-chip">
                      <span
                        className={`printer-chip__icon ${brandTheme.iconBg} ${brandTheme.iconText}`}
                      >
                        <Printer
                          className="h-3 w-3 shrink-0"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="font-mono">{printer}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`${CONTACT.lineUrl}?text=${lineMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line-solid shadow-sm hover:shadow-md"
                >
                  <LineIcon className="h-4 w-4 shrink-0" />
                  สอบถาม / สั่งซื้อ
                </a>
                <a href={CONTACT.phoneHref} className="btn btn-secondary">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  โทร {CONTACT.phone}
                </a>
              </div>

              <p className="mt-4 text-xs text-graphite">
                จัดส่งทั่วไทย · ออกใบกำกับภาษี · {BUSINESS.responseTime}
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="related-showcase mt-8">
            <div className="hero-section-mesh" aria-hidden="true" />
            <div className="hero-section-glow" aria-hidden="true" />
            <div className="relative z-10">
              <p className="spec-label">สินค้าที่เกี่ยวข้อง</p>
              <h2 className="font-heading mt-2 text-xl font-semibold text-ink">
                ใช้กับเครื่องพิมพ์รุ่นเดียวกัน
              </h2>
              <div className="mt-6">
                <ProductGrid products={related} />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SpecRow({
  label,
  value,
  highlight = false,
  mono = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-border-subtle bg-card px-4 py-3 text-sm last:border-b-0">
      <dt className="text-graphite">{label}</dt>
      <dd
        className={`text-right font-medium ${mono ? 'font-mono' : ''} ${highlight ? 'text-ink' : 'text-secondary'
          }`}
      >
        {value}
      </dd>
    </div>
  );
}
