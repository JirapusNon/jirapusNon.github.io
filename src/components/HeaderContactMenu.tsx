'use client';

import { useEffect, useId, useRef, useState } from 'react';
import LineIcon from '@/components/LineIcon';
import { CONTACT } from '@/lib/constants';

const CONTACT_ITEMS = [
  {
    id: 'line',
    title: 'แชททาง Line',
    description: CONTACT.lineId,
    href: CONTACT.lineUrl,
    external: true,
    iconTone: 'line' as const,
    Icon: LineIcon,
  },
  {
    id: 'phone',
    title: 'โทร',
    description: CONTACT.phone,
    href: CONTACT.phoneHref,
    external: false,
    iconTone: 'phone' as const,
    Icon: PhoneIcon,
  },
] as const;

interface HeaderContactMenuProps {
  mode?: 'menu' | 'list';
  onNavigate?: () => void;
}

export default function HeaderContactMenu({
  mode = 'menu',
  onNavigate,
}: HeaderContactMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (mode !== 'menu' || !open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    const timeoutId = window.setTimeout(() => {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('pointerdown', onPointerDown);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [mode, open]);

  function handleItemClick() {
    setOpen(false);
    onNavigate?.();
  }

  if (mode === 'list') {
    return (
      <div className="header-contact-list">
        <p className="header-contact-list__label">ติดต่อเรา</p>
        <div className="header-contact-list__items">
          {CONTACT_ITEMS.map((item) => (
            <ContactItem
              key={item.id}
              item={item}
              onClick={handleItemClick}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="header-contact">
      <button
        type="button"
        className={`header-contact__trigger btn btn-line-solid shadow-sm hover:shadow-md${open ? ' header-contact__trigger--open' : ''}`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((value) => !value);
        }}
      >
        <ChatIcon className="h-4 w-4 shrink-0" />
        ติดต่อเรา
        <ChevronIcon className="header-contact__chevron h-4 w-4 shrink-0" />
      </button>

      <div
        id={menuId}
        role="menu"
        aria-label="ช่องทางติดต่อ"
        className={`header-contact__panel${open ? ' header-contact__panel--open' : ''}`}
        aria-hidden={!open}
      >
        {CONTACT_ITEMS.map((item) => (
          <ContactItem
            key={item.id}
            item={item}
            role="menuitem"
            tabIndex={open ? 0 : -1}
            onClick={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
}

function ContactItem({
  item,
  onClick,
  role,
  tabIndex,
}: {
  item: (typeof CONTACT_ITEMS)[number];
  onClick: () => void;
  role?: string;
  tabIndex?: number;
}) {
  return (
    <a
      href={item.href}
      role={role}
      tabIndex={tabIndex}
      {...(item.external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className={`header-contact__item header-contact__item--${item.id}`}
      onClick={onClick}
    >
      <span
        className={`header-contact__item-icon header-contact__item-icon--${item.iconTone}`}
        aria-hidden="true"
      >
        <item.Icon className="h-[1.125rem] w-[1.125rem]" />
      </span>
      <span className="header-contact__item-text">
        <span className="header-contact__item-title">{item.title}</span>
        <span className="header-contact__item-desc">{item.description}</span>
      </span>
    </a>
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
        strokeWidth={1.75}
        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  );
}

function ChevronIcon({ className }: Readonly<{ className?: string }>) {
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
        d="M19 9l-7 7-7-7"
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
