import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import ProductsClient from "@/components/ProductsClient";
import ProductGridSkeleton from "@/components/ProductSkeleton";

export const metadata: Metadata = {
  title: "สินค้าทั้งหมด",
  description:
    "ค้นหาและเลือกซื้อหมึกปริ้นเตอร์ทุกยี่ห้อ Epson, Canon, HP, Brother พร้อมตัวกรองยี่ห้อ รุ่นเครื่องพิมพ์ ประเภทหมึก และช่วงราคา",
};

export default function ProductsPage() {
  return (
    <div className="detail-page-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb toolbar — same pattern as the contact & product detail pages */}
        <div className="detail-toolbar-bar mb-6">
          <BackButton fallbackHref="/" variant="navy" compact />
          <span className="detail-toolbar__divider" aria-hidden="true" />
          <nav
            className="min-w-0 truncate text-xs sm:text-sm"
            aria-label="breadcrumb"
          >
            <Link
              href="/"
              className="cursor-pointer text-graphite underline-offset-2 hover:text-accent hover:underline"
            >
              หน้าแรก
            </Link>
            <span className="mx-2 text-graphite/50">/</span>
            <span className="font-medium text-ink" aria-current="page">
              แคตตาล็อกสินค้า
            </span>
          </nav>
        </div>

        {/* One unified card: a compact header section sits above the catalog on
            the same surface, so the header no longer competes as its own hero
            card and the products are the focus. The CMYK plate strip is kept as
            the card's top accent. Only the header block is clipped (rounded top
            + the strip); the catalog body stays unclipped so the sticky filter
            sidebar keeps working. */}
        <div className="catalog-page-card">
          <div className="catalog-page-card__top">
            <div className="cmyk-strip cmyk-strip-thin" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="catalog-page-card__header">
              <span className="contact-eyebrow">
                <span className="contact-eyebrow__dot" aria-hidden="true" />
                แคตตาล็อก
              </span>

              <h1 className="font-heading mt-3 text-2xl font-semibold text-ink sm:text-3xl">
                สินค้าทั้งหมด
              </h1>

              <p className="mt-2 max-w-lg text-sm text-graphite">
                ค้นหาและเลือกหมึกที่ตรงกับเครื่องพิมพ์ของคุณ
              </p>
            </div>
          </div>

          <div className="catalog-page-card__body">
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductsClient />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
