'use client';

import { useEffect, useRef, useState } from 'react';
import ProductCarousel from '@/components/ProductCarousel';
import SectionKicker from '@/components/SectionKicker';
import type { Product } from '@/lib/products';

interface FeaturedSectionProps {
  products: Product[];
}

export default function FeaturedSection({ products }: FeaturedSectionProps) {
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

  if (products.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="featured"
      className={`featured-section catalog-section scroll-mt-20 section-surface-light ${visible ? 'featured-section--visible' : ''
        }`}
    >
      <div
        className="section-flanking-shapes hidden lg:block"
        aria-hidden="true"
      >
        <span className="section-flanking-shape featured-shape--pentagon" />
        <span className="section-flanking-shape section-flanking-shape--circle featured-shape--circle-a" />
        <span className="section-flanking-shape featured-shape--triangle" />
        <span className="section-flanking-shape section-flanking-shape--circle featured-shape--circle-b" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="featured-section-header section-intro">
          <SectionKicker variant="accent">สินค้าแนะนำ</SectionKicker>
          <h2 className="font-heading mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]">
            สินค้าขายดี การันตีคุณภาพ
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-graphite sm:text-[0.9375rem]">
            คัดสรรหมึกและรวมรุ่นยอดฮิตที่คุ้มค่าที่สุด
            ตอบโจทย์ทั้งใช้งานในบ้านและสำนักงาน
          </p>
        </div>

        <div className="featured-showcase mt-10 lg:mt-12">
          <ProductCarousel products={products} featured />
        </div>
      </div>
    </section>
  );
}
