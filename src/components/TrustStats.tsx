'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { brands } from '@/lib/products';

const stats = [
  { value: '500+', label: 'รุ่นหมึกและอุปกรณ์', tone: 'c' as const },
  { value: `${brands.length}+`, label: 'ยี่ห้อเครื่องพิมพ์', tone: 'a' as const },
  { value: 'ส่งทั่วไทย', label: 'ครอบคลุมทุกจังหวัด', tone: 'y' as const },
  { value: 'รับประกัน', label: 'คุณภาพทุกชิ้น', tone: 'k' as const },
] as const;

export default function TrustStats() {
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
      { threshold: 0.2, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`trust-stats-section section-surface-light ${visible ? 'trust-stats-section--visible' : ''}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <ul className="trust-stats-grid grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-0">
          {stats.map((stat, index) => (
            <li
              key={stat.label}
              style={{ '--stat-delay': `${index * 60}ms` } as CSSProperties}
              className={`trust-stat-item trust-stat-item--${stat.tone} text-center ${
                index % 2 === 1
                  ? 'border-l'
                  : index > 0
                    ? 'sm:border-l'
                    : ''
              }`}
            >
              <p className={`trust-stat-value trust-stat-value--${stat.tone} font-heading text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl`}>
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium text-secondary sm:text-sm">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="trust-stats-strip cmyk-strip" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
