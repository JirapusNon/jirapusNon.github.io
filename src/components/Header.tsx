'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LineIcon from './LineIcon';
import SearchBar from './SearchBar';
import { CONTACT, SITE_NAME } from '@/lib/constants';

const NAV_LINKS = [
  { href: '/products', label: 'สินค้า' },
  { href: '/#brands', label: 'หมวดหมู่' },
  { href: '/#about', label: 'เกี่ยวกับเรา' },
  { href: '/#contact', label: 'ติดต่อ' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.key === 'Escape') setPaletteOpen(false);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center border border-paper/20 text-sm font-bold text-paper">
            R
          </span>
          <span className="font-heading text-base font-semibold tracking-tight text-paper sm:text-lg">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cursor-pointer text-sm text-paper/80 underline-offset-4 transition duration-200 hover:text-paper hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-1 justify-center px-4 md:flex">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="flex w-full max-w-md cursor-pointer items-center gap-2 border border-paper/15 bg-paper/5 px-4 py-2 text-left text-sm text-paper/60 transition duration-200 hover:border-paper/30 hover:bg-paper/10"
          >
            <svg
              className="h-4 w-4 shrink-0"
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
            <span className="flex-1">ค้นหารุ่นเครื่องพิมพ์...</span>
            <kbd className="border border-paper/20 px-1.5 py-0.5 text-[10px] text-paper/50">
              Ctrl K
            </kbd>
          </button>
        </div>

        <a
          href={CONTACT.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 cursor-pointer items-center gap-2 bg-line px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-line-hover sm:flex"
        >
          <LineIcon className="h-5 w-5 shrink-0" />
          สั่งซื้อ LINE
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="ml-auto flex h-9 w-9 cursor-pointer items-center justify-center border border-paper/15 lg:hidden"
          aria-label="เปิดเมนู"
        >
          <svg
            className="h-5 w-5 text-paper"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div className="cmyk-strip" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      {menuOpen && (
        <div className="border-t border-paper/10 px-4 py-4 lg:hidden">
          <div className="mb-4">
            <SearchBar variant="dark" />
          </div>
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer text-sm text-paper/80"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex cursor-pointer items-center justify-center gap-2 bg-line px-4 py-2 text-sm font-medium text-white"
            >
              <LineIcon className="h-5 w-5 shrink-0" />
              สั่งซื้อ LINE
            </a>
          </nav>
        </div>
      )}

      {paletteOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/60 px-4 pt-24"
          onClick={() => setPaletteOpen(false)}
        >
          <div
            className="w-full max-w-xl border border-rule bg-card p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <CommandPaletteForm
              onNavigate={(q) => {
                setPaletteOpen(false);
                router.push(
                  q ? `/products?q=${encodeURIComponent(q)}` : '/products'
                );
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}

function CommandPaletteForm({
  onNavigate,
}: {
  onNavigate: (q: string) => void;
}) {
  const [value, setValue] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNavigate(value.trim());
      }}
    >
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="พิมพ์ชื่อสินค้า ยี่ห้อ หรือรุ่นเครื่องพิมพ์..."
        className="w-full border-b border-rule pb-3 text-lg outline-none placeholder:text-navy-300 focus:border-accent"
      />
      <p className="mt-3 text-xs text-muted-foreground">
        กด Enter เพื่อค้นหา หรือ Esc เพื่อปิด
      </p>
    </form>
  );
}
