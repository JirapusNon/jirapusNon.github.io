'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Award } from 'lucide-react';
import BackButton from '@/components/BackButton';
import TrustBadges from '@/components/TrustBadges';
import LineIcon from '@/components/LineIcon';
import { BUSINESS, CONTACT } from '@/lib/constants';

const yearsInBusiness = new Date().getFullYear() - BUSINESS.foundedYear;

const STATS = [
  { value: `${yearsInBusiness}+`, label: 'ปีในวงการหมึกพิมพ์' },
  { value: '10', label: 'แบรนด์ชั้นนำ ครบทุกยี่ห้อ' },
  { value: 'ทั่วไทย', label: 'จัดส่ง & ออกใบกำกับภาษี', text: true },
];

export default function ContactAboutSection() {
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
      id="contact"
      className={`about-section scroll-mt-24 ${visible ? 'about-section--visible' : ''}`}
    >
      <div className="detail-toolbar-bar mb-6">
        <BackButton fallbackHref="/" variant="light" compact />
        <span className="detail-toolbar__divider" aria-hidden="true" />
        <nav className="min-w-0 truncate text-xs sm:text-sm" aria-label="breadcrumb">
          <Link
            href="/"
            className="cursor-pointer text-graphite underline-offset-2 hover:text-accent hover:underline"
          >
            หน้าแรก
          </Link>
          <span className="mx-2 text-graphite/50">/</span>
          <span className="font-medium text-ink" aria-current="page">
            ติดต่อเรา
          </span>
        </nav>
      </div>

      <div id="about" className="contact-card scroll-mt-24">
        <div className="cmyk-strip cmyk-strip-thin" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="contact-card__inner">
          {/* Hero */}
          <div className="contact-hero-lead contact-reveal">
            <div className="contact-hero-lead__copy">
              <span className="contact-eyebrow">
                <span className="contact-eyebrow__dot" aria-hidden="true" />
                เกี่ยวกับเรา
              </span>

              <h1 className="about-section-title font-heading">
                จำหน่ายหมึกพิมพ์และอุปกรณ์สำนักงาน
                <span className="about-section-title__accent">
                  มากกว่า {yearsInBusiness} ปี
                </span>
              </h1>

              <p className="about-section-founded">
                ก่อตั้ง {BUSINESS.foundedYear} · {BUSINESS.legalName}
              </p>

              <p className="contact-hero-lead__intro">{BUSINESS.aboutHomeLead}</p>

              <div className="about-section-actions">
                <a
                  href={CONTACT.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-line-solid"
                >
                  <LineIcon className="h-5 w-5 shrink-0" />
                  แชท LINE
                </a>
                <a href={CONTACT.phoneHref} className="btn btn-secondary">
                  โทร {CONTACT.phone}
                </a>
                <a href="#store-map" className="about-section-map-link">
                  ดูตำแหน่งบนแผนที่
                </a>
              </div>
            </div>

            <figure className="contact-hero-lead__media">
              <div className="contact-hero-photo">
                <Image
                  src={BUSINESS.storeImage}
                  alt={BUSINESS.storeImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                  priority
                />
                <span className="contact-hero-photo__badge">
                  <Award className="h-4 w-4 shrink-0" aria-hidden="true" />
                  ก่อตั้งปี {BUSINESS.foundedYear}
                </span>
                <figcaption className="contact-hero-photo__caption">
                  <span className="contact-hero-photo__caption-label">หน้าร้าน</span>
                  <span className="contact-hero-photo__caption-text">
                    พร้อมส่ง · {CONTACT.addressShort}
                  </span>
                </figcaption>
              </div>
            </figure>
          </div>

          {/* Credential stat strip */}
          <dl className="contact-stat-strip contact-reveal contact-reveal--2">
            {STATS.map((stat) => (
              <div key={stat.label} className="contact-stat">
                <dt
                  className={`contact-stat__value${stat.text ? ' contact-stat__value--text' : ''}`}
                >
                  {stat.value}
                </dt>
                <dd className="contact-stat__label">{stat.label}</dd>
              </div>
            ))}
          </dl>

          {/* Story + values + company facts */}
          <div className="contact-detail contact-reveal contact-reveal--3">
            <div className="contact-detail__main">
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
            </div>

            <aside className="contact-detail__aside" aria-label="ข้อมูลองค์กร">
              <p className="contact-facts__title spec-label">ข้อมูลบริษัท</p>
              <dl className="contact-facts">
                <div className="contact-facts__cell">
                  <dt>ชื่อนิติบุคคล</dt>
                  <dd>{BUSINESS.legalName}</dd>
                </div>
                <div className="contact-facts__cell">
                  <dt>เลขทะเบียน</dt>
                  <dd className="font-mono">{BUSINESS.taxId}</dd>
                </div>
                <div className="contact-facts__cell">
                  <dt>เวลาทำการ</dt>
                  <dd>{BUSINESS.hours}</dd>
                </div>
                <div className="contact-facts__cell">
                  <dt>ที่ตั้ง</dt>
                  <dd>{CONTACT.address}</dd>
                </div>
                <div className="contact-facts__cell">
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
            </aside>
          </div>

          {/* Supported services */}
          <div className="about-section-trust contact-reveal contact-reveal--4">
            <p className="about-section-trust__label spec-label">บริการที่รองรับ</p>
            <TrustBadges />
          </div>
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
