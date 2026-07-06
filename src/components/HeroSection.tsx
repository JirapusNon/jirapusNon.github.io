'use client';

import LineIcon from '@/components/LineIcon';
import { CONTACT } from '@/lib/constants';

const TRUST_POINTS = [
  {
    label: 'ส่งฟรีทั่วประเทศ',
    variant: 'shipping' as const,
    Icon: ShippingIcon,
  },
  {
    label: 'รับประกันคุณภาพ',
    variant: 'warranty' as const,
    Icon: ShieldIcon,
  },
  {
    label: 'มีสินค้าพร้อมส่ง',
    variant: 'stock' as const,
    Icon: StockIcon,
  },
  {
    label: 'ออกใบกำกับภาษี',
    variant: 'invoice' as const,
    Icon: InvoiceIcon,
  },
] as const;

function scrollToCatalog(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  document
    .getElementById('catalog')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (globalThis.location.hash !== '#catalog') {
    globalThis.history.pushState(null, '', '#catalog');
  }
}

export default function HeroSection() {
  return (
    <section className="hero-section hero-section--overlap relative overflow-hidden border-b border-border">
      <div className="hero-section-mesh" aria-hidden="true" />
      <div className="hero-section-glow" aria-hidden="true" />

      <div className="hero-shapes hidden xl:block" aria-hidden="true">
        <span className="hero-shape hero-shape--hexagon" />
        <span className="hero-shape hero-shape--pentagon-a" />
        <span className="hero-shape hero-shape--pentagon-b" />
        <span className="hero-shape hero-shape--triangle" />
        <span className="hero-shape hero-shape--circle hero-shape--circle-a" />
        <span className="hero-shape hero-shape--circle hero-shape--circle-b" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="hero-content max-w-2xl">
          <h1 className="font-heading mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            <span className="hero-animate hero-animate-2 hero-headline-accent inline-block text-accent-600">
              จำหน่ายหมึกพิมพ์
            </span>
            <br />
            <span className="hero-animate hero-animate-3 inline-block text-navy-800">
              ทุกรุ่น ทุกยี่ห้อ ครบวงจร
            </span>
          </h1>

          <p className="hero-animate hero-animate-4 mt-5 max-w-lg text-base leading-relaxed text-secondary sm:text-lg">
            บริษัท อาร์ เอ็น เค โปรดักส์ จำกัด ผู้แทนจำหน่ายหมึกพิมพ์
            หมึกแท้และหมึกรีเมนู ทุกรุ่น ทุกยี่ห้อ ราคาคุ้มค่า สินค้าพร้อมส่ง
            รับประกันคุณภาพ
          </p>

          <div className="hero-animate hero-animate-5 mt-8">
            <div className="flex flex-wrap gap-3">
              <a
                href="#catalog"
                onClick={scrollToCatalog}
                className="btn btn-tonal-navy px-6 shadow-sm hover:shadow-md"
              >
                ดูสินค้าทั้งหมด
                <ArrowRightIcon className="btn-tonal-navy__icon h-4 w-4 shrink-0" />
              </a>
              <a
                href={CONTACT.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-line-solid shrink-0 px-6 shadow-sm hover:shadow-md"
              >
                <LineIcon className="h-5 w-5 shrink-0" />
                สั่งซื้อผ่าน LINE
              </a>
            </div>
          </div>

          <ul className="hero-trust-list mt-4 flex flex-wrap gap-2.5 sm:gap-3">
            {TRUST_POINTS.map((point, index) => (
              <li
                key={point.label}
                className={`hero-animate hero-trust-item hero-trust-item-${index + 1}`}
              >
                <span
                  className={`hero-trust-chip hero-trust-chip--${point.variant}`}
                >
                  <span
                    className={`hero-trust-chip__icon hero-trust-chip__icon--${point.variant}`}
                  >
                    <point.Icon className="h-4 w-4" />
                  </span>
                  <span className="hero-trust-chip__label">{point.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ShippingIcon({ className }: { className?: string }) {
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
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m8 0a2 2 0 104 0"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
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
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function InvoiceIcon({ className }: { className?: string }) {
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
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function StockIcon({ className }: { className?: string }) {
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
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
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
        strokeWidth={1.75}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
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
        strokeWidth={1.75}
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}
