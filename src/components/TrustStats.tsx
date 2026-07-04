import { brands } from "@/lib/products";

const stats = [
  { value: "500+", label: "รุ่นหมึกและอุปกรณ์" },
  { value: `${brands.length}+`, label: "ยี่ห้อเครื่องพิมพ์" },
  { value: "ส่งทั่วไทย", label: "ครอบคลุมทุกจังหวัด" },
  { value: "รับประกัน", label: "คุณภาพทุกชิ้น" },
];

export default function TrustStats() {
  return (
    <section id="about" className="bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <ul className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-0">
          {stats.map((stat, index) => (
            <li
              key={stat.label}
              className={`text-center ${
                index % 2 === 1
                  ? "border-l border-border"
                  : index > 0
                    ? "sm:border-l sm:border-border"
                    : ""
              }`}
            >
              <p className="font-heading text-2xl font-semibold tabular-nums tracking-tight text-navy-900 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium text-secondary sm:text-sm">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="cmyk-strip" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
