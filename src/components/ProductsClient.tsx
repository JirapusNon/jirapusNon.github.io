"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import ProductGridSkeleton from "./ProductSkeleton";
import { filterProducts, sortProducts, type Brand, type InkType } from "@/lib/products";
import { CONTACT } from "@/lib/constants";

function parseListParam<T extends string>(value: string | null): T[] {
  return value ? (value.split(",").filter(Boolean) as T[]) : [];
}

function toggleItem<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}

export default function ProductsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedBrands = useMemo(
    () => parseListParam<Brand>(searchParams.get("brand")),
    [searchParams]
  );
  const selectedTypes = useMemo(
    () => parseListParam<InkType>(searchParams.get("type")),
    [searchParams]
  );

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [isPending, startTransition] = useTransition();

  function updateParams(patch: { q?: string; brand?: string[]; type?: string[] }) {
    const params = new URLSearchParams(searchParams.toString());
    if (patch.q !== undefined) {
      if (patch.q) params.set("q", patch.q);
      else params.delete("q");
    }
    if (patch.brand !== undefined) {
      if (patch.brand.length) params.set("brand", patch.brand.join(","));
      else params.delete("brand");
    }
    if (patch.type !== undefined) {
      if (patch.type.length) params.set("type", patch.type.join(","));
      else params.delete("type");
    }
    const qs = params.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  }

  useEffect(() => {
    updateParams({ q: query });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const filtered = useMemo(() => {
    const base = filterProducts({
      query,
      brands: selectedBrands.length ? selectedBrands : undefined,
      types: selectedTypes.length ? selectedTypes : undefined,
    });
    return sortProducts(base, "newest");
  }, [query, selectedBrands, selectedTypes]);

  function handleToggleBrand(brand: Brand) {
    updateParams({ brand: toggleItem(selectedBrands, brand) });
  }

  function handleToggleType(type: InkType) {
    updateParams({ type: toggleItem(selectedTypes, type) });
  }

  function handleReset() {
    setQuery("");
    updateParams({ q: "", brand: [], type: [] });
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <FilterSidebar
        filters={{ brands: selectedBrands, types: selectedTypes }}
        onToggleBrand={handleToggleBrand}
        onToggleType={handleToggleType}
        onReset={handleReset}
      />

      <div className="flex-1">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="spec-label shrink-0">พบ {filtered.length} รายการ</p>
          <div className="relative w-full max-w-xs">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหารุ่น, แบรนด์..."
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-8 text-sm shadow-xs outline-none transition duration-200 focus:border-accent-300 focus:ring-2 focus:ring-accent/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="ล้างคำค้นหา"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-graphite transition duration-200 hover:text-ink"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {isPending && <ProductGridSkeleton />}

        {!isPending && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card py-16 text-center shadow-xs">
            <p className="font-heading text-base font-semibold text-ink">ไม่พบสินค้าที่ตรงกับการค้นหา</p>
            <p className="max-w-sm text-sm text-graphite">
              ลองค้นหาด้วยรุ่นเครื่องพิมพ์ เช่น L3250 หรือบอกทีมงานให้ช่วยหา
            </p>
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-line-solid mt-2"
            >
              สอบถามผ่าน LINE
            </a>
          </div>
        )}

        {!isPending && filtered.length > 0 && <ProductGrid products={filtered} columns={3} />}
      </div>
    </div>
  );
}
