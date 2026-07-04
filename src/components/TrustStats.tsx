import { brands } from "@/lib/products";

const stats = [
  { value: "500+", label: "รุ่นสินค้า" },
  { value: `${brands.length}+`, label: "แบรนด์" },
  { value: "ส่งทั่วไทย", label: "จัดส่ง" },
  { value: "รับประกัน", label: "คุณภาพ" },
];

export default function TrustStats() {
  return (
    <section id="about" className="border-b border-rule bg-card">
      <div className="mx-auto max-w-7xl px-4 py-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-graphite">
          {stats.map((stat, i) => (
            <span key={stat.label}>
              {i > 0 && <span className="mx-3 text-rule" aria-hidden="true">·</span>}
              <span className="font-heading font-semibold text-ink">{stat.value}</span>
              {" "}
              {stat.label}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
