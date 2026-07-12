'use client';

import { useEffect, useRef, useState } from 'react';
import SectionKicker from '@/components/SectionKicker';
import LineIcon from '@/components/LineIcon';
import { BUSINESS, CONTACT } from '@/lib/constants';

export default function HelpFindSection() {
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
      id="help-find"
      aria-labelledby="help-find-heading"
      className={`help-find-section catalog-section scroll-mt-20 section-surface-canvas ${
        visible ? 'help-find-section--visible' : ''
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="help-find-header section-intro">
          <SectionKicker variant="accent">ให้เราช่วยหา</SectionKicker>
          <h2
            id="help-find-heading"
            className="font-heading mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]"
          >
            หาหมึกรุ่นที่ต้องการไม่เจอ?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-graphite sm:text-[0.9375rem]">
            ไม่ต้องเสียเวลาไล่หาเอง — ทีมงาน RNK
            ช่วยเช็กหมึกที่ตรงกับรุ่นเครื่องพิมพ์ พร้อมเช็กสต็อกและราคาให้ทันที
          </p>
        </div>

        <div className="help-find-band mt-10 lg:mt-12">
          <div className="cmyk-strip cmyk-strip-thin" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="help-find-band__inner">
            <span className="help-find-band__spark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>

            <div className="help-find-band__lead">
              <span className="help-find-band__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </span>

              <div className="help-find-band__lead-copy">
                <p className="help-find-band__reassure">
                  แจ้งรุ่นเครื่องพิมพ์ของคุณมาได้เลย
                </p>
                <p className="help-find-band__note">
                  <span className="help-find-band__pulse" aria-hidden="true" />
                  {BUSINESS.responseTime}
                </p>
              </div>
            </div>

            <div className="help-find-band__actions">
              <a
                href={CONTACT.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-line-solid"
              >
                <LineIcon className="h-4 w-4" />
                ให้ทีมงานช่วยหา
              </a>
              <a
                href={CONTACT.phoneHref}
                className="btn btn-secondary help-find-band__call"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 5.5c0 8.008 6.492 14.5 14.5 14.5.69 0 1.36-.096 2-.276a1.5 1.5 0 0 0 1.09-1.44v-2.19a1.5 1.5 0 0 0-1.2-1.47l-2.02-.404a1.5 1.5 0 0 0-1.5.62l-.5.7a11.06 11.06 0 0 1-4.83-4.83l.7-.5a1.5 1.5 0 0 0 .62-1.5l-.404-2.02A1.5 1.5 0 0 0 6.906 3.5H4.716A1.5 1.5 0 0 0 3.276 4.59c-.18.64-.276 1.31-.276 2Z" />
                </svg>
                โทรสอบถาม
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
