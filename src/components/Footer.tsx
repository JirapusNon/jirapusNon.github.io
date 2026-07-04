import Link from "next/link";
import { brands, inkTypes } from "@/lib/products";
import { CONTACT, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-rule bg-paper">
      <div className="cmyk-strip" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center border border-ink text-sm font-bold text-ink">
              R
            </span>
            <span className="font-heading text-base font-semibold text-ink">{SITE_NAME}</span>
          </div>
          <p className="text-sm leading-relaxed text-graphite">
            หมึกและอุปกรณ์สำนักงานครบทุกยี่ห้อ สต็อกพร้อมส่ง
            ช่วย SME หา ink ตรงรุ่นเครื่องพิมพ์ได้เร็ว
          </p>
        </div>

        <div>
          <h3 className="spec-label mb-3">ยี่ห้อเครื่องพิมพ์</h3>
          <ul className="space-y-2 text-sm text-graphite">
            {brands.map((brand) => (
              <li key={brand}>
                <Link
                  href={`/products?brand=${encodeURIComponent(brand)}`}
                  className="cursor-pointer underline-offset-2 transition duration-200 hover:text-accent hover:underline"
                >
                  หมึก {brand}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="spec-label mb-3">ประเภทหมึก</h3>
          <ul className="space-y-2 text-sm text-graphite">
            {inkTypes.map((type) => (
              <li key={type}>
                <Link
                  href={`/products?type=${encodeURIComponent(type)}`}
                  className="cursor-pointer underline-offset-2 transition duration-200 hover:text-accent hover:underline"
                >
                  {type}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div id="about">
          <h3 className="spec-label mb-3">ติดต่อเรา</h3>
          <ul className="space-y-2 text-sm text-graphite">
            <li>
              โทร:{" "}
              <a
                href={CONTACT.phoneHref}
                className="cursor-pointer underline-offset-2 transition duration-200 hover:text-accent hover:underline"
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
                className="cursor-pointer underline-offset-2 transition duration-200 hover:text-accent hover:underline"
              >
                {CONTACT.lineId}
              </a>
            </li>
            <li>{CONTACT.address}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 items-center justify-center border border-line px-3 text-xs font-medium text-line transition duration-200 hover:bg-line hover:text-white"
              aria-label="LINE"
            >
              LINE
            </a>
            <a
              href={CONTACT.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 items-center justify-center border border-graphite/30 px-3 text-xs font-medium text-graphite transition duration-200 hover:border-graphite hover:text-ink"
              aria-label="Facebook"
            >
              FB
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-rule py-4 text-center text-xs text-graphite">
        © {new Date().getFullYear()} {SITE_NAME} สงวนลิขสิทธิ์
      </div>
    </footer>
  );
}
