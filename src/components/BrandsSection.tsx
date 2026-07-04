'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import BrandLogoCard from '@/components/BrandLogoCard';
import { CONTACT } from '@/lib/constants';
import { brands } from '@/lib/products';
import { getBrandLogoStyle } from '@/lib/brandLogo';

export default function BrandsSection() {
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
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brands"
      className={`brands-section catalog-section scroll-mt-20 bg-background ${
        visible ? 'brands-section--visible' : ''
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="brands-section-header">
          <p className="spec-label">แบรนด์ที่จำหน่าย</p>
          <h2 className="font-heading mt-2 text-xl font-semibold text-ink sm:text-2xl">
            ยี่ห้อเครื่องพิมพ์ที่เรารองรับ
          </h2>
          <p className="mt-2 max-w-lg text-sm text-graphite">
            ครอบคลุมเครื่องพิมพ์ทุกยี่ห้อดังในไทย ทั้งหมึกแท้และเทียบเท่า
          </p>
        </div>

        <div className="brands-grid mt-10 grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
          {brands.map((brand, index) => {
            const logo = getBrandLogoStyle(brand);
            return (
              <BrandLogoCard
                key={brand}
                href={`/?brand=${encodeURIComponent(brand)}#catalog`}
                label={brand}
                logoSrc={logo.image}
                monogram={logo.monogram}
                monogramBg={logo.bg}
                style={{ '--brand-delay': `${index * 45}ms` } as CSSProperties}
              />
            );
          })}
        </div>

        <p className="brands-section-footer mt-8 text-sm text-graphite">
          ไม่พบแบรนด์ที่ต้องการ?{' '}
          <a
            href={CONTACT.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-medium text-accent underline-offset-2 hover:underline"
          >
            ติดต่อทีมงานเพื่อสอบถาม
          </a>
        </p>
      </div>
    </section>
  );
}
