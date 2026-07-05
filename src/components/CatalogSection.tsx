'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface CatalogSectionProps {
  children: ReactNode;
}

export default function CatalogSection({ children }: CatalogSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="catalog"
      className={`catalog-block catalog-section scroll-mt-20 section-surface-canvas ${
        visible ? 'catalog-block--visible' : ''
      }`}
    >
      <div className="catalog-block-mesh" aria-hidden="true" />
      <div className="catalog-block-glow" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="catalog-block-header max-w-2xl">
          <div className="catalog-eyebrow inline-flex items-center gap-2 rounded-full border px-3 py-1">
            <span
              className="catalog-eyebrow-dot h-1.5 w-1.5 rounded-full bg-cmyk-c"
              aria-hidden="true"
            />
            <span className="spec-label !text-cmyk-c">แคตตาล็อก</span>
          </div>
          <h2 className="font-heading mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]">
            เลือกหมึกตรงรุ่นเครื่องพิมพ์
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-graphite sm:text-[0.9375rem]">
            ค้นหาด้วยรุ่นเครื่องพิมพ์ ยี่ห้อ หรือรหัสสินค้า — กรองและสั่งซื้อได้ทันที
          </p>
        </div>

        <div className="catalog-showcase mt-10 lg:mt-12">
          <div className="catalog-showcase-panel">{children}</div>
        </div>
      </div>
    </section>
  );
}
