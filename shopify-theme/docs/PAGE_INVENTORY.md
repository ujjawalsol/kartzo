# PAGE_INVENTORY — 28 source pages → Shopify template mapping (no omissions)

| # | Source | H1 / purpose | Shopify target | Reusable components | Assets / interactions | Outstanding deps |
|---|--------|--------------|----------------|---------------------|----------------------|------------------|
| 1 | index.html (HOMEPAGE, 1061 lines) | "Upgrade your everyday." | `templates/index.json` | announcement, header, hero-carousel×3, benefits, category circles×10, deals banner, best-grid×6, value props, collection cards, brands, reviews, app, blog, newsletter, footer | hero-1/2/3.webp, deals.webp, 12 product webp, avatars | Demo products → real collections |
| 2 | product.html | Wireless Headphones Pro ₹2799/₹3999 | `templates/product.json` → `main-product` + `product-recommendations` | gallery×4, swatches, qty, pincode, tabs, reviews, sticky CTA, similar | p-headphones/earbuds, electronics, hero.webp | Variants/pincode → Shopify variants; reviews static |
| 3 | products.html | All Products + filters/sort | `templates/collection.json` → `main-collection` | sidebar filters, sort dropdown, grid×12, mobile filter drawer | product webp ×12 | Filters/sort → storefront filtering + `sort_by` |
| 4 | categories.html | Shop by Category (10 depts) | `templates/list-collections.json` → `main-list-collections` | hero, grid/list toggle, dept cards | electronics.webp, cat images | Dept cards → real collections |
| 5 | deals.html | Up to 60% OFF + countdown | collection (sale) via `collection.json` | flash hero, countdown, deals grid | deals.webp | Countdown = theme promo (configurable end time); products → sale collection |
| 6 | search.html | Results for "Headphones" | `templates/search.json` → `main-search` | refinement form, grid, empty state | product webp | → real `/search` + filters + suggest |
| 7 | cart.html | Cart + coupon + cross-sell | `templates/cart.json` → `main-cart` (+ `cart-drawer` global) | free-ship meter, qty, coupon, summary, recs, empty state | — | → Ajax cart endpoints; KARTZO10 → Shopify discount codes |
| 8 | checkout.html | Custom checkout form | **NOT converted** (Shopify-hosted checkout) | — | — | Cart → `/checkout`; limitation documented |
| 9 | about.html | Brand story + stats | `templates/page.json` (+ page content) | hero, values, metrics | hero.webp | Merchant page content |
| 10 | contact.html | Support form | `templates/page.contact.json` → `main-contact` | validated form, subject dropdown, channels | — | → native `form type=contact`; phone/email via settings (no invented contacts) |
| 11 | faq.html | Accordions | `templates/page.faq.json` → `faq` section | details/summary | — | Merchant-editable blocks |
| 12 | size-guide.html | Measurement tables | `templates/page.size-guide.json` → `size-guide` | tables | — | Merchant content |
| 13 | tracking.html | Order tracking timeline | `templates/page.tracking.json` → `order-tracking` | lookup card, timeline | — | No Shopify order API for guests → link-based lookup guidance; no fake AWB |
| 14 | wishlist.html | Saved items grid | `templates/page.wishlist.json` → `wishlist` | product grid, empty state | — | Local-storage wishlist (customer-agnostic); documented as device-local |
| 15 | blog.html | Journal listing | `templates/blog.json` → `main-blog` | featured + 3 cards | blog-*.webp | → real blog + articles |
| 16 | article.html | Shopping-tips article | `templates/article.json` → `main-article` | prose, author, embedded product, share | blog-shopping.webp | → real article + product picker |
| 17 | 404.html | Not found + search | `templates/404.json` → `main-404` | centered error + search | — | Real search form |
| 18 | password.html | Coming-soon gate | `templates/password.json` → `main-password` + `layout/password.liquid` | email capture | — | → native password form |
| 19 | login.html | Sign in | `templates/customers/login.liquid` (+ new-accounts link) | auth card | — | Shopify-controlled auth |
| 20 | register.html | Create account | `templates/customers/register.liquid` | auth card | — | Same as above |
| 21 | forgot-password.html | Recovery | `templates/customers/reset_password.liquid` (+ login recover form) | auth card | — | Same as above |
| 22 | account.html | Profile dashboard | `templates/customers/account.liquid` | sidebar, orders, addresses | — | Shopify-controlled data |
| 23 | orders.html | Orders list | `templates/customers/account.liquid` + `customers/order.liquid` | filter tabs, order cards | — | Real `customer.orders` |
| 24–28 | shipping/returns/cancellation/privacy/terms policy pages | Policy prose + tab bar | `templates/page.json` (policies via admin `shop.policy_*` links; tabs link sibling pages) | policy tabs | — | Merchant policy content; no invented terms |
| — | gift card | n/a in source | `templates/gift_card.liquid` (required Liquid; no source equivalent) | — | — | Minimal branded redemption page |
| — | robots/sitemap | n/a | NOT overridden (Shopify default) | — | — | Avoid unnecessary overrides |

Gift-card: no source page; minimal branded template included because Shopify requires Liquid for it.
Checkout/account/profile internals that Shopify hosts are NOT reimplemented as HTML pages.
