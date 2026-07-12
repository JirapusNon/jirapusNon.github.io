'use client';

import { useEffect, useRef, useState } from 'react';
import LineIcon from '@/components/LineIcon';
import { BUSINESS, CONTACT } from '@/lib/constants';

const CHANNELS = [
  {
    id: 'phone',
    eyebrow: 'โทรศัพท์',
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    cta: 'โทรเลย',
    Icon: PhoneIcon,
    external: false,
  },
  {
    id: 'line',
    eyebrow: 'LINE ID',
    value: CONTACT.lineId,
    href: CONTACT.lineUrl,
    cta: 'แชทเลย',
    Icon: LineIcon,
    external: true,
  },
] as const;

export default function ContactFab() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <div className="contact-fab">
      {open && (
        <div
          className="contact-sheet-backdrop"
          onClick={() => setOpen(false)}
        >
          <div
            id="contact-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-sheet-title"
            className="contact-sheet"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="contact-sheet__header">
              <div className="contact-sheet__heading">
                <p className="contact-sheet__eyebrow">RNK Products</p>
                <h2 id="contact-sheet-title" className="contact-sheet__title">
                  ติดต่อเรา
                </h2>
                <p className="contact-sheet__subtitle">
                  เลือกช่องทางที่สะดวกที่สุด ทีมงานพร้อมช่วยเช็กรุ่นหมึก
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="contact-sheet__close"
                aria-label="ปิดหน้าต่างติดต่อเรา"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="contact-sheet__body">
              {CHANNELS.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.href}
                  {...(channel.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className={`contact-channel contact-channel--${channel.id}`}
                >
                  <span className="contact-channel__icon">
                    <channel.Icon className="h-6 w-6" />
                  </span>
                  <span className="contact-channel__info">
                    <span className="contact-channel__eyebrow">{channel.eyebrow}</span>
                    <span className="contact-channel__value">{channel.value}</span>
                  </span>
                  <span className="contact-channel__cta">
                    {channel.cta}
                    <ArrowIcon className="contact-channel__cta-arrow" />
                  </span>
                </a>
              ))}

              <p className="contact-sheet__hours">
                <ClockIcon className="contact-sheet__hours-icon" />
                เวลาทำการ · {BUSINESS.hours}
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        className={`contact-fab__toggle${open ? ' contact-fab__toggle--open' : ''}`}
        aria-expanded={open}
        aria-controls="contact-sheet"
        aria-label={open ? 'ปิดหน้าต่างติดต่อเรา' : 'ติดต่อเรา'}
        onClick={() => setOpen((value) => !value)}
      >
        <ChatIcon className="contact-fab__icon contact-fab__icon--chat" />
        <CloseIcon className="contact-fab__icon contact-fab__icon--close" />
      </button>
    </div>
  );
}

function ChatIcon({ className }: Readonly<{ className?: string }>) {
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
        strokeWidth={2}
        d="M8.25 12h.008v.008H8.25V12zm3.75 0h.008v.008H12V12zm3.75 0h.008v.008h-.008V12zM21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  );
}

function CloseIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
        strokeWidth={2}
        d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a1.5 1.5 0 001.5-1.5v-2.379a1.5 1.5 0 00-1.06-1.435l-3.53-1.059a1.5 1.5 0 00-1.617.482l-.62.775a11.25 11.25 0 01-5.276-5.276l.775-.62a1.5 1.5 0 00.482-1.617L7.564 5.31a1.5 1.5 0 00-1.435-1.06H3.75a1.5 1.5 0 00-1.5 1.5z"
      />
    </svg>
  );
}

function ArrowIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4.5 12h15m0 0l-6-6m6 6l-6 6" />
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
        strokeWidth={1.8}
        d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
      />
    </svg>
  );
}
