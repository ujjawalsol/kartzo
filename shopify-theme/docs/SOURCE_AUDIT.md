# SOURCE_AUDIT — Kartzo original site (read-only, Oct 2026)

Git: branch `shopify-theme-dev`, working tree clean at `89f27fe` before theme work.
Homepage entry: **`index.html`** (1061 lines; `<title>Kartzo — Everything You Need, At Better Prices</title>`);
all logos/nav `Home` links point to it; `scripts/build-home.mjs` explicitly protects it from regeneration.

## Stack
- Static multi-page site (28 HTML files), no framework/router/build. Optional generator:
  `node scripts/build-pages.mjs` → `shared.mjs` (704 lines: head/nav/drawer/footer/product data) +
  `icons.mjs` + `build-*.mjs`. `index.html` is hand-maintained visual truth, never overwritten.
- No `package.json`, lockfiles, `tailwind.config.js`, Vite, PostCSS. Zero build step.
- Styling: **Tailwind Play CDN, unpinned** (`https://cdn.tailwindcss.com`, resolves to latest 3.x at
  runtime) + inline `tailwind.config` (brand `#1A56F0/#123FBE/#1246D0/#0E1730/#4E5D78/#F4F8FF`,
  `Plus Jakarta Sans`, `shadow-card`) + `assets/kartzo.css` (255 lines, enhancement layer only —
  without the CDN the site collapses). **This is the #1 compatibility risk: production Shopify must
  use pre-compiled CSS.**
- JS: `assets/kartzo.js` (564 lines IIFE, no modules/fetch/storage): drawers, modal, toasts,
  qty steppers, gallery/swatches, pincode regex, coupon `KARTZO10`, hero autoplay, free-ship meter
  (threshold ₹499). Catalog filter/sort per-page inline scripts; cart/wishlist counts in-memory only.
- Data: 12 demo products + 10 categories hardcoded in `scripts/shared.mjs` (placeholder data —
  must NOT ship as store data). Prices in ₹ hardcoded.
- Fonts: Google Fonts `Plus Jakarta Sans` (+ `Inter` fallback in stack). Preconnect included.
- Assets: 31 local `.webp` (28 + 3 in `assets/hero/`); no image CDN, no analytics, no payment SDK.
  Only external hosts: `fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.tailwindcss.com`,
  footer social outlinks. No jQuery.
- Global shell on all 28 pages: announcement bar, sticky header (desktop grid + mobile app header
  with pills), `#mobile-menu-drawer`, mobile bottom nav, `#cart-drawer` (2 demo items ₹2799+₹3499),
  `#search-modal` (client-side substring filter only), footer, `data-*` hooks listed in PAGE_INVENTORY.

## Known defects carried as regression tests
1. `shared.mjs:productCard()` emits `.wish-btn` but global JS/CSS listen to `.wish` → card wishlist
   toggles never fire on generated pages (index uses `.wish`, works).
2. Global sticky-bar observes `#pdp-main-cta` but PDP emits `#sticky-pdp-bar` → global sticky never fires.
3. `page()` injects `assets/kartzo.js` twice (footer string + extra script slot).
4. Catalog price/stock filters are visual-only; sort is client-side over 12 hardcoded items.
5. Coupon `KARTZO10` is toast-only globally (cart page does a real 10% DOM calc — still not Shopify).
6. `site-max` class used but never defined (relies on block width).
7. `swatch-btn.active` uses invalid `ring:` property (dead declaration).
8. Placeholder social URLs, `Ticket #KZ-HELP-2819`, courier/pickup promises, hardcoded ₹ — all must go.
