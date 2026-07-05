'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import SectionKicker from '@/components/SectionKicker';
import { BUSINESS, CONTACT } from '@/lib/constants';

const yearsInBusiness = new Date().getFullYear() - BUSINESS.foundedYear;

const TRUST_CARDS = [
  {
    id: 'tax-invoice',
    label: 'ออกใบกำกับภาษี',
    value: BUSINESS.aboutHomeTrust.tax,
    Icon: TaxIcon,
  },
  {
    id: 'payment',
    label: 'ช่องทางชำระเงิน',
    value: BUSINESS.aboutHomeTrust.payment,
    Icon: PaymentIcon,
  },
  {
    id: 'hours',
    label: 'เวลาทำการ',
    value: BUSINESS.hours,
    Icon: ClockIcon,
  },
] as const;

export default function AboutSectionHome() {
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
      id="about"
      aria-labelledby="about-home-heading"
      className={`about-home-section catalog-section scroll-mt-20 section-surface-light ${
        visible ? 'about-home-section--visible' : ''
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="about-home-header section-intro">
          <SectionKicker variant="accent">เกี่ยวกับเรา</SectionKicker>
          <h2
            id="about-home-heading"
            className="font-heading mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]"
          >
            จำหน่ายหมึกพิมพ์และอุปกรณ์สำนักงาน
            <span className="about-home-heading__years">
              {' '}
              · มากกว่า {yearsInBusiness} ปี
            </span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-graphite sm:text-[0.9375rem]">
            {BUSINESS.legalName}
          </p>
        </div>

        <div className="about-home-body">
          <figure className="about-home-media">
            <div className="about-home-media__frame">
              <Image
                src={BUSINESS.storeImage}
                alt={BUSINESS.storeImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
                priority={false}
              />
            </div>
          </figure>

          <div className="about-home-content">
            <p className="about-home-lead">{BUSINESS.aboutHomeLead}</p>

            <ul className="about-home-highlights" aria-label="จุดเด่นของ RNK Products">
              {BUSINESS.aboutHomeHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="about-home-contact">
              <a href={CONTACT.phoneHref} className="about-home-contact__link">
                <PhoneIcon />
                {CONTACT.phone}
              </a>
              <span className="about-home-contact__sep" aria-hidden="true">
                ·
              </span>
              <a href={`mailto:${CONTACT.email}`} className="about-home-contact__link">
                <MailIcon />
                {CONTACT.email}
              </a>
            </div>

            <Link href="/contact" className="btn btn-secondary about-home-cta">
              ติดต่อเพิ่มเติม
            </Link>
          </div>
        </div>

        <ul className="about-home-trust-cards" aria-label="ข้อมูลบริการและองค์กร">
          {TRUST_CARDS.map((card, index) => (
            <li
              key={card.id}
              className={`about-home-trust-card${index > 0 ? ' about-home-trust-card--divider' : ''}`}
            >
              <span className="about-home-trust-card__icon" aria-hidden="true">
                <card.Icon />
              </span>
              <span className="about-home-trust-card__label">{card.label}</span>
              <span className="about-home-trust-card__value">{card.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function TaxIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 14l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
