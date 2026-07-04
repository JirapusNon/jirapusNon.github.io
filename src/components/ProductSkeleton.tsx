export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden border border-rule bg-card">
      <div className="cmyk-strip" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="skeleton aspect-square w-full" />
      <div className="flex flex-col gap-2 border-t border-rule-subtle p-3 sm:p-4">
        <div className="skeleton h-2.5 w-1/4 rounded-sm" />
        <div className="skeleton h-4 w-full rounded-sm" />
        <div className="skeleton h-3 w-2/3 rounded-sm" />
        <div className="skeleton mt-2 h-5 w-1/3 rounded-sm" />
      </div>
    </div>
  );
}

export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
