# HOMEPAGE-SECTION-MAP — Kartzo Component Mapping (Oct 2026)

This document provides a 1-to-1 mapping between every intended component from the original Kartzo website (`index.html`) and its corresponding Shopify Online Store 2.0 section, schema settings, fallback behavior, and verification status.

---

## 1. Global Layout & Group Sections

| Original Website Component | Source Lines (`index.html`) | Shopify Section File | JSON Container | Configuration & Fallbacks | Verification Status |
|---|---|---|---|---|---|
| **Top Announcement Bar** | Lines 41–59 (`bg-brand-bar`) | `sections/announcement-bar.liquid` | `sections/header-group.json` | Free shipping order threshold, 7 Days Easy Returns, 100% Secure Payment badges. | **VERIFIED (PASS)** |
| **Primary Site Header** | Lines 61–137 (`site-header`) | `sections/header.liquid` | `sections/header-group.json` | Logo (`logo.webp`), desktop navigation links, inline search form, wishlist link, cart trigger, mobile menu, quick category pills. | **VERIFIED (PASS)** |
| **Site Footer** | Lines 673–750 (`site-footer`) | `sections/footer.liquid` | `sections/footer-group.json` | 4-column footer: branding, social icons, Quick Links, Customer Service, Category links, copyright, payment badges. | **VERIFIED (PASS)** |

---

## 2. Homepage Content Sections (`templates/index.json`)

The 13 sections below form the body of the homepage in `templates/index.json`, rendered dynamically via `{{ content_for_layout }}` inside `layout/theme.liquid`:

