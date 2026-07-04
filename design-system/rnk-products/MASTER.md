# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/rnk-products/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** RNK Products
**Category:** B2B/B2C E-commerce — หมึกปริ้นเตอร์ / office supplies
**Generated:** 2026-07-05
**Stack:** Next.js + Tailwind CSS v4 + shadcn/ui

---

## UI Style

**Name:** Clean Commerce + Trust & Authority

**Keywords:** Professional, trustworthy, product-focused, clean cards, social proof, B2B-ready

**Visual Language:**
- Light backgrounds as default — product images must stand out
- Navy/Slate = professionalism and trust
- Sky Blue = secondary actions, links, stats, filter active states
- LINE Green = conversion CTAs only (order / contact)
- Subtle shadows and 150–300ms transitions — no flashy motion

**Performance:** Excellent | **Accessibility:** WCAG AA minimum (AAA for body text)

---

## Page Pattern

**Name:** Feature-Rich Showcase + Trust

**Conversion Strategy:** Hero CTA above fold → trust stats → brand logos → featured products → full catalog with filters → contact CTA

**Section Order (Home):**
1. Hero (headline + dual CTA: catalog + LINE)
2. TrustStats (metrics bar)
3. Brand partners (logo grid)
4. Featured / best sellers (carousel)
5. Product catalog (filter sidebar + grid)
6. Contact CTA (LINE + phone)

**CTA Hierarchy:**
1. LINE Green — highest priority (สั่งซื้อ / ติดต่อ)
2. White on Navy — secondary (ดูสินค้าทั้งหมด)
3. Sky Blue — links, hover, active filter states

---

## Color Palette

### Semantic Tokens (use in components)

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Primary | `#0F172A` | `--color-primary` | Headings, logo, promo bars |
| On Primary | `#FFFFFF` | `--color-on-primary` | Text on primary surfaces |
| Secondary | `#334155` | `--color-secondary` | Subheadings, nav text |
| Accent | `#0369A1` | `--color-accent` | Links, stats, filter active, hover |
| Accent Hover | `#0284C7` | `--color-accent-hover` | Link/button hover |
| Background | `#F8FAFC` | `--color-background` | Page background |
| Foreground | `#020617` | `--color-foreground` | Body text |
| Muted | `#E8ECF1` | `--color-muted` | Subtle section backgrounds |
| Muted FG | `#64748B` | `--color-muted-foreground` | Captions, descriptions |
| Card | `#FFFFFF` | `--color-card` | Cards, sidebar, modals |
| Border | `#E2E8F0` | `--color-border` | Dividers, input borders |
| Destructive | `#DC2626` | `--color-destructive` | Errors, out-of-stock alerts |
| Ring | `#0F172A` | `--color-ring` | Focus rings |

**Color Notes:** Professional navy + sky blue accent. LINE green is a functional brand color, not a theme accent.

### Functional Colors (do not use as theme accent)

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| LINE | `#06C755` | `--color-line` | LINE CTA buttons |
| LINE Hover | `#05B04C` | `--color-line-hover` | LINE button hover |

### Primitive Scale (reference)

```
slate-900  #0F172A    slate-700  #334155    slate-500  #64748B
slate-100  #F1F5F9    slate-50   #F8FAFC
sky-700    #0369A1    sky-600    #0284C7    sky-300    #7DD3FC
```

### Hero Gradient

```css
/* Navy → deep blue — NOT purple/violet */
background: linear-gradient(to bottom, #0F172A, #1E293B, #0C4A6E);
/* Highlight text on hero: #7DD3FC (sky-300) */
```

### Brand Product Tints (ProductCard only)

Keep per-brand pastel backgrounds in `src/lib/theme.ts` (HP blue, Canon red, Epson green, etc.). Do not promote brand tints to global theme colors.

---

## Typography

### Font Pairing (Thai-optimized)

| Role | Font | Weight | Tailwind |
|------|------|--------|----------|
| Display / H1 | Sarabun | 700 | `font-heading font-bold` |
| Section / H2 | Sarabun | 600 | `font-heading font-semibold` |
| Card / H3 | IBM Plex Sans Thai | 600 | `font-semibold` |
| Body | IBM Plex Sans Thai | 400 | `font-normal` |
| Caption / Label | IBM Plex Sans Thai | 500 | `text-xs font-medium` |
| Price | IBM Plex Sans Thai | 700 | `font-bold` |
| Overline | IBM Plex Sans Thai | 500 | `text-xs uppercase tracking-widest` |

**Mood:** Professional, readable Thai, e-commerce conversion, trustworthy

**Google Fonts:**
```
Sarabun:           wght@400;500;600;700
IBM Plex Sans Thai: wght@300;400;500;600;700  (already in layout.tsx)
```

**CSS Variables:**
```css
--font-heading: var(--font-sarabun), 'Sarabun', sans-serif;
--font-body: var(--font-thai), 'IBM Plex Sans Thai', sans-serif;
--font-sans: var(--font-body);
```

### Type Scale

