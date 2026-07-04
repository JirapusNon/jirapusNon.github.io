'use client';

import Link from 'next/link';
import { useState } from 'react';
import HeaderSearch from './HeaderSearch';
import LineIcon from './LineIcon';
import { CONTACT, SITE_NAME } from '@/lib/constants';

const NAV_LINKS = [
  { href: '/products', label: 'สินค้า' },
  { href: '/#brands', label: 'หมวดหมู่' },
  { href: '/#about', label: 'เกี่ยวกับเรา' },
  { href: '/#contact', label: 'ติดต่อ' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-40">
      <div className="site-header-bar">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 lg:px-8">
          <Link href="/" className="site-header-logo group flex shrink-0 items-center gap-2.5">
            <span className="logo-mark flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold">
              R
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="font-heading text-[15px] font-semibold tracking-tight text-on-primary sm:text-base">
                {SITE_NAME.split(' ')[0]}
              </span>
              <span className="mt-0.5 hidden text-[10px] font-medium tracking-wide text-on-primary/55 sm:block">
                หมึกและอุปกรณ์สำนักงาน
              </span>
            </span>
          </Link>

          <nav className="hidden items-center lg:ml-2 lg:flex" aria-label="เมนูหลัก">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="header-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden min-w-0 flex-1 justify-center px-2 md:flex lg:max-w-sm xl:max-w-md">
            <HeaderSearch surface="dark" />
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line-solid hidden shrink-0 sm:flex"
            >
              <LineIcon className="h-5 w-5 shrink-0" />
              สั่งซื้อ LINE
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-on-primary/15 text-on-primary transition duration-200 hover:bg-on-primary/10 lg:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </div>

      <div className="cmyk-strip" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      {menuOpen && (
        <div className="header-mobile-panel px-4 py-4 lg:hidden">
          <div className="mb-4">
            <HeaderSearch
              mode="inline"
              surface="dark"
              onNavigate={() => setMenuOpen(false)}
            />
          </div>
          <nav className="flex flex-col border-t border-on-primary/10 pt-3" aria-label="เมนูมือถือ">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="header-mobile-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={CONTACT.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line-solid mt-4 w-full"
          >
            <LineIcon className="h-5 w-5 shrink-0" />
            สั่งซื้อ LINE
          </a>
        </div>
      )}
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      {open ? (
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
  );
}
