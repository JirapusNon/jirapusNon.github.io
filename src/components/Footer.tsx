import Link from "next/link";
import { brands, inkTypes } from "@/lib/products";
import { CONTACT, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer id="contact" className="bg-primary text-accent-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-on-primary">
              R
            </span>
            <span className="font-heading text-base font-bold text-on-primary">{SITE_NAME}</span>
          </div>
          <p className="text-sm text-accent-200">
            ผู้จำหน่ายหมึกปริ้นเตอร์ครบทุกยี่ห้อ หมึกแท้ หมึกเทียบเท่า หมึกเติม และโทนเนอร์
            สต็อกพร้อมส่ง จัดส่งรวดเร็วทั่วประเทศ
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-on-primary">ยี่ห้อเครื่องพิมพ์</h3>
          <ul className="space-y-2 text-sm text-accent-200">
            {brands.map((brand) => (
              <li key={brand}>
                <Link
                  href={`/products?brand=${encodeURIComponent(brand)}`}
                  className="cursor-pointer transition duration-200 hover:text-accent-300"
                >
                  หมึก {brand}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-on-primary">ประเภทหมึก</h3>
          <ul className="space-y-2 text-sm text-accent-200">
            {inkTypes.map((type) => (
              <li key={type}>
                <Link
                  href={`/products?type=${encodeURIComponent(type)}`}
                  className="cursor-pointer transition duration-200 hover:text-accent-300"
                >
                  {type}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div id="about">
          <h3 className="mb-3 text-sm font-semibold text-on-primary">ติดต่อเรา</h3>
          <ul className="space-y-2 text-sm text-accent-200">
            <li>
              โทร:{" "}
              <a href={CONTACT.phoneHref} className="cursor-pointer transition duration-200 hover:text-accent-300">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              LINE:{" "}
              <a
                href={CONTACT.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition duration-200 hover:text-accent-300"
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
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-line text-xs font-bold text-white"
              aria-label="LINE"
            >
              LINE
            </a>
            <a
              href={CONTACT.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877F2] text-xs font-bold text-white"
              aria-label="Facebook"
            >
              FB
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-accent-200/70">
        © {new Date().getFullYear()} {SITE_NAME} สงวนลิขสิทธิ์
      </div>
    </footer>
  );
}
