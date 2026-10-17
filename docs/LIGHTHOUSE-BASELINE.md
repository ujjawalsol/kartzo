# Kartzo Shopify Theme — Lighthouse Baseline Audit Report

**Storefront URL:** [https://kartzo.shop/](https://kartzo.shop/)  
**Environment:** Live Shopify Production Storefront (Theme: `kartzo-theme-dev` branch synced to Shopify)  
**Audit Tool:** Google Lighthouse v12.4.0 (Chromium headless, no-sandbox, clean profile)  
**Audit Date:** 18-10-2026  
**Audited Pages:**
1. **Homepage:** `https://kartzo.shop/`
2. **Collection Page:** `https://kartzo.shop/collections/all`
3. **Product Page:** `https://kartzo.shop/products/id116-plus-smart-fitness-smartwatch`

---

## 1. Baseline Scores Summary Table

| Device | Page | Performance | Accessibility | Best Practices | SEO |
|---|---|:---:|:---:|:---:|:---:|
| **Desktop** | **Homepage (`/`)** | 82 | 97 | 73 | 100 |
| **Desktop** | **Collection (`/collections/all`)** | 87 | 95 | 73 | 92 |
| **Desktop** | **Product (`/products/...`)** | 89 | 91 | 73 | 92 |
| **Mobile** | **Homepage (`/`)** | 47 | 93 | 73 | 100 |
| **Mobile** | **Collection (`/collections/all`)** | 48 | 95 | 73 | 92 |
| **Mobile** | **Product (`/products/...`)** | 53 | 92 | 73 | 92 |

---

## 2. Core Web Vitals Baseline Metrics

| Device | Page | FCP | LCP | TBT | CLS | Speed Index |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **Desktop** | Homepage | 0.8 s | 1.8 s | 250 ms | 0.002 | 1.3 s |
| **Desktop** | Collection | 1.3 s | 1.4 s | 190 ms | 0.002 | 1.3 s |
| **Desktop** | Product | 1.3 s | 1.5 s | 110 ms | 0.001 | 1.5 s |
| **Mobile** | Homepage | 3.4 s | 8.6 s | 810 ms | 0.000 | 4.5 s |
| **Mobile** | Collection | 2.5 s | 6.6 s | 1,200 ms | 0.000 | 3.7 s |
| **Mobile** | Product | 3.0 s | 6.2 s | 740 ms | 0.001 | 4.2 s |

---

## 3. Detailed Failing Audits by Category

### A. Accessibility Failures (Baseline Scores: 91 – 97 / 100)
1. **`color-contrast` (Weight: 7)**
   - Text elements using muted gray `#7d8aa3` on white `#ffffff` had a contrast ratio of 3.48:1 (WCAG AA requires minimum 4.5:1).
   - Breadcrumb links and subtext in product cards, category labels, and footer links failed the contrast threshold.
   - Tailwind `text-slate-400` on white produced 3.8:1 contrast in certain section labels.
2. **`target-size` (Weight: 5, Mobile only)**
   - The `.hero-dot` carousel navigation dots on mobile were 30×30px, failing the Lighthouse 48×48px mobile touch target guideline.
3. **`heading-order` (Weight: 3)**
   - Collection page skipped heading levels: navigated from `<h1>` (Collection Title) directly into `<h3>` (Product Card Titles) without an intermediate `<h2>`.
   - Footer section utilized `<h3>` for column titles below an `<h1>` without an intervening `<h2>`.
4. **`image-alt` (Weight: 10)**
   - Certain vendor product descriptions (`product.description`) embedded rich text `<img>` tags that lacked `alt` attributes, triggering accessibility warnings on product templates.

### B. SEO Failures (Baseline Scores: 92 – 100 / 100)
1. **`meta-description` (Weight: 3)**
   - Collection and product pages lacking explicit admin metafield descriptions had empty `<meta name="description" content="">` tags, lowering collection and product SEO scores from 100 to 92.
2. **`crawlable-anchors` / internal navigation**
   - Certain dynamic link elements lacked standard fallback hrefs, requiring explicit anchor paths for search crawlers.

### C. Best Practices Failures (Baseline Scores: 73 / 100 across all pages)
1. **`image-aspect-ratio`**
   - The logo asset (`assets/logo.webp`) had rendered dimensions of 140×44px with hardcoded HTML intrinsic attributes `width="541" height="168"`, causing an aspect ratio mismatch warning (rendered aspect ratio 3.18 vs natural 1.78).
2. **`third-party-cookies` & `inspector-issues`**
   - Flagged by Lighthouse across all pages: `https://shop.app/pay/hop?analytics_trace_id=...` sets third-party tracking/payment cookies without explicit `SameSite=None; Secure` flags.
   - Injected exclusively by Shopify's core `content_for_header` pipeline for Shop Pay accelerated checkout.

### D. Performance Bottlenecks (Baseline Scores: 47 – 53 Mobile, 82 – 89 Desktop)
1. **Largest Contentful Paint (LCP):**
   - On Mobile, LCP was 8.6s on Homepage and 6.6s on Collection. The hero image was loaded through standard CSS carousel sequencing without `<link rel="preload">` priority hints.
2. **Total Blocking Time (TBT):**
   - Mobile TBT reached 1,200ms on Collection and 810ms on Homepage under Lantern simulated 4x CPU slowdown.
   - Long tasks originated from Shopify's injected platform scripts:
     - `wpm.js` (Web Pixel Manager, ~83 KB)
     - `shopify-perf-kit.js` (~27 KB)
     - `trekkie.js` (~35 KB)
     - Monorail analytics telemetry batch requests.
3. **Cumulative Layout Shift (CLS):**
   - Already near-perfect (0.000 to 0.002) due to strict responsive container aspect ratios, but required safeguard preloading to prevent hero font swap shifts.

---

## 4. Baseline Artifacts Available in Repository
- `docs/baseline-desktop-home.json` (Desktop Homepage Lighthouse JSON)
- `docs/baseline-mobile-home.json` (Mobile Homepage Lighthouse JSON)
- `docs/baseline-desktop-collection.json` (Desktop Collection Lighthouse JSON)
- `docs/baseline-mobile-collection.json` (Mobile Collection Lighthouse JSON)
- `docs/baseline-desktop-product.json` (Desktop Product Lighthouse JSON)
- `docs/baseline-mobile-product.json` (Mobile Product Lighthouse JSON)
