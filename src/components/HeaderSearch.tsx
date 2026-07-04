'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  brands,
  formatPrice,
  products,
  searchProducts,
  type Brand,
} from '@/lib/products';

const QUICK_BRANDS: Brand[] = ['HP', 'Canon', 'Epson', 'Brother'];

interface HeaderSearchProps {
  mode?: 'trigger' | 'inline';
  surface?: 'light' | 'dark';
  onNavigate?: () => void;
}

export default function HeaderSearch({
  mode = 'trigger',
  surface = 'light',
  onNavigate,
}: HeaderSearchProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const titleId = useId();

  useEffect(() => {
    if (mode !== 'trigger') return;

    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    }

    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [mode]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function navigate(q: string) {
    setOpen(false);
    onNavigate?.();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  }

  if (mode === 'inline') {
    return <InlineSearch surface={surface} onSubmit={navigate} />;
  }

  return (
    <>
      <SearchTrigger surface={surface} onClick={() => setOpen(true)} />

      {open && (
        <SearchPalette
          titleId={titleId}
          onClose={() => setOpen(false)}
          onNavigate={navigate}
        />
      )}
    </>
  );
}

function SearchTrigger({
  surface,
  onClick,
}: {
  surface: 'light' | 'dark';
  onClick: () => void;
}) {
  const isLight = surface === 'light';

  return (
    <div className="header-search group relative w-full">
      <button
        type="button"
        onClick={onClick}
        className={`header-search-trigger flex w-full cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-2 text-left text-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 ${
          isLight
            ? 'border-border bg-muted/60 text-graphite shadow-xs hover:border-accent-200 hover:bg-accent-50/80 hover:text-secondary focus-visible:ring-accent/25'
            : 'border-on-primary/12 bg-on-primary/[0.06] text-on-primary/55 hover:border-on-primary/20 hover:bg-on-primary/10 hover:text-on-primary/75 focus-visible:ring-accent-300/40'
        }`}
      >
        <SearchIcon
          className={`h-4 w-4 shrink-0 transition duration-200 ${
            isLight
              ? 'text-graphite group-hover:text-accent'
              : 'text-on-primary/40 group-hover:text-on-primary/60'
          }`}
        />
        <span className="min-w-0 flex-1 truncate">
          ค้นหารุ่นเครื่องพิมพ์ หรือรหัสหมึก...
        </span>
        <kbd
          className={`hidden shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] tracking-wide sm:inline ${
            isLight
              ? 'border-border bg-card text-graphite'
              : 'border-on-primary/15 bg-on-primary/8 text-on-primary/40'
          }`}
        >
          ⌘K
        </kbd>
      </button>
      <div
        className="cmyk-strip cmyk-strip-thin pointer-events-none absolute inset-x-0 bottom-0 rounded-b-lg opacity-40 transition duration-200 group-hover:opacity-80 group-focus-within:opacity-100"
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function InlineSearch({
  surface,
  onSubmit,
}: {
  surface: 'light' | 'dark';
  onSubmit: (q: string) => void;
}) {
  const [value, setValue] = useState('');
  const isLight = surface === 'light';

  return (
    <div className="header-search group relative w-full">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(value.trim());
        }}
        className={`flex items-center gap-2 rounded-lg border p-1.5 pl-3 transition duration-200 ${
          isLight
            ? 'border-border bg-muted/60 shadow-xs focus-within:border-accent-200 focus-within:bg-accent-50/50'
            : 'border-on-primary/12 bg-on-primary/[0.06] focus-within:border-on-primary/25 focus-within:bg-on-primary/10'
        }`}
      >
        <SearchIcon
          className={`h-4 w-4 shrink-0 ${isLight ? 'text-graphite' : 'text-on-primary/40'}`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="รุ่นเครื่องพิมพ์ หรือรหัสหมึก..."
          aria-label="ค้นหาสินค้า"
          className={`min-w-0 flex-1 bg-transparent py-1.5 text-sm outline-none ${
            isLight
              ? 'text-ink placeholder:text-navy-300'
              : 'text-on-primary placeholder:text-on-primary/35'
          }`}
        />
        <button type="submit" className="btn btn-accent shrink-0 px-3.5 py-1.5 text-sm">
          ค้นหา
        </button>
      </form>
      <div
        className="cmyk-strip cmyk-strip-thin pointer-events-none absolute inset-x-0 bottom-0 rounded-b-lg opacity-50"
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function SearchPalette({
  titleId,
  onClose,
  onNavigate,
}: {
  titleId: string;
  onClose: () => void;
  onNavigate: (q: string) => void;
}) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!value.trim()) return [];
    return searchProducts(products, value).slice(0, 5);
  }, [value]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[min(18vh,7rem)]">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-primary/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="ปิดการค้นหา"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="search-palette-panel relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-xl"
      >
        <div className="cmyk-strip" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="px-5 pt-4 pb-3">
          <p id={titleId} className="font-heading text-base font-semibold text-ink">
            ค้นหาหมึกตรงรุ่น
          </p>
          <p className="spec-label mt-0.5">Compatible ink finder</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNavigate(value.trim());
          }}
          className="px-5"
        >
          <div className="search-palette-input-wrap flex items-center gap-3 border-b border-border pb-3 transition duration-200 focus-within:border-accent">
            <SearchIcon className="h-5 w-5 shrink-0 text-graphite" />
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="เช่น Epson L360, HP 62, Canon 790..."
              className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-navy-300"
            />
            {value && (
              <button
                type="button"
                onClick={() => setValue('')}
                aria-label="ล้างคำค้นหา"
                className="shrink-0 cursor-pointer rounded p-0.5 text-graphite transition duration-200 hover:text-ink"
              >
                <ClearIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>

        <div className="flex flex-wrap gap-1.5 px-5 pt-3">
          {QUICK_BRANDS.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setValue(brand)}
              className="search-brand-chip cursor-pointer rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-secondary transition duration-200 hover:border-accent-200 hover:bg-accent-50 hover:text-accent"
            >
              {brand}
            </button>
          ))}
          {brands
            .filter((b) => !QUICK_BRANDS.includes(b))
            .slice(0, 2)
            .map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setValue(brand)}
                className="search-brand-chip cursor-pointer rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-secondary transition duration-200 hover:border-accent-200 hover:bg-accent-50 hover:text-accent"
              >
                {brand}
              </button>
            ))}
        </div>

        <div className="mt-3 max-h-64 overflow-y-auto px-2 pb-2">
          {value.trim() && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              ไม่พบสินค้าที่ตรงกับ &ldquo;{value}&rdquo;
              <br />
              <button
                type="button"
                onClick={() => onNavigate(value.trim())}
                className="mt-2 cursor-pointer text-accent underline-offset-2 hover:underline"
              >
                ดูผลลัพธ์ทั้งหมด
              </button>
            </p>
          )}

          {results.length > 0 && (
            <ul className="flex flex-col gap-0.5">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="search-result-item flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition duration-150 hover:bg-muted/70"
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.brand} · {product.type}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold tabular-nums text-accent">
                      ฿{formatPrice(product.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!value.trim() && (
            <p className="px-3 py-5 text-center text-xs text-muted-foreground">
              พิมพ์ชื่อรุ่นเครื่องพิมพ์ ยี่ห้อ หรือรหัสหมึก
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-muted/40 px-5 py-2.5">
          <p className="text-xs text-muted-foreground">
            <kbd className="rounded border border-border bg-card px-1 py-px font-mono text-[10px]">
              Enter
            </kbd>{' '}
            ค้นหา
          </p>
          <p className="text-xs text-muted-foreground">
            <kbd className="rounded border border-border bg-card px-1 py-px font-mono text-[10px]">
              Esc
            </kbd>{' '}
            ปิด
          </p>
        </div>
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
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
        strokeWidth={2}
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
      />
    </svg>
  );
}

function ClearIcon({ className }: { className?: string }) {
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
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
