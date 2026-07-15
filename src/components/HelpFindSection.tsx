'use client';

import { useEffect, useRef, useState } from 'react';
import SectionKicker from '@/components/SectionKicker';
import { OPEN_CONTACT_EVENT } from '@/components/ContactFab';
import { BUSINESS } from '@/lib/constants';

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
      className={`help-find-section catalog-section scroll-mt-20 section-surface-muted ${visible ? 'help-find-section--visible' : ''
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
            ลดความสับสนและป้องกันการซื้อผิดรุ่น
            ให้เราช่วยเลือกหมึกที่ถูกต้องและคุ้มค่าที่สุดสำหรับคุณ
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
                  พร้อมบริการและให้คำปรึกษาทันที
                </p>
              </div>
            </div>

            <div className="help-find-band__actions">
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent(OPEN_CONTACT_EVENT))
                }
                className="btn btn-line-solid help-find-band__cta"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                ให้ทีมงานช่วยหา
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
