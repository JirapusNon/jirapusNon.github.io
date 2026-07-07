'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import BrandLogoCard from '@/components/BrandLogoCard';
import SectionKicker from '@/components/SectionKicker';
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
      className={`brands-section catalog-section scroll-mt-20 section-surface-muted ${visible ? 'brands-section--visible' : ''
        }`}
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="brands-section-header section-intro">
          <SectionKicker variant="cyan">แบรนด์ชั้นนำ</SectionKicker>
          <h2 className="font-heading mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]">
            แบรนด์สินค้าที่เราจำหน่าย
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-graphite sm:text-[0.9375rem]">
            เลือกแบรนด์เพื่อค้นหาหมึกที่ตรงรุ่น รองรับเครื่องพิมพ์ยอดนิยมในไทย
            ทั้งหมึกแท้และหมึกเทียบเท่า
          </p>
        </div>

        <div className="brands-showcase mt-10 lg:mt-12">
          <div className="brands-grid">
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
                  style={
                    { '--brand-delay': `${index * 40}ms` } as CSSProperties
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
