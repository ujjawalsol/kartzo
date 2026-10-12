# PREVIEW, UPLOAD & STORE SETUP GUIDE — Kartzo Theme (Oct 2026)

This guide provides instructions to upload, preview, and test the Kartzo Shopify theme safely on your development store (e.g. VIORA test store) as an **unpublished theme**.

---

## 1. Quick Upload via Shopify Admin (Recommended)

Because Shopify CLI requires interactive browser authentication that was unavailable in the AI container environment, the theme has been pre-packaged into a clean, ready-to-upload archive:

**Packaged Archive Path:**  
`c:\Users\ujjaw\Documents\Github\kartzo\shopify-theme\Kartzo-1.0.0.zip`

### Step-by-Step Upload Instructions:
1. Open your Shopify Admin dashboard (`https://admin.shopify.com/store/viora-theme-test` or your store URL).
2. In the left navigation sidebar, navigate to **Online Store** > **Themes**.
3. Under the **Theme library** section, click **Add theme** > **Upload zip file**.
4. Click **Choose File** and select the packaged file:
   `shopify-theme/Kartzo-1.0.0.zip`
5. Click **Upload file**. Shopify will process and install the theme in your Theme library under the name **Kartzo 1.0.0**.
6. **Crucial:** Leave it as an **unpublished theme** in your Theme library so your live visitors are unaffected.

> **Why the Previous Zip Caused a 404 Error:**  
> The previous `shopify-theme.zip` contained an inner directory (`shopify-theme/layout/...`). When Shopify uncompressed it, it could not find `layout/theme.liquid` or `templates/index.json` at the root, which caused Shopify's routing engine to fall back to the 404 template.  
> `Kartzo-1.0.0.zip` was generated with `shopify theme package` and places `assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, and `templates/` strictly at the root level.

---

## 2. Previewing the Unpublished Theme

Once uploaded to your Theme library:
1. Locate **Kartzo 1.0.0** in your **Theme library**.
2. Click the **Actions** (or `...`) dropdown button next to the theme name.
3. Select **Preview**.
4. Shopify opens a preview bar at the bottom of the screen (`Previewing: Kartzo 1.0.0` with a share link and `?preview_theme_id=` in the URL).
5. **Verify the Homepage:** The homepage (`/`) will now render the complete Kartzo design:
   - Announcement bar & Header with search, categories, and cart count.
   - 3-slide Hero slider with high-res photography.
   - 10 circular category badges.
   - Best Sellers product grid with quick-add buttons and ratings.
   - 4 Value proposition cards (Free Shipping, 10-Day Return, Authentic, 24/7 Support).
   - Deals banner with countdown timer.
   - Dual collection promo cards (Electronics & Home & Living).
   - Top Brands marquee / badge list.
   - Why Choose Us 6-feature grid.
   - New Arrivals product grid.
   - Customer Testimonials (3 reviews with avatars).
   - Mobile App CTA banner with download badges.
   - Latest Articles / Blog posts (3 cards).
   - Comprehensive footer with newsletter signup and navigation links.

---

## 3. Customizing in Shopify Theme Editor

1. In **Online Store** > **Themes**, click the green **Customize** button on **Kartzo 1.0.0**.
2. **Template Dropdown Notice:**
   - In the top-center bar, the dropdown shows the active template. Ensure it says **Home page**.
   - If you ever see "404 page" in the editor canvas, simply click the dropdown and select **Home page** (the editor only showed the 404 template previously because that template was selected for editing).
3. You can click on any homepage section in the left sidebar to change text, links, or upload your own store imagery. Every section will fall back gracefully to the original Kartzo assets if left unassigned.

---

## 4. Alternative: Local Preview via Shopify CLI

If you have a terminal open with Shopify CLI authenticated:
```powershell
cd c:\Users\ujjaw\Documents\Github\kartzo\shopify-theme
shopify theme dev --store viora-theme-test.myshopify.com
```
- The CLI will output a local preview URL (`http://127.0.0.1:9292`) and an editor sync URL.
- Hot reloading is enabled for Liquid and assets.

---

## 5. Required Storefront Configurations (Shopify Admin)

To unlock the full functionality of the store, perform these standard one-time admin configurations:

### A. Publish Catalog Products & Collections
- Create products in Admin > **Products** and ensure they are marked as **Active** and published to the **Online Store** sales channel.
- In Admin > **Collections**, ensure you have at least one collection (or a collection named `frontpage` or `best-sellers`). The theme automatically falls back to `collections['all']` and built-in demo cards if unconfigured.

### B. Create Standard Information Pages
Go to Admin > **Online Store** > **Pages** and create:
- **Wishlist:** Title "Wishlist", Handle `wishlist`, assign **Theme template** `page.wishlist`.  
  *(Note: This creates the destination for the header wishlist button).*
- **Contact:** Title "Contact Us", assign **Theme template** `page.contact`.
- **About Us:** Title "About Us", assign standard content.
- **FAQ:** Title "FAQ", assign **Theme template** `page.faq`.
- **Order Tracking:** Title "Track Order", assign **Theme template** `page.tracking`.
- **Size Guide:** Title "Size Guide", assign **Theme template** `page.size-guide`.

### C. Activate Collection & Search Filtering
1. Install the free official **Shopify Search & Discovery** app from the Shopify App Store.
2. Go to **Apps** > **Shopify Search & Discovery** > **Filters**.
3. Add filters for **Availability**, **Price**, **Product type**, **Brand/Vendor**, and relevant product options (e.g. **Color**, **Size**).
4. The theme's native collection sidebar, filter drawer, and active filter pills will immediately reflect these facets!

---

## 6. Verification Checklist for Your Preview Session

When previewing `Kartzo 1.0.0`, test the following user flows:

- [ ] **Homepage Layout:** Check all 13 sections and verify that no black boxes or empty headers appear.
- [ ] **Hero Slider:** Click arrow controls and bottom dots to advance slides; check autoplay.
- [ ] **Cart Drawer:** Click "Add to Cart" on any product card. The slide-out cart drawer opens with item count, subtotal, and free shipping progress.
- [ ] **Quantity Updates:** Increment, decrement, and remove items inside the cart drawer.
- [ ] **Product Page:** Navigate to a product; test color/size variant pills; verify that price, SKU, and "Save %" badge update dynamically.
- [ ] **Wishlist:** Click the heart icon on any card; observe toast notification; click the header wishlist icon to view saved items on `/pages/wishlist`.
- [ ] **Search Modal:** Click the search bar in the header; verify that the search modal opens with trending queries and instant suggestion support.
- [ ] **Mobile Responsiveness:** Resize browser window to mobile width; test mobile navigation drawer and bottom bar.
