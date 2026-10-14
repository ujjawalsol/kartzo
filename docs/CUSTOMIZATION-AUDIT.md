# CUSTOMIZATION-AUDIT — Complete 37-Section Theme Customizer Audit

## 1. Overview & Objective

This audit documents every Liquid section, schema setting, and block type across the Kartzo Shopify theme.
In accordance with Shopify Online Store 2.0 architecture and merchant requirements:
- Every important text, image, link, toggle, metric, and card is configurable via the Shopify Theme Editor (`Online Store > Themes > Customize`).
- Zero decorative controls: Every setting maps directly to rendered Liquid elements.
- Pre-populated blocks: All template JSON files pre-populate blocks so cards appear directly in the Theme Editor sidebar without having to create them from scratch.
- Graceful fallbacks: When an image or setting is unassigned by the merchant, the theme renders high-fidelity prototype defaults rather than broken UI.

---

## 2. Comprehensive Section Customization Matrix

### Header, Navigation & Global Announcements

| Section File | Available Settings | Supported Block Types | Theme Editor Functionality |
|---|---|---|---|
| `sections/header.liquid` | `logo` (image), `logo_width` (80–260px), `menu` (link_list), `deals_url`, `wishlist_url`, `orders_url`, `about_url`, `contact_url`, `show_mobile_categories` (bool), `mobile_categories_menu` (link_list) | None | Changes logo size, binds native Shopify navigation menu, overrides individual route destinations, and toggles mobile category quick-pills. |
| `sections/announcement-bar.liquid` | `enable` (bool), `message_left` (text), `link_left` (url), `message_mid` (text), `link_mid` (url), `message_right` (text), `link_right` (url) | None | Allows editing all three announcement strip messages and custom destination URLs, with dynamic free-shipping threshold substitution. |
| `sections/footer.liquid` | `logo`, `mission` (text), `support_email`, `support_phone`, `copyright_text`, `show_payment_badges` (bool), `payment_methods` (csv), route overrides | `brand` (logo, width, mission, email, phone, socials), `link_list` (heading, menu, 6 custom links), `text` (heading, richtext), `newsletter` (heading, subtext, button) | Modular OS 2.0 footer columns. Allows editing or replacing brand mission, picking custom navigation menus for any column, and configuring verified social handles. |

---

### Homepage Hero, Promotion & Collections

| Section File | Available Settings | Supported Block Types | Theme Editor Functionality |
|---|---|---|---|
| `sections/hero.liquid` | None (slide-driven) | `slide` (`image`, `kicker`, `heading`, `heading_accent`, `sub_mobile`, `sub`, `cta_label`, `cta_link`, `cta2_label`, `cta2_link`) | Full-bleed hero slideshow. Reorder slides, upload custom banner images, change titles, subtitles, and dual call-to-action buttons. |
| `sections/benefits.liquid` | None (block-driven) | `benefit` (`title`, `sub`, `icon`: truck, shield, refresh, headset) | 4 shopping value propositions. Customizable title, subtitle, and trust icon. |
| `sections/category-row.liquid` | None (block-driven) | `category` (`collection`, `title`, `image`, `fallback_image`, `link`) | Circular category navigation strip. Select collections or override with custom image uploads and labels. |
| `sections/promo-banner.liquid` | `image`, `show_mobile` (bool), `kicker`, `heading`, `sub`, `countdown_end`, `cta_label`, `cta_link`, `badge` | None | Big promotional deal banner with live countdown timer and discount badge. |
| `sections/featured-collection.liquid` | `heading_first`, `heading_accent`, `collection`, `limit` (slider 3–12) | `prop` (`title`, `sub`, `icon`) | Featured product grid (Best Sellers / New Arrivals). Binds real Shopify collections with automated fallback to demo catalog cards when empty. |
| `sections/collection-cards.liquid` | None (block-driven) | `card` (`image`, `collection`, `link`, `kicker`, `heading`, `sub`, `cta_label`) | Editorial promotional banners (Electronics Sale / Make It Yours). Reorder, change image, text, and button links. |
| `sections/why-choose.liquid` | `heading_first`, `heading_accent` | `feature` (`title`, `sub`, `icon`: shield, tag, refresh, truck, headset) | Store trust pillars grid. Click-to-edit feature cards. |
| `sections/testimonials.liquid` | `heading_first`, `heading_accent` | `review` (`name`, `detail`, `quote`, `stars` 1–5, `avatar`, `avatar_asset`) | Customer reviews carousel. Edit buyer names, quotes, ratings, and upload real customer photos. |
| `sections/app-cta.liquid` | `heading`, `sub`, `qr_image`, `app_store_url`, `play_store_url` | None | Mobile app download promotional section with QR code and store links. |
| `sections/newsletter.liquid` | `heading`, `subtext`, `button_label`, `disclaimer` | None | Customer newsletter subscription section connected to native Shopify customer tagging. |
| `sections/brand-list.liquid` | `heading` | `brand` (`name`, `image`, `link`) | Featured brand logo strip. |

---

### Core Catalog, Product & Cart Sections

