export function ProductCardSkeleton() {
  return (
    <div className="flex flex-row overflow-hidden rounded-xl border border-border bg-card shadow-xs sm:flex-col">
      <div className="skeleton aspect-square w-28 shrink-0 bg-muted sm:w-full" />
      <div className="flex flex-1 flex-col gap-2 border-l border-border-subtle p-3 sm:border-l-0 sm:border-t sm:p-4">
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
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
