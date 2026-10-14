# REPAIR TRACKER — Kartzo Shopify Theme Forensic & Implementation Passes

## 1. Executive Summary & Forensic Repairs

This tracker records the confirmed defects, architectural anomalies, and comprehensive repairs implemented across the Kartzo Shopify theme source code.

---

## 2. Confirmed Defects & Resolutions

### Defect 1: Anomalous & Duplicate `collection.*.json` Templates
- **Discovery**: The theme archive contained 10 collection-prefixed templates for content pages (`collection.about.json`, `collection.faq.json`, `collection.tracking.json`, `collection.wishlist.json`, `collection.privacy-policy.json`, `collection.shipping-policy.json`, `collection.returns-policy.json`, `collection.terms-conditions.json`, `collection.cancellation-policy.json`, and `collection.deals.json`).
- **Impact**: In Shopify OS 2.0, collection templates are meant strictly for product catalog collections (`/collections/*`). Using collection templates for informational pages caused confusion in Shopify Admin template dropdowns and broke standard resource semantics.
- **Resolution**: Audited every template file. Verified that corresponding `templates/page.*.json` templates exist and function correctly. Safely removed all 10 obsolete duplicate `collection.*.json` files. Standard product collections are served cleanly by `templates/collection.json`. Full report documented in `docs/TEMPLATE-MAPPING-AUDIT.md`.

### Defect 2: Missing Customization for Header, Footer & Cards
- **Discovery**: In the Shopify Theme Editor sidebar, users could not customize individual cards on Deals and Categories pages, and the footer lacked modular OS 2.0 blocks. Header had no menu picker, and category pills on mobile had hardcoded queries (`?q=electronics`).
- **Impact**: Merchants were forced to edit code rather than using the visual Theme Customizer.
- **Resolution**:
  - `sections/header.liquid`: Added `menu` (`link_list`) setting, `logo_width` slider (80–260px), route overrides, and mobile category pills customization.
  - `sections/footer.liquid`: Converted to modular OS 2.0 blocks (`brand`, `link_list`, `text`, `newsletter`). Pre-populated 4 blocks in `sections/footer-group.json`. Removed misplaced `size-guide` from Shop Catalog and placed it under Customer Care. Removed broken `?q=electronics` query.
  - `sections/main-deals.liquid` & `templates/page.deals.json`: Pre-populated all 8 deal product cards as individual blocks with custom image upload pickers, titles, price overrides, and discount tags.
  - `sections/main-list-collections.liquid` & `templates/list-collections.json`: Pre-populated all 10 department cards with image upload pickers.
  - `sections/main-about.liquid` & `templates/page.about.json`: Value card blocks pre-populated; hero image picker and trust statistics strip made toggleable.

### Defect 3: Unverified Business Claims & Generic Social URLs
- **Discovery**: Real products had hardcoded `4.8` ratings in `product-card.liquid`. `settings_data.json` had generic placeholder social URLs (`https://facebook.com`, etc.) which rendered dummy outbound links. About page had unverified hardcoded metrics.
- **Impact**: Displayed unverified claims as store facts.
- **Resolution**:
  - `snippets/product-card.liquid`: Removed hardcoded `4.8` rating. Now checks real product review metafields (`metafields.reviews.rating.value`) and hides rating cleanly if unrated.
  - `config/settings_data.json`: Cleared generic placeholder social links (`""`).
  - `sections/footer.liquid`: Added conditional check so social icons are only rendered when a valid non-blank URL is provided.
  - `sections/main-about.liquid`: Added `show_stats` checkbox setting and conditional hiding for blank stat numbers.

### Defect 4: Theme Packaging & Root Hierarchy
- **Discovery**: Zips created with a parent `shopify-theme/` folder caused Shopify Admin to fail template discovery.
- **Resolution**: Built `create_theme_zip.py` and run automated packaging ensuring all 7 theme directories (`assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`) sit directly at the root of `Kartzo-1.0.0.zip`.

### Defect 5: Render-Blocking Font Delays & Fragmented SEO/JSON-LD Schema
- **Discovery**: Google Fonts was loaded as a blocking external stylesheet, delaying FCP/LCP. `sections/main-product.liquid` held an incomplete inline JSON-LD script while the theme lacked Breadcrumbs, Sitelinks SearchAction, and Organization structured data.
- **Resolution**: 
  - Centralized Open Graph, Twitter Cards, and Schema.org JSON-LD into `snippets/seo-head.liquid` (`WebSite`, `Organization`, `BreadcrumbList`, and `Product` with clean offers).
  - Deduplicated schema by removing the partial JSON-LD script from `sections/main-product.liquid`.
  - Converted Google Fonts loading to asynchronous non-blocking preload with `media="print" onload="this.media='all'"` and `noscript` fallback in `layout/theme.liquid`, `layout/password.liquid`, and `templates/gift_card.liquid`.
  - Added `stylesheet_tag: preload: true` for `theme.css`.

