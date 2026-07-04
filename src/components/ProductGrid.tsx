import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
}

export default function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const colsClass = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${colsClass}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
