import type { ReactNode } from 'react';

type SectionKickerVariant = 'cyan' | 'accent';

interface SectionKickerProps {
  children: ReactNode;
  variant?: SectionKickerVariant;
}

export default function SectionKicker({
  children,
  variant = 'cyan',
}: SectionKickerProps) {
  return (
    <p className={`section-kicker section-kicker--${variant}`}>
      <span className="section-kicker__line" aria-hidden="true" />
      <span className="section-kicker__label">
        <span className="section-kicker__text">{children}</span>
        <span className="section-kicker__mark" aria-hidden="true" />
      </span>
      <span className="section-kicker__line" aria-hidden="true" />
    </p>
  );
}
