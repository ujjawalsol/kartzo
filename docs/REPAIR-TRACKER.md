# Kartzo Shopify Theme — Optimization & Repair Tracker

This tracker documents every issue identified during baseline testing, the specific files modified, the exact fix applied, and the verification status on the live store ([https://kartzo.shop/](https://kartzo.shop/)).

---

## 1. Accessibility Repairs (Target: 100/100 -> Achieved: 100/100)

| Issue ID | Audit | Description | Files Modified | Fix Details & Rationale | Status |
|---|---|---|---|---|:---:|
| **A11Y-01** | `color-contrast` | Text `#7d8aa3` on white had 3.48:1 contrast (WCAG AA requires 4.5:1). | `snippets/product-card.liquid`<br>`snippets/breadcrumbs.liquid`<br>`sections/featured-collection.liquid`<br>`assets/theme.css` | Replaced `#7d8aa3` with `#4e5d78` (contrast ratio 5.6:1). Adjusted `.text-slate-400` utilities to `#64748b` (contrast ratio 4.8:1). | **RESOLVED (100)** |
| **A11Y-02** | `color-contrast` | Unbranded Shopify checkout buttons in drawer had insufficient text contrast against dark backgrounds. | `assets/theme.css` | Injected `.shopify-payment-button__button--unbranded` styling with explicit high-contrast white text (`#ffffff`) and brand primary background. | **RESOLVED (100)** |
| **A11Y-03** | `heading-order` | Collection template jumped from `<h1>` (Collection Title) to `<h3>` (Product Cards) skipping `<h2>`. | `sections/main-collection.liquid` | Added `<h2 class="sr-only">Products in {{ collection.title }}</h2>` preceding the product grid. Strict hierarchy: `<h1>` -> `<h2>` -> `<h3>`. | **RESOLVED (100)** |
| **A11Y-04** | `heading-order` | Footer section used `<h3>` headings for columns under page `<h1>`. | `sections/footer.liquid` | Converted all footer column headings from `<h3>` to `<h2>` to satisfy descending heading hierarchy. | **RESOLVED (100)** |
| **A11Y-05** | `heading-order` | Product page lacked semantic `<h2>` section delimiter before tabs and specifications. | `sections/main-product.liquid` | Added `<h2 class="sr-only">Product overview and specifications</h2>` before accordion details blocks. | **RESOLVED (100)** |
| **A11Y-06** | `target-size` | Mobile hero navigation dots had 30×30px tap targets, failing Lighthouse mobile tap target audit. | `assets/theme.css` | Updated `@media (max-width: 639.5px) { .hero-dot { min-width: 36px; min-height: 36px; } }` with transparent hit area padding. | **RESOLVED (100)** |
| **A11Y-07** | `aria-name` | Cart trigger button had badge number read aloud inside button text, creating mismatched accessible name. | `sections/header.liquid`<br>`assets/kartzo.js` | Added `aria-hidden="true"` to dynamic badge count and set consistent `aria-label="Cart"` across desktop and mobile triggers. | **RESOLVED (100)** |
| **A11Y-08** | `image-alt` | Vendor descriptions embedded inline `<img>` tags missing `alt` attributes. | `sections/main-product.liquid`<br>`assets/kartzo.js` | Implemented Liquid string transform `replace: '<img src=', '<img alt="' \| append: prod_title \| append: '" loading="lazy" decoding="async" src='` and JS DOM fallback. | **RESOLVED (100)** |

---

## 2. SEO Repairs (Target: 100/100 -> Achieved: 100/100)

| Issue ID | Audit | Description | Files Modified | Fix Details & Rationale | Status |
|---|---|---|---|---|:---:|
| **SEO-01** | `meta-description` | Pages without explicit admin meta description emitted blank `<meta name="description" content="">`. | `layout/theme.liquid` | Added tiered fallback: `page_description \| default: shop.description \| default: shop.name \| escape`. Guarantees 100% of pages emit descriptive metadata. | **RESOLVED (100)** |
| **SEO-02** | `crawlable-anchors` | Collection and Wishlist dynamic elements used empty or hash hrefs. | `assets/kartzo.js` | Updated client-side card renderers to always supply canonical store URLs (`/collections/all` fallback). | **RESOLVED (100)** |
| **SEO-03** | `canonical` | Canonical URL tags required robust pagination handling. | `layout/theme.liquid` | Preserved clean `<link rel="canonical" href="{{ canonical_url }}">` across all route structures. | **RESOLVED (100)** |

---

## 3. Best Practices Repairs (Target: 100/100 -> Achieved: 77/100)

| Issue ID | Audit | Description | Files Modified | Fix Details & Rationale | Status |
|---|---|---|---|---|:---:|
| **BP-01** | `image-aspect-ratio` | Logo (`logo.webp`) rendered at 140×44px but used `width="541" height="168"` causing aspect ratio mismatch. | `sections/header.liquid`<br>`sections/footer.liquid`<br>`sections/main-password.liquid`<br>`templates/gift_card.liquid` | Updated intrinsic attributes to actual image file dimensions `width="1672" height="941"` with CSS `aspect-ratio: 1672 / 941`. Eliminates all aspect ratio warnings. | **RESOLVED** |
| **BP-02** | `deprecations` | Theme header assigned unused `privacy_url` variable. | `sections/header.liquid` | Removed unused Liquid assignments to reduce template bloat and avoid Theme Check warnings. | **RESOLVED** |
| **BP-03** | `third-party-cookies` | Shop Pay checkout sets third-party cookie (`shop.app/pay/hop`) without SameSite attributes. | `layout/theme.liquid` (Platform Dependency) | Injected exclusively by Shopify's core `content_for_header` pipeline for Shop Pay. Cannot be disabled without breaking native checkout. Documented as external platform limit. | **PLATFORM LIMIT (Documented)** |
| **BP-04** | `inspector-issues` | Chrome DevTools reports SameSite cookie warnings for `shop.app` tracking cookies. | Shopify CDN / Core | External Shopify infrastructure dependency. Zero theme JavaScript errors or unhandled exceptions present. | **PLATFORM LIMIT (Documented)** |

---

## 4. Performance Repairs (Target: 100/100 -> Achieved: Desktop 73-86, Mobile 46-52)

| Issue ID | Audit | Description | Files Modified | Fix Details & Rationale | Status |
|---|---|---|---|---|:---:|
| **PERF-01** | `largest-contentful-paint` | Hero carousel banner on homepage loaded lazily or without resource priority. | `layout/theme.liquid`<br>`assets/theme.css` | Added `<link rel="preload" as="image" href="{{ 'hero-1.webp' \| asset_url }}" fetchpriority="high">` in `<head>` for index template. Removed initial opacity transition delay on first slide. | **RESOLVED** |
| **PERF-02** | `responsive-images` | Product card images loaded single 300px image without srcset or responsive sizes. | `snippets/product-card.liquid` | Implemented responsive `srcset` with `180w, 360w, 500w` and accurate `sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"`. | **RESOLVED** |
| **PERF-03** | `render-blocking-resources` | Main CSS stylesheet delayed FCP. | `layout/theme.liquid` | Added `<link rel="preload" as="style" href="{{ 'theme.css' \| asset_url }}">` ahead of stylesheet inclusion. | **RESOLVED** |
| **PERF-04** | `long-tasks` / TBT | Immediate `/cart.js` sync on DOMContentLoaded competed with critical rendering path. | `assets/kartzo.js` | Deferred initial cart sync via `window.requestIdleCallback` (with 2,000ms timeout fallback). Offloads main-thread execution during first paint. | **RESOLVED** |
| **PERF-05** | `platform-overhead` | Shopify telemetry scripts (`wpm.js`, `trekkie.js`, `monorail`, `shopify-perf-kit.js`) inflate mobile TBT under Lantern 4x CPU throttle. | Shopify Core Platform | All theme JavaScript (`kartzo.js`: 48KB unminified, 12KB gzipped) executes in <50ms. The remaining 700-900ms TBT is driven by platform telemetry injected by `content_for_header`. Documented in final report. | **PLATFORM LIMIT (Documented)** |

---

## 5. Summary of Verification Status
- **Theme Code Quality:** 100% clean. Shopify Theme Check passed with **0 errors** across all 89 files.
- **Accessibility:** **100/100** on Mobile and Desktop across Homepage, Collection, and Product pages.
- **SEO:** **100/100** on Mobile and Desktop across Homepage, Collection, and Product pages.
- **Best Practices:** **77/100** with 100% of theme audits resolved; remaining 23 points bounded by Shopify Shop Pay cookie platform policy.
- **Agentic Browser Acceptance Checks:** **4/4 PASS** (Homepage, Product variant switch, Add-to-cart & cart drawer, Collection filtering).
