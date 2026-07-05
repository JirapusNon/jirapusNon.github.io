import Link from 'next/link';
import type { Metadata } from 'next';
import AboutSection from '@/components/AboutSection';
import LineIcon from '@/components/LineIcon';
import { BUSINESS, CONTACT, STORE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description:
    'ติดต่อ RNK Products คลังหมึกพิมพ์และอุปกรณ์สำนักงานในกรุงเทพฯ โทร แชท LINE แผนที่ และข้อมูลเกี่ยวกับเรา',
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section id="contact" className="contact-hero scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="contact-breadcrumb" aria-label="breadcrumb">
            <Link href="/">หน้าแรก</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">ติดต่อเรา</span>
          </nav>

          <div className="contact-hero-intro">
            <p className="contact-hero-copy__eyebrow">{STORE.eyebrow}</p>
            <h1 className="contact-hero-copy__title">ติดต่อ RNK Products</h1>
            <p className="contact-hero-copy__intro">{STORE.intro}</p>
            <p className="contact-hero-copy__address">{CONTACT.address}</p>

            <div className="contact-hero-actions">
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
              <a
                href={CONTACT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                นำทาง Google Maps
              </a>
            </div>
          </div>

          <dl className="contact-hero-facts">
            <div className="contact-hero-facts__item">
              <dt>เวลาทำการ</dt>
              <dd>{BUSINESS.hours}</dd>
            </div>
            <div className="contact-hero-facts__item">
              <dt>ที่จอดรถ</dt>
              <dd>{STORE.parking}</dd>
            </div>
            <div className="contact-hero-facts__item">
              <dt>ก่อนเข้ารับสินค้า</dt>
              <dd>{STORE.visitNote}</dd>
            </div>
            <div className="contact-hero-facts__item contact-hero-facts__item--cta">
              <dt>โทรนัดหมายก่อนเข้าพบ</dt>
              <dd>
                <a href={CONTACT.phoneHref} className="contact-hero-facts__phone">
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <AboutSection />
    </div>
  );
}
