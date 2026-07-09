import type { Metadata } from 'next';
import { MapPin, Navigation } from 'lucide-react';
import ContactAboutSection from '@/components/ContactAboutSection';
import { CONTACT, STORE } from '@/lib/constants';

const MAP_QUERY = encodeURIComponent(`RNK Products, ${CONTACT.address}`);
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${MAP_QUERY}&z=16&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description:
    'ติดต่อ RNK Products คลังหมึกพิมพ์และอุปกรณ์สำนักงานในกรุงเทพฯ โทร แชท LINE แผนที่ และข้อมูลเกี่ยวกับเรา',
};

export default function ContactPage() {
  return (
    <div className="detail-page-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ContactAboutSection />

        <div id="store-map" className="store-map-card mt-8 scroll-mt-20">
          <div className="store-map-card__head">
            <span className="store-map-card__icon">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="store-map-card__title">ที่ตั้งร้าน</h2>
          </div>

          <div className="store-map-frame">
            <iframe
              src={MAP_EMBED_SRC}
              className="store-map-frame__iframe"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="แผนที่ที่ตั้ง RNK Products"
            />
          </div>

          <p className="store-map-card__address">{CONTACT.address}</p>

          <div className="store-map-card__actions">
            <a
              href={CONTACT.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              เปิดใน Google Maps
            </a>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
              ดูวิธีเดินทางแบบละเอียด
            </a>
          </div>

          <p className="store-map-card__meta">
            {STORE.parking} · {STORE.visitNote}
          </p>
        </div>
      </div>
    </div>
  );
}
