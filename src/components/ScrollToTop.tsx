'use client';

import { useEffect, useState } from 'react';

const SHOW_AFTER_PX = 320;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(globalThis.scrollY > SHOW_AFTER_PX);
    }

    onScroll();
    globalThis.addEventListener('scroll', onScroll, { passive: true });
    return () => globalThis.removeEventListener('scroll', onScroll);
  }, []);

  function scrollToTop() {
    const reducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
    globalThis.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="เลื่อนขึ้นด้านบน"
      title="กลับขึ้นด้านบน"
      className={`scroll-to-top ${visible ? 'scroll-to-top--visible' : ''}`}
    >
      <ChevronUpIcon />
    </button>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M5 15l7-7 7 7" />
    </svg>
  );
}
