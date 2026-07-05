'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import SectionKicker from '@/components/SectionKicker';

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
      className={`catalog-block catalog-section scroll-mt-20 section-surface-muted ${visible ? 'catalog-block--visible' : ''
        }`}
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="catalog-block-header section-intro">
          <SectionKicker variant="cyan">สินค้าทั้งหมด</SectionKicker>
          <h2 className="font-heading mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]">
            ค้นหาหมึกพิมพ์ตรงรุ่นสำหรับเครื่องพิมพ์ของคุณ
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-graphite sm:text-[0.9375rem]">
            ค้นหาง่าย ๆ ด้วยการพิมพ์รุ่นเครื่องพิมพ์ รหัสสินค้า
            หรือแบรนด์ที่คุณต้องการ พร้อมระบบกรองสินค้าเพื่อความถูกต้อง
          </p>
        </div>

        <div className="catalog-showcase mt-10 lg:mt-12">
          <div className="catalog-showcase-panel">{children}</div>
        </div>
      </div>
    </section>
  );
}
