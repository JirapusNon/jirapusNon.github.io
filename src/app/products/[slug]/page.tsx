import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { CONTACT } from "@/lib/constants";
import { formatPrice, getBySlug, getRelated, products } from "@/lib/products";
import { getBrandTheme, getStockBadge, getTypeBadge } from "@/lib/theme";

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
  const brandTheme = getBrandTheme(product.brand);
  const typeBadge = getTypeBadge(product.type);
  const stockBadge = getStockBadge(product.inStock);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link href="/" className="cursor-pointer transition duration-200 hover:text-accent">หน้าแรก</Link>
        <span className="mx-1.5">/</span>
        <Link href="/products" className="cursor-pointer transition duration-200 hover:text-accent">สินค้าทั้งหมด</Link>
        <span className="mx-1.5">/</span>
        <span className="text-secondary">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/50 p-6 shadow-sm">
            <div className={`absolute inset-x-0 top-0 h-1 ${brandTheme.accentBar}`} aria-hidden="true" />
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
                className="relative aspect-square overflow-hidden rounded-lg bg-muted/50 shadow-xs"
              >
                <Image src={product.image} alt={`${product.name} - ${printer}`} fill sizes="120px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-muted-foreground">{product.brand}</span>
          <h1 className="font-heading mt-1 text-2xl font-bold text-primary">{product.name}</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${typeBadge.bg} ${typeBadge.text}`}>
              {typeBadge.label}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${stockBadge.bg} ${stockBadge.text}`}>
              {stockBadge.label}
            </span>
            <span className="rounded-full bg-primary/85 px-3 py-1 text-xs font-semibold text-on-primary">
              {product.brand}
            </span>
          </div>

          <p className="mt-4 text-3xl font-bold text-accent">฿{formatPrice(product.price)}</p>

          <p className="mt-4 text-sm leading-relaxed text-secondary">{product.description}</p>

          <dl className="mt-6 divide-y divide-border-subtle rounded-xl bg-muted/30 shadow-xs">
            <SpecRow label="สี" value={product.color} />
            {product.volumeMl != null && <SpecRow label="ปริมาณหมึก" value={`${product.volumeMl} มล.`} />}
            <SpecRow label="รหัสสินค้า" value={product.id} />
            <SpecRow label="รองรับเครื่องพิมพ์" value={product.compatiblePrinters.join(", ")} />
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`${CONTACT.lineUrl}?text=${lineMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex cursor-pointer items-center gap-2 rounded-full bg-line px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-line-hover"
            >
              สอบถาม/สั่งซื้อผ่าน LINE
            </a>
            <a
              href={CONTACT.phoneHref}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-secondary transition duration-200 hover:border-accent-400 hover:text-accent"
            >
              โทร {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-lg font-bold text-primary">สินค้าที่เกี่ยวข้อง</h2>
          <div className="mt-4">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 px-4 py-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-secondary">{value}</dd>
    </div>
  );
}
