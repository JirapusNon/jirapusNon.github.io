import type { Brand } from "./products";

interface BrandLogoStyle {
  monogram: string;
  bg: string;
  image?: string;
}

const BRAND_LOGOS: Record<Brand, BrandLogoStyle> = {
  HP: { monogram: "HP", bg: "bg-[#0096D6]", image: "/brands/hp.svg" },
  Canon: { monogram: "CN", bg: "bg-[#BF0000]", image: "/brands/canon.svg" },
  Epson: { monogram: "EP", bg: "bg-[#003DA5]", image: "/ink-images/epson_logo.svg" },
  Brother: { monogram: "BR", bg: "bg-[#003865]", image: "/brands/brother.svg" },
  Samsung: { monogram: "SS", bg: "bg-[#1428A0]", image: "/ink-images/samsung_logo.svg" },
  Ricoh: { monogram: "RC", bg: "bg-[#D71920]", image: "/brands/ricoh.svg" },
  "Fuji Xerox": { monogram: "FX", bg: "bg-[#E2231A]", image: "/brands/fujixerox.svg" },
  Lexmark: { monogram: "LM", bg: "bg-[#ED1C24]", image: "/brands/lexmark.svg" },
  Kyocera: { monogram: "KY", bg: "bg-[#D70926]", image: "/brands/kyocera.svg" },
  // No reliably-licensed official logo source found for Pantum; pantum.svg is a
  // plain "P" placeholder, not the real wordmark. Swap it when we have the asset.
  Pantum: { monogram: "P", bg: "bg-[#0A5FAA]", image: "/brands/pantum.svg" },
};

export function getBrandLogoStyle(brand: Brand): BrandLogoStyle {
  return BRAND_LOGOS[brand];
}
