'use client';

import { ChevronDown, SlidersHorizontal, Truck, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
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

function FilterClearButton({ count, onReset }: { count: number; onReset: () => void }) {
  if (count === 0) return null;

  return (
    <button
      type="button"
      onClick={onReset}
      aria-label={`ล้างตัวกรองทั้งหมด ${count} รายการ`}
      className="catalog-filter-clear-btn catalog-filter-clear-btn--sidebar"
    >
      <X className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      ล้างตัวกรอง
      <span className="catalog-filter-clear-btn__count">{count}</span>
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
  const [typesOpen, setTypesOpen] = useState(true);
  const [brandsOpen, setBrandsOpen] = useState(true);
  const activeCount = filters.brands.length + filters.types.length;
  const hasActiveFilters = activeCount > 0;

  const content = (
    <div className="catalog-filter-body flex flex-col gap-5">
      <FilterCollapsibleGroup
        id="filter-types"
        title="ประเภทสินค้า"
        open={typesOpen}
        onToggle={() => setTypesOpen((value) => !value)}
        activeCount={filters.types.length}
      >
        <div className="catalog-filter-list">
          {inkTypes.map((type) => (
            <CheckboxOption
              key={type}
              label={type}
              checked={filters.types.includes(type)}
              onChange={() => onToggleType(type)}
            />
          ))}
        </div>
      </FilterCollapsibleGroup>

      <FilterCollapsibleGroup
        id="filter-brands"
        title="ยี่ห้อเครื่องพิมพ์"
        open={brandsOpen}
        onToggle={() => setBrandsOpen((value) => !value)}
        activeCount={filters.brands.length}
      >
        <div className="catalog-filter-list">
          {brands.map((brand) => (
            <CheckboxOption
              key={brand}
              label={brand}
              checked={filters.brands.includes(brand)}
              onChange={() => onToggleBrand(brand)}
            />
          ))}
        </div>
      </FilterCollapsibleGroup>

      <div className="catalog-filter-shipping flex items-center justify-center gap-1.5 rounded-lg border border-border bg-accent-50/50 px-3 py-2 text-center text-xs text-graphite">
        <Truck className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
        จัดส่งฟรีทั่วประเทศ
      </div>

      <FilterClearButton count={activeCount} onReset={onReset} />
    </div>
  );

  return (
    <>
      <div className="mb-4 lg:hidden">
        <div className="catalog-filter-mobile flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="catalog-filter-mobile__toggle flex min-w-0 flex-1 cursor-pointer items-center justify-between px-4 py-3"
            aria-expanded={mobileOpen}
          >
            <span className="flex items-center gap-2.5 text-sm font-semibold text-ink">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-cmyk-c" aria-hidden="true" />
              ตัวกรองสินค้า
              {hasActiveFilters && (
                <span className="catalog-filter-mobile__badge">{activeCount}</span>
              )}
            </span>
            <svg
              className={`h-4 w-4 shrink-0 text-graphite transition duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
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
        </div>
        {mobileOpen && (
          <div className="catalog-filter-mobile-panel mt-3 p-4">{content}</div>
        )}
      </div>

      <aside className="catalog-filter catalog-filter--sticky hidden w-72 shrink-0 lg:block">
        <div className="catalog-filter-head">
          <div className="catalog-filter-head__icon" aria-hidden="true">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-ink">ตัวกรองสินค้า</p>
            <p className="mt-0.5 text-xs text-graphite">เลือกประเภทและยี่ห้อที่ต้องการ</p>
          </div>
        </div>
        {content}
      </aside>
    </>
  );
}

function FilterCollapsibleGroup({
  id,
  title,
  open,
  onToggle,
  activeCount,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  activeCount: number;
  children: ReactNode;
}) {
  const panelId = `${id}-panel`;

  return (
    <section className="catalog-filter-group">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`catalog-filter-group__toggle${open ? '' : ' catalog-filter-group__toggle--collapsed'}`}
      >
        <span className="catalog-filter-group__toggle-left">
          <span className="catalog-filter-group__label">{title}</span>
          {activeCount > 0 ? (
            <span className="catalog-filter-group__count">{activeCount}</span>
          ) : null}
        </span>
        <ChevronDown className="catalog-filter-group__chevron" aria-hidden="true" />
      </button>

      <div
        id={panelId}
        className={`catalog-filter-group__panel${open ? '' : ' catalog-filter-group__panel--collapsed'}`}
      >
        <div className="catalog-filter-group__panel-inner">{children}</div>
      </div>
    </section>
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
    <label className="catalog-filter-option flex cursor-pointer items-center gap-2.5 px-2.5 py-2.5 text-sm text-secondary transition duration-200 hover:bg-muted/50">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="catalog-filter-checkbox"
      />
      <span className={checked ? 'catalog-filter-option__label catalog-filter-option__label--checked' : 'catalog-filter-option__label'}>
        {label}
      </span>
    </label>
  );
}
