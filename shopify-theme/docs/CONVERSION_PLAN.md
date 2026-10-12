# CONVERSION_PLAN — build order + per-template section map

## Order
1. ✅ Audit + research + tokens (this docs/ set).
2. ✅ Production CSS pass 1 (compiled from original HTML) + flat assets.
3. **Foundation**: `layout/theme.liquid`, `layout/password.liquid`, snippets
   (`icons`, `product-card`, `breadcrumbs`, `rating`), `config/settings_*`,
   `locales/en.default.json`, global sections (`announcement-bar`, `header`, `footer`,
   `cart-drawer`, `search-modal`), `assets/kartzo.js` (Ajax rewrite).
4. **Commerce core**: `main-product`, `product-recommendations`, `main-collection`,
   `main-search`, `main-cart` + templates `product/cart/collection/search/index.json`.
5. **Content**: `main-page`, `main-contact`, `main-blog`, `main-article`, `main-404`,
   `main-password`, `faq`, `size-guide`, `order-tracking`, `wishlist`, `gift_card.liquid`,
   `customers/*`, policy/alt page templates.
6. **Homepage composition**: `hero`, `category-row`, `featured-collection`, `promo-banner`,
   `collection-cards`, `brand-list`, `testimonials`, `app-cta`, `blog-posts`, `newsletter`.
7. **Validation**: JSON/Liquid static checks, CSS class-coverage recompile (pass 2),
   Theme Check (if CLI available), QA report with honest PASS/PARTIAL/BLOCKED labels.

## Template → sections map
- `index.json`: announcement(header-group) + hero + category-row + promo-banner(deals) +
  featured-collection(Best Sellers) + value-props(part of featured) + collection-cards +
  brand-list + testimonials + app-cta + blog-posts + newsletter
- `product.json`: main-product + product-recommendations
- `collection.json`: main-collection (banner + filters + sort + grid + pagination)
- `list-collections.json`: main-list-collections
- `search.json`: main-search (+ search-modal global)
- `cart.json`: main-cart
- `page.json`: main-page · `page.contact.json`: main-contact · `page.faq.json`: faq ·
  `page.size-guide.json`: size-guide · `page.tracking.json`: order-tracking ·
  `page.wishlist.json`: wishlist
- `blog.json`: main-blog · `article.json`: main-article · `404.json`: main-404 ·
  `password.json`: main-password · `gift_card.liquid`: standalone
- `customers/login|register|account|order|activate_account|reset_password.liquid`: native forms

## Rules enforced during build
- No new theme files outside `shopify-theme/`; original tree untouched (verified via `git status`).
- JS only (no TS); no secrets; no invented URLs/prices/policies; every control wired or removed.
- Recompile CSS after Liquid is final; diff uncovered classes → fix markup or extend build content.
