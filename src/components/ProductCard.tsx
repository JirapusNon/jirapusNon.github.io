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
  layout = 'grid',
}: {
  product: Product;
  featured?: boolean;
  layout?: 'grid' | 'list';
}) {
  const typeBadge = getTypeBadge(product.type);
  const stockBadge = getStockBadge(product.inStock);
  const lineMessage = encodeURIComponent(
    `สอบถามสินค้า: ${product.name} (รหัส ${product.id})`
  );

  // `list` renders a horizontal card (image left, details right) on mobile for
  // readability, then reflows to the standard vertical card at >=640px.
  const isList = layout === 'list';

  return (
    <article
      className={`product-card group flex overflow-hidden ${
        isList ? 'flex-row sm:flex-col' : 'flex-col'
      }${featured ? ' product-card--featured' : ''}`}
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
        className={`product-card__media relative block cursor-pointer bg-muted ${
          isList
            ? 'w-28 shrink-0 self-stretch p-3 sm:aspect-square sm:w-full sm:self-auto sm:p-5'
            : 'aspect-square w-full p-5'
        }`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={
            isList
              ? '(max-width: 640px) 112px, (max-width: 1024px) 33vw, 25vw'
              : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
          }
          className="product-card__image object-contain p-2"
        />
        <div
          className={`absolute left-2 top-2 flex-col gap-1 sm:left-3 sm:top-3 sm:flex ${
            isList ? 'hidden' : 'flex'
          }`}
        >
          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium tracking-wide sm:px-2 ${typeBadge.bg} ${typeBadge.text}`}
          >
            {typeBadge.label}
          </span>
          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium tracking-wide sm:px-2 ${stockBadge.bg} ${stockBadge.text}`}
          >
            {stockBadge.label}
          </span>
        </div>
      </Link>

      <div
        className={`product-card__body flex flex-1 flex-col p-3 sm:p-4 ${
          isList
            ? 'border-l border-border-subtle sm:border-l-0 sm:border-t'
            : 'border-t border-border-subtle'
        }`}
      >
        {isList && (
          <div className="mb-1.5 flex flex-wrap gap-1 sm:hidden">
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium tracking-wide ${typeBadge.bg} ${typeBadge.text}`}
            >
              {typeBadge.label}
            </span>
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium tracking-wide ${stockBadge.bg} ${stockBadge.text}`}
            >
              {stockBadge.label}
            </span>
          </div>
        )}

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
          <LineIcon className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
          สอบถาม / สั่งซื้อ
        </a>
      </div>
    </article>
  );
}