| Section File | Available Settings | Supported Block Types | Theme Editor Functionality |
|---|---|---|---|
| `sections/main-product.liquid` | `show_vendor`, `show_sku`, `show_share`, `enable_sticky_cart`, `shipping_notice`, `return_notice` | None | Comprehensive product detail page with variant selection, gallery zoom, add-to-cart, and trust guarantees. |
| `sections/main-collection.liquid` | `per_page` (slider 12–48), `show_filters` (bool), `show_sort` (bool) | None | Faceted storefront filtering, sort-by dropdown, active filter pills, and product grid with pagination. |
| `sections/main-list-collections.liquid` | `hero_title`, `hero_sub`, `hero_collection`, `hero_image` | `department_card` (`title`, `subtitle`, `collection`, `image`, `demo_image`, `link`) | Complete All Categories directory with 10 click-to-edit department cards with individual image pickers. |
| `sections/main-deals.liquid` | `banner_image`, `badge_text`, `heading`, `subtext`, `coupon_code`, `countdown_hours`, `collection`, `limit` | `deal_product` (`product`, `custom_image`, `demo_image`, `custom_title`, `custom_sub`, `custom_badge`, `custom_price`, `custom_compare`, `custom_rating`) | Flash Deals landing page with 8 click-to-edit deal product cards with custom image upload pickers, price overrides, and discount tags. |
| `sections/main-cart.liquid` | `show_note` (bool), `continue_shopping_url` | None | Dedicated cart page synchronized with Ajax drawer, coupon field, and checkout handoff. |
| `sections/cart-drawer.liquid` | `free_shipping_threshold` | None | Slide-in Ajax cart drawer with subtotal, quantity triggers, and express checkout. |
| `sections/search-modal.liquid` | `popular_queries` (csv) | None | Global predictive search modal with trending keyword pills. |
| `sections/main-search.liquid` | `per_page` (slider 12–48) | None | Full search results template with product grid and keyword highlighting. |

---

### Content, Support & Policy Sections

| Section File | Available Settings | Supported Block Types | Theme Editor Functionality |
|---|---|---|---|
| `sections/main-about.liquid` | `badge_text`, `heading`, `description`, `hero_image`, `button_1_text`, `button_1_link`, `button_2_text`, `button_2_link`, `values_badge`, `values_title`, `values_sub`, `show_stats` (bool), `stat_1..4_num`, `stat_1..4_label` | `value_card` (`title`, `description`) | Brand story, 3 customizable commitment pillar blocks, and optional trust metrics strip. |
| `sections/main-contact.liquid` | `badge`, `heading`, `subtext`, `form_title`, `form_sub`, `email`, `email_sub`, `phone`, `hours`, `address` | None | Native Shopify contact form with interactive subject selector and direct support channel details. |
| `sections/faq.liquid` | `heading` | `qa` (`question`, `answer` richtext) | Help & FAQs page with 6 pre-populated Q&A accordion blocks. |
| `sections/order-tracking.liquid` | `badge`, `heading`, `subheading`, `demo_order_id`, `demo_phone`, `carrier_name`, `demo_awb`, `delivery_date`, `status_label`, `button_label` | None | Shipment tracking page with live lookup simulation and 4-step progress milestone. |
| `sections/size-guide.liquid` | `badge`, `heading`, `subheading`, `footwear_heading`, `footwear_note`, `apparel_heading`, `apparel_note` | None | Footwear and apparel measurement tables with fit notes. |
| `sections/main-policy.liquid` | `heading` | None | Tabbed store policies section (Shipping, Returns, Cancellation, Privacy, Terms) with URL-synchronized tab state. |
| `sections/main-page.liquid` | `banner_image`, `heading`, `subheading`, `show_breadcrumbs` | `feature_card` (`title`, `text`, `icon`), `deal_card` (`title`, `price`, `image`) | General page template supporting customizable content and card blocks. |
| `sections/main-blog.liquid` | `per_page` (slider 6–24) | None | Blog archive list template with responsive grid. |
| `sections/main-article.liquid` | `show_date`, `show_author`, `show_share` | None | Article detail page with rich typography and related links. |
| `sections/wishlist.liquid` | `heading`, `subtext`, `empty_cta_text`, `empty_cta_link` | None | Customer wishlist page with live product cards and clear-all trigger. |

---

## 3. Theme Settings (`config/settings_schema.json`)

1. **Brand Colors**:
   - `brand` (`#1A56F0`): Primary accent, buttons, active tabs.
   - `brand_dark` (`#123FBE`): Button hover and focus states.
   - `brand_bar` (`#1246D0`): Top announcement utility bar.
   - `ink` (`#0E1730`): Primary body and heading typography.
   - `muted` (`#4E5D78`): Secondary text, subtitles, ratings.
   - `soft` (`#F4F8FF`): Badges, soft card backgrounds.
2. **Storewide Commerce Controls**:
   - `free_shipping_threshold`: Value in minor currency units for free shipping meter.
   - `support_email`, `support_phone`, `support_address`: Real business contact channels (blank hides).
   - `social_facebook`, `social_instagram`, `social_x`, `social_youtube`: Social handles (blank hides).
3. **Favicon & Identity**:
   - Native favicon image upload picker.
