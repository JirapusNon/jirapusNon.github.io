'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Award, Building2, Hash, MapPin, Phone } from 'lucide-react';
import BackButton from '@/components/BackButton';
import TrustBadges from '@/components/TrustBadges';
import LineIcon from '@/components/LineIcon';
import { BUSINESS, CONTACT } from '@/lib/constants';

const yearsInBusiness = new Date().getFullYear() - BUSINESS.foundedYear;

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
            </div>

            <figure className="contact-hero-lead__media">
              <div className="contact-hero-photo group">
                <Image
                  src={BUSINESS.storeImage}
                  alt={BUSINESS.storeImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  priority
                />
                <span className="contact-hero-photo__badge">
                  <Award className="h-4 w-4 shrink-0" aria-hidden="true" />
                  ก่อตั้งปี {BUSINESS.foundedYear}
                </span>
              </div>
            </figure>
          </div>

          {/* Story + values + company facts */}
          <div className="contact-detail contact-reveal contact-reveal--2">
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

              <div className="contact-cta">
                <div className="contact-cta__head">
                  <span className="contact-cta__eyebrow">
                    <span className="contact-cta__pulse" aria-hidden="true" />
                    พร้อมให้บริการ
                  </span>
                  <p className="contact-cta__title font-heading">
                    ติดต่อทีมงานได้ทันที
                  </p>
                  <p className="contact-cta__sub">
                    ตอบกลับเร็วในเวลาทำการ · {BUSINESS.hours}
                  </p>
                </div>

                <div className="contact-cta__actions">
                  <a
                    href={CONTACT.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-action contact-action--line"
                  >
                    <span className="contact-action__icon">
                      <LineIcon className="h-5 w-5" />
                    </span>
                    <span className="contact-action__text">
                      <span className="contact-action__label">แชท LINE</span>
                      <span className="contact-action__value">{CONTACT.lineId}</span>
                    </span>
                    <ArrowUpRight className="contact-action__arrow" aria-hidden="true" />
                  </a>

                  <a href={CONTACT.phoneHref} className="contact-action">
                    <span className="contact-action__icon">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="contact-action__text">
                      <span className="contact-action__label">โทรเลย</span>
                      <span className="contact-action__value font-mono">{CONTACT.phone}</span>
                    </span>
                    <ArrowUpRight className="contact-action__arrow" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <aside className="contact-detail__aside" aria-label="ข้อมูลองค์กร">
              <p className="contact-facts__title spec-label">ข้อมูลบริษัท</p>
              <ul className="contact-facts">
                <li className="contact-facts__row">
                  <span className="contact-facts__icon">
                    <Building2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="contact-facts__body">
                    <p className="contact-facts__label">ชื่อนิติบุคคล</p>
                    <p className="contact-facts__value">{BUSINESS.legalName}</p>
                  </div>
                </li>
                <li className="contact-facts__row">
                  <span className="contact-facts__icon">
                    <Hash className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="contact-facts__body">
                    <p className="contact-facts__label">เลขทะเบียนนิติบุคคล</p>
                    <p className="contact-facts__value font-mono">{BUSINESS.taxId}</p>
                  </div>
                </li>
                <li className="contact-facts__row">
                  <span className="contact-facts__icon">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="contact-facts__body">
                    <p className="contact-facts__label">ที่ตั้ง</p>
                    <p className="contact-facts__value">{CONTACT.address}</p>
                  </div>
                </li>
              </ul>
            </aside>
          </div>

          {/* Supported services */}
          <div className="about-section-trust contact-reveal contact-reveal--3">
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