| # | Original Kartzo Section | Source in `index.html` | Shopify Section | `templates/index.json` Key | Schema & Fallback Configuration | Verification Status |
|---|---|---|---|---|---|---|
| 1 | **Hero Carousel** | Lines 140–186 (`section.hero-carousel`) | `sections/hero.liquid` | `"hero"` | 3 slides configured with original kickers, headings, and CTAs. Fallback to bundled high-res assets `hero-1.webp`, `hero-2.webp`, `hero-3.webp` with explicit dimensions (`2100x748`). Eager-loaded slide 1 with `fetchpriority="high"`. | **VERIFIED (PASS)** |
| 2 | **Shopping Benefits Bar** | Lines 188–207 (`section aria-label="Shopping benefits"`) | `sections/benefits.liquid` | `"benefits"` | 4 benefit blocks: Free Shipping (`truck`), Secure Payment (`shield`), Easy Returns (`refresh`), 24/7 Support (`headset`). | **VERIFIED (PASS)** |
| 3 | **Category Pills Row** | Lines 209–252 (`section#categories`) | `sections/category-row.liquid` | `"categories"` | 10 canonical categories: Electronics, Fashion, Home & Living, Beauty, Kitchen, Sports, Toys & Games, Mobile & Accessories, Bags & Luggage, Health & Wellness. Explicit fallbacks: `p-headphones.webp`, `c-fashion.webp`, `c-home.webp`, `p-perfume.webp`, `p-fryer.webp`, `p-shoes.webp`, `c-toys.webp`, `p-phone.webp`, `p-backpack.webp`, `c-health.webp`. | **VERIFIED (PASS)** |
| 4 | **Deals Promo Banner** | Lines 254–272 (`section#deals`) | `sections/promo-banner.liquid` | `"deals"` | Limited Time Offer banner, countdown timer, "UP TO 60% OFF" badge. Fallback image: `deals.webp` (`800x600`). | **VERIFIED (PASS)** |
| 5 | **Best Sellers Grid & Value Props** | Lines 274–361 (`section#products`) | `sections/featured-collection.liquid` | `"best"` | Heading: "Best Sellers". Fallback: 6 rich demo product cards (Wireless Headphones, Smart Watch, Running Shoes, Smartphone, Air Fryer, Laptop Backpack) with discount badges, ratings, and quick-add buttons. 4 Value Prop blocks below grid (Wide Product Range, Best Prices, Trusted by Thousands, Fast Delivery). | **VERIFIED (PASS)** |
| 6 | **Featured Collection Cards** | Lines 363–389 (`section aria-label="Featured collections"`) | `sections/collection-cards.liquid` | `"cards"` | Dual promo cards: Card 1 (Electronics Sale, up to 50% off, fallback `electronics.webp`), Card 2 (Home & Living, "Make It Yours", warm Kartzo palette `from-[#f4eadf] via-[#f4eadf]/55`, fallback `home.webp`). | **VERIFIED (PASS)** |
| 7 | **New Arrivals Grid** | Lines 391–458 (`section#new-arrivals`) | `sections/featured-collection.liquid` | `"new"` | Heading: "New Arrivals". Fallback: 6 rich demo product cards (TWS Earbuds, Premium Perfume, Portable Blender, UV Sunglasses, Travel Luggage, Gaming Chair). | **VERIFIED (PASS)** |
| 8 | **Shop Top Brands** | Lines 460–477 (`section#brands`) | `sections/brand-list.liquid` | `"brands"` | 10 top brand blocks: Apple, SAMSUNG, Nike, adidas, boAt, JBL, Lenovo, Canon, PHILIPS, mi. | **VERIFIED (PASS)** |
| 9 | **Why Choose Kartzo?** | Lines 479–513 (`section#about`) | `sections/why-choose.liquid` | `"why"` | 6 value proposition feature cards: Premium Quality, Best Prices, Secure Shopping, Easy Returns, Fast Delivery, 24/7 Support. 6-column responsive grid with SVG icons. | **VERIFIED (PASS)** |
| 10 | **Customer Testimonials** | Lines 515–550 (`section aria-labelledby="reviews-title"`) | `sections/testimonials.liquid` | `"reviews"` | 3 customer review blocks (Rahul Mehta, Priya Sharma, Amit Verma). Avatar image fallbacks: `avatar-rahul.webp`, `avatar-priya.webp`, `avatar-amit.webp` (`240x240`). | **VERIFIED (PASS)** |
| 11 | **Mobile App CTA Banner** | Lines 552–612 (`section#app`) | `sections/app-cta.liquid` | `"app"` | "Shop on the Go With the Kartzo App". App preview fallback `app.webp`, QR code mockup, Google Play and App Store badges, 4 app feature bullet points. | **VERIFIED (PASS)** |
| 12 | **Blog Posts / Journal** | Lines 614–649 (`section#blog`) | `sections/blog-posts.liquid` | `"blog"` | 3 editorial article cards: "5 Tips for Smart Online Shopping" (`blog-shopping.webp`), "Best Gadgets for 2026" (`blog-gadgets.webp`), "Transform Your Home on a Budget" (`blog-home.webp`). | **VERIFIED (PASS)** |
| 13 | **Newsletter Subscription** | Lines 650–670 (`section aria-label="Stay Updated"`) | `sections/newsletter.liquid` | `"newsletter"` | "Stay Updated" callout with email input and submit button. | **VERIFIED (PASS)** |

---

## 3. Order Sequence in `templates/index.json`

The order of sections defined in `templates/index.json` matches the exact vertical flow of the original Kartzo homepage:
```json
"order": [
  "hero",
  "benefits",
  "categories",
  "deals",
  "best",
  "cards",
  "new",
  "brands",
  "why",
  "reviews",
  "app",
  "blog",
  "newsletter"
]
```

---

## 4. Audit & Verification Findings

1. **Section File Existence:** Every single section type referenced (`hero`, `benefits`, `category-row`, `promo-banner`, `featured-collection`, `collection-cards`, `brand-list`, `why-choose`, `testimonials`, `app-cta`, `blog-posts`, `newsletter`) has an exact matching `.liquid` file in `sections/`.
2. **Schema & Block Types:** Every block type (`slide`, `benefit`, `category`, `prop`, `card`, `brand`, `feature`, `review`) matches the declared schema in the section file with 0 mismatches.
3. **No Missing Sections:** Zero references point to nonexistent files. There are no dangling references or broken aliases.
4. **Resilience in Unpopulated Stores:** All sections include bundled `.webp` fallbacks with explicit `width` and `height` dimensions, ensuring that in a brand-new store without uploaded imagery or products, the storefront immediately renders the complete Kartzo design rather than blank boxes or missing headers.
