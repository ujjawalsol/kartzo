# TEMPLATE-MAPPING-AUDIT — Complete Source & Resource Mapping Report

## 1. Executive Summary

This audit examines every template file in `shopify-theme/templates/` to resolve the architectural conflict between standard Shopify resource types and anomalous `collection.*.json` templates that were previously mirroring informational content pages.

In Shopify Online Store 2.0:
- **`templates/page.*.json`** templates are designed exclusively for informational and utility pages (`/pages/*`).
- **`templates/collection.json`** serves standard product catalog collections (`/collections/*`).
- Prefixing informational content pages with `collection.` causes severe routing ambiguity in Shopify Admin, confusing merchant template assignment dropdowns and breaking standard theme expectations.

---

## 2. Complete Template Inventory & Action Matrix

| Template File | Intended Shopify Resource | Target Route | Status | Action Taken / Forensic Rationale |
|---|---|---|---|---|
| `templates/index.json` | Home Page | `/` | **ACTIVE** | Core OS 2.0 homepage template with 10 configured sections. Verified valid. |
| `templates/collection.json` | Product Collection | `/collections/*` | **ACTIVE** | Main collection catalog template with faceted filtering, sort_by, and product grid. |
| `templates/list-collections.json` | Collections Directory | `/collections` | **ACTIVE** | Department directory with 10 customizable department blocks. |
| `templates/product.json` | Product Detail Page | `/products/*` | **ACTIVE** | Main product page with gallery, variant picker, inventory, trust badges, recommendations. |
| `templates/cart.json` | Shopping Cart | `/cart` | **ACTIVE** | Full cart page synchronized with Ajax drawer and checkout button. |
| `templates/search.json` | Search Results | `/search` | **ACTIVE** | Search results template with product grid and predictive fallback. |
| `templates/404.json` | Not Found Page | Any invalid route | **ACTIVE** | Helpful 404 recovery template with search bar and quick catalog links. |
| `templates/blog.json` | Blog Archive | `/blogs/*` | **ACTIVE** | Blog articles list template with responsive article cards. |
| `templates/article.json` | Blog Post | `/blogs/*/*` | **ACTIVE** | Single blog post template with author, date, and share links. |
| `templates/page.json` | General Page | `/pages/*` | **ACTIVE** | Default page template with optional feature card blocks. |
| `templates/page.about.json` | About Page | `/pages/about` | **ACTIVE** | Authentic brand story, value cards blocks, and optional trust metrics. |
| `templates/page.contact.json` | Contact Page | `/pages/contact` | **ACTIVE** | Native Shopify contact form, direct channels, office address, and hours. |
| `templates/page.deals.json` | Flash Deals Page | `/pages/deals` | **ACTIVE** | Flash deals landing with countdown timer, coupon code, and 8 customizable deal product cards. |
| `templates/page.faq.json` | Help & FAQ Page | `/pages/faq` | **ACTIVE** | Knowledge base with 6 pre-populated Q&A accordion blocks. |
| `templates/page.tracking.json` | Order Tracking | `/pages/tracking` | **ACTIVE** | Shipment tracking lookup form with 4-step progress milestone. |
| `templates/page.wishlist.json` | Customer Wishlist | `/pages/wishlist` | **ACTIVE** | Local storage zero-app customer wishlist with instant add-to-cart. |
| `templates/page.privacy-policy.json` | Privacy Policy | `/pages/privacy-policy` | **ACTIVE** | Comprehensive data protection policy with interactive tabs. |
| `templates/page.shipping-policy.json` | Shipping Policy | `/pages/shipping-policy` | **ACTIVE** | Delivery timelines, PIN coverage, and courier SLA policy. |
| `templates/page.returns-policy.json` | Returns Policy | `/pages/returns-policy` | **ACTIVE** | 7-day doorstep replacement and refund guidelines. |
| `templates/page.terms-conditions.json` | Terms of Service | `/pages/terms-conditions` | **ACTIVE** | Legal terms and conditions with policy tabs navigation. |
| `templates/page.cancellation-policy.json` | Cancellation Policy | `/pages/cancellation-policy` | **ACTIVE** | Pre-dispatch cancellation terms and refund timelines. |
| `templates/password.json` | Storefront Lock | `/password` | **ACTIVE** | Store password access page when password protection is active. |
| `templates/gift_card.liquid` | Digital Gift Card | `/gift_cards/*` | **ACTIVE** | Native Shopify gift card balance rendering template. |
| `templates/customers/*.json` | Account Management | `/account/*` | **ACTIVE** | Native account, order history, addresses, and login/register templates. |

---

## 3. Removed Obsolete Collection Duplicates

The following 10 templates were identified as obsolete duplicate templates that violated standard Shopify architecture by defining informational content as collections:

1. **`collection.about.json`** — **REMOVED**. Duplicate of `page.about.json`. About is an informational page (`/pages/about`), never a product collection.
2. **`collection.faq.json`** — **REMOVED**. Duplicate of `page.faq.json`. Help & FAQ is a customer support page (`/pages/faq`).
3. **`collection.tracking.json`** — **REMOVED**. Duplicate of `page.tracking.json`. Order tracking is an informational tool (`/pages/tracking`).
4. **`collection.wishlist.json`** — **REMOVED**. Duplicate of `page.wishlist.json`. Wishlist is a client utility page (`/pages/wishlist`).
5. **`collection.privacy-policy.json`** — **REMOVED**. Duplicate of `page.privacy-policy.json`. Legal privacy policy.
6. **`collection.shipping-policy.json`** — **REMOVED**. Duplicate of `page.shipping-policy.json`. Store shipping policy.
7. **`collection.returns-policy.json`** — **REMOVED**. Duplicate of `page.returns-policy.json`. Store returns policy.
8. **`collection.terms-conditions.json`** — **REMOVED**. Duplicate of `page.terms-conditions.json`. Terms of service.
9. **`collection.cancellation-policy.json`** — **REMOVED**. Duplicate of `page.cancellation-policy.json`. Cancellation terms.
10. **`collection.deals.json`** — **REMOVED**. Duplicate of `page.deals.json`. Flash deals landing page is served via `page.deals.json`. If a merchant creates a collection with handle `deals`, Shopify's standard `collection.json` template renders real collection products with filtering and sorting.

---

## 4. Verification & Link Integrity

All internal navigation links in `sections/header.liquid`, `sections/footer.liquid`, and breadcrumbs prioritize canonical page routes:
- `/pages/about`
- `/pages/contact`
- `/pages/deals`
- `/pages/faq`
- `/pages/tracking`
- `/pages/returns-policy`
- `/pages/shipping-policy`
- `/pages/privacy-policy`
- `/pages/terms-conditions`
- `/pages/cancellation-policy`
- `/pages/wishlist`

Every link gracefully falls back to `pages['handle'].url`, preventing 404 errors regardless of store locale or URL restructuring.