| Token | Size | Usage |
|-------|------|-------|
| `--text-display` | clamp(1.875rem, 4vw, 2.25rem) | Hero H1 |
| `--text-heading` | clamp(1.25rem, 2.5vw, 1.5rem) | Section H2 |
| `--text-title` | 1rem (16px) | Product name H3 |
| `--text-body` | 0.875rem (14px) | Mobile body |
| `--text-body-lg` | 1rem (16px) | Desktop body |
| `--text-caption` | 0.75rem (12px) | Badges, labels |

**Line Heights:** tight 1.25 (headings) · normal 1.5 (UI) · relaxed 1.625 (body)

---

## Spacing & Layout

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight gaps |
| `--space-sm` | 8px | Icon gaps |
| `--space-md` | 16px | Card padding, grid gap |
| `--space-lg` | 24px | Inner section padding |
| `--space-xl` | 32px | Component gaps |
| `--space-2xl` | 48px | Section padding mobile |
| `--space-3xl` | 64px | Section padding desktop |

**Container:** `max-w-7xl` (1280px) with `px-4 sm:px-6 lg:px-8`

**Border Radius:**
- Cards / sidebar: `rounded-2xl` (16px)
- Buttons: `rounded-full` (pill)
- Badges: `rounded-full`
- Inputs / modals: `rounded-xl` (12px)

---

## Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Default cards |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Hover cards |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | ProductCard hover, hero badges |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Command palette modal |

---

## Component Specs

### Header
- Background: `#FFFFFF` at 95% opacity + `backdrop-blur`
- Border bottom: `--color-border`
- Logo mark: `--color-primary` background, white text
- Nav links: `--color-secondary`, hover `--color-accent`
- Search bar: `--color-muted` background, `--color-border` border

### Hero
- Gradient: navy → deep blue (see Hero Gradient above)
- Badge: `bg-white/10`, text white/violet-100 → use `text-sky-100`
- Primary CTA: white bg, `--color-primary` text, `rounded-full`
- Secondary CTA: `--color-line` bg, white text

### TrustStats
- Background: white
- Value color: `--color-accent`
- Label color: `--color-muted-foreground`
- Icons: Lucide SVG (not emoji)

### ProductCard
- Border + subtle brand tint from `theme.ts`
- Image: `aspect-square`, hover scale 105%
- Body: white/60 overlay, price bold `--color-foreground`
- CTA: `--color-line` full-width button

### FilterSidebar
- Promo bar: `--color-primary` bg, white text
- Checkbox active: `--color-accent` text
- Reset button: outline `--color-border`, hover `--color-accent`

### Buttons

| Variant | Background | Text | Border | Radius |
|---------|-----------|------|--------|--------|
| LINE CTA | `--color-line` | white | none | full |
| Primary | white | `--color-primary` | none | full |
| Secondary | transparent | `--color-secondary` | `--color-border` | full |
| Ghost link | transparent | `--color-accent` | none | — |

**Transition:** `150–300ms ease` on all interactive states

---

## Key Effects

- Card hover: `translateY(-4px)` + shadow upgrade (200ms)
- Product image hover: `scale(1.05)` (300ms)
- Stat counter: optional count-up on scroll (respect reduced motion)
- No parallax, no scroll-snap, no layout-shifting scale on buttons

---

## Anti-Patterns (Do NOT Use)

- ❌ Purple/violet AI/SaaS gradients in hero (`#4C1D95`, `#C4B5FD`)
- ❌ Multiple competing accent colors (indigo + violet + sky simultaneously)
- ❌ Emojis as primary icons — use Lucide/Heroicons SVG
- ❌ Hard-coded hex in components — use CSS variables / Tailwind tokens
- ❌ Flat design without depth on product cards
- ❌ Playful/energetic block-based style (wrong audience)
- ❌ Rubik/Nunito/EB Garamond — poor or no Thai support
- ❌ Missing `cursor-pointer` on clickable elements
- ❌ Layout-shifting hovers
- ❌ Low contrast text (< 4.5:1)
- ❌ Instant state changes (no transition)
- ❌ Invisible focus states

---

## Pre-Delivery Checklist

- [ ] Colors use semantic tokens, not raw hex in JSX
- [ ] No emojis as icons (SVG only)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover/focus transitions 150–300ms
- [ ] Text contrast ≥ 4.5:1 (light mode)
- [ ] Focus states visible for keyboard nav
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] LINE green reserved for conversion CTAs only
- [ ] Brand tints scoped to ProductCard only

---

## Implementation Phases

| Phase | Task | Files |
|-------|------|-------|
| 1 | Semantic color + typography tokens | `globals.css` |
| 2 | Add Sarabun heading font | `layout.tsx` |
| 3 | Refactor Hero gradient + tokens | `page.tsx` |
| 4 | Map components to semantic tokens | Header, TrustStats, FilterSidebar, ProductCard |
| 5 | Replace emoji with Lucide icons | TrustStats, FilterSidebar |
| 6 | Sync shadcn/ui token aliases | if shadcn components added |
