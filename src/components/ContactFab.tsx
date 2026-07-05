'use client';

import { useEffect, useRef, useState } from 'react';
import LineIcon from '@/components/LineIcon';
import { CONTACT } from '@/lib/constants';

const QUICK_LINKS = [
  {
    id: 'line',
    label: 'แชทผ่าน LINE',
    href: CONTACT.lineUrl,
    Icon: LineIcon,
  },
  {
    id: 'messenger',
    label: 'แชทผ่าน Messenger',
    href: CONTACT.messengerUrl,
    Icon: MessengerIcon,
  },
] as const;

export default function ContactFab() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="contact-fab">
      <div
        id="contact-fab-menu"
        className={`contact-fab__menu${open ? ' contact-fab__menu--open' : ''}`}
        aria-hidden={!open}
      >
        {QUICK_LINKS.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            aria-label={item.label}
            className={`contact-fab__item contact-fab__item--${item.id}`}
            style={{ transitionDelay: open ? `${index * 40}ms` : '0ms' }}
            onClick={() => setOpen(false)}
          >
            <item.Icon className="h-6 w-6" />
          </a>
        ))}
      </div>

      <button
        type="button"
        className={`contact-fab__toggle${open ? ' contact-fab__toggle--open' : ''}`}
        aria-expanded={open}
        aria-controls="contact-fab-menu"
        aria-label={open ? 'ปิดเมนูติดต่อเรา' : 'ติดต่อเรา'}
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

function MessengerIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.145 2 11.25c0 2.9 1.454 5.49 3.726 7.184V22l3.406-1.87c.91.252 1.874.387 2.868.387 5.523 0 10-4.145 10-9.267C22 6.145 17.523 2 12 2zm1.008 12.474l-2.548-2.719-4.97 2.719 5.467-5.802 2.61 2.719 4.907-2.719-5.466 5.802z" />
    </svg>
  );
}
