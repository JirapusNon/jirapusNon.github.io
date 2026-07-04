import type { Brand, InkType } from "./products";

interface BrandTheme {
  accentBar: string;
  iconBg: string;
  iconText: string;
}

const BRAND_THEMES: Record<Brand, BrandTheme> = {
  HP: { accentBar: "bg-blue-500", iconBg: "bg-blue-50", iconText: "text-blue-700" },
  Canon: { accentBar: "bg-red-500", iconBg: "bg-red-50", iconText: "text-red-700" },
  Epson: { accentBar: "bg-emerald-500", iconBg: "bg-emerald-50", iconText: "text-emerald-700" },
  Brother: { accentBar: "bg-violet-500", iconBg: "bg-violet-50", iconText: "text-violet-700" },
  Samsung: { accentBar: "bg-sky-500", iconBg: "bg-sky-50", iconText: "text-sky-700" },
  Ricoh: { accentBar: "bg-orange-500", iconBg: "bg-orange-50", iconText: "text-orange-700" },
  "Fuji Xerox": { accentBar: "bg-slate-500", iconBg: "bg-slate-100", iconText: "text-slate-700" },
  Lexmark: { accentBar: "bg-teal-500", iconBg: "bg-teal-50", iconText: "text-teal-700" },
  Kyocera: { accentBar: "bg-amber-500", iconBg: "bg-amber-50", iconText: "text-amber-700" },
  Pantum: { accentBar: "bg-indigo-500", iconBg: "bg-indigo-50", iconText: "text-indigo-700" },
};

const FALLBACK_THEMES: BrandTheme[] = [
  { accentBar: "bg-amber-500", iconBg: "bg-amber-50", iconText: "text-amber-700" },
  { accentBar: "bg-cyan-500", iconBg: "bg-cyan-50", iconText: "text-cyan-700" },
  { accentBar: "bg-rose-500", iconBg: "bg-rose-50", iconText: "text-rose-700" },
  { accentBar: "bg-lime-500", iconBg: "bg-lime-50", iconText: "text-lime-700" },
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getBrandTheme(brand: string): BrandTheme {
  const known = BRAND_THEMES[brand as Brand];
  if (known) return known;
  return FALLBACK_THEMES[hashString(brand) % FALLBACK_THEMES.length];
}

interface Badge {
  bg: string;
  text: string;
  label: string;
}

const TYPE_BADGES: Record<InkType, Badge> = {
  "หมึกแท้": { bg: "bg-accent-50", text: "text-accent-700", label: "แท้" },
  "หมึกเทียบเท่า": { bg: "bg-sky-50", text: "text-cmyk-c", label: "เทียบเท่า" },
  "หมึกเติม": { bg: "bg-amber-50", text: "text-amber-700", label: "หมึกเติม" },
  "โทนเนอร์": { bg: "bg-slate-100", text: "text-slate-700", label: "โทนเนอร์" },
};

export function getTypeBadge(type: InkType): Badge {
  return TYPE_BADGES[type];
}

export function getStockBadge(inStock: boolean): Badge {
  return inStock
    ? { bg: "bg-emerald-50", text: "text-emerald-700", label: "สต็อกพร้อมส่ง" }
    : { bg: "bg-slate-100", text: "text-slate-500", label: "สินค้าหมด" };
}
