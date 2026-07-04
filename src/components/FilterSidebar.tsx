'use client';

import { Truck, X } from 'lucide-react';
import { useState } from 'react';
import { brands, inkTypes, type Brand, type InkType } from '@/lib/products';

export interface FilterState {
  brands: Brand[];
  types: InkType[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onToggleBrand: (brand: Brand) => void;
  onToggleType: (type: InkType) => void;
  onReset: () => void;
}

function ClearFiltersControl({
  count,
  onReset,
  compact = false,
}: {
  count: number;
  onReset: () => void;
  compact?: boolean;
}) {
  if (count === 0) return null;

  return (
    <button
      type="button"
      onClick={onReset}
      aria-label={`ล้างตัวกรองทั้งหมด ${count} รายการ`}
      className={
        compact
          ? 'inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-accent transition duration-200 hover:bg-accent-50 hover:text-accent-hover'
          : 'inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-accent/20 bg-accent-50 px-2.5 py-1 text-xs font-semibold text-accent transition duration-200 hover:border-accent/35 hover:bg-accent-100'
      }
    >
      <X className="h-3 w-3 shrink-0" aria-hidden="true" />
      ล้างตัวกรอง
      <span className="rounded-full bg-accent px-1.5 py-px text-[10px] font-bold leading-none text-on-primary">
        {count}
      </span>
    </button>
  );
}

export default function FilterSidebar({
  filters,
  onToggleBrand,
  onToggleType,
  onReset,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeCount = filters.brands.length + filters.types.length;
  const hasActiveFilters = activeCount > 0;

  const content = (
    <div className="flex flex-col gap-5">
      {hasActiveFilters && (
        <div className="hidden items-center justify-between gap-2 rounded-lg bg-accent-50/70 px-2.5 py-2 lg:flex">
          <p className="text-xs text-accent-800">
            เลือก{' '}
            <span className="font-semibold">{activeCount}</span> ตัวกรอง
          </p>
          <ClearFiltersControl count={activeCount} onReset={onReset} compact />
        </div>
      )}

      <div>
        <h3 className="mb-2 text-sm font-semibold text-primary">ประเภทสินค้า</h3>
        <div className="grid grid-cols-2 gap-1.5">
          {inkTypes.map((type) => (
            <CheckboxOption
              key={type}
              label={type}
              checked={filters.types.includes(type)}
              onChange={() => onToggleType(type)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-primary">ยี่ห้อเครื่องพิมพ์</h3>
        <div className="grid grid-cols-2 gap-1.5">
          {brands.map((brand) => (
            <CheckboxOption
              key={brand}
              label={brand}
              checked={filters.brands.includes(brand)}
              onChange={() => onToggleBrand(brand)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 rounded-lg bg-accent-50 px-3 py-2 text-center text-xs font-medium text-accent-800">
        <Truck className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
        จัดส่งฟรีทั่วประเทศ
      </div>
    </div>
  );

  return (
    <>
      <div className="mb-4 lg:hidden">
        <div className="flex items-center gap-1 rounded-xl bg-card shadow-sm">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex min-w-0 flex-1 cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-secondary"
          >
            <span className="flex items-center gap-2">
              ตัวกรองสินค้า
              {hasActiveFilters && (
                <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-on-primary">
                  {activeCount}
                </span>
              )}
            </span>
            <svg
              className={`h-4 w-4 shrink-0 transition duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {hasActiveFilters && (
            <>
              <span className="h-5 w-px bg-border-subtle" aria-hidden="true" />
              <div className="pr-2">
                <ClearFiltersControl count={activeCount} onReset={onReset} compact />
              </div>
            </>
          )}
        </div>
        {mobileOpen && (
          <div className="mt-3 rounded-xl bg-card p-4 shadow-sm">{content}</div>
        )}
      </div>

      <aside className="sticky top-20 hidden h-fit w-80 shrink-0 rounded-xl bg-card p-5 shadow-sm lg:block">
        {content}
      </aside>
    </>
  );
}

function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 text-sm text-secondary transition duration-200 hover:bg-muted/60">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-navy-300 text-accent focus:ring-accent-400"
      />
      <span className={checked ? 'font-medium text-accent' : ''}>{label}</span>
    </label>
  );
}
