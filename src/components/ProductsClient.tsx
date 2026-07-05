'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterSidebar from './FilterSidebar';
import ProductGrid from './ProductGrid';
import {
  filterProducts,
  sortProducts,
  type Brand,
  type InkType,
  type Product,
} from '@/lib/products';
import { CONTACT } from '@/lib/constants';

const FILTER_DEBOUNCE_MS = 350;
const FADE_MS = 420;

function parseListParam<T extends string>(value: string | null): T[] {
  return value ? (value.split(',').filter(Boolean) as T[]) : [];
}

function toggleItem<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item];
}

function arraysEqual<T>(a: T[], b: T[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function isSameFilters(
  a: { brands: Brand[]; types: InkType[]; query: string },
  b: { brands: Brand[]; types: InkType[]; query: string }
) {
  return (
    arraysEqual(a.brands, b.brands) &&
    arraysEqual(a.types, b.types) &&
    a.query === b.query
  );
}

function computeFiltered(filters: {
  brands: Brand[];
  types: InkType[];
  query: string;
}): Product[] {
  return sortProducts(
    filterProducts({
      query: filters.query,
      brands: filters.brands.length ? filters.brands : undefined,
      types: filters.types.length ? filters.types : undefined,
    }),
    'newest'
  );
}

export default function ProductsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const initialBrands = parseListParam<Brand>(searchParams.get('brand'));
  const initialTypes = parseListParam<InkType>(searchParams.get('type'));
  const initialQuery = searchParams.get('q') ?? '';

  const [selectedBrands, setSelectedBrands] = useState<Brand[]>(initialBrands);
  const [selectedTypes, setSelectedTypes] = useState<InkType[]>(initialTypes);
  const [query, setQuery] = useState(initialQuery);

  const [appliedBrands, setAppliedBrands] = useState<Brand[]>(initialBrands);
  const [appliedTypes, setAppliedTypes] = useState<InkType[]>(initialTypes);
  const [appliedQuery, setAppliedQuery] = useState(initialQuery);

  const [resultsPhase, setResultsPhase] = useState<
    'idle' | 'fade-out' | 'fade-in'
  >('idle');
  const [resultsMinHeight, setResultsMinHeight] = useState<
    number | undefined
  >();

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const isInternalNavRef = useRef(false);

  const draftFilters = useMemo(
    () => ({ brands: selectedBrands, types: selectedTypes, query }),
    [selectedBrands, selectedTypes, query]
  );

  const appliedFilters = useMemo(
    () => ({ brands: appliedBrands, types: appliedTypes, query: appliedQuery }),
    [appliedBrands, appliedTypes, appliedQuery]
  );

  const displayedProducts = useMemo(
    () => computeFiltered(appliedFilters),
    [appliedFilters]
  );

  function updateParams(filters: {
    brands: Brand[];
    types: InkType[];
    query: string;
  }) {
    const params = new URLSearchParams(searchParams.toString());
    if (filters.query) params.set('q', filters.query);
    else params.delete('q');
    if (filters.brands.length) params.set('brand', filters.brands.join(','));
    else params.delete('brand');
    if (filters.types.length) params.set('type', filters.types.join(','));
    else params.delete('type');
    const qs = params.toString();
    isInternalNavRef.current = true;
    startTransition(() =>
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    );
  }

  function clearTimers() {
    if (debounceRef.current !== null) {
      globalThis.clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    if (fadeRef.current !== null) {
      globalThis.clearTimeout(fadeRef.current);
      fadeRef.current = null;
    }
  }

  function commitFilters(filters: {
    brands: Brand[];
    types: InkType[];
    query: string;
  }) {
    setAppliedBrands(filters.brands);
    setAppliedTypes(filters.types);
    setAppliedQuery(filters.query);
    updateParams(filters);
  }

  function scheduleFilterApply() {
    clearTimers();
    setResultsPhase('idle');
    setResultsMinHeight(undefined);

    debounceRef.current = globalThis.setTimeout(() => {
      debounceRef.current = null;

      const node = resultsRef.current;
      if (node) setResultsMinHeight(node.offsetHeight);

      setResultsPhase('fade-out');

      fadeRef.current = globalThis.setTimeout(() => {
        fadeRef.current = null;
        commitFilters(draftFilters);
        setResultsPhase('fade-in');

        globalThis.requestAnimationFrame(() => {
          setResultsPhase('idle');

          fadeRef.current = globalThis.setTimeout(() => {
            fadeRef.current = null;
            setResultsMinHeight(undefined);
          }, FADE_MS);
        });
      }, FADE_MS);
    }, FILTER_DEBOUNCE_MS);
  }

  useEffect(() => {
    if (isSameFilters(draftFilters, appliedFilters)) return;
    scheduleFilterApply();
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftFilters, appliedFilters]);

  useEffect(() => {
    if (isInternalNavRef.current) {
      isInternalNavRef.current = false;
      return;
    }

    clearTimers();
    setResultsPhase('idle');
    setResultsMinHeight(undefined);

    const nextBrands = parseListParam<Brand>(searchParams.get('brand'));
    const nextTypes = parseListParam<InkType>(searchParams.get('type'));
    const nextQuery = searchParams.get('q') ?? '';

    setSelectedBrands(nextBrands);
    setSelectedTypes(nextTypes);
    setQuery(nextQuery);
    setAppliedBrands(nextBrands);
    setAppliedTypes(nextTypes);
    setAppliedQuery(nextQuery);
  }, [searchParams]);

  useEffect(() => () => clearTimers(), []);

  function handleToggleBrand(brand: Brand) {
    setSelectedBrands((current) => toggleItem(current, brand));
  }

  function handleToggleType(type: InkType) {
    setSelectedTypes((current) => toggleItem(current, type));
  }

  function handleReset() {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setQuery('');
  }

  const activeFilterCount =
    (query.trim() ? 1 : 0) + selectedBrands.length + selectedTypes.length;
  const hasActiveFilters = activeFilterCount > 0;
  const isWaitingToApply = !isSameFilters(draftFilters, appliedFilters);
  const isResultsAnimating = resultsPhase !== 'idle';

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <FilterSidebar
        filters={{ brands: selectedBrands, types: selectedTypes }}
        onToggleBrand={handleToggleBrand}
        onToggleType={handleToggleType}
        onReset={handleReset}
      />

      <div className="flex-1 min-w-0">
        <div className="catalog-toolbar mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="catalog-toolbar__results">
            <p className="catalog-toolbar__count">
              พบสินค้าทั้งหมด{' '}
              <span className="catalog-toolbar__count-num">
                {displayedProducts.length}
              </span>{' '}
              รายการ
            </p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={handleReset}
                aria-label={`ล้างตัวกรองและคำค้นหาทั้งหมด ${activeFilterCount} รายการ`}
                className="catalog-toolbar__clear"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>ล้างตัวกรอง</span>
                <span className="catalog-toolbar__clear-count">
                  {activeFilterCount}
                </span>
              </button>
            ) : null}
          </div>
          <div className="catalog-search relative w-full sm:max-w-xs">
            <svg
              className="catalog-search__icon absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite"
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
              placeholder="ค้นหาสินค้า, รุ่น, แบรนด์..."
              className="catalog-search__input w-full rounded-full border py-2.5 pl-10 pr-9 text-sm outline-none transition duration-200"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="ล้างคำค้นหา"
                className="catalog-search__clear absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-graphite transition duration-200 hover:text-ink"
              >
                ✕
              </button>
            ) : null}
          </div>
        </div>

        <div
          ref={resultsRef}
          className={`catalog-results${resultsPhase !== 'idle' ? ` catalog-results--${resultsPhase}` : ''}`}
          style={resultsMinHeight ? { minHeight: resultsMinHeight } : undefined}
          aria-busy={isResultsAnimating || isWaitingToApply}
        >
          {displayedProducts.length === 0 ? (
            <div className="catalog-empty flex flex-col items-center gap-3 py-16 text-center">
              <p className="font-heading text-base font-semibold text-ink">
                ไม่พบสินค้าที่ตรงกับการค้นหา
              </p>
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
          ) : (
            <ProductGrid products={displayedProducts} columns={3} />
          )}
        </div>
      </div>
    </div>
  );
}
