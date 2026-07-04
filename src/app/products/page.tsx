import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsClient from "@/components/ProductsClient";
import ProductGridSkeleton from "@/components/ProductSkeleton";

export const metadata: Metadata = {
  title: "สินค้าทั้งหมด",
  description:
    "ค้นหาและเลือกซื้อหมึกปริ้นเตอร์ทุกยี่ห้อ Epson, Canon, HP, Brother พร้อมตัวกรองยี่ห้อ รุ่นเครื่องพิมพ์ ประเภทหมึก และช่วงราคา",
};

export default function ProductsPage() {
  return (
    <div className="page-canvas mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-4 text-xs text-graphite">
        <Link href="/" className="cursor-pointer underline-offset-2 hover:text-accent hover:underline">
          หน้าแรก
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">แคตตาล็อกสินค้า</span>
      </nav>

      <p className="spec-label">แคตตาล็อก</p>
      <h1 className="font-heading mt-2 text-2xl font-semibold text-ink sm:text-3xl">
        สินค้าทั้งหมด
      </h1>
      <p className="mt-2 max-w-lg text-sm text-graphite">
        ค้นหาและเลือกหมึกที่ตรงกับเครื่องพิมพ์ของคุณ
      </p>

      <div className="cmyk-strip mt-6" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="mt-8">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsClient />
        </Suspense>
      </div>
    </div>
  );
}
