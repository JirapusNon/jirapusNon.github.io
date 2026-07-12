'use client';

import { useEffect, useRef, useState } from 'react';
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
  actionMenu = false,
}: {
  product: Product;
  featured?: boolean;
  layout?: 'grid' | 'list';
  /** When true, the whole card is a trigger that opens a choice menu
   * (view detail / inquire) instead of showing an inline LINE button. */
  actionMenu?: boolean;
}) {
  const typeBadge = getTypeBadge(product.type);
  const stockBadge = getStockBadge(product.inStock);
  const lineMessage = encodeURIComponent(
    `สอบถามสินค้า: ${product.name} (รหัส ${product.id})`
  );
  const detailHref = `/products/${product.slug}`;
  const lineHref = `${CONTACT.lineUrl}?text=${lineMessage}`;

  // `list` renders a horizontal card (image left, details right) on mobile for
  // readability, then reflows to the standard vertical card at >=640px.
  const isList = layout === 'list';

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstActionRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    firstActionRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const mediaClass = `product-card__media relative block cursor-pointer ${
    actionMenu ? 'product-card__media--soft' : 'bg-muted'
  } ${
    isList
      ? 'w-28 shrink-0 self-stretch p-3 sm:aspect-square sm:w-full sm:self-auto sm:p-5'
      : 'aspect-square w-full p-5'
  }`;

  const imageEl = (
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
  );

  const badgeOverlay = (
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
  );

  const badgeInline = isList && (
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
  );

  // ── Default card: card links to detail, inline LINE button (used by carousel) ──
  if (!actionMenu) {
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

        <Link href={detailHref} className={mediaClass}>
          {imageEl}
          {badgeOverlay}
        </Link>

        <div
          className={`product-card__body flex flex-1 flex-col p-3 sm:p-4 ${
            isList
              ? 'border-l border-border-subtle sm:border-l-0 sm:border-t'
              : 'border-t border-border-subtle'
          }`}
        >
          {badgeInline}
          <Link href={detailHref} className="flex flex-1 cursor-pointer flex-col gap-1">
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
            href={lineHref}
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

  // ── Action-menu card: whole card is a trigger; click opens a choice menu ──
  return (
    <article
      ref={rootRef}
      className={`product-card group relative flex overflow-hidden ${
        isList ? 'flex-row sm:flex-col' : 'flex-col'
      }`}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`ตัวเลือกสำหรับ ${product.name}`}
        className={`flex w-full cursor-pointer text-left ${
          isList ? 'flex-row sm:flex-col' : 'flex-col'
        }`}
      >
        <span className={mediaClass}>
          {imageEl}
          {badgeOverlay}
        </span>

        <span
          className={`product-card__body flex flex-1 flex-col p-3 sm:p-4 ${
            isList
              ? 'border-l border-border-subtle sm:border-l-0 sm:border-t'
              : 'border-t border-border-subtle'
          }`}
        >
          {badgeInline}
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-graphite">
            {product.brand}
          </span>
          <h3 className="product-card__title mt-0.5 line-clamp-2 text-sm font-semibold text-ink sm:text-base">
            {product.name}
          </h3>
          <p
            className={`mt-1 text-xs leading-relaxed text-graphite ${
              isList ? 'line-clamp-3 sm:line-clamp-2' : 'line-clamp-2'
            }`}
          >
            {product.description}
          </p>

          <span className="product-card__price-row mt-auto flex items-center justify-between gap-2 pt-3">
            <span className="product-card__price font-heading text-base font-bold text-accent sm:text-lg">
              ฿{formatPrice(product.price)}
            </span>
            <span className="product-card__cart" aria-hidden="true">
              <CartIcon className="h-4 w-4" />
            </span>
          </span>
        </span>
      </button>

      {open && (
        <div className="product-card__menu" role="menu" aria-label={product.name}>
          <button
            type="button"
            className="product-card__menu-close"
            aria-label="ปิดตัวเลือก"
            onClick={() => setOpen(false)}
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          <div className="product-card__menu-panel">
            <a
              ref={firstActionRef}
              href={lineHref}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="pcm-action pcm-action--line"
              onClick={() => setOpen(false)}
            >
              <LineIcon className="h-4 w-4 shrink-0" />
              สอบถาม / สั่งซื้อ
            </a>
            <Link
              href={detailHref}
              role="menuitem"
              className="pcm-action pcm-action--detail"
              onClick={() => setOpen(false)}
            >
              <DetailIcon className="h-4 w-4 shrink-0" />
              ดูรายละเอียดสินค้า
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}

function CartIcon({ className }: Readonly<{ className?: string }>) {
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
        strokeWidth={1.8}
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
}

function CloseIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function DetailIcon({ className }: Readonly<{ className?: string }>) {
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
        strokeWidth={1.8}
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
