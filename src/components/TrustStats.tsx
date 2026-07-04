import { Building2, Printer, ShieldCheck, Truck } from "lucide-react";
import { brands } from "@/lib/products";

const stats = [
  { icon: Printer, value: "500+", label: "รุ่นสินค้า" },
  { icon: Building2, value: `${brands.length}+`, label: "แบรนด์ชั้นนำ" },
  { icon: Truck, value: "ส่งฟรี", label: "ทั่วประเทศ" },
  { icon: ShieldCheck, value: "รับประกัน", label: "คุณภาพทุกชิ้น" },
];

export default function TrustStats() {
  return (
    <section id="about" className="border-b border-border-subtle bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 rounded-xl bg-muted/40 px-3 py-5 text-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-50">
              <stat.icon
                className="h-5 w-5 text-accent"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </div>
            <div className="font-heading text-xl font-bold text-primary sm:text-2xl">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground sm:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
