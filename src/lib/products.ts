import productsData from "@/data/products.json";

export type Brand =
  | "HP"
  | "Canon"
  | "Epson"
  | "Brother"
  | "Samsung"
  | "Ricoh"
  | "Fuji Xerox"
  | "Lexmark"
  | "Kyocera"
  | "Pantum";
export type InkType = "หมึกแท้" | "หมึกเทียบเท่า" | "หมึกเติม" | "โทนเนอร์";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  type: InkType;
  compatiblePrinters: string[];
  price: number;
  image: string;
  inStock: boolean;
  featured: boolean;
  color: string;
  volumeMl: number | null;
  createdAt: string;
  description: string;
}

export const products = productsData as Product[];

export const brands: Brand[] = [
  "HP",
  "Canon",
  "Epson",
  "Brother",
  "Samsung",
  "Ricoh",
  "Fuji Xerox",
  "Lexmark",
  "Kyocera",
  "Pantum",
];

export const inkTypes: InkType[] = ["หมึกแท้", "หมึกเทียบเท่า", "หมึกเติม", "โทนเนอร์"];

export function getBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelated(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.brand === product.brand ||
          p.compatiblePrinters.some((printer) =>
            product.compatiblePrinters.includes(printer)
          ))
    )
    .slice(0, limit);
}

export interface ProductFilters {
  query?: string;
  brands?: Brand[];
  types?: InkType[];
}

export type SortOption = "price-asc" | "price-desc" | "newest";

export function searchProducts(list: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.compatiblePrinters.some((printer) => printer.toLowerCase().includes(q))
    );
  });
}

export function filterProducts(filters: ProductFilters): Product[] {
  let result = products;

  if (filters.query) result = searchProducts(result, filters.query);
  if (filters.brands?.length) {
    result = result.filter((p) => filters.brands!.includes(p.brand));
  }
  if (filters.types?.length) {
    result = result.filter((p) => filters.types!.includes(p.type));
  }

  return result;
}

export function sortProducts(list: Product[], sort: SortOption): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
      return copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    default:
      return copy;
  }
}

export function formatPrice(price: number): string {
  return price.toLocaleString("th-TH");
}
