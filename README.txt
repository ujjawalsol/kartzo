Kartzo responsive ecommerce storefront prototype (Shopify Online Store 2.0 ready).
Open index.html in a browser. Assets are located in assets/.

Rebuild all pages anytime with:
  node scripts/build-pages.mjs

Tailwind CSS loads from CDN at runtime. Custom design system in assets/kartzo.css and assets/kartzo.js.

Pages:
  index.html                Home (Discovery & Conversion)
  products.html             Shop / All Products (Filters, Sorting, Grid, Drawer)
  categories.html           All Categories & Collections Hub
  deals.html                Flash Deals & Time-Limited Offers
  product.html              Product Detail Page (Gallery, Swatches, Pincode, Tabs, Reviews, Mobile Sticky CTA)
  cart.html                 Shopping Cart (Free Shipping Progress, Coupons, Cross-sells, Empty State)
  checkout.html             Secure Checkout (Addresses, Payment Radios, Summary)
  orders.html               Orders List & Past Purchases
  tracking.html             Dedicated Real-Time Order Tracking
  wishlist.html             Wishlist & Saved Items
  about.html                About Us (Brand Story, Values, Stats)
  contact.html              Contact Us (Direct Support Channels, Validated Form)
  faq.html                  Help & FAQ Center (Interactive Accordions)
  size-guide.html           Size & Fit Guide (Apparel & Footwear Measurements)
  shipping-policy.html      Shipping & Delivery Policy
  returns-policy.html       7-Day Return & Refund Policy
  cancellation-policy.html  Order Cancellation Policy
  privacy-policy.html       Data Protection & Privacy Policy
  terms-conditions.html     Store Terms & Conditions
  login.html                Customer Account Login
  register.html             Customer Registration
  forgot-password.html      Password Recovery Flow
  account.html              Customer Profile & Address Management Dashboard
  blog.html                 Blog Listing & Buying Guides
  article.html              Editorial Article Page with Embedded Product Card
  search.html               Search Results Page (Predictive Search & Filter)
  404.html                  Custom 404 Error Page
  password.html             Coming Soon / VIP Early Access Page

Global Components & Features:
  - Sticky Header with Search Trigger, Wishlist Counter, Cart Counter, Mobile Navigation
  - Announcement / Promotional Bar
  - Slide-over Cart Drawer (accessible from every page with Free Shipping Meter)
  - Global Predictive Search Modal (with live suggestions & trending tags)
  - Mobile Filter Drawer for Collection & Search pages
  - Reusable Product Cards with Quick Add and Wishlist Toggles
  - Interactive Toast Notification System
  - Complete Responsive Testing across mobile (320px–430px), tablet (768px), and desktop (1024px+)
