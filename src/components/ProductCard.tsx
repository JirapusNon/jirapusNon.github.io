import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import LineIcon from '@/components/LineIcon';
import { CONTACT } from '@/lib/constants';
import { getStockBadge, getTypeBadge } from '@/lib/theme';

export default function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  const typeBadge = getTypeBadge(product.type);
  const stockBadge = getStockBadge(product.inStock);
  const lineMessage = encodeURIComponent(
    `สอบถามสินค้า: ${product.name} (รหัส ${product.id})`
  );

  return (
    <article
      className={`product-card group flex flex-col overflow-hidden${
        featured ? ' product-card--featured' : ''
      }`}
    >
      {featured && (
        <div className="cmyk-strip cmyk-strip-thin" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      )}

      <Link
        href={`/products/${product.slug}`}
        className="product-card__media relative block aspect-square w-full cursor-pointer bg-muted p-5"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="product-card__image object-contain p-2"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          <span
            className={`rounded-md px-2 py-0.5 text-[10px] font-medium tracking-wide ${typeBadge.bg} ${typeBadge.text}`}
          >
            {typeBadge.label}
          </span>
          <span
            className={`rounded-md px-2 py-0.5 text-[10px] font-medium tracking-wide ${stockBadge.bg} ${stockBadge.text}`}
          >
            {stockBadge.label}
          </span>
        </div>
      </Link>

      <div className="product-card__body flex flex-1 flex-col border-t border-border-subtle p-4">
        <Link
          href={`/products/${product.slug}`}
          className="flex flex-1 cursor-pointer flex-col gap-1"
        >
          <h3 className="product-card__title line-clamp-2 text-sm font-medium text-ink sm:text-base">
            {product.name}
          </h3>
          <p className="line-clamp-1 text-xs text-graphite">
            รองรับ: {product.compatiblePrinters.slice(0, 2).join(', ')}
            {product.compatiblePrinters.length > 2 ? ' ฯลฯ' : ''}
          </p>
          <span className="product-card__price mt-2 font-heading text-base font-semibold text-accent sm:text-lg">
            ฿{formatPrice(product.price)}
          </span>
        </Link>

        <a
          href={`${CONTACT.lineUrl}?text=${lineMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-line-solid mt-3 w-full py-2.5"
        >
          <LineIcon className="h-4 w-4 shrink-0" />
          สอบถาม / สั่งซื้อ
        </a>
      </div>
    </article>
  );
}
