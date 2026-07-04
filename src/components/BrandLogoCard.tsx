import Image from "next/image";
import Link from "next/link";

interface BrandLogoCardProps {
  href: string;
  label: string;
  logoSrc?: string;
  monogram: string;
  monogramBg: string;
}

export default function BrandLogoCard({
  href,
  label,
  logoSrc,
  monogram,
  monogramBg,
}: BrandLogoCardProps) {
  return (
    <Link
      href={href}
      aria-label={`ดูสินค้า ${label}`}
      className="group flex aspect-[5/3] cursor-pointer items-center justify-center rounded-xl bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:rounded-xl sm:p-6"
    >
      <span className="relative h-12 w-full max-w-[140px] sm:h-14 sm:max-w-[160px] lg:h-16 lg:max-w-[180px]">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={`โลโก้ ${label}`}
            fill
            sizes="(max-width: 640px) 140px, 180px"
            className="object-contain opacity-90 transition duration-200 group-hover:opacity-100"
          />
        ) : (
          <span
            className={`mx-auto flex h-12 w-12 items-center justify-center rounded-lg text-sm font-bold tracking-wide text-white sm:h-14 sm:w-14 sm:text-base ${monogramBg}`}
          >
            {monogram}
          </span>
        )}
      </span>
    </Link>
  );
}
