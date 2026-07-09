'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton({
  fallbackHref = '/products',
  variant = 'navy',
  compact = false,
}: {
  fallbackHref?: string;
  variant?: 'dark' | 'light' | 'accent' | 'navy';
  compact?: boolean;
}) {
  const router = useRouter();

  function handleBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`back-button back-button--${variant}${compact ? ' back-button--compact' : ''} group`}
      aria-label="ย้อนกลับ"
    >
      <span className="back-button__icon">
        <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-0.5" aria-hidden="true" />
      </span>
      {!compact && <span>ย้อนกลับ</span>}
    </button>
  );
}
