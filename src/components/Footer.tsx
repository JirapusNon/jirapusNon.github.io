import Link from "next/link";
import { brands, inkTypes } from "@/lib/products";
import { BUSINESS, CONTACT, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-text">
      <div className="cmyk-strip" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-semibold text-on-primary">
              R
            </span>
            <span className="font-heading text-base font-semibold text-on-primary">
              {SITE_NAME}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-footer-muted">
            {BUSINESS.legalName} — จำหน่ายหมึกและอุปกรณ์สำนักงานครบทุกยี่ห้อ
            สต็อกพร้อมส่งจากคลังใน{CONTACT.addressShort}
          </p>
          <p className="mt-3 text-xs text-footer-muted">
            ออกใบกำกับภาษีได้ · {BUSINESS.paymentMethods.join(' · ')}
          </p>
        </div>

        <div>
          <h3 className="spec-label mb-3 text-accent-300">ยี่ห้อเครื่องพิมพ์</h3>
          <ul className="space-y-2 text-sm text-footer-muted">
            {brands.map((brand) => (
              <li key={brand}>
                <Link
                  href={`/products?brand=${encodeURIComponent(brand)}`}
                  className="cursor-pointer underline-offset-2 transition duration-200 hover:text-on-primary hover:underline"
                >
                  หมึก {brand}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="spec-label mb-3 text-accent-300">ประเภทหมึก</h3>
          <ul className="space-y-2 text-sm text-footer-muted">
            {inkTypes.map((type) => (
              <li key={type}>
                <Link
                  href={`/products?type=${encodeURIComponent(type)}`}
                  className="cursor-pointer underline-offset-2 transition duration-200 hover:text-on-primary hover:underline"
                >
                  {type}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div id="contact">
          <h3 className="spec-label mb-3 text-accent-300">ติดต่อเรา</h3>
          <ul className="space-y-2 text-sm text-footer-muted">
            <li>
              โทร:{" "}
              <a
                href={CONTACT.phoneHref}
                className="cursor-pointer text-footer-text underline-offset-2 transition duration-200 hover:text-on-primary hover:underline"
              >
                {CONTACT.phone}
              </a>
            </li>
            <li>
              LINE:{" "}
              <a
                href={CONTACT.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-footer-text underline-offset-2 transition duration-200 hover:text-on-primary hover:underline"
              >
                {CONTACT.lineId}
              </a>
            </li>
            <li>
              อีเมล:{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="cursor-pointer text-footer-text underline-offset-2 transition duration-200 hover:text-on-primary hover:underline"
              >
                {CONTACT.email}
              </a>
            </li>
            <li>{CONTACT.address}</li>
            <li>{BUSINESS.hours}</li>
            <li>{BUSINESS.shippingPartners.join(' · ')}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line-solid px-3 py-2 text-xs"
              aria-label="LINE"
            >
              LINE
            </a>
            <a
              href={CONTACT.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-on-dark px-3 py-2 text-xs"
              aria-label="Facebook"
            >
              FB
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-footer-border bg-footer-surface py-4 text-center text-xs text-footer-muted">
        © {new Date().getFullYear()} {BUSINESS.legalName} · {SITE_NAME} สงวนลิขสิทธิ์
      </div>
    </footer>
  );
}
