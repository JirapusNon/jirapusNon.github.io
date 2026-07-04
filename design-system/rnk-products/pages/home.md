# Page Override: Home (`/`)

> Rules here **override** `design-system/rnk-products/MASTER.md` for the homepage only.

---

## Section-Specific Rules

### Hero
- Full-width gradient: `#0F172A → #1E293B → #0C4A6E`
- Headline highlight span: `text-sky-300` (not violet)
- Decorative glass card (desktop): `border-white/15 bg-white/10`
- Trust bullets below CTA: max 3 items, `text-sky-100`

### TrustStats (`#about`)
- 2×2 grid mobile → 4 columns desktop
- Replace emoji icons with Lucide: `Printer`, `Building2`, `Truck`, `ShieldCheck`

### Brands (`#brands`)
- Centered layout, `max-w-5xl`
- Overline: "แบรนด์พาร์ทเนอร์" in uppercase tracking-widest
- Logo grid: 3 cols mobile, 5 cols desktop

### Featured Products
- Background: `--color-muted` at 60% opacity (`bg-muted/60`)
- Carousel: 8 featured items max from `getFeatured()`

### Catalog (`#catalog`)
- `scroll-mt-20` for sticky header offset
- FilterSidebar sticky at `top-20`
- Suspense fallback: ProductGridSkeleton

### Contact CTA (bottom)
- Centered, max-width description `max-w-md`
- Primary: LINE button · Secondary: phone outline button

## Anchor IDs

| ID | Section |
|----|---------|
| `#about` | TrustStats |
| `#brands` | Brand partners |
| `#catalog` | Product catalog |
