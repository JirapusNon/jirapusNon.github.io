'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, type AnimationEvent, type CSSProperties } from "react";

interface BrandLogoCardProps {
  href: string;
  label: string;
  logoSrc?: string;
  monogram: string;
  monogramBg: string;
  style?: CSSProperties;
}

export default function BrandLogoCard({
  href,
  label,
  logoSrc,
  monogram,
  monogramBg,
  style,
}: BrandLogoCardProps) {
  const [revealed, setRevealed] = useState(false);

  function handleAnimationEnd(event: AnimationEvent<HTMLAnchorElement>) {
    if (event.animationName === 'brands-fade-up') {
      setRevealed(true);
    }
  }

  return (
    <Link
      href={href}
      aria-label={`ดูสินค้า ${label}`}
      style={style}
      className={`brand-logo-card group${revealed ? ' brand-logo-card--revealed' : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <span className="brand-logo-card__logo">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 28vw, 140px"
            className="brand-logo-card__image object-contain"
          />
        ) : (
          <span
            className={`brand-logo-card__monogram flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold tracking-wide text-white sm:h-14 sm:w-14 ${monogramBg}`}
          >
            {monogram}
          </span>
        )}
      </span>
    </Link>
  );
}
