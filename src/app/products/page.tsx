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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-xl font-bold text-primary sm:text-2xl">สินค้าทั้งหมด</h1>
      <p className="mt-1 text-sm text-muted-foreground">ค้นหาและเลือกดูหมึกปริ้นเตอร์ที่ตรงกับเครื่องพิมพ์ของคุณ</p>
      <div className="mt-6">
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsClient />
        </Suspense>
      </div>
    </div>
  );
}