---

## 3. File Modification Log

| File Path | Nature of Change | Purpose & Rationale |
|---|---|---|
| `shopify-theme/templates/collection.*.json` (10 files) | **DELETED** | Removed obsolete duplicate collection templates violating OS 2.0 standards. |
| `shopify-theme/sections/header.liquid` | **UPDATED** | Added `menu` link_list, `logo_width` slider, custom route overrides, mobile category menu. |
| `shopify-theme/sections/footer.liquid` | **UPDATED** | Converted to OS 2.0 blocks (`brand`, `link_list`, `text`, `newsletter`), clean catalog links, conditional social icons. |
| `shopify-theme/sections/footer-group.json` | **UPDATED** | Pre-populated brand and 3 link column blocks for instant Theme Editor customizability. |
| `shopify-theme/sections/announcement-bar.liquid` | **UPDATED** | Added enable toggle and customizable destination URLs for left, middle, right messages. |
| `shopify-theme/sections/main-deals.liquid` | **UPDATED** | Full schema settings + `deal_product` blocks with image upload pickers and fallback assets. |
| `shopify-theme/templates/page.deals.json` | **UPDATED** | Pre-populated 8 deal product cards as individual blocks in JSON. |
| `shopify-theme/sections/main-list-collections.liquid` | **UPDATED** | Added `department_card` blocks with individual image upload pickers. |
| `shopify-theme/templates/list-collections.json` | **UPDATED** | Pre-populated 10 department cards as individual blocks in JSON. |
| `shopify-theme/sections/main-about.liquid` | **UPDATED** | Added `show_stats` toggle, hero image picker, and conditional metrics rendering. |
| `shopify-theme/templates/page.about.json` | **UPDATED** | Pre-populated 3 commitment pillars and `show_stats: true`. |
| `shopify-theme/sections/order-tracking.liquid` | **UPDATED** | Exposed carrier name, sample order ID, AWB, delivery date, and status labels in schema. |
| `shopify-theme/sections/size-guide.liquid` | **UPDATED** | Added configurable headings, notes, and badge settings. |
| `shopify-theme/sections/main-page.liquid` | **UPDATED** | Added card blocks (`feature_card`, `deal_card`) and banner image picker. |
| `shopify-theme/snippets/product-card.liquid` | **UPDATED** | Binds real review rating metafields instead of hardcoded 4.8. |
| `shopify-theme/config/settings_data.json` | **UPDATED** | Neutralized placeholder social URLs. |
| `shopify-theme/snippets/seo-head.liquid` | **CREATED** | Open Graph, Twitter Cards, robots directives, and Schema.org JSON-LD (WebSite, Organization, BreadcrumbList, Product). |
| `shopify-theme/layout/theme.liquid` | **UPDATED** | Render `seo-head`, non-blocking Google Fonts preload, `theme.css` preload. |
| `shopify-theme/layout/password.liquid` | **UPDATED** | Non-blocking Google Fonts preload, `theme.css` preload. |
| `shopify-theme/templates/gift_card.liquid` | **UPDATED** | Non-blocking Google Fonts preload, `theme.css` preload. |
| `shopify-theme/sections/main-product.liquid` | **UPDATED** | Deduplicated Product JSON-LD, delegating canonical schema to `seo-head.liquid`; removed size guide link. |
| `shopify-theme/snippets/seo-head.liquid` | **FIXED** | Resolved Liquid syntax error on line 77 by escaping `{search_term_string}` outside `{{ ... }}` tags. |
| `shopify-theme/templates/page.size-guide.json` | **DELETED** | Removed obsolete size guide template. |
| `shopify-theme/sections/size-guide.liquid` | **DELETED** | Removed obsolete size guide section. |
| `shopify-theme/sections/header.liquid` | **UPDATED** | Bound `data-wishlist-drawer-open` to mobile drawer wishlist link; removed size guide link. |
| `shopify-theme/sections/footer.liquid` | **UPDATED** | Added `hidden lg:block` to hide footer on mobile; removed all size-guide links. |
| `shopify-theme/sections/main-list-collections.liquid` | **UPDATED** | Fixed category list view chevron arrow alignment with `ml-auto shrink-0 flex`. |
| `shopify-theme/assets/kartzo.js` | **UPDATED** | Auto-close mobile drawer when opening wishlist drawer. |
| `docs/PERFORMANCE-SEO-LEGAL-AUDIT.md` | **CREATED** | Comprehensive performance, technical SEO, structured data, content authenticity, and legal readiness documentation. |

