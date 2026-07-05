'use client';

import Image from 'next/image';
import Link from 'next/link';
import LineIcon from '@/components/LineIcon';
import { BUSINESS, CONTACT, FOOTER, SITE_NAME } from '@/lib/constants';
import { usePathname } from 'next/navigation';

const SOCIAL_LINKS = [
  {
    id: 'line',
    label: 'LINE',
    href: CONTACT.lineUrl,
    Icon: LineIcon,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: CONTACT.facebookUrl,
    Icon: FacebookIcon,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: CONTACT.instagramUrl,
    Icon: InstagramIcon,
  },
] as const;

const CONTACT_DETAILS = [
  {
    id: 'line',
    label: 'LINE',
    value: CONTACT.lineId,
    href: CONTACT.lineUrl,
    external: true,
    Icon: LineIcon,
  },
  {
    id: 'phone',
    label: 'โทร',
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    Icon: PhoneIcon,
  },
  {
    id: 'email',
    label: 'อีเมล',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    Icon: MailIcon,
  },
  {
    id: 'hours',
    label: 'เวลาทำการ',
    value: BUSINESS.hours,
    Icon: ClockIcon,
  },
] as const;

export default function Footer() {
  const pathname = usePathname();
  const showContact = pathname !== '/contact';

  return (
    <footer className="site-footer bg-footer-bg text-footer-text">
      <div className="cmyk-strip" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      {showContact ? (
        <section
          id="contact"
          className="site-footer__panel scroll-mt-20"
          aria-labelledby="footer-contact-heading"
        >
          <div className="site-footer__inner mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="site-footer__contact-grid">
              <div className="site-footer__brand">
                <h2
                  id="footer-contact-heading"
                  className="site-footer__heading font-heading text-base font-semibold leading-snug text-on-primary sm:text-lg"
                >
                  {FOOTER.heading}
                </h2>

                <p className="site-footer__identity-line">
                  <span className="site-footer__company-name">{BUSINESS.legalName}</span>
                  <span className="site-footer__identity-sep" aria-hidden="true">
                    ·
                  </span>
                  <span className="site-footer__address">{CONTACT.address}</span>
                </p>

                <dl className="site-footer__channels" aria-label="ช่องทางติดต่อ">
                  {CONTACT_DETAILS.map((item) => (
                    <div key={item.id} className="site-footer__channel-row">
                      <dt className="site-footer__channel-icon" aria-hidden="true">
                        <item.Icon className="h-4 w-4" />
                      </dt>
                      <dd>
                        <span className="sr-only">{item.label}: </span>
                        {'href' in item ? (
                          <a
                            href={item.href}
                            title={item.value}
                            {...('external' in item && item.external
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                            className="site-footer__channel-link"
                          >
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <aside className="site-footer__social-panel" aria-label="ติดต่อและโซเชียลมีเดีย">
                <p className="site-footer__social-label">ติดต่อเรา</p>

                <ul className="site-footer__social">
                  {SOCIAL_LINKS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`site-footer__social-link site-footer__social-link--${item.id}`}
                        aria-label={item.label}
                      >
                        <item.Icon className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="site-footer__more-link">
                  {FOOTER.contactButton}
                  <ArrowIcon />
                </Link>
              </aside>
            </div>
          </div>
        </section>
      ) : null}

      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="site-footer__copyright">
            © {new Date().getFullYear()} {SITE_NAME} | All rights reserved.
          </p>

          <p className="site-footer__tax-id">
            <span>เลขประจำตัวผู้เสียภาษี: {BUSINESS.taxId}</span>
            <Image
              src="/ink-images/dbd.png"
              alt="จดทะเบียนพาณิชย์อิเล็กทรอนิกส์กับกรมพัฒนาธุรกิจการค้า"
              width={104}
              height={50}
              className="site-footer__tax-badge"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="site-footer__more-link-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function PhoneIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

function MailIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function ClockIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function FacebookIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
