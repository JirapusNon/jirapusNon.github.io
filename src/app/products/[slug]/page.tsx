import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { CONTACT } from "@/lib/constants";
import { formatPrice, getBySlug, getRelated, products } from "@/lib/products";
import { getStockBadge, getTypeBadge } from "@/lib/theme";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) return { title: "ไม่พบสินค้า" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) notFound();

  const related = getRelated(product);
  const lineMessage = encodeURIComponent(`สอบถามสินค้า: ${product.name} (รหัส ${product.id})`);
  const typeBadge = getTypeBadge(product.type);
  const stockBadge = getStockBadge(product.inStock);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-xs text-graphite">
        <Link href="/" className="cursor-pointer underline-offset-2 hover:text-accent hover:underline">
          หน้าแรก
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/products" className="cursor-pointer underline-offset-2 hover:text-accent hover:underline">
          แคตตาล็อกสินค้า
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted/30 p-6 shadow-xs">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-contain p-4"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.compatiblePrinters.slice(0, 4).map((printer) => (
              <div
                key={printer}
                className="relative aspect-square overflow-hidden rounded-lg border border-border-subtle bg-muted/30"
              >
                <Image src={product.image} alt={`${product.name} - ${printer}`} fill sizes="120px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="spec-label">{product.id}</span>
          <p className="mt-1 text-sm text-graphite">{product.brand}</p>
          <h1 className="font-heading mt-2 text-2xl font-semibold text-ink sm:text-3xl">{product.name}</h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`rounded-md px-2.5 py-1 text-xs font-medium tracking-wide ${typeBadge.bg} ${typeBadge.text}`}>
              {typeBadge.label}
            </span>
            <span className={`rounded-md px-2.5 py-1 text-xs font-medium tracking-wide ${stockBadge.bg} ${stockBadge.text}`}>
              {stockBadge.label}
            </span>
          </div>

          <p className="mt-6 font-heading text-3xl font-semibold text-ink">฿{formatPrice(product.price)}</p>

          <p className="mt-4 text-sm leading-relaxed text-graphite">{product.description}</p>

          <dl className="mt-8 overflow-hidden rounded-xl border border-border">
            <SpecRow label="สี" value={product.color} />
            {product.volumeMl != null && <SpecRow label="ปริมาณหมึก" value={`${product.volumeMl} มล.`} />}
            <SpecRow label="รหัสสินค้า" value={product.id} highlight />
            <SpecRow label="ยี่ห้อ" value={product.brand} />
          </dl>

          <div className="mt-6">
            <p className="spec-label mb-2">รองรับเครื่องพิมพ์</p>
            <ul className="flex flex-wrap gap-2">
              {product.compatiblePrinters.map((printer) => (
                <li
                  key={printer}
                  className="rounded-md border border-border bg-muted/30 px-2.5 py-1 text-xs text-secondary"
                >
                  {printer}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`${CONTACT.lineUrl}?text=${lineMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line-solid"
            >
              สอบถามราคา/สต็อก
            </a>
            <a href={CONTACT.phoneHref} className="btn btn-secondary">
              โทร {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="catalog-section mt-4">
          <p className="spec-label">สินค้าที่เกี่ยวข้อง</p>
          <h2 className="font-heading mt-2 text-xl font-semibold text-ink">
            ใช้กับเครื่องพิมพ์รุ่นเดียวกัน
          </h2>
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}

function SpecRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-border-subtle px-4 py-3 text-sm last:border-b-0">
      <dt className="text-graphite">{label}</dt>
      <dd className={`text-right font-medium ${highlight ? "font-heading text-ink" : "text-secondary"}`}>
        {value}
      </dd>
    </div>
  );
}
