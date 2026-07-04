import { brands } from "@/lib/products";

const stats = [
  { value: "500+", label: "รุ่นสินค้า" },
  { value: `${brands.length}+`, label: "แบรนด์" },
  { value: "ส่งทั่วไทย", label: "จัดส่ง" },
  { value: "รับประกัน", label: "คุณภาพ" },
];

export default function TrustStats() {
  return (
    <section id="about" className="border-b border-border-subtle bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-graphite">
          {stats.map((stat) => (
            <span key={stat.label} className="inline-flex items-center gap-1.5">
              <span className="font-heading font-semibold text-ink">{stat.value}</span>
              {stat.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
