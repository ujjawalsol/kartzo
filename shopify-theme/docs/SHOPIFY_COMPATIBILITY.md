# SHOPIFY_COMPATIBILITY — what maps, what changes, what is impossible

## Direct mappings (same UX, Shopify data)
Header/nav/search/cart-drawer/search-modal/footer, product cards/grid, product gallery + variant
pickers + qty, collection grid + pagination + `sort_by` + storefront filters, search + suggestions,
cart page + drawer (Ajax), contact form (`form type=contact`), blog/article, 404, password gate,
policies (admin content), gift card (branded minimal), legacy customer templates as fallback.

## Adaptations (design preserved, mechanics changed)
1. **Tailwind Play CDN → compiled `assets/theme.css`** (Tailwind v3.4.13, pinned; build in
   `docs/build/`; recompile after editing classes). No runtime CDN in production — this was the
   prior failure mode. Verified: utilities + arbitrary values + responsive variants present.
2. **`assets/` is flat** — `hero/*.webp` flattened to `hero-1/2/3.webp`; references updated.
3. **Demo catalog → real objects**: 12 hardcoded products/₹ prices deleted from theme; grids use
   `collection.products` / `search.results` / `recommendations`; money via `money` filter.
4. **Fake controls → real**: filters submit `filter.*` params; sort submits `sort_by`; coupon field
   explains Shopify discount codes (no fake `KARTZO10` success); pincode checker keeps UX but copy
   states "delivery estimate, not a guarantee"; pickup promises removed unless merchant enables
   store pickup (then `store_availability` used).
5. **Wishlist** = device-local (localStorage) grid; counts sync; no fake cross-device sync claims.
6. **Tracking page** = order-lookup guidance (links to account/orders + contact); no fabricated
   AWB/timeline data. Live milestones only possible with an app — explicitly out of scope.
7. **Countdown (deals)** = merchant-set end datetime in section settings; hidden past expiry.
8. **Reviews** = static design placeholders until a review app is installed; labeled as such, no
   invented aggregate structured data beyond real `product` data.
9. **Fonts** = same Google Fonts URL + `display=swap` + system fallback; no invented font-picker
   objects; theme settings use valid `font_picker`? — NO: typography stays CSS-driven to preserve
   fidelity; settings expose colors/copy only (regression E).
10. **Defect fixes**: card wishlist uses `.wish` (fixed selector); sticky CTA single implementation;
    single `kartzo.js` include; `ring:` dead declaration removed.

## Platform limits (documented, not worked around)
- **Checkout** (`checkout.html`): no theme equivalent; cart → `/checkout`; branding via Checkout &
  accounts editor; no Plus upgrade, no app. (R14)
- **Accounts**: new customer accounts are Shopify-hosted; theme provides entry points + legacy
  fallback templates; order history/profile visuals follow platform. (R15)
- **Search/filter infra**: filters require admin-created storefront filters; search requires
  published products; predictive search needs no app. (R9/R17)
- **Currency/shipping/tax claims**: from store config only; theme never hardcodes ₹, thresholds
  beyond the free-ship *display* setting (merchant-editable, defaults 499 to match design).
