'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SectionKicker from '@/components/SectionKicker';
import { TRUSTED_CUSTOMERS } from '@/lib/customerLogos';

function CustomerLogoMark({
  customer,
  decorative = false,
}: {
  customer: (typeof TRUSTED_CUSTOMERS)[number];
  decorative?: boolean;
}) {
  const width = typeof customer.logo === 'string' ? 120 : customer.logo.width;
  const height = typeof customer.logo === 'string' ? 40 : customer.logo.height;

  return (
    <span className="customers-marquee__mark">
      <Image
        src={customer.logo}
        alt={decorative ? '' : customer.name}
        width={width}
        height={height}
        className="customers-marquee__image"
        aria-hidden={decorative || undefined}
      />
    </span>
  );
}

export default function TestimonialsSection() {
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
      id="customers"
      className={`customers-section catalog-section section-surface-muted ${
        visible ? 'customers-section--visible' : ''
      }`}
      aria-labelledby="customers-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="customers-section-header section-intro">
          <SectionKicker variant="accent">ลูกค้าของเรา</SectionKicker>
          <h2
            id="customers-heading"
            className="font-heading mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]"
          >
            องค์กรที่ไว้วางใจ RNK
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-graphite sm:text-[0.9375rem]">
            SME และสำนักงานที่สั่งหมึกตรงรุ่นและสั่งซ้ำเป็นประจำ
          </p>
        </div>
      </div>

      <div className="customers-marquee mt-10 lg:mt-12" aria-label="โลโก้ลูกค้าที่ไว้วางใจ">
        <div className="customers-marquee__track">
          {[0, 1].map((setIndex) => (
            <ul
              key={setIndex}
              className="customers-marquee__row"
              aria-hidden={setIndex === 1 ? true : undefined}
            >
              {TRUSTED_CUSTOMERS.map((customer) => (
                <li key={`${setIndex}-${customer.id}`} className="customers-marquee__cell">
                  <CustomerLogoMark customer={customer} decorative={setIndex === 1} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
