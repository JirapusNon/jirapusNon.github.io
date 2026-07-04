import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import LineIcon from '@/components/LineIcon';
import { CONTACT } from '@/lib/constants';
import { getBrandTheme, getStockBadge, getTypeBadge } from '@/lib/theme';

export default function ProductCard({ product }: { product: Product }) {
  const brandTheme = getBrandTheme(product.brand);
  const typeBadge = getTypeBadge(product.type);
  const stockBadge = getStockBadge(product.inStock);
  const lineMessage = encodeURIComponent(
    `สอบถามสินค้า: ${product.name} (รหัส ${product.id})`
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className={`h-1 w-full ${brandTheme.accentBar}`} aria-hidden="true" />

      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square w-full cursor-pointer bg-muted/50 p-5"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-2 transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${typeBadge.bg} ${typeBadge.text}`}
          >
            {typeBadge.label}
          </span>
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${stockBadge.bg} ${stockBadge.text}`}
          >
            {stockBadge.label}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-semibold ${brandTheme.iconBg} ${brandTheme.iconText}`}
          >
            {product.brand}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/products/${product.slug}`}
          className="flex flex-1 cursor-pointer flex-col gap-1"
        >
          <h3 className="line-clamp-2 text-sm font-semibold text-primary sm:text-base">
            {product.name}
          </h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            รองรับ: {product.compatiblePrinters.slice(0, 2).join(', ')}
            {product.compatiblePrinters.length > 2 ? ' ฯลฯ' : ''}
          </p>
          <span className="mt-2 text-base font-bold text-primary sm:text-lg">
            ฿{formatPrice(product.price)}
          </span>
        </Link>

        <a
          href={`${CONTACT.lineUrl}?text=${lineMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-line py-2.5 text-sm font-semibold text-white shadow-xs transition duration-200 hover:bg-line-hover hover:shadow-sm"
        >
          <LineIcon className="h-5 w-5 shrink-0" />
          สอบถาม / สั่งซื้อ
        </a>
      </div>
    </article>
  );
}
