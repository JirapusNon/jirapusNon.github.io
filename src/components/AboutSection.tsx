'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import TrustBadges from '@/components/TrustBadges';
import { BUSINESS, CONTACT } from '@/lib/constants';

const yearsInBusiness = new Date().getFullYear() - BUSINESS.foundedYear;

export default function AboutSection() {
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
      className={`about-section catalog-section scroll-mt-20 section-surface-muted ${
        visible ? 'about-section--visible' : ''
      }`}
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="about-section-grid">
          <div className="about-section-copy">
            <p className="about-section-eyebrow spec-label">เกี่ยวกับเรา</p>

            <h2 className="about-section-title font-heading">
              จำหน่ายหมึกพิมพ์และอุปกรณ์สำนักงาน
              <span className="about-section-title__accent">
                มากกว่า {yearsInBusiness} ปี
              </span>
            </h2>

            <p className="about-section-founded">
              ก่อตั้ง {BUSINESS.foundedYear} · {BUSINESS.legalName}
            </p>

            <div className="about-section-prose">
              {BUSINESS.about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <ul className="about-section-values" aria-label="จุดเด่นของ RNK Products">
              {BUSINESS.values.map((value) => (
                <li key={value} className="about-section-values__item">
                  <CheckIcon />
                  <span>{value}</span>
                </li>
              ))}
            </ul>

            <div className="about-fact-sheet" aria-label="ข้อมูลองค์กร">
              <dl className="about-fact-sheet__grid">
                <div className="about-fact-sheet__cell">
                  <dt>ชื่อนิติบุคคล</dt>
                  <dd>{BUSINESS.legalName}</dd>
                </div>
                <div className="about-fact-sheet__cell">
                  <dt>เวลาทำการ</dt>
                  <dd>{BUSINESS.hours}</dd>
                </div>
                <div className="about-fact-sheet__cell">
                  <dt>ที่ตั้ง</dt>
                  <dd>{CONTACT.address}</dd>
                </div>
                <div className="about-fact-sheet__cell">
                  <dt>ติดต่อ</dt>
                  <dd>
                    <a href={CONTACT.phoneHref} className="about-meta-link">
                      {CONTACT.phone}
                    </a>
                    <span className="about-fact-sheet__sep" aria-hidden="true">
                      ·
                    </span>
                    <a
                      href={CONTACT.lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about-meta-link"
                    >
                      {CONTACT.lineId}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="about-section-actions">
              <Link href="#contact" className="btn btn-secondary">
                ดูช่องทางติดต่อ
              </Link>
              <a
                href={CONTACT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="about-section-map-link"
              >
                เปิดแผนที่
              </a>
            </div>
          </div>

          <figure className="about-section-media">
            <div className="about-section-media__frame">
              <Image
                src={BUSINESS.aboutImage}
                alt={BUSINESS.aboutImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
              <figcaption className="about-section-media__bar">
                <span className="about-section-media__bar-label">คลังสินค้า</span>
                <span className="about-section-media__bar-text">
                  พร้อมส่ง · {CONTACT.addressShort}
                </span>
              </figcaption>
            </div>
          </figure>
        </div>

        <div className="about-section-trust">
          <p className="about-section-trust__label spec-label">บริการที่รองรับ</p>
          <TrustBadges />
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      className="about-section-values__icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
